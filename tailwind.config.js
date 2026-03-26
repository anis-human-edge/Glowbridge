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
        forest: '#20372D',
        stone: '#EDE9E1',
        pearl: '#F8F5EF',
        moss: '#708B68',
        clay: '#C46A3C',
        gold: '#C7A84B',
        // Operational dashboard colors
        surface: '#FFFFFF',
        surfaceHover: '#F9FAFB',
        borderFocus: '#708B68',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Sora', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
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
