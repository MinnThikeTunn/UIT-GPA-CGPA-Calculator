# Design Tokens

Design tokens synced from Pencil design files to CSS.

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--wired-black` | `#000000` | Primary background, borders, text |
| `--page-ink` | `#1a1a1a` | Page text color |
| `--paper-white` | `#ffffff` | Page background |
| `--link-blue` | `#057dbc` | Accent color, links |
| `--hairline-tint` | `#e2e8f0` | Subtle borders |
| `--caption-gray` | `#555555` | Secondary text |
| `--rule-black` | `#000000` | Dividers |

## Button Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-bg` | `#000000` | Primary button background |
| `--color-primary-text` | `#ffffff` | Primary button text |
| `--color-secondary-bg` | `#ffffff` | Secondary button background |
| `--color-secondary-text` | `#000000` | Secondary button text |
| `--color-tertiary-text` | `#000000` | Tertiary button text |
| `--color-accent` | `#057dbc` | Accent/highlight |
| `--color-border` | `#000000` | Button borders |

## Typography

| Token | Font | Usage |
|-------|------|-------|
| `--font-mono` | JetBrains Mono | Code, kickers, labels |
| `--font-sans` | Inter | Body text |
| `--font-display` | Playfair Display | Headings |

## Button Styles

### Primary CTA
```css
.primary-cta {
  background: var(--color-primary-bg);
  color: var(--color-primary-text);
  border: 2px solid var(--color-border);
  border-radius: 0;
  padding: 12px 24px;
}
```

### Secondary CTA
```css
.secondary-cta {
  background: var(--color-secondary-bg);
  color: var(--color-secondary-text);
  border: 12px solid var(--color-border);
  border-radius: 21px;
  padding: 12px 24px;
}
```

### Tertiary Button
```css
.tertiary-btn {
  background: transparent;
  border: none;
  color: var(--color-tertiary-text);
  padding: 12px 24px;
}
```