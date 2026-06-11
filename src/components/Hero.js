import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const categories = [
  {
    name: 'electronics',
    label: 'Electronics',
    desc: 'Latest Gadgets & Tech',
    emoji: '💻',
    bg: 'bg-slate-800',
    badge: 'New Arrivals',
  },
  {
    name: 'jewelery',
    label: 'Jewelry',
    desc: 'Fine Luxury Collection',
    emoji: '💍',
    bg: 'bg-amber-700',
    badge: 'Bestsellers',
  },
  {
    name: "men's clothing",
    label: "Men's",
    desc: 'Street & Formal Wear',
    emoji: '🧥',
    bg: 'bg-stone-700',
    badge: 'Trending',
  },
  {
    name: "women's clothing",
    label: "Women's",
    desc: 'Feminine & Chic Styles',
    emoji: '👗',
    bg: 'bg-rose-700',
    badge: 'New Season',
  },
];

function Hero() {
  const { setSelectedCategory } = useContext(ProductContext);
  const navigate = useNavigate();

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-cream">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-cream-2 min-h-[88vh] flex items-center">
        {/* Warm background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }} />

        {/* Large decorative text */}
        <div className="absolute right-0 bottom-0 text-[20vw] font-black leading-none text-cream-3 select-none pointer-events-none opacity-60">
          STYLE
        </div>

        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-24">

            {/* Left content */}
            <div className="space-y-8 animate-fade-up">
              <div>
                <p className="section-label mb-3">New Season 2026</p>
                <h1 className="font-serif text-5xl lg:text-7xl font-bold text-primary leading-[1.05] tracking-tight">
                  Discover Your<br />
                  <span className="italic text-gold">Style</span> Today!
                </h1>
              </div>

              <p className="text-muted text-base leading-relaxed max-w-md">
                Explore thousands of curated products across electronics, fashion, jewelry and more — all at unbeatable prices, delivered to your door.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToProducts}
                  className="btn-gold text-sm shadow-gold hover:-translate-y-0.5"
                >
                  Shop Now
                  <BsArrowRight />
                </button>
                <button
                  onClick={() => { handleCategoryClick('All'); }}
                  className="btn-outline text-sm"
                >
                  View All Collections
                </button>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-cream-3">
                {[
                  { icon: '🚚', text: 'Free Shipping' },
                  { icon: '↩️', text: 'Easy Returns' },
                  { icon: '🔒', text: 'Secure Payment' },
                  { icon: '⭐', text: 'Top Rated' },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-2 text-sm text-muted font-medium">
                    <span>{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Stats + highlight card */}
            <div className="hidden lg:flex flex-col gap-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {/* Promo card */}
              <div className="bg-charcoal text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-bl-full" />
                <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">Spring Collection</p>
                <h2 className="font-serif text-4xl font-bold mb-2 leading-tight">
                  Up to<br /><span className="text-gold">30% Off</span>
                </h2>
                <p className="text-gray-400 text-sm mb-6">Limited time offer on selected styles.</p>
                <button onClick={scrollToProducts} className="btn-gold text-xs">
                  Shop Now <BsArrowRight />
                </button>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: '20+', label: 'Products' },
                  { num: '4', label: 'Categories' },
                  { num: '24/7', label: 'Support' },
                ].map(s => (
                  <div key={s.label} className="bg-white p-4 text-center border border-cream-3">
                    <p className="text-2xl font-black text-gold">{s.num}</p>
                    <p className="text-muted text-xs font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Bar ── */}
      <div className="bg-white border-y border-cream-3 py-4 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $50' },
            { icon: '💳', title: 'Secure Payment', desc: '100% protected checkout' },
            { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
            { icon: '🎧', title: '24/7 Support', desc: 'Always here for you' },
          ].map(f => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{f.title}</p>
                <p className="text-xs text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Grid ── */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label justify-center mb-2">Browse</p>
            <h2 className="font-serif text-4xl font-bold text-primary">
              Shop by <span className="italic text-gold">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${cat.bg}`}
                style={{ minHeight: 180 }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />

                {/* Background emoji */}
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 select-none">
                  {cat.emoji}
                </div>

                <div className="relative z-10 p-6 flex flex-col h-full justify-between" style={{ minHeight: 180 }}>
                  <div>
                    <span className="inline-block bg-gold text-white text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 mb-3">
                      {cat.badge}
                    </span>
                    <h3 className="font-serif text-white font-bold text-xl leading-tight mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">{cat.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-wider mt-4 group-hover:gap-2.5 transition-all duration-200">
                    Browse <BsArrowRight />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
