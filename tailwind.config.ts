import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: '#6D6AFB',
          50: '#F0F1FF',
          100: '#E5E7FF',
          200: '#D4D7FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6D6AFB',
          600: '#5B5CF6',
          700: '#4F46E5',
          800: '#4338CA',
          900: '#3730A3',
        },
        // Secondary Colors
        secondary: {
          DEFAULT: '#14B8A6',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        // Base / Landing palette
        base: {
          blue: '#4F7DF3',
          green: '#22C55E',
          dark: '#0B1020',
          darker: '#070B16',
        },
        // Accent palette used across landing pages
        accent: {
          green: '#22C55E',
          pink: '#F472B6',
          orange: '#FB923C',
          blue: '#60A5FA',
        },
        // Extra aliases used in landing design
        'primary-violet': '#7C3AED',
        'primary-blue': '#4F7DF3',
        'primary-teal': '#14B8A6',
        'bg-darker': '#0B1020',
        // Neutrals
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0B1020',
        },
        // Status Colors
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 4px 25px -5px rgba(0, 0, 0, 0.05)',
        'neumorphic': '8px 8px 16px #D1D9E6, -8px -8px 16px #FFFFFF',
        'neumorphic-dark': '8px 8px 16px #0A0E1A, -8px -8px 16px #141925',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
