/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Añade tu color personalizado
        'primary': '#00e3c2',
        // Opcional: puedes definir variantes del color
        'primary-dark': '#00b89c',
        'primary-light': '#00ffd9'
      }
    },
  },
  plugins: [],
}

