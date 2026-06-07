# Lesson: Don't Use `any` Type in TypeScript

**Date:** 2024-06-05
**Severity:** 🔴 Critical
**Context:** TypeScript migration or new code where the developer was unsure of a type

## The Mistake

Using `any` type to bypass TypeScript type checking, thinking it's "faster" or "easier".

```typescript
// ❌ BAD - Never do this
const grades: any = getGradesFromStorage();
const subjectName: any = grades[0].name;

// This defeats the entire purpose of TypeScript!
```

## The Error

With `any`, TypeScript does not catch these bugs:

```typescript
// These would all pass silently:
grades[999].name  // undefined - runtime crash!
subjectName.toUpperCase()  // Might be number - runtime crash!
```

## Root Cause

- Developer didn't know the exact type
- "Quick fix" to make TypeScript happy
- Lack of understanding that `any` removes all type safety

## The Fix

Always define proper types:

```typescript
// ✅ GOOD - Define proper interfaces

interface Subject {
  id: string;
  name: string;
  grade: string;
  creditEarned: number;
}

interface Semester {
  id: string;
  subjects: Subject[];
  nextSubjectNo: number;
}

// Now TypeScript catches bugs:
const grades: Semester[] = getGradesFromStorage();
const subject = grades[0].subjects[0]; // ✅ Fully typed
const name: string = subject.name;     // ✅ Type checked
```

Or use `unknown` if truly dynamic:

```typescript
// If you really don't know the type - use unknown + type narrowing
function handleData(data: unknown) {
  if (isSubject(data)) {
    // TypeScript knows it's Subject here
    console.log(data.name);
  }
}
```

## Prevention

- **NEVER** use `any` as a quick fix
- When uncertain of type: use `unknown` or define interface
- Run TypeScript in strict mode
- Use IDE autocomplete to discover proper types
- Reference existing types in `page.tsx` (`Semester`, `Subject` interfaces)