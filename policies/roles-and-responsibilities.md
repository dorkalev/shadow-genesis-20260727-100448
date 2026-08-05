---
owner: dorkalev
version: 1.1
approved_by: dorkalev
approved_at: 2026-08-05
last_reviewed: 2026-08-05
review_by: 2027-08-05
criteria: CC1.3
---
# Roles and Responsibilities

The company has exactly one human role: **Owner/Founder — dorkalev**. The
founder is accountable for security, risk acceptance, policy approval, access,
development, incident decisions, releases, and periodic control reviews. This
concentration is explicit and is not disguised as segregation of duties.

GitHub Actions, coding agents, review agents, Firebase Auth, and GCP service
accounts are machine identities. They execute scoped preventive or detective
controls but do not report to management, exercise human judgment, sign policy,
or satisfy a requirement for a second person. Compensating controls are
protected branches, deterministic gates, least-privilege/keyless deployment,
tamper-evident archives, monitoring, complete population reconciliation, and
external CPA examination. Future personnel require a policy and role-matrix
change before access is granted.
