import { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import {
  computeTotals,
  buildMonthlyData,
  buildCategoryBreakdown,
  buildInsights,
  applyFilters,
  computeMonthlyChange,
} from '@/utils/finance';
import { isSameMonth } from 'date-fns';
import { parseISO } from 'date-fns';

// Hook: all financial summary data
export const useFinancialSummary = () => {
  const { state } = useAppContext();
  const today = new Date();

  return useMemo(() => {
    const currentMonthTxns = state.transactions.filter((t) =>
      isSameMonth(parseISO(t.date), today)
    );
    const totals = computeTotals(currentMonthTxns);
    const allTimeTotals = computeTotals(state.transactions);

    return {
      currentMonth: totals,
      allTime: allTimeTotals,
      incomeChange: computeMonthlyChange(state.transactions, 'income'),
      expensesChange: computeMonthlyChange(state.transactions, 'expense'),
    };
  }, [state.transactions]);
};

// Hook: monthly chart data (last 6 months)
export const useMonthlyData = () => {
  const { state } = useAppContext();
  return useMemo(() => buildMonthlyData(state.transactions), [state.transactions]);
};

// Hook: category breakdown for charts
export const useCategoryBreakdown = () => {
  const { state } = useAppContext();
  return useMemo(() => buildCategoryBreakdown(state.transactions), [state.transactions]);
};

// Hook: smart insights
export const useInsights = () => {
  const { state } = useAppContext();
  return useMemo(() => buildInsights(state.transactions), [state.transactions]);
};

// Hook: filtered & sorted transactions
export const useFilteredTransactions = () => {
  const { state } = useAppContext();
  return useMemo(
    () => applyFilters(state.transactions, state.filters),
    [state.transactions, state.filters]
  );
};
