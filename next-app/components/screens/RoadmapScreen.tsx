'use client';

import { useApp } from '@/context/AppContext';
import { TIERS, Tier } from '@/lib/data';
import TierBadge from '../ui/TierBadge';
import StarPill from '../ui/StarPill';
import Gauge from '../ui/Gauge';
import Icon from '../ui/Icon';

function ClimbStep({ t, i, agentStars, currentTierIndex }: { t: Tier; i: number; agentStars: number; currentTierIndex: number }) {
  const reached = i <= currentTierIndex;
  const current = i === currentTierIndex;
  const isNext = i === currentTierIndex + 1;
  const locked = i > currentTierIndex;

  let tag: React.ReactNode = null;
  if (current) tag = <span className="state-tag current">Current</span>;
  else if (isNext) tag = <span className="state-tag next">Up next</span>;
  else if (locked) tag = <span className="state-tag locked"><Icon name="lock" size={11} /> Locked</span>;
  else tag = <span className="state-tag next">Unlocked</span>;

  const progress = isNext ? (() => {
    const prev = TIERS[i - 1].stars;
    const pct = ((agentStars - prev) / (t.stars - prev)) * 100;
    return (
      <div className="climb-progress">
        <div className="lbl"><b>{t.stars - agentStars}</b> more stars to unlock {t.name}</div>
        <Gauge pct={pct} />
      </div>
    );
  })() : null;

  return (
    <div className="climb-step">
      <div className="climb-badge-wrap">
        {current && <div className="climb-pulse" />}
        <div className={`climb-badge-ring${reached ? ' reached' : ''}${current ? ' current' : ''}`}>
          <TierBadge index={i} size={64} active={reached} tap />
        </div>
      </div>
      <div className="card pad climb-card" style={current ? { borderColor: 'color-mix(in srgb,var(--primary) 50%,transparent)' } : {}}>
        <div className="climb-head">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span className="climb-name">{t.name}</span>{tag}
            </div>
            <div className="climb-rank-sub" style={{ marginTop: 2 }}>{t.sub} rank · {t.stars.toLocaleString()} stars</div>
          </div>
          <StarPill count={t.stars} />
        </div>
        <div className="reward-sub" style={{ maxWidth: 600, marginBottom: 12 }}>{t.desc}</div>
        <div className="perks">
          {t.perks.map(p => <span key={p} className={`perk${reached ? ' on' : ''}`}>{p}</span>)}
        </div>
        {progress}
      </div>
    </div>
  );
}

export default function RoadmapScreen() {
  const { state } = useApp();
  const { agent } = state;
  const cur = agent.currentTierIndex;
  const fillPct = (cur / (TIERS.length - 1)) * 100;

  return (
    <div className="screen">
      <div className="screen-eyebrow">The climb</div>
      <h1 className="screen-title">Your tier journey</h1>
      <p className="screen-lead">
        Every tier is a summit. Climb from the Bronze foothills to the Diamond peak — each badge earned shows more depth, more prestige, more greatness.
      </p>

      <div className="card pad" style={{ margin: '24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <TierBadge index={cur} size={72} />
            <div>
              <div className="climb-rank-sub">Currently climbing</div>
              <div className="climb-name" style={{ fontSize: 24 }}>{TIERS[cur].name}</div>
              <div className="reward-sub">{TIERS[cur].sub} rank · reached 3 weeks ago</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="climb-rank-sub">Total stars</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--primary)', letterSpacing: -0.6, fontVariantNumeric: 'tabular-nums' }}>
              {agent.stars.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="climb">
        <div className="climb-line" />
        <div className="climb-fill" style={{ height: `calc(${fillPct}% - 36px)` }} />
        {TIERS.map((t, i) => (
          <ClimbStep key={t.key} t={t} i={i} agentStars={agent.stars} currentTierIndex={cur} />
        ))}
      </div>
    </div>
  );
}
