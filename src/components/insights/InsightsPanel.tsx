import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Plus,
  LayoutGrid,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { INITIAL_AI_SOURCES, type AISource } from '../../data/sourcesData';
import { WidgetCardContainer } from '../widgets/WidgetCardContainer';
import { AddWidgetModal } from '../widgets/AddWidgetModal';

export const InsightsPanel: React.FC = () => {
  const isInsightsOpen = useCryptoStore((s) => s.isInsightsOpen);
  const closeInsightsByUser = useCryptoStore((s) => s.closeInsightsByUser);
  const selectedSourceFilter = useCryptoStore((s) => s.selectedSourceFilter);
  const setSelectedSourceFilter = useCryptoStore((s) => s.setSelectedSourceFilter);

  const activeRightTab = useCryptoStore((s) => s.activeRightTab);
  const setActiveRightTab = useCryptoStore((s) => s.setActiveRightTab);
  const widgets = useCryptoStore((s) => s.widgets);
  const setIsAddWidgetModalOpen = useCryptoStore((s) => s.setIsAddWidgetModalOpen);

  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);

  // Filter sources
  const displayedSources = selectedSourceFilter
    ? INITIAL_AI_SOURCES.filter((s) => {
        const query = selectedSourceFilter.toLowerCase();
        return (
          s.domain.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          s.id.toLowerCase() === query
        );
      })
    : INITIAL_AI_SOURCES;

  return (
    <>
      <aside
        className={`fixed xl:relative z-30 inset-y-0 right-0 w-[330px] sm:w-[360px] h-screen bg-[var(--bg-card)] border-l border-[var(--border-color)] flex flex-col justify-between transition-all duration-250 ease-out shadow-lg xl:shadow-none ${
          isInsightsOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
        } ${!isInsightsOpen ? 'xl:hidden' : ''}`}
      >
        {/* Header & Tab Switcher Bar */}
        <div className="px-4 pt-3.5 pb-3 border-b border-[var(--border-color)] flex flex-col gap-2.5 flex-shrink-0 bg-[var(--bg-card)]">
          {/* Top Row: Segmented Tab Switcher & Close */}
          <div className="flex items-center justify-between gap-2">
            {/* Segmented Tab Pill */}
            <div className="flex items-center p-0.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] shadow-2xs">
              <button
                onClick={() => setActiveRightTab('widgets')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeRightTab === 'widgets'
                    ? 'bg-[var(--bg-card)] text-[#485442] dark:text-[#8A9E7F] shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Widgets</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[var(--bg-app)] text-[var(--text-muted)]">
                  {widgets.length}
                </span>
              </button>

              <button
                onClick={() => setActiveRightTab('sources')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeRightTab === 'sources'
                    ? 'bg-[var(--bg-card)] text-[#485442] dark:text-[#8A9E7F] shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Sources</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[var(--bg-app)] text-[var(--text-muted)]">
                  {INITIAL_AI_SOURCES.length}
                </span>
              </button>
            </div>

            {/* Actions: Add Widget (if widgets tab) or Close */}
            <div className="flex items-center gap-1">
              {activeRightTab === 'widgets' && (
                <button
                  onClick={() => setIsAddWidgetModalOpen(true)}
                  title="Add Widget"
                  className="px-2.5 py-1 rounded-xl bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white text-xs font-semibold flex items-center gap-1 shadow-button-primary cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              )}

              {activeRightTab === 'sources' && selectedSourceFilter && (
                <button
                  onClick={() => setSelectedSourceFilter(null)}
                  title="Reset to All Sources"
                  className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={closeInsightsByUser}
                title="Close Right Panel"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filter subline if in sources mode */}
          {activeRightTab === 'sources' && selectedSourceFilter && (
            <div className="flex items-center justify-between text-[11px] px-1">
              <span className="text-[var(--text-muted)]">Filtered by:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono font-bold px-1.5 py-0.2 rounded-md bg-[var(--primary-light)] text-[var(--primary)] truncate max-w-[140px]">
                  {selectedSourceFilter}
                </span>
                <button
                  onClick={() => setSelectedSourceFilter(null)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] underline cursor-pointer text-[10px]"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content View Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <AnimatePresence mode="wait">
            {activeRightTab === 'widgets' ? (
              /* WIDGETS TAB VIEW */
              <motion.div
                key="widgets-tab"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3.5"
              >
                {widgets.length === 0 ? (
                  /* Empty state */
                  <div className="text-center py-12 px-4 space-y-3 rounded-2xl bg-[var(--bg-app)] border border-dashed border-[var(--border-color)]">
                    <div className="w-10 h-10 rounded-2xl bg-[#485442]/10 dark:bg-[#8A9E7F]/15 text-[#485442] dark:text-[#8A9E7F] mx-auto flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[var(--text-primary)]">
                        No active widgets
                      </h4>
                      <p className="text-[11.5px] text-[var(--text-secondary)] mt-0.5">
                        Customize your sidebar with crypto news, key unlocks, gas tracker, and trending coins.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddWidgetModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#485442] dark:bg-[#55604e] hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-button-primary cursor-pointer transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Widget</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <AnimatePresence>
                      {widgets.map((widget, idx) => (
                        <WidgetCardContainer
                          key={widget.id}
                          widget={widget}
                          index={idx}
                          totalCount={widgets.length}
                        />
                      ))}
                    </AnimatePresence>

                    {/* Quick Add Button at bottom of list */}
                    <button
                      onClick={() => setIsAddWidgetModalOpen(true)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-dashed border-[var(--border-color)] hover:border-[#485442]/40 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add More Widgets</span>
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              /* SOURCES TAB VIEW */
              <motion.div
                key="sources-tab"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                {displayedSources.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-xs text-[var(--text-muted)]">
                      No sources matching "{selectedSourceFilter}"
                    </p>
                    <button
                      onClick={() => setSelectedSourceFilter(null)}
                      className="text-xs text-[var(--primary)] font-semibold hover:underline cursor-pointer"
                    >
                      View all {INITIAL_AI_SOURCES.length} sources
                    </button>
                  </div>
                ) : (
                  displayedSources.map((source: AISource) => {
                    const isExpanded =
                      expandedSourceId === source.id ||
                      (Boolean(selectedSourceFilter) &&
                        displayedSources.length === 1 &&
                        expandedSourceId !== 'collapsed');

                    return (
                      <motion.div
                        layout
                        key={source.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className="group p-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[#485442]/30 transition-all shadow-2xs cursor-pointer"
                        onClick={() =>
                          setExpandedSourceId(isExpanded ? 'collapsed' : source.id)
                        }
                      >
                        <div className="flex items-start gap-3">
                          {/* Circular Avatar */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5 shadow-2xs ${source.iconBg}`}
                          >
                            {source.iconText}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-1">
                            {/* Domain Name & Verified Badge */}
                            <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                              <span className="font-normal truncate">
                                {source.domain}
                              </span>
                              {source.isVerified && (
                                <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                              )}
                            </div>

                            {/* Title */}
                            <h4 className="font-semibold text-[12.5px] text-[var(--text-primary)] leading-snug group-hover:text-[#485442] dark:group-hover:text-[#8A9E7F] transition-colors">
                              {source.name}
                            </h4>

                            {/* Snippet */}
                            <p className="text-[11.5px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 pt-0.5">
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
                                  <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1">
                                    <span className="text-[10px] font-bold text-[#485442] dark:text-[#8A9E7F] uppercase tracking-wider block">
                                      AI Verified Citation
                                    </span>
                                    <p className="text-[11.5px] text-[var(--text-primary)] italic leading-snug">
                                      "{source.sampleCitation}"
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between text-[11px] pt-0.5">
                                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                      {source.protocol} · {source.latencyMs}ms
                                    </span>

                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 font-semibold text-[#485442] dark:text-[#8A9E7F] hover:underline"
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
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Add Widget Catalog Modal */}
      <AddWidgetModal />
    </>
  );
};
