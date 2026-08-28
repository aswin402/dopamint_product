import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Pencil,
  Trash2,
  Copy,
  TrendingUp,
  Wallet,
  Layers,
  FileText,
  CircleDot,
  Check,
} from 'lucide-react';
import type { Conversation } from '../../types/crypto';
import { useCryptoStore } from '../../store/useCryptoStore';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const setActiveConversation = useCryptoStore((s) => s.setActiveConversation);
  const togglePin = useCryptoStore((s) => s.togglePinConversation);
  const duplicateChat = useCryptoStore((s) => s.duplicateConversation);
  const openRenameModal = useCryptoStore((s) => s.openRenameModal);
  const openDeleteModal = useCryptoStore((s) => s.openDeleteModal);

  const renderTimestamp = () => {
    try {
      const d = new Date(conversation.updatedAt);
      if (conversation.group === 'today' || conversation.group === 'yesterday') {
        return d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      }
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } catch {
      return '';
    }
  };

  const renderIcon = () => {
    switch (conversation.iconName) {
      case 'bitcoin':
        return (
          <div className="w-5 h-5 rounded-full bg-[#FFF4E6] dark:bg-[#382613] flex items-center justify-center flex-shrink-0 text-[#F97316]">
            <span className="text-[11px] font-bold">₿</span>
          </div>
        );
      case 'ethereum':
        return (
          <div className="w-5 h-5 rounded-full bg-[#EEF2FF] dark:bg-[#1a203a] flex items-center justify-center flex-shrink-0 text-[#6366F1]">
            <span className="text-[11px] font-bold">♦</span>
          </div>
        );
      case 'defi':
        return (
          <div className="w-5 h-5 rounded-full bg-[#E0F2FE] dark:bg-[#122b3d] flex items-center justify-center flex-shrink-0 text-[#0284C7]">
            <span className="text-[11px] font-bold">A</span>
          </div>
        );
      case 'staking':
        return (
          <div className="w-5 h-5 rounded-full bg-[#ECFDF5] dark:bg-[#133327] flex items-center justify-center flex-shrink-0 text-[#10B981]">
            <CircleDot className="w-3 h-3" />
          </div>
        );
      case 'solana':
        return (
          <div className="w-5 h-5 rounded-full bg-[#F5F3FF] dark:bg-[#2c1c3f] flex items-center justify-center flex-shrink-0 text-[#9333EA]">
            <span className="text-[10px] font-extrabold">≡</span>
          </div>
        );
      case 'tax':
        return (
          <div className="w-5 h-5 rounded-full bg-[var(--bg-app)] flex items-center justify-center flex-shrink-0 text-[var(--text-secondary)] border border-[var(--border-color)]">
            <FileText className="w-3 h-3" />
          </div>
        );
      case 'wallet':
        return (
          <div className="w-5 h-5 rounded-full bg-[#F5F3FF] dark:bg-[#2c1c3f] flex items-center justify-center flex-shrink-0 text-[#7C3AED]">
            <Wallet className="w-3 h-3" />
          </div>
        );
      case 'trending':
        return (
          <div className="w-5 h-5 rounded-full bg-[#ECFDF5] dark:bg-[#133327] flex items-center justify-center flex-shrink-0 text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
          </div>
        );
      case 'layers':
        return (
          <div className="w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center flex-shrink-0 text-[var(--primary)]">
            <Layers className="w-3 h-3" />
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center flex-shrink-0 text-[var(--primary)]">
            <CircleDot className="w-3 h-3" />
          </div>
        );
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateChat(conversation.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveConversation(conversation.id)}
      className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-180 cursor-pointer ${
        isActive
          ? 'bg-[var(--primary-light)] text-[var(--text-primary)] font-semibold shadow-xs'
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
        {renderIcon()}
        <span className="truncate text-[13.5px] tracking-tight">{conversation.title}</span>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {!isHovered ? (
          <div className="flex items-center gap-1">
            {conversation.isPinned && (
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            )}
            <span className="text-[11.5px] text-[var(--text-muted)] font-normal">
              {renderTimestamp()}
            </span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePin(conversation.id);
              }}
              title={conversation.isPinned ? 'Remove from Favourites' : 'Add to Favourites'}
              className={`p-1 rounded-md transition-colors ${
                conversation.isPinned
                  ? 'text-amber-500 hover:bg-amber-500/10'
                  : 'text-[var(--text-muted)] hover:text-amber-400 hover:bg-[var(--bg-hover)]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${conversation.isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openRenameModal(conversation.id);
              }}
              title="Rename"
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDuplicate}
              title="Duplicate"
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(conversation.id);
              }}
              title="Delete"
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
