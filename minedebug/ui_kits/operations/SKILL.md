---
name: minedebug-react
description: React + Vite development skill for the MineDebug Operations Dashboard. Use when building or modifying the operations panel at ui_kits/operations/. Contains component architecture, data models, styling conventions, and dev commands.
user-invocable: true
---

## Dev setup

```bash
cd "MineDebug Design System/ui_kits/operations"
npm install
npm run dev     # http://localhost:5173 — auth gate is bypassed in dev
npm run build   # output: dist/
```

## Architecture

- `src/data/mock.js` — all mock data (FLEET, ALERTS, METRICS, DIAG_STEPS)
- `src/hooks/useToast.jsx` — ToastProvider + useToast hook
- `src/components/layout/` — Topbar, Sidebar
- `src/components/dashboard/` — MetricCard (with Sparkline), FleetTable, AlertList
- `src/components/ui/` — DiagModal, Toast (re-export)
- `src/App.jsx` — root; wraps Dashboard in ToastProvider
- `src/index.css` — all dashboard styles (dark theme, no CSS modules)

## Key conventions

- Dark theme only — no `[data-theme]` toggle needed
- CSS tokens come from `colors_and_type.css` (imported in main.jsx via `../../../colors_and_type.css`)
- Icons: `lucide-react` (not CDN) — import named exports: `import { Truck } from 'lucide-react'`
- Mock data lives exclusively in `src/data/mock.js` — never hardcode in components
- Auth: dev mode (`import.meta.env.DEV`) skips auth; prod checks `sessionStorage('md-auth')`
- Logout redirects to `../../site/login.html` (relative URL, works with Python HTTP server and Vercel)
