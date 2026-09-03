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
          'purple': 'rgb(var(--color-primary-purple) / <alpha-value>)',
          'purple-light': 'rgb(var(--color-primary-purple-light) / <alpha-value>)',
          'purple-dark': 'rgb(var(--color-primary-purple-dark) / <alpha-value>)',
          'blue': 'rgb(var(--color-primary-blue) / <alpha-value>)',
          'blue-light': 'rgb(var(--color-primary-blue-light) / <alpha-value>)',
          'blue-dark': 'rgb(var(--color-primary-blue-dark) / <alpha-value>)',
          'pink': 'rgb(var(--color-primary-pink) / <alpha-value>)',
          'orange': 'rgb(var(--color-primary-orange) / <alpha-value>)',
          'yellow': 'rgb(var(--color-primary-yellow) / <alpha-value>)',
        },
        'ink': {
          '950': '#0A0A0F',
          '900': '#121218',
          '800': '#1A1A22',
          '700': '#24242E',
          '600': '#33333F',
        }
      },
    },
  },
  plugins: [
    // Variante customizada: as classes "lightmode:algo" só se aplicam quando
    // a tag <html> tiver a classe "light" (tema claro ativo). Sem essa classe,
    // o site permanece no visual escuro (padrão/principal), sem nenhuma mudança.
    function ({ addVariant }) {
      addVariant('lightmode', '.light &');
    },
  ],
};
