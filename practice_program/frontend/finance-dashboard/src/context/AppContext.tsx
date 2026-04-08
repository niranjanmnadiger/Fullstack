import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Transaction, UserRole, Theme, FilterState } from '@/types';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

// Action types
type Action =
  | { type: 'SET_ROLE'; payload: UserRole }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' };

const DEFAULT_FILTERS: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  dateFrom: '',
  dateTo: '',
  sortField: 'date',
  sortDirection: 'desc',
};

const initialState: AppState = {
  role: 'admin',
  theme: 'dark',
  transactions: MOCK_TRANSACTIONS,
  filters: DEFAULT_FILTERS,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: DEFAULT_FILTERS };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const stored = localStorage.getItem('finapp_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...init, theme: parsed.theme ?? init.theme, role: parsed.role ?? init.role };
      }
    } catch {
      // ignore parse errors
    }
    return init;
  });

  // Persist theme and role to localStorage
  useEffect(() => {
    localStorage.setItem('finapp_state', JSON.stringify({ theme: state.theme, role: state.role }));
  }, [state.theme, state.role]);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const isAdmin = state.role === 'admin';

  return (
    <AppContext.Provider value={{ state, dispatch, isAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
};
