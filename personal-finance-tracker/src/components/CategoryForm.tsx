import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from 'lucide-react';
import { Category } from '../types';
import './CategoryForm.css';

interface CategoryFormProps {
  categoryId?: string | null;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryId, onClose }) => {
  const { state, addCategory, updateCategory } = useFinance();
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    color: '#6B7280',
    icon: 'DollarSign',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const iconOptions = [
    { value: 'DollarSign', label: 'Dollar Sign' },
    { value: 'Briefcase', label: 'Briefcase' },
    { value: 'TrendingUp', label: 'Trending Up' },
    { value: 'Utensils', label: 'Utensils' },
    { value: 'Car', label: 'Car' },
    { value: 'Film', label: 'Film' },
    { value: 'ShoppingBag', label: 'Shopping Bag' },
    { value: 'Receipt', label: 'Receipt' },
    { value: 'Home', label: 'Home' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Gift', label: 'Gift' },
    { value: 'Coffee', label: 'Coffee' },
  ];

  const colorOptions = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
    '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F43F5E',
    '#8B5A2B', '#6B7280', '#374151', '#1F2937'
  ];

  useEffect(() => {
    if (categoryId) {
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        setFormData({
          name: category.name,
          type: category.type,
          color: category.color,
          icon: category.icon,
        });
      }
    }
  }, [categoryId, state.categories]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    }

    // Check for duplicate names within the same type
    const existingCategory = state.categories.find(c => 
      c.name.toLowerCase() === formData.name.toLowerCase().trim() && 
      c.type === formData.type &&
      c.id !== categoryId
    );
    
    if (existingCategory) {
      newErrors.name = 'A category with this name already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      type: formData.type,
      color: formData.color,
      icon: formData.icon,
    };

    if (categoryId) {
      updateCategory(categoryId, categoryData);
    } else {
      addCategory(categoryData);
    }

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleColorSelect = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };

  return (
    <div className="modal-overlay">
      <div className="category-form-modal">
        <div className="modal-header">
          <h2>{categoryId ? 'Edit Category' : 'Add New Category'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="name">Category Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Icon *</label>
            <div className="icon-grid">
              {iconOptions.map((icon) => (
                <button
                  key={icon.value}
                  type="button"
                  className={`icon-option ${formData.icon === icon.value ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
                  title={icon.label}
                >
                  {icon.value}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Color *</label>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {categoryId ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
