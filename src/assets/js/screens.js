/* screens.js — each screen returns an HTML string for the given state.
   state = { screen, agent, theme }  */
window.SCREENS = (function () {
  const { TIERS, REWARDS, ACTIVITY, LEADERBOARD } = window.DATA;
  const U = window.UI;

  function login() {
    return `<div class="login">
      <div class="login-glow"></div>
      <div class="login-box">
        <div class="brand" style="margin-bottom:48px;padding:0">
          <div class="brand-mark">${U.icon('star', 18)}</div>
          <div><div class="brand-name">AGENT STAR</div><div class="brand-sub">Rewards Program</div></div>
        </div>
        <div class="screen-eyebrow">Welcome back</div>
        <h1 class="screen-title" style="font-size:40px;margin-bottom:8px">Claim your<br>next milestone.</h1>
        <p class="screen-lead" style="margin-bottom:28px">Sign in with your agent ID to track stars, tier progress, and claim rewards.</p>
        <div class="field"><label><div class="flbl">Agent ID</div><input value="SR-2847"></label></div>
        <div class="field"><label><div class="flbl">Password</div><input type="password" value="********"></label></div>
        <button class="btn btn-primary lg block" data-action="login" style="margin-top:12px">Sign in to rewards</button>
      </div>
    </div>`;
  }

  function dashboard(agent) {
    const cur = TIERS[agent.currentTierIndex];
    const next = TIERS[agent.currentTierIndex + 1] || cur;
    const toNext = Math.max(0, next.stars - agent.stars);
    const span = next.stars - cur.stars || 1;
    const pct = Math.min(100, ((agent.stars - cur.stars) / span) * 100);
    const stats = [
      { lbl: 'YTD Sales', val: agent.ytdSales, sub: '+12% QoQ' },
      { lbl: 'Tonnage', val: agent.ytdTonnage, sub: '+8% QoQ' },
      { lbl: 'Orders', val: String(agent.ytdOrders), sub: 'This year' },
    ];
    return `<div class="screen">
      <div class="dash-greet">
        <div class="who">${U.avatar(agent.avatar, 44)}
          <div><div class="greet-label">Good morning,</div><div class="greet-name">${agent.name.split(' ')[0]}</div></div>
        </div>
        <button class="theme-toggle" data-action="toggle-theme" title="Toggle theme">${U.icon('settings', 18)}</button>
      </div>

      <div class="hero">
        <div class="hero-glow"></div><div class="hero-grid"></div>
        <div class="hero-inner">
          <div style="display:flex;align-items:center;gap:16px">
            ${U.tierRing(agent.currentTierIndex, agent.stars - cur.stars, span)}
            <div>
              <div class="hero-tier-label">Current tier</div>
              <div class="hero-tier-name">${cur.name}</div>
              <div class="hero-tier-sub">${cur.sub} rank</div>
              <div class="hero-rank"><span class="dot"></span>#${agent.rank} of ${agent.totalAgents}</div>
            </div>
          </div>
          <div class="hero-stars">
            <div class="hero-star-row">${U.icon('star', 26)}<span class="hero-star-num">${agent.stars}</span><span class="hero-star-unit">stars</span></div>
            <div class="hero-trend"><b>+${agent.monthGain}</b> this month · ${agent.lifetimeStars.toLocaleString()} lifetime</div>
            <div class="hero-next"><span>Next: <b style="color:#fff">${next.name}</b></span><span><b>${toNext}</b> / ${span}</span></div>
            ${U.gauge(pct, true)}
          </div>
        </div>
      </div>

      <div class="stat-grid" style="margin-bottom:24px">
        ${stats.map(s => `<div class="card stat"><div class="lbl">${s.lbl}</div><div class="val">${s.val}</div><div class="sub">${s.sub}</div></div>`).join('')}
      </div>

      <div class="dash-cols">
        <div>
          ${U.sectionH('Your journey', 'Tier progress', { to: 'roadmap', label: 'View roadmap →' })}
          <div class="card pad" style="margin-bottom:20px">${miniRoad(agent)}</div>
          ${U.sectionH('Claim now', 'Featured rewards', { to: 'redeem', label: 'All rewards →' })}
          <div class="featured-grid">${REWARDS.slice(0, 3).map(r => U.rewardCard(r, agent.stars)).join('')}</div>
        </div>
        <div class="dash-side">
          ${U.sectionH('Recent', 'Activity', { to: 'history', label: 'All →' })}
          <div class="card">${ACTIVITY.slice(0, 5).map(U.activityRow).join('')}</div>
          <div style="margin-top:20px">${U.sectionH('Top 5', 'Leaderboard', { to: 'leaderboard', label: 'See all →' })}
          <div class="card">${LEADERBOARD.slice(0, 5).map(U.leaderRow).join('')}</div></div>
        </div>
      </div>
    </div>`;
  }

  function miniRoad(agent) {
    const cur = agent.currentTierIndex;
    const fillPct = (cur / (TIERS.length - 1)) * 80;
    return `<div class="mini-road">
      <div class="mini-track"></div>
      <div class="mini-fill" style="width:${fillPct}%"></div>
      <div class="mini-nodes">
        ${TIERS.map((t, i) => `<div class="mini-node">
          ${U.tierBadge(i, 64, { active: i <= cur })}
          <div class="nm${i <= cur ? '' : ' locked'}">${t.name}</div>
          <div class="rq">${t.stars.toLocaleString()}★</div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  function roadmap(agent) {
    const cur = agent.currentTierIndex;
    const fillPct = (cur / (TIERS.length - 1)) * 100;
    return `<div class="screen">
      <div class="screen-eyebrow">The climb</div>
      <h1 class="screen-title">Your tier journey</h1>
      <p class="screen-lead">Every tier is a summit. Climb from the Bronze foothills to the Diamond peak — each badge earned shows more depth, more prestige, more greatness.</p>

      <div class="card pad" style="margin:24px 0;background:var(--surface)">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:16px">
            ${U.tierBadge(cur, 72)}
            <div><div class="climb-rank-sub">Currently climbing</div>
              <div class="climb-name" style="font-size:24px">${TIERS[cur].name}</div>
              <div class="reward-sub">${TIERS[cur].sub} rank · reached 3 weeks ago</div></div>
          </div>
          <div style="text-align:right">
            <div class="climb-rank-sub">Total stars</div>
            <div style="font-size:30px;font-weight:800;color:var(--primary);letter-spacing:-0.6px;font-variant-numeric:tabular-nums">${agent.stars.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div class="climb">
        <div class="climb-line"></div>
        <div class="climb-fill" style="height:calc(${fillPct}% - 36px)"></div>
        ${TIERS.map((t, i) => climbStep(t, i, agent)).join('')}
      </div>
    </div>`;
  }

  function climbStep(t, i, agent) {
    const reached = i <= agent.currentTierIndex;
    const current = i === agent.currentTierIndex;
    const next = i === agent.currentTierIndex + 1;
    const locked = i > agent.currentTierIndex;
    let tag = '';
    if (current) tag = `<span class="state-tag current">Current</span>`;
    else if (next) tag = `<span class="state-tag next">Up next</span>`;
    else if (locked) tag = `<span class="state-tag locked">${U.icon('lock', 11)} Locked</span>`;
    else tag = `<span class="state-tag next">Unlocked</span>`;

    let progress = '';
    if (next) {
      const prev = TIERS[i - 1].stars;
      const pct = ((agent.stars - prev) / (t.stars - prev)) * 100;
      progress = `<div class="climb-progress"><div class="lbl"><b>${t.stars - agent.stars}</b> more stars to unlock ${t.name}</div>${U.gauge(pct)}</div>`;
    }
    return `<div class="climb-step">
      <div class="climb-badge-wrap">
        ${current ? '<div class="climb-pulse"></div>' : ''}
        <div class="climb-badge-ring ${reached ? 'reached' : ''} ${current ? 'current' : ''}">
          ${U.tierBadge(i, 64, { active: reached, tap: true })}
        </div>
      </div>
      <div class="card pad climb-card" style="${current ? 'border-color:color-mix(in srgb,var(--primary) 50%,transparent)' : ''}">
        <div class="climb-head">
          <div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span class="climb-name">${t.name}</span>${tag}</div>
            <div class="climb-rank-sub" style="margin-top:2px">${t.sub} rank · ${t.stars.toLocaleString()} stars</div></div>
          ${U.starPill(t.stars)}
        </div>
        <div class="reward-sub" style="max-width:600px;margin-bottom:12px">${t.desc}</div>
        <div class="perks">${t.perks.map(p => `<span class="perk ${reached ? 'on' : ''}">${p}</span>`).join('')}</div>
        ${progress}
      </div>
    </div>`;
  }

  function redeem(agent, cat = 'All') {
    const cats = ['All', 'Vouchers', 'Gadgets', 'Travel', 'Learning', 'Gear', 'Experiences'];
    const list = cat === 'All' ? REWARDS : REWARDS.filter(r => r.category === cat);
    return `<div class="screen">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:20px">
        <div><div class="screen-eyebrow">Redemption Center</div><h1 class="screen-title">Claim your rewards</h1></div>
        <div class="balance-pill">${U.icon('star', 22)}<div><div class="balance-lbl">Available balance</div><div class="balance-val">${agent.stars.toLocaleString()} stars</div></div></div>
      </div>
      <div class="toolbar">
        <div class="searchbox">${U.icon('search', 16)}<input placeholder="Search rewards..." disabled></div>
        <button class="icon-btn">${U.icon('filter', 18)}</button>
      </div>
      <div class="chips">${cats.map(c => `<button class="chip ${c === cat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="reward-grid">${list.map(r => U.rewardCard(r, agent.stars)).join('')}</div>
    </div>`;
  }

  function history(agent) {
    return `<div class="screen">
      <div class="screen-eyebrow">Activity</div><h1 class="screen-title" style="margin-bottom:20px">Star history</h1>
      <div class="card">${ACTIVITY.map(U.activityRow).join('')}</div>
    </div>`;
  }

  function leaderboard(agent) {
    const t = LEADERBOARD;
    const order = [t[1], t[0], t[2]];
    const heights = [110, 140, 90];
    const bg = ['var(--ink-soft)', 'var(--primary)', 'var(--ink-faint)'];
    return `<div class="screen">
      <div class="screen-eyebrow">Competition</div><h1 class="screen-title" style="margin-bottom:20px">Leaderboard</h1>
      <div class="podium">
        ${order.map((p, idx) => {
          const pos = idx === 1 ? 1 : idx === 0 ? 2 : 3;
          return `<div class="podium-col">
            ${U.avatar(U.initials(p.name), pos === 1 ? 56 : 44)}
            <div class="podium-name">${p.name.split(' ')[0]}</div>
            <div class="podium-stars">${p.stars.toLocaleString()}★</div>
            <div class="podium-bar" style="height:${heights[idx]}px;background:${bg[idx]}">${pos}</div>
          </div>`;
        }).join('')}
      </div>
      ${U.sectionH('All agents', 'Ranking · Q2 2026')}
      <div class="card">${LEADERBOARD.map(U.leaderRow).join('')}</div>
    </div>`;
  }

  function profile(agent) {
    const rows = [
      { l: 'Contact information', s: 'Email, phone, office address', i: 'user' },
      { l: 'Notification preferences', s: 'Email & in-app alerts', i: 'bell' },
      { l: 'Language & region', s: 'English · Thailand', i: 'shield' },
      { l: 'Security', s: 'Password, 2FA', i: 'settings' },
    ];
    return `<div class="screen">
      <div class="card pad" style="margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
          ${U.avatar(agent.avatar, 72)}
          <div style="flex:1;min-width:0">
            <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.3px">${agent.name}</h1>
            <div class="reward-sub" style="margin:2px 0 0">Agent ${agent.id} · ${agent.region}</div>
            <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">${U.tierChip(agent.currentTierIndex)}</div>
          </div>
          ${U.tierBadge(agent.currentTierIndex, 72)}
        </div>
      </div>
      ${U.sectionH('Settings', 'Preferences')}
      <div class="card" style="margin-bottom:20px">
        ${rows.map(r => `<div class="set-row"><div class="set-ic">${U.icon(r.i, 16)}</div>
          <div class="set-main"><div class="set-title">${r.l}</div><div class="set-sub">${r.s}</div></div>
          ${U.icon('chevronR', 16)}</div>`).join('')}
      </div>
      <button class="btn btn-ghost block" data-action="logout">${U.icon('logout', 16)} Sign out</button>
    </div>`;
  }

  function rewardModal(r, agent) {
    const ok = agent.stars >= r.stars;
    const after = agent.stars - r.stars;
    return `<div class="modal-overlay" data-action="close-modal">
      <div class="modal" data-stop>
        <div class="modal-hero"><div style="transform:scale(2.8);color:var(--ink-soft)">${U.rewardGlyph(r.category)}</div>
          <button class="modal-close" data-action="close-modal">${U.icon('close', 16)}</button></div>
        <div style="padding:24px">
          <div class="reward-cat">${r.category}</div>
          <h2 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px">${r.title}</h2>
          <div class="reward-sub" style="margin:4px 0 18px">${r.sub}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:12px;background:var(--surface-soft);border:1px solid var(--border-soft);margin-bottom:16px">
            <div><div class="balance-lbl">Cost</div><div style="display:flex;align-items:center;gap:6px;margin-top:2px">${U.icon('star', 18)}<span style="font-size:22px;font-weight:800;font-variant-numeric:tabular-nums">${r.stars.toLocaleString()}</span></div></div>
            <div style="text-align:right"><div class="balance-lbl">Balance after</div>
              <div style="font-size:18px;font-weight:700;margin-top:4px;font-variant-numeric:tabular-nums;color:${ok ? 'var(--success)' : 'var(--primary)'}">${ok ? after.toLocaleString() + ' stars' : 'Need ' + (-after).toLocaleString() + ' more'}</div></div>
          </div>
          <div class="reward-sub" style="line-height:1.55;margin-bottom:20px">Processed within 5–7 business days. Digital rewards via email; physical items ship to your office.</div>
          <div style="display:flex;gap:10px">
            <button class="btn btn-ghost lg" style="flex:1" data-action="close-modal">Cancel</button>
            <button class="btn ${ok ? 'btn-primary' : 'btn-soft'} lg" style="flex:2" ${ok ? `data-action="claim" data-reward="${r.id}"` : 'disabled'}>${ok ? 'Confirm claim' : 'Earn more stars'}</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  return { login, dashboard, roadmap, redeem, history, leaderboard, profile, rewardModal };
})();
