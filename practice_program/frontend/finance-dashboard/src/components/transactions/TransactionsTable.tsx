// Paginated transactions table with inline edit/delete actions for admin users
import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Transaction } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { useFilteredTransactions } from '@/hooks/useFinancialData';
import { CategoryBadge, TypeBadge } from '@/components/shared/Badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { TransactionModal } from './TransactionModal';
import { FilterPanel } from './FilterPanel';
import { formatCurrency, formatDate } from '@/utils/finance';

const PAGE_SIZE = 10;

export const TransactionsTable: React.FC = () => {
  const { dispatch, isAdmin } = useAppContext();
  const filtered = useFilteredTransactions();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (t: Transaction) => { setEditing(t); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const exportCSV = () => {
    const header = 'Date,Description,Category,Type,Amount,Merchant';
    const rows = filtered.map((t) =>
      [t.date, `"${t.description}"`, t.category, t.type, t.amount, t.merchant ?? ''].join(',')
    );
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Transactions</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          {isAdmin && (
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Layout: filter sidebar + table */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 items-start">
        <FilterPanel />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {paginated.length === 0 ? (
            <EmptyState
              title="No transactions found"
              description="Try changing your filters or search query."
              action={
                isAdmin ? (
                  <button
                    onClick={openAdd}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-all"
                  >
                    Add your first transaction
                  </button>
                ) : undefined
              }
            />
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                        Category
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
                        Type
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Amount
                      </th>
                      {isAdmin && (
                        <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {paginated.map((txn) => (
                      <tr
                        key={txn.id}
                        className="hover:bg-slate-800/30 transition-colors group"
                      >
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                          {formatDate(txn.date)}
                        </td>
                        <td className="px-4 py-3 max-w-[160px]">
                          <p className="text-sm text-slate-200 truncate font-medium">
                            {txn.description}
                          </p>
                          {txn.merchant && (
                            <p className="text-xs text-slate-500 truncate">{txn.merchant}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <CategoryBadge category={txn.category} />
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <TypeBadge type={txn.type} />
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span
                            className={`text-sm font-semibold ${
                              txn.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {txn.type === 'income' ? '+' : '-'}
                            {formatCurrency(txn.amount, true)}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => openEdit(txn)}
                                className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                                title="Edit"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDelete(txn.id)}
                                className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-rose-600 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
                  <span className="text-xs text-slate-500">
                    Showing {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                          p === page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {modalOpen && <TransactionModal transaction={editing} onClose={closeModal} />}
    </div>
  );
};
