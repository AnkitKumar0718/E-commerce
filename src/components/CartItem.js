import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';
import { SidebarContext } from '../contexts/SidebarContext';

function CartItem({ item }) {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { handleClose } = useContext(SidebarContext);
  const { id, title, amount, image, price } = item;

  return (
    <div className="flex gap-4 px-6 py-4 hover:bg-cream/50 transition-colors duration-200">
      {/* Image */}
      <Link to={`/product/${id}`} onClick={handleClose} className="flex-shrink-0">
        <div className="w-16 h-16 bg-cream flex items-center justify-center border border-cream-3">
          <img className="w-12 h-12 object-contain" src={image} alt={title} />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-grow min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${id}`}
            onClick={handleClose}
            className="text-xs font-semibold text-primary hover:text-gold transition-colors line-clamp-2 leading-snug flex-1"
          >
            {title}
          </Link>
          <button
            onClick={() => removeFromCart(id)}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-muted-2 hover:text-rose-500 hover:bg-rose-50 transition-all"
          >
            <IoMdClose className="text-sm" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Qty controls */}
          <div className="flex items-center border border-cream-3">
            <button
              onClick={() => decreaseAmount(id)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:bg-cream hover:text-primary transition-all"
            >
              <IoMdRemove className="text-xs" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-primary border-x border-cream-3 h-7 flex items-center justify-center">
              {amount}
            </span>
            <button
              onClick={() => increaseAmount(id)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:bg-gold-light hover:text-gold transition-all"
            >
              <IoMdAdd className="text-xs" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-xs text-muted-2">${price} × {amount}</p>
            <p className="text-sm font-black text-gold">${(price * amount).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
