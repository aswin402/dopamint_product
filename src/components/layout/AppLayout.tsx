import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { ChatContainer } from '../chat/ChatContainer';
import { InsightsPanel } from '../insights/InsightsPanel';
import { CommandPalette } from '../modals/CommandPalette';
import { PortfolioModal } from '../modals/PortfolioModal';
import { WatchlistModal } from '../modals/WatchlistModal';
import { AlertsModal } from '../modals/AlertsModal';
import { ShareModal } from '../modals/ShareModal';
import { SettingsModal } from '../modals/SettingsModal';
import { UpgradeProModal } from '../modals/UpgradeProModal';
import { RenameModal } from '../modals/RenameModal';
import { DeleteModal } from '../modals/DeleteModal';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export const AppLayout: React.FC = () => {
  // Activate global shortcut listener (⌘K, ⌘N, ⌘B, ⌘I, Esc)
  useKeyboardShortcuts();

  return (
    <div className="flex h-screen w-screen bg-[#F7F8FA] text-[#111111] overflow-hidden antialiased font-sans">
      {/* 1. Left Sidebar (280px) */}
      <Sidebar />

      {/* 2. Center Chat Canvas (Flex 1, Max 820px inner) */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#FFFFFF] relative overflow-hidden">
        <ChatContainer />
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
      <RenameModal />
      <DeleteModal />
    </div>
  );
};
