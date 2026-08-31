import React, { useState } from 'react';
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
  PanelLeftClose,
  MessageSquare,
} from 'lucide-react';
import crownLogo from '../../assets/crown.png';
import logoDope from '../../assets/logo_dope.png';
import { useCryptoStore } from '../../store/useCryptoStore';
import { HistoryGroup } from './HistoryGroup';
import { UserProfileCard } from './UserProfileCard';

export const Sidebar: React.FC = () => {
  const [isRailHovered, setIsRailHovered] = useState(false);

  const searchQuery = useCryptoStore((s) => s.searchQuery);
  const setSearchQuery = useCryptoStore((s) => s.setSearchQuery);

  const isSidebarOpen = useCryptoStore((s) => s.isSidebarOpen);
  const toggleSidebar = useCryptoStore((s) => s.toggleSidebar);
  const conversations = useCryptoStore((s) => s.conversations);
  const activeConversationId = useCryptoStore((s) => s.activeConversationId);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const agents = useCryptoStore((s) => s.agents);

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
  const activeChat = conversations.find((c) => c.id === activeConversationId);

  return (
    <div className="hidden lg:flex h-screen flex-shrink-0">
      {/* ═══════════════════════════════════════════════════════════
       *  PANEL 1 — Utility Rail (Always Visible)
       *  Normally icon-only (w-[60px]); on hover expands to (w-[230px])
       *  Items moved to TOP: Leaderboard, Favourites, Agents, Settings, Buy Credits
       *  Bottom: User Profile
       * ═══════════════════════════════════════════════════════════ */}
      <aside
        onMouseEnter={() => setIsRailHovered(true)}
        onMouseLeave={() => setIsRailHovered(false)}
        className={`h-screen bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col justify-between p-2.5 transition-all duration-200 ease-out flex-shrink-0 z-30 overflow-hidden ${
          isRailHovered ? 'w-[230px]' : 'w-[60px]'
        }`}
      >
        {/* Top Section — Logo & Utility Navigation */}
        <div className="space-y-2">
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 px-1 py-1 mb-1 min-h-[36px] overflow-hidden">
            <img
              src={crownLogo}
              alt="crown"
              className="w-7 h-7 object-contain filter drop-shadow-xs flex-shrink-0"
            />
            {isRailHovered && (
              <img
                src={logoDope}
                alt="dopamint"
                className="h-4.5 w-auto max-w-[120px] object-contain brightness-0 dark:brightness-100 transition-all flex-shrink-0"
              />
            )}
          </div>

          {/* Nav Items (Moved UP right under logo) */}
          <div className="space-y-1">
            {/* 1. Leaderboard */}
            <button
              onClick={() => setModalState('isLeaderboardModalOpen', true)}
              title="Leaderboard"
              className={`w-full flex items-center p-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer ${
                isRailHovered ? 'justify-between' : 'justify-center'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0" />
                {isRailHovered && <span className="truncate">Leaderboard</span>}
              </div>
              {isRailHovered && (
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-md border border-amber-500/20 uppercase flex-shrink-0">
                  XP
                </span>
              )}
            </button>

            {/* 2. Favourites */}
            <button
              onClick={() => setModalState('isWatchlistModalOpen', true)}
              title={`Favourites (${favouriteCount})`}
              className={`w-full flex items-center p-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer ${
                isRailHovered ? 'justify-between' : 'justify-center'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Star
                  className={`w-5 h-5 flex-shrink-0 ${
                    favouriteCount > 0
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-[var(--text-muted)]'
                  }`}
                />
                {isRailHovered && <span className="truncate">Favourites</span>}
              </div>
              {isRailHovered && (
                <span className="text-[11px] px-1.5 py-0.2 bg-[var(--bg-app)] text-[var(--text-secondary)] font-semibold rounded-md border border-[var(--border-color)] flex-shrink-0">
                  {favouriteCount}
                </span>
              )}
            </button>

            {/* 3. Active Agents */}
            <button
              onClick={() => setModalState('isActiveAgentsModalOpen', true)}
              title={`Active Agents (${activeAgentsCount})`}
              className={`w-full flex items-center p-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer ${
                isRailHovered ? 'justify-between' : 'justify-center'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <Bot className="w-5 h-5 text-emerald-500" />
                  {activeAgentsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                {isRailHovered && <span className="truncate">Active Agents</span>}
              </div>
              {isRailHovered && (
                <span className="text-[11px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold rounded-md flex items-center gap-1 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {activeAgentsCount} Active
                </span>
              )}
            </button>

            {/* 4. Settings */}
            <button
              onClick={() => setModalState('isSettingsModalOpen', true)}
              title="Settings"
              className={`w-full flex items-center p-2 rounded-xl text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer ${
                isRailHovered ? 'justify-start gap-3' : 'justify-center'
              }`}
            >
              <Settings className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
              {isRailHovered && <span className="truncate">Settings</span>}
            </button>

            {/* 5. Buy Credits */}
            <button
              onClick={() => setModalState('isUpgradeProModalOpen', true)}
              title="Buy Credits"
              className={`w-full flex items-center p-2 rounded-xl text-[13px] font-semibold text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors cursor-pointer ${
                isRailHovered ? 'justify-between' : 'justify-center'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Coins className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                {isRailHovered && <span className="truncate">Buy Credits</span>}
              </div>
              {isRailHovered && (
                <span className="text-[10px] px-1.5 py-0.5 bg-[var(--primary)] text-white font-bold rounded-md flex-shrink-0">
                  TOP UP
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Section — User Profile Card */}
        <div className="pt-2">
          <UserProfileCard isRailHovered={isRailHovered} />
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════
       *  PANEL 2 — Chat History Menubar
       *  When Open (w-[260px]): Full chat titles, search, new chat
       *  When Closed (w-[54px]): Icon rail with Expand, +, Search, Chat
       * ═══════════════════════════════════════════════════════════ */}
      {isSidebarOpen ? (
        <aside className="w-[260px] h-screen bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col justify-between p-4 transition-all duration-200 ease-out flex-shrink-0">
          <div className="flex flex-col h-full min-w-0">
            {/* Top — Header, New Chat & Search */}
            <div className="space-y-3.5 flex-shrink-0">
              {/* Header Title + Collapse Icon */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Chats
                </span>
                <button
                  onClick={toggleSidebar}
                  title="Collapse Chats"
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
                >
                  <PanelLeftClose className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* New Chat Primary Button */}
              <button
                onClick={() => createNewChat()}
                className="w-full h-10 bg-[var(--primary)] hover:opacity-95 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-button-primary transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Chat</span>
              </button>

              {/* Search Chats Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8.5 pl-8.5 pr-10 text-[12.5px] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] focus:bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-lg border border-[var(--border-color)] focus:border-[var(--primary)] outline-none transition-all"
                />
                <button
                  onClick={() => setModalState('isCommandPaletteOpen', true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1 py-0.5 bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] font-medium text-[var(--text-muted)] rounded shadow-2xs cursor-pointer"
                >
                  <Command className="w-2.5 h-2.5" />
                  <span>K</span>
                </button>
              </div>
            </div>

            {/* Middle — Scrollable Conversation History */}
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
          </div>
        </aside>
      ) : (
        /* Collapsed Icon Rail for 2nd Menubar */
        <aside className="w-[54px] h-screen bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col items-center justify-between py-3 transition-all duration-200 ease-out flex-shrink-0">
          {/* Top Icons */}
          <div className="flex flex-col items-center gap-1.5">
            {/* Expand Icon */}
            <button
              onClick={toggleSidebar}
              title="Expand Chats"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <PanelLeft className="w-5 h-5" />
            </button>

            {/* Quick New Chat Button */}
            <button
              onClick={() => createNewChat()}
              title="New Chat"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--primary)] text-white hover:opacity-95 transition-all shadow-button-primary cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Quick Search Button */}
            <button
              onClick={() => setModalState('isCommandPaletteOpen', true)}
              title="Search chats (⌘K)"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Active Chat Icon */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={toggleSidebar}
              title={activeChat ? `Current: ${activeChat.title}` : 'Chats'}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--primary)] hover:text-[var(--text-primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
