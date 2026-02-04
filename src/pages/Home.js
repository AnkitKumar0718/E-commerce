import React, { useContext } from 'react'

import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import PriceSort from '../components/PriceSort';
import SearchBar from '../components/SearchBar';
import Skeleton from '../components/Skeleton';

function Home() {

  const { filteredProducts, loading } = useContext(ProductContext);

  // Show skeletons while loading
  const skeletons = Array(12).fill(null);

  return (
    <div>
      <Hero />
      <section className='py-8 bg-white'>
        <div className='w-full'>

          {/* Filters Section - Compact Row */}
          <div className='mb-6 bg-white py-4 px-2 border-y'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
              <div className='flex items-center gap-4 w-full md:w-auto'>
                <CategoryFilter />
                <PriceSort />
              </div>
              <div className='w-full md:max-w-xs'>
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Products Grid - Original Spacing Layout */}
          <div className='container mx-auto lg:px-0 px-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 py-8'>
              {loading ? (
                skeletons.map((_, index) => <Skeleton key={index} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product product={product} key={product.id} />
                ))
              ) : (
                <div className='col-span-full text-center py-12'>
                  <p className='text-gray-600 text-lg'>No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )

}

export default Home

