/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0C1016',
        stone: '#EDE9E1',
        pearl: '#F8F5EF',
        brand: '#b83518',
        creator: '#1c5c3f',
        ai: '#3d3075',
        manager: '#c49a3c',
        // Operational dashboard colors
        surface: '#FFFFFF',
        surfaceHover: '#F9FAFB',
        borderFocus: '#1c5c3f',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
        serif: ['Libre Baskerville', 'serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'grain': "url('/noise.png')",
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'premium-hover': '0 20px 40px -10px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
