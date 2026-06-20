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

This is a **Next.js 15** application (TypeScript, App Router, React 18). The entry
point is `next-app/`.

## Non-negotiable design rules

1. **Color palette is strict corporate White/Red + Black/Red.**
   - Light mode: white surfaces, near-black ink, **brand red `#D91E1E`** as the *only* accent.
   - Dark mode: black surfaces, off-white ink, **red `#FF3B3B`** accent.
   - Red is reserved for: CTAs, progress-bar fills, active nav, active tier, key numbers.
   - **Do NOT introduce new accent hues** (no blue/green/amber chrome). The only place
     non-red colors appear is *inside the tier badge artwork* (bronze/silver/gold/etc.
     are naturally metallic) and the semantic `--success` green for "+stars". That's it.
   - All colors live as CSS variables in `next-app/app/globals.css`. Never hard-code a hex
     in components — use a `var(--token)`.

2. **The Tier Roadmap is the centerpiece.** Badges escalate in complexity & prestige:
   - Bronze = simple structural medal. Silver = textured/ornate rim. Gold = gradients +
     internal glow + bolder geometry. Platinum = faceted 3D depth. Diamond = iconic,
     radiant, layered, premium.
   - The badges are committed as standalone SVG assets in `next-app/public/assets/svg/tiers/`.
     If you redesign a badge, keep the escalation principle and keep them as assets.
   - The roadmap reads as a **journey/climb** (red path shows progress).

3. **Mobile is priority #1.** The layout is responsive from one codebase:
   - `≤ 900px`: bottom tab bar, single column, top app bar.
   - `> 900px`: left sidebar, multi-column dashboard with activity feed + leaderboard.
   - Hit targets ≥ 44px. Body text ≥ 13px.

4. **Accessibility & polish:** honor `prefers-reduced-motion`, keep contrast high,
   use semantic structure, keep animations tasteful (no infinite decorative loops on content).

## Architecture (Next.js 15, App Router)

State lives in `AppContext` (React `useReducer`). Screens are React components under
`next-app/components/screens/`. Navigation is driven by dispatching `{ type: 'NAV', screen }`.

```
AppContext (useReducer)
  ↓
AppRoot → auth gate → AppShell + <ScreenComponent />
  ↓                              ↑
dispatch(action) ← onClick ──────┘
```

State shape:
```ts
{ authed: boolean, screen: NavKey, cat: string,
  agent: Agent, theme: 'light'|'dark', modal: Reward|null }
```

## File map

- `next-app/app/layout.tsx` — root layout; loads fonts (Inter, JetBrains Mono), wraps `AppProvider`, mounts `SpriteLoader`.
- `next-app/app/globals.css` — all CSS: tokens, base shell, components, screen layouts.
- `next-app/app/page.tsx` — renders `<AppRoot />`.
- `next-app/components/AppRoot.tsx` — auth gate + screen router + confetti trigger.
- `next-app/components/AppShell.tsx` — sidebar (desktop) · topbar · bottom nav (mobile).
- `next-app/components/screens/` — one `.tsx` file per screen.
- `next-app/components/ui/` — reusable primitives (Icon, TierBadge, Avatar, Gauge, etc.).
- `next-app/context/AppContext.tsx` — `useReducer` store; all actions defined here.
- `next-app/lib/data.ts` — TypeScript interfaces + all mock data (TIERS, REWARDS, AGENT, ACTIVITY, LEADERBOARD, NAV).
- `next-app/public/assets/svg/tiers/` — 5 tier badge SVGs served statically.
- `next-app/public/assets/svg/icons.svg` — UI icon sprite (`<symbol id="i-…">`).
- `next-app/public/assets/svg/rewards.svg` — reward category glyph sprite (`<symbol id="r-…">`).

## Running it

```bash
cd next-app
npm install
npm run dev       # http://localhost:3000
npm run build && npm start   # production
```

## Conventions when extending

- **New screen:** create `next-app/components/screens/FooScreen.tsx`, add `{ key:'foo', ... }` to `NAV` in `data.ts`, add a `case 'foo'` in `AppRoot.tsx`.
- **New reward / tier / data:** edit `next-app/lib/data.ts` only.
- **New icon:** add `<symbol id="i-name">` to `icons.svg`; use via `<Icon name="name" />`.
- **Styling:** add classes to `globals.css`; always use `var(--token)`, never inline hex.
- **No new accent colors. No decorative filler. No inline hex values.**

## Known TODO / good next tasks

- Wire real auth + API (currently mock data in `lib/data.ts`, login is a no-op).
- Redemption: real search/filter logic (search input is disabled placeholder).
- Reward claim history persistence; success toast after confetti.
- Profile sub-pages (contact, notifications, security).
- Unit tests for the star/tier math (`stars → tier`, `stars → next-tier delta`).
