import type { StateCreator } from 'zustand';
import type {
  AIAgent,
  CryptoCoin,
  LeaderboardEntry,
  MarketOverviewData,
  NewsItem,
  PortfolioPosition,
  PriceAlert,
  TimeframeOption,
} from '../../types/crypto';
import { INITIAL_COINS, INITIAL_MARKET_OVERVIEW } from '../../data/cryptoData';
import { INITIAL_NEWS } from '../../data/newsData';
import { INITIAL_LEADERBOARD } from '../../data/leaderboardData';
import { INITIAL_AGENTS } from '../../data/agentsData';
import { marketService } from '../../api/marketService';

export interface MarketSlice {
  // Market & Coins
  marketOverview: MarketOverviewData;
  coins: CryptoCoin[];
  selectedCoinId: string;
  selectedTimeframe: TimeframeOption;
  setSelectedCoinId: (id: string) => void;
  setSelectedTimeframe: (tf: TimeframeOption) => void;

  // Watchlist & Portfolio
  watchlist: string[];
  toggleWatchlist: (coinId: string) => void;
  portfolio: PortfolioPosition[];
  addPortfolioPosition: (position: Omit<PortfolioPosition, 'id'>) => void;
  removePortfolioPosition: (id: string) => void;

  // Alerts & News
  alerts: PriceAlert[];
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  togglePriceAlert: (id: string) => void;
  removePriceAlert: (id: string) => void;
  news: NewsItem[];

  // Leaderboard & Subagents
  leaderboard: LeaderboardEntry[];
  topupTestnet: (amountEth: number) => void;
  agents: AIAgent[];
  toggleAgentStatus: (agentId: string) => void;

  // Live Jitter Simulation
  simulateMarketTick: () => void;
}

export const createMarketSlice: StateCreator<MarketSlice, [], [], MarketSlice> = (set, get) => ({
  marketOverview: INITIAL_MARKET_OVERVIEW,
  coins: INITIAL_COINS,
  selectedCoinId: 'bitcoin',
  selectedTimeframe: '24H',
  setSelectedCoinId: (selectedCoinId) => set({ selectedCoinId }),
  setSelectedTimeframe: (selectedTimeframe) => set({ selectedTimeframe }),

  watchlist: ['bitcoin', 'ethereum', 'solana'],
  toggleWatchlist: (coinId) => {
    const list = get().watchlist;
    const exists = list.includes(coinId);
    const updated = exists ? list.filter((id) => id !== coinId) : [...list, coinId];
    set({ watchlist: updated });
  },

  portfolio: [
    {
      id: 'p-1',
      coinId: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.85,
      buyPriceAvg: 61200,
      currentPrice: 87940,
      color: '#F7931A',
    },
    {
      id: 'p-2',
      coinId: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 6.4,
      buyPriceAvg: 2850,
      currentPrice: 3240,
      color: '#627EEA',
    },
    {
      id: 'p-3',
      coinId: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      amount: 42.0,
      buyPriceAvg: 110,
      currentPrice: 194.5,
      color: '#14F195',
    },
  ],
  addPortfolioPosition: (position) => {
    const newPos: PortfolioPosition = {
      ...position,
      id: `pos-${Date.now()}`,
    };
    set((state) => ({ portfolio: [...state.portfolio, newPos] }));
  },
  removePortfolioPosition: (id) => {
    set((state) => ({ portfolio: state.portfolio.filter((p) => p.id !== id) }));
  },

  alerts: [
    {
      id: 'alt-1',
      coinId: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      targetPrice: 90000,
      condition: 'above',
      isActive: true,
      createdAt: '2026-02-28',
    },
    {
      id: 'alt-2',
      coinId: 'ethereum',
      symbol: 'ETH',
      targetPrice: 3000,
      name: 'Ethereum',
      condition: 'below',
      isActive: true,
      createdAt: '2026-02-27',
    },
  ],
  addPriceAlert: (alert) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({ alerts: [...state.alerts, newAlert] }));
  },
  togglePriceAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)),
    }));
  },
  removePriceAlert: (id) => {
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) }));
  },

  news: INITIAL_NEWS,
  leaderboard: INITIAL_LEADERBOARD,
  topupTestnet: (amountEth) => {
    set((state) => ({
      leaderboard: state.leaderboard.map((entry) =>
        entry.isCurrentUser
          ? {
              ...entry,
              testnetTopupEth: Number((entry.testnetTopupEth + amountEth).toFixed(2)),
              xpPoints: entry.xpPoints + Math.floor(amountEth * 1000),
            }
          : entry
      ),
    }));
  },

  agents: INITIAL_AGENTS,
  toggleAgentStatus: (agentId) => {
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === agentId
          ? { ...a, status: a.status === 'active' || a.status === 'running' ? 'paused' : 'active' }
          : a
      ),
    }));
  },

  simulateMarketTick: () => {
    const { coins, marketOverview } = get();
    const result = marketService.simulateMarketTick(coins, marketOverview);
    set({ coins: result.coins, marketOverview: result.marketOverview });
  },
});
