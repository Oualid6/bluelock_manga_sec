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
            colors: {
                'jjk-red': '#D32F2F',
                'jjk-dark': '#121212',
                'jjk-gray': '#1E1E1E',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
