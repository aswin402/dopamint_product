import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { MarketOverviewCard } from './MarketOverviewCard';
import { TopCoinsTable } from './TopCoinsTable';
import { InteractiveChart } from './InteractiveChart';
import { NewsFeedCard } from './NewsFeedCard';

export const InsightsPanel: React.FC = () => {
  const isInsightsOpen = useCryptoStore((s) => s.isInsightsOpen);
  const toggleInsights = useCryptoStore((s) => s.toggleInsights);
  const simulateMarketTick = useCryptoStore((s) => s.simulateMarketTick);

  useEffect(() => {
    const interval = setInterval(() => {
      simulateMarketTick();
    }, 5000);
    return () => clearInterval(interval);
  }, [simulateMarketTick]);

  return (
    <aside
      className={`fixed xl:relative z-30 inset-y-0 right-0 w-[340px] h-screen bg-[#F7F8FA] border-l border-[#ECECEC] p-4 overflow-y-auto space-y-4 transition-transform duration-250 ease-out select-none ${
        isInsightsOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      } ${!isInsightsOpen ? 'xl:hidden' : ''}`}
    >
      {/* Mobile Header Bar */}
      <div className="xl:hidden flex items-center justify-between pb-2 border-b border-[#ECECEC]">
        <span className="font-bold text-sm text-[#111111]">Market Telemetry</span>
        <button
          onClick={toggleInsights}
          className="p-1.5 rounded-lg text-[#666666] hover:bg-[#F0F2F6]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <MarketOverviewCard />
      <TopCoinsTable />
      <InteractiveChart />
      <NewsFeedCard />
    </aside>
  );
};
