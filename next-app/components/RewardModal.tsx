'use client';

import { useApp } from '@/context/AppContext';
import Icon from './ui/Icon';
import RewardGlyph from './ui/RewardGlyph';

export default function RewardModal() {
  const { state, dispatch } = useApp();
  const r = state.modal;
  if (!r) return null;

  const ok = state.agent.stars >= r.stars;
  const after = state.agent.stars - r.stars;

  return (
    <div className="modal-overlay" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-hero">
          <div style={{ transform: 'scale(2.8)', color: 'var(--ink-soft)' }}>
            <RewardGlyph category={r.category} />
          </div>
          <button className="modal-close" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            <Icon name="close" size={16} />
          </button>
        </div>
        <div style={{ padding: 24 }}>
          <div className="reward-cat">{r.category}</div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>{r.title}</h2>
          <div className="reward-sub" style={{ margin: '4px 0 18px' }}>{r.sub}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, background: 'var(--surface-soft)', border: '1px solid var(--border-soft)', marginBottom: 16 }}>
            <div>
              <div className="balance-lbl">Cost</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <Icon name="star" size={18} />
                <span style={{ fontSize: 22, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{r.stars.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="balance-lbl">Balance after</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, fontVariantNumeric: 'tabular-nums', color: ok ? 'var(--success)' : 'var(--primary)' }}>
                {ok ? `${after.toLocaleString()} stars` : `Need ${(-after).toLocaleString()} more`}
              </div>
            </div>
          </div>
          <div className="reward-sub" style={{ lineHeight: 1.55, marginBottom: 20 }}>
            Processed within 5–7 business days. Digital rewards via email; physical items ship to your office.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost lg" style={{ flex: 1 }} onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              Cancel
            </button>
            <button
              className={`btn ${ok ? 'btn-primary' : 'btn-soft'} lg`}
              style={{ flex: 2 }}
              disabled={!ok}
              onClick={() => ok && dispatch({ type: 'CLAIM', rewardId: r.id })}
            >
              {ok ? 'Confirm claim' : 'Earn more stars'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
