# Decision: No Tailwind CSS Mandate

**Date:** 2024-06-05
**Status:** ✅ Implemented
**Context:** Deciding on CSS approach for styling the application

## Decision

Use vanilla CSS (custom .css files) instead of Tailwind CSS.

## Rationale

- **WIRED design system control**: Tailwind's utility-first approach conflicts with strict design system enforcement
- **Learning**: Vanilla CSS builds better foundational skills
- **Less abstraction**: Easier to understand and modify styles directly
- **Bundle size acceptable**: For a single-page app, vanilla CSS bundle is small enough
- **No build complexity**: Tailwind requires postcss/autoprefixer configuration

## Alternatives Considered

- **Tailwind CSS**: Popular, fast development
  - Rejected: Conflicts with strict WIRED design constraints; utilities encourage "quick fixes" that bypass design system
- **CSS Modules**: Scoped CSS with Next.js built-in support
  - Considered: Would work, but for single-page app, globals.css is sufficient
- **Styled-components**: CSS-in-JS library
  - Rejected: Adds runtime overhead, more dependencies to manage
- **Sass/SCSS**: Preprocessor with variables and nesting
  - Considered: Nice to have, but plain CSS is sufficient for this project's complexity

## Implementation

Styling approach:
- `src/app/globals.css` - Global styles, CSS variables, design tokens
- `src/app/globals.css` - All component styles (no separate files needed for single-page)
- `DESIGN.md` - Full design specification reference

## Consequences

### Positive
- Full control over every CSS property
- Design system enforced through CSS variables, not utility overrides
- No additional dependencies
- Easier to understand the full CSS picture

### Negative
- More typing than Tailwind utilities
- No built-in responsive utilities (must write custom)
- No dark mode preset (must implement manually)
- May feel slower for rapid prototyping