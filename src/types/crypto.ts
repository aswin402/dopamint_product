export type IconColorType = 'orange' | 'green' | 'blue' | 'purple' | 'yellow' | 'red' | 'cyan';

export interface KeyPointItem {
  id: string;
  iconType: IconColorType;
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
  previewUrl?: string;
}

export interface WebSource {
  title: string;
  url: string;
  domain: string;
  snippet?: string;
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
  webSources?: WebSource[];
  isDeepResearch?: boolean;
}

export type ConversationGroup = 'today' | 'yesterday' | 'last7days' | 'older';

export interface Folder {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  isPinned: boolean;
  isFavourite?: boolean;
  folderId?: string;
  group: ConversationGroup;
  createdAt: string;
  updatedAt: string;
  iconName: string;
  iconBgColor?: string;
  unreadCount?: number;
  model: 'dopamint-4o' | 'dopamint-DeepResearch' | 'QuantAlpha-3';
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

export interface FearAndGreedData {
  value: number;
  classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  previousClose: number;
  lastUpdated: string;
}

export interface MarketOverviewData {
  totalMarketCap: number;
  totalMarketCapChange24h: number;
  volume24h: number;
  volume24hChange24h: number;
  btcDominance: number;
  btcDominanceChange24h: number;
  ethGasGwei: number;
  fearAndGreedIndex: FearAndGreedData;
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
  readTime: string;
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
  name: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: string;
}

export type TimeframeOption = '1H' | '24H' | '7D' | '1M' | '1Y' | 'ALL';

export interface UserProfile {
  name: string;
  email: string;
  walletAddress: string;
  ensName?: string;
  avatarUrl: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  apiCallsRemaining: number;
}

export interface LeaderboardEntry {
  rank: number;
  walletAddress: string;
  testnetTopupEth: number;
  xpPoints: number;
  badge?: string;
  isCurrentUser?: boolean;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'active' | 'running' | 'idle' | 'paused';
  model: string;
  tasksCompleted: number;
  uptime: string;
  latencyMs: number;
  iconType: 'shield' | 'trending' | 'zap' | 'globe' | 'search' | 'cpu';
  systemPrompt: string;
}

export type WidgetType =
  | 'market-overview'
  | 'token-unlock'
  | 'listing-feed'
  | 'whale-tracking'
  | 'exchange-netflow'
  | 'order-book'
  | 'sentiment-news'
  | 'portfolio-summary';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  isExpanded?: boolean;
  order: number;
  settings?: Record<string, unknown>;
}

