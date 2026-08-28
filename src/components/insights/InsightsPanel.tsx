import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  ChevronDown,
  Activity,
  Globe,
  Zap,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { INITIAL_AI_SOURCES, type AISource } from '../../data/sourcesData';

export const InsightsPanel: React.FC = () => {
  const isInsightsOpen = useCryptoStore((s) => s.isInsightsOpen);
  const closeInsightsByUser = useCryptoStore((s) => s.closeInsightsByUser);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);
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
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />;
      case 'exchanges':
        return <Activity className="w-3.5 h-3.5 text-blue-500" />;
      case 'macro':
        return <Globe className="w-3.5 h-3.5 text-indigo-500" />;
      case 'social':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case 'research':
      default:
        return <BookOpen className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  const handleCopyProof = () => {
    navigator.clipboard.writeText('0x7f4be829a1b0c934d8e5f21469a7c39e128b5531');
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <aside
      className={`fixed xl:relative z-30 inset-y-0 right-0 w-[330px] sm:w-[350px] h-screen bg-[var(--bg-app)] border-l border-[var(--border-color)] flex flex-col justify-between transition-all duration-250 ease-out shadow-lg xl:shadow-none ${
        isInsightsOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      } ${!isInsightsOpen ? 'xl:hidden' : ''}`}
    >
      {/* Top Header */}
      <div className="p-3.5 pb-2.5 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex-shrink-0 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs text-[var(--text-primary)] tracking-tight">
                  Sources
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={closeInsightsByUser}
            title="Close Sources (won't auto-open)"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Perplexity-style Active Query Pill */}
        <div className="p-2 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]/70 flex items-center gap-2 relative overflow-hidden">
          <Sparkles className="w-3 h-3 text-[var(--primary)] flex-shrink-0" />
          <AnimatePresence mode="wait">
            <motion.p
              key={scanningIdx}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-[10.5px] text-[var(--text-secondary)] font-medium truncate leading-none"
            >
              {scanningMessages[scanningIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
          {[
            { id: 'all', label: 'All', count: INITIAL_AI_SOURCES.length },
            { id: 'onchain', label: 'On-Chain', count: 3 },
            { id: 'exchanges', label: 'DEX/CEX', count: 3 },
            { id: 'macro', label: 'Macro', count: 3 },
            { id: 'social', label: 'Social', count: 3 },
            { id: 'research', label: 'Papers', count: 2 },
          ].map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-2 py-0.5 rounded-lg text-[10.5px] font-semibold flex items-center gap-1 flex-shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--primary)] text-white shadow-2xs'
                    : 'bg-[var(--bg-app)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1 rounded-md font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimal Perplexity-style Source Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredSources.map((source, idx) => {
          const isExpanded = expandedSourceId === source.id;

          return (
            <motion.div
              layout
              key={source.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={`rounded-xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-[var(--bg-card)] border-[var(--primary)] shadow-2xs ring-1 ring-[var(--primary)]/20'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--border-color)]/90 hover:bg-[var(--bg-card)]/90'
              }`}
            >
              {/* Minimal Card Header & Snippet */}
              <div
                onClick={() => setExpandedSourceId(isExpanded ? null : source.id)}
                className="p-2.5 cursor-pointer select-none space-y-1.5"
              >
                {/* Domain & Source Index Pill */}
                <div className="flex items-center justify-between gap-1 text-[10.5px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-4 h-4 rounded-md bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(source.category)}
                    </div>
                    <span className="font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] truncate font-mono text-[10px]">
                      {source.domain}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      {source.latencyMs}ms
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[var(--bg-app)] border border-[var(--border-color)] text-[9.5px] font-mono font-bold text-[var(--text-muted)] flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                </div>

                {/* Source Title */}
                <h4 className="font-bold text-[12px] text-[var(--text-primary)] leading-tight line-clamp-1">
                  {source.name}
                </h4>

                {/* Micro-snippet preview */}
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {source.description}
                </p>

                {/* Footer Micro-Bar */}
                <div className="flex items-center justify-between pt-1 text-[10px] text-[var(--text-muted)] border-t border-[var(--border-color)]/40">
                  <span className="truncate">{source.dataPoints}</span>
                  <div className="flex items-center gap-1 font-semibold text-[var(--primary)] flex-shrink-0">
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 ${
                        isExpanded ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Perplexity-style Citation Quote Box on Expand */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="px-2.5 pb-2.5 pt-1 space-y-2 border-t border-[var(--border-color)]/60 bg-[var(--bg-app)]/40"
                  >
                    <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1">
                      <span className="text-[9.5px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        AI Verified Citation
                      </span>
                      <p className="text-[11px] text-[var(--text-primary)] italic leading-snug">
                        "{source.sampleCitation}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-1.5 py-0.2 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] font-mono text-[var(--text-muted)]">
                        {source.protocol}
                      </span>

                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[var(--primary)] hover:underline"
                      >
                        <span>Visit {source.domain}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Minimal Footer Proof */}
      <div className="p-2.5 border-t border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between text-[10.5px] font-mono flex-shrink-0">
        <span className="text-[var(--text-muted)] truncate">Proof: 0x7f4b...39e1</span>
        <button
          onClick={handleCopyProof}
          className="flex items-center gap-1 text-[10px] text-[var(--primary)] font-semibold hover:underline cursor-pointer flex-shrink-0"
        >
          {copiedHash ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
