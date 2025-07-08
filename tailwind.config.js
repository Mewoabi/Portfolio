/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(var(--color-foreground))',
            '[class~="lead"]': {
              color: 'rgb(var(--color-foreground))',
            },
            strong: {
              color: 'rgb(var(--color-foreground))',
            },
            'ol > li::marker': {
              color: 'rgb(var(--color-foreground))',
            },
            'ul > li::marker': {
              color: 'rgb(var(--color-foreground))',
            },
            hr: {
              borderColor: 'rgb(var(--color-border))',
            },
            blockquote: {
              borderLeftColor: 'rgb(var(--color-border))',
              color: 'rgb(var(--color-foreground))',
            },
            h1: {
              color: 'rgb(var(--color-foreground))',
            },
            h2: {
              color: 'rgb(var(--color-foreground))',
            },
            h3: {
              color: 'rgb(var(--color-foreground))',
            },
            h4: {
              color: 'rgb(var(--color-foreground))',
            },
            code: {
              color: 'rgb(var(--color-foreground))',
            },
            'pre code': {
              color: 'rgb(var(--color-foreground))',
              backgroundColor: 'rgb(var(--color-background))',
            },
            thead: {
              color: 'rgb(var(--color-foreground))',
              borderBottomColor: 'rgb(var(--color-border))',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(var(--color-border))',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}