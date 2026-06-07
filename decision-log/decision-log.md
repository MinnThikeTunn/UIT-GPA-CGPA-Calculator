# Decision Log - Table of Contents

> A persistent memory system for technical decisions. Each entry documents the "why" behind choices made during development.

## Index

| ID | Date | Title | Status |
|----|------|-------|--------|
| [001](./001-initial-project-setup.md) | 2024-XX-XX | Initial Project Setup | ✅ Implemented |
| [002](./002-architecture-choice.md) | 2024-XX-XX | Frontend-Only Architecture | ✅ Implemented |
| [003](./003-wired-design-system.md) | 2024-XX-XX | WIRED Design System Adoption | ✅ Implemented |
| [004](./004-grading-scale.md) | 2024-XX-XX | Grade Point Mapping (UIT Standard) | ✅ Implemented |
| [005](./005-no-tailwind-css.md) | 2024-XX-XX | No Tailwind CSS Mandate | ✅ Implemented |
| [006](./006-chatbot-ai-assistant.md) | 2024-06-05 | AI Study Assistant Chatbot | ✅ Implemented |

---

## How to Add a New Decision

1. Create a new `.md` file with next sequential ID: `XXX-title-kebab-case.md`
2. Add entry to this TOC table
3. Use the decision template:

```markdown
# Decision: [Title]

**Date:** YYYY-MM-DD
**Status:** Proposed / Proposed → Implemented / Rejected / Deprecated
**Context:** [What problem or question prompted this decision]

## Decision
[What was chosen]

## Rationale
[Why this choice was made]

## Alternatives Considered
- [Alternative 1]: Why rejected
- [Alternative 2]: Why rejected

## Consequences
### Positive
- [Benefit 1]

### Negative
- [Drawback 1]
```

---

## Reading Guide for Coding Agents

- Start with `001` to understand project foundation
- Check status: ✅ Implemented, 🔄 Proposed, ❌ Rejected, 🗑️ Deprecated
- Each decision builds on previous ones
- Check the latest decisions first for current architecture