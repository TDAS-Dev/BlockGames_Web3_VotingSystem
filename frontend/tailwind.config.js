module.exports = {
  content: ["./**/*.{html,js}", "./html_files/**/*.{html,js}"],
  theme: {
    extend: {
      backgrounImage: {
        hero: "url('./src/img/bg.jpg')",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      heading: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
