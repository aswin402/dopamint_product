import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

interface SuggestedPromptsProps {
  prompts: string[];
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts }) => {
  const sendMessage = useCryptoStore((s) => s.sendMessage);
  const isStreaming = useCryptoStore((s) => s.isStreaming);

  if (!prompts || prompts.length === 0 || isStreaming) return null;

  return (
    <div className="mt-4 pt-2 border-t border-[#F0F2F6]">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8E8E93] mb-2.5">
        <Sparkles className="w-3.5 h-3.5 text-[#5B5CEB]" />
        <span>Suggested follow-ups</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sendMessage(prompt)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FFFFFF] hover:bg-[#EEF0FD] border border-[#ECECEC] hover:border-[#5B5CEB]/30 text-[#333333] hover:text-[#5B5CEB] text-xs font-medium rounded-xl shadow-2xs transition-all duration-180 text-left"
          >
            <span>{prompt}</span>
            <ArrowRight className="w-3 h-3 opacity-60 flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
