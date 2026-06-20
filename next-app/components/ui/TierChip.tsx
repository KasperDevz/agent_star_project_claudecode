import { TIERS } from '@/lib/data';

interface TierChipProps { index: number; }

export default function TierChip({ index }: TierChipProps) {
  return (
    <span className="tier-chip">
      <span className="dot" />
      {TIERS[index].name}
    </span>
  );
}
