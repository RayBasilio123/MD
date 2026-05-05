# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **design system** for **MineDebug Technology** — a Brazilian industrial-mining tech company. There is no build system, package manager, or framework. All output is static HTML/CSS and React JSX components. No compilation step is needed.

To preview any file, open it directly in a browser. The `preview/` cards and `site/` pages are standalone HTML files that import `colors_and_type.css` via a relative path.

## Skill

`SKILL.md` defines this directory as a Claude Code skill named `minedebug-design`. When invoked, the skill expects Claude to read `README.md`, use the design tokens from `colors_and_type.css`, and produce either static HTML artifacts or production-ready code.

New HTML files should always begin with:
```html
<link rel="stylesheet" href="../../colors_and_type.css">
```
(adjust the relative path as needed).

## Design tokens

All colors, typography, spacing, radii, shadows, and motion values live in `colors_and_type.css` as CSS custom properties on `:root`. Dark mode is toggled via `[data-theme="dark"]` on any container. Never hardcode hex values — always reference tokens.

Key tokens to keep in mind:
- `--accent` / `--md-green-500: #19E27A` — the only brand color; used for CTA, status OK, focus ring.
- `--font-mono: 'JetBrains Mono'` — all telemetry numbers, status labels, code identifiers.
- `--font-sans: 'Inter'` — all UI body and headings.
- `--shadow-glow` — 4px green glow, used exclusively for focus rings and active states.
- Dark surface variables are on `[data-theme="dark"]`; dashboards default to dark.

## Architecture

```
colors_and_type.css          ← single source of truth for all tokens
assets/                      ← brand assets (logo.svg is vector; .jpeg are field photos)
preview/                     ← standalone HTML cards for each DS section
site/                        ← marketing pages (index.html, login.html)
ui_kits/operations/          ← reference operations dashboard (dark mode)
  index.html                 ← standalone dashboard preview
  *.jsx                      ← React components (reference only; no bundler)
video/                       ← motion/animation files
```

The JSX components in `ui_kits/operations/` are reference implementations, not runnable without a bundler. They exist to show component structure and prop contracts.

## Brand rules

- **Language:** Portuguese (pt-BR) is primary for all product UI. English only for engineering docs/APIs.
- **Tone:** Technical and measurable. "Redução de 14% no consumo" not "grande eficiência".
- **No emoji** in any product UI, institutional text, or this codebase. Inline SVG icons (Lucide) only.
- **Casing:** Sentence case for H1/H2 and buttons. `UPPERCASE + mono` for telemetry status labels (e.g., `ONLINE`, `ALERTA`). Equipment codes in mono exactly as registered (`CAM-407`).
- **Icons:** Lucide via CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.js`), 2px stroke, `currentColor`.
- **Radii:** max `--r-4` (12px) on cards/modals. Never `border-radius: 24px+`.
- **Motion:** functional only — no bounce, no parallax. Hover 120ms, open/close 200ms, large transitions 320ms.
- **Photography:** real field photos, full contrast, no artistic filters. No stock-corporate imagery, no gradients, no glassmorphism on normal cards.

## Logo usage

- Full logo (circle + wordmark): social, report cover, splash.
- Glyph only: favicon, app icon, footer watermark.
- Never distort; never change the green to another color (only brand green / black / white).
- `assets/logo.svg` is a reconstruction from the JPEG — replace with the client's original vector if provided.

## Known caveats (flagged for client validation)

- Fonts (Inter + JetBrains Mono) are Google Fonts substitutes — replace if client has a corporate typeface.
- Lucide is the default icon set — replace if client has a proprietary library.
- `ui_kits/operations/` is a proposed identity application, not a recreation of any existing product screen.
- `assets/logo.svg` was recreated from a JPEG — not pixel-perfect; prefer client's original SVG.
