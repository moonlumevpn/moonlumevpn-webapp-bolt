# Landing Page Palette

Source of truth for the Moonlume VPN landing page colors.

## Core Tokens

| Token | Hex | Purpose |
| --- | --- | --- |
| `--color-bg` | `#f4f8ff` | Main page background |
| `--color-bg-soft` | `#eef4ff` | Soft background tint |
| `--color-surface` | `#ffffff` | Primary cards and panels |
| `--color-surface-soft` | `#f8fbff` | Secondary card surface |
| `--color-text` | `#12213a` | Main text |
| `--color-text-muted` | `#5f6f8a` | Secondary text |
| `--color-border` | `#d6e2f5` | Borders and dividers |
| `--color-primary` | `#1f6dff` | Primary brand blue |
| `--color-primary-strong` | `#0f52d6` | Strong brand blue |
| `--color-accent` | `#11b5ff` | Bright accent cyan |

## Gradients

- Hero background: `sky-50 -> white -> blue-50`
- Decorative glow: `blue-300/20`, `sky-300/20`, `indigo-200/20`
- CTA gradient: `#0f52d6 -> #1f6dff -> #11b5ff`
- Text gradient: `#0f52d6 -> #1f6dff -> #0ba5e9`

## Notes

- The landing page styling is driven by `src/index.css`.
- `tailwind.config.js` still contains an older purple-based palette, but the current landing page visuals use the CSS variables above.
