import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { ToastContext } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const categoryColors = {
  'electronics': 'bg-blue-50 text-blue-600 border-blue-100',
  'jewelery': 'bg-amber-50 text-amber-700 border-amber-100',
  "men's clothing": 'bg-slate-50 text-slate-600 border-slate-100',
  "women's clothing": 'bg-rose-50 text-rose-600 border-rose-100',
};

function Product({ product }) {
  const { id, title, category, image, price } = product;
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useContext(ToastContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(id);

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    addToCart(product, id);
    addToast('Item added to cart!', 'success');
  };

  const handleToggleWishlist = () => {
    if (!user) { navigate('/login'); return; }
    toggleWishlist(product);
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', 'success');
  };

  const catColorClass = categoryColors[category] || 'bg-gold-light text-gold border-gold/20';

  return (
    <div className="product-card group bg-white">
      {/* Image Section */}
      <div className="relative bg-cream h-56 product-img-wrapper flex items-center justify-center overflow-hidden">
        <img
          className="max-h-44 max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-md"
          src={image}
          alt={title}
        />

        {/* Wishlist heart – always visible top-right */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
            inWishlist
              ? 'bg-rose-500 border-rose-500 text-white'
              : 'bg-white border-cream-3 text-muted hover:border-gold hover:text-gold'
          }`}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? <BsHeartFill className="text-xs" /> : <BsHeart className="text-xs" />}
        </button>

        {/* Action buttons slide up on hover */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-gold text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-gold-dark transition-colors duration-200"
          >
            <BsPlus className="text-base" /> Add to Cart
          </button>
          <button
            onClick={() => user ? navigate(`/product/${id}`) : navigate('/login')}
            className="w-12 py-3 bg-charcoal text-white flex items-center justify-center hover:bg-primary transition-colors duration-200"
            title="Quick View"
          >
            <BsEyeFill className="text-sm" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <span className={`inline-flex w-fit text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border mb-2 ${catColorClass}`}>
          {category}
        </span>
        <Link to={`/product/${id}`} className="block mb-3 flex-grow">
          <h2 className="font-medium text-primary text-sm line-clamp-2 hover:text-gold transition-colors leading-snug">
            {title}
          </h2>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-cream-3">
          <span className="text-lg font-black text-gold">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 bg-gold/10 text-gold border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-200"
            title="Add to cart"
          >
            <BsPlus className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
