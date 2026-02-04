import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useContext(ProductContext);

  const categories = [
    'All',
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  return (
    <div className="flex items-center">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-sm"
      >
        <option value="All">All Categories</option>
        {categories.filter(c => c !== 'All').map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
