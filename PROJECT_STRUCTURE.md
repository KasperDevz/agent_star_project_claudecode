# PROJECT_STRUCTURE.md — Agent Star Rewards

Two implementations live in this repo: `src/` (vanilla) and `next-app/` (Next.js 15).

## Tree

```
agent_star_proj_claude_code/
├── CLAUDE.md                        ← rules + architecture (read first)
├── SKILL.md                         ← build guide & recipes
├── PROJECT_STRUCTURE.md             ← this file
│
├── project_plan/                    ← planning & handoff docs
│   ├── CLAUDE.md
│   ├── SKILL.md
│   └── PROJECT_STRUCTURE.md
│
├── src/                             ← vanilla HTML/CSS/JS (no build step)
│   ├── index.html                   ← shell: links CSS, loads JS in order, mounts #root
│   └── assets/
│       ├── css/
│       │   ├── tokens.css           ← :root design tokens + [data-theme="dark"] overrides
│       │   ├── base.css             ← reset, app shell, sidebar, topbar, bottom nav
│       │   ├── components.css       ← cards, buttons, pills, badges, gauges, rows, modal
│       │   └── screens.css          ← per-screen layout (hero, dashboard, roadmap, rewards…)
│       ├── js/
│       │   ├── data.js              ← window.DATA: TIERS, REWARDS, AGENT, ACTIVITY, LEADERBOARD
│       │   ├── ui.js                ← window.UI: icon(), tierBadge(), starPill(), card builders
│       │   ├── screens.js           ← window.SCREENS: login, dashboard, roadmap, redeem, history…
│       │   └── app.js               ← controller IIFE: state, render(), nav, theme, modal, confetti
│       └── svg/
│           ├── tiers/               ← standalone SVGs for tier badges (used via <img>)
│           │   ├── bronze.svg
│           │   ├── silver.svg
│           │   ├── gold.svg
│           │   ├── platinum.svg
│           │   └── diamond.svg
│           ├── icons.svg            ← UI icon sprite  (<symbol id="i-home"> … currentColor)
│           └── rewards.svg          ← reward glyph sprite (<symbol id="r-Vouchers"> …)
│
└── next-app/                        ← Next.js 15 rebuild (App Router, TypeScript)
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── app/
    │   ├── layout.tsx               ← root layout: Inter/JetBrains fonts, AppProvider, SpriteLoader
    │   ├── globals.css              ← all design tokens + base + components + screen CSS
    │   └── page.tsx                 ← mounts <AppRoot /> (single-page SPA)
    ├── components/
    │   ├── AppRoot.tsx              ← auth gate + screen router + confetti trigger
    │   ├── AppShell.tsx             ← sidebar (desktop) + topbar + bottom-nav (mobile)
    │   ├── RewardModal.tsx          ← reward detail / claim modal
    │   ├── SpriteLoader.tsx         ← client component: fetches + injects icons.svg & rewards.svg
    │   ├── Confetti.tsx             ← triggerConfetti() util + ConfettiTrigger component
    │   ├── screens/
    │   │   ├── LoginScreen.tsx
    │   │   ├── DashboardScreen.tsx  ← hero card, tier ring, stats, mini roadmap, featured rewards
    │   │   ├── RoadmapScreen.tsx    ← vertical climb timeline with ClimbStep per tier
    │   │   ├── RedeemScreen.tsx     ← category chips + reward grid
    │   │   ├── HistoryScreen.tsx    ← activity log
    │   │   ├── LeaderboardScreen.tsx ← podium + ranked list
    │   │   └── ProfileScreen.tsx    ← agent card + settings rows + sign out
    │   └── ui/
    │       ├── Icon.tsx             ← <svg><use href="#i-{name}"/> (references injected sprite)
    │       ├── RewardGlyph.tsx      ← <svg><use href="#r-{category}"/> 
    │       ├── TierBadge.tsx        ← <img src="/assets/svg/tiers/{key}.svg">
    │       ├── Avatar.tsx           ← red-gradient initials circle + getInitials() helper
    │       ├── StarPill.tsx         ← star icon + count in pill
    │       ├── TierChip.tsx         ← dot + tier name in pill
    │       ├── Gauge.tsx            ← progress bar (supports onDark variant)
    │       ├── ActivityRow.tsx      ← single row in activity feed
    │       ├── LeaderRow.tsx        ← single row in leaderboard list
    │       ├── RewardCard.tsx       ← tappable reward card (opens modal via dispatch)
    │       └── SectionHeader.tsx    ← eyebrow + title + optional nav link
    ├── context/
    │   └── AppContext.tsx           ← useReducer state: authed, screen, cat, agent, theme, modal
    ├── lib/
    │   └── data.ts                  ← TypeScript types + all mock data (TIERS, REWARDS, AGENT…)
    └── public/
        └── assets/svg/
            ├── tiers/               ← tier badge SVGs (served statically)
            ├── icons.svg            ← UI icon sprite
            └── rewards.svg          ← reward glyph sprite
```

## Running the vanilla version

```bash
cd src && python3 -m http.server 8000   # then open http://localhost:8000
```

Must be served over HTTP — icon/reward sprites are fetched at runtime (blocked on `file://`).

## Running the Next.js version

```bash
cd next-app && npm run dev   # then open http://localhost:3000
```

Or build for production: `npm run build && npm start`.

## Data flow — vanilla

```
state (app.js)  ──▶  SCREENS.<screen>(state.agent)  ──▶  HTML string  ──▶  #root.innerHTML
     ▲                                                                              │
     └────────────  click [data-*] → delegated handler mutates state → render()  ◀──┘
```

## Data flow — Next.js

```
AppContext (useReducer)  ──▶  AppRoot  ──▶  AppShell + <ScreenContent>  ──▶  React render
        ▲                                                                           │
        └──────────────  dispatch(action)  ◀──  onClick handlers in components  ◀──┘
```

State shape: `{ authed, screen, cat, agent, theme, modal }` — identical to the vanilla version.

## SVG asset strategy (same in both implementations)

- **Tier badges** — full-color standalone files, served as static assets, rendered with `<img>` or `next/image`. Per-tier glow applied via CSS classes (`.t-gold`, `.t-platinum`, `.t-diamond`).
- **Icons & reward glyphs** — sprite sheets of `<symbol>` elements. Fetched once at boot and injected as hidden DOM nodes so any component can reference `#i-{name}` or `#r-{Category}` with `<svg><use href="…"/>`. Color is `currentColor` — stays theme-aware.

## Key conventions

- **All colors via CSS variables** (`var(--primary)`, `var(--ink)`, etc.) — never hard-coded hex in components.
- **Red is the only brand accent.** Non-red colors appear only inside tier badge artwork and `--success` green for star gains.
- **Mobile-first responsive:** `≤ 900px` → bottom tab bar + single column. `> 900px` → sidebar + multi-column.
- **No new dependencies.** Vanilla: zero. Next.js: only what `create-next-app` installs.
