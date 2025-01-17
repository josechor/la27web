/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    fontSize: {
      xs: ['12px', '14px'],
      sm: ['13px', '16px'],
      base: ['14px', '20px'],
      lg: ['16px', '24px'],
      xl: ['20px', '32px'],
    },
    extend: {
      colors: {
        "background-colors": {
          primary: "#000",
          secondary: "#333333",
          tertiary: "#4d4d4d",
          quaternary: "#2f3336",
        },
        "text-color": {
          primary: "#f5f5f5",
          secondary: "#cccccc",
          tertiary: "#999999",
        },
        "purple": {
          primary: "#b061c2",
          secondary: "#a44f9b",

        }
      },
    },
  },
  darkMode: "class", // Habilitamos el modo oscuro usando 'class'
  plugins: [],
};
