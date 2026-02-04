import React from 'react'
import { createContext, useEffect, useState, useMemo } from 'react'

 export const ProductContext=createContext();

function ProductProvider({children}) {
    const[products, setProducts]=useState([]);
    const[loading, setLoading]=useState(true);
    const[searchTerm, setSearchTerm]=useState('');
    const[selectedCategory, setSelectedCategory]=useState('All');
    const[sortBy, setSortBy]=useState('default');

    useEffect(()=>{
        const fetchProducts=async()=>{
            try {
                setLoading(true);
                const response=await fetch('https://fakestoreapi.com/products');
                const data=await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    },[])

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = products;

        // Search filter
        if (searchTerm) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            result = result.filter((product) => product.category === selectedCategory);
        }

        // Price sort
        if (sortBy === 'low-to-high') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'high-to-low') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, searchTerm, selectedCategory, sortBy]);

  return (
      <ProductContext.Provider value={{
          products,
          filteredProducts,
          loading,
          searchTerm,
          setSearchTerm,
          selectedCategory,
          setSelectedCategory,
          sortBy,
          setSortBy
      }}>
           {children}
      </ProductContext.Provider>
  )
}

export default ProductProvider;
