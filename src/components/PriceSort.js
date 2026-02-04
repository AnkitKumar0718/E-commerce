import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

function PriceSort() {
  const { sortBy, setSortBy } = useContext(ProductContext);

  return (
    <div className="flex items-center">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-sm"
      >
        <option value="default">Default Sorting</option>
        <option value="low-to-high">Price: Low to High</option>
        <option value="high-to-low">Price: High to Low</option>
      </select>
    </div>
  );
}

export default PriceSort;
