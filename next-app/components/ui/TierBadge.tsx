import Image from 'next/image';
import { TIERS } from '@/lib/data';

interface TierBadgeProps {
  index: number;
  size?: number;
  active?: boolean;
  tap?: boolean;
}

export default function TierBadge({ index, size = 72, active = true, tap = false }: TierBadgeProps) {
  const t = TIERS[index];
  const cls = ['tier-badge', `t-${t.key}`, !active ? 'inactive' : '', tap ? 'tap' : ''].filter(Boolean).join(' ');
  return (
    <Image
      className={cls}
      src={`/assets/svg/tiers/${t.key}.svg`}
      width={size}
      height={size}
      alt={`${t.name} tier badge`}
      unoptimized
    />
  );
}
