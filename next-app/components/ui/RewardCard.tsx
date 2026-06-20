'use client';

import { Reward } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import RewardGlyph from './RewardGlyph';
import StarPill from './StarPill';

export default function RewardCard({ r, agentStars }: { r: Reward; agentStars: number }) {
  const { dispatch } = useApp();
  const ok = agentStars >= r.stars;
  return (
    <div className="card tap reward-card" onClick={() => dispatch({ type: 'OPEN_MODAL', reward: r })}>
      {r.tag && <span className="reward-tag">{r.tag}</span>}
      <div className="reward-thumb"><RewardGlyph category={r.category} /></div>
      <div className="reward-cat">{r.category}</div>
      <div className="reward-name">{r.title}</div>
      <div className="reward-sub">{r.sub}</div>
      <div className="reward-foot">
        <StarPill count={r.stars} sm />
        <span className={`reward-avail ${ok ? 'ok' : 'no'}`}>
          {ok ? 'Available' : `${r.stars - agentStars}★ away`}
        </span>
      </div>
    </div>
  );
}
