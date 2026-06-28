/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F59E0B',    // Amber-500: Industrial Yellow
          yellowDark: '#D97706',// Amber-600: Heavy Equipment Yellow
          yellowLight: '#FBBF24',// Amber-400: Highlight Yellow
          black: '#0D0F12',     // Custom Deep Coal Black
          charcoal: '#1E232A',  // Textured Dark Grey
          slate: '#374151',     // Medium Steel Grey
          light: '#F3F4F6',     // Off-white background
          border: '#2A303C',    // Subtle dark border
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(245, 158, 11, 0.15)',
        'brand-lg': '0 10px 25px -3px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
}
