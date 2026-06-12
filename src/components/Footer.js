import React from 'react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsTwitter, BsFacebook, BsPinterest } from 'react-icons/bs';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-white">A-Kart</span>
                <div className="w-8 h-0.5 bg-gold mt-1.5" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premium destination for fashion, electronics, jewelry and lifestyle. Quality you can trust, styles you'll love.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: BsInstagram, href: 'https://www.instagram.com' },
                { Icon: BsTwitter, href: 'https://www.twitter.com' },
                { Icon: BsFacebook, href: 'https://www.facebook.com' },
                { Icon: BsPinterest, href: 'https://www.pinterest.com' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Products', to: '/' },
                { label: 'My Wishlist', to: '/wishlist' },
                { label: 'Login', to: '/login' },
                { label: 'Sign Up', to: '/signup' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-sm hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200 inline-block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Electronics', emoji: '⚡' },
                { label: 'Jewelry', emoji: '💎' },
                { label: "Men's Fashion", emoji: '👔' },
                { label: "Women's Fashion", emoji: '👗' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to="/"
                    className="text-gray-400 text-sm hover:text-gold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>{item.emoji}</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Get In Touch
            </h3>
            <ul className="space-y-3 mb-6">
              {[
                { Icon: FiMapPin, text: '123 Commerce Ave, NY 10001' },
                { Icon: FiPhone, text: '+1 (555) 123-4567' },
                { Icon: FiMail, text: 'hello@akart.com' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="text-gold text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{text}</span>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-gold placeholder-gray-500 transition-colors"
                />
                <button className="px-4 py-2.5 bg-gold text-white text-xs font-bold hover:bg-gold-dark transition-colors uppercase tracking-wider">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© 2026 A-Kart. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <button type="button" className="hover:text-gold transition-colors">Privacy Policy</button>
            <button type="button" className="hover:text-gold transition-colors">Terms of Service</button>
            <button type="button" className="hover:text-gold transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
