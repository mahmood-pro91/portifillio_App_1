import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import './Analytics.css';

const Analytics: React.FC = () => {
  const { state, getTransactionsByDateRange } = useFinance();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedChart, setSelectedChart] = useState('monthly');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getDateRange = () => {
    const now = new Date();
    const endDate = endOfMonth(now);
    
    switch (selectedPeriod) {
      case '3months':
        return {
          start: startOfMonth(subMonths(now, 2)),
          end: endDate,
        };
      case '6months':
        return {
          start: startOfMonth(subMonths(now, 5)),
          end: endDate,
        };
      case '12months':
        return {
          start: startOfMonth(subMonths(now, 11)),
          end: endDate,
        };
      default:
        return {
          start: startOfMonth(subMonths(now, 5)),
          end: endDate,
        };
    }
  };

  const generateMonthlyData = () => {
    const { start, end } = getDateRange();
    const data = [];
    const current = new Date(start);
    
    while (current <= end) {
      const monthStart = startOfMonth(current);
      const monthEnd = endOfMonth(current);
      
      const monthTransactions = getTransactionsByDateRange(
        format(monthStart, 'yyyy-MM-dd'),
        format(monthEnd, 'yyyy-MM-dd')
      );
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      data.push({
        month: format(current, 'MMM yyyy'),
        income,
        expenses,
        balance: income - expenses,
      });
      
      current.setMonth(current.getMonth() + 1);
    }
    
    return data;
  };

  const generateCategoryData = () => {
    const { start, end } = getDateRange();
    const transactions = getTransactionsByDateRange(
      format(start, 'yyyy-MM-dd'),
      format(end, 'yyyy-MM-dd')
    );
    
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryTotals: Record<string, number> = {};
    
    expenseTransactions.forEach(transaction => {
      const category = state.categories.find(c => c.id === transaction.category);
      if (category) {
        categoryTotals[category.name] = (categoryTotals[category.name] || 0) + transaction.amount;
      }
    });
    
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      color: state.categories.find(c => c.name === name)?.color || '#6B7280',
    }));
  };

  const monthlyData = generateMonthlyData();
  const categoryData = generateCategoryData();

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const averageIncome = totalIncome / monthlyData.length;
  const averageExpenses = totalExpenses / monthlyData.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="chart-tooltip-item" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Detailed insights into your financial patterns</p>
      </div>

      {/* Period Selector */}
      <div className="analytics-controls">
        <div className="period-selector">
          <Calendar className="w-4 h-4" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
        </div>
        
        <div className="chart-selector">
          <button
            className={`chart-btn ${selectedChart === 'monthly' ? 'active' : ''}`}
            onClick={() => setSelectedChart('monthly')}
          >
            Monthly Trends
          </button>
          <button
            className={`chart-btn ${selectedChart === 'categories' ? 'active' : ''}`}
            onClick={() => setSelectedChart('categories')}
          >
            Category Breakdown
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-card-header">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3>Total Income</h3>
          </div>
          <div className="summary-card-value text-green-600">
            {formatCurrency(totalIncome)}
          </div>
          <p className="summary-card-subtitle">
            Avg: {formatCurrency(averageIncome)}/month
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3>Total Expenses</h3>
          </div>
          <div className="summary-card-value text-red-600">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="summary-card-subtitle">
            Avg: {formatCurrency(averageExpenses)}/month
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3>Net Balance</h3>
          </div>
          <div className={`summary-card-value ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalIncome - totalExpenses)}
          </div>
          <p className="summary-card-subtitle">
            {totalIncome - totalExpenses >= 0 ? 'Positive' : 'Negative'} cash flow
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="analytics-charts">
        {selectedChart === 'monthly' ? (
          <div className="chart-container">
            <h3>Monthly Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="chart-container">
            <h3>Expense Categories</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart">
                <p>No expense data available for the selected period</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
