import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { BsBag, BsHeart, BsList, BsX, BsPerson } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProductContext } from '../contexts/ProductContext';

const categories = [
  { name: 'All', label: 'All' },
  { name: 'electronics', label: 'Electronics' },
  { name: 'jewelery', label: 'Jewelry' },
  { name: "men's clothing", label: "Men's" },
  { name: "women's clothing", label: "Women's" },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { selectedCategory, setSelectedCategory, setSearchTerm } = useContext(ProductContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try { await logout(); navigate('/login'); }
    catch (err) { console.error('Failed to log out', err); }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    setMobileMenuOpen(false);
    if (location.pathname !== '/') navigate('/');
    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchVal);
    setSearchOpen(false);
    if (location.pathname !== '/') navigate('/');
    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in">
          <div className="w-full max-w-xl bg-white shadow-2xl p-6 animate-slide-down">
            <form onSubmit={handleSearchSubmit} className="flex items-center border-b-2 border-gold gap-3 pb-2">
              <FiSearch className="text-gold text-xl flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search products, categories..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="flex-1 text-lg font-medium text-primary outline-none bg-transparent placeholder-muted-2"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-muted hover:text-primary transition-colors">
                <BsX className="text-2xl" />
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.filter(c => c.name !== 'All').map(cat => (
                <button
                  key={cat.name}
                  onClick={() => { handleCategoryClick(cat.name); setSearchOpen(false); }}
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-cream-3 text-muted hover:border-gold hover:text-gold transition-all duration-200"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isScrolled ? 'nav-scrolled' : 'nav-top'}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-[68px] lg:px-2 px-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-2xl tracking-tight text-primary group-hover:text-gold transition-colors duration-300">
                  A-Kart
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-muted font-medium">
                  Fashion & More
                </span>
              </div>
            </Link>

            {/* Category Nav – Desktop */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 relative group ${
                    selectedCategory === cat.name && location.pathname === '/'
                      ? 'text-gold'
                      : 'text-charcoal hover:text-gold'
                  }`}
                >
                  {cat.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold transition-all duration-300 ${
                    selectedCategory === cat.name && location.pathname === '/'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-charcoal hover:text-gold transition-colors duration-200"
                title="Search"
              >
                <FiSearch className="text-lg" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 text-charcoal hover:text-gold transition-colors duration-200"
                title="Wishlist"
              >
                <BsHeart className="text-lg" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 text-charcoal hover:text-gold transition-colors duration-200"
                title="Cart"
              >
                <BsBag className="text-lg" />
                {itemAmount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {itemAmount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <BsPerson />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-gold text-white hover:bg-gold-dark transition-all duration-200 shadow-gold"
                >
                  <BsPerson />
                  Login
                </Link>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden ml-1 p-2.5 text-charcoal hover:text-gold transition-colors"
              >
                {mobileMenuOpen ? <BsX className="text-2xl" /> : <BsList className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-cream-3 animate-slide-down shadow-card">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-0.5 mb-4">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                      selectedCategory === cat.name && location.pathname === '/'
                        ? 'bg-gold-light text-gold border-l-2 border-gold'
                        : 'text-charcoal hover:text-gold hover:bg-cream'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-cream-3 pt-4">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-sm font-semibold uppercase tracking-wider text-center border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-3 text-sm font-bold uppercase tracking-wider text-center bg-gold text-white hover:bg-gold-dark transition-all duration-200"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-[68px]" />
    </>
  );
}

export default Header;
