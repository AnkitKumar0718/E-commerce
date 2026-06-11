import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

function PriceSort() {
  const { sortBy, setSortBy } = useContext(ProductContext);

  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="py-2 px-3 bg-white border border-cream-3 text-primary text-sm focus:outline-none focus:border-gold transition-all duration-200 appearance-none cursor-pointer min-w-[160px]"
    >
      <option value="default">Sort: Default</option>
      <option value="low-to-high">Price: Low to High</option>
      <option value="high-to-low">Price: High to Low</option>
    </select>
  );
}

export default PriceSort;
