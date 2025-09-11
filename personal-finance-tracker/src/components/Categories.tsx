import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Plus, Edit, Trash2, DollarSign, Briefcase, TrendingUp, Utensils, Car, Film, ShoppingBag, Receipt } from 'lucide-react';
import CategoryForm from './CategoryForm';
import './Categories.css';

const Categories: React.FC = () => {
  const { state, deleteCategory } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      DollarSign: <DollarSign className="w-5 h-5" />,
      Briefcase: <Briefcase className="w-5 h-5" />,
      TrendingUp: <TrendingUp className="w-5 h-5" />,
      Utensils: <Utensils className="w-5 h-5" />,
      Car: <Car className="w-5 h-5" />,
      Film: <Film className="w-5 h-5" />,
      ShoppingBag: <ShoppingBag className="w-5 h-5" />,
      Receipt: <Receipt className="w-5 h-5" />,
    };
    return icons[iconName] || <DollarSign className="w-5 h-5" />;
  };

  const filteredCategories = state.categories.filter(category => 
    filterType === 'all' || category.type === filterType
  );

  const handleEdit = (categoryId: string) => {
    setEditingCategory(categoryId);
    setShowForm(true);
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This will also remove all associated transactions.')) {
      deleteCategory(categoryId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const incomeCategories = filteredCategories.filter(c => c.type === 'income');
  const expenseCategories = filteredCategories.filter(c => c.type === 'expense');

  return (
    <div className="categories-page">
      <div className="categories-header">
        <div className="categories-title">
          <h1>Categories</h1>
          <p>Organize your income and expenses</p>
        </div>
        <button 
          className="add-category-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Filter */}
      <div className="categories-filter">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="income">Income Categories</option>
          <option value="expense">Expense Categories</option>
        </select>
      </div>

      {/* Income Categories */}
      {(filterType === 'all' || filterType === 'income') && incomeCategories.length > 0 && (
        <div className="category-section">
          <h2 className="section-title">Income Categories</h2>
          <div className="categories-grid">
            {incomeCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {getIcon(category.icon)}
                  </div>
                  <div className="category-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <div className="category-meta">
                    <span className="category-type income">Income</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense Categories */}
      {(filterType === 'all' || filterType === 'expense') && expenseCategories.length > 0 && (
        <div className="category-section">
          <h2 className="section-title">Expense Categories</h2>
          <div className="categories-grid">
            {expenseCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {getIcon(category.icon)}
                  </div>
                  <div className="category-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <div className="category-meta">
                    <span className="category-type expense">Expense</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="empty-state">
          <p>No categories found</p>
          <p className="text-sm text-gray-500">
            {filterType !== 'all' 
              ? `No ${filterType} categories available` 
              : 'Add your first category to get started'
            }
          </p>
        </div>
      )}

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          categoryId={editingCategory}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Categories;
