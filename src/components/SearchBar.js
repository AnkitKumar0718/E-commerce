import React, { useState, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchTerm: setContextSearchTerm } = useContext(ProductContext);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setContextSearchTerm(value);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}

export default SearchBar;
