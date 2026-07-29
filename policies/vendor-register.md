---
owner: dorkalev
version: 1.1
approved_by: dorkalev
approved_at: 2026-07-29
last_reviewed: 2026-07-29
review_by: 2027-07-29
criteria: CC9.2, P6.4, P6.5, P6.1
---
# Vendor Register

Vendors / sub-processors with access to systems or data, reviewed at least annually
(CC9.2, P6.4). Per-vendor review memos: `../evidence/vendors/`. Notice contact for
security/breach matters: the owner (dorkalev), via the channel in `.well-known/security.txt`.

| Vendor | Service | Data accessed | Receives PI | Consent basis | Inherent risk | DPA/Terms | Breach-notice clause | Notice contact | SOC 2 on file | Review status |
|--------|---------|---------------|-------------|---------------|---------------|-----------|----------------------|----------------|---------------|---------------|
| Google Cloud / Firebase | Runtime, datastore | Customer data | Yes | Processor (our lawful basis) | High | DPA | Yes (Google Cloud DPA) | Google security | Yes (GCP SOC 2) | Approved 2026-07-29 |
| GitHub | Source, CI, issues | Source, metadata | No | n/a | High | DPA/Terms | Yes (GitHub DPA) | GitHub security | Yes (GitHub SOC 2 Type II) | Approved 2026-07-29 |
| LLM provider (Anthropic/Google/OpenAI) | LLM (dev + agents) | Public/Internal only | No | n/a (no PII sent) | Medium | DPA/Terms | Yes (provider DPA) | provider trust center | Vendor SOC 2 report | Approved 2026-07-29 — no customer PII in prompts |
| Email/domain provider | Email, DNS | Internal comms | No | n/a | Medium | Terms | Per provider terms | provider support | Review | Approved |

Each row is reviewed annually against the vendor's current attestation
(`../evidence/vendors/<vendor>-review-2026.md`); "Receives PI" and "Consent basis" support
the privacy disclosure accounting (P6.1). Changes go through the SDLC PR flow (merge = approval).
