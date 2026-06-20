/* ui.js — rendering helpers + reusable component builders (return HTML strings). */
window.UI = (function () {
  const { TIERS } = window.DATA;

  // SVG icon (references injected #i-<name> sprite symbols)
  function icon(name, size = 20) {
    return `<svg class="icon" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  }
  // Reward category glyph (references injected #r-<Category> symbols)
  function rewardGlyph(category, size = 60) {
    return `<svg width="${size}" height="${size}" aria-hidden="true"><use href="#r-${category}"/></svg>`;
  }
  // Tier badge image asset
  function tierBadge(index, size = 72, { active = true, tap = false } = {}) {
    const t = TIERS[index];
    const cls = ['tier-badge', `t-${t.key}`];
    if (!active) cls.push('inactive');
    if (tap) cls.push('tap');
    return `<img class="${cls.join(' ')}" src="assets/svg/tiers/${t.key}.svg" width="${size}" height="${size}" alt="${t.name} tier badge">`;
  }

  function avatar(initials, size = 40) {
    return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.38)}px">${initials}</div>`;
  }
  function initials(name) { return name.split(' ').map(w => w[0]).join('').slice(0, 2); }

  function starPill(count, sm = false) {
    return `<span class="star-pill${sm ? ' sm' : ''}">${icon('star', sm ? 11 : 13)}${count.toLocaleString()}</span>`;
  }
  function tierChip(index) {
    return `<span class="tier-chip"><span class="dot"></span>${TIERS[index].name}</span>`;
  }
  function gauge(pct, onDark = false) {
    return `<div class="gauge${onDark ? ' on-dark' : ''}"><div class="fill" style="width:${Math.max(0, Math.min(100, pct))}%"></div></div>`;
  }
  function sectionH(eyebrow, title, link) {
    return `<div class="section-h"><div>
      ${eyebrow ? `<div class="section-eyebrow">${eyebrow}</div>` : ''}
      <div class="section-title">${title}</div>
    </div>${link ? `<a class="section-link" data-nav="${link.to}">${link.label}</a>` : ''}</div>`;
  }

  function activityRow(a) {
    const ic = { order: 'box', bonus: 'sparkle', claim: 'gift', tier: 'trophy' }[a.type] || 'box';
    const stars = a.stars === 0 ? '' :
      `<div class="act-stars ${a.stars > 0 ? 'pos' : 'neg'}">${a.stars > 0 ? '+' : ''}${a.stars}★</div>`;
    return `<div class="act-row">
      <div class="act-ic">${icon(ic, 16)}</div>
      <div class="act-main"><div class="act-title">${a.title}</div><div class="act-meta">${a.meta} · ${a.when}</div></div>
      ${stars}
    </div>`;
  }

  function leaderRow(p) {
    return `<div class="lead-row${p.me ? ' me' : ''}">
      <div class="lead-rank${p.rank <= 3 ? ' top' : ''}">${p.rank}</div>
      ${avatar(initials(p.name), 30)}
      <div class="lead-main"><div class="lead-name">${p.name}${p.me ? '<span class="tag-you">YOU</span>' : ''}</div><div class="lead-region">${p.region}</div></div>
      ${starPill(p.stars, true)}
    </div>`;
  }

  function rewardCard(r, agentStars) {
    const ok = agentStars >= r.stars;
    return `<div class="card tap reward-card" data-reward="${r.id}">
      ${r.tag ? `<span class="reward-tag">${r.tag}</span>` : ''}
      <div class="reward-thumb">${rewardGlyph(r.category)}</div>
      <div class="reward-cat">${r.category}</div>
      <div class="reward-name">${r.title}</div>
      <div class="reward-sub">${r.sub}</div>
      <div class="reward-foot">${starPill(r.stars, true)}
        <span class="reward-avail ${ok ? 'ok' : 'no'}">${ok ? 'Available' : (r.stars - agentStars) + '★ away'}</span>
      </div>
    </div>`;
  }

  // Circular tier ring (SVG) for the hero
  function tierRing(index, current, target, size = 150) {
    const stroke = 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
    const pct = Math.min(1, current / target);
    return `<div class="hero-ring">
      <svg width="${size}" height="${size}" style="transform:rotate(-90deg)">
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="${stroke}"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--primary)" stroke-width="${stroke}"
          stroke-dasharray="${c*pct} ${c}" stroke-linecap="round" style="filter:drop-shadow(0 0 8px var(--primary))"/>
      </svg>
      <div class="badge-center">${tierBadge(index, Math.round(size * 0.56))}</div>
    </div>`;
  }

  return { icon, rewardGlyph, tierBadge, avatar, initials, starPill, tierChip, gauge,
           sectionH, activityRow, leaderRow, rewardCard, tierRing };
})();
