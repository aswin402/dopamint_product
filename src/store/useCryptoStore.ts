import { create } from 'zustand';
import type {
  Attachment,
  Conversation,
  CryptoCoin,
  MarketOverviewData,
  Message,
  NewsItem,
  PortfolioPosition,
  PriceAlert,
  TimeframeOption,
  UserProfile,
  LeaderboardEntry,
  AIAgent,
} from '../types/crypto';
import { INITIAL_COINS, INITIAL_MARKET_OVERVIEW } from '../data/cryptoData';
import { INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from '../data/conversations';
import { INITIAL_NEWS } from '../data/newsData';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { INITIAL_AGENTS } from '../data/agentsData';
import { generateCryptoResponse } from '../lib/aiResponseGenerator';
import { formatTimestamp } from '../lib/formatters';

interface CryptoStoreState {
  // Theme state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Authentication
  isAuthenticated: boolean;
  login: (walletAddress: string, email?: string) => void;
  logout: () => void;

  // Navigation & Layout
  isSidebarOpen: boolean;
  isInsightsOpen: boolean;
  toggleSidebar: () => void;
  toggleInsights: () => void;
  setSidebarOpen: (open: boolean) => void;
  setInsightsOpen: (open: boolean) => void;

  // Conversations
  conversations: Conversation[];
  activeConversationId: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setActiveConversation: (id: string) => void;
  createNewChat: (initialPrompt?: string) => string;
  renameConversation: (id: string, newTitle: string) => void;
  deleteConversation: (id: string) => void;
  togglePinConversation: (id: string) => void;
  duplicateConversation: (id: string) => void;

  // Messages
  messages: Record<string, Message[]>;
  isStreaming: boolean;
  streamingMessageId: string | null;
  activeSpeechMessageId: string | null;
  setActiveSpeechMessageId: (id: string | null) => void;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  stopGeneration: () => void;
  regenerateResponse: (messageId: string) => Promise<void>;
  setMessageFeedback: (messageId: string, feedback: 'liked' | 'disliked' | null) => void;

  // Search & Deep Research Toggles
  isWebSearchEnabled: boolean;
  isDeepResearchEnabled: boolean;
  toggleWebSearch: () => void;
  toggleDeepResearch: () => void;
  selectedModel: 'dopamint-4o' | 'dopamint-DeepResearch' | 'QuantAlpha-3';
  setSelectedModel: (model: 'dopamint-4o' | 'dopamint-DeepResearch' | 'QuantAlpha-3') => void;

  // Market & Coins
  marketOverview: MarketOverviewData;
  coins: CryptoCoin[];
  selectedCoinId: string;
  selectedTimeframe: TimeframeOption;
  setSelectedCoinId: (id: string) => void;
  setSelectedTimeframe: (tf: TimeframeOption) => void;
  watchlist: string[];
  toggleWatchlist: (coinId: string) => void;

  // Portfolio
  portfolio: PortfolioPosition[];
  addPortfolioPosition: (position: Omit<PortfolioPosition, 'id'>) => void;
  removePortfolioPosition: (id: string) => void;

  // Alerts
  alerts: PriceAlert[];
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  togglePriceAlert: (id: string) => void;
  removePriceAlert: (id: string) => void;

  // News
  news: NewsItem[];

  // User Profile & Settings
  userProfile: UserProfile;
  activeCurrency: string;
  setActiveCurrency: (cur: string) => void;

  // Leaderboard & Points
  leaderboard: LeaderboardEntry[];
  topupTestnet: (amountEth: number) => void;

  // Active AI Agents & Subagents
  agents: AIAgent[];
  toggleAgentStatus: (agentId: string) => void;

  // Modals
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
  modalTargetChatId: string | null;
  isRenameModalOpen: boolean;
  isDeleteModalOpen: boolean;
  openRenameModal: (chatId: string) => void;
  openDeleteModal: (chatId: string) => void;
  openAuthModal: () => void;
  openLeaderboardModal: () => void;
  openActiveAgentsModal: () => void;
  setModalState: (modalName: string, isOpen: boolean) => void;

  // Live Jitter Simulation
  simulateMarketTick: () => void;
}

let streamAbortController: AbortController | null = null;

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

const getInitialAuth = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('dopamint-authenticated') === 'true';
  }
  return false;
};

export const useCryptoStore = create<CryptoStoreState>((set, get) => ({
  // Theme
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

  // Authentication
  isAuthenticated: getInitialAuth(),
  login: (walletAddress, email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-authenticated', 'true');
    }
    const truncated = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    const newChatId = `chat-${Date.now()}`;
    const newChat: Conversation = {
      id: newChatId,
      title: 'New Conversation',
      isPinned: false,
      group: 'today',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      iconName: 'bitcoin',
      iconBgColor: '#EEF0FD',
      model: get().selectedModel,
    };
    set((state) => ({
      isAuthenticated: true,
      isAuthModalOpen: false,
      isInsightsOpen: false,
      activeConversationId: newChatId,
      conversations: [newChat, ...state.conversations.filter((c) => c.id !== 'chat-new')],
      messages: {
        ...state.messages,
        [newChatId]: [],
      },
      userProfile: {
        ...state.userProfile,
        name: truncated,
        email: email || state.userProfile.email,
        walletAddress: walletAddress,
      },
    }));
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dopamint-authenticated');
    }
    set({
      isAuthenticated: false,
      isAuthModalOpen: false,
    });
  },

  // Navigation & Layout
  isSidebarOpen: true,
  isInsightsOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleInsights: () => set((state) => ({ isInsightsOpen: !state.isInsightsOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setInsightsOpen: (open) => set({ isInsightsOpen: open }),

  // Conversations
  conversations: [
    {
      id: 'chat-new',
      title: 'New Conversation',
      isPinned: false,
      group: 'today',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      iconName: 'bitcoin',
      iconBgColor: '#EEF0FD',
      model: 'dopamint-4o',
    },
    ...INITIAL_CONVERSATIONS,
  ],
  activeConversationId: 'chat-new',
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setActiveConversation: (activeConversationId) => {
    if (get().isStreaming) {
      get().stopGeneration();
    }
    set({ activeConversationId });
  },

  createNewChat: (initialPrompt?: string) => {
    const newId = `chat-${Date.now()}`;
    const newChat: Conversation = {
      id: newId,
      title: initialPrompt ? initialPrompt.slice(0, 26) : 'New Conversation',
      isPinned: false,
      group: 'today',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      iconName: 'bitcoin',
      iconBgColor: '#EEF0FD',
      model: get().selectedModel,
    };

    set((state) => ({
      conversations: [newChat, ...state.conversations],
      activeConversationId: newId,
      messages: {
        ...state.messages,
        [newId]: [],
      },
    }));

    if (initialPrompt) {
      get().sendMessage(initialPrompt);
    }

    return newId;
  },

  renameConversation: (id, newTitle) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, title: newTitle.trim() || c.title, updatedAt: new Date().toISOString() } : c
      ),
    }));
  },

  deleteConversation: (id) => {
    const { conversations, activeConversationId } = get();
    const remaining = conversations.filter((c) => c.id !== id);
    const newActiveId =
      activeConversationId === id
        ? remaining.length > 0
          ? remaining[0].id
          : get().createNewChat()
        : activeConversationId;

    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[id];
      return {
        conversations: remaining,
        activeConversationId: newActiveId,
        messages: newMessages,
      };
    });
  },

  togglePinConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, isPinned: !c.isPinned } : c
      ),
    }));
  },

  duplicateConversation: (id) => {
    const { conversations, messages } = get();
    const target = conversations.find((c) => c.id === id);
    if (!target) return;

    const newId = `chat-${Date.now()}`;
    const duplicatedChat: Conversation = {
      ...target,
      id: newId,
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const duplicatedMessages = messages[id] ? [...messages[id]] : [];

    set((state) => ({
      conversations: [duplicatedChat, ...state.conversations],
      activeConversationId: newId,
      messages: {
        ...state.messages,
        [newId]: duplicatedMessages,
      },
    }));
  },

  // Messages
  messages: INITIAL_MESSAGES,
  isStreaming: false,
  streamingMessageId: null,
  activeSpeechMessageId: null,
  setActiveSpeechMessageId: (activeSpeechMessageId) => set({ activeSpeechMessageId }),

  sendMessage: async (content: string, attachments?: Attachment[]) => {
    const {
      activeConversationId,
      isWebSearchEnabled,
      isDeepResearchEnabled,
      conversations,
      messages,
    } = get();

    if (!content.trim() && (!attachments || attachments.length === 0)) return;

    const userMessageId = `user-msg-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      conversationId: activeConversationId,
      role: 'user',
      content: content.trim(),
      createdAt: formatTimestamp(new Date()),
      status: 'sent',
      attachments: attachments || [],
    };

    // Auto-update conversation title if first message
    const currentConv = conversations.find((c) => c.id === activeConversationId);
    const existingMessages = messages[activeConversationId] || [];
    let updatedConversations = conversations;
    if (existingMessages.length === 0 && currentConv) {
      const generatedTitle =
        content.length > 32 ? `${content.slice(0, 30)}...` : content;
      updatedConversations = conversations.map((c) =>
        c.id === activeConversationId
          ? { ...c, title: generatedTitle, updatedAt: new Date().toISOString() }
          : c
      );
    }

    // Append user message immediately
    set((state) => ({
      conversations: updatedConversations,
      messages: {
        ...state.messages,
        [activeConversationId]: [...(state.messages[activeConversationId] || []), userMessage],
      },
    }));

    // Generate AI Response Object
    const aiResponseTemplate = generateCryptoResponse(content, {
      isDeepResearch: isDeepResearchEnabled,
      isWebSearch: isWebSearchEnabled,
    });

    const assistantMessageId = `ai-msg-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      conversationId: activeConversationId,
      role: 'assistant',
      content: '',
      createdAt: formatTimestamp(new Date()),
      status: 'streaming',
      thinkingSteps: isDeepResearchEnabled ? aiResponseTemplate.thinkingSteps : undefined,
      keyPoints: aiResponseTemplate.keyPoints,
      priceSnapshot: aiResponseTemplate.priceSnapshot,
      suggestedFollowUps: aiResponseTemplate.suggestedFollowUps,
      webSources: isWebSearchEnabled ? aiResponseTemplate.webSources : undefined,
      isDeepResearch: isDeepResearchEnabled,
    };

    // Add empty streaming assistant message
    set((state) => ({
      isStreaming: true,
      streamingMessageId: assistantMessageId,
      messages: {
        ...state.messages,
        [activeConversationId]: [
          ...(state.messages[activeConversationId] || []),
          assistantMessage,
        ],
      },
    }));

    // Abort controller for cancellation
    if (streamAbortController) {
      streamAbortController.abort();
    }
    streamAbortController = new AbortController();
    const signal = streamAbortController.signal;

    // Simulate Token-by-Token Streaming
    const fullText = aiResponseTemplate.content;
    const tokens = fullText.split(/(\s+)/);
    let streamedContent = '';

    try {
      for (let i = 0; i < tokens.length; i++) {
        if (signal.aborted) break;

        streamedContent += tokens[i];
        const delay = Math.random() * 20 + 10;
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (signal.aborted) break;

        set((state) => ({
          messages: {
            ...state.messages,
            [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: streamedContent }
                : msg
            ),
          },
        }));
      }
    } catch {
      // Aborted or cancelled
    } finally {
      if (!signal.aborted) {
        set((state) => ({
          isStreaming: false,
          streamingMessageId: null,
          messages: {
            ...state.messages,
            [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, status: 'completed' as const, content: fullText }
                : msg
            ),
          },
        }));
      }
    }
  },

  stopGeneration: () => {
    if (streamAbortController) {
      streamAbortController.abort();
      streamAbortController = null;
    }
    const { activeConversationId, streamingMessageId } = get();
    set((state) => ({
      isStreaming: false,
      streamingMessageId: null,
      messages: {
        ...state.messages,
        [activeConversationId]: (state.messages[activeConversationId] || []).map((msg) =>
          msg.id === streamingMessageId ? { ...msg, status: 'completed' as const } : msg
        ),
      },
    }));
  },

  regenerateResponse: async (messageId: string) => {
    const { activeConversationId, messages } = get();
    const currentList = messages[activeConversationId] || [];
    const targetIdx = currentList.findIndex((m) => m.id === messageId);
    if (targetIdx === -1) return;

    // Find preceding user message
    let userPrompt = 'Analyze current crypto market';
    for (let i = targetIdx - 1; i >= 0; i--) {
      if (currentList[i].role === 'user') {
        userPrompt = currentList[i].content;
        break;
      }
    }

    // Remove the old assistant message
    set((state) => ({
      messages: {
        ...state.messages,
        [activeConversationId]: currentList.filter((m) => m.id !== messageId),
      },
    }));

    // Trigger regeneration
    await get().sendMessage(userPrompt);
  },

  setMessageFeedback: (messageId: string, feedback: 'liked' | 'disliked' | null) => {
    const { activeConversationId } = get();
    set((s) => ({
      messages: {
        ...s.messages,
        [activeConversationId]: (s.messages[activeConversationId] || []).map((m) =>
          m.id === messageId ? { ...m, feedback: m.feedback === feedback ? null : feedback } : m
        ),
      },
    }));
  },

  // Search & Research Toggles
  isWebSearchEnabled: true,
  isDeepResearchEnabled: false,
  toggleWebSearch: () => set((s) => ({ isWebSearchEnabled: !s.isWebSearchEnabled })),
  toggleDeepResearch: () => set((s) => ({ isDeepResearchEnabled: !s.isDeepResearchEnabled })),
  selectedModel: 'dopamint-4o',
  setSelectedModel: (selectedModel) => set({ selectedModel }),

  // Market & Coins
  marketOverview: INITIAL_MARKET_OVERVIEW,
  coins: INITIAL_COINS,
  selectedCoinId: 'bitcoin',
  selectedTimeframe: '24H',
  setSelectedCoinId: (selectedCoinId) => set({ selectedCoinId }),
  setSelectedTimeframe: (selectedTimeframe) => set({ selectedTimeframe }),
  watchlist: ['bitcoin', 'ethereum', 'solana'],
  toggleWatchlist: (coinId) => {
    set((s) => ({
      watchlist: s.watchlist.includes(coinId)
        ? s.watchlist.filter((id) => id !== coinId)
        : [...s.watchlist, coinId],
    }));
  },

  // Portfolio
  portfolio: [
    {
      id: 'p-1',
      coinId: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.85,
      buyPriceAvg: 61400.0,
      currentPrice: 66753.21,
      color: '#F7931A',
    },
    {
      id: 'p-2',
      coinId: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 4.2,
      buyPriceAvg: 3050.0,
      currentPrice: 3215.47,
      color: '#627EEA',
    },
    {
      id: 'p-3',
      coinId: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      amount: 45.0,
      buyPriceAvg: 142.5,
      currentPrice: 178.34,
      color: '#14F195',
    },
  ],

  addPortfolioPosition: (position) => {
    const newPos: PortfolioPosition = {
      ...position,
      id: `p-${Date.now()}`,
    };
    set((s) => ({
      portfolio: [...s.portfolio, newPos],
    }));
  },

  removePortfolioPosition: (id) => {
    set((s) => ({
      portfolio: s.portfolio.filter((p) => p.id !== id),
    }));
  },

  // Alerts
  alerts: [
    {
      id: 'alt-1',
      coinId: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      targetPrice: 70000.0,
      condition: 'above',
      isActive: true,
      createdAt: '2026-08-28T09:00:00Z',
    },
    {
      id: 'alt-2',
      coinId: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      targetPrice: 3000.0,
      condition: 'below',
      isActive: true,
      createdAt: '2026-08-28T09:00:00Z',
    },
  ],

  addPriceAlert: (alert) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({
      alerts: [...s.alerts, newAlert],
    }));
  },

  togglePriceAlert: (id) => {
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)),
    }));
  },

  removePriceAlert: (id) => {
    set((s) => ({
      alerts: s.alerts.filter((a) => a.id !== id),
    }));
  },

  // News
  news: INITIAL_NEWS,

  // User Profile & Settings
  userProfile: {
    name: '0x71C8...49A2',
    email: '0x71C8392F865eE824A1054E5F36423c9E3c7649A2',
    walletAddress: '0x71C8392F865eE824A1054E5F36423c9E3c7649A2',
    ensName: 'dope.eth',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    tier: 'Pro',
    apiCallsRemaining: 4850,
  },
  activeCurrency: 'USD',
  setActiveCurrency: (activeCurrency) => set({ activeCurrency }),

  // Leaderboard & Points
  leaderboard: INITIAL_LEADERBOARD,
  topupTestnet: (amountEth: number) => {
    const { leaderboard, userProfile } = get();
    const currentUserAddr = userProfile.walletAddress || '0x71C8392F865eE824A1054E5F36423c9E3c7649A2';
    const xpGained = Math.round(amountEth * 10000);

    const existingIndex = leaderboard.findIndex(
      (entry) => entry.isCurrentUser || entry.walletAddress.toLowerCase() === currentUserAddr.toLowerCase()
    );

    let updatedList = [...leaderboard];
    if (existingIndex >= 0) {
      const current = updatedList[existingIndex];
      updatedList[existingIndex] = {
        ...current,
        testnetTopupEth: +(current.testnetTopupEth + amountEth).toFixed(2),
        xpPoints: current.xpPoints + xpGained,
        isCurrentUser: true,
      };
    } else {
      updatedList.push({
        rank: 99,
        walletAddress: currentUserAddr,
        testnetTopupEth: amountEth,
        xpPoints: xpGained,
        isCurrentUser: true,
        badge: '⭐ You',
      });
    }

    // Re-sort by topup amount / xp points descending
    updatedList.sort((a, b) => b.xpPoints - a.xpPoints);
    // Re-assign ranks
    updatedList = updatedList.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));

    set({ leaderboard: updatedList });
  },

  // Active AI Agents & Subagents
  agents: INITIAL_AGENTS,
  toggleAgentStatus: (agentId: string) => {
    const { agents } = get();
    set({
      agents: agents.map((agent) => {
        if (agent.id === agentId) {
          const newStatus = agent.status === 'paused' ? 'active' : 'paused';
          return { ...agent, status: newStatus };
        }
        return agent;
      }),
    });
  },

  // Modals
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
  modalTargetChatId: null,
  isRenameModalOpen: false,
  isDeleteModalOpen: false,

  openRenameModal: (chatId) => set({ isRenameModalOpen: true, modalTargetChatId: chatId }),
  openDeleteModal: (chatId) => set({ isDeleteModalOpen: true, modalTargetChatId: chatId }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  openLeaderboardModal: () => set({ isLeaderboardModalOpen: true }),
  openActiveAgentsModal: () => set({ isActiveAgentsModalOpen: true }),
  setModalState: (modalName, isOpen) =>
    set((state) => ({
      ...state,
      [modalName]: isOpen,
    })),

  // Live Jitter Simulation
  simulateMarketTick: () => {
    const { coins, marketOverview } = get();
    const updatedCoins = coins.map((c) => {
      const jitterPercent = (Math.random() - 0.49) * 0.2;
      const newPrice = Math.max(0.0001, c.price * (1 + jitterPercent / 100));
      return {
        ...c,
        price: newPrice,
      };
    });

    set({
      coins: updatedCoins,
      marketOverview: {
        ...marketOverview,
        totalMarketCap: marketOverview.totalMarketCap * (1 + (Math.random() - 0.49) * 0.001),
      },
    });
  },
}));
