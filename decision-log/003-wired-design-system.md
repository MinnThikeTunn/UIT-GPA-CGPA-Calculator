# Decision: WIRED Design System Adoption

**Date:** 2024-06-05
**Status:** ✅ Implemented
**Context:** Need a distinctive, memorable visual identity that differs from typical "AI slop" design

## Decision

Adopt the WIRED magazine aesthetic as the design system: brutalist, minimalist, high-contrast, editorial typography.

## Design Principles

- **No border-radius**: Strictly square corners on all elements
- **No box-shadows**: Create depth via borders (hairline 1px → hard 2px → solid black ribbon)
- **Typography as hero**: Playfair Display (headlines), Inter (UI labels), JetBrains Mono (data/kickers)
- **Single accent color**: Link Blue (`#057dbc`) for hover states only
- **Black and white dominant**: High contrast, editorial feel
- **No gradients**: Flat colors only

## Rationale

- **Distinctive**: Stands out from typical gradient-heavy AI-generated UIs
- **Content-first**: Typography-driven design emphasizes the data
- **Professional**: Academic tool should look serious and precise
- **Performance**: No complex CSS effects = faster rendering

## Alternatives Considered

- **Material Design**: Too generic, Google's design language isn't distinctive
  - Rejected: Common, doesn't stand out
- **Apple-style (rounded, frosted)**: Overused in tech products
  - Rejected: Not distinctive enough
- **Dark mode only**: Limiting, may not suit all users
  - Rejected: Wireframe-style works in both light/dark
- **Custom brutalist from scratch**: Time-consuming
  - Rejected: Use proven WIRED aesthetic as foundation

## Implementation

Design system implemented in:
- `src/app/globals.css` - Core CSS variables and base styles
- `DESIGN.md` - Full design specification

## Consequences

### Positive
- Unique, memorable visual identity
- Fast CSS (no complex effects)
- Clear hierarchy through typography
- Editorial, professional feel

### Negative
- May feel "too simple" to some users
- Requires careful layout decisions (no shadows to hide mistakes)
- Limited color palette constrains expressiveness