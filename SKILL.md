# SKILL.md — Building & extending Agent Star Rewards

A focused build guide for an agent (human or Claude Code) working on this project.
Pair with `CLAUDE.md` (rules) and `PROJECT_STRUCTURE.md` (file tree).

---

## 1. Product in one paragraph

Refractory **sales agents** log in and see their **stars**, **current tier**, and
**progress to the next tier**. They explore a **Tier Roadmap** (a prestige climb of
5 escalating badges), spend stars in a **Redemption Center**, and track **activity**,
**leaderboard** standing, and **profile**. Stars come from real KPIs: *sales amount,
tonnage, orders*.

## 2. Screens (status)

| Screen | Route key | File | State |
|---|---|---|---|
| Login | `login` (pre-auth) | `screens.js → login()` | ✅ mock |
| Dashboard | `dashboard` | `dashboard()` | ✅ |
| Tier Roadmap | `roadmap` | `roadmap()` + `climbStep()` | ✅ |
| Redemption Center | `redeem` | `redeem()` | ✅ (filter by category) |
| Reward detail / claim | modal | `rewardModal()` | ✅ + confetti |
| Activity History | `history` | `history()` | ✅ |
| Leaderboard | `leaderboard` | `leaderboard()` | ✅ podium + list |
| Profile & Settings | `profile` | `profile()` | ✅ (sub-pages TODO) |

## 3. The tier system

Defined in `data.js → TIERS` (index 0–4):

| Tier | Stars to reach | Sub-rank |
|---|---|---|
| Bronze | 0 | Foundry |
| Silver | 250 | Forge |
| Gold | 600 | Kiln |
| Platinum | 1,200 | Crucible |
| Diamond | 2,500 | Master |

Helper math (current vs next tier, % to next) is computed inline in `dashboard()` and
`roadmap()`. If you refactor, extract a `tierProgress(agent)` util into `ui.js`.

### Badge artwork = the soul of the product
The 5 badges are standalone SVGs in `assets/svg/tiers/`. They were authored to escalate:
Bronze (flat medal) → Silver (ornate rim) → Gold (glow + rays) → Platinum (faceted 3D) →
Diamond (radiant, layered, sparkles). Glows are added in CSS (`.tier-badge.t-gold/.t-platinum/.t-diamond`).
Render with `UI.tierBadge(index, size, {active, tap})`.

## 4. How to add things (recipes)

**Add a reward:** append to `DATA.REWARDS` in `data.js`. Categories drive the glyph
(`assets/svg/rewards.svg` symbol `r-<Category>`) and the filter chips. Add a new category →
add a matching `<symbol id="r-NewCat">` to `rewards.svg`.

**Add a nav screen:**
1. `SCREENS.foo = (state) => \`…html…\`` in `screens.js`
2. `{ key:'foo', label:'Foo', short:'Foo', icon:'star' }` in `NAV` (`app.js`)
3. `case 'foo': return SCREENS.foo(state.agent);` in `screenHtml()`

**Add an icon:** new `<symbol id="i-foo" viewBox="0 0 24 24">…</symbol>` in `icons.svg`
(use `stroke="currentColor"` or `fill="currentColor"`), then `UI.icon('foo', size)`.

**Trigger celebration:** call the module-private `confetti()` in `app.js` (already wired
to reward claims). Keep it for genuine wins only.

## 5. Visual system cheatsheet

- **Type:** Inter (UI), Instrument Serif (only big editorial headers if desired),
  JetBrains Mono (numeric/system). Loaded from Google Fonts in `index.html`.
- **Tokens:** every color/spacing/shape value is a `var(--…)` in `tokens.css`.
- **Components:** `.card(.pad/.tap)`, `.btn(.btn-primary/.btn-ghost/.btn-soft)(.lg/.sm/.block)`,
  `.star-pill`, `.tier-chip`, `.gauge`, `.chip`, `.act-row`, `.lead-row`. Reuse them.
- **Dark mode:** toggled by `data-theme="dark"` on `<html>` (persisted in `localStorage`
  under `asr-theme`). All tokens flip automatically.

## 6. Do / Don't

✅ Keep it vanilla & dependency-free. ✅ Reference tokens. ✅ Mobile-first.
✅ Keep red as the sole brand accent. ✅ Keep badges as escalating SVG assets.

❌ No frameworks/build steps. ❌ No new accent colors or gradient soup.
❌ No inline hex in components. ❌ No filler stats/sections. ❌ No emoji in UI.

## 7. Verify before shipping

- Serve over HTTP; confirm icons + reward glyphs appear (sprites fetched at runtime).
- Resize across the 900px breakpoint: sidebar ↔ bottom-nav, columns collapse cleanly.
- Toggle dark mode; check contrast and that red stays vivid.
- Click a reward → modal → confirm claim → stars decrement + confetti.
- Run through all nav routes; scroll resets to top on navigation.
