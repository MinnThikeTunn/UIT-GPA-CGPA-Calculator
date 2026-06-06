# Architecture Overview

This document serves as a critical, living template designed to equip agents with a rapid and comprehensive understanding of the codebase's architecture, enabling efficient navigation and effective contribution from day one. Update this document as the codebase evolves.

## 1. Project Structure

This section provides a high-level overview of the project's directory and file structure, categorised by architectural layer or major functional area. It is essential for quickly navigating the codebase, locating relevant files, and understanding the overall organization and separation of concerns.

[Project Root]/
├── src/                   # Main source code directory
│   └── app/               # Next.js App Router
│       ├── page.tsx       # Main calculator UI and logic
│       ├── chatbot/
│       │   └── page.tsx   # AI Study Assistant chatbot
│       ├── layout.tsx     # Root layout with global fonts
│       └── globals.css    # WIRED design system (brutalist CSS)
├── .next/                 # Next.js build output (generated)
├── node_modules/          # Dependencies (generated)
├── public/                # Static assets (Next.js default)
├── .gitignore             # Specifies intentionally untracked files to ignore
├── next.config.ts          # Next.js configuration
├── package.json           # Frontend dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project overview and quick start guide
├── DESIGN.md              # Full design specification
├── GEMINI.md              # Project conventions and grade mapping
├── CLAUDE.md              # Claude Code guidance
└── architecture.md        # This document


## 2. High-Level System Diagram

Provide a simple block diagram (e.g., a C4 Model Level 1: System Context diagram, or a basic component diagram) or a clear text-based description of the major components and their interactions. Focus on how data flows, services communicate, and key architectural boundaries.

```
[User] <--> [Next.js Frontend (Browser)] <--> [Local React State]
                                                      |
                                             (useState/useMemo)
                                                      |
                                     ┌────────────────┴────────────────┐
                                     |                                 |
                              [GPA/CGPA Calculation]          [Chatbot Messages]
```

Note: This is a client-side only application with no backend. All calculations and chat responses happen in the browser using React hooks.


## 3. Core Components

(List and briefly describe the main components of the system. For each, include its primary responsibility and key technologies used.)

### 3.1. Frontend

Name: GPA/CGPA Calculator Web Application

Description: A single-page application for university students to track academic performance across multiple semesters. Users can add/remove semesters and subjects, assign letter grades, and view real-time GPA and CGPA calculations. Features a brutalist, minimalist "WIRED" design aesthetic.

Technologies: Next.js (App Router), React, TypeScript, Vanilla CSS (no Tailwind)

Deployment: Vercel, Netlify, or any Node.js hosting

### 3.2. Chatbot

Name: AI Study Assistant

Description: A conversational interface where students can ask questions about GPA/CGPA calculations and academic planning. Provides simulated responses based on keyword matching. Features the same WIRED design aesthetic with a full-height chat interface.

Technologies: Next.js App Router, React, TypeScript, Client-side simulated responses

Route: `/chatbot`


## 4. Data Stores

### 4.1. Local State

Name: React useState

Type: In-memory JavaScript state (React Hooks)

Purpose: Stores semester, subject, and chat data temporarily during the user session. Data is not persisted between sessions.

Key Data Structures:
- `semesters[]` - Array of semester objects containing subjects
- `subjects[]` - Array of subject objects with name, grade, and credits
- `isMounted` - Client-side hydration flag
- `messages[]` - Array of chat messages (role: "user" | "bot", content, timestamp)


## 5. External Integrations / APIs

This project does not integrate with any external APIs or third-party services. All functionality is self-contained.

**Chatbot Note:** Responses are client-side simulated based on keyword matching. No API calls are made.


## 6. Deployment & Infrastructure

Cloud Provider: Not specified (configurable: Vercel, Netlify, AWS, etc.)

Key Services Used: Next.js runtime (Node.js)

CI/CD Pipeline: Not configured (future consideration)

Monitoring & Logging: Not configured


## 7. Security Considerations

This is a client-side only application with no backend, no database, and no authentication. No sensitive data is stored or transmitted.

- No authentication required
- No authorization required
- No data encryption needed (local session only)
- No external API calls exposing data


## 8. Development & Testing Environment

Local Setup Instructions:
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

Testing Frameworks: Not configured (explicitly avoided per project requirements)

Code Quality Tools: Next.js ESLint config (run via `npm run lint`)


## 9. Future Considerations / Roadmap

- Add local storage persistence to save semester/subject data between sessions
- Add semester export/import functionality (JSON/CSV)
- Add print-friendly styles for report generation
- Consider adding user accounts for cloud sync (would require backend)
- Add dark mode support while maintaining WIRED aesthetic
- Replace chatbot simulated responses with real AI backend integration


## 10. Project Identification

Project Name: GPA/CGPA Calculator

Repository URL: [Insert Repository URL]

Primary Contact/Team: UIT Students / Academic Tools Team

Date of Last Update: 2024-06-05


## 11. Glossary / Acronyms

GPA: Grade Point Average - the weighted average of grade points earned in a single semester

CGPA: Cumulative Grade Point Average - the weighted average of grade points earned across all semesters

UIT: University of Information Technology (assumed from context)

WIRED: Design system inspired by WIRED magazine - brutalist, minimalist aesthetic with no border-radius, no shadows, strict typography

API: Application Programming Interface

Next.js: React framework for production-grade applications
