# CLAUDE.md — Agent Star Rewards

> Project instructions for Claude Code. Read this first. It defines the product,
> the strict visual rules, the file structure, and the conventions you must follow
> when extending this codebase.

## What this is

An **internal web application** for *Siam Refractory*'s "Agent Star Rewards" program.
Sales agents earn **stars** from performance (sales amount, tonnage, orders) and
spend them on rewards. Stars also move them up a **5-tier hierarchy**
(Bronze → Silver → Gold → Platinum → Diamond).

The goal is an experience that feels **professional, modern, gamified-yet-corporate,
clean, and prestigious** — agents should feel *pride and ambition* looking at their
tier progression.

This repo is a **vanilla HTML/CSS/JS** implementation (no framework, no build step).
It is intentionally dependency-free so it can be dropped into any stack later.

## Non-negotiable design rules

1. **Color palette is strict corporate White/Red + Black/Red.**
   - Light mode: white surfaces, near-black ink, **brand red `#D91E1E`** as the *only* accent.
   - Dark mode: black surfaces, off-white ink, **red `#FF3B3B`** accent.
   - Red is reserved for: CTAs, progress-bar fills, active nav, active tier, key numbers.
   - **Do NOT introduce new accent hues** (no blue/green/amber chrome). The only place
     non-red colors appear is *inside the tier badge artwork* (bronze/silver/gold/etc.
     are naturally metallic) and the semantic `--success` green for "+stars". That's it.
   - All colors live as CSS variables in `assets/css/tokens.css`. Never hard-code a hex
     in components — use a `var(--token)`.

2. **The Tier Roadmap is the centerpiece.** Badges escalate in complexity & prestige:
   - Bronze = simple structural medal. Silver = textured/ornate rim. Gold = gradients +
     internal glow + bolder geometry. Platinum = faceted 3D depth. Diamond = iconic,
     radiant, layered, premium.
   - The badges are committed as standalone SVG assets in `assets/svg/tiers/`.
     If you redesign a badge, keep the escalation principle and keep them as assets.
   - The roadmap reads as a **journey/climb** (red path shows progress).

3. **Mobile is priority #1.** The layout is responsive from one codebase:
   - `≤ 900px`: bottom tab bar, single column, top app bar.
   - `> 900px`: left sidebar, multi-column dashboard with activity feed + leaderboard.
   - Hit targets ≥ 44px. Body text ≥ 13px.

4. **Accessibility & polish:** honor `prefers-reduced-motion`, keep contrast high,
   use semantic structure, keep animations tasteful (no infinite decorative loops on content).

## Architecture (vanilla, no framework)

State lives in one plain object in `app.js`. Screens are pure functions that take state
and return an **HTML string**; `render()` repaints `#root`. Interaction is handled by a
single **event-delegation** listener using `data-*` attributes (`data-nav`, `data-action`,
`data-reward`, `data-cat`). This keeps it framework-free but predictable.

```
state ──▶ SCREENS.<name>(state) ──▶ HTML string ──▶ #root.innerHTML ──▶ paint
  ▲                                                                      │
  └────────────── click → data-* handler mutates state → render() ◀──────┘
```

Load order (declared in `index.html`, matters):
`data.js` → `ui.js` → `screens.js` → `app.js`.

Each file attaches one global: `window.DATA`, `window.UI`, `window.SCREENS`. `app.js` is an IIFE.

## File map

See `PROJECT_STRUCTURE.md` for the full tree. Quick version:

- `src/index.html` — shell; links CSS, loads JS in order.
- `src/assets/css/` — `tokens` (variables) · `base` (shell/nav) · `components` · `screens`.
- `src/assets/js/` — `data` · `ui` (helpers/builders) · `screens` (views) · `app` (controller).
- `src/assets/svg/tiers/*.svg` — the 5 tier badges (used via `<img>`).
- `src/assets/svg/icons.svg` — UI icon sprite (`<symbol id="i-…">`, `currentColor`).
- `src/assets/svg/rewards.svg` — reward category glyph sprite (`<symbol id="r-…">`).

## Running it

It must be **served over HTTP** (the icon/reward sprites are fetched at runtime):

```bash
cd src && python3 -m http.server 8000     # then open http://localhost:8000
# or:  npx serve src
```

Opening `index.html` via `file://` works for everything **except** the inline icon/reward
sprites (browsers block `fetch` on `file://`). The tier badges still show (they're `<img>`).

## Conventions when extending

- **New screen:** add `SCREENS.myScreen(state)` in `screens.js`, a `NAV` entry in `app.js`,
  and a `case` in `screenHtml()`. Reuse `UI.*` builders and existing CSS classes.
- **New reward / tier / data:** edit `data.js` only. Never inline content in screens.
- **New icon:** add a `<symbol id="i-name">` to `icons.svg`, then `UI.icon('name')`.
- **Styling:** add classes to the matching CSS file; always reference `var(--token)`.
- **No new dependencies, no build tooling, no inline hex colors.** Keep it vanilla.
- Don't add filler content, dummy stats, or decorative gradients. Less is more.

## Known TODO / good next tasks

- Wire real auth + API (currently mock data in `data.js`, login is a no-op).
- Redemption: real search/filter logic (search input is disabled placeholder).
- Reward claim history persistence; success toast after confetti.
- Roadmap: optional richer "mountain" SVG path between badges (see git history of the
  React prototype `../Agent Star Rewards.html` for a reference implementation).
- Profile sub-pages (contact, notifications, security).
- Unit tests for the star/tier math (`stars → tier`, `stars → next-tier delta`).
