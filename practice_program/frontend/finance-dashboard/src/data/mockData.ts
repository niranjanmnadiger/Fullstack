import { Transaction, User } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    role: 'admin',
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'viewer',
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  // April 2026
  { id: 't001', date: '2026-04-07', amount: 85000, category: 'salary', type: 'income', description: 'Monthly salary', merchant: 'TechCorp India' },
  { id: 't002', date: '2026-04-06', amount: 2400, category: 'food', type: 'expense', description: 'Groceries', merchant: 'BigBasket' },
  { id: 't003', date: '2026-04-05', amount: 850, category: 'transport', type: 'expense', description: 'Metro card recharge', merchant: 'BMTC' },
  { id: 't004', date: '2026-04-04', amount: 12000, category: 'freelance', type: 'income', description: 'UI design project', merchant: 'Upwork' },
  { id: 't005', date: '2026-04-03', amount: 1200, category: 'entertainment', type: 'expense', description: 'Movie tickets', merchant: 'PVR Cinemas' },
  { id: 't006', date: '2026-04-02', amount: 3500, category: 'shopping', type: 'expense', description: 'Clothing', merchant: 'H&M' },
  { id: 't007', date: '2026-04-01', amount: 18000, category: 'housing', type: 'expense', description: 'Rent', merchant: 'Landlord' },

  // March 2026
  { id: 't008', date: '2026-03-31', amount: 85000, category: 'salary', type: 'income', description: 'Monthly salary', merchant: 'TechCorp India' },
  { id: 't009', date: '2026-03-28', amount: 5600, category: 'healthcare', type: 'expense', description: 'Dental checkup', merchant: 'Apollo Clinic' },
  { id: 't010', date: '2026-03-25', amount: 2100, category: 'food', type: 'expense', description: 'Restaurant dinner', merchant: 'Truffles' },
  { id: 't011', date: '2026-03-22', amount: 8500, category: 'freelance', type: 'income', description: 'Logo design', merchant: 'Fiverr' },
  { id: 't012', date: '2026-03-20', amount: 1800, category: 'utilities', type: 'expense', description: 'Electricity bill', merchant: 'BESCOM' },
  { id: 't013', date: '2026-03-18', amount: 4200, category: 'shopping', type: 'expense', description: 'Electronics', merchant: 'Amazon' },
  { id: 't014', date: '2026-03-15', amount: 2800, category: 'food', type: 'expense', description: 'Weekly groceries', merchant: 'DMart' },
  { id: 't015', date: '2026-03-12', amount: 950, category: 'transport', type: 'expense', description: 'Fuel', merchant: 'HP Petrol' },
  { id: 't016', date: '2026-03-10', amount: 15000, category: 'investments', type: 'income', description: 'Mutual fund returns', merchant: 'Zerodha' },
  { id: 't017', date: '2026-03-08', amount: 3200, category: 'entertainment', type: 'expense', description: 'Concert tickets', merchant: 'BookMyShow' },
  { id: 't018', date: '2026-03-05', amount: 1200, category: 'education', type: 'expense', description: 'Online course', merchant: 'Udemy' },
  { id: 't019', date: '2026-03-01', amount: 18000, category: 'housing', type: 'expense', description: 'Rent', merchant: 'Landlord' },

  // February 2026
  { id: 't020', date: '2026-02-28', amount: 85000, category: 'salary', type: 'income', description: 'Monthly salary', merchant: 'TechCorp India' },
  { id: 't021', date: '2026-02-25', amount: 6800, category: 'shopping', type: 'expense', description: 'Valentine gifts', merchant: 'Myntra' },
  { id: 't022', date: '2026-02-22', amount: 3400, category: 'food', type: 'expense', description: 'Dining out', merchant: 'Swiggy' },
  { id: 't023', date: '2026-02-20', amount: 2200, category: 'utilities', type: 'expense', description: 'Internet + Water', merchant: 'Airtel' },
  { id: 't024', date: '2026-02-18', amount: 10000, category: 'freelance', type: 'income', description: 'Web dev contract', merchant: 'Toptal' },
  { id: 't025', date: '2026-02-15', amount: 2600, category: 'food', type: 'expense', description: 'Groceries', merchant: 'Zepto' },
  { id: 't026', date: '2026-02-12', amount: 800, category: 'transport', type: 'expense', description: 'Cab rides', merchant: 'Ola' },
  { id: 't027', date: '2026-02-08', amount: 4500, category: 'healthcare', type: 'expense', description: 'Annual checkup', merchant: 'Manipal Hospital' },
  { id: 't028', date: '2026-02-01', amount: 18000, category: 'housing', type: 'expense', description: 'Rent', merchant: 'Landlord' },

  // January 2026
  { id: 't029', date: '2026-01-31', amount: 85000, category: 'salary', type: 'income', description: 'Monthly salary', merchant: 'TechCorp India' },
  { id: 't030', date: '2026-01-28', amount: 9200, category: 'shopping', type: 'expense', description: 'New Year shopping', merchant: 'Flipkart' },
  { id: 't031', date: '2026-01-25', amount: 3800, category: 'food', type: 'expense', description: 'Pongal celebrations', merchant: 'Hotel Udupi' },
  { id: 't032', date: '2026-01-20', amount: 1600, category: 'utilities', type: 'expense', description: 'Electricity bill', merchant: 'BESCOM' },
  { id: 't033', date: '2026-01-18', amount: 20000, category: 'investments', type: 'income', description: 'Stock dividends', merchant: 'Zerodha' },
  { id: 't034', date: '2026-01-15', amount: 2900, category: 'food', type: 'expense', description: 'Groceries', merchant: 'BigBasket' },
  { id: 't035', date: '2026-01-10', amount: 6000, category: 'freelance', type: 'income', description: 'Consulting fee', merchant: 'Client direct' },
  { id: 't036', date: '2026-01-05', amount: 1500, category: 'education', type: 'expense', description: 'Books', merchant: 'Amazon' },
  { id: 't037', date: '2026-01-01', amount: 18000, category: 'housing', type: 'expense', description: 'Rent', merchant: 'Landlord' },

  // December 2025
  { id: 't038', date: '2025-12-31', amount: 95000, category: 'salary', type: 'income', description: 'Monthly salary + bonus', merchant: 'TechCorp India' },
  { id: 't039', date: '2025-12-28', amount: 12000, category: 'shopping', type: 'expense', description: 'Christmas gifts', merchant: 'Amazon' },
  { id: 't040', date: '2025-12-24', amount: 5200, category: 'food', type: 'expense', description: 'Christmas dinner', merchant: 'The Fatty Bao' },
  { id: 't041', date: '2025-12-20', amount: 2400, category: 'utilities', type: 'expense', description: 'Bills', merchant: 'BESCOM' },
  { id: 't042', date: '2025-12-15', amount: 3800, category: 'entertainment', type: 'expense', description: 'Year-end party', merchant: 'Social' },
  { id: 't043', date: '2025-12-10', amount: 2800, category: 'food', type: 'expense', description: 'Groceries', merchant: 'DMart' },
  { id: 't044', date: '2025-12-05', amount: 7500, category: 'freelance', type: 'income', description: 'Freelance project', merchant: 'Freelancer.com' },
  { id: 't045', date: '2025-12-01', amount: 18000, category: 'housing', type: 'expense', description: 'Rent', merchant: 'Landlord' },

  // November 2025
  { id: 't046', date: '2025-11-30', amount: 85000, category: 'salary', type: 'income', description: 'Monthly salary', merchant: 'TechCorp India' },
  { id: 't047', date: '2025-11-25', amount: 8900, category: 'shopping', type: 'expense', description: 'Diwali shopping', merchant: 'Myntra' },
  { id: 't048', date: '2025-11-20', amount: 4200, category: 'food', type: 'expense', description: 'Diwali sweets & dining', merchant: 'Haldirams' },
  { id: 't049', date: '2025-11-15', amount: 3200, category: 'entertainment', type: 'expense', description: 'Diwali crackers', merchant: 'Local market' },
  { id: 't050', date: '2025-11-10', amount: 18000, category: 'investments', type: 'income', description: 'Mutual fund returns', merchant: 'Zerodha' },
  { id: 't051', date: '2025-11-05', amount: 1900, category: 'utilities', type: 'expense', description: 'Electricity bill', merchant: 'BESCOM' },
  { id: 't052', date: '2025-11-01', amount: 18000, category: 'housing', type: 'expense', description: 'Rent', merchant: 'Landlord' },
];
