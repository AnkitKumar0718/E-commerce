import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../contexts/WishlistContext';
import { CartContext } from '../contexts/CartContext';
import { ToastContext } from '../contexts/ToastContext';
import { BsTrash, BsPlus, BsHeart } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';

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
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-white border border-cream-3 flex items-center justify-center mx-auto mb-6">
            <BsHeart className="text-3xl text-muted-2" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-3">My Wishlist</h1>
          <p className="text-muted mb-8">Your wishlist is empty. Start adding items you love!</p>
          <Link to="/" className="btn-gold">
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <p className="section-label mb-2">Saved Items</p>
          <h1 className="font-serif text-4xl font-bold text-primary">
            My <span className="italic text-gold">Wishlist</span>
          </h1>
          <p className="text-muted text-sm mt-1">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-12">
          {wishlist.map(product => (
            <div key={product.id} className="product-card group bg-white">
              {/* Image */}
              <div className="relative bg-cream h-52 product-img-wrapper flex items-center justify-center overflow-hidden">
                <img
                  className="max-h-40 max-w-[80%] object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-500"
                  src={product.image}
                  alt={product.title}
                />
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-200"
                  title="Remove from wishlist"
                >
                  <BsTrash className="text-xs" />
                </button>

                {/* Add to cart slide */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-0 left-0 right-0 py-2.5 bg-gold text-white text-xs font-bold uppercase tracking-wider text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1.5"
                >
                  <BsPlus className="text-base" /> Add to Cart
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-2 mb-1.5">{product.category}</p>
                <Link to={`/product/${product.id}`} className="block mb-3 flex-grow">
                  <h2 className="font-medium text-primary text-sm line-clamp-2 hover:text-gold transition-colors leading-snug">
                    {product.title}
                  </h2>
                </Link>
                <div className="flex items-center justify-between pt-3 border-t border-cream-3">
                  <span className="text-lg font-black text-gold">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-dark transition-colors"
                  >
                    <FiShoppingBag className="text-sm" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/" className="btn-outline text-xs">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
