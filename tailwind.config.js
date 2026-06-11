/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}",],
  theme: {
    fontFamily: {
      primary: ['Poppins', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
    container: {
      padding: {
        DEFAULT: '15px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#B8860B',
        accent: '#D4A017',
        gold: '#C9A84C',
        'gold-light': '#F5E6C8',
        'gold-dark': '#9A7B2F',
        cream: '#FAF8F5',
        'cream-2': '#F0EBE3',
        'cream-3': '#E8E0D5',
        muted: '#6B6B6B',
        'muted-2': '#9A9A9A',
        charcoal: '#2D2D2D',
        warm: '#F7F3EE',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #D4A017 50%, #B8860B 100%)',
        'gradient-hero': 'linear-gradient(to right, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.1) 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FAF8F5 0%, #F0EBE3 100%)',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.15)',
        'gold': '0 4px 20px rgba(201,168,76,0.35)',
        'soft': '0 1px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
