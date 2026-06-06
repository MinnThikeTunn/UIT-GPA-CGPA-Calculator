# Lesson Log - Knowledge Base

> A persistent memory of mistakes made by coding agents. Read before implementing to avoid repeating errors.

## Index

| ID | Date | Lesson Title | Severity |
|----|------|--------------|----------|
| [001](./001-dont-use-any-type.md) | 2024-06-05 | Don't Use `any` Type in TypeScript | 🔴 Critical |
| [002](./002-use-suppress-hydration-warning.md) | 2024-06-05 | Hydration Mismatch Fix Pattern | 🟡 Important |
| [003](./003-dont-forget-is-mounted.md) | 2024-06-05 | React useEffect Cleanup Pattern | 🔴 Critical |

---

## How to Add a New Lesson

1. Create a new `.md` file with next sequential ID: `XXX-lesson-title-kebab-case.md`
2. Add entry to this TOC table
3. Use the lesson template:

```markdown
# Lesson: [Title]

**Date:** YYYY-MM-DD
**Severity:** 🔴 Critical / 🟡 Important / 🟢 Warning
**Context:** [What was the situation when the mistake happened]

## The Mistake
[Describe what went wrong]

## The Error
```
[Show actual error message if applicable]
```

## Root Cause
[Why did this happen]

## The Fix
```tsx
// Correct implementation
```

## Prevention
- [Checklist to prevent this in the future]
- [Or: Always do X before Y]
```

---

## Reading Guide for Coding Agents

**ALWAYS check this before:**
- Writing TypeScript code (lessons on types)
- Using React hooks (lessons on hooks)
- Modifying any file in the project (check for relevant lessons)

**Severity Legend:**
- 🔴 **Critical** — Breaks the app or causes major bugs. MUST avoid.
- 🟡 **Important** — Causes issues but app still works. Should avoid.
- 🟢 **Warning** — Minor issue, best practice to follow.

## Quick Search

Looking for something specific?
- **Types**: `001`
- **React**: `002`, `003`
- **Hooks**: `003`
- **Hydration**: `002`