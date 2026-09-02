import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'none' | 'soft' | 'card' | 'flyout';
  hoverLift?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

const elevationStyles = {
  none: '',
  soft: 'shadow-soft',
  card: 'shadow-card',
  flyout: 'shadow-flyout',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3.5',
  md: 'p-5',
  lg: 'p-6 sm:p-8',
};

export const Card: React.FC<CardProps> = ({
  elevation = 'card',
  hoverLift = false,
  padding = 'md',
  bordered = true,
  className = '',
  children,
  ...props
}) => {
  const liftClasses = hoverLift
    ? 'hover:-translate-y-0.5 hover:shadow-flyout transition-all duration-200'
    : 'transition-colors duration-200';

  return (
    <div
      className={`bg-[var(--bg-card)] text-[var(--text-primary)] rounded-[22px] ${
        bordered ? 'border border-[var(--border-color)]' : ''
      } ${elevationStyles[elevation]} ${paddingStyles[padding]} ${liftClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
