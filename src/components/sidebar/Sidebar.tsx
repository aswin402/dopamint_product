import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Trophy,
  Bell,
  Settings,
  Sparkles,
  Command,
  X,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import logoDope from '../../assets/logo_dope.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import { HistoryGroup } from './HistoryGroup';
import { UserProfileCard } from './UserProfileCard';

export const Sidebar: React.FC = () => {
  const searchQuery = useCryptoStore((s) => s.searchQuery);
  const setSearchQuery = useCryptoStore((s) => s.setSearchQuery);

  const isSidebarOpen = useCryptoStore((s) => s.isSidebarOpen);
  const toggleSidebar = useCryptoStore((s) => s.toggleSidebar);
  const conversations = useCryptoStore((s) => s.conversations);
  const activeConversationId = useCryptoStore((s) => s.activeConversationId);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const alerts = useCryptoStore((s) => s.alerts);

  // Filter conversations
  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedList = filtered.filter((c) => c.isPinned);
  const todayList = filtered.filter((c) => !c.isPinned && c.group === 'today');
  const yesterdayList = filtered.filter((c) => !c.isPinned && c.group === 'yesterday');
  const last7DaysList = filtered.filter((c) => !c.isPinned && c.group === 'last7days');
  const olderList = filtered.filter((c) => !c.isPinned && c.group === 'older');

  return (
    <aside
      className={`fixed lg:relative z-40 inset-y-0 left-0 w-[280px] h-screen bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col justify-between p-4 transition-all duration-250 ease-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${!isSidebarOpen ? 'lg:hidden' : ''}`}
    >
      {/* Top Header & New Chat */}
      <div className="space-y-3.5">
        {/* Brand Header with Crown Logo */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Crown Logo without enclosing card */}
            <img
              src={crownLogo}
              alt="crown"
              className="w-8 h-8 object-contain filter drop-shadow-xs flex-shrink-0"
            />

            {/* logo_dope.png (black in light theme, white in dark theme) */}
            <div className="flex items-center min-w-0">
              <img
                src={logoDope}
                alt="dopamint"
                className="h-5 w-auto max-w-[140px] object-contain brightness-0 dark:brightness-100 transition-all"
              />
            </div>
          </div>

          {/* Close drawer on mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Primary Button */}
        <motion.button
          whileHover={{ scale: 1.015, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createNewChat()}
          className="w-full h-11 bg-[var(--primary)] hover:opacity-95 text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-button-primary transition-all duration-180 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Chat</span>
        </motion.button>

        {/* Search Chats Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-12 text-[13px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] focus:bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl border border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
          />
          <button
            onClick={() => setModalState('isCommandPaletteOpen', true)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-[var(--bg-card)] border border-[var(--border-color)] text-[10.5px] font-medium text-[var(--text-muted)] rounded-md shadow-2xs cursor-pointer"
          >
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </button>
        </div>
      </div>

      {/* Middle Scrollable Conversation History */}
      <div className="flex-1 overflow-y-auto my-3 pr-1 -mr-1 scroll-smooth">
        {pinnedList.length > 0 && (
          <HistoryGroup
            title="Pinned"
            conversations={pinnedList}
            activeConversationId={activeConversationId}
          />
        )}

        <HistoryGroup
          title="Today"
          conversations={todayList}
          activeConversationId={activeConversationId}
        />

        <HistoryGroup
          title="Yesterday"
          conversations={yesterdayList}
          activeConversationId={activeConversationId}
        />

        <HistoryGroup
          title="Last 7 days"
          conversations={last7DaysList}
          activeConversationId={activeConversationId}
        />

        {olderList.length > 0 && (
          <HistoryGroup
            title="Older"
            conversations={olderList}
            activeConversationId={activeConversationId}
          />
        )}

        {filtered.length === 0 && (
          <div className="text-center py-8 px-2">
            <p className="text-xs text-[var(--text-muted)]">No conversations found</p>
          </div>
        )}
      </div>

      {/* Bottom Utility Navigation & User Profile */}
      <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
        <button
          onClick={() => setModalState('isLeaderboardModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Leaderboard</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-md border border-amber-500/20 uppercase">
            XP
          </span>
        </button>

        <button
          onClick={() => setModalState('isAlertsModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-[var(--text-muted)]" />
            <span>Alerts</span>
          </div>
          <span className="text-[11px] px-1.5 py-0.2 bg-[var(--primary-light)] text-[var(--primary)] font-semibold rounded-md">
            {alerts.filter((a) => a.isActive).length} Active
          </span>
        </button>

        <button
          onClick={() => setModalState('isSettingsModalOpen', true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 text-[var(--text-muted)]" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => setModalState('isUpgradeProModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-semibold text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span>Upgrade to Pro</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 bg-[var(--primary)] text-white font-bold rounded-md">
            PRO
          </span>
        </button>

        {/* User Profile Card Footer */}
        <UserProfileCard />
      </div>
    </aside>
  );
};
