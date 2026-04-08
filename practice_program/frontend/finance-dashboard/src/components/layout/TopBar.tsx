// Top navigation bar with role switcher, theme toggle, and user profile display
import React from 'react';
import { Sun, Moon, TrendingUp, ChevronDown } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { UserRole } from '@/types';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights', label: 'Insights' },
];

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onTabChange }) => {
  const { state, dispatch } = useAppContext();

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch({ type: 'SET_ROLE', payload: e.target.value as UserRole });

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
              FinFlow
            </span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Role Switcher */}
            <div className="relative flex items-center">
              <select
                value={state.role}
                onChange={handleRoleChange}
                className="appearance-none bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg pl-3 pr-7 py-1.5 cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown className="absolute right-2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>

            {/* Role indicator pill */}
            <span
              className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                state.role === 'admin'
                  ? 'bg-indigo-500/15 text-indigo-400'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {state.role === 'admin' ? 'Full Access' : 'Read Only'}
            </span>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-all"
              aria-label="Toggle theme"
            >
              {state.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
