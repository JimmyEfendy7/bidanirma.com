/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-[#FAAFBE]/20',
    'bg-[var(--primary-pink)]',
    'text-[var(--primary-pink)]',
    'bg-gray-50',
    'bg-gray-100',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3'
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': 'var(--primary-pink)',
        'dark-pink': 'var(--dark-pink)',
        'primary-white': 'var(--primary-white)',
        'dark-white': 'var(--dark-white)',
        'primary-black': 'var(--primary-black)',
        'light-black': 'var(--light-black)',
        'primary-yellow': 'var(--primary-yellow)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-437%)' },
        },
      },
    },
  },
  plugins: [],
} 