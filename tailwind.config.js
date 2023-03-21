/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "text-color": "var(--text-color)",
      },
      fontFamily: {
        roboto: "Roboto",
      },
      flex: {
        "2": "2",
        "base": "1"
      },
      boxShadow: {
        "normal": "0 0 11px rgba(33, 33, 33, .1)"
      }
    },
  },
  plugins: [],
};
