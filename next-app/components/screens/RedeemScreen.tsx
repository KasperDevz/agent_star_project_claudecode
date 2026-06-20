'use client';

import { useApp } from '@/context/AppContext';
import { REWARDS } from '@/lib/data';
import Icon from '../ui/Icon';
import RewardCard from '../ui/RewardCard';

const CATS = ['All', 'Vouchers', 'Gadgets', 'Travel', 'Learning', 'Gear', 'Experiences'];

export default function RedeemScreen() {
  const { state, dispatch } = useApp();
  const { agent, cat } = state;
  const list = cat === 'All' ? REWARDS : REWARDS.filter(r => r.category === cat);

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <div className="screen-eyebrow">Redemption Center</div>
          <h1 className="screen-title">Claim your rewards</h1>
        </div>
        <div className="balance-pill">
          <Icon name="star" size={22} />
          <div>
            <div className="balance-lbl">Available balance</div>
            <div className="balance-val">{agent.stars.toLocaleString()} stars</div>
          </div>
        </div>
      </div>
      <div className="toolbar">
        <div className="searchbox">
          <Icon name="search" size={16} />
          <input placeholder="Search rewards..." disabled />
        </div>
        <button className="icon-btn"><Icon name="filter" size={18} /></button>
      </div>
      <div className="chips">
        {CATS.map(c => (
          <button
            key={c}
            className={`chip${c === cat ? ' active' : ''}`}
            onClick={() => dispatch({ type: 'SET_CAT', cat: c })}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="reward-grid">
        {list.map(r => <RewardCard key={r.id} r={r} agentStars={agent.stars} />)}
      </div>
    </div>
  );
}
