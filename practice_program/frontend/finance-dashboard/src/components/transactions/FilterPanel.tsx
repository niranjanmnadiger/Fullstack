// Filter and search controls for the transactions list
import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { TransactionCategory, TransactionType, SortField } from '@/types';
import { CATEGORY_LABELS } from '@/utils/finance';

const CATEGORIES: TransactionCategory[] = [
  'salary', 'freelance', 'investments', 'food', 'transport',
  'utilities', 'entertainment', 'healthcare', 'shopping', 'education', 'housing', 'other',
];

export const FilterPanel: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { filters } = state;

  const set = (updates: object) => dispatch({ type: 'SET_FILTERS', payload: updates });
  const reset = () => dispatch({ type: 'RESET_FILTERS' });

  const hasActiveFilters =
    filters.search ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search description, merchant..."
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {filters.search && (
          <button
            onClick={() => set({ search: '' })}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Row: Type + Category */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium">Type</label>
          <select
            value={filters.type}
            onChange={(e) => set({ type: e.target.value as TransactionType | 'all' })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              set({ category: e.target.value as TransactionCategory | 'all' })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row: Date range */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium">From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => set({ dateFrom: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium">To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => set({ dateTo: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium">Sort by</label>
          <select
            value={filters.sortField}
            onChange={(e) => set({ sortField: e.target.value as SortField })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
            <option value="type">Type</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-medium">Order</label>
          <select
            value={filters.sortDirection}
            onChange={(e) => set({ sortDirection: e.target.value as 'asc' | 'desc' })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>
    </div>
  );
};
