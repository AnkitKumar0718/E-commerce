import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../contexts/WishlistContext';
import { CartContext } from '../contexts/CartContext';
import { ToastContext } from '../contexts/ToastContext';
import { BsTrash, BsPlus } from 'react-icons/bs';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);

  const handleAddToCart = (product) => {
    addToCart(product, product.id);
    addToast('Item added to cart!', 'success');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    addToast('Removed from wishlist', 'success');
  };

  if (wishlist.length === 0) {
    return (
      <section className='py-20 px-4 pt-[100px]'>
        <div className='container mx-auto text-center'>
          <h1 className='text-4xl font-bold mb-4'>My Wishlist</h1>
          <p className='text-gray-600 text-lg mb-8'>Your wishlist is empty</p>
          <Link
            to='/'
            className='inline-block bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition'
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 px-4 pt-[100px]'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>My Wishlist</h1>
        <p className='text-gray-600 mb-6'>You have {wishlist.length} item(s) in your wishlist</p>

        {/* Wishlist Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12'>
          {wishlist.map((product) => (
            <div key={product.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
              {/* Image Section */}
              <div className='bg-gray-100 h-48 relative overflow-hidden group flex items-center justify-center'>
                <img
                  className='w-full h-full object-contain p-4 group-hover:scale-110 transition duration-300'
                  src={product.image}
                  alt={product.title}
                />

                {/* Action Buttons */}
                <div className='absolute top-2 right-2 flex flex-col gap-2'>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className='bg-yellow-400 hover:bg-yellow-500 text-black p-2 transform hover:scale-110 transition'
                    title='Add to cart'
                  >
                    <BsPlus className='text-xl' />
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className='bg-red-500 hover:bg-red-600 text-white p-2 transform hover:scale-110 transition'
                    title='Remove from wishlist'
                  >
                    <BsTrash className='text-xl' />
                  </button>
                </div>
              </div>

              {/* Product Info Section */}
              <div className='p-3 flex flex-col flex-grow'>
                <div className='text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2'>
                  {product.category}
                </div>
                <Link to={`/product/${product.id}`} className='block mb-2 flex-grow'>
                  <h2 className='font-semibold text-gray-800 line-clamp-2 hover:text-red-500 transition'>
                    {product.title}
                  </h2>
                </Link>
                <div className='text-lg font-bold text-red-500 mt-auto'>
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Shopping */}
        <div className='text-center'>
          <Link
            to='/'
            className='inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
