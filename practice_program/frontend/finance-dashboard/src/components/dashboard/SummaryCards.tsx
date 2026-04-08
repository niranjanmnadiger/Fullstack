// Summary cards showing key financial KPIs with month-over-month change indicators
import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/components/shared/Card';
import { useFinancialSummary } from '@/hooks/useFinancialData';
import { formatCurrency } from '@/utils/finance';

interface MetricCardProps {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  accentClass: string;
  iconBgClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  icon,
  accentClass,
  iconBgClass,
}) => {
  const isPositive = change >= 0;
  const absChange = Math.abs(change);

  return (
    <Card hover className="relative overflow-hidden">
      <div className={`absolute inset-0 opacity-5 ${accentClass}`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBgClass}`}>
            {icon}
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {absChange.toFixed(1)}%
          </div>
        </div>
        <p className="text-2xl font-bold text-white tracking-tight">
          {formatCurrency(value, true)}
        </p>
        <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">{label}</p>
      </div>
    </Card>
  );
};

export const SummaryCards: React.FC = () => {
  const { currentMonth, incomeChange, expensesChange } = useFinancialSummary();
  const balanceChange = incomeChange - expensesChange;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard
        label="Net Balance"
        value={currentMonth.balance}
        change={balanceChange}
        icon={<Wallet className="w-4.5 h-4.5 text-indigo-400" />}
        accentClass="bg-indigo-500"
        iconBgClass="bg-indigo-500/15"
      />
      <MetricCard
        label="Income"
        value={currentMonth.income}
        change={incomeChange}
        icon={<TrendingUp className="w-4.5 h-4.5 text-emerald-400" />}
        accentClass="bg-emerald-500"
        iconBgClass="bg-emerald-500/15"
      />
      <MetricCard
        label="Expenses"
        value={currentMonth.expenses}
        change={-expensesChange}
        icon={<TrendingDown className="w-4.5 h-4.5 text-rose-400" />}
        accentClass="bg-rose-500"
        iconBgClass="bg-rose-500/15"
      />
    </div>
  );
};
