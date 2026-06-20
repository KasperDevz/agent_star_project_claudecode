import { ACTIVITY } from '@/lib/data';
import ActivityRow from '../ui/ActivityRow';

export default function HistoryScreen() {
  return (
    <div className="screen">
      <div className="screen-eyebrow">Activity</div>
      <h1 className="screen-title" style={{ marginBottom: 20 }}>Star history</h1>
      <div className="card">
        {ACTIVITY.map(a => <ActivityRow key={a.id} a={a} />)}
      </div>
    </div>
  );
}
