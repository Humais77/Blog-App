// tailwind.config.js
export default {
  darkMode: "class",  // <-- important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite-react/plugin'),require('tailwind-scrollbar')],
}
