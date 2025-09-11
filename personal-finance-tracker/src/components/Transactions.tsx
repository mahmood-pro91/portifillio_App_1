import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { format } from 'date-fns';
import { Plus, Search, Filter, Edit, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import TransactionForm from './TransactionForm';
import './Transactions.css';

const Transactions: React.FC = () => {
  const { state, deleteTransaction } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryName = (categoryId: string) => {
    const category = state.categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = state.categories.find(c => c.id === categoryId);
    return category?.color || '#6B7280';
  };

  const filteredTransactions = state.transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleEdit = (transactionId: string) => {
    setEditingTransaction(transactionId);
    setShowForm(true);
  };

  const handleDelete = (transactionId: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transactionId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div className="transactions-title">
          <h1>Transactions</h1>
          <p>Manage your income and expenses</p>
        </div>
        <button 
          className="add-transaction-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="transactions-summary">
        <div className="summary-card">
          <div className="summary-card-header">
            <ArrowUpRight className="w-5 h-5 text-green-600" />
            <h3>Total Income</h3>
          </div>
          <div className="summary-card-value text-green-600">
            {formatCurrency(totalIncome)}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <ArrowDownLeft className="w-5 h-5 text-red-600" />
            <h3>Total Expenses</h3>
          </div>
          <div className="summary-card-value text-red-600">
            {formatCurrency(totalExpenses)}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-header">
            <span className="text-lg font-semibold">Net</span>
            <h3>Balance</h3>
          </div>
          <div className={`summary-card-value ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalIncome - totalExpenses)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="transactions-filters">
        <div className="search-box">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {state.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found</p>
            <p className="text-sm text-gray-500">
              {searchTerm || filterType !== 'all' || filterCategory !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Add your first transaction to get started'
              }
            </p>
          </div>
        ) : (
          filteredTransactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((transaction) => (
              <div key={transaction.id} className="transaction-row">
                <div className="transaction-icon">
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-red-600" />
                  )}
                </div>
                
                <div className="transaction-details">
                  <h4 className="transaction-description">{transaction.description}</h4>
                  <div className="transaction-meta">
                    <span 
                      className="transaction-category"
                      style={{ color: getCategoryColor(transaction.category) }}
                    >
                      {getCategoryName(transaction.category)}
                    </span>
                    <span className="transaction-date">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                
                <div className="transaction-amount">
                  <span 
                    className={`amount ${transaction.type === 'income' ? 'income' : 'expense'}`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </div>
                
                <div className="transaction-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(transaction.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Transaction Form Modal */}
      {showForm && (
        <TransactionForm
          transactionId={editingTransaction}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Transactions;
