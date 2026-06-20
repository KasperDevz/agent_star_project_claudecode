# Agent Star Rewards

An internal web application for **Siam Refractory**'s sales incentive program. Sales agents earn stars from performance KPIs (sales amount, tonnage, orders), spend them on rewards, and climb a 5-tier prestige hierarchy.

---

## Overview

| Feature | Detail |
|---|---|
| Tiers | Bronze → Silver → Gold → Platinum → Diamond |
| Star sources | Order deliveries, monthly bonuses, performance targets |
| Redemption | Vouchers, gadgets, travel, training, gear, experiences |
| Screens | Login · Dashboard · Tier Roadmap · Redemption Center · Activity · Leaderboard · Profile |
| Design | White/Red light mode · Black/Red dark mode · Mobile-first responsive |

---

## Two Implementations

### `src/` — Vanilla HTML/CSS/JS

Zero dependencies. No framework, no build step — just serve the folder over HTTP.

```bash
cd src && python3 -m http.server 8000
# open http://localhost:8000
```

> Must be served over HTTP. SVG icon/reward sprites are fetched at runtime and fail on `file://`.

### `next-app/` — Next.js 15

TypeScript, App Router, React 18. Same design, same mock data, same behavior.

```bash
cd next-app
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

---

## Project Structure

```
agent_star_proj_claude_code/
│
├── README.md
├── CLAUDE.md                        ← design rules + architecture constraints
├── SKILL.md                         ← build guide & extension recipes
├── PROJECT_STRUCTURE.md             ← full file tree + data flow diagrams
│
├── src/                             ← vanilla implementation
│   ├── index.html
│   └── assets/
│       ├── css/
│       │   ├── tokens.css           ← CSS variables (light + dark tokens)
│       │   ├── base.css             ← shell, sidebar, topbar, bottom nav
│       │   ├── components.css       ← cards, buttons, badges, modal, confetti
│       │   └── screens.css          ← per-screen layout styles
│       ├── js/
│       │   ├── data.js              ← TIERS, REWARDS, AGENT, ACTIVITY, LEADERBOARD
│       │   ├── ui.js                ← component builders (return HTML strings)
│       │   ├── screens.js           ← screen renderers (return HTML strings)
│       │   └── app.js               ← state, render(), routing, events, confetti
│       └── svg/
│           ├── tiers/               ← bronze · silver · gold · platinum · diamond SVGs
│           ├── icons.svg            ← UI icon sprite sheet
│           └── rewards.svg          ← reward category glyph sprite sheet
│
└── next-app/                        ← Next.js 15 implementation
    ├── app/
    │   ├── layout.tsx               ← root layout, Google Fonts, AppProvider
    │   ├── globals.css              ← all CSS (tokens + base + components + screens)
    │   └── page.tsx                 ← mounts <AppRoot />
    ├── components/
    │   ├── AppRoot.tsx              ← auth gate + screen router + confetti trigger
    │   ├── AppShell.tsx             ← sidebar (desktop) · topbar · bottom nav (mobile)
    │   ├── RewardModal.tsx          ← reward detail / claim bottom sheet
    │   ├── SpriteLoader.tsx         ← injects SVG sprites at boot
    │   ├── Confetti.tsx             ← confetti burst on reward claim
    │   ├── screens/                 ← one file per screen
    │   │   ├── LoginScreen.tsx
    │   │   ├── DashboardScreen.tsx
    │   │   ├── RoadmapScreen.tsx
    │   │   ├── RedeemScreen.tsx
    │   │   ├── HistoryScreen.tsx
    │   │   ├── LeaderboardScreen.tsx
    │   │   └── ProfileScreen.tsx
    │   └── ui/                      ← reusable primitives
    │       ├── Icon.tsx             ← SVG sprite reference
    │       ├── TierBadge.tsx        ← tier badge image
    │       ├── Avatar.tsx           ← initials circle
    │       ├── StarPill.tsx         ← star count pill
    │       ├── TierChip.tsx         ← tier name chip
    │       ├── Gauge.tsx            ← progress bar
    │       ├── ActivityRow.tsx
    │       ├── LeaderRow.tsx
    │       ├── RewardCard.tsx
    │       └── SectionHeader.tsx
    ├── context/
    │   └── AppContext.tsx           ← useReducer: authed · screen · agent · theme · modal
    ├── lib/
    │   └── data.ts                  ← TypeScript types + all mock data
    └── public/assets/svg/           ← static SVG assets (same as src/assets/svg/)
```

---

## Tier System

| Tier | Stars to reach | Sub-rank |
|---|---|---|
| Bronze | 0 | Foundry |
| Silver | 250 | Forge |
| Gold | 600 | Kiln |
| Platinum | 1,200 | Crucible |
| Diamond | 2,500 | Master |

---

## Design Rules (non-negotiable)

- **Colors:** White/Red on light mode · Black/Red on dark mode. Brand red (`#D91E1E` light / `#FF3B3B` dark) is the **only** accent. All values are CSS variables in `tokens.css` — never hard-code hex.
- **Responsive breakpoint:** `≤ 900px` → bottom tab bar + single column. `> 900px` → sidebar + multi-column.
- **No frameworks or build steps** in the vanilla implementation.
- **No new accent colors**, no inline hex in components, no decorative filler content.

---

## Data Flow

**Vanilla:**
```
state (app.js) → SCREENS.<screen>(state.agent) → HTML string → #root.innerHTML
     ↑                                                                    │
     └──── click [data-*] → delegated handler mutates state → render() ◀──┘
```

**Next.js:**
```
AppContext (useReducer) → AppRoot → AppShell + ScreenContent → React render
        ↑                                                              │
        └──────────── dispatch(action) ← onClick handlers ◀───────────┘
```

---

## Known TODOs

- Wire real auth + backend API (currently all mock data)
- Redemption search/filter (input is placeholder only)
- Reward claim history persistence + success toast
- Profile sub-pages (contact, notifications, security)
- Unit tests for star/tier math
