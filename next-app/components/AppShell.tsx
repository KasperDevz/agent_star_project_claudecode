'use client';

import { useApp } from '@/context/AppContext';
import { NAV, NavKey } from '@/lib/data';
import Icon from './ui/Icon';
import Avatar from './ui/Avatar';
import TierChip from './ui/TierChip';
import StarPill from './ui/StarPill';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useApp();
  const a = state.agent;

  function nav(screen: NavKey) {
    dispatch({ type: 'NAV', screen });
    window.scrollTo(0, 0);
  }

  return (
    <div className="app-shell">
      {/* Sidebar (desktop) */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Icon name="star" size={16} /></div>
          <div><div className="brand-name">AGENT STAR</div><div className="brand-sub">Rewards</div></div>
        </div>
        <div className="side-user">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Avatar initials={a.avatar} size={34} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="lead-name">{a.name.split(' ')[0]} {a.name.split(' ')[1][0]}.</div>
              <div className="lead-region">{a.id}</div>
            </div>
          </div>
          <TierChip index={a.currentTierIndex} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 10 }}>
            <Icon name="star" size={14} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3, fontVariantNumeric: 'tabular-nums' }}>
              {a.stars.toLocaleString()}
            </span>
            <span className="lead-region">stars</span>
          </div>
        </div>
        <nav className="nav-list">
          <div className="nav-eyebrow">Menu</div>
          {NAV.map(n => (
            <button
              key={n.key}
              className={`nav-item${state.screen === n.key ? ' active' : ''}`}
              onClick={() => nav(n.key)}
            >
              <Icon name={n.icon} size={18} /> {n.label}
            </button>
          ))}
        </nav>
        <button className="nav-item" onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
          <Icon name="settings" size={18} />
          {state.theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </aside>

      {/* Main column */}
      <div className="main">
        {/* Topbar (mobile) */}
        <header className="topbar">
          <div className="brand" style={{ padding: 0 }}>
            <div className="brand-mark" style={{ width: 30, height: 30 }}><Icon name="star" size={14} /></div>
            <div><div className="brand-name" style={{ fontSize: 12 }}>AGENT STAR</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StarPill count={a.stars} sm />
            <button className="theme-toggle" onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
              <Icon name="settings" size={18} />
            </button>
          </div>
        </header>

        <main className="view">{children}</main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="bottom-nav">
        {NAV.filter(n => n.key !== 'leaderboard').map(n => (
          <button
            key={n.key}
            className={`bn-item${state.screen === n.key ? ' active' : ''}`}
            onClick={() => nav(n.key)}
          >
            <Icon name={n.icon} size={22} />
            <span>{n.short}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
