# Hotfix Runbook

Normal changes reach production only through a gated PR to protected `main`.
If the founder uses an authorized emergency bypass, immediately open an
incident ticket recording impact, root cause, actor, exact commit, failed or
missing checks, and why delay would have increased harm. Then branch from the
current `main` and open a remediation PR to `main` containing the missing
regression test, monitoring, documentation, or corrective control.

The original exception remains visible in the post-merge archive. Never replay
the commit to another long-lived branch, force-push, or rewrite history. Close
the incident only after the remediation PR passes every normal gate and its
non-bypass archive record exists.
