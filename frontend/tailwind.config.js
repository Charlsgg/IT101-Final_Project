/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',       // Your Dark Black
        accent: '#3b82f6',        // Your Blue
        bg: '#f5f5f5',            // Light Gray Background
        surface: '#ffffff',       // White Cards
        'text-main': '#111111',   // Main Text
        'text-muted': '#757575',  // Gray Text
        border: '#e5e5e5',        // Light Borders
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Font family
      }
    },
  },
  plugins: [],
}