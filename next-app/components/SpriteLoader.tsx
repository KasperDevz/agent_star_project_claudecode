'use client';

import { useEffect } from 'react';

export default function SpriteLoader() {
  useEffect(() => {
    async function load(file: string) {
      try {
        const res = await fetch(`/assets/svg/${file}`);
        const text = await res.text();
        const wrap = document.createElement('div');
        wrap.style.display = 'none';
        wrap.innerHTML = text;
        document.body.appendChild(wrap);
      } catch {
        console.warn('Sprite load failed:', file);
      }
    }
    load('icons.svg');
    load('rewards.svg');
  }, []);
  return null;
}
