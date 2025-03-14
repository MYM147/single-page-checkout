/** @type {import('tailwindcss').Config} */
import dropclothConfig from '@prism/dropcloth/tailwind.preset.js';

export default {
  presets: [dropclothConfig],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      modal: ['Helvetica', 'Arial', 'sans-serif'],
      confirm: ['Frutiger Neue Condensed', 'Arial', 'Helvetica', 'sans-serif'],
    },
  },
  plugins: [],
};
