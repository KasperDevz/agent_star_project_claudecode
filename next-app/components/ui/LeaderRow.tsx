import { LeaderboardEntry } from '@/lib/data';
import Avatar, { getInitials } from './Avatar';
import StarPill from './StarPill';

export default function LeaderRow({ p }: { p: LeaderboardEntry }) {
  return (
    <div className={`lead-row${p.me ? ' me' : ''}`}>
      <div className={`lead-rank${p.rank <= 3 ? ' top' : ''}`}>{p.rank}</div>
      <Avatar initials={getInitials(p.name)} size={30} />
      <div className="lead-main">
        <div className="lead-name">
          {p.name}{p.me && <span className="tag-you">YOU</span>}
        </div>
        <div className="lead-region">{p.region}</div>
      </div>
      <StarPill count={p.stars} sm />
    </div>
  );
}
