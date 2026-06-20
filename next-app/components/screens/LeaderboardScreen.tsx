import { LEADERBOARD } from '@/lib/data';
import Avatar, { getInitials } from '../ui/Avatar';
import LeaderRow from '../ui/LeaderRow';
import SectionHeader from '../ui/SectionHeader';

export default function LeaderboardScreen() {
  const t = LEADERBOARD;
  const order = [t[1], t[0], t[2]];
  const heights = [110, 140, 90];
  const bg = ['var(--ink-soft)', 'var(--primary)', 'var(--ink-faint)'];

  return (
    <div className="screen">
      <div className="screen-eyebrow">Competition</div>
      <h1 className="screen-title" style={{ marginBottom: 20 }}>Leaderboard</h1>
      <div className="podium">
        {order.map((p, idx) => {
          const pos = idx === 1 ? 1 : idx === 0 ? 2 : 3;
          return (
            <div key={p.rank} className="podium-col">
              <Avatar initials={getInitials(p.name)} size={pos === 1 ? 56 : 44} />
              <div className="podium-name">{p.name.split(' ')[0]}</div>
              <div className="podium-stars">{p.stars.toLocaleString()}★</div>
              <div className="podium-bar" style={{ height: heights[idx], background: bg[idx] }}>{pos}</div>
            </div>
          );
        })}
      </div>
      <SectionHeader eyebrow="All agents" title="Ranking · Q2 2027" />
      <div className="card">
        {LEADERBOARD.map(p => <LeaderRow key={p.rank} p={p} />)}
      </div>
    </div>
  );
}
