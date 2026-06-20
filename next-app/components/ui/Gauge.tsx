interface GaugeProps { pct: number; onDark?: boolean; }

export default function Gauge({ pct, onDark = false }: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={`gauge${onDark ? ' on-dark' : ''}`}>
      <div className="fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
