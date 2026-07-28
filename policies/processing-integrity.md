---
owner: dorkalev
version: 1.0
approved_by: OPEN
review_by: 2027-07-28
criteria: PI1.1, PI1.2, PI1.3, PI1.4, PI1.5
---
# Processing Integrity Policy

The service processes data completely, accurately, and timely, and stores it with verifiable integrity. Controls are implemented in code (`app/`) and specified in `app/SPEC.md`: input validation with rejection of incomplete/inaccurate data (PI1.2), idempotent transactional processing with error handling (PI1.3), integrity-hashed storage (PI1.5), and integrity-checked output with explicit completeness flags (PI1.4). Data definitions and the processing specification are published (`app/openapi.json`, `app/SPEC.md`; PI1.1). Changes to processing logic go through the standard gated SDLC and are covered by unit tests (`app/test/`).
