# Success: GPA/CGPA Calculation with useMemo

**Date:** 2024-06-05
**Context:** Need to calculate GPA (per semester) and CGPA (cumulative) in real-time as grades change

## What Was Implemented

A TypeScript calculation system using `useMemo` that computes:
- Grade points for each subject (grade × credits)
- Semester GPA (sum of grade points ÷ sum of credits)
- CGPA (total accumulated grade points ÷ total accumulated credits)

## The Solution

```typescript
// Grade point mapping (defined outside component)
const gradePointMap: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.67,
  'B+': 3.33, 'B': 3.0, 'B-': 2.67,
  'C+': 2.33, 'C': 2.0, 'D': 1.0,
  'F': 0.0, 'NA': 0.0
};

// Calculate single subject's grade points
const calculateSubjectGradePoint = (grade: string, credits: number): number => {
  const gradePoint = gradePointMap[grade] ?? 0;
  return gradePoint * credits;
};

// Semester GPA calculation (inside component, with useMemo)
const semesterGPA = useMemo(() => {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (const subject of semester.subjects) {
    totalGradePoints += calculateSubjectGradePoint(subject.grade, subject.creditEarned);
    totalCredits += subject.creditEarned;
  }

  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
}, [semester.subjects]);

// CGPA calculation across all semesters
const cgpa = useMemo(() => {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (const sem of semesters) {
    for (const subject of sem.subjects) {
      totalGradePoints += calculateSubjectGradePoint(subject.grade, subject.creditEarned);
      totalCredits += subject.creditEarned;
    }
  }

  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
}, [semesters]);
```

## Why It Worked

- **useMemo**: Recalculates only when dependencies change (grades, credits), not on every render
- **Defensive checks**: `totalCredits > 0` prevents division by zero
- **Separate from UI**: Calculation logic is clean, easy to test
- **Record lookup**: Grade map uses object for O(1) lookup instead of switch/if

## How to Reuse

For any **weighted average** calculation:

1. Define a mapping `Record<string, number>` for the weights
2. Use `reduce` or loop to sum (value × weight)
3. Divide by sum of weights
4. Wrap in `useMemo` with the data as dependency
5. Handle edge case (empty data → return 0)

## Related Components

- `src/app/page.tsx` - Main calculator component
- `src/app/globals.css` - Display in monospace font

## Edge Cases Handled

- Empty semester (no subjects) → GPA = 0
- All F grades → GPA = 0
- Default credits = 3 when not specified