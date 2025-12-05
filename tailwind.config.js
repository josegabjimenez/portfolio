module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#BB000E',
          light: '#E31C25',
          glow: 'rgba(187, 0, 14, 0.4)',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#121212',
          card: 'rgba(20, 20, 20, 0.6)',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.08)',
          bg: 'rgba(255, 255, 255, 0.03)',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Cormorant', 'serif'],
        headline: ['Syne', 'sans-serif'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-5px)' },
          '75%': { transform: 'translateY(-25px) translateX(5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dracula: {
          ...require('daisyui/src/colors/themes')['[data-theme=dracula]'],
          primary: '#BB000E',
          'primary-focus': '#E31C25',
          'base-100': '#0a0a0a',
          'base-200': '#121212',
          'base-300': '#1a1a1a',
        },
      },
    ],
  },
};
