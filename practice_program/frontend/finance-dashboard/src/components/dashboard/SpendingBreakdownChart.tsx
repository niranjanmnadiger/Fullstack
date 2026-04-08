// Donut chart showing expense distribution across spending categories
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader } from '@/components/shared/Card';
import { useCategoryBreakdown } from '@/hooks/useFinancialData';
import { CATEGORY_COLORS, CATEGORY_LABELS, formatCurrency } from '@/utils/finance';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
      <p className="text-sm font-semibold text-white">{CATEGORY_LABELS[d.name] ?? d.name}</p>
      <p className="text-sm text-slate-300">{formatCurrency(d.value)}</p>
      <p className="text-xs text-slate-500">{d.payload.percentage.toFixed(1)}% of spend</p>
    </div>
  );
};

export const SpendingBreakdownChart: React.FC = () => {
  const breakdown = useCategoryBreakdown();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const top5 = breakdown.slice(0, 5);

  if (breakdown.length === 0) {
    return (
      <Card>
        <CardHeader title="Spending Breakdown" subtitle="No expense data available" />
        <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
          No data to display
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Spending Breakdown" subtitle="Expenses by category" />
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={breakdown}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="amount"
              nameKey="category"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {breakdown.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={CATEGORY_COLORS[entry.category] ?? '#94a3b8'}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex-1 space-y-2 w-full">
          {top5.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between text-sm"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] ?? '#94a3b8' }}
                />
                <span className="text-slate-400 text-xs">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-slate-800 rounded-full h-1">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: CATEGORY_COLORS[item.category] ?? '#94a3b8',
                    }}
                  />
                </div>
                <span className="text-slate-300 text-xs font-medium w-8 text-right">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
