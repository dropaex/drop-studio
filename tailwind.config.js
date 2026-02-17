/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          'purple': '#9333EA',
          'purple-light': '#A855F7',
          'purple-dark': '#7E22CE',
          'blue': '#6366F1',
          'pink': '#EC4899',
          'orange': '#F97316',
          'yellow': '#FBBF24',
        }
      },
    },
  },
  plugins: [],
};
