# FinFlow — Finance Dashboard UI

A clean, production-grade personal finance dashboard built with **React + TypeScript + Vite**.
Designed for the Zorvyn Frontend Developer Intern assignment.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 | Component model, hooks, ecosystem |
| Language | TypeScript | Type safety, better DX, signals production discipline |
| Build | Vite | Fast HMR, ESM-native, minimal config |
| Charts | Recharts | Composable, responsive, declarative |
| Styling | Tailwind CSS | Utility-first, no runtime overhead |
| Icons | Lucide React | Consistent, tree-shakeable SVG icons |
| Date util | date-fns | Lightweight, functional date manipulation |
| State | useReducer + Context | Simple, scalable, no extra dependencies |

---

## Project Structure

```
src/
  types/           Core TypeScript domain types (Transaction, User, Role, etc.)
  data/            Mock dataset — 52 transactions across 6 months
  utils/
    finance.ts     Pure functions: formatting, filtering, aggregation, insights
  context/
    AppContext.tsx  Global state: role, theme, transactions, filters
  hooks/
    useFinancialData.ts  Derived data hooks (memoized)
  components/
    layout/
      TopBar.tsx          Navigation, role switcher, theme toggle
    dashboard/
      DashboardOverview.tsx   Composes the main dashboard page
      SummaryCards.tsx        KPI cards (balance, income, expenses)
      BalanceTrendChart.tsx   6-month area chart (income vs expenses)
      SpendingBreakdownChart.tsx  Donut chart by category
      RecentTransactions.tsx  Quick activity feed
    transactions/
      TransactionsTable.tsx   Paginated table with sort/filter/edit/delete
      FilterPanel.tsx         Search, type, category, date, sort controls
      TransactionModal.tsx    Add/edit modal with validation (admin only)
    insights/
      InsightsPanel.tsx       Savings rate, daily spend, category bars, monthly comparison
    shared/
      Card.tsx         Reusable card container
      Badge.tsx        Category and type badges
      EmptyState.tsx   Zero-state placeholder
```

---

## Features

### Dashboard Overview
- Summary cards: Net Balance, Income, Expenses with month-over-month percentage change
- 6-month area chart showing income vs expense trend
- Donut chart for categorical spending breakdown with interactive hover
- Recent activity feed with quick "View All" navigation

### Transactions
- Paginated table (10 per page) with 52 mock entries
- **Search** by description, category, or merchant
- **Filter** by type (income/expense), category, and date range
- **Sort** by date, amount, category, or type in either direction
- **Export to CSV** (works for filtered set)
- **Admin only**: Add, edit, delete transactions via modal with full validation

### Insights
- Savings rate as percentage of income
- Average daily spend this month
- Month-over-month spend change with direction indicator
- Highest spending category
- Top merchant by transaction frequency
- Category progress bars with amounts and percentages
- Monthly comparison bar chart

### Role-Based UI (RBAC)
- Simulated on the frontend — no backend required
- Toggle between **Admin** and **Viewer** using the dropdown in the top bar
- **Admin**: Full CRUD on transactions, can add/edit/delete
- **Viewer**: Read-only — action buttons are hidden, all data visible
- Role preference persisted to `localStorage`

### Theme
- Dark mode (default) and light mode
- Toggle via the sun/moon icon in the top bar
- Theme preference persisted to `localStorage`

---

## Design Decisions

**TypeScript over JavaScript**
Strict types prevent entire classes of bugs (typos in category strings, wrong amount types). The `types/index.ts` file acts as a single source of truth for the entire data model.

**useReducer + Context over Redux/Zustand**
The state shape is simple and well-bounded. Adding a full state management library would be over-engineering for this scale. The reducer pattern still gives clean, predictable state transitions.

**Pure utility functions in `utils/finance.ts`**
All financial computation (filtering, aggregation, chart building) lives in pure functions outside React. This makes them trivially testable and reusable independent of UI state.

**Memoized derived data via custom hooks**
`useFinancialSummary`, `useMonthlyData`, `useCategoryBreakdown`, `useInsights`, and `useFilteredTransactions` all use `useMemo` to avoid recomputation on unrelated renders.

**Component co-location**
Components are organized by feature (dashboard, transactions, insights) rather than by type (all charts together, all forms together). This scales better as features grow.

---

## Optional Enhancements Implemented

- Dark/light theme toggle with localStorage persistence
- CSV export for filtered transaction set
- Advanced filtering (search + category + type + date range + sort)
- Role preference persisted across sessions

---

## Scripts

```bash
npm run dev        # Start development server
npm run build      # TypeScript check + production build
npm run preview    # Preview production build locally
npm run type-check # Run tsc without emitting (CI-safe)
npm run lint       # ESLint check
```

---

## Notes

- All data is static mock data — no backend or API calls
- Transactions span November 2025 to April 2026 for realistic chart data
- The app is fully responsive down to mobile (375px)
- Empty states are handled gracefully throughout

---

Built by Niranjan M Nadiger
