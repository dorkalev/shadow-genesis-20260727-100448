---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: CC2.1, CC7.2
---
# Logging & Monitoring Policy

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

Relevant, quality information is generated and retained: GitHub audit and change history, the immutable `compliance-archives` branch (one record per merged change with bypass analysis), scanner alerts (Dependabot, secret scanning, CodeQL), and — on the cloud runtime — audit logs and uptime monitoring with alerting. Logs are retained for at least 90 days. Anomalies route to the incident process.
