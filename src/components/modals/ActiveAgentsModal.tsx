import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
import { Modal, Button } from '../ui';
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

  const handleClose = () => {
    setModalState('isActiveAgentsModalOpen', false);
  };

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
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-indigo-500" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'cpu':
      default:
        return <Cpu className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />;
    }
  };

  const handleChatWithAgent = (agent: AIAgent) => {
    handleClose();
    createNewChat();
    setTimeout(() => {
      sendMessage(
        `[Delegating to ${agent.name}] Analyze current high-priority market triggers and provide an executive intelligence briefing.`
      );
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Active AI Agents & Subagents"
      subtitle="Specialized subagents executing parallel on-chain telemetry and deep research."
      icon={<Bot className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-3 max-h-[70vh] flex flex-col">
        {/* Top Quick Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{activeCount} Subagents Running</span>
          </div>

          <Button
            size="xs"
            variant="primary"
            onClick={handleDeployNew}
            isLoading={isDeploying}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Deploy Subagent
          </Button>
        </div>

        {/* Deploy Toast Notification */}
        <AnimatePresence>
          {showDeploySuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Custom Subagent instantiated on Base Sepolia execution node!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Telemetry Bar */}
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#485442] dark:text-[#8A9E7F]" />
            <div>
              <div className="font-bold text-[var(--text-primary)] font-mono">
                {totalTasks.toLocaleString()}
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">Tasks Executed</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-500" />
            <div>
              <div className="font-bold text-[var(--text-primary)] font-mono">142ms</div>
              <div className="text-[10px] text-[var(--text-muted)]">Avg Latency</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <div>
              <div className="font-bold text-[var(--text-primary)] font-mono">99.8%</div>
              <div className="text-[10px] text-[var(--text-muted)]">Node Uptime</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            All ({agents.length})
          </button>
          <button
            onClick={() => setFilter('running')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'running'
                ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            Running ({agents.filter((a) => a.status === 'running').length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'active'
                ? 'bg-[#485442] dark:bg-[#55604e] text-white'
                : 'bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            Active ({activeCount})
          </button>
        </div>

        {/* Agent Cards List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredAgents.map((agent) => {
            const isPaused = agent.status === 'paused';
            const isRunning = agent.status === 'running';

            return (
              <div
                key={agent.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isRunning
                    ? 'bg-[var(--bg-card)] border-[var(--border-color)] shadow-2xs'
                    : 'bg-[var(--bg-app)]/60 border-[var(--border-color)] opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getAgentIcon(agent.iconType)}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-xs text-[var(--text-primary)] tracking-tight">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                          {agent.role}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9.5px] font-bold ${
                            isRunning
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {agent.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-[11.5px] text-[var(--text-muted)] leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => toggleAgentStatus(agent.id)}
                      title={isPaused ? 'Resume Agent' : 'Pause Agent'}
                      className="p-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>

                    <Button
                      variant="primary"
                      size="xs"
                      onClick={() => handleChatWithAgent(agent)}
                      icon={<MessageSquare className="w-3 h-3" />}
                    >
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
