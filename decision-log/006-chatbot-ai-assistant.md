# Decision: AI Study Assistant Chatbot

**Date:** 2024-06-05
**Status:** ✅ Implemented
**Context:** Adding a conversational interface to help students understand GPA/CGPA calculations and academic planning

## Decision

Add an AI Study Assistant chatbot as a separate Next.js route (`/chatbot`) with client-side simulated responses.

## Rationale

- **Student engagement**: Conversational interface lowers barrier for students to explore academic calculations
- **No backend complexity**: Client-side simulated responses keep architecture simple (no API keys, no server costs)
- **Self-contained**: Chatbot logic stays within the existing React/Next.js stack without external dependencies
- **Future-proof**: Can be upgraded to a real AI backend later without changing the UI

## Alternatives Considered

- **Full AI backend (OpenAI/Gemini API)**
  - Rejected: Requires API keys, cost management, backend infrastructure, and data privacy considerations
- **Embedding chatbot in a modal on the main page**
  - Rejected: Would clutter the calculator UI; separate route provides cleaner UX and dedicated chat experience
- **Using a chat widget library (e.g., React Chatbot Kit)**
  - Rejected: Adds external dependencies and may conflict with the strict WIRED design system

## Implementation

- `src/app/chatbot/page.tsx` - Chatbot page component with message history, input, and simulated responses
- `src/app/globals.css` - Chat-specific styles (chat bubbles, input zone, message stream, empty state)
- Floating Action Button (FAB) on `src/app/page.tsx` linking to `/chatbot`
- Simulated responses based on keyword matching (`gpa`, `cgpa`, `improve`, etc.)

## Consequences

### Positive
- Students can ask questions in natural language about GPA/CGPA
- No additional dependencies or API costs
- Clean separation from calculator logic
- Consistent WIRED design aesthetic maintained

### Negative
- Responses are pre-defined and not truly intelligent (keyword matching only)
- No conversation memory beyond the current page session
- Cannot handle complex or unexpected queries
- Will need a real AI integration if conversational quality becomes a priority
