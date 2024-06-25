import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
        greenD: {
          100: '#CAFCD9',
          200: '#96FABE',
          300: '#60F0A8',
          400: '#38E19E',
          500: '#00CE90',
          600: '#1A9850',
          700: '#009484',
          800: '#007776',
          900: '#005962',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
export default config;
