// Reusable badge component for labels and status indicators
import React from 'react';
import { TransactionCategory, TransactionType } from '@/types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/utils/finance';

interface BadgeProps {
  label: string;
  color?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color, size = 'sm', className = '' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses} ${className}`}
      style={color ? { backgroundColor: `${color}22`, color } : undefined}
    >
      {label}
    </span>
  );
};

interface CategoryBadgeProps {
  category: TransactionCategory;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'sm' }) => (
  <Badge
    label={CATEGORY_LABELS[category] ?? category}
    color={CATEGORY_COLORS[category]}
    size={size}
  />
);

interface TypeBadgeProps {
  type: TransactionType;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => (
  <Badge
    label={type === 'income' ? 'Income' : 'Expense'}
    className={
      type === 'income'
        ? 'bg-emerald-500/15 text-emerald-400'
        : 'bg-rose-500/15 text-rose-400'
    }
  />
);
