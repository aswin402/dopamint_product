import React from 'react';
import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
  audioLevel: number;
  isListening: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ audioLevel, isListening }) => {
  if (!isListening) return null;

  const barCount = 18;
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className="flex items-center gap-1 h-6 px-3 py-1 bg-[#EEF0FD] border border-[#5B5CEB]/20 rounded-full">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-1" />
      <span className="text-[11px] font-semibold text-[#5B5CEB] mr-2">Listening...</span>

      <div className="flex items-center gap-0.5 h-4">
        {bars.map((i) => {
          // Dynamic height calculated based on audio level & sine wave index
          const baseHeight = 4;
          const factor = Math.sin((i / barCount) * Math.PI) * (audioLevel * 16 + 2);
          const height = Math.max(3, Math.min(16, baseHeight + factor));

          return (
            <motion.div
              key={i}
              animate={{ height }}
              transition={{ duration: 0.08, ease: 'linear' }}
              className="w-0.75 bg-[#5B5CEB] rounded-full"
            />
          );
        })}
      </div>
    </div>
  );
};
