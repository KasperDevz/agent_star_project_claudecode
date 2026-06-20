'use client';

import { useApp } from '@/context/AppContext';
import Icon from '../ui/Icon';

export default function LoginScreen() {
  const { dispatch } = useApp();
  return (
    <div className="login">
      <div className="login-glow" />
      <div className="login-box">
        <div className="brand" style={{ marginBottom: 48, padding: 0 }}>
          <div className="brand-mark"><Icon name="star" size={18} /></div>
          <div><div className="brand-name">AGENT STAR</div><div className="brand-sub">Rewards Program</div></div>
        </div>
        <div className="screen-eyebrow">Welcome back</div>
        <h1 className="screen-title" style={{ fontSize: 40, marginBottom: 8 }}>Claim your<br />next milestone.</h1>
        <p className="screen-lead" style={{ marginBottom: 28 }}>
          Sign in with your agent ID to track stars, tier progress, and claim rewards.
        </p>
        <div className="field">
          <label><div className="flbl">Agent ID</div><input defaultValue="SR-2847" /></label>
        </div>
        <div className="field">
          <label><div className="flbl">Password</div><input type="password" defaultValue="********" /></label>
        </div>
        <button className="btn btn-primary lg block" style={{ marginTop: 12 }} onClick={() => dispatch({ type: 'LOGIN' })}>
          Sign in to rewards
        </button>
      </div>
    </div>
  );
}
