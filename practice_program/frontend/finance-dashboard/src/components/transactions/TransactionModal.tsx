// Admin-only modal for creating and editing transaction records
import React, { useState, useEffect } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { Transaction, TransactionCategory, TransactionType } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { CATEGORY_LABELS } from '@/utils/finance';

const CATEGORIES: TransactionCategory[] = [
  'salary', 'freelance', 'investments', 'food', 'transport',
  'utilities', 'entertainment', 'healthcare', 'shopping', 'education', 'housing', 'other',
];

interface FormState {
  description: string;
  amount: string;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  merchant: string;
}

interface TransactionModalProps {
  transaction?: Transaction | null;
  onClose: () => void;
}

const emptyForm = (): FormState => ({
  description: '',
  amount: '',
  type: 'expense',
  category: 'food',
  date: new Date().toISOString().split('T')[0],
  merchant: '',
});

export const TransactionModal: React.FC<TransactionModalProps> = ({ transaction, onClose }) => {
  const { dispatch } = useAppContext();
  const [form, setForm] = useState<FormState>(emptyForm());
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const isEditing = !!transaction;

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: String(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        merchant: transaction.merchant ?? '',
      });
    }
  }, [transaction]);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload: Transaction = {
      id: transaction?.id ?? `t${Date.now()}`,
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      merchant: form.merchant.trim() || undefined,
    };

    dispatch({
      type: isEditing ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION',
      payload,
    });
    onClose();
  };

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors';
  const errorClass = 'text-xs text-rose-400 mt-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              {isEditing ? (
                <Save className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </div>
            <h2 className="text-sm font-semibold text-white">
              {isEditing ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Type toggle */}
          <div>
            <label className="block text-xs text-slate-500 mb-2 font-medium">Type</label>
            <div className="flex rounded-lg overflow-hidden border border-slate-700">
              {(['income', 'expense'] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => set('type', t)}
                  className={`flex-1 py-2 text-sm font-medium capitalize transition-all ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                      : 'text-slate-500 hover:text-slate-300 bg-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5 font-medium">Description *</label>
            <input
              type="text"
              placeholder="e.g. Grocery shopping"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className={`${inputClass} ${errors.description ? 'border-rose-500' : ''}`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium">Amount (₹) *</label>
              <input
                type="number"
                placeholder="0"
                value={form.amount}
                min="0"
                onChange={(e) => set('amount', e.target.value)}
                className={`${inputClass} ${errors.amount ? 'border-rose-500' : ''}`}
              />
              {errors.amount && <p className={errorClass}>{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className={`${inputClass} ${errors.date ? 'border-rose-500' : ''}`}
              />
              {errors.date && <p className={errorClass}>{errors.date}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5 font-medium">Category</label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value as TransactionCategory)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5 font-medium">
              Merchant <span className="text-slate-600">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Amazon, Swiggy..."
              value={form.merchant}
              onChange={(e) => set('merchant', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-sm text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm text-white font-medium transition-all"
          >
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
};
