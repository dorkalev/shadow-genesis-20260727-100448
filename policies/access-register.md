---
owner: dorkalev
version: 1.2
approved_by: dorkalev
approved_at: 2026-08-05
review_by: 2026-10-01
---
# Access Register

People, systems, and machine identities in the readiness boundary. Reconcile
quarterly against live GitHub/Firebase/GCP state and file the result under
`evidence/access-reviews/`.

## Human access

| Person | GitHub | GCP/Firebase | SaaS | MFA | Accountable role |
|---|---|---|---|---|---|
| dorkalev | repository owner/admin | project administrator through explicit predefined roles; no primitive Owner/Editor | vendor administrator | required; evidence reviewed separately | Sole Owner/Founder |

The single administrator concentration is disclosed and risk-accepted. Primitive
GCP Owner/Editor bindings are not an acceptable steady-state shortcut; the live
verifier reports them as failures until replaced with explicit administrative
roles and emergency recovery is documented.

The current founder grant set is: Project IAM Admin, Firebase Admin, Cloud Run
Admin, Artifact Registry Administrator, Service Account Admin, IAM Workload
Identity Pool Admin, Service Usage Admin, Monitoring Admin, Logs Configuration
Writer, Logs Viewer, and Private Logs Viewer. This is one human administrator,
not separation of duties; the concentration remains disclosed and risk-accepted.

## Machine access

| Identity | Purpose | Allowed access | Prohibited access |
|---|---|---|---|
| GitHub Actions default token | CI, PR comments, archive append | Workflow-scoped repository permissions | Personal credentials; cloud admin |
| Deploy service account via WIF | Build/push and deploy approved main image | Artifact Registry writer, Cloud Run deploy, required service-account use | Repository settings; long-lived keys; broad project Owner/Editor |
| Runtime service account | Serve API and use Firestore/logging | Datastore user and log writer required by the service | IAM administration; repository access; exported keys |
| Read-only verifier via WIF | Continuous configuration observations | Viewer/security/monitoring metadata required by verifier | Resource mutation; deployment; repository writes |
| Firebase Auth service | Verify application user identity | Token verification and user identity claims | Founder approval; project administration |

All service-account keys are expected to be absent. WIF trust is restricted to
the named GitHub repository, branch/workflow claims, and intended service
account. Any exception receives an owner, expiry, and ticket.
