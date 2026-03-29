import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgb(30 41 59)',
        background: 'rgb(2 6 23)',
        card: 'rgb(15 23 42 / 0.5)',
        primary: {
          DEFAULT: 'rgb(16 185 129)',
          foreground: 'white',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
