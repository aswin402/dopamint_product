import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { INITIAL_AI_SOURCES, type AISource } from '../../data/sourcesData';

export const InsightsPanel: React.FC = () => {
  const isInsightsOpen = useCryptoStore((s) => s.isInsightsOpen);
  const closeInsightsByUser = useCryptoStore((s) => s.closeInsightsByUser);

  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);

  return (
    <aside
      className={`fixed xl:relative z-30 inset-y-0 right-0 w-[320px] sm:w-[340px] h-screen bg-[var(--bg-card)] border-l border-[var(--border-color)] flex flex-col justify-between transition-all duration-250 ease-out shadow-lg xl:shadow-none ${
        isInsightsOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      } ${!isInsightsOpen ? 'xl:hidden' : ''}`}
    >
      {/* Minimal Header */}
      <div className="px-5 pt-4 pb-3 border-b border-[var(--border-color)]/60 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-[var(--text-secondary)] dark:text-[#A0A0A0]">
            Sources
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            ({INITIAL_AI_SOURCES.length})
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={closeInsightsByUser}
            title="Close Sources Panel"
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Clean Minimalist Sources List Matching Reference Image */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {INITIAL_AI_SOURCES.map((source: AISource) => {
          const isExpanded = expandedSourceId === source.id;

          return (
            <motion.div
              layout
              key={source.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="group cursor-pointer"
              onClick={() => setExpandedSourceId(isExpanded ? null : source.id)}
            >
              <div className="flex items-start gap-3">
                {/* Left Icon (Circular Avatar matching image style) */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5 shadow-2xs ${source.iconBg}`}
                >
                  {source.iconText}
                </div>

                {/* Right Content */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  {/* Domain Name & Verified Badge */}
                  <div className="flex items-center gap-1 text-[11.5px] text-[var(--text-muted)] dark:text-[#888]">
                    <span className="font-normal truncate">{source.domain}</span>
                    {source.isVerified && (
                      <CheckCircle2 className="w-3 h-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    )}
                  </div>

                  {/* Title (Bold, Crisp, Readable) */}
                  <h4 className="font-medium text-[13px] text-[var(--text-primary)] dark:text-[#EAEAEA] leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {source.name}
                  </h4>

                  {/* Snippet Paragraph */}
                  <p className="text-[12px] text-[#71717A] dark:text-[#999999] leading-relaxed line-clamp-3 pt-0.5">
                    {source.description}
                  </p>

                  {/* Expandable Citation Quote Box */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="pt-2 space-y-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] space-y-1">
                          <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider block">
                            AI Verified Citation
                          </span>
                          <p className="text-[11.5px] text-[var(--text-primary)] italic leading-snug">
                            "{source.sampleCitation}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-0.5">
                          <span className="text-[10.5px] font-mono text-[var(--text-muted)]">
                            {source.protocol} · {source.latencyMs}ms
                          </span>

                          <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-[var(--primary)] hover:underline"
                          >
                            <span>Visit {source.domain}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Footer */}
      <div className="px-5 py-3 border-t border-[var(--border-color)]/60 bg-[var(--bg-card)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] flex-shrink-0">
        <span>AI Consensus: 100%</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● 14ms Live</span>
      </div>
    </aside>
  );
};
