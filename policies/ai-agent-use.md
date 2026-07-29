---
owner: dorkalev
version: 1.0
approved_by: dorkalev
approved_at: 2026-07-29
review_by: 2027-07-29
last_reviewed: 2026-07-29
criteria: CC8.1, CC6.3, CC9.2
---
# AI Development & Agent-Use Policy

This team develops with AI coding agents. That is a first-class part of the SDLC, so it is
governed like any other privileged actor. This policy defines how agents are identified,
what they may access, how their work is reviewed, and how vendor data-handling is controlled.

## Roles in the change process (solo team)
- **Coder agent** — authors code and documents against a ticket. Never merges.
- **Reviewer agent** — a *distinct* identity that reviews every PR diff and records findings.
  It is not the same identity as the coder on a given change (no self-review).
- **Human signer (dorkalev)** — the accountable person who approves by **merging** the PR.
  The merge is the approval-of-record and the trigger for deploy (CI/CD). No change reaches
  `staging`/production without a human signer merging it.

An auditor asks for a person in the loop; on a one-person technical team the human's control
is *signing/merging*, not staffing a second reviewer who does not actually read agent-written
code. The reviewer control is satisfied by an independent reviewer agent plus the gate.

## Agent identities & credentials
- Each agent runs with a **scoped, least-privilege token** (CI `GITHUB_TOKEN` or a dedicated
  fine-grained token). Agents never hold long-lived cloud keys; deploys use keyless WIF.
- Agent credentials are **not** shared with the human signer's personal credentials.
- Fork PRs never receive secrets (prompt-injection in a fork diff must not reach an agent
  holding keys + write). Enforced in `review.yml`.

## No self-approval
- The coder agent cannot approve or merge its own change. The gate rejects a PR whose only
  authorization is itself, and the merge actor must differ from the sole author.

## Prompt / spec on the ticket
- The intent an agent is given (prompt or spec) is recorded on the authorizing ticket, so the
  change is traceable to a human-approved intent, not just to generated output.

## LLM-vendor data handling
- Only data classified **Public** or **Internal** may be sent to an LLM vendor. **Confidential**
  or customer personal data is never pasted into prompts (see `data-classification.md`,
  `data-handling.md`).
- LLM providers are inventoried as sub-processors in `../vendor-register.md` with a DPA and a
  zero-retention / no-train-on-data setting where offered (`../evidence/vendors/`).
- Agent activity that changes the repo or infrastructure is auditable via GitHub/GCP audit logs
  and the `compliance-archives` records.

## Review & change
This policy changes only through the SDLC PR flow; the merge is the approval record.
