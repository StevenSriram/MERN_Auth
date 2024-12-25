/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "sans-serif"], // Lora font
        montserrat: ["Montserrat", "sans-serif"], // Montserrat font
      },
    },
  },
  plugins: [],
};
