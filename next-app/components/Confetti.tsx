'use client';

import { useEffect, useRef } from 'react';

export function triggerConfetti() {
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  const colors = ['var(--primary)', 'var(--primary-deep)', '#fff'];
  for (let i = 0; i < 60; i++) {
    const b = document.createElement('div');
    b.className = 'confetti-bit';
    const dx = (Math.random() - 0.5) * 300, dy = -200 - Math.random() * 200;
    const rot = (Math.random() - 0.5) * 720, shape = i % 3;
    b.style.cssText = `left:${50 + (Math.random() - 0.5) * 20}%;` +
      `width:${shape === 0 ? 8 : shape === 1 ? 10 : 6}px;height:${shape === 0 ? 8 : shape === 1 ? 4 : 12}px;` +
      `background:${colors[i % 3]};border-radius:${shape === 0 ? '50%' : '2px'};` +
      `--dx:${dx}px;--dy:${dy}px;--rot:${rot}deg;` +
      `animation:confettiBurst 1400ms ${Math.random() * 100}ms cubic-bezier(.2,.6,.4,1) forwards`;
    layer.appendChild(b);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1700);
}

export default function ConfettiTrigger({ fire }: { fire: boolean }) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (fire && !firedRef.current) {
      firedRef.current = true;
      triggerConfetti();
    }
    if (!fire) firedRef.current = false;
  }, [fire]);
  return null;
}
