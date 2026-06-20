import { ActivityItem } from '@/lib/data';
import Icon from './Icon';

const TYPE_ICON: Record<string, string> = {
  order: 'box', bonus: 'sparkle', claim: 'gift', tier: 'trophy',
};

export default function ActivityRow({ a }: { a: ActivityItem }) {
  const ic = TYPE_ICON[a.type] || 'box';
  return (
    <div className="act-row">
      <div className="act-ic"><Icon name={ic} size={16} /></div>
      <div className="act-main">
        <div className="act-title">{a.title}</div>
        <div className="act-meta">{a.meta} · {a.when}</div>
      </div>
      {a.stars !== 0 && (
        <div className={`act-stars ${a.stars > 0 ? 'pos' : 'neg'}`}>
          {a.stars > 0 ? '+' : ''}{a.stars}★
        </div>
      )}
    </div>
  );
}
