# Decision: Initial Project Setup

**Date:** 2024-06-05
**Status:** ✅ Implemented
**Context:** Need to create a GPA/CGPA calculator for UIT students with a modern, distinctive UI

## Decision

Use Next.js 14+ with App Router, TypeScript, and vanilla CSS as the core tech stack.

## Rationale

- **Next.js App Router**: Latest stable version with Server Components by default, better performance
- **TypeScript**: Type safety for calculation logic, reduces runtime errors
- **Vanilla CSS**: Full control over styling without framework constraints, lighter bundle

## Alternatives Considered

- **React + Vite**: Good alternative, but Next.js provides routing infrastructure (even for single-page apps) and SSR foundation if needed later
- **Vue.js**: Less familiar to the developer, React is the primary framework

## Consequences

### Positive
- Type-safe calculations
- Fast initial load via Next.js optimization
- Easy to add more routes (chatbot, export, etc.)
- Scalable project structure

### Negative
- Slightly larger bundle than pure client-side React
- More configuration overhead initially