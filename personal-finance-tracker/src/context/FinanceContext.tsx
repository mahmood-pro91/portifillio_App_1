import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Transaction, Category, Budget, AppState, FinancialSummary } from '../types';

// Action types
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_BUDGETS'; payload: Budget[] }
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'UPDATE_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string };

// Initial state
const initialState: AppState = {
  transactions: [],
  categories: [
    { id: '1', name: 'Salary', type: 'income', color: '#10B981', icon: 'DollarSign' },
    { id: '2', name: 'Freelance', type: 'income', color: '#3B82F6', icon: 'Briefcase' },
    { id: '3', name: 'Investment', type: 'income', color: '#8B5CF6', icon: 'TrendingUp' },
    { id: '4', name: 'Food', type: 'expense', color: '#F59E0B', icon: 'Utensils' },
    { id: '5', name: 'Transport', type: 'expense', color: '#EF4444', icon: 'Car' },
    { id: '6', name: 'Entertainment', type: 'expense', color: '#EC4899', icon: 'Film' },
    { id: '7', name: 'Shopping', type: 'expense', color: '#06B6D4', icon: 'ShoppingBag' },
    { id: '8', name: 'Bills', type: 'expense', color: '#84CC16', icon: 'Receipt' },
  ],
  budgets: [],
  loading: false,
  error: null,
};

// Reducer
const financeReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload),
      };
    case 'SET_BUDGETS':
      return { ...state, budgets: action.payload };
    case 'ADD_BUDGET':
      return { ...state, budgets: [...state.budgets, action.payload] };
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(b =>
          b.id === action.payload.id ? action.payload : b
        ),
      };
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(b => b.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context
interface FinanceContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getFinancialSummary: () => FinancialSummary;
  getTransactionsByCategory: (categoryId: string) => Transaction[];
  getTransactionsByType: (type: 'income' | 'expense') => Transaction[];
  getTransactionsByDateRange: (startDate: string, endDate: string) => Transaction[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Provider component
export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedTransactions = localStorage.getItem('finance-transactions');
        const savedCategories = localStorage.getItem('finance-categories');
        const savedBudgets = localStorage.getItem('finance-budgets');

        if (savedTransactions) {
          dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(savedTransactions) });
        }
        if (savedCategories) {
          dispatch({ type: 'SET_CATEGORIES', payload: JSON.parse(savedCategories) });
        }
        if (savedBudgets) {
          dispatch({ type: 'SET_BUDGETS', payload: JSON.parse(savedBudgets) });
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load saved data' });
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('finance-categories', JSON.stringify(state.categories));
  }, [state.categories]);

  useEffect(() => {
    localStorage.setItem('finance-budgets', JSON.stringify(state.budgets));
  }, [state.budgets]);

  // Helper functions
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    const existingTransaction = state.transactions.find(t => t.id === id);
    if (existingTransaction) {
      const updatedTransaction = { ...existingTransaction, ...transaction };
      dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction });
    }
  };

  const deleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    const existingCategory = state.categories.find(c => c.id === id);
    if (existingCategory) {
      const updatedCategory = { ...existingCategory, ...category };
      dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
    }
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_BUDGET', payload: newBudget });
  };

  const updateBudget = (id: string, budget: Partial<Budget>) => {
    const existingBudget = state.budgets.find(b => b.id === id);
    if (existingBudget) {
      const updatedBudget = { ...existingBudget, ...budget };
      dispatch({ type: 'UPDATE_BUDGET', payload: updatedBudget });
    }
  };

  const deleteBudget = (id: string) => {
    dispatch({ type: 'DELETE_BUDGET', payload: id });
  };

  const getFinancialSummary = (): FinancialSummary => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const allTransactions = state.transactions;
    const monthlyTransactions = state.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = allTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = allTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance: monthlyIncome - monthlyExpenses,
    };
  };

  const getTransactionsByCategory = (categoryId: string): Transaction[] => {
    return state.transactions.filter(t => t.category === categoryId);
  };

  const getTransactionsByType = (type: 'income' | 'expense'): Transaction[] => {
    return state.transactions.filter(t => t.type === type);
  };

  const getTransactionsByDateRange = (startDate: string, endDate: string): Transaction[] => {
    return state.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    });
  };

  const value: FinanceContextType = {
    state,
    dispatch,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    addBudget,
    updateBudget,
    deleteBudget,
    getFinancialSummary,
    getTransactionsByCategory,
    getTransactionsByType,
    getTransactionsByDateRange,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

// Custom hook
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
