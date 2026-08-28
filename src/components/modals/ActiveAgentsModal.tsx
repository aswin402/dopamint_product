import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Bot,
  Shield,
  TrendingUp,
  Globe,
  Zap,
  Cpu,
  Play,
  Pause,
  MessageSquare,
  Activity,
  Plus,
  Server,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';
import type { AIAgent } from '../../types/crypto';

export const ActiveAgentsModal: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'running' | 'active'>('all');
  const [showDeploySuccess, setShowDeploySuccess] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const isOpen = useCryptoStore((s) => s.isActiveAgentsModalOpen);
  const setModalState = useCryptoStore((s) => s.setModalState);
  const agents = useCryptoStore((s) => s.agents);
  const toggleAgentStatus = useCryptoStore((s) => s.toggleAgentStatus);
  const createNewChat = useCryptoStore((s) => s.createNewChat);
  const sendMessage = useCryptoStore((s) => s.sendMessage);

  if (!isOpen) return null;

  const filteredAgents = agents.filter((agent) => {
    if (filter === 'running') return agent.status === 'running';
    if (filter === 'active') return agent.status === 'active' || agent.status === 'running';
    return true;
  });

  const activeCount = agents.filter((a) => a.status === 'running' || a.status === 'active').length;
  const totalTasks = agents.reduce((acc, a) => acc + a.tasksCompleted, 0);

  const getAgentIcon = (type: AIAgent['iconType']) => {
    switch (type) {
      case 'shield':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-indigo-500" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'cpu':
      default:
        return <Cpu className="w-5 h-5 text-[var(--primary)]" />;
    }
  };

  const handleChatWithAgent = (agent: AIAgent) => {
    setModalState('isActiveAgentsModalOpen', false);
    createNewChat();
    setTimeout(() => {
      sendMessage(`[Delegating to ${agent.name}] Analyze current high-priority market triggers and provide an executive intelligence briefing.`);
    }, 150);
  };

  const handleDeployNew = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setShowDeploySuccess(true);
      setTimeout(() => setShowDeploySuccess(false), 3000);
    }, 800);
  };

  return (
    <div
      onClick={() => setModalState('isActiveAgentsModalOpen', false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-color)] shadow-flyout overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-[var(--text-primary)] tracking-tight">
                  Active AI Agents & Subagents
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {activeCount} Running
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Specialized subagents executing parallel on-chain telemetry and deep research.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDeployNew}
              disabled={isDeploying}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold shadow-button-primary hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isDeploying ? (
                <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span>Deploy Subagent</span>
            </button>

            <button
              onClick={() => setModalState('isActiveAgentsModalOpen', false)}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Deploy Toast Notification */}
        <AnimatePresence>
          {showDeploySuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Custom Subagent instantiated on Base Sepolia execution node!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Telemetry Bar */}
        <div className="grid grid-cols-3 gap-2 px-6 py-3 bg-[var(--bg-app)] border-b border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--primary)]" />
            <div>
              <div className="font-bold text-[var(--text-primary)] font-mono">{totalTasks.toLocaleString()}</div>
              <div className="text-[10.5px] text-[var(--text-muted)]">Tasks Executed</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-500" />
            <div>
              <div className="font-bold text-[var(--text-primary)] font-mono">142ms Avg</div>
              <div className="text-[10.5px] text-[var(--text-muted)]">Subagent Latency</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <div>
              <div className="font-bold text-[var(--text-primary)] font-mono">99.8%</div>
              <div className="text-[10.5px] text-[var(--text-muted)]">Node Uptime</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-[var(--border-color)]">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Subagents ({agents.length})
          </button>

          <button
            onClick={() => setFilter('running')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filter === 'running'
                ? 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Running ({agents.filter((a) => a.status === 'running').length})</span>
          </button>

          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'active'
                ? 'bg-[var(--bg-app)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Active & Ready ({activeCount})
          </button>
        </div>

        {/* Agent Cards List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredAgents.map((agent) => {
            const isPaused = agent.status === 'paused';
            const isRunning = agent.status === 'running';

            return (
              <div
                key={agent.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isRunning
                    ? 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--primary)]/50 shadow-2xs'
                    : isPaused
                    ? 'bg-[var(--bg-app)]/50 border-[var(--border-color)] opacity-70'
                    : 'bg-[var(--bg-card)] border-[var(--border-color)]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left Icon & Info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                      {getAgentIcon(agent.iconType)}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-[var(--text-primary)] tracking-tight">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.2 rounded-md bg-[var(--bg-app)] border border-[var(--border-color)] font-medium text-[var(--text-secondary)]">
                          {agent.role}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold ${
                            isRunning
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : isPaused
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isRunning
                                ? 'bg-emerald-500 animate-pulse'
                                : isPaused
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          {agent.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => toggleAgentStatus(agent.id)}
                      title={isPaused ? 'Resume Agent' : 'Pause Agent'}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        isPaused
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/20'
                          : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleChatWithAgent(agent)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold shadow-button-primary hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>

                {/* Subagent Meta Details Footer */}
                <div className="mt-3 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-[11px] text-[var(--text-muted)] flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span>Model: <strong className="font-mono text-[var(--text-primary)]">{agent.model}</strong></span>
                    <span>•</span>
                    <span>Uptime: <strong className="font-mono text-[var(--text-primary)]">{agent.uptime}</strong></span>
                    <span>•</span>
                    <span>Latency: <strong className="font-mono text-[var(--text-primary)]">{agent.latencyMs}ms</strong></span>
                  </div>

                  <span className="font-mono text-[10.5px]">
                    Tasks: <strong className="text-[var(--text-primary)]">{agent.tasksCompleted.toLocaleString()}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
