import type { WidgetConfig, WidgetType } from '../types/crypto';

export interface WidgetCatalogItem {
  type: WidgetType;
  title: string;
  description: string;
  category: 'Market' | 'Whales' | 'Flows' | 'Portfolio';
  badge?: string;
  defaultTitle: string;
}

export const WIDGET_CATALOG: WidgetCatalogItem[] = [
  {
    type: 'market-overview',
    title: 'BTC & Market Overview',
    defaultTitle: 'Market Overview',
    description: 'BTC price $71,240 (+2.1%), Fear & Greed 62, Funding Rate 0.014%, Open Interest $18.4B.',
    category: 'Market',
    badge: 'Live',
  },
  {
    type: 'token-unlock',
    title: 'Token Unlock Calendar',
    defaultTitle: 'Token Unlock Calendar',
    description: 'ARB in 3d (4.2% supply), STRK in 9d (1.8% supply), TIA in 14d (0.6% supply).',
    category: 'Market',
    badge: 'Upcoming',
  },
  {
    type: 'listing-feed',
    title: 'Listing / Delisting Feed',
    defaultTitle: 'Listing / Delisting Feed',
    description: 'Real-time exchange listings: PYTH on OKX, XYZ delisted on Binance, JUP perp on Bybit.',
    category: 'Market',
    badge: 'New',
  },
  {
    type: 'whale-tracking',
    title: 'Whale / Smart Money',
    defaultTitle: 'Whale / Smart Money',
    description: 'Track large moves: 0x4a2…f91 (+2,400 ETH), Fund wallet (-1.1M USDC), 0x9d7…3c2 (+800k SOL).',
    category: 'Whales',
    badge: 'Smart Money',
  },
  {
    type: 'exchange-netflow',
    title: 'Exchange Netflow',
    defaultTitle: 'Exchange Netflow',
    description: 'Exchange inflows & outflows: BTC +1,240 BTC, ETH -9,600 ETH with predictive pressure signals.',
    category: 'Flows',
  },
  {
    type: 'order-book',
    title: 'Order Book Depth',
    defaultTitle: 'Order Book Depth',
    description: 'Visual bids vs asks depth map: spot liquidity thins past $71.6k.',
    category: 'Market',
  },
  {
    type: 'sentiment-news',
    title: 'Sentiment & News',
    defaultTitle: 'Sentiment & News',
    description: 'Social volume buzz: SOL mentions +34%, ETF inflows, EU regulatory news.',
    category: 'Market',
  },
  {
    type: 'portfolio-summary',
    title: 'Portfolio & Exposure',
    defaultTitle: 'Portfolio',
    description: 'Total Value $48,210, 24h PnL +$1,120, Exposure 62% BTC/ETH.',
    category: 'Portfolio',
  },
];

export const DEFAULT_ACTIVE_WIDGETS: WidgetConfig[] = [
  {
    id: 'w-market',
    type: 'market-overview',
    title: 'Market Overview',
    isExpanded: true,
    order: 0,
  },
  {
    id: 'w-unlock',
    type: 'token-unlock',
    title: 'Token Unlock Calendar',
    isExpanded: true,
    order: 1,
  },
  {
    id: 'w-orderbook',
    type: 'order-book',
    title: 'Order Book Depth',
    isExpanded: true,
    order: 2,
  },
  {
    id: 'w-whales',
    type: 'whale-tracking',
    title: 'Whale / Smart Money',
    isExpanded: true,
    order: 3,
  },
  {
    id: 'w-netflow',
    type: 'exchange-netflow',
    title: 'Exchange Netflow',
    isExpanded: true,
    order: 4,
  },
  {
    id: 'w-listings',
    type: 'listing-feed',
    title: 'Listing / Delisting Feed',
    isExpanded: true,
    order: 5,
  },
  {
    id: 'w-sentiment',
    type: 'sentiment-news',
    title: 'Sentiment & News',
    isExpanded: true,
    order: 6,
  },
  {
    id: 'w-portfolio',
    type: 'portfolio-summary',
    title: 'Portfolio',
    isExpanded: true,
    order: 7,
  },
];
