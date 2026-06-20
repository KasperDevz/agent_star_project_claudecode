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
| Login | `login` (pre-auth) | `screens/LoginScreen.tsx` | ✅ mock |
| Dashboard | `dashboard` | `screens/DashboardScreen.tsx` | ✅ |
| Tier Roadmap | `roadmap` | `screens/RoadmapScreen.tsx` | ✅ |
| Redemption Center | `redeem` | `screens/RedeemScreen.tsx` | ✅ (filter by category) |
| Reward detail / claim | modal | `RewardModal.tsx` | ✅ + confetti |
| Activity History | `history` | `screens/HistoryScreen.tsx` | ✅ |
| Leaderboard | `leaderboard` | `screens/LeaderboardScreen.tsx` | ✅ podium + list |
| Profile & Settings | `profile` | `screens/ProfileScreen.tsx` | ✅ (sub-pages TODO) |

## 3. The tier system

Defined in `lib/data.ts → TIERS` (index 0–4):

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
The 5 badges are standalone SVGs in `next-app/public/assets/svg/tiers/`. They were authored to escalate:
Bronze (flat medal) → Silver (ornate rim) → Gold (glow + rays) → Platinum (faceted 3D) →
Diamond (radiant, layered, sparkles). Glows are added in CSS (`.tier-badge.t-gold/.t-platinum/.t-diamond`).
Render with `<TierBadge index={i} size={n} active />`.

## 4. How to add things (recipes)

**Add a reward:** append to `REWARDS` in `lib/data.ts`. Categories drive the glyph
(`public/assets/svg/rewards.svg` symbol `r-<Category>`) and the filter chips. Add a new category →
add a matching `<symbol id="r-NewCat">` to `rewards.svg`.

**Add a nav screen:**
1. Create `components/screens/FooScreen.tsx`
2. Add `{ key:'foo', label:'Foo', short:'Foo', icon:'star' }` to `NAV` in `lib/data.ts`
3. Add `case 'foo': return <FooScreen />;` in `AppRoot.tsx`

**Add an icon:** new `<symbol id="i-foo" viewBox="0 0 24 24">…</symbol>` in `icons.svg`
(use `stroke="currentColor"` or `fill="currentColor"`), then `<Icon name="foo" size={n} />`.

**Trigger celebration:** call `triggerConfetti()` from `components/Confetti.tsx`. Already
wired in `AppRoot.tsx` on star decrement (reward claim). Keep it for genuine wins only.

## 5. Visual system cheatsheet

- **Type:** Inter (UI), JetBrains Mono (numeric/system). Loaded via `next/font/google` in `layout.tsx`.
- **Tokens:** every color/spacing/shape value is a `var(--…)` in `globals.css`.
- **Components:** `.card(.pad/.tap)`, `.btn(.btn-primary/.btn-ghost/.btn-soft)(.lg/.sm/.block)`,
  `.star-pill`, `.tier-chip`, `.gauge`, `.chip`, `.act-row`, `.lead-row`. Reuse them.
- **Dark mode:** toggled by `data-theme="dark"` on `<html>` (persisted in `localStorage`
  under `asr-theme`). Dispatch `{ type: 'TOGGLE_THEME' }` to switch.

## 6. Do / Don't

✅ Reference tokens via `var(--…)`. ✅ Mobile-first. ✅ TypeScript for all new files.
✅ Keep red as the sole brand accent. ✅ Keep badges as escalating SVG assets.

❌ No new accent colors or gradient soup. ❌ No inline hex in components.
❌ No filler stats/sections. ❌ No emoji in UI.

## 7. Verify before shipping

- Serve over HTTP; confirm icons + reward glyphs appear (sprites fetched at runtime).
- Resize across the 900px breakpoint: sidebar ↔ bottom-nav, columns collapse cleanly.
- Toggle dark mode; check contrast and that red stays vivid.
- Click a reward → modal → confirm claim → stars decrement + confetti.
- Run through all nav routes; scroll resets to top on navigation.

---

## 8. Git workflow & versioning

This project follows **simplified Git Flow** with **semantic versioning** (semver).

### Branch structure

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready. Every commit here is tagged or releasable. |
| `develop` | Integration branch. All features merge here first. |
| `feature/<name>` | New capability. Branched from `develop`, merged back to `develop`. |
| `fix/<name>` | Bug fix. Branched from `develop` (or `main` for hotfixes). |
| `release/v<x.y.z>` | Release prep (changelog, bump version). Merges into `main` + `develop`. |
| `hotfix/<name>` | Urgent production fix. Branched from `main`, merged into `main` + `develop`. |

```
main ──────────────────────────── v1.0.0 ──────── v1.1.0 ──▶
        \                                   ↗
         develop ─── feature/A ─── feature/B ─── release/v1.1.0
```

### Versioning (semver: MAJOR.MINOR.PATCH)

| Change | Version bump | Example |
|---|---|---|
| Breaking change or full rebuild | MAJOR | `v1.0.0 → v2.0.0` |
| New screen, new feature, new data | MINOR | `v1.0.0 → v1.1.0` |
| Bug fix, copy change, style tweak | PATCH | `v1.0.0 → v1.0.1` |

### Current release

**`v1.0.0`** — first complete release on `main`.
- Next.js 15 with TypeScript + App Router (`next-app/`)
- All 8 screens, dark mode, responsive layout, confetti on claim

### Common commands

```bash
# Start a feature
git checkout develop
git checkout -b feature/my-feature

# Finish a feature → merge back to develop
git checkout develop
git merge --no-ff feature/my-feature
git branch -d feature/my-feature

# Cut a release
git checkout -b release/v1.1.0 develop
# bump version, update changelog
git checkout main
git merge --no-ff release/v1.1.0
git tag -a v1.1.0 -m "v1.1.0 — <summary>"
git checkout develop
git merge --no-ff release/v1.1.0
git branch -d release/v1.1.0

# Hotfix on production
git checkout -b hotfix/critical-fix main
# fix the issue
git checkout main
git merge --no-ff hotfix/critical-fix
git tag -a v1.0.1 -m "v1.0.1 — <fix summary>"
git checkout develop
git merge --no-ff hotfix/critical-fix
git branch -d hotfix/critical-fix

# List all tags
git tag -l

# View tag details
git show v1.0.0
```

### Commit message convention

```
<type>: <short summary>

type: feat | fix | refactor | style | docs | chore | test
```

Examples:
- `feat: add profile sub-pages`
- `fix: hero ring SVG overflow on mobile`
- `docs: update SKILL.md with git workflow`
- `chore: bump next to v15.6`
