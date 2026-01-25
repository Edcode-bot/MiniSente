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
        'primary-violet': '#7C3AED',
        'primary-blue': '#3B82F6',
        'primary-teal': '#14B8A6',
        'accent-green': '#10B981',
        'accent-pink': '#EC4899',
        'accent-orange': '#F59E0B',
        'bg-dark': '#0F172A',
        'bg-darker': '#020617',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #14B8A6 100%)',
        'dark-gradient': 'linear-gradient(180deg, #020617 0%, #0F172A 100%)',
      }
    }
  },
  plugins: [],
} satisfies Config
