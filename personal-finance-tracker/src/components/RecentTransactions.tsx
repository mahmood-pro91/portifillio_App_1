import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft, MoreVertical } from 'lucide-react';
import './RecentTransactions.css';

const RecentTransactions: React.FC = () => {
  const { state } = useFinance();

  // Get recent transactions (last 10)
  const recentTransactions = state.transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = state.categories.find(c => c.id === categoryId);
    return category?.color || '#6B7280';
  };

  const getCategoryName = (categoryId: string) => {
    const category = state.categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div className="recent-transactions">
      <div className="recent-transactions-header">
        <h3>Recent Transactions</h3>
        <button className="view-all-btn">
          View All
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="transactions-list">
        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet</p>
            <p className="text-sm text-gray-500">Add your first transaction to get started</p>
          </div>
        ) : (
          recentTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-icon">
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-red-600" />
                )}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-main">
                  <h4 className="transaction-description">{transaction.description}</h4>
                  <p className="transaction-category" style={{ color: getCategoryColor(transaction.category) }}>
                    {getCategoryName(transaction.category)}
                  </p>
                </div>
                <div className="transaction-meta">
                  <p className="transaction-amount" style={{ 
                    color: transaction.type === 'income' ? '#10B981' : '#EF4444' 
                  }}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="transaction-date">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <button className="transaction-menu">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
