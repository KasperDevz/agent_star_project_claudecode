'use client';

import { useApp } from '@/context/AppContext';
import Avatar from '../ui/Avatar';
import TierChip from '../ui/TierChip';
import TierBadge from '../ui/TierBadge';
import Icon from '../ui/Icon';
import SectionHeader from '../ui/SectionHeader';

const ROWS = [
  { l: 'Contact information', s: 'Email, phone, office address', i: 'user' },
  { l: 'Notification preferences', s: 'Email & in-app alerts', i: 'bell' },
  { l: 'Language & region', s: 'English · Thailand', i: 'shield' },
  { l: 'Security', s: 'Password, 2FA', i: 'settings' },
];

export default function ProfileScreen() {
  const { state, dispatch } = useApp();
  const { agent } = state;

  return (
    <div className="screen">
      <div className="card pad" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <Avatar initials={agent.avatar} size={72} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>{agent.name}</h1>
            <div className="reward-sub" style={{ margin: '2px 0 0' }}>Agent {agent.id} · {agent.region}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <TierChip index={agent.currentTierIndex} />
            </div>
          </div>
          <TierBadge index={agent.currentTierIndex} size={72} />
        </div>
      </div>
      <SectionHeader eyebrow="Settings" title="Preferences" />
      <div className="card" style={{ marginBottom: 20 }}>
        {ROWS.map(r => (
          <div key={r.l} className="set-row">
            <div className="set-ic"><Icon name={r.i} size={16} /></div>
            <div className="set-main">
              <div className="set-title">{r.l}</div>
              <div className="set-sub">{r.s}</div>
            </div>
            <Icon name="chevronR" size={16} />
          </div>
        ))}
      </div>
      <button className="btn btn-ghost block" onClick={() => dispatch({ type: 'LOGOUT' })}>
        <Icon name="logout" size={16} /> Sign out
      </button>
    </div>
  );
}
