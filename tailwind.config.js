/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./content/**/*.{md,mdx}",
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--main-text-color)',
            a: {
              color: 'var(--link-color)',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: 'var(--link-hover-color)',
              },
            },
            h1: {
              color: 'var(--main-text-color)',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              color: 'var(--main-text-color)',
              fontWeight: '700',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            h3: {
              color: 'var(--main-text-color)',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            h4: {
              color: 'var(--main-text-color)',
              fontWeight: '600',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.75',
            },
            ul: {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            ol: {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            img: {
              marginTop: '2rem',
              marginBottom: '2rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
              borderRadius: theme('borderRadius.lg'),
            },
            blockquote: {
              color: 'var(--main-text-color)',
              borderLeftColor: 'var(--link-color)',
              fontStyle: 'italic',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            code: {
              color: 'var(--main-text-color)',
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              borderRadius: theme('borderRadius.lg'),
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            strong: {
              color: 'var(--main-text-color)',
              fontWeight: '700',
            },
            em: {
              color: 'var(--main-text-color)',
              fontStyle: 'italic',
            },
          },
        },
        invert: {
          css: {
            color: 'var(--main-text-color)',
            a: {
              color: 'var(--link-color)',
            },
            h1: {
              color: 'var(--main-text-color)',
            },
            h2: {
              color: 'var(--main-text-color)',
            },
            h3: {
              color: 'var(--main-text-color)',
            },
            h4: {
              color: 'var(--main-text-color)',
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: 'var(--main-text-color)',
              borderLeftColor: 'var(--link-color)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
