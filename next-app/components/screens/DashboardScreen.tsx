'use client';

import { useApp } from '@/context/AppContext';
import { TIERS, REWARDS, ACTIVITY, LEADERBOARD } from '@/lib/data';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';
import TierBadge from '../ui/TierBadge';
import Gauge from '../ui/Gauge';
import SectionHeader from '../ui/SectionHeader';
import ActivityRow from '../ui/ActivityRow';
import LeaderRow from '../ui/LeaderRow';
import RewardCard from '../ui/RewardCard';

function TierRing({ index, current, target, size = 150 }: { index: number; current: number; target: number; size?: number }) {
  const stroke = 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const pct = Math.min(1, current / target);
  return (
    <div className="hero-ring">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--primary)" strokeWidth={stroke}
          strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px var(--primary))' }} />
      </svg>
      <div className="badge-center">
        <TierBadge index={index} size={Math.round(size * 0.56)} />
      </div>
    </div>
  );
}

function MiniRoad({ cur }: { cur: number }) {
  const fillPct = (cur / (TIERS.length - 1)) * 80;
  return (
    <div className="mini-road">
      <div className="mini-track" />
      <div className="mini-fill" style={{ width: `${fillPct}%` }} />
      <div className="mini-nodes">
        {TIERS.map((t, i) => (
          <div key={t.key} className="mini-node">
            <TierBadge index={i} size={64} active={i <= cur} />
            <div className={`nm${i <= cur ? '' : ' locked'}`}>{t.name}</div>
            <div className="rq">{t.stars.toLocaleString()}★</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardScreen() {
  const { state, dispatch } = useApp();
  const { agent } = state;
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

  return (
    <div className="screen">
      <div className="dash-greet">
        <div className="who">
          <Avatar initials={agent.avatar} size={44} />
          <div>
            <div className="greet-label">Good morning,</div>
            <div className="greet-name">{agent.name.split(' ')[0]}</div>
          </div>
        </div>
        <button className="theme-toggle" onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
          <Icon name="settings" size={18} />
        </button>
      </div>

      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <TierRing index={agent.currentTierIndex} current={agent.stars - cur.stars} target={span} />
            <div>
              <div className="hero-tier-label">Current tier</div>
              <div className="hero-tier-name">{cur.name}</div>
              <div className="hero-tier-sub">{cur.sub} rank</div>
              <div className="hero-rank"><span className="dot" />#{agent.rank} of {agent.totalAgents}</div>
            </div>
          </div>
          <div className="hero-stars">
            <div className="hero-star-row">
              <Icon name="star" size={26} />
              <span className="hero-star-num">{agent.stars}</span>
              <span className="hero-star-unit">stars</span>
            </div>
            <div className="hero-trend">
              <b>+{agent.monthGain}</b> this month · {agent.lifetimeStars.toLocaleString()} lifetime
            </div>
            <div className="hero-next">
              <span>Next: <b style={{ color: '#fff' }}>{next.name}</b></span>
              <span><b>{toNext}</b> / {span}</span>
            </div>
            <Gauge pct={pct} onDark />
          </div>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.lbl} className="card stat">
            <div className="lbl">{s.lbl}</div>
            <div className="val">{s.val}</div>
            <div className="sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-cols">
        <div>
          <SectionHeader eyebrow="Your journey" title="Tier progress" link={{ to: 'roadmap', label: 'View roadmap →' }} />
          <div className="card pad" style={{ marginBottom: 20 }}>
            <MiniRoad cur={agent.currentTierIndex} />
          </div>
          <SectionHeader eyebrow="Claim now" title="Featured rewards" link={{ to: 'redeem', label: 'All rewards →' }} />
          <div className="featured-grid">
            {REWARDS.slice(0, 3).map(r => <RewardCard key={r.id} r={r} agentStars={agent.stars} />)}
          </div>
        </div>
        <div className="dash-side">
          <SectionHeader eyebrow="Recent" title="Activity" link={{ to: 'history', label: 'All →' }} />
          <div className="card">
            {ACTIVITY.slice(0, 5).map(a => <ActivityRow key={a.id} a={a} />)}
          </div>
          <div style={{ marginTop: 20 }}>
            <SectionHeader eyebrow="Top 5" title="Leaderboard" link={{ to: 'leaderboard', label: 'See all →' }} />
            <div className="card">
              {LEADERBOARD.slice(0, 5).map(p => <LeaderRow key={p.rank} p={p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
