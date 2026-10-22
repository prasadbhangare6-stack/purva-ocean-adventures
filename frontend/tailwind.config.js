/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F0E7',
        cream: '#EFE8DC',
        navy: '#03121B',
        deep: '#063C59',
        cyan: '#28A8D9',
        ink: '#16242C',
        muted: '#6E7A80',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"La Belle Aurore"', 'cursive'],
      },
      letterSpacing: {
        eyebrow: '0.26em',
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        sea: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
