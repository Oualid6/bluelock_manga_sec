/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./App.{js,ts,jsx,tsx}",
        "./index.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
        "./hooks/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'xs': '400px',
            },
            colors: {
                'bb-blue': '#134a9f', // Blue Lock Blue (Cyan/Electric Blue)
                'bb-light': '#E3F2FD',
                'bb-dark': '#121212', // JJK Dark Background
                'bb-gray': '#1E1E1E', // JJK Dark Gray
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
