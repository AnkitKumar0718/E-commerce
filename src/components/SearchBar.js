import React, { useState, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchBar() {
  const [localTerm, setLocalTerm] = useState('');
  const { setSearchTerm } = useContext(ProductContext);

  const handleSearch = (value) => {
    setLocalTerm(value);
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setLocalTerm('');
    setSearchTerm('');
  };

  return (
    <div className="relative min-w-[200px]">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2 text-sm" />
      <input
        type="text"
        placeholder="Search products..."
        value={localTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-9 pr-8 py-2 bg-white border border-cream-3 text-primary text-sm focus:outline-none focus:border-gold transition-all duration-200 placeholder-muted-2"
      />
      {localTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors"
        >
          <FiX className="text-sm" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
