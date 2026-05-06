# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **design system** for **MineDebug Technology** — a Brazilian industrial-mining tech company. The active design system lives under `minedebug/`. All output is static HTML/CSS; there is no build step except for the React dashboard in `minedebug/ui_kits/operations/`.

To preview any static file, open it directly in a browser. The `preview/` cards and `site/` pages are standalone HTML files that import `colors_and_type.css` via a relative path.

## Skill

`minedebug/SKILL.md` defines the `minedebug-design` Claude Code skill. When invoked, Claude should read `minedebug/README.md`, use design tokens from `minedebug/colors_and_type.css`, and produce either static HTML artifacts or production-ready code.

New HTML files must begin with a stylesheet link (adjust depth as needed):
```html
<link rel="stylesheet" href="../../colors_and_type.css">
```

## Architecture

```
minedebug/
├── colors_and_type.css          ← single source of truth: all tokens
├── assets/
│   ├── logo.svg / logo.jpeg     ← logo (SVG is a JPEG reconstruction)
│   ├── *.jpeg                   ← field photography
│   ├── apoio/                   ← sponsor/partner logos (PNG)
│   └── team/                    ← team member photos (PNG)
├── preview/                     ← 17 standalone HTML showcase cards
├── site/
│   ├── index.html               ← marketing/splash page
│   └── login.html               ← login form
├── ui_kits/operations/          ← React operations dashboard (dark mode)
│   ├── index.html               ← standalone preview (no build needed)
│   ├── *.jsx                    ← React components (Vite project)
│   └── package.json             ← npm scripts: dev, build, preview
└── video/
    └── institucional-15s.html   ← motion/animation file
```

The `root index.html` redirects to `MineDebug Design System/site/index.html` and `vercel.json` routes `/dashboard` to the old built dist — both reference the legacy path and may need updating as the migration to `minedebug/` completes.

## Operations dashboard (ui_kits/operations)

This is a real Vite + React 18 project, not just reference code. From `minedebug/ui_kits/operations/`:
```
npm install
npm run dev      # local dev server
npm run build    # outputs dist/ for Vercel
npm run preview  # serve built dist/
```

Components: `Topbar.jsx`, `Sidebar.jsx`, `MetricCard.jsx`, `FleetTable.jsx`, `AlertList.jsx`. These show component structure and prop contracts; they are a proposed identity application, not a recreation of any existing client screen.

## Design tokens

All colors, typography, spacing, radii, shadows, and motion values live in `minedebug/colors_and_type.css` as CSS custom properties on `:root`. Dark mode via `[data-theme="dark"]` on any container. Never hardcode hex values — always reference tokens.

Key tokens:
- `--accent` / `--md-green-500: #19E27A` — the only brand color; CTA, status OK, focus ring.
- `--font-mono: 'JetBrains Mono'` — telemetry numbers, status labels, equipment codes.
- `--font-sans: 'Inter'` — all UI body and headings.
- `--shadow-glow` — 4px green glow, used exclusively for focus rings and active states.
- `--md-warning: #F5B73A`, `--md-danger: #F25C54`, `--md-info: #4DA3FF` — semantic status colors.
- Dashboards default to dark; marketing pages default to light.

Spacing is a 4px grid (`--s-1: 4px` through `--s-9: 96px`). Dashboard rows are 36–40px; topbar 56px; sidebar 240px.

## Brand rules

- **Language:** Portuguese (pt-BR) for all product UI. English only for engineering docs/APIs. Never English marketing-speak ("unleash", "empower") — the audience is field engineers.
- **Tone:** Technical and measurable. "Redução de 14% no consumo" not "grande eficiência".
- **No emoji** in any product UI or institutional text. Inline SVG icons (Lucide) only.
- **Casing:** Sentence case for H1/H2 and buttons. `UPPERCASE + mono` for telemetry status labels (`ONLINE`, `ALERTA`). Equipment codes in mono exactly as registered (`CAM-407`).
- **Icons:** Lucide via CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.js`), 2px stroke, `currentColor`. Key domain icons: `truck`, `gauge`, `fuel`, `activity`, `cpu`, `alert-triangle`, `wrench`.
- **Radii:** Buttons/inputs `--r-2` (4px), cards `--r-3` (8px), modals `--r-4` (12px) max. Never `border-radius: 24px+`.
- **Motion:** functional only — no bounce, no parallax. Hover 120ms, open/close 200ms, large transitions 320ms.
- **Photography:** real field photos, full contrast, no artistic filters. No stock imagery, no gradients, no glassmorphism on normal cards. Overlay allowed: black 40–60% over full-bleed photos.

## Logo usage

- Full logo (circle + wordmark): social, report cover, splash.
- Glyph only: favicon, app icon, footer watermark.
- Wordmark "MINEDEBUG": website header, email header.
- Never distort; never change the green (only brand green / black / white).
- `assets/logo.svg` is reconstructed from the JPEG — replace with client's original vector when provided.

## Known caveats (flagged for client validation)

- Fonts (Inter + JetBrains Mono) are Google Fonts substitutes — replace if client has a corporate typeface.
- Lucide is the default icon set — replace if client has a proprietary library.
- `ui_kits/operations/` is a proposed identity application, not a recreation of any existing client product screen.
- `assets/logo.svg` was recreated from a JPEG — not pixel-perfect; prefer client's original SVG.
- Dark vs. light mode default: assumed dashboards=dark, marketing=light — validate with client.
