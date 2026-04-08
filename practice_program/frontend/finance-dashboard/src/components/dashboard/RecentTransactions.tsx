// Compact recent transactions list shown on the main dashboard for quick overview
import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardHeader } from '@/components/shared/Card';
import { CategoryBadge } from '@/components/shared/Badge';
import { useAppContext } from '@/context/AppContext';
import { formatCurrency, formatShortDate } from '@/utils/finance';

interface RecentTransactionsProps {
  onViewAll: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ onViewAll }) => {
  const { state } = useAppContext();
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <Card padding="none">
      <div className="p-5 pb-0">
        <CardHeader
          title="Recent Activity"
          subtitle={`${state.transactions.length} total transactions`}
          action={
            <button
              onClick={onViewAll}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View all
            </button>
          }
        />
      </div>
      <div className="divide-y divide-slate-800/60">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800/30 transition-colors"
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                txn.type === 'income' ? 'bg-emerald-500/15' : 'bg-rose-500/15'
              }`}
            >
              {txn.type === 'income' ? (
                <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-rose-400" />
              )}
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 font-medium truncate">{txn.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500">{formatShortDate(txn.date)}</span>
                <CategoryBadge category={txn.category} />
              </div>
            </div>

            {/* Amount */}
            <span
              className={`text-sm font-semibold flex-shrink-0 ${
                txn.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {txn.type === 'income' ? '+' : '-'}
              {formatCurrency(txn.amount, true)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
