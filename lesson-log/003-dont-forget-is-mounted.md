# Lesson: React useEffect Cleanup Pattern

**Date:** 2024-06-05
**Severity:** 🔴 Critical
**Context:** Using useEffect with async operations, timers, or event listeners

## The Mistake

Not cleaning up useEffect when component unmounts or dependencies change.

```typescript
// ❌ BAD - Memory leak and potential errors
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getGrades();
    setGrades(data); // ❌ If component unmounted, this crashes!
  };
  fetchData();
}, []);

// ❌ BAD - Timer not cleared
useEffect(() => {
  const timer = setInterval(() => {
    saveToLocalStorage();
  }, 5000);
  // ❌ Missing clearInterval - memory leak!
}, []);
```

## The Error

```
Warning: Can't perform a React state update on an unmounted component.
This will cause a memory leak in your application.
```

Or memory leaks that slow down the app over time.

## Root Cause

- Forgetting to return cleanup function
- Not understanding React's component lifecycle
- Race conditions from stale closures

## The Fix

Always return a cleanup function:

```typescript
// ✅ GOOD - Proper cleanup for async
useEffect(() => {
  let isMounted = true; // Track if still mounted

  const fetchData = async () => {
    const data = await api.getGrades();
    if (isMounted) {
      setGrades(data); // Safe - component still mounted
    }
  };
  fetchData();

  return () => {
    isMounted = false; // Cleanup: prevent state update after unmount
  };
}, []);

// ✅ GOOD - Proper cleanup for intervals
useEffect(() => {
  const timer = setInterval(() => {
    saveToLocalStorage();
  }, 5000);

  return () => {
    clearInterval(timer); // Cleanup: stop timer on unmount
  };
}, []);

// ✅ GOOD - Proper cleanup for subscriptions
useEffect(() => {
  const unsubscribe = channel.subscribe(handleMessage);

  return () => {
    unsubscribe(); // Cleanup: unsubscribe on unmount
  };
}, [handleMessage]);
```

## Prevention

**Always ask "Should this clean up?" when writing useEffect:**

| Scenario | Cleanup Needed |
|----------|----------------|
| `setInterval`/`setTimeout` | ✅ `clearInterval`/`clearTimeout` |
| `fetch` with state update | ✅ `isMounted` flag |
| `addEventListener` | ✅ `removeEventListener` |
| WebSocket/subscription | ✅ `.disconnect()`/`.unsubscribe()` |
| Opening file/connection | ✅ Close resource |

**Template to follow:**
```typescript
useEffect(() => {
  // Setup
  const thing = doSetup();

  // Cleanup
  return () => {
    doCleanup(thing);
  };
}, [/* dependencies */]);
```