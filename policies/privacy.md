---
owner: dorkalev
version: 1.0
approved_by: dorkalev
review_by: 2027-07-28
criteria: P1.1, P2.1, P3.1, P3.2, P4.1, P4.2, P4.3, P5.1, P5.2, P6.1, P6.2, P6.3, P6.6, P6.7, P7.1, P8.1
---
# Privacy Policy (program)

Personal data is handled per the published notice (`app/PRIVACY-NOTICE.md`) and enforced in code (`app/src/privacy.ts`, `app/src/server.ts`): explicit per-purpose consent that is withdrawable (P2/P3.2), data minimization (P3.1), use limited to consented purposes (P4.1), retention windows with deletion (P4.2), DSAR access/correction/erasure endpoints (P5.1/P5.2/P4.3), a disclosure log + accounting (P6.2/P6.7), and complaint intake tracked to resolution (P8.1). Breach records (P6.3) and subject/regulator breach notification (P6.6) follow the Incident Response Plan; "none this period" is a valid record. Vendor privacy commitments/DPAs are in `policies/vendor-register.md` (P6.4/P6.5). Data quality (P7.1) reuses the input-validation controls in `app/src/pi.ts`.
