// Root application component managing navigation state and rendering page views
import React, { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { InsightsPanel } from '@/components/insights/InsightsPanel';

type Tab = 'dashboard' | 'transactions' | 'insights';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TopBar activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)} />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <DashboardOverview onNavigateToTransactions={() => setActiveTab('transactions')} />
        )}
        {activeTab === 'transactions' && <TransactionsTable />}
        {activeTab === 'insights' && <InsightsPanel />}
      </main>
    </div>
  );
};

export const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);
