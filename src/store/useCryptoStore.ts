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
} from '../types/crypto';
import { INITIAL_COINS, INITIAL_MARKET_OVERVIEW } from '../data/cryptoData';
import { INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from '../data/conversations';
import { INITIAL_NEWS } from '../data/newsData';
import { generateCryptoResponse } from '../lib/aiResponseGenerator';
import { formatTimestamp } from '../lib/formatters';

interface CryptoStoreState {
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
  selectedModel: 'CryptoGPT-4o' | 'DeepResearch-Crypto' | 'QuantAlpha-3';
  setSelectedModel: (model: 'CryptoGPT-4o' | 'DeepResearch-Crypto' | 'QuantAlpha-3') => void;

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

  // Modals
  isCommandPaletteOpen: boolean;
  isPortfolioModalOpen: boolean;
  isWatchlistModalOpen: boolean;
  isAlertsModalOpen: boolean;
  isShareModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isUpgradeProModalOpen: boolean;
  modalTargetChatId: string | null;
  isRenameModalOpen: boolean;
  isDeleteModalOpen: boolean;
  openRenameModal: (chatId: string) => void;
  openDeleteModal: (chatId: string) => void;
  setModalState: (modalName: string, isOpen: boolean) => void;

  // Live Jitter Simulation
  simulateMarketTick: () => void;
}

let streamAbortController: AbortController | null = null;

export const useCryptoStore = create<CryptoStoreState>((set, get) => ({
  // Layout
  isSidebarOpen: true,
  isInsightsOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleInsights: () => set((state) => ({ isInsightsOpen: !state.isInsightsOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setInsightsOpen: (open) => set({ isInsightsOpen: open }),

  // Conversations
  conversations: INITIAL_CONVERSATIONS,
  activeConversationId: 'chat-1',
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveConversation: (activeConversationId) => {
    set({ activeConversationId });
    if (window.innerWidth < 1024) {
      set({ isSidebarOpen: false });
    }
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
    const original = get().conversations.find((c) => c.id === id);
    if (!original) return;
    const newId = `chat-${Date.now()}`;
    const duplicateChat: Conversation = {
      ...original,
      id: newId,
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const originalMessages = get().messages[id] || [];

    set((state) => ({
      conversations: [duplicateChat, ...state.conversations],
      activeConversationId: newId,
      messages: {
        ...state.messages,
        [newId]: [...originalMessages],
      },
    }));
  },

  // Messages
  messages: INITIAL_MESSAGES,
  isStreaming: false,
  streamingMessageId: null,
  activeSpeechMessageId: null,
  setActiveSpeechMessageId: (id) => set({ activeSpeechMessageId: id }),

  sendMessage: async (content: string, attachments?: Attachment[]) => {
    const state = get();
    const activeId = state.activeConversationId;
    const nowTime = formatTimestamp(new Date());

    const userMessageId = `usr-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      conversationId: activeId,
      role: 'user',
      content,
      createdAt: nowTime,
      status: 'completed',
      attachments,
    };

    const currentConv = state.conversations.find((c) => c.id === activeId);
    const existingMessages = state.messages[activeId] || [];
    if (currentConv && (existingMessages.length === 0 || currentConv.title === 'New Conversation')) {
      const summaryTitle = content.length > 28 ? `${content.slice(0, 26)}...` : content;
      get().renameConversation(activeId, summaryTitle);
    }

    const assistantMessageId = `ast-${Date.now() + 1}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      conversationId: activeId,
      role: 'assistant',
      content: '',
      createdAt: nowTime,
      status: 'streaming',
      isDeepResearch: state.isDeepResearchEnabled,
    };

    set((s) => ({
      messages: {
        ...s.messages,
        [activeId]: [...(s.messages[activeId] || []), userMessage, assistantMessage],
      },
      isStreaming: true,
      streamingMessageId: assistantMessageId,
    }));

    if (streamAbortController) {
      streamAbortController.abort();
    }
    streamAbortController = new AbortController();
    const currentAbort = streamAbortController;

    const generated = generateCryptoResponse(content, state.isDeepResearchEnabled);

    if (state.isDeepResearchEnabled && generated.thinkingSteps) {
      set((s) => ({
        messages: {
          ...s.messages,
          [activeId]: (s.messages[activeId] || []).map((m) =>
            m.id === assistantMessageId
              ? { ...m, thinkingSteps: generated.thinkingSteps }
              : m
          ),
        },
      }));
      await new Promise((r) => setTimeout(r, 600));
    }

    if (currentAbort.signal.aborted) return;

    const fullText = generated.content;
    const tokens = fullText.split(' ');
    let currentText = '';

    for (let i = 0; i < tokens.length; i++) {
      if (currentAbort.signal.aborted) break;

      currentText += (i === 0 ? '' : ' ') + tokens[i];

      set((s) => ({
        messages: {
          ...s.messages,
          [activeId]: (s.messages[activeId] || []).map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: currentText }
              : m
          ),
        },
      }));

      await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 20 + 15)));
    }

    set((s) => ({
      messages: {
        ...s.messages,
        [activeId]: (s.messages[activeId] || []).map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content: currentText,
                status: 'completed',
                keyPoints: generated.keyPoints,
                priceSnapshot: generated.priceSnapshot,
                codeBlocks: generated.codeBlocks,
                suggestedFollowUps: generated.suggestedFollowUps,
              }
            : m
        ),
      },
      isStreaming: false,
      streamingMessageId: null,
    }));
  },

  stopGeneration: () => {
    if (streamAbortController) {
      streamAbortController.abort();
      streamAbortController = null;
    }
    const { activeConversationId, streamingMessageId } = get();
    if (streamingMessageId) {
      set((s) => ({
        messages: {
          ...s.messages,
          [activeConversationId]: (s.messages[activeConversationId] || []).map((m) =>
            m.id === streamingMessageId ? { ...m, status: 'completed' } : m
          ),
        },
        isStreaming: false,
        streamingMessageId: null,
      }));
    }
  },

  regenerateResponse: async (messageId: string) => {
    const { activeConversationId, messages } = get();
    const convMessages = messages[activeConversationId] || [];
    const index = convMessages.findIndex((m) => m.id === messageId);
    if (index <= 0) return;

    const previousUserMessage = convMessages[index - 1];
    if (previousUserMessage && previousUserMessage.role === 'user') {
      set((s) => ({
        messages: {
          ...s.messages,
          [activeConversationId]: convMessages.filter((m) => m.id !== messageId),
        },
      }));
      await get().sendMessage(previousUserMessage.content);
    }
  },

  setMessageFeedback: (messageId, feedback) => {
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
  selectedModel: 'CryptoGPT-4o',
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
      buyPriceAvg: 2950.0,
      currentPrice: 3215.47,
      color: '#627EEA',
    },
    {
      id: 'p-3',
      coinId: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      amount: 25.0,
      buyPriceAvg: 142.0,
      currentPrice: 178.34,
      color: '#9945FF',
    },
  ],
  addPortfolioPosition: (position) => {
    const newPos: PortfolioPosition = {
      ...position,
      id: `pos-${Date.now()}`,
    };
    set((s) => ({ portfolio: [...s.portfolio, newPos] }));
  },
  removePortfolioPosition: (id) => {
    set((s) => ({ portfolio: s.portfolio.filter((p) => p.id !== id) }));
  },

  // Alerts
  alerts: [
    {
      id: 'alt-1',
      coinId: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      targetPrice: 70000,
      condition: 'above',
      isActive: true,
      createdAt: '2026-08-28T08:00:00Z',
    },
    {
      id: 'alt-2',
      coinId: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      targetPrice: 3000,
      condition: 'below',
      isActive: true,
      createdAt: '2026-08-28T08:00:00Z',
    },
  ],
  addPriceAlert: (alertData) => {
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ alerts: [...s.alerts, newAlert] }));
  },
  togglePriceAlert: (id) => {
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)),
    }));
  },
  removePriceAlert: (id) => {
    set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) }));
  },

  // News
  news: INITIAL_NEWS,

  // User Profile & Settings
  userProfile: {
    name: 'Vishal Raj',
    email: 'vishalraj@email.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    tier: 'Pro',
    apiCallsRemaining: 4850,
  },
  activeCurrency: 'USD',
  setActiveCurrency: (activeCurrency) => set({ activeCurrency }),

  // Modals
  isCommandPaletteOpen: false,
  isPortfolioModalOpen: false,
  isWatchlistModalOpen: false,
  isAlertsModalOpen: false,
  isShareModalOpen: false,
  isSettingsModalOpen: false,
  isUpgradeProModalOpen: false,
  modalTargetChatId: null,
  isRenameModalOpen: false,
  isDeleteModalOpen: false,

  openRenameModal: (chatId) => set({ isRenameModalOpen: true, modalTargetChatId: chatId }),
  openDeleteModal: (chatId) => set({ isDeleteModalOpen: true, modalTargetChatId: chatId }),
  setModalState: (modalName, isOpen) =>
    set((state) => ({
      ...state,
      [modalName]: isOpen,
    })),

  // Live Jitter Simulation
  simulateMarketTick: () => {
    set((state) => {
      const updatedCoins = state.coins.map((coin) => {
        const delta = (Math.random() * 0.35 - 0.15) / 100;
        const newPrice = Number((coin.price * (1 + delta)).toFixed(coin.price < 1 ? 4 : 2));
        const updatedHistory24h = [...coin.history24h];
        if (updatedHistory24h.length > 0) {
          updatedHistory24h[updatedHistory24h.length - 1] = {
            ...updatedHistory24h[updatedHistory24h.length - 1],
            price: newPrice,
          };
        }
        return {
          ...coin,
          price: newPrice,
          history24h: updatedHistory24h,
        };
      });

      return { coins: updatedCoins };
    });
  },
}));
