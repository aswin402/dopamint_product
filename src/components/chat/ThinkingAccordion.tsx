import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import type { ThinkingStep } from '../../types/crypto';

interface ThinkingAccordionProps {
  steps: ThinkingStep[];
}

export const ThinkingAccordion: React.FC<ThinkingAccordionProps> = ({ steps }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mb-4 bg-[#F7F8FA] border border-[#ECECEC] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#5B5CEB] hover:bg-[#EEF0FD]/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#5B5CEB]" />
          <span>Deep Research Thought Process ({steps.length} steps)</span>
        </div>
        <div className="flex items-center gap-2 text-[#8E8E93]">
          <span className="text-[11px] font-normal">Completed in 1.45s</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-3 pt-1 space-y-2 border-t border-[#ECECEC]"
          >
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-2.5 text-xs">
                <div className="mt-0.5 flex-shrink-0">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Loader2 className="w-3.5 h-3.5 text-[#5B5CEB] animate-spin" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#111111]">{step.title}</p>
                  <p className="text-[#666666] text-[11.5px] mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
