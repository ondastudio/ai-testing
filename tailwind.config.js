/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'text-highlighted':     'var(--color-text-highlighted)',
        'text-body-primary':    'var(--color-text-body-primary)',
        'text-action-primary':  'var(--color-text-action-primary)',
        'text-action-secondary':'var(--color-text-action-secondary)',
        'text-action-inverted': 'var(--color-text-action-inverted)',
        'border-action':        'var(--color-border-action)',
        'surface-action':       'var(--color-surface-action)',
        'surface-page':         'var(--color-surface-page)',
        'brand-white':          'var(--color-white)',
        'brand-black':          'var(--color-black)',
      },
      fontFamily: {
        primary:   ['var(--font-family-primary)'],
        secondary: ['var(--font-family-secondary)'],
      },
      fontSize: {
        h1:       ['var(--font-size-h1)',      { lineHeight: 'var(--line-height-h1)',       letterSpacing: 'var(--letter-spacing-h1)' }],
        'body-lg':['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-body-lg)',  letterSpacing: 'var(--letter-spacing-body-lg)' }],
        'body-md':['var(--font-size-body-md)', { lineHeight: 'var(--line-height-body-md)',  letterSpacing: 'var(--letter-spacing-body-md)' }],
      },
      spacing: {
        'sm':  'var(--spacing-sm)',
        'lg':  'var(--spacing-lg)',
        'xlg': 'var(--spacing-xlg)',
      },
      borderRadius: {
        button: 'var(--border-radius-button)',
      },
    },
  },
  plugins: [],
}
