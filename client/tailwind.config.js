/** @type {import('tailwindcss').Config} */

const blackA = {
  blackA1: 'hsla(0, 0%, 0%, 0.012)',
  blackA2: 'hsla(0, 0%, 0%, 0.027)',
  blackA3: 'hsla(0, 0%, 0%, 0.047)',
  blackA4: 'hsla(0, 0%, 0%, 0.071)',
  blackA5: 'hsla(0, 0%, 0%, 0.090)',
  blackA6: 'hsla(0, 0%, 0%, 0.114)',
  blackA7: 'hsla(0, 0%, 0%, 0.141)',
  blackA8: 'hsla(0, 0%, 0%, 0.220)',
  blackA9: 'hsla(0, 0%, 0%, 0.439)',
  blackA10: 'hsla(0, 0%, 0%, 0.478)',
  blackA11: 'hsla(0, 0%, 0%, 0.565)',
  blackA12: 'hsla(0, 0%, 0%, 0.910)',
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA
      }
    },
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  plugins: [],
}
