'use client';

interface RewardGlyphProps { category: string; size?: number; }

export default function RewardGlyph({ category, size = 60 }: RewardGlyphProps) {
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href={`#r-${category}`} />
    </svg>
  );
}
