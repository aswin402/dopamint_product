import React from 'react';
import type { KeyPointItem } from '../../types/crypto';
import { Network, ShieldCheck, FileText, Box, Zap, AlertCircle } from 'lucide-react';

interface KeyPointsCardProps {
  items: KeyPointItem[];
}

export const KeyPointsCard: React.FC<KeyPointsCardProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const getIconBadge = (iconType: string) => {
    switch (iconType) {
      case 'orange':
        return {
          bg: 'bg-[#FFF4E6]',
          textColor: 'text-[#F97316]',
          icon: <Network className="w-4 h-4 stroke-[2.2]" />,
        };
      case 'green':
        return {
          bg: 'bg-[#ECFDF5]',
          textColor: 'text-[#10B981]',
          icon: <ShieldCheck className="w-4 h-4 stroke-[2.2]" />,
        };
      case 'blue':
        return {
          bg: 'bg-[#EFF6FF]',
          textColor: 'text-[#3B82F6]',
          icon: <FileText className="w-4 h-4 stroke-[2.2]" />,
        };
      case 'purple':
        return {
          bg: 'bg-[#F5F3FF]',
          textColor: 'text-[#8B5CF6]',
          icon: <Box className="w-4 h-4 stroke-[2.2]" />,
        };
      case 'yellow':
        return {
          bg: 'bg-[#FFFBEB]',
          textColor: 'text-[#F59E0B]',
          icon: <Zap className="w-4 h-4 stroke-[2.2]" />,
        };
      case 'red':
        return {
          bg: 'bg-[#FEF2F2]',
          textColor: 'text-[#EF4444]',
          icon: <AlertCircle className="w-4 h-4 stroke-[2.2]" />,
        };
      default:
        return {
          bg: 'bg-[#EEF0FD]',
          textColor: 'text-[#5B5CEB]',
          icon: <ShieldCheck className="w-4 h-4 stroke-[2.2]" />,
        };
    }
  };

  return (
    <div className="my-4 space-y-3">
      <h4 className="text-[14.5px] font-bold text-[#111111] tracking-tight">Key Points:</h4>
      <div className="space-y-2.5">
        {items.map((item) => {
          const badge = getIconBadge(item.iconType);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-1.5 rounded-xl hover:bg-[#F9FAFC] transition-colors"
            >
              <div
                className={`w-7 h-7 rounded-full ${badge.bg} ${badge.textColor} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs`}
              >
                {badge.icon}
              </div>
              <div className="text-[14px] leading-relaxed text-[#111111] pt-0.5">
                <span className="font-bold text-[#111111] mr-1.5">{item.title}:</span>
                <span className="text-[#333333] font-normal">{item.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
