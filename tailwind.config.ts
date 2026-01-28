import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base brand colors
        'base-blue': '#0052FF',
        'base-green': '#00D395',
        'base-dark': '#0A0B0D',
        'base-darker': '#050608',
        
        // Legacy colors for compatibility
        'primary-violet': '#7C3AED',
        'primary-blue': '#3B82F6',
        'primary-teal': '#14B8A6',
        'accent-green': '#10B981',
        'accent-pink': '#EC4899',
        'accent-orange': '#F59E0B',
        'bg-dark': '#0A0B0D',
        'bg-darker': '#050608',
      },
      backgroundImage: {
        'base-gradient': 'linear-gradient(135deg, #0052FF 0%, #00D395 100%)',
        'primary-gradient': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #14B8A6 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050608 0%, #0A0B0D 100%)',
      }
    }
  },
  plugins: [],
} satisfies Config
