/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent:'var(--accent)',
        
      },
    },
    
    fontFamily:{
      'public-sans': ['Public Sans', 'sans-serif'],
    }
  },
  plugins: [],
};
