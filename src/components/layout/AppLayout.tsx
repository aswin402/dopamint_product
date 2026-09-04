import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import { DashboardPage } from '../dashboard/DashboardPage';
import { ChatContainer } from '../chat/ChatContainer';
import { LeaderboardPage } from '../leaderboard/LeaderboardPage';
import { ReferEarnPage } from '../refer/ReferEarnPage';
import { PointsXpPage } from '../points/PointsXpPage';
import { BuyCreditsPage } from '../credits/BuyCreditsPage';
import { InsightsPanel } from '../insights/InsightsPanel';
import { CommandPalette } from '../modals/CommandPalette';
import { PortfolioModal } from '../modals/PortfolioModal';
import { WatchlistModal } from '../modals/WatchlistModal';
import { AlertsModal } from '../modals/AlertsModal';
import { ShareModal } from '../modals/ShareModal';
import { SettingsModal } from '../modals/SettingsModal';
import { UpgradeProModal } from '../modals/UpgradeProModal';
import { AuthWalletModal } from '../modals/AuthWalletModal';
import { LeaderboardModal } from '../modals/LeaderboardModal';
import { ActiveAgentsModal } from '../modals/ActiveAgentsModal';
import { RenameModal } from '../modals/RenameModal';
import { DeleteModal } from '../modals/DeleteModal';
import { FolderModal } from '../modals/FolderModal';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useCryptoStore } from '../../store/useCryptoStore';

export const AppLayout: React.FC = () => {
  // Activate global shortcut listener (⌘K, ⌘N, ⌘B, ⌘I, Esc)
  useKeyboardShortcuts();
  const theme = useCryptoStore((s) => s.theme);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Route-based active page determination
  const pathname = location.pathname;
  const isLeaderboard = pathname === '/leaderboard';
  const isRefer = pathname === '/refer';
  const isPoints = pathname === '/points' || pathname === '/xp';
  const isBuyCredits =
    pathname === '/buy-credits' ||
    pathname === '/credits' ||
    pathname === '/pro' ||
    pathname === '/pricing';

  useEffect(() => {
    if (pathname === '/settings') {
      setModalState('isSettingsModalOpen', true);
    } else if (pathname === '/agents' || pathname === '/active-agents') {
      setModalState('isActiveAgentsModalOpen', true);
    } else if (pathname === '/favourites' || pathname === '/watchlist') {
      setModalState('isWatchlistModalOpen', true);
    }
  }, [pathname, setModalState]);

  return (
    <div className="flex h-screen w-screen max-w-[100vw] bg-[var(--bg-app)] text-[var(--text-primary)] overflow-x-hidden overflow-y-hidden antialiased font-sans transition-colors duration-200">
      {/* 1. Left Sidebar (Dual panel) */}
      <Sidebar />

      {/* 2. Center Canvas based on URL (Dashboard, Chat, Leaderboard, Refer, Points, Buy Credits) */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[var(--bg-app)] relative overflow-x-hidden overflow-y-hidden transition-colors duration-200">
        {isLeaderboard ? (
          <LeaderboardPage />
        ) : isRefer ? (
          <ReferEarnPage />
        ) : isPoints ? (
          <PointsXpPage />
        ) : isBuyCredits ? (
          <BuyCreditsPage />
        ) : pathname.startsWith('/c/') ? (
          <ChatContainer />
        ) : (
          <DashboardPage />
        )}
      </main>

      {/* 3. Right Insights Panel (340px) */}
      <InsightsPanel />

      {/* 4. Global Modals & Dialogs */}
      <CommandPalette />
      <PortfolioModal />
      <WatchlistModal />
      <AlertsModal />
      <ShareModal />
      <SettingsModal />
      <UpgradeProModal />
      <AuthWalletModal />
      <LeaderboardModal />
      <ActiveAgentsModal />
      <RenameModal />
      <DeleteModal />
      <FolderModal />
    </div>
  );
};
