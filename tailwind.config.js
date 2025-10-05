
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{pages,components,hooks,lib,sections,shared,layout,mockup,profile,timetable,learn,dashboard}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        'background-light': '#F8F9FA',
        'text-primary': '#111827',
        'text-neutral': '#1F2937',
        'primary': '#22C55E',
        'secondary': '#3B82F6',
        'accent': '#F59E0B',
        'danger': '#EF4444',
        'success': '#10B981',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'soft-top': '0 -4px 6px -1px rgba(0, 0, 0, 0.05)',
        'inset-soft': 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
