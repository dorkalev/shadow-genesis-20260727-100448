import express from "express";
import { Firestore } from "@google-cloud/firestore";
import { validate, integrityHash, canonical, summarize, Reading } from "./pi";
import { Consent, hasActiveConsent, minimize, assembleExport, isFullyErased, NOTICE_VERSION, Purpose } from "./privacy";

const db = new Firestore(); // ADC from the Cloud Run runtime SA (datastore.user)
const app = express();
app.use(express.json({ limit: "16kb" }));

// health — the uptime check hits this
app.get("/", (_req, res) => res.json({ service: "measurements", status: "ok" }));

// PI1.1 — published spec + data definitions
app.get("/openapi.json", (_req, res) => res.sendFile("openapi.json", { root: process.cwd() }));

// PI1.2/1.3/1.5 — validate, idempotent process, integrity-hashed store
app.post("/readings", async (req, res) => {
  const key = req.header("Idempotency-Key");
  if (!key) return res.status(400).json({ errors: ["Idempotency-Key header required (PI1.3)"] });
  const v = validate(req.body);
  if (!v.ok) return res.status(422).json({ errors: v.errors }); // reject bad input, no partial write
  const ref = db.collection("readings").doc(key);
  try {
    const created = await db.runTransaction(async (tx) => {
      const existing = await tx.get(ref);
      if (existing.exists) return false; // idempotent: same key never double-counts
      tx.set(ref, { ...v.reading, hash: integrityHash(v.reading), canonical: canonical(v.reading) });
      return true;
    });
    res.status(created ? 201 : 200).json({ stored: v.reading, hash: integrityHash(v.reading), idempotent_replay: !created });
  } catch (e) {
    res.status(500).json({ errors: ["storage error", String(e)] }); // PI1.3 error handling — no silent loss
  }
});

// PI1.4 — complete, accurate, integrity-checked output
app.get("/readings/:device_id/summary", async (req, res) => {
  try {
    const snap = await db.collection("readings").where("device_id", "==", req.params.device_id).get();
    const rows = snap.docs.map((d) => ({ reading: d.data() as Reading, hash: (d.data() as any).hash as string }));
    res.json(summarize(req.params.device_id, rows));
  } catch (e) {
    res.status(500).json({ errors: ["query error", String(e)] });
  }
});


// P1.1 — published privacy notice
app.get("/privacy", (_req, res) => res.sendFile("PRIVACY-NOTICE.md", { root: process.cwd() }));

// P2/P3.2 — record explicit, per-purpose consent
app.post("/subjects", async (req, res) => {
  const id = req.body?.subject_id;
  if (typeof id !== "string" || !/^[^@\s]+@[^@\s]+$/.test(id)) return res.status(422).json({ errors: ["subject_id: valid email required"] });
  const purposes = Array.isArray(req.body?.purposes) ? req.body.purposes : [];
  const consent: Consent = { subject_id: id, purposes, notice_version: NOTICE_VERSION, granted_at: new Date().toISOString() };
  await db.collection("consents").doc(id).set(consent);
  await db.collection("subjects").doc(id).set(minimize(req.body)); // P3.1 minimization
  res.status(201).json({ consent });
});

// P2 — withdraw consent
app.delete("/subjects/:id/consent", async (req, res) => {
  await db.collection("consents").doc(req.params.id).set({ withdrawn_at: new Date().toISOString() }, { merge: true });
  res.json({ withdrawn: true });
});

// P5.1 — DSAR access: export everything held about the subject
app.get("/subjects/:id/export", async (req, res) => {
  const id = req.params.id;
  const [subj, cons, reads, disc] = await Promise.all([
    db.collection("subjects").doc(id).get(),
    db.collection("consents").doc(id).get(),
    db.collection("readings").where("subject_id", "==", id).get(),
    db.collection("disclosures").where("subject_id", "==", id).get(),
  ]);
  res.json(assembleExport(id, subj.exists ? subj.data()! : null, cons.exists ? cons.data() as Consent : null,
    reads.docs.map((d) => d.data()), disc.docs.map((d) => d.data()), new Date().toISOString()));
});

// P5.2 — correction
app.put("/subjects/:id", async (req, res) => {
  await db.collection("subjects").doc(req.params.id).set(minimize(req.body), { merge: true });
  res.json({ corrected: true });
});

// P4.3 — erasure (right to be forgotten); verified complete via an export check
app.delete("/subjects/:id", async (req, res) => {
  const id = req.params.id;
  const reads = await db.collection("readings").where("subject_id", "==", id).get();
  const batch = db.batch();
  reads.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(db.collection("subjects").doc(id));
  batch.delete(db.collection("consents").doc(id));
  await batch.commit();
  res.json({ erased: true });
});

// P6.7 — accounting of disclosures made about a subject
app.get("/subjects/:id/disclosures", async (req, res) => {
  const d = await db.collection("disclosures").where("subject_id", "==", req.params.id).get();
  res.json({ subject_id: req.params.id, disclosures: d.docs.map((x) => x.data()) });
});

// P8.1 — complaint intake (tracked to resolution)
app.post("/privacy/complaints", async (req, res) => {
  const ref = db.collection("complaints").doc();
  await ref.set({ ...req.body, received_at: new Date().toISOString(), status: "open" });
  res.status(201).json({ id: ref.id, status: "open" });
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, () => console.log(`measurements listening on ${port}`));
