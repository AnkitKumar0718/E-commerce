import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from '../components/CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

function Sidebar() {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={handleClose}
          className='fixed inset-0 bg-black/50 z-10 transition-all duration-300'
        ></div>
      )}

      {/* Sidebar */}
      <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl 
      md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4
       lg:px-[35px] flex flex-col`}>
        <div className='flex justify-between items-center py-6 border-b'>
          <div className='uppercase text-sm font-semibold'>
            Shopping bag ({itemAmount})</div>
          <div onClick={handleClose} className=' cursor-pointer w-8 h-8 
          justify-center items-center flex'>
            <IoMdArrowForward className='text-2xl' />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 flex-grow overflow-y-auto overflow-x-hidden border-b'>
          {cart.map((item) => {
            return <CartItem item={item} key={item.id} />
          })}
        </div>
        <div className=' flex flex-col gap-y-3 py-4 mt-4'>
          <div className='flex w-full justify-between items-center'>
            <div className='uppercase font-semibold'>
              <span className='mr-2'>Total:</span>$ {total ? parseFloat(total).toFixed(2) : '0.00'}
            </div>
            <div onClick={clearCart} className='cursor-pointer py-4 bg-red-500 text-white w-10
            h-10 flex justify-center items-center text-xl'>
              <FiTrash2 />
            </div>
          </div>
          <Link to={'/checkout'} onClick={handleClose} className='bg-primary flex p-4 justify-center 
          items-center text-white font-medium w-full'>
            Checkout
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar;




