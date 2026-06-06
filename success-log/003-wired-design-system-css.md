# Success: WIRED Design System CSS

**Date:** 2024-06-05
**Context:** Need a distinctive, brutalist design that stands out from typical "AI slop"

## What Was Implemented

A complete design system in `globals.css` with:
- CSS custom properties for design tokens
- Typography system (Playfair Display, Inter, JetBrains Mono)
- Component-specific styles (buttons, inputs, cards)
- No border-radius, no box-shadows
- Single accent color for hovers

## The Solution

### CSS Variables (Design Tokens)

```css
:root {
  /* Colors */
  --color-bg: #fafafa;
  --color-text: #0a0a0a;
  --color-text-muted: #525252;
  --color-border: #e5e5e5;
  --color-border-strong: #0a0a0a;
  --color-accent: #057dbc;
  --color-accent-hover: #046ba3;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Borders */
  --border-hairline: 1px solid var(--color-border);
  --border-strong: 2px solid var(--color-border-strong);
  --border-ribbon: 4px solid var(--color-border-strong);
}
```

### Button Style (WIRED)

```css
.btn {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  border-radius: 0; /* STRICTLY SQUARE */
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn:hover {
  background: var(--color-accent);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: var(--border-strong);
}
```

### Input Style

```css
.input {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border: var(--border-hairline);
  border-radius: 0; /* STRICTLY SQUARE */
  background: var(--color-bg);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.15s ease;
}

.input:focus {
  border-color: var(--color-accent);
}
```

### Card/Container Style

```css
.card {
  border: var(--border-hairline);
  padding: var(--space-lg);
  background: var(--color-bg);
}

.card-elevated {
  border: var(--border-strong);
  /* No box-shadow - depth via border weight */
}

.card-ribbon {
  border: var(--border-ribbon);
  padding: var(--space-xl);
}
```

### Typography Utilities

```css
.headline {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.label {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.mono {
  font-family: var(--font-mono);
}
```

## Why It Worked

- **CSS Variables**: Single source of truth for all design tokens
- **Consistent pattern**: Components follow the same structure
- **No shortcuts**: Hard constraints (no border-radius) create distinct aesthetic
- **Hover only accent**: Link Blue used sparingly for emphasis

## How to Reuse

When adding new components:

1. **Check globals.css first** - Use existing CSS variables
2. **Never add border-radius** - Always use `0` or fallback to variable
3. **Never add box-shadow** - Use border weight for depth
4. **Use appropriate font**:
   - Headlines → `var(--font-display)`
   - Labels → `var(--font-ui)`
   - Data/numbers → `var(--font-mono)`
5. **Reference DESIGN.md** for full specifications

## Related Files

- `src/app/globals.css` - Full implementation
- `DESIGN.md` - Design specification document

## Quick Reference

| Element | Style |
|---------|-------|
| Button | `btn` class, no border-radius |
| Input | `input` class, underline or hairline border |
| Card | `card`, `card-elevated`, or `card-ribbon` |
| Headline | `.headline` with Playfair Display |
| Data | `.mono` with JetBrains Mono |