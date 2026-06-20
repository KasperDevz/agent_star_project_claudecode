'use client';

interface IconProps { name: string; size?: number; }

export default function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg className="icon" width={size} height={size} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
