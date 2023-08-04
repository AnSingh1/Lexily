/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#3EB489",
        "test-dark": "#404040",
        "dark-test-dark": "#adbac7",
        "test-lgt": "#5F6366",
        "dark-test-lgt": "#768390",
        "gray-border": "#212422",
        "dark-gray-border": "#768390",
        "dark-bg": "#1c2128",
        "dark-card": "#22272e",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        logo: ["M PLUS Rounded 1c", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
