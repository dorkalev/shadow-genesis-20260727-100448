import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { Firestore } from "@google-cloud/firestore";
import { validate, integrityHash, canonical, summarize, Reading } from "./pi";
import { Consent, PURPOSES, hasActiveConsent, minimize, assembleExport, NOTICE_VERSION, Purpose, dsarLogEntry } from "./privacy";
import { ownsSubject, recentlyAuthenticated, requireFirebaseAuth } from "./auth";

const db = new Firestore();
export const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "16kb", strict: true }));

const globalLimiter = rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true, legacyHeaders: false });
const sensitiveLimiter = rateLimit({ windowMs: 60_000, max: 10, standardHeaders: true, legacyHeaders: false });
app.use(globalLimiter);

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
const asyncRoute = (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

function authorizeSubject(req: Request, res: Response): boolean {
  if (req.principal && ownsSubject(req.principal, req.params.id)) return true;
  res.status(403).json({ error: "subject_access_denied" });
  return false;
}

async function audit(req: Request, action: string, target: string, outcome: "success" | "denied"): Promise<void> {
  await db.collection("audit_events").add({
    action, target, outcome,
    actor_uid: req.principal?.uid ?? "unauthenticated",
    at: new Date().toISOString(),
    request_id: req.header("x-cloud-trace-context")?.split("/")[0] ?? null,
  });
}

app.get("/", (_req, res) => res.json({ service: "measurements", status: "ok" }));
app.get("/openapi.json", (_req, res) => res.sendFile("openapi.json", { root: process.cwd() }));
app.get("/privacy", (_req, res) => res.sendFile("PRIVACY-NOTICE.md", { root: process.cwd() }));

app.post("/readings", requireFirebaseAuth, asyncRoute(async (req, res) => {
  const key = req.header("Idempotency-Key");
  if (!key || !/^[A-Za-z0-9._:-]{8,128}$/.test(key)) {
    return res.status(400).json({ errors: ["valid Idempotency-Key header required"] });
  }
  const v = validate(req.body);
  if (!v.ok) return res.status(422).json({ errors: v.errors });
  const subjectId = typeof req.body?.subject_id === "string" ? req.body.subject_id : undefined;
  if (subjectId) {
    if (!req.principal || !ownsSubject(req.principal, subjectId)) return res.status(403).json({ error: "subject_access_denied" });
    const consentDoc = await db.collection("consents").doc(subjectId).get();
    const consent = consentDoc.exists ? consentDoc.data() as Consent : null;
    if (!hasActiveConsent(consent, "service_operation")) return res.status(403).json({ error: "active_consent_required" });
  }
  const ref = db.collection("readings").doc(key);
  const created = await db.runTransaction(async (tx) => {
    const existing = await tx.get(ref);
    if (existing.exists) return false;
    tx.set(ref, { ...v.reading, ...(subjectId ? { subject_id: subjectId } : {}), hash: integrityHash(v.reading), canonical: canonical(v.reading) });
    return true;
  });
  return res.status(created ? 201 : 200).json({ stored: v.reading, hash: integrityHash(v.reading), idempotent_replay: !created });
}));

app.get("/readings/:device_id/summary", requireFirebaseAuth, asyncRoute(async (req, res) => {
  const snap = await db.collection("readings").where("device_id", "==", req.params.device_id).get();
  const rows = snap.docs.map((d) => ({ reading: d.data() as Reading, hash: d.data().hash as string }));
  return res.json(summarize(req.params.device_id, rows));
}));

app.post("/subjects", requireFirebaseAuth, asyncRoute(async (req, res) => {
  const id = req.body?.subject_id;
  if (typeof id !== "string" || !/^[^@\s]+@[^@\s]+$/.test(id)) return res.status(422).json({ errors: ["subject_id: valid email required"] });
  if (!req.principal || !ownsSubject(req.principal, id)) return res.status(403).json({ error: "subject_access_denied" });
  const requested = Array.isArray(req.body?.purposes) ? req.body.purposes : [];
  if (requested.length === 0 || requested.some((p: unknown) => typeof p !== "string" || !PURPOSES.includes(p as Purpose))) {
    return res.status(422).json({ errors: ["purposes must contain only supported, explicit purposes"] });
  }
  const purposes = [...new Set(requested)] as Purpose[];
  const consent: Consent = { subject_id: id, purposes, notice_version: NOTICE_VERSION, granted_at: new Date().toISOString() };
  await Promise.all([
    db.collection("consents").doc(id).set(consent),
    db.collection("subjects").doc(id).set(minimize(req.body)),
  ]);
  await audit(req, "consent_granted", id, "success");
  return res.status(201).json({ consent });
}));

app.delete("/subjects/:id/consent", requireFirebaseAuth, asyncRoute(async (req, res) => {
  if (!authorizeSubject(req, res)) return;
  await db.collection("consents").doc(req.params.id).set({ withdrawn_at: new Date().toISOString() }, { merge: true });
  await audit(req, "consent_withdrawn", req.params.id, "success");
  return res.json({ withdrawn: true });
}));

app.get("/subjects/:id/export", sensitiveLimiter, requireFirebaseAuth, asyncRoute(async (req, res) => {
  const id = req.params.id;
  if (!authorizeSubject(req, res)) { await audit(req, "dsar_export", id, "denied"); return; }
  const [subj, cons, reads, disc] = await Promise.all([
    db.collection("subjects").doc(id).get(), db.collection("consents").doc(id).get(),
    db.collection("readings").where("subject_id", "==", id).get(),
    db.collection("disclosures").where("subject_id", "==", id).get(),
  ]);
  await db.collection("dsar_log").add(dsarLogEntry(id, "export", { ok: true, reason: "firebase_id_token" }, new Date().toISOString()));
  return res.json(assembleExport(id, subj.exists ? subj.data()! : null, cons.exists ? cons.data() as Consent : null,
    reads.docs.map((d) => d.data()), disc.docs.map((d) => d.data()), new Date().toISOString()));
}));

app.put("/subjects/:id", requireFirebaseAuth, asyncRoute(async (req, res) => {
  if (!authorizeSubject(req, res)) return;
  await db.collection("subjects").doc(req.params.id).set(minimize({ ...req.body, subject_id: req.params.id }), { merge: true });
  await audit(req, "subject_corrected", req.params.id, "success");
  return res.json({ corrected: true });
}));

app.delete("/subjects/:id", sensitiveLimiter, requireFirebaseAuth, asyncRoute(async (req, res) => {
  const id = req.params.id;
  if (!authorizeSubject(req, res)) { await audit(req, "dsar_erase", id, "denied"); return; }
  if (!req.principal || !recentlyAuthenticated(req.principal, Math.floor(Date.now() / 1000))) {
    await audit(req, "dsar_erase", id, "denied");
    return res.status(403).json({ error: "recent_reauthentication_required" });
  }
  const reads = await db.collection("readings").where("subject_id", "==", id).get();
  const disclosures = await db.collection("disclosures").where("subject_id", "==", id).get();
  const batch = db.batch();
  reads.docs.forEach((d) => batch.delete(d.ref));
  disclosures.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(db.collection("subjects").doc(id));
  batch.delete(db.collection("consents").doc(id));
  await batch.commit();
  await db.collection("dsar_log").add(dsarLogEntry(id, "erase", { ok: true, reason: "recent_firebase_auth" }, new Date().toISOString()));
  return res.json({ erased: true });
}));

app.get("/subjects/:id/disclosures", requireFirebaseAuth, asyncRoute(async (req, res) => {
  if (!authorizeSubject(req, res)) return;
  const d = await db.collection("disclosures").where("subject_id", "==", req.params.id).get();
  return res.json({ subject_id: req.params.id, disclosures: d.docs.map((x) => x.data()) });
}));

app.post("/privacy/complaints", sensitiveLimiter, asyncRoute(async (req, res) => {
  const email = req.body?.email;
  const details = req.body?.details;
  if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+$/.test(email) || typeof details !== "string" || details.length < 10 || details.length > 4000) {
    return res.status(422).json({ errors: ["valid email and details (10-4000 chars) required"] });
  }
  const ref = db.collection("complaints").doc();
  await ref.set({ email, details, received_at: new Date().toISOString(), status: "open" });
  return res.status(201).json({ id: ref.id, status: "open" });
}));

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error("request_failed", { path: req.path, error: err instanceof Error ? err.message : "unknown" });
  if (!res.headersSent) res.status(500).json({ error: "internal_error" });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 8080;
  app.listen(port, () => console.log(`measurements listening on ${port}`));
}
