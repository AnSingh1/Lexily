/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        brand: "#3EB489",
        "test-dark": "#404040",
        "test-lgt": "#5F6366",
        "gray-border": "#212422",
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
