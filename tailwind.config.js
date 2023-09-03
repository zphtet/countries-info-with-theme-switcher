/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js}", "index.html"],
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
    },

    extend: {
      colors: {
        dblue: "hsl(209, 23%, 22%)",
        "dblue-bg": "hsl(207, 26%, 17%)",
        "dblue-text": "hsl(200, 15%, 8%)",
        dgray: " hsl(0, 0%, 52%)",
        "very-lgray": "hsl(0, 0%, 98%)",
        "white-all": "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
