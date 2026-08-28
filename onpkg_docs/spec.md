# Technical Specification & Data Contracts — CryptoGPT

## 1. Data Models (`src/types/crypto.ts`)

```typescript
export interface KeyPointItem {
  id: string;
  iconType: 'orange' | 'green' | 'blue' | 'purple' | 'yellow' | 'red';
  title: string;
  description: string;
}

export interface ThinkingStep {
  id: string;
  title: string;
  detail: string;
  status: 'pending' | 'active' | 'completed';
  durationMs?: number;
}

export interface PriceSnapshot {
  coinId: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  marketCapUsd: number;
  volume24hUsd: number;
  sparkline: number[];
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  status: 'sent' | 'streaming' | 'completed' | 'error';
  keyPoints?: KeyPointItem[];
  thinkingSteps?: ThinkingStep[];
  priceSnapshot?: PriceSnapshot;
  codeBlocks?: Array<{ language: string; code: string }>;
  suggestedFollowUps?: string[];
  feedback?: 'liked' | 'disliked' | null;
  attachments?: Attachment[];
  webSources?: Array<{ title: string; url: string; domain: string }>;
}

export interface Conversation {
  id: string;
  title: string;
  isPinned: boolean;
  group: 'today' | 'yesterday' | 'last7days' | 'older';
  createdAt: string;
  updatedAt: string;
  iconName: string;
  iconBgColor?: string;
  unreadCount?: number;
  model: 'CryptoGPT-4o' | 'DeepResearch-Crypto' | 'QuantAlpha-3';
}

export interface CryptoCoin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  iconUrl: string;
  color: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  allTimeHigh: number;
  history24h: { time: string; price: number }[];
  history7d: { time: string; price: number }[];
  history1m: { time: string; price: number }[];
}

export interface MarketOverviewData {
  totalMarketCap: number;
  totalMarketCapChange24h: number;
  volume24h: number;
  volume24hChange24h: number;
  btcDominance: number;
  btcDominanceChange24h: number;
  ethGasGwei: number;
  fearAndGreedIndex: {
    value: number;
    classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
    previousClose: number;
    lastUpdated: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  imageUrl: string;
  url: string;
  category: string;
  sentiment: 'bullish' | 'neutral' | 'bearish';
}

export interface PortfolioPosition {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  buyPriceAvg: number;
  currentPrice: number;
  color: string;
}

export interface PriceAlert {
  id: string;
  coinId: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: string;
}
```

---

## 2. Global State Schema (Zustand)

The global store handles:
1. `conversations`: Array of all user conversations, sorted by update timestamp.
2. `activeConversationId`: Currently active conversation.
3. `messages`: Record mapping `conversationId -> Message[]`.
4. `isStreaming`: Boolean flag indicating active AI generation.
5. `streamingMessageId`: Currently streaming message ID.
6. `searchQuery`: Sidebar conversation filter query.
7. `coins`: Array of 15+ live crypto assets.
8. `selectedCoinId`: Active coin displayed in the Right Panel Interactive Chart.
9. `marketOverview`: Real-time market metrics & Fear & Greed index.
10. `news`: Curated crypto news feed.
11. `portfolio`: Array of portfolio holdings with live P&L computation.
12. `watchlist`: Array of coin IDs saved to watchlist.
13. `alerts`: Array of configured price target alerts.
14. `isCommandPaletteOpen`, `isShareModalOpen`, `isPortfolioModalOpen`, `isWatchlistModalOpen`, `isAlertsModalOpen`, `isSettingsModalOpen`, `isUpgradeProModalOpen`, `isRenameModalOpen`, `isDeleteModalOpen`.
15. `sidebarOpen`, `insightsOpen` for responsive mobile drawers.
16. `isWebSearchEnabled`, `isDeepResearchEnabled`.
17. `activeSpeechMessageId` (currently speaking message in TTS).
