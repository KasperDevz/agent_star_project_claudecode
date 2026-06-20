/* app.js — boot, sprite injection, routing, nav, theme, modal, confetti.
   Plain vanilla. No build step. State lives in a single object; render() repaints #view. */
(function () {
  const { TIERS, REWARDS, AGENT } = window.DATA;
  const SCREENS = window.SCREENS;
  const U = window.UI;

  const NAV = [
    { key: 'dashboard',   label: 'Dashboard',    short: 'Home',     icon: 'home' },
    { key: 'roadmap',     label: 'Tier Roadmap', short: 'Tiers',    icon: 'map' },
    { key: 'redeem',      label: 'Redemption',   short: 'Rewards',  icon: 'gift' },
    { key: 'history',     label: 'Activity',     short: 'Activity', icon: 'history' },
    { key: 'leaderboard', label: 'Leaderboard',  short: 'Ranks',    icon: 'trophy' },
    { key: 'profile',     label: 'Profile',      short: 'Profile',  icon: 'user' },
  ];

  const state = {
    authed: false,
    screen: 'dashboard',
    cat: 'All',
    agent: Object.assign({}, AGENT),
    theme: localStorage.getItem('asr-theme') || 'light',
    modal: null,
  };

  // ── Sprite injection (icons + reward glyphs) ──
  async function injectSprites() {
    for (const file of ['icons.svg', 'rewards.svg']) {
      try {
        const res = await fetch('assets/svg/' + file);
        const text = await res.text();
        const wrap = document.createElement('div');
        wrap.style.display = 'none';
        wrap.innerHTML = text;
        document.body.appendChild(wrap);
      } catch (e) { console.warn('Sprite load failed (serve over http):', file); }
    }
  }

  // ── Render ──
  function render() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const root = document.getElementById('root');

    if (!state.authed) { root.innerHTML = SCREENS.login(); return; }

    root.innerHTML = `
      <div class="app-shell">
        ${sidebar()}
        <div class="main">
          ${topbar()}
          <main class="view" id="view">${screenHtml()}</main>
        </div>
        ${bottomNav()}
      </div>
      ${state.modal ? SCREENS.rewardModal(state.modal, state.agent) : ''}
    `;
  }

  function screenHtml() {
    switch (state.screen) {
      case 'dashboard':   return SCREENS.dashboard(state.agent);
      case 'roadmap':     return SCREENS.roadmap(state.agent);
      case 'redeem':      return SCREENS.redeem(state.agent, state.cat);
      case 'history':     return SCREENS.history(state.agent);
      case 'leaderboard': return SCREENS.leaderboard(state.agent);
      case 'profile':     return SCREENS.profile(state.agent);
      default:            return SCREENS.dashboard(state.agent);
    }
  }

  function sidebar() {
    const a = state.agent, cur = TIERS[a.currentTierIndex];
    return `<aside class="sidebar">
      <div class="brand"><div class="brand-mark">${U.icon('star', 16)}</div>
        <div><div class="brand-name">AGENT STAR</div><div class="brand-sub">Rewards</div></div></div>
      <div class="side-user">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">${U.avatar(a.avatar, 34)}
          <div style="min-width:0;flex:1"><div class="lead-name">${a.name.split(' ')[0]} ${a.name.split(' ')[1][0]}.</div>
          <div class="lead-region">${a.id}</div></div></div>
        ${U.tierChip(a.currentTierIndex)}
        <div style="display:flex;align-items:baseline;gap:4px;margin-top:10px">${U.icon('star', 14)}
          <span style="font-size:18px;font-weight:800;letter-spacing:-0.3px;font-variant-numeric:tabular-nums">${a.stars.toLocaleString()}</span>
          <span class="lead-region">stars</span></div>
      </div>
      <nav class="nav-list">
        <div class="nav-eyebrow">Menu</div>
        ${NAV.map(n => `<button class="nav-item ${state.screen === n.key ? 'active' : ''}" data-nav="${n.key}">${U.icon(n.icon, 18)} ${n.label}</button>`).join('')}
      </nav>
      <button class="nav-item" data-action="toggle-theme">${U.icon('settings', 18)} ${state.theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
    </aside>`;
  }

  function topbar() {
    const a = state.agent;
    return `<header class="topbar">
      <div class="brand" style="padding:0"><div class="brand-mark" style="width:30px;height:30px">${U.icon('star', 14)}</div>
        <div><div class="brand-name" style="font-size:12px">AGENT STAR</div></div></div>
      <div style="display:flex;align-items:center;gap:8px">
        ${U.starPill(a.stars, true)}
        <button class="theme-toggle" data-action="toggle-theme">${U.icon('settings', 18)}</button>
      </div>
    </header>`;
  }

  function bottomNav() {
    return `<nav class="bottom-nav">
      ${NAV.filter(n => n.key !== 'leaderboard').map(n =>
        `<button class="bn-item ${state.screen === n.key ? 'active' : ''}" data-nav="${n.key}">${U.icon(n.icon, 22)}<span>${n.short}</span></button>`
      ).join('')}
    </nav>`;
  }

  // ── Confetti ──
  function confetti() {
    const layer = document.createElement('div');
    layer.className = 'confetti-layer';
    const colors = ['var(--primary)', 'var(--primary-deep)', '#fff'];
    for (let i = 0; i < 60; i++) {
      const b = document.createElement('div');
      b.className = 'confetti-bit';
      const dx = (Math.random() - 0.5) * 300, dy = -200 - Math.random() * 200;
      const rot = (Math.random() - 0.5) * 720, shape = i % 3;
      b.style.cssText = `left:${50 + (Math.random()-0.5)*20}%;` +
        `width:${shape===0?8:shape===1?10:6}px;height:${shape===0?8:shape===1?4:12}px;` +
        `background:${colors[i%3]};border-radius:${shape===0?'50%':'2px'};` +
        `--dx:${dx}px;--dy:${dy}px;--rot:${rot}deg;` +
        `animation:confettiBurst 1400ms ${Math.random()*100}ms cubic-bezier(.2,.6,.4,1) forwards`;
      layer.appendChild(b);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 1700);
  }

  // ── Event delegation ──
  document.addEventListener('click', (e) => {
    const navEl = e.target.closest('[data-nav]');
    if (navEl) { state.screen = navEl.dataset.nav; state.cat = 'All'; render(); window.scrollTo(0, 0); return; }

    const catEl = e.target.closest('[data-cat]');
    if (catEl) { state.cat = catEl.dataset.cat; render(); return; }

    const rewardEl = e.target.closest('[data-reward]');
    const actEl = e.target.closest('[data-action]');
    const action = actEl && actEl.dataset.action;

    if (action === 'login')        { state.authed = true; state.screen = 'dashboard'; render(); return; }
    if (action === 'logout')       { state.authed = false; render(); return; }
    if (action === 'toggle-theme') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('asr-theme', state.theme); render(); return; }
    if (action === 'close-modal')  { if (!e.target.closest('[data-stop]') || e.target.closest('[data-action="close-modal"]')) { state.modal = null; render(); } return; }
    if (action === 'claim') {
      const r = REWARDS.find(x => x.id === actEl.dataset.reward);
      if (r) { state.agent.stars -= r.stars; state.modal = null; render(); confetti(); }
      return;
    }
    // open reward modal (card click) — only if not an action button
    if (rewardEl && !action) {
      const r = REWARDS.find(x => x.id === rewardEl.dataset.reward);
      if (r) { state.modal = r; render(); }
    }
  });

  // ── Boot ──
  injectSprites().then(render);
})();
