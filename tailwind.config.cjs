/** @type {import('tailwindcss').Config} */
const systemFonts = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  '"Segoe UI"',
  "Roboto",
  "Tahoma",
  "Arial",
  "sans-serif",
];

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0b0e",
          900: "#111115",
          850: "#16161b",
          800: "#1c1c22",
          700: "#2a2a32",
        },
        brand: {
          DEFAULT: "#ff4a3f",
          hover: "#ff6a61",
          ink: "#1a0604",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', ...systemFonts],
        // Latin characters still use Plus Jakarta Sans; Arabic characters fall through to Readex Pro.
        arabic: ['"Plus Jakarta Sans Variable"', '"Readex Pro Variable"', ...systemFonts],
      },
      screens: {
        xs: "450px",
      },
      boxShadow: {
        frame: "0 24px 60px -24px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
