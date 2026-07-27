# System Description (SOC 2 Section III, per DC 200) — DRAFT

> Draft authored by the shadow for owner review. A CPA reviews the final version.

**DC1 Services:** a software service developed and operated by dorkalev, deployed on managed cloud infrastructure, developed with AI assistance under an enforced change-management pipeline.
**DC2 Principal commitments & requirements:** confidentiality, availability, and processing integrity of customer data; reviewed+tested changes only; incident notification. See `policies/objectives-and-commitments.md`.
**DC3 Components:** *Infrastructure* — GitHub (source/CI), managed cloud (runtime, datastore). *Software* — the application + `shadow-ci` gates. *People* — the owner (see roles). *Procedures* — the SDLC and policy pack. *Data* — customer data (Confidential tier).
**DC4 Incidents:** none to date; tracked under `evidence/security-events/`.
**DC5 Applicable TSC & controls:** Security (Common Criteria) in scope; controls per this policy pack and the shadow machinery.
**DC6 CUECs (customer responsibilities):** customers manage their own credentials and access to the service.
**DC7 CSOCs (sub-service orgs):** cloud provider and GitHub — physical/environmental and platform controls carved out; their SOC 2 reports reviewed annually (`evidence/subservice/`).
