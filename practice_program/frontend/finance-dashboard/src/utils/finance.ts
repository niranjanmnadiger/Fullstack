import { Transaction, TransactionCategory, MonthlyData, CategoryBreakdown, InsightData, FilterState } from '@/types';
import { format, parseISO, isSameMonth, subMonths } from 'date-fns';

// Currency formatter for INR
export const formatCurrency = (amount: number, compact = false): string => {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr: string): string =>
  format(parseISO(dateStr), 'dd MMM yyyy');

export const formatShortDate = (dateStr: string): string =>
  format(parseISO(dateStr), 'dd MMM');

export const formatMonth = (dateStr: string): string =>
  format(parseISO(dateStr), 'MMM yyyy');

// Compute totals from transaction list
export const computeTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return { income, expenses, balance: income - expenses };
};

// Build monthly data for time-based chart (last 6 months)
export const buildMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const today = new Date();
  const months: MonthlyData[] = [];

  for (let i = 5; i >= 0; i--) {
    const targetMonth = subMonths(today, i);
    const monthTransactions = transactions.filter((t) =>
      isSameMonth(parseISO(t.date), targetMonth)
    );

    const { income, expenses, balance } = computeTotals(monthTransactions);
    months.push({
      month: format(targetMonth, 'MMM yy'),
      income,
      expenses,
      balance,
    });
  }

  return months;
};

// Build category breakdown for pie/donut chart
export const buildCategoryBreakdown = (transactions: Transaction[]): CategoryBreakdown[] => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = new Map<TransactionCategory, { amount: number; count: number }>();

  expenses.forEach((t) => {
    const existing = categoryMap.get(t.category) ?? { amount: 0, count: 0 };
    categoryMap.set(t.category, {
      amount: existing.amount + t.amount,
      count: existing.count + 1,
    });
  });

  return Array.from(categoryMap.entries())
    .map(([category, { amount, count }]) => ({
      category,
      amount,
      count,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

// Generate insights from transaction data
export const buildInsights = (transactions: Transaction[]): InsightData => {
  const today = new Date();
  const currentMonthTxns = transactions.filter((t) =>
    isSameMonth(parseISO(t.date), today)
  );
  const prevMonthTxns = transactions.filter((t) =>
    isSameMonth(parseISO(t.date), subMonths(today, 1))
  );

  const currentExpenses = currentMonthTxns
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const prevExpenses = prevMonthTxns
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = buildCategoryBreakdown(transactions);
  const topCategory = categoryBreakdown[0];

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Find most frequent merchant
  const merchantCount = new Map<string, number>();
  transactions.forEach((t) => {
    if (t.merchant) {
      merchantCount.set(t.merchant, (merchantCount.get(t.merchant) ?? 0) + 1);
    }
  });
  const topMerchant = Array.from(merchantCount.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return {
    highestCategory: topCategory?.category ?? 'other',
    highestCategoryAmount: topCategory?.amount ?? 0,
    monthlyComparison: {
      currentMonth: currentExpenses,
      previousMonth: prevExpenses,
      percentageChange:
        prevExpenses > 0 ? ((currentExpenses - prevExpenses) / prevExpenses) * 100 : 0,
    },
    averageDailySpend: currentExpenses / Math.min(today.getDate(), daysInMonth),
    savingsRate: totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0,
    topMerchant,
  };
};

// Apply filters & sorting to transactions
export const applyFilters = (transactions: Transaction[], filters: FilterState): Transaction[] => {
  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.merchant?.toLowerCase().includes(q)
    );
  }

  if (filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }

  if (filters.category !== 'all') {
    result = result.filter((t) => t.category === filters.category);
  }

  if (filters.dateFrom) {
    result = result.filter((t) => t.date >= filters.dateFrom);
  }

  if (filters.dateTo) {
    result = result.filter((t) => t.date <= filters.dateTo);
  }

  result.sort((a, b) => {
    let comparison = 0;
    switch (filters.sortField) {
      case 'date':
        comparison = a.date.localeCompare(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
    }
    return filters.sortDirection === 'desc' ? -comparison : comparison;
  });

  return result;
};

// Category display name mapping
export const CATEGORY_LABELS: Record<string, string> = {
  salary: 'Salary',
  freelance: 'Freelance',
  investments: 'Investments',
  food: 'Food & Dining',
  transport: 'Transport',
  utilities: 'Utilities',
  entertainment: 'Entertainment',
  healthcare: 'Healthcare',
  shopping: 'Shopping',
  education: 'Education',
  housing: 'Housing',
  other: 'Other',
};

// Category color mapping for charts
export const CATEGORY_COLORS: Record<string, string> = {
  salary: '#6366f1',
  freelance: '#8b5cf6',
  investments: '#a78bfa',
  food: '#f59e0b',
  transport: '#10b981',
  utilities: '#06b6d4',
  entertainment: '#ec4899',
  healthcare: '#ef4444',
  shopping: '#f97316',
  education: '#84cc16',
  housing: '#64748b',
  other: '#94a3b8',
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-emerald-400';
  if (change < 0) return 'text-rose-400';
  return 'text-slate-400';
};

export const getChangePrefix = (change: number): string => {
  if (change > 0) return '+';
  return '';
};

// Compute month-over-month change for summary cards
export const computeMonthlyChange = (
  transactions: Transaction[],
  type: 'income' | 'expense'
): number => {
  const today = new Date();
  const current = transactions
    .filter((t) => t.type === type && isSameMonth(parseISO(t.date), today))
    .reduce((sum, t) => sum + t.amount, 0);

  const prev = transactions
    .filter((t) => t.type === type && isSameMonth(parseISO(t.date), subMonths(today, 1)))
    .reduce((sum, t) => sum + t.amount, 0);

  return prev > 0 ? ((current - prev) / prev) * 100 : 0;
};

export const clsx = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');
