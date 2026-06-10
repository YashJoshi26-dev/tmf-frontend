/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — luxury saree showroom
        brand: {
          maroon:    '#7B1E2B',
          maroonDark:'#5A1521',
          gold:      '#C9A14A',
          goldDark:  '#A8843A',
          ivory:     '#FBF7F1',
          cream:     '#F3EBDC',
          rose:      '#E8B4B8',
          charcoal:  '#1F1A17',
          muted:     '#6B6258',
        },
      },
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        soft:    '0 4px 24px rgba(31, 26, 23, 0.06)',
        lifted:  '0 8px 32px rgba(31, 26, 23, 0.10)',
        luxe:    '0 12px 48px rgba(123, 30, 43, 0.12)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'shimmer':    'shimmer 1.6s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: 0 },
                   '100%': { transform: 'translateY(0)', opacity: 1 } },
        shimmer: { '0%': { backgroundPosition: '-1000px 0' },
                   '100%': { backgroundPosition: '1000px 0' } },
      },
      maxWidth: { '8xl': '88rem' },
    },
  },
  plugins: [],
};
