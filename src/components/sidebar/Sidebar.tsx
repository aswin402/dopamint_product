import React from 'react';
import {
  Plus,
  Search,
  Trophy,
  Star,
  Bot,
  Settings,
  Coins,
  Command,
  PanelLeft,
  MessageSquare,
  Wallet,
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
  const agents = useCryptoStore((s) => s.agents);
  const userProfile = useCryptoStore((s) => s.userProfile);

  // Filter conversations
  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedList = filtered.filter((c) => c.isPinned);
  const todayList = filtered.filter((c) => !c.isPinned && c.group === 'today');
  const yesterdayList = filtered.filter((c) => !c.isPinned && c.group === 'yesterday');
  const last7DaysList = filtered.filter((c) => !c.isPinned && c.group === 'last7days');
  const olderList = filtered.filter((c) => !c.isPinned && c.group === 'older');

  const activeAgentsCount = agents.filter((a) => a.status === 'running' || a.status === 'active').length;
  const favouriteCount = conversations.filter((c) => c.isFavourite).length;

  /* ───────────────────────────────────────────────
   * COLLAPSED ICON RAIL (shown when sidebar is closed on desktop)
   * ─────────────────────────────────────────────── */
  if (!isSidebarOpen) {
    return (
      <aside className="hidden lg:flex fixed lg:relative z-40 inset-y-0 left-0 w-[60px] h-screen bg-[var(--bg-card)] border-r border-[var(--border-color)] flex-col items-center justify-between py-4 transition-all duration-250 ease-out">
        {/* Top Icons */}
        <div className="flex flex-col items-center gap-1">
          {/* Crown Logo / Brand */}
          <button
            onClick={toggleSidebar}
            title="Open Sidebar"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer mb-2"
          >
            <img
              src={crownLogo}
              alt="dopamint"
              className="w-7 h-7 object-contain filter drop-shadow-xs"
            />
          </button>

          {/* New Chat */}
          <button
            onClick={() => createNewChat()}
            title="New Chat"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Search / Command */}
          <button
            onClick={() => setModalState('isCommandPaletteOpen', true)}
            title="Search (⌘K)"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Recent Chats (open sidebar) */}
          <button
            onClick={toggleSidebar}
            title="Chat History"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center gap-1">
          {/* Leaderboard */}
          <button
            onClick={() => setModalState('isLeaderboardModalOpen', true)}
            title="Leaderboard"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-amber-500"
          >
            <Trophy className="w-5 h-5" />
          </button>

          {/* Favourites */}
          <button
            onClick={() => setModalState('isWatchlistModalOpen', true)}
            title={`Favourites (${favouriteCount})`}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Star className={`w-5 h-5 ${favouriteCount > 0 ? 'text-amber-400 fill-amber-400' : ''}`} />
          </button>

          {/* Active Agents */}
          <button
            onClick={() => setModalState('isActiveAgentsModalOpen', true)}
            title={`Active Agents (${activeAgentsCount})`}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-emerald-500"
          >
            <Bot className="w-5 h-5" />
            {activeAgentsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => setModalState('isSettingsModalOpen', true)}
            title="Settings"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Avatar */}
          <div className="mt-2 pt-2 border-t border-[var(--border-color)]/60">
            <button
              onClick={toggleSidebar}
              title={userProfile.name || 'Profile'}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b4635] via-[#485442] to-[#8A9E7F] flex items-center justify-center text-white ring-2 ring-[var(--border-color)] shadow-2xs cursor-pointer hover:ring-[var(--primary)] transition-all"
            >
              <Wallet className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  /* ───────────────────────────────────────────────
   * EXPANDED FULL SIDEBAR (existing design)
   * ─────────────────────────────────────────────── */
  return (
    <aside
      className={`fixed lg:relative z-40 inset-y-0 left-0 w-[280px] h-screen bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col justify-between p-4 transition-all duration-250 ease-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
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

          {/* Collapse sidebar button */}
          <button
            onClick={toggleSidebar}
            title="Collapse sidebar"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Primary Button */}
        <button
          onClick={() => createNewChat()}
          className="w-full h-11 bg-[var(--primary)] hover:opacity-95 text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-button-primary transition-all duration-180 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Chat</span>
        </button>

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
          onClick={() => setModalState('isWatchlistModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Star className={`w-4 h-4 ${favouriteCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-[var(--text-muted)]'}`} />
            <span>Favourites</span>
          </div>
          <span className="text-[11px] px-1.5 py-0.2 bg-[var(--bg-app)] text-[var(--text-secondary)] font-semibold rounded-md border border-[var(--border-color)]">
            {favouriteCount}
          </span>
        </button>

        <button
          onClick={() => setModalState('isActiveAgentsModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Bot className="w-4 h-4 text-emerald-500" />
            <span>Active Agents</span>
          </div>
          <span className="text-[11px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {activeAgentsCount} Active
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
            <Coins className="w-4 h-4 text-[var(--primary)]" />
            <span>Buy Credits</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 bg-[var(--primary)] text-white font-bold rounded-md">
            TOP UP
          </span>
        </button>

        {/* User Profile Card Footer */}
        <UserProfileCard />
      </div>
    </aside>
  );
};
