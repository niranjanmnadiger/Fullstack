// Core domain types for Finance Dashboard

export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'salary'
  | 'freelance'
  | 'investments'
  | 'food'
  | 'transport'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'shopping'
  | 'education'
  | 'housing'
  | 'other';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
  merchant?: string;
}

export type UserRole = 'viewer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface SummaryCard {
  label: string;
  value: number;
  change: number; // percentage change from last month
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  count: number;
}

export interface InsightData {
  highestCategory: TransactionCategory;
  highestCategoryAmount: number;
  monthlyComparison: {
    currentMonth: number;
    previousMonth: number;
    percentageChange: number;
  };
  averageDailySpend: number;
  savingsRate: number;
  topMerchant?: string;
}

export type SortField = 'date' | 'amount' | 'category' | 'type';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: TransactionCategory | 'all';
  dateFrom: string;
  dateTo: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export type Theme = 'light' | 'dark';

export interface AppState {
  role: UserRole;
  theme: Theme;
  transactions: Transaction[];
  filters: FilterState;
}
