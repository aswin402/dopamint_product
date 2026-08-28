import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronDown,
  Activity,
  Globe,
  Zap,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { INITIAL_AI_SOURCES, type AISource } from '../../data/sourcesData';

export const InsightsPanel: React.FC = () => {
  const isInsightsOpen = useCryptoStore((s) => s.isInsightsOpen);
  const toggleInsights = useCryptoStore((s) => s.toggleInsights);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>('src-1');
  const [copiedHash, setCopiedHash] = useState(false);
  const [scanningIdx, setScanningIdx] = useState(0);

  const scanningMessages = [
    'Verifying Base Sepolia mempool pending transactions & gas spreads...',
    'Fetching CoinGecko & Binance Level-2 aggregate orderbook depth...',
    'Auditing SEC EDGAR 13F spot Bitcoin & Ethereum ETF net inflows...',
    'Indexing Farcaster & Crypto Twitter real-time sentiment velocity...',
    'Parsing ArXiv quantitative finance algorithms & volatility models...',
  ];

  // Rotate simulated scanning message
  useEffect(() => {
    const interval = setInterval(() => {
      setScanningIdx((prev) => (prev + 1) % scanningMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [scanningMessages.length]);

  const filteredSources = INITIAL_AI_SOURCES.filter((src) => {
    if (selectedCategory === 'all') return true;
    return src.category === selectedCategory;
  });

  const getCategoryIcon = (category: AISource['category']) => {
    switch (category) {
      case 'onchain':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'exchanges':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'macro':
        return <Globe className="w-4 h-4 text-indigo-500" />;
      case 'social':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'research':
      default:
        return <BookOpen className="w-4 h-4 text-purple-500" />;
    }
  };

  const handleCopyProof = () => {
    navigator.clipboard.writeText('0x7f4be829a1b0c934d8e5f21469a7c39e128b5531');
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <aside
      className={`fixed xl:relative z-30 inset-y-0 right-0 w-[360px] h-screen bg-[var(--bg-app)] border-l border-[var(--border-color)] flex flex-col justify-between transition-all duration-250 ease-out shadow-lg xl:shadow-none ${
        isInsightsOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      } ${!isInsightsOpen ? 'xl:hidden' : ''}`}
    >
      {/* Top Header */}
      <div className="p-4 pb-3 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--text-primary)] tracking-tight">
                  AI Verified Sources
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                Real-time data feeds inspected by dopamint AI
              </p>
            </div>
          </div>

          <button
            onClick={toggleInsights}
            title="Close Sources Inspector"
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Active Inspection Hero Card */}
        <div className="mt-3 p-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] relative overflow-hidden shadow-2xs">
          {/* Animated top shimmer bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent animate-pulse" />

          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
            <span className="flex items-center gap-1 font-semibold text-[var(--text-primary)]">
              <Sparkles className="w-3 h-3 text-[var(--primary)]" />
              Live Telemetry Feed
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">18ms Avg</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={scanningIdx}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25 }}
              className="text-[11.5px] text-[var(--text-secondary)] font-medium leading-snug line-clamp-2"
            >
              {scanningMessages[scanningIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3">
          {[
            { id: 'all', label: 'All', count: INITIAL_AI_SOURCES.length },
            { id: 'onchain', label: 'On-Chain', count: 3 },
            { id: 'exchanges', label: 'Exchanges', count: 3 },
            { id: 'macro', label: 'Macro & SEC', count: 3 },
            { id: 'social', label: 'Social', count: 3 },
            { id: 'research', label: 'Research', count: 2 },
          ].map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 flex-shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--primary)] text-white shadow-2xs'
                    : 'bg-[var(--bg-app)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9.5px] px-1 rounded-md font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle Scrollable Sources List */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
        {filteredSources.map((source) => {
          const isExpanded = expandedSourceId === source.id;

          return (
            <motion.div
              layout
              key={source.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-[var(--bg-card)] border-[var(--primary)]/60 shadow-2xs ring-1 ring-[var(--primary)]/20'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--primary)]/30 hover:bg-[var(--bg-card)]'
              }`}
            >
              {/* Header Row (Click to toggle accordion) */}
              <div
                onClick={() => setExpandedSourceId(isExpanded ? null : source.id)}
                className="p-3 flex items-start justify-between gap-2.5 cursor-pointer select-none"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {getCategoryIcon(source.category)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-bold text-xs text-[var(--text-primary)] truncate leading-tight">
                        {source.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[10.5px] text-[var(--text-muted)]">
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {source.latencyMs}ms
                      </span>
                      <span>•</span>
                      <span className="text-[var(--text-secondary)] font-medium">
                        {source.dataPoints}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-1.5 py-0.2 bg-[var(--primary-light)] text-[var(--primary)] font-bold rounded-md">
                    {source.trustScore}%
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                      isExpanded ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Details Drawer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-3.5 pb-3.5 pt-1 space-y-2.5 border-t border-[var(--border-color)]/60 bg-[var(--bg-app)]/50"
                  >
                    {/* Technical Description */}
                    <p className="text-[11.5px] text-[var(--text-secondary)] leading-relaxed">
                      {source.description}
                    </p>

                    {/* AI Citation Extraction Box */}
                    <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1">
                      <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Latest AI Extraction Citation
                      </span>
                      <p className="text-[11px] text-[var(--text-primary)] italic leading-snug">
                        "{source.sampleCitation}"
                      </p>
                    </div>

                    {/* Meta Tags & External Link */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)]">
                        {source.protocol}
                      </span>

                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] hover:underline"
                      >
                        <span>{source.domain}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Consensus Verification Footer */}
      <div className="p-3.5 border-t border-[var(--border-color)] bg-[var(--bg-card)] space-y-2 flex-shrink-0">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="font-bold text-[var(--text-primary)]">Consensus Proof</span>
          </div>
          <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-md text-[10px]">
            5/5 Clusters Validated
          </span>
        </div>

        <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[var(--text-muted)] truncate">0x7f4b...39e1</span>
          <button
            onClick={handleCopyProof}
            className="flex items-center gap-1 text-[10.5px] text-[var(--primary)] font-semibold hover:underline cursor-pointer"
          >
            {copiedHash ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Hash</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
