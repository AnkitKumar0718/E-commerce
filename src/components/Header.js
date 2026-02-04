import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { BsBag } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Header() {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    })
  })

  return (
    <>
      <div className={`bg-black ${isActive ? 'shadow-md' : ''}
fixed w-full z-10 transition-all`}>
        <div className='container mx-auto flex items-center justify-between
  h-[50px] lg:px-2 px-4'>
          <Link to={'/'}>
            <div className='mb-2'>
              <h1 className=' border-white text-[30px] leading-[1.1] font-bold
       text-white '>A-kart</h1>
            </div>
          </Link>
          <div className='flex gap-8 items-center'>
            <Link to={'/wishlist'} className='cursor-pointer flex relative'>
              <BsHeart className='text-2xl text-white' />
              {wishlist.length > 0 && (
                <div className='bg-red-500 text-[12px]
          w-[18px] h-[18px] text-white rounded-full flex justify-center items-center absolute -top-2 -right-2'>
                  {wishlist.length}
                </div>
              )}
            </Link>
            <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
              <BsBag className='text-2xl text-white' />
              <div className='bg-red-500 text-[12px]
        w-[18px] h-[18px] text-white rounded-full flex justify-center items-center absolute -top-2 -right-2'>
                {itemAmount}
              </div>
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className='inline-flex items-center justify-center h-8 text-white bg-red-600 px-3 rounded text-sm font-semibold hover:bg-red-700 transition'
              >
                Logout
              </button>
            ) : (
              <Link
                to='/login'
                className='inline-flex items-center justify-center h-8 hover:text-white hover:bg-yellow-500 px-3 rounded text-sm font-semibold bg-white text-primary transition'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>

  )
}

export default Header
