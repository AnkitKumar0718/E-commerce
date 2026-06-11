import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { ToastContext } from '../contexts/ToastContext';
import { BsHeart, BsHeartFill, BsArrowLeft, BsStarFill } from 'react-icons/bs';
import { FiShoppingBag, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const categoryColors = {
  'electronics': 'bg-blue-50 text-blue-600',
  'jewelery': 'bg-amber-50 text-amber-700',
  "men's clothing": 'bg-slate-50 text-slate-600',
  "women's clothing": 'bg-rose-50 text-rose-600',
};

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useContext(ToastContext);

  const product = products.find(item => item.id === parseInt(id));

  if (!product) {
    return (
      <section className="min-h-screen bg-cream flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted font-medium">Loading product...</p>
        </div>
      </section>
    );
  }

  const { title, price, description, image, category } = product;
  const inWishlist = isInWishlist(product.id);
  const catColorClass = categoryColors[category] || 'bg-gold-light text-gold';

  const handleAddToCart = () => {
    addToCart(product, product.id);
    addToast('Item added to cart!', 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', 'success');
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-3 py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 text-xs text-muted">
          <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1">
            <BsArrowLeft className="text-xs" /> Home
          </Link>
          <span>/</span>
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${catColorClass}`}>{category}</span>
          <span>/</span>
          <span className="text-primary font-medium truncate max-w-[200px]">{title}</span>
        </div>
      </div>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Image Panel */}
            <div className="space-y-4 animate-fade-up">
              <div className="bg-white border border-cream-3 aspect-square flex items-center justify-center p-12 relative">
                <img
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                  src={image}
                  alt={title}
                />
                {/* Share button */}
                <button className="absolute top-4 right-4 w-9 h-9 border border-cream-3 flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-all">
                  <FiShare2 className="text-sm" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {/* Category + Rating */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 ${catColorClass}`}>
                  {category}
                </span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <BsStarFill key={s} className={`text-xs ${s <= 4 ? 'text-gold' : 'text-cream-3'}`} />
                  ))}
                  <span className="text-xs text-muted ml-1">(4.0)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary leading-tight">
                {title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-gold">${price.toFixed(2)}</span>
                <span className="text-muted text-sm line-through">${(price * 1.2).toFixed(2)}</span>
                <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5">-20% OFF</span>
              </div>

              {/* Divider */}
              <div className="w-12 h-0.5 bg-gold" />

              {/* Description */}
              <p className="text-muted leading-relaxed text-sm">
                {description}
              </p>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-gold justify-center gap-2"
                >
                  <FiShoppingBag />
                  Add to Bag
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-14 flex items-center justify-center border-2 transition-all duration-200 ${
                    inWishlist
                      ? 'border-rose-400 bg-rose-50 text-rose-500'
                      : 'border-cream-3 text-muted hover:border-gold hover:text-gold'
                  }`}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {inWishlist ? <BsHeartFill /> : <BsHeart />}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: '🚚', label: 'Free Shipping' },
                  { icon: '🔒', label: 'Secure Pay' },
                  { icon: '↩️', label: '30-Day Return' },
                ].map(badge => (
                  <div key={badge.label} className="bg-white border border-cream-3 p-3 text-center">
                    <div className="text-xl mb-1">{badge.icon}</div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
