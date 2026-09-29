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
      // Every color is defined once in index.css (:root) as RGB channels, so opacity modifiers work.
      colors: {
        page: "rgb(var(--page) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-neutral) / <alpha-value>)",
          warm: "rgb(var(--surface-warm) / <alpha-value>)",
          cool: "rgb(var(--surface-cool) / <alpha-value>)",
          green: "rgb(var(--surface-green) / <alpha-value>)",
          tint: "rgb(var(--surface-tint) / <alpha-value>)",
          soft: "rgb(var(--surface-soft) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--text-primary) / <alpha-value>)",
          body: "rgb(var(--text-body) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          hover: "rgb(var(--brand-hover) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
          fill: "rgb(var(--brand-fill) / <alpha-value>)",
          "fill-hover": "rgb(var(--brand-fill-hover) / <alpha-value>)",
        },
        // Coral that is dark enough for text and focus rings on white and the soft surfaces.
        accent: "rgb(var(--brand-text) / <alpha-value>)",
        cool: "rgb(var(--cool) / <alpha-value>)",
        whatsapp: {
          DEFAULT: "rgb(var(--whatsapp) / <alpha-value>)",
          hover: "rgb(var(--whatsapp-hover) / <alpha-value>)",
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
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        frame: "var(--shadow-frame)",
        float: "var(--shadow-float)",
      },
    },
  },
  plugins: [],
};
