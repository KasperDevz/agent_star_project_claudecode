'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Agent, Reward, INITIAL_AGENT, REWARDS, NavKey } from '@/lib/data';

interface AppState {
  authed: boolean;
  screen: NavKey;
  cat: string;
  agent: Agent;
  theme: 'light' | 'dark';
  modal: Reward | null;
}

type Action =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'NAV'; screen: NavKey }
  | { type: 'SET_CAT'; cat: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'OPEN_MODAL'; reward: Reward }
  | { type: 'CLOSE_MODAL' }
  | { type: 'CLAIM'; rewardId: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, authed: true, screen: 'dashboard' };
    case 'LOGOUT':
      return { ...state, authed: false };
    case 'NAV':
      return { ...state, screen: action.screen, cat: 'All' };
    case 'SET_CAT':
      return { ...state, cat: action.cat };
    case 'TOGGLE_THEME': {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('asr-theme', next);
      return { ...state, theme: next };
    }
    case 'OPEN_MODAL':
      return { ...state, modal: action.reward };
    case 'CLOSE_MODAL':
      return { ...state, modal: null };
    case 'CLAIM': {
      const r = REWARDS.find(x => x.id === action.rewardId);
      if (!r) return state;
      return { ...state, agent: { ...state.agent, stars: state.agent.stars - r.stars }, modal: null };
    }
    default:
      return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    authed: false,
    screen: 'dashboard',
    cat: 'All',
    agent: { ...INITIAL_AGENT },
    theme: 'light',
    modal: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem('asr-theme') as 'light' | 'dark' | null;
    if (saved && saved !== state.theme) {
      dispatch({ type: 'TOGGLE_THEME' });
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
