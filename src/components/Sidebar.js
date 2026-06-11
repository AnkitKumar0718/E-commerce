import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { BsArrowRight, BsBag } from 'react-icons/bs';
import CartItem from '../components/CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

function Sidebar() {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl 
        md:w-[400px] xl:max-w-[420px] transition-all duration-300 z-50 flex flex-col border-l border-cream-3`}>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-cream-3">
          <div className="flex items-center gap-2.5">
            <BsBag className="text-gold text-xl" />
            <span className="font-serif font-bold text-primary text-lg">Shopping Bag</span>
            {itemAmount > 0 && (
              <span className="w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemAmount}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-primary hover:bg-cream transition-all duration-200"
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 px-8">
              <div className="w-20 h-20 bg-cream-2 flex items-center justify-center mb-5">
                <BsBag className="text-3xl text-muted-2" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">Your bag is empty</h3>
              <p className="text-muted text-sm mb-7">Add items to get started</p>
              <button
                onClick={handleClose}
                className="btn-gold text-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-cream-3">
              {cart.map(item => <CartItem item={item} key={item.id} />)}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-cream-3 px-6 py-6 bg-cream space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-xs uppercase tracking-wider font-medium">Total Amount</p>
                <p className="text-2xl font-black text-gold mt-0.5">
                  ${total ? parseFloat(total).toFixed(2) : '0.00'}
                </p>
              </div>
              <button
                onClick={clearCart}
                className="w-10 h-10 flex items-center justify-center border border-cream-3 text-muted hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200"
                title="Clear cart"
              >
                <FiTrash2 className="text-sm" />
              </button>
            </div>
            <Link
              to="/checkout"
              onClick={handleClose}
              className="btn-gold w-full justify-center text-xs"
            >
              Checkout <BsArrowRight />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
