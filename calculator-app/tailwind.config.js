/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // slate-900
        surface: 'rgba(30, 41, 59, 0.7)', // surface with opacity for glass effect
        primary: '#3b82f6', // blue-500
        secondary: '#8b5cf6', // violet-500
        textPrimary: '#f8fafc', // slate-50
        textSecondary: '#cbd5e1', // slate-300
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
