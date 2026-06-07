# Lesson: Hydration Mismatch Fix Pattern

**Date:** 2024-06-05
**Severity:** 🟡 Important
**Context:** Next.js App Router client component with data from localStorage or browser APIs

## The Mistake

Reading browser-only data (localStorage, window, Date) directly in client component without handling SSR/hydration.

```typescript
// ❌ BAD - This causes hydration mismatch
"use client";
import { useState } from 'react';

export default function Calculator() {
  const [semesters, setSemesters] = useState(
    JSON.parse(localStorage.getItem('semesters') || '[]')
  );

  return <div>{/* render semesters */}</div>;
}
```

## The Error

```
Warning: Text content did not match. Server: "[]" Client: "[{...}]"
Warning: Expected server HTML to contain a matching <div> in <Calculator>.
```

## Root Cause

- Server-rendered HTML (empty array from `|| '[]'`)
- Client-side hydrated with real data from localStorage
- Mismatch causes React hydration warning/errors

## The Fix

Use `isMounted` pattern to skip server rendering for client-only data:

```typescript
// ✅ GOOD - Proper hydration handling
"use client";
import { useState, useEffect } from 'react';

export default function Calculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Only access localStorage after mount (client-only)
    const stored = localStorage.getItem('semesters');
    if (stored) {
      setSemesters(JSON.parse(stored));
    }
  }, []);

  // Don't render client-only content until mounted
  if (!isMounted) {
    return null; // or a loading skeleton that matches server HTML
  }

  return <div>{/* render semesters */}</div>;
}
```

Alternative - use `suppressHydrationWarning` for minor mismatches:

```typescript
// For third-party components with unavoidable hydration mismatch
<div suppressHydrationWarning>{content}</div>
```

## Prevention

- **ALWAYS** use `isMounted` when accessing:
  - `localStorage`
  - `window`
  - `document`
  - `Date.now()`
  - `Math.random()`
- Put browser-only logic in `useEffect`
- Check existing code in `page.tsx` for the pattern to follow