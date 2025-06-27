import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}", // Ensure TypeScript files are included
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6d28d2",
          dark: "#5b21b6",
          light: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
