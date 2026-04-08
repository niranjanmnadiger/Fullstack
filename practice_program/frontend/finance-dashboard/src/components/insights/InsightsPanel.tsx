// Smart insights panel with savings rate, top categories, and monthly spend comparison
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  //Cell,
} from 'recharts';
import { Zap, TrendingUp, TrendingDown, Target, ShoppingBag, Calendar } from 'lucide-react';
import { Card, CardHeader } from '@/components/shared/Card';
import { useInsights, useCategoryBreakdown, useMonthlyData } from '@/hooks/useFinancialData';
import { formatCurrency, CATEGORY_LABELS, CATEGORY_COLORS } from '@/utils/finance';

const InsightCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  iconBg: string;
}> = ({ icon, label, value, subtext, iconBg }) => (
  <Card hover>
    <div className="flex items-start gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-white mt-0.5 truncate">{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{subtext}</p>
      </div>
    </div>
  </Card>
);

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export const InsightsPanel: React.FC = () => {
  const insights = useInsights();
  const breakdown = useCategoryBreakdown();
  const monthly = useMonthlyData();

  const spendDelta = insights.monthlyComparison.percentageChange;
  const spendUp = spendDelta > 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-white">Insights</h2>
        <p className="text-xs text-slate-500 mt-0.5">Smart observations from your financial data</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <InsightCard
          icon={<Target className="w-4.5 h-4.5 text-indigo-400" />}
          label="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          subtext="of total income saved"
          iconBg="bg-indigo-500/15"
        />
        <InsightCard
          icon={<Calendar className="w-4.5 h-4.5 text-amber-400" />}
          label="Daily Spend"
          value={formatCurrency(insights.averageDailySpend, true)}
          subtext="average this month"
          iconBg="bg-amber-500/15"
        />
        <InsightCard
          icon={
            spendUp ? (
              <TrendingUp className="w-4.5 h-4.5 text-rose-400" />
            ) : (
              <TrendingDown className="w-4.5 h-4.5 text-emerald-400" />
            )
          }
          label="vs Last Month"
          value={`${spendUp ? '+' : ''}${spendDelta.toFixed(1)}%`}
          subtext={`${formatCurrency(insights.monthlyComparison.currentMonth, true)} this month`}
          iconBg={spendUp ? 'bg-rose-500/15' : 'bg-emerald-500/15'}
        />
        <InsightCard
          icon={<ShoppingBag className="w-4.5 h-4.5 text-violet-400" />}
          label="Top Category"
          value={CATEGORY_LABELS[insights.highestCategory] ?? insights.highestCategory}
          subtext={formatCurrency(insights.highestCategoryAmount, true) + ' spent'}
          iconBg="bg-violet-500/15"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly bar chart */}
        <Card>
          <CardHeader title="Monthly Comparison" subtitle="Income vs Expenses by month" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCurrency(v, true)}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="income" name="income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category bar chart */}
        <Card>
          <CardHeader title="Spending by Category" subtitle="Top expense categories" />
          <div className="space-y-2.5 mt-1">
            {breakdown.slice(0, 6).map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400 font-medium">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{item.percentage.toFixed(1)}%</span>
                    <span className="text-xs text-slate-300 font-semibold w-16 text-right">
                      {formatCurrency(item.amount, true)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: CATEGORY_COLORS[item.category] ?? '#94a3b8',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top merchant */}
      {insights.topMerchant && (
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Most Visited Merchant
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">{insights.topMerchant}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
