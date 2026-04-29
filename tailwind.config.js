/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#eef2f5',
        },
        accent: {
          primary: '#0f4c81',
          secondary: '#1386a6',
          soft: '#e6f1f7',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'Lato', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0f4c81, #1386a6)',
        'gradient-brand-r': 'linear-gradient(135deg, #1386a6, #0f4c81)',
        'gradient-card': 'linear-gradient(135deg, rgba(15,76,129,0.08), rgba(19,134,166,0.08))',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin-reverse 18s linear infinite',
        'spin-med': 'spin 24s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(15,76,129,0.25)',
        'glow-purple': '0 0 30px rgba(19,134,166,0.25)',
        'glow-cyan': '0 0 30px rgba(19,134,166,0.25)',
        'glow-sm-blue': '0 0 12px rgba(15,76,129,0.2)',
      },
    },
  },
  plugins: [],
}
