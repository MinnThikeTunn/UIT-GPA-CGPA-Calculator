# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

University GPA/CGPA calculator for UIT students. Next.js App Router, TypeScript, vanilla CSS (Tailwind explicitly avoided per design mandate).

## Dev Commands

```bash
npm run dev      # Development server at localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # Lint with Next.js ESLint config
```

No test framework configured. Do not add one unless explicitly requested.

## Architecture

- **`src/app/page.tsx`** — Main calculator UI and logic (semester management, subject CRUD, GPA/CGPA calculation via `useMemo`). Includes a floating action button (FAB) linking to the AI Chatbot.
- **`src/app/chatbot/page.tsx`** — AI Study Assistant chatbot. Simulates bot responses for GPA/CGPA academic queries. Separate route from the main calculator.
- **`src/app/layout.tsx`** — Root layout with global fonts.
- **`src/app/globals.css`** — WIRED design system implementation (brutalist, no shadows, no border-radius, strict typography). Includes styles for both the calculator and the chatbot.
- **`DESIGN.md`** — Full design specification (read before modifying CSS/UI).
- **`GEMINI.md`** — Project conventions and grade mapping reference.

## Design System (WIRED Aesthetic)

Override `DESIGN.md` principles when modifying CSS or UI:
- `border-radius: 0` on all containers, images, buttons
- No `box-shadow` — depth via rule weight (1px hairline → 2px hard border → solid black ribbon)
- Typography: Playfair Display (display), Inter (UI labels), JetBrains Mono (mono kickers/eyebrows)
- Single accent color: Link Blue (`#057dbc`) for hovers only
- Strictly square corners — the foundational constraint

## Calculation Logic

- Grade mapping: A+/A=4.0, A-=3.67, B+=3.33, B=3.0, B-=2.67, C+=2.33, C=2.0, D=1.0, F/NA=0.0
- Subject Grade Point = Grade Point × Credits Earned
- Semester GPA = Σ(Subject Grade Points) / Σ(Credits) per semester
- CGPA = Total accumulated grade points / Total accumulated credits across all semesters
- Default credit per subject: 3

## Conventions

- React functional components with Hooks (`useState`, `useMemo`, `useEffect`)
- Client component (`"use client"`) — handles hydration with `isMounted` check and `suppressHydrationWarning`
- Calculator state: `semesters` array of `{ id, subjects[{ id, name, grade, creditEarned }], nextSubjectNo }`
- Chatbot state: `messages[]` array of `{ id, role: "user" | "bot", content, timestamp }`
- No external state management — local React state only
- Chat responses are client-side simulated (no backend API)

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | `src/app/page.tsx` | Main GPA/CGPA Calculator |
| `/chatbot` | `src/app/chatbot/page.tsx` | AI Study Assistant |

## Memory Systems

Before implementing anything, check these:

- **`decision-log/`** — Technical decisions and why they were made (start here for architecture questions)
- **`lesson-log/`** — Mistakes to avoid (check before writing TypeScript/React code)
- **`success-log/`** — Reusable patterns from successful implementations (check before adding similar features)
