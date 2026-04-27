/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0F19',
          secondary: '#0F172A',
          tertiary: '#111827',
        },
        accent: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#22D3EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3B82F6, #8B5CF6, #22D3EE)',
        'gradient-brand-r': 'linear-gradient(135deg, #22D3EE, #8B5CF6, #3B82F6)',
        'gradient-card': 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
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
        'glow-blue': '0 0 30px rgba(59,130,246,0.4)',
        'glow-purple': '0 0 30px rgba(139,92,246,0.4)',
        'glow-cyan': '0 0 30px rgba(34,211,238,0.4)',
        'glow-sm-blue': '0 0 12px rgba(59,130,246,0.3)',
      },
    },
  },
  plugins: [],
}
