import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { format } from 'date-fns';
import { Target, Plus, AlertTriangle } from 'lucide-react';
import './BudgetOverview.css';

const BudgetOverview: React.FC = () => {
  const { state, getTransactionsByCategory } = useFinance();

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

  const getBudgetProgress = (budget: any) => {
    const transactions = getTransactionsByCategory(budget.categoryId);
    const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const percentage = (spent / budget.amount) * 100;
    return { spent, percentage };
  };

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const activeBudgets = state.budgets.filter(budget => {
    const now = new Date();
    const endDate = new Date(budget.endDate);
    return endDate >= now;
  });

  return (
    <div className="budget-overview">
      <div className="budget-header">
        <h3>Budget Overview</h3>
        <button className="add-budget-btn">
          <Plus className="w-4 h-4" />
          Add Budget
        </button>
      </div>

      <div className="budgets-list">
        {activeBudgets.length === 0 ? (
          <div className="empty-state">
            <Target className="w-8 h-8 text-gray-400" />
            <p>No active budgets</p>
            <p className="text-sm text-gray-500">Create a budget to track your spending</p>
          </div>
        ) : (
          activeBudgets.map((budget) => {
            const { spent, percentage } = getBudgetProgress(budget);
            const status = getBudgetStatus(percentage);
            const remaining = budget.amount - spent;

            return (
              <div key={budget.id} className="budget-item">
                <div className="budget-header-item">
                  <div className="budget-category">
                    <div 
                      className="budget-category-dot" 
                      style={{ backgroundColor: getCategoryColor(budget.categoryId) }}
                    />
                    <span className="budget-category-name">
                      {getCategoryName(budget.categoryId)}
                    </span>
                  </div>
                  {status === 'exceeded' && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>

                <div className="budget-amounts">
                  <div className="budget-amount-row">
                    <span className="budget-label">Spent</span>
                    <span className="budget-spent">{formatCurrency(spent)}</span>
                  </div>
                  <div className="budget-amount-row">
                    <span className="budget-label">Budget</span>
                    <span className="budget-total">{formatCurrency(budget.amount)}</span>
                  </div>
                  <div className="budget-amount-row">
                    <span className="budget-label">Remaining</span>
                    <span className={`budget-remaining ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>

                <div className="budget-progress">
                  <div className="budget-progress-bar">
                    <div 
                      className={`budget-progress-fill budget-progress-${status}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <span className="budget-percentage">{percentage.toFixed(0)}%</span>
                </div>

                <div className="budget-period">
                  <span className="budget-period-text">
                    {budget.period} • Until {format(new Date(budget.endDate), 'MMM dd')}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BudgetOverview;
