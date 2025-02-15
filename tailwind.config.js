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
        navy:"#626070",
        red:"#C94736",
        purple:"#826CB0",
        cyan:"#82C9D7",
        yellow:"#F2CDAC",
        blue:"3F82B2",
        magenta:"#934F6F",
        green:"277C78",
        turquoise:"#597C7C",
        orange:"#BE6C49",
      },
    },
    
    fontFamily:{
      'public-sans': ['Public Sans', 'sans-serif'],
    }
  },
  plugins: [],
};
