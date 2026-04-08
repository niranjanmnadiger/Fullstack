// Base card container with consistent border and background styling
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const padMap = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' };
  const hoverClass = hover ? 'hover:border-slate-600 transition-colors duration-200' : '';

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-2xl ${padMap[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);
