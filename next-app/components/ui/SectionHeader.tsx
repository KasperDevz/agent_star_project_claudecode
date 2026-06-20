'use client';

import { useApp } from '@/context/AppContext';
import { NavKey } from '@/lib/data';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  link?: { to: NavKey; label: string };
}

export default function SectionHeader({ eyebrow, title, link }: SectionHeaderProps) {
  const { dispatch } = useApp();
  return (
    <div className="section-h">
      <div>
        {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
        <div className="section-title">{title}</div>
      </div>
      {link && (
        <span className="section-link" onClick={() => dispatch({ type: 'NAV', screen: link.to })}>
          {link.label}
        </span>
      )}
    </div>
  );
}
