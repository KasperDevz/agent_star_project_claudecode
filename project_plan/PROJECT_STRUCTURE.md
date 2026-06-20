# PROJECT_STRUCTURE.md — Agent Star Rewards

Vanilla HTML/CSS/JS. No framework, no build step, no package manager.
Everything the browser needs is static — just serve the `src/` folder.

## Tree

```
AgentStarApp/
├── project_plan/                  ← planning & handoff docs (this folder)
│   ├── CLAUDE.md                  ← rules + architecture for Claude Code (read first)
│   ├── SKILL.md                   ← build guide & recipes
│   └── PROJECT_STRUCTURE.md       ← this file
│
└── src/                           ← the shippable app (serve this)
    ├── index.html                 ← shell: links CSS, loads JS in order, mounts #root
    └── assets/
        ├── css/
        │   ├── tokens.css         ← :root design tokens + [data-theme="dark"] overrides
        │   ├── base.css           ← reset, app shell, sidebar, top bar, bottom nav, responsive
        │   ├── components.css     ← cards, buttons, pills, badges, gauges, rows, modal, confetti
        │   └── screens.css        ← per-screen layout (hero, dashboard, roadmap climb, rewards…)
        ├── js/
        │   ├── data.js            ← window.DATA: TIERS, REWARDS, AGENT, ACTIVITY, LEADERBOARD
        │   ├── ui.js              ← window.UI: icon(), tierBadge(), starPill(), card builders…
        │   ├── screens.js         ← window.SCREENS: login, dashboard, roadmap, redeem, history…
        │   └── app.js             ← controller IIFE: state, render(), nav, theme, modal, confetti
        └── svg/
            ├── tiers/
            │   ├── bronze.svg     ← escalating tier badges (used via <img>)
            │   ├── silver.svg
            │   ├── gold.svg
            │   ├── platinum.svg
            │   └── diamond.svg
            ├── icons.svg          ← UI icon sprite  (<symbol id="i-home"> … currentColor)
            └── rewards.svg        ← reward glyph sprite (<symbol id="r-Vouchers"> …)
```

## Data flow

```
                ┌─────────────── state (app.js) ───────────────┐
                │  { authed, screen, cat, agent, theme, modal } │
                └───────────────────────┬───────────────────────┘
                                        │ render()
        SCREENS.<screen>(state.agent)   ▼
        ─────────────────────────▶  HTML string  ──▶  #root.innerHTML
                                        ▲
              click on [data-*] ────────┘  (single delegated listener mutates state)
```

`data-*` hooks used by the delegated click handler in `app.js`:

| Attribute | Meaning |
|---|---|
| `data-nav="<screen>"` | navigate to a screen (sidebar / bottom nav / section links) |
| `data-cat="<Category>"` | filter rewards by category |
| `data-reward="<id>"` | open reward detail modal (card) |
| `data-action="login"` | mock sign-in |
| `data-action="logout"` | sign out |
| `data-action="toggle-theme"` | light ↔ dark (persisted to `localStorage`) |
| `data-action="claim" data-reward="<id>"` | spend stars, close modal, confetti |
| `data-action="close-modal"` | dismiss modal |
| `data-stop` | marks modal body so overlay-click doesn't close it |

## SVG asset strategy

- **Tier badges** are full-color standalone files → rendered with `<img src="…/tiers/gold.svg">`.
  They scale by `width`/`height` and work even over `file://`. Per-tier glow is applied in CSS.
- **Icons & reward glyphs** are **sprite sheets** of `<symbol>`s using `currentColor`
  (and `var(--primary)` for accents). `app.js` fetches both at boot and injects them into the
  DOM, so screens can reference them with `<svg><use href="#i-home"/></svg>`. This keeps icon
  color theme-aware and the markup tiny. (Requires HTTP serving — see CLAUDE.md.)

## Why vanilla?

The original concept was prototyped in React (see the sibling `Agent Star Rewards.html` in the
repo root, plus `app/*.jsx`). This `src/` tree is the **clean, framework-free port** intended
for Claude Code to take to production: predictable, zero-dependency, and trivial to wire to a
real backend or migrate into any framework later. The string-template + delegation pattern is
deliberately simple and maps 1:1 onto JSX components if a framework is reintroduced.
