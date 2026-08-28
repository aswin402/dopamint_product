import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCryptoStore } from '../../store/useCryptoStore';

interface SuggestedPromptsProps {
  prompts: string[];
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts }) => {
  const sendMessage = useCryptoStore((s) => s.sendMessage);

  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="mt-5 pt-3 border-t border-[var(--border-color)]">
      <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-[var(--primary)] select-none">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Suggested Questions:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sendMessage(prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-app)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] text-[var(--text-secondary)] hover:border-[var(--primary)] text-xs font-medium rounded-xl border border-[var(--border-color)] transition-all shadow-2xs group text-left"
          >
            <span>{prompt}</span>
            <ArrowRight className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
