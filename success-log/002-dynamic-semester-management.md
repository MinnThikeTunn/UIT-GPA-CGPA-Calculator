# Success: Dynamic Semester/Subject CRUD

**Date:** 2024-06-05
**Context:** Need to allow users to dynamically add/remove semesters and subjects with unique IDs

## What Was Implemented

A nested CRUD system:
- Add/remove semesters (up to 10)
- Add/remove subjects within each semester
- Each semester tracks its own `nextSubjectNo` for display
- Unique IDs for React key prop

## The Solution

### State Structure

```typescript
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

const [semesters, setSemesters] = useState<Semester[]>([
  {
    id: 'sem-1',
    subjects: [],
    nextSubjectNo: 1
  }
]);
```

### Adding a Semester

```typescript
const addSemester = () => {
  if (semesters.length >= 10) return; // Max 10 semesters

  const newSemester: Semester = {
    id: `sem-${Date.now()}`, // Unique ID
    subjects: [],
    nextSubjectNo: 1
  };

  setSemesters([...semesters, newSemester]);
};
```

### Adding a Subject

```typescript
const addSubject = (semesterId: string) => {
  setSemesters(semesters.map(sem => {
    if (sem.id !== semesterId) return sem;

    const newSubject: Subject = {
      id: `sub-${Date.now()}-${Math.random()}`,
      name: '',
      grade: 'A',
      creditEarned: 3 // Default credits
    };

    return {
      ...sem,
      subjects: [...sem.subjects, newSubject],
      nextSubjectNo: sem.nextSubjectNo + 1
    };
  }));
};
```

### Removing a Subject

```typescript
const removeSubject = (semesterId: string, subjectId: string) => {
  setSemesters(semesters.map(sem => {
    if (sem.id !== semesterId) return sem;

    return {
      ...sem,
      subjects: sem.subjects.filter(s => s.id !== subjectId)
    };
  }));
};
```

### Updating a Subject

```typescript
const updateSubject = (
  semesterId: string,
  subjectId: string,
  field: keyof Subject,
  value: string | number
) => {
  setSemesters(semesters.map(sem => {
    if (sem.id !== semesterId) return sem;

    return {
      ...sem,
      subjects: sem.subjects.map(s =>
        s.id === subjectId ? { ...s, [field]: value } : s
      )
    };
  }));
};
```

## Why It Worked

- **Immutable updates**: Using `map` creates new arrays, triggers re-render
- **Unique IDs**: `Date.now()` + random ensures no ID collisions
- **Nested updates**: Update semester, then subjects within that semester
- **Default values**: Grade = 'A', Credits = 3 for new subjects
- **Max limit**: 10 semesters prevents UI overwhelm

## How to Reuse

For any **nested dynamic list** (e.g., categories → items):

1. Define interfaces for parent and child
2. Parent has `id` and array of children
3. Child has unique `id` + editable fields
4. Use `map` for immutable updates
5. Use filter for removal
6. Always provide defaults for new items

## Related Components

- `src/app/page.tsx` - All CRUD operations
- Renders `semesters.map()` → `semester.subjects.map()`

## Limitations

- Data lost on refresh (no persistence) - acceptable per decision #002
- No undo/redo for deletions