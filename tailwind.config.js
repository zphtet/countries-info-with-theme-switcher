/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js}", "index.html"],
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
    },
    screens: {
      pc: { max: "1200px" },
      // => @media (max-width: 1535px) { ... }
      tb: { max: "768px" },
      // => @media (max-width: 1279px) { ... }

      ml: { max: "425px" },
      // => @media (max-width: 1023px) { ... }

      mm: { max: "375px" },
      // => @media (max-width: 767px) { ... }

      ms: { max: "320px" },
      // => @media (max-width: 639px) { ... }
    },

    extend: {
      maxWidth: {
        container: "87.5rem",
      },
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
