import React from 'react';

export type BadgeVariant =
  | 'trend-up'
  | 'trend-down'
  | 'neutral'
  | 'gold'
  | 'primary'
  | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  'trend-up':
    'bg-[var(--green-light)] text-[var(--green-trend)] border-transparent font-mono',
  'trend-down':
    'bg-[var(--red-light)] text-[var(--red-trend)] border-transparent font-mono',
  neutral:
    'bg-[var(--bg-app)] text-[var(--text-secondary)] border-[var(--border-color)]',
  gold:
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  primary:
    'bg-[#485442]/10 dark:bg-[#55604e]/20 text-[#485442] dark:text-[#8A9E7F] border-[#485442]/20 dark:border-[#55604e]/30',
  outline:
    'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)]',
};

const badgeSizes = {
  sm: 'text-[11px] px-2 py-0.5 rounded-lg gap-1',
  md: 'text-xs px-2.5 py-1 rounded-xl gap-1.5',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'sm',
  icon,
  className = '',
  children,
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center font-medium border select-none ${badgeVariants[variant]} ${badgeSizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
