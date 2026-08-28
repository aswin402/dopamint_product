import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Conversation } from '../../types/crypto';
import { ConversationItem } from './ConversationItem';

interface HistoryGroupProps {
  title: string;
  conversations: Conversation[];
  activeConversationId: string;
  defaultExpanded?: boolean;
}

export const HistoryGroup: React.FC<HistoryGroupProps> = ({
  title,
  conversations,
  activeConversationId,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (conversations.length === 0) return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#8E8E93] hover:text-[#111111] transition-colors rounded-lg group"
      >
        <span className="tracking-tight">{title}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 text-[#A0A0A5] group-hover:text-[#111111] ${
            isExpanded ? 'transform rotate-0' : 'transform -rotate-90'
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden space-y-0.5 mt-0.5"
          >
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === activeConversationId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
