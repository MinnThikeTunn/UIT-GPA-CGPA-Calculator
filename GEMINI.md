# Gemini Project Context: GPA / CGPA Calculator

This project is a web-based GPA and CGPA calculator built with Next.js, featuring a high-end, minimalist design inspired by the WIRED magazine aesthetic.

## Project Overview

*   **Purpose:** To help students calculate their Grade Point Average (GPA) for individual semesters and their Cumulative Grade Point Average (CGPA) across multiple semesters.
*   **Main Technologies:**
    *   **Framework:** Next.js (App Router)
    *   **Language:** TypeScript
    *   **Styling:** Vanilla CSS (TailwindCSS is explicitly avoided per design mandates)
    *   **UI/UX:** Guided by a custom "WIRED-inspired" design system (see `DESIGN.md`).

## Architecture & Structure

*   **`src/app/`**: Contains the main application routes and global styles.
    *   `page.tsx`: The primary entry point containing the calculator logic and UI.
    *   `layout.tsx`: Root layout defining the document structure and global font imports.
    *   `globals.css`: Comprehensive design implementation following the WIRED aesthetic.
*   **`DESIGN.md`**: Foundational design document outlining the visual theme, typography (Playfair Display, Inter, JetBrains Mono), color palette, and component styling rules.

## Building and Running

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Production Build** | `npm run build` |
| **Start Production** | `npm start` |
| **Linting** | `npm run lint` |

## Development Conventions

### 1. UI/UX Design (WIRED Aesthetic)
*   **Strict Corner Discipline:** `border-radius: 0` is mandatory for all rectangular containers, images, and buttons.
*   **Shadows:** No `box-shadow` or elevation effects. Depth is created through rule weight and high-contrast borders.
*   **Typography:**
    *   **Serif (Playfair Display):** For display headlines and hero numbers.
    *   **Sans (Inter):** For UI labels and buttons.
    *   **Mono (JetBrains Mono):** For technical labels, "kickers" (eyebrows), and metadata. Always uppercase for kickers.
*   **Borders:** Use 2px hard black borders for interactive elements and 1px hairline rules for structural separation.
*   **Colors:** Strictly monochrome (White, Black, Grays) with a single accent color: Link Blue (`#057dbc`) for hovers.

### 2. Code Practices
*   **Functional Components:** Use React functional components with Hooks (`useState`, `useMemo`, `useEffect`).
*   **Surgical Edits:** When modifying CSS or UI, prioritize scoped changes that align with the existing `DESIGN.md` principles.
*   **Hydration:** The app uses `suppressHydrationWarning` on root elements and a mounting check (`isMounted`) to handle client-side state initialization gracefully.

## Key Logic
*   **Grade Mapping:**
    *   A+, A: 4.00
    *   A-: 3.67
    *   B+: 3.33
    *   B: 3.00
    *   B-: 2.67
    *   C+: 2.33
    *   C: 2.00
    *   D: 1.00
    *   F, NA: 0.00
*   **Calculation:** GPA is weighted by credits. CGPA is the aggregate of all earned grade points divided by all earned credits across all semesters.
