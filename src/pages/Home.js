import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product';
import Hero from '../components/Hero';
import Skeleton from '../components/Skeleton';
import SearchBar from '../components/SearchBar';
import PriceSort from '../components/PriceSort';
import CategoryFilter from '../components/CategoryFilter';

function Home() {
  const { filteredProducts, loading, selectedCategory } = useContext(ProductContext);
  const skeletons = Array(12).fill(null);

  return (
    <div className="bg-cream min-h-screen">
      <Hero />

      {/* Products Section */}
      <section id="products-section" className="py-14 bg-cream" style={{ scrollMarginTop: '68px' }}>
        <div className="container mx-auto px-4 lg:px-0">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="section-label mb-2">Our Collection</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary">
                {selectedCategory === 'All'
                  ? <>All <span className="italic text-gold">Products</span></>
                  : <><span className="italic text-gold capitalize">{selectedCategory}</span> Collection</>
                }
              </h2>
              {!loading && (
                <p className="text-muted text-sm mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
                </p>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              <SearchBar />
              <CategoryFilter />
              <PriceSort />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {loading ? (
              skeletons.map((_, i) => <Skeleton key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Product product={product} key={product.id} />
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">No products found</h3>
                <p className="text-muted text-sm">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
