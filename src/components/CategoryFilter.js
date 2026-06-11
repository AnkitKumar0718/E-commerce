import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useContext(ProductContext);

  const categories = [
    'All',
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="py-2 px-3 bg-white border border-cream-3 text-primary text-sm focus:outline-none focus:border-gold transition-all duration-200 appearance-none cursor-pointer min-w-[150px]"
    >
      <option value="All">All Categories</option>
      {categories.filter(c => c !== 'All').map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
