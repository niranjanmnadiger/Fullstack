// Main dashboard view composing summary cards, trend chart, breakdown chart, and recent activity
import React from 'react';
import { SummaryCards } from './SummaryCards';
import { BalanceTrendChart } from './BalanceTrendChart';
import { SpendingBreakdownChart } from './SpendingBreakdownChart';
import { RecentTransactions } from './RecentTransactions';

interface DashboardOverviewProps {
  onNavigateToTransactions: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateToTransactions,
}) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-base font-semibold text-white">Overview</h2>
      <p className="text-xs text-slate-500 mt-0.5">Your financial snapshot for this month</p>
    </div>

    {/* KPI Cards */}
    <SummaryCards />

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
      <BalanceTrendChart />
      <SpendingBreakdownChart />
    </div>

    {/* Recent activity */}
    <RecentTransactions onViewAll={onNavigateToTransactions} />
  </div>
);
