import type { CryptoCoin, MarketOverviewData } from '../types/crypto';
import { INITIAL_COINS, INITIAL_MARKET_OVERVIEW } from '../data/cryptoData';

export const marketService = {
  /**
   * Fetches the full list of supported cryptocurrency assets.
   */
  async getCoins(): Promise<CryptoCoin[]> {
    return [...INITIAL_COINS];
  },

  /**
   * Fetches global market telemetry and Fear & Greed index.
   */
  async getMarketOverview(): Promise<MarketOverviewData> {
    return { ...INITIAL_MARKET_OVERVIEW };
  },

  /**
   * Generates a live micro-tick jitter for coin prices and global volume.
   */
  simulateMarketTick(
    currentCoins: CryptoCoin[],
    currentOverview: MarketOverviewData
  ): { coins: CryptoCoin[]; marketOverview: MarketOverviewData } {
    const updatedCoins = currentCoins.map((coin) => {
      // 30% chance of price micro-fluctuation per interval
      if (Math.random() > 0.3) return coin;
      const deltaPercent = (Math.random() - 0.49) * 0.2; // -0.1% to +0.1%
      const newPrice = Math.max(0.0001, coin.price * (1 + deltaPercent / 100));
      const newChange24h = coin.change24h + deltaPercent * 0.05;

      const lastHistory = [...coin.history24h];
      if (lastHistory.length > 0) {
        lastHistory[lastHistory.length - 1] = {
          time: lastHistory[lastHistory.length - 1].time,
          price: newPrice,
        };
      }

      return {
        ...coin,
        price: Number(newPrice.toFixed(newPrice > 10 ? 2 : 4)),
        change24h: Number(newChange24h.toFixed(2)),
        history24h: lastHistory,
      };
    });

    const overviewJitter = (Math.random() - 0.49) * 0.05;
    const updatedOverview: MarketOverviewData = {
      ...currentOverview,
      totalMarketCap: currentOverview.totalMarketCap * (1 + overviewJitter / 100),
      totalMarketCapChange24h: Number(
        (currentOverview.totalMarketCapChange24h + overviewJitter).toFixed(2)
      ),
    };

    return { coins: updatedCoins, marketOverview: updatedOverview };
  },
};
