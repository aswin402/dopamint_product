import type { StateCreator } from 'zustand';

export interface UiSlice {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Navigation & Layout
  activePage: 'dashboard' | 'leaderboard' | 'refer' | 'points';
  setActivePage: (page: 'dashboard' | 'leaderboard' | 'refer' | 'points') => void;
  isSidebarOpen: boolean;
  isInsightsOpen: boolean;
  userDismissedInsights: boolean;
  selectedSourceFilter: string | null;
  toggleSidebar: () => void;
  toggleInsights: () => void;
  closeInsightsByUser: () => void;
  openInsightsByUser: () => void;
  setSelectedSourceFilter: (filter: string | null) => void;
  openSourceInPanel: (sourceIdentifier?: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setInsightsOpen: (open: boolean) => void;

  // Right Panel Tabs
  activeRightTab: 'sources' | 'widgets';
  setActiveRightTab: (tab: 'sources' | 'widgets') => void;

  // Modals & Dialogs
  isCommandPaletteOpen: boolean;
  isPortfolioModalOpen: boolean;
  isWatchlistModalOpen: boolean;
  isAlertsModalOpen: boolean;
  isShareModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isUpgradeProModalOpen: boolean;
  isAuthModalOpen: boolean;
  isLeaderboardModalOpen: boolean;
  isActiveAgentsModalOpen: boolean;
  isRenameModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isFolderModalOpen: boolean;
  editingFolderId: string | null;
  modalTargetChatId: string | null;

  openRenameModal: (chatId: string) => void;
  openDeleteModal: (chatId: string) => void;
  openAuthModal: () => void;
  openLeaderboardModal: () => void;
  openActiveAgentsModal: () => void;
  openCreateFolderModal: () => void;
  openEditFolderModal: (folderId: string) => void;
  closeFolderModal: () => void;
  setModalState: (modalName: string, isOpen: boolean) => void;
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('dopamint-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.classList.toggle('dark', saved === 'dark');
      return saved;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
};

export const createUiSlice: StateCreator<UiSlice, [], [], UiSlice> = (set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    }
    set({ theme: nextTheme });
  },
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    set({ theme });
  },

  activePage: 'dashboard',
  setActivePage: (activePage) => set({ activePage }),
  isSidebarOpen: true,
  isInsightsOpen: false,
  userDismissedInsights: false,
  selectedSourceFilter: null,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleInsights: () =>
    set((state) => ({
      isInsightsOpen: !state.isInsightsOpen,
      userDismissedInsights: state.isInsightsOpen ? true : false,
      selectedSourceFilter: state.isInsightsOpen ? null : state.selectedSourceFilter,
    })),
  closeInsightsByUser: () =>
    set({ isInsightsOpen: false, userDismissedInsights: true, selectedSourceFilter: null }),
  openInsightsByUser: () => set({ isInsightsOpen: true, userDismissedInsights: false }),
  setSelectedSourceFilter: (filter) => set({ selectedSourceFilter: filter }),
  openSourceInPanel: (sourceIdentifier) =>
    set({
      isInsightsOpen: true,
      userDismissedInsights: false,
      selectedSourceFilter: sourceIdentifier || null,
    }),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setInsightsOpen: (open) => set({ isInsightsOpen: open }),

  activeRightTab: 'widgets',
  setActiveRightTab: (activeRightTab) => set({ activeRightTab }),

  isCommandPaletteOpen: false,
  isPortfolioModalOpen: false,
  isWatchlistModalOpen: false,
  isAlertsModalOpen: false,
  isShareModalOpen: false,
  isSettingsModalOpen: false,
  isUpgradeProModalOpen: false,
  isAuthModalOpen: false,
  isLeaderboardModalOpen: false,
  isActiveAgentsModalOpen: false,
  isRenameModalOpen: false,
  isDeleteModalOpen: false,
  isFolderModalOpen: false,
  editingFolderId: null,
  modalTargetChatId: null,

  openRenameModal: (chatId) =>
    set({ isRenameModalOpen: true, modalTargetChatId: chatId }),
  openDeleteModal: (chatId) =>
    set({ isDeleteModalOpen: true, modalTargetChatId: chatId }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  openLeaderboardModal: () => set({ isLeaderboardModalOpen: true }),
  openActiveAgentsModal: () => set({ isActiveAgentsModalOpen: true }),
  openCreateFolderModal: () => set({ isFolderModalOpen: true, editingFolderId: null }),
  openEditFolderModal: (editingFolderId) => set({ isFolderModalOpen: true, editingFolderId }),
  closeFolderModal: () => set({ isFolderModalOpen: false, editingFolderId: null }),

  setModalState: (modalName, isOpen) =>
    set((state) => ({
      ...state,
      [modalName]: isOpen,
    })),
});
