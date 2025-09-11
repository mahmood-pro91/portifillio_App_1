import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const CategoryChart: React.FC = () => {
  const { state, getTransactionsByCategory } = useFinance();

  // Get expense categories and their totals
  const getExpenseData = () => {
    const expenseCategories = state.categories.filter(c => c.type === 'expense');
    
    return expenseCategories.map(category => {
      const transactions = getTransactionsByCategory(category.id);
      const total = transactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        name: category.name,
        value: total,
        color: category.color,
        icon: category.icon,
      };
    }).filter(item => item.value > 0);
  };

  const data = getExpenseData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{data.name}</p>
          <p className="chart-tooltip-item" style={{ color: data.payload.color }}>
            Amount: {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="chart-legend">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="legend-text">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="empty-chart">
        <p>No expense data available</p>
        <p className="text-sm text-gray-500">Add some transactions to see your spending breakdown</p>
      </div>
    );
  }

  return (
    <div className="category-chart">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
