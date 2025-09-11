import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { format } from 'date-fns';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  PieChart,
  BarChart3
} from 'lucide-react';
import TransactionChart from './TransactionChart';
import CategoryChart from './CategoryChart';
import RecentTransactions from './RecentTransactions';
import BudgetOverview from './BudgetOverview';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { getFinancialSummary } = useFinance();
  const summary = getFinancialSummary();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBalanceColor = (balance: number) => {
    return balance >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Personal Finance Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back! Here's your financial overview for {format(new Date(), 'MMMM yyyy')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <DollarSign className="summary-card-icon" />
            <h3>Total Balance</h3>
          </div>
          <div className={`summary-card-value ${getBalanceColor(summary.balance)}`}>
            {formatCurrency(summary.balance)}
          </div>
          <p className="summary-card-subtitle">
            {summary.balance >= 0 ? 'You\'re doing great!' : 'Time to review expenses'}
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <TrendingUp className="summary-card-icon text-green-600" />
            <h3>Monthly Income</h3>
          </div>
          <div className="summary-card-value text-green-600">
            {formatCurrency(summary.monthlyIncome)}
          </div>
          <p className="summary-card-subtitle">
            This month's earnings
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <TrendingDown className="summary-card-icon text-red-600" />
            <h3>Monthly Expenses</h3>
          </div>
          <div className="summary-card-value text-red-600">
            {formatCurrency(summary.monthlyExpenses)}
          </div>
          <p className="summary-card-subtitle">
            This month's spending
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <Calendar className="summary-card-icon text-blue-600" />
            <h3>Monthly Balance</h3>
          </div>
          <div className={`summary-card-value ${getBalanceColor(summary.monthlyBalance)}`}>
            {formatCurrency(summary.monthlyBalance)}
          </div>
          <p className="summary-card-subtitle">
            {summary.monthlyBalance >= 0 ? 'Positive cash flow' : 'Negative cash flow'}
          </p>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <BarChart3 className="chart-icon" />
            <h3>Transaction Trends</h3>
          </div>
          <TransactionChart />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <PieChart className="chart-icon" />
            <h3>Expense Categories</h3>
          </div>
          <CategoryChart />
        </div>
      </div>

      {/* Recent Transactions and Budget Overview */}
      <div className="bottom-grid">
        <div className="recent-transactions-container">
          <RecentTransactions />
        </div>
        <div className="budget-overview-container">
          <BudgetOverview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
