module.exports = {
  content: [
    "./client/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-flowbite/**/*.js",
    "./node_modules/react-flowbite/**/*.jsx",
  ],
  theme: {
    extend: {
      flowbite: {
        theme: {
          dark: true,
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
