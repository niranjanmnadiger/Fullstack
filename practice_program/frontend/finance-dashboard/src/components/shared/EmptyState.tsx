// Empty state shown when no transactions match the current filter criteria
import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  description = 'Try adjusting your filters or search term.',
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
      <SearchX className="w-6 h-6 text-slate-500" />
    </div>
    <p className="text-slate-300 font-medium mb-1">{title}</p>
    <p className="text-slate-500 text-sm max-w-xs">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);
