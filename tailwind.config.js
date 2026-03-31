// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'primary-bg': '#0d0d1a',
        'secondary-bg': '#111128',
        'card-bg': '#161630',
        'accent-1': '#64ffda',
        'accent-2': '#e94560',
        'accent-3': '#7c3aed',
        'text-primary': '#ccd6f6',
        'text-secondary': '#8892b0',
        // Light mode colors
        'light-primary-bg': '#f8faff',
        'light-secondary-bg': '#eef2ff',
        'light-card-bg': '#ffffff',
        'light-accent-1': '#0ea5e9',
        'light-accent-2': '#e94560',
        'light-text-primary': '#1e2a4a',
        'light-text-secondary': '#4a5568',
      },
      fontFamily: {
        sans: ['"Inter"', '"JetBrains Mono"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        display: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'text-focus-in': 'text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'slide-in-bottom': 'slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'slide-up': 'slideUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.8s ease-out both',
        'bounce-light': 'bounceLight 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'orbit': 'orbit 15s linear infinite',
      },
      keyframes: {
        'text-focus-in': {
          '0%': { filter: 'blur(12px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(100, 255, 218, 0.7)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      boxShadow: {
        'glow-teal': '0 0 30px rgba(100, 255, 218, 0.3)',
        'glow-red': '0 0 30px rgba(233, 69, 96, 0.3)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    }
  },
  plugins: [],
}