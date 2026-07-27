---
owner: dorkalev
version: 1.0
review_by: 2027-07-27
---
# Vendor Register

Vendors with access to systems or data, reviewed at least annually (CC9.2, P6.4).

| Vendor | Service | Data accessed | Inherent risk | DPA/Terms | SOC 2 on file | Review status |
|--------|---------|---------------|---------------|-----------|---------------|---------------|
| GitHub | Source, CI, issues | Source, metadata | High | Terms | Yes (GitHub SOC 2) | Approved |
| Google Cloud / Firebase | Runtime, datastore | Customer data | High | DPA | Yes (GCP SOC 2) | Approved |
| Anthropic / OpenAI | LLM (dev + agents) | Prompts, code snippets | Medium | Terms/DPA | Vendor report | Approved — no customer PII in prompts |
| Email/domain provider | Email, DNS | Internal comms | Medium | Terms | Review | Approved |
