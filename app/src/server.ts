import express from "express";
import { Firestore } from "@google-cloud/firestore";
import { validate, integrityHash, canonical, summarize, Reading } from "./pi";

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

const port = Number(process.env.PORT) || 8080;
app.listen(port, () => console.log(`measurements listening on ${port}`));
