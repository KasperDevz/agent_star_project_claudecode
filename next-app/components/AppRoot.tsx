'use client';

import { useApp } from '@/context/AppContext';
import { useEffect, useRef } from 'react';
import AppShell from './AppShell';
import RewardModal from './RewardModal';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import RoadmapScreen from './screens/RoadmapScreen';
import RedeemScreen from './screens/RedeemScreen';
import HistoryScreen from './screens/HistoryScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import { triggerConfetti } from './Confetti';

function ScreenContent() {
  const { state } = useApp();
  switch (state.screen) {
    case 'dashboard':   return <DashboardScreen />;
    case 'roadmap':     return <RoadmapScreen />;
    case 'redeem':      return <RedeemScreen />;
    case 'history':     return <HistoryScreen />;
    case 'leaderboard': return <LeaderboardScreen />;
    case 'profile':     return <ProfileScreen />;
    default:            return <DashboardScreen />;
  }
}

export default function AppRoot() {
  const { state } = useApp();
  const prevModalRef = useRef(state.modal);

  useEffect(() => {
    if (prevModalRef.current !== null && state.modal === null) {
      // modal just closed — check if a claim happened (stars changed)
      // fire confetti on claim by tracking the transition
    }
    prevModalRef.current = state.modal;
  }, [state.modal]);

  // Confetti: fire when modal closes after a claim (stars decremented)
  const prevStarsRef = useRef(state.agent.stars);
  useEffect(() => {
    if (state.agent.stars < prevStarsRef.current) {
      triggerConfetti();
    }
    prevStarsRef.current = state.agent.stars;
  }, [state.agent.stars]);

  if (!state.authed) return <LoginScreen />;

  return (
    <AppShell>
      <ScreenContent />
      <RewardModal />
    </AppShell>
  );
}
