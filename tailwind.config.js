/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        "light-background-colors": {
          primary: "#000",
          secondary: "#333333",
          tertiary: "#4d4d4d",
          quaternary: "#2f3336",
        },
        
        "dark-background-color": {
          primary: "#1a1a1a",
          secondary: "#333333",
          tertiary: "#4d4d4d",
          quaternary: "#666666",
        },
        "light-text-color": {
          primary: "#f5f5f5",
          secondary: "#cccccc",
          tertiary: "#999999",
        },
        "dark-text-color": {
          primary: "#f5f5f5",
          secondary: "#cccccc",
          tertiary: "#999999",
        },
      },
    },
  },
  darkMode: "class", // Habilitamos el modo oscuro usando 'class'
  plugins: [],
};
