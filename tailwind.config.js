/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'main-bg': 'var(--main-bg-color)',
        'main-text': 'var(--main-text-color)',
        'link': 'var(--link-color)',
        'link-hover': 'var(--link-hover-color)',
        'icon': 'var(--icon-color)',
      },
      fontFamily: {
        sans: ['Google Sans Flex', 'sans-serif'],
        mono: ['Noto Sans Mono', 'IBM Plex Mono', 'monospace'],
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
