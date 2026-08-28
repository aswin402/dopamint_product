import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Star,
  Bell,
  PieChart,
  Settings,
  Sparkles,
  Command,
  X,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { HistoryGroup } from './HistoryGroup';
import { UserProfileCard } from './UserProfileCard';

export const Sidebar: React.FC = () => {
  const isSidebarOpen = useCryptoStore((s) => s.isSidebarOpen);
  const toggleSidebar = useCryptoStore((s) => s.toggleSidebar);
  const conversations = useCryptoStore((s) => s.conversations);
  const activeConversationId = useCryptoStore((s) => s.activeConversationId);
  const searchQuery = useCryptoStore((s) => s.searchQuery);
  const setSearchQuery = useCryptoStore((s) => s.setSearchQuery);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const watchlist = useCryptoStore((s) => s.watchlist);
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
      className={`fixed lg:relative z-40 inset-y-0 left-0 w-[280px] h-screen bg-[#FFFFFF] border-r border-[#ECECEC] flex flex-col justify-between p-4 transition-transform duration-250 ease-out select-none ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${!isSidebarOpen ? 'lg:hidden' : ''}`}
    >
      {/* Top Header & New Chat */}
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-3">
            {/* Hexagonal Prism Gradient Logo */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5B5CEB] via-[#7B7CF6] to-[#9E9EFA] flex items-center justify-center shadow-button-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
                <path d="M12 21V12" />
                <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                <path d="M12 12 2.29 6.5" />
                <path d="m12 12 9.71-5.5" />
              </svg>
            </div>

            <div>
              <h1 className="font-bold text-[17px] tracking-tight text-[#111111] leading-tight">
                CryptoGPT
              </h1>
              <p className="text-[11.5px] font-medium text-[#8E8E93] leading-none mt-0.5">
                Your Crypto Assistant
              </p>
            </div>
          </div>

          {/* Close drawer on mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-[#666666] hover:bg-[#F0F2F6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Primary Button */}
        <motion.button
          whileHover={{ scale: 1.015, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createNewChat()}
          className="w-full h-11 bg-gradient-primary hover:opacity-95 text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-button-primary transition-all duration-180"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Chat</span>
        </motion.button>

        {/* Search Chats Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-12 text-[13px] bg-[#F7F8FA] hover:bg-[#F2F4F8] focus:bg-white text-[#111111] placeholder-[#8E8E93] rounded-xl border border-[#ECECEC] focus:border-[#5B5CEB] focus:ring-2 focus:ring-[#5B5CEB]/10 outline-none transition-all"
          />
          <button
            onClick={() => setModalState('isCommandPaletteOpen', true)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#FFFFFF] border border-[#ECECEC] text-[10.5px] font-medium text-[#8E8E93] rounded-md shadow-2xs"
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
            <p className="text-xs text-[#8E8E93]">No conversations found</p>
          </div>
        )}
      </div>

      {/* Bottom Utility Navigation & User Profile */}
      <div className="space-y-1 pt-2 border-t border-[#ECECEC]">
        <button
          onClick={() => setModalState('isWatchlistModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F0F2F6] rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-[#8E8E93]" />
            <span>Watchlist</span>
          </div>
          <span className="text-[11px] px-1.5 py-0.2 bg-[#F0F2F6] text-[#666666] font-semibold rounded-md">
            {watchlist.length}
          </span>
        </button>

        <button
          onClick={() => setModalState('isAlertsModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F0F2F6] rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-[#8E8E93]" />
            <span>Alerts</span>
          </div>
          <span className="text-[11px] px-1.5 py-0.2 bg-[#EEF0FD] text-[#5B5CEB] font-semibold rounded-md">
            {alerts.filter((a) => a.isActive).length} Active
          </span>
        </button>

        <button
          onClick={() => setModalState('isPortfolioModalOpen', true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F0F2F6] rounded-xl transition-colors"
        >
          <PieChart className="w-4 h-4 text-[#8E8E93]" />
          <span>Portfolio</span>
        </button>

        <button
          onClick={() => setModalState('isSettingsModalOpen', true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F0F2F6] rounded-xl transition-colors"
        >
          <Settings className="w-4 h-4 text-[#8E8E93]" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => setModalState('isUpgradeProModalOpen', true)}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-semibold text-[#5B5CEB] hover:bg-[#EEF0FD] rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#5B5CEB]" />
            <span>Upgrade to Pro</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#5B5CEB] text-white font-bold rounded-md">
            NEW
          </span>
        </button>

        {/* User Profile Card Footer */}
        <UserProfileCard />
      </div>
    </aside>
  );
};
