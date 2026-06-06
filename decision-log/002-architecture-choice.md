# Decision: Frontend-Only Architecture

**Date:** 2024-06-05
**Status:** ✅ Implemented
**Context:** Deciding whether to build a backend API or keep the application purely client-side

## Decision

Keep the application frontend-only with local state management. No backend required.

## Rationale

- **No persistent data requirement**: Users calculate GPA for their current session; no need to save across sessions
- **Privacy**: Student's academic data stays on their device
- **Simplicity**: No server maintenance, no database, no API endpoints
- **Speed**: Instant calculations without network latency
- **Cost**: Free hosting (Vercel/Netlify) without backend costs

## Alternatives Considered

- **Full-stack with database**: Would allow saving semester data across devices
  - Rejected: Adds significant complexity, hosting costs, and privacy concerns for sensitive academic data
- **LocalStorage-only**: Could persist data locally
  - Rejected: Adds complexity without clear benefit; users typically start fresh each session
- **Firebase/Supabase**: Easy backend-as-a-service
  - Rejected: Overkill for calculator functionality; adds vendor lock-in

## Consequences

### Positive
- Fastest possible user experience
- Zero hosting costs
- No data privacy concerns
- Easy deployment
- Simpler codebase

### Negative
- Data lost on page refresh (acceptable per use case)
- No multi-device sync
- No user accounts/auth

## Future Considerations

If user accounts or data persistence is needed later:
1. Add LocalStorage as v1 of data persistence
2. Consider Firebase Auth + Firestore for cloud sync
3. User data should remain optional (not required for core functionality)