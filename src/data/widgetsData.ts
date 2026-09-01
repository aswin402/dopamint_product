import type { WidgetConfig, WidgetType } from '../types/crypto';

export interface WidgetCatalogItem {
  type: WidgetType;
  title: string;
  description: string;
  category: 'Market' | 'News' | 'Portfolio' | 'Activity';
  badge?: string;
  defaultTitle: string;
}

export const WIDGET_CATALOG: WidgetCatalogItem[] = [
  {
    type: 'crypto-news',
    title: 'Breaking Crypto News',
    defaultTitle: 'Crypto News & Catalysts',
    description: 'Live verified headlines, sentiment tags, and articles from top crypto outlets.',
    category: 'News',
    badge: 'Live',
  },
  {
    type: 'crypto-calendar',
    title: 'Key Events & Unlocks',
    defaultTitle: 'Events & Token Unlocks',
    description: 'Upcoming token unlocks, Fed FOMC rate announcements, and protocol mainnet launches.',
    category: 'Market',
    badge: 'Updated',
  },
  {
    type: 'market-stats',
    title: 'Market Overview & Gas',
    defaultTitle: 'Market Stats & Gas',
    description: 'Live Fear & Greed Index, Base Gwei gas fees, and BTC market dominance metrics.',
    category: 'Market',
  },
  {
    type: 'trending-coins',
    title: 'Trending on Base',
    defaultTitle: 'Trending on Base',
    description: 'Real-time highest volume movers with 24h price changes and 1-click AI analysis.',
    category: 'Market',
    badge: 'Hot',
  },
  {
    type: 'xp-quests',
    title: 'Daily XP & Quests Tracker',
    defaultTitle: 'XP & Daily Quests',
    description: 'Track your daily streak, available bonus claims, and active task progress.',
    category: 'Activity',
  },
  {
    type: 'portfolio-summary',
    title: 'Portfolio & Watchlist',
    defaultTitle: 'Portfolio Summary',
    description: 'Quick glance at your wallet assets, top holdings, and active price watchlists.',
    category: 'Portfolio',
  },
];

export const DEFAULT_ACTIVE_WIDGETS: WidgetConfig[] = [
  {
    id: 'w-news',
    type: 'crypto-news',
    title: 'Crypto News & Catalysts',
    isExpanded: true,
    order: 0,
  },
  {
    id: 'w-calendar',
    type: 'crypto-calendar',
    title: 'Events & Token Unlocks',
    isExpanded: true,
    order: 1,
  },
  {
    id: 'w-stats',
    type: 'market-stats',
    title: 'Market Stats & Gas',
    isExpanded: true,
    order: 2,
  },
  {
    id: 'w-trending',
    type: 'trending-coins',
    title: 'Trending on Base',
    isExpanded: true,
    order: 3,
  },
];
