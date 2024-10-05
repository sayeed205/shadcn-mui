import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    container: 'hsl(var(--primary-container))',
                    'on-primary': 'hsl(var(--on-primary))',
                    'on-primary-container': 'hsl(var(--on-primary-container))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    container: 'hsl(var(--secondary-container))',
                    'on-secondary': 'hsl(var(--on-secondary))',
                    'on-secondary-container':
                        'hsl(var(--on-secondary-container))',
                },
                tertiary: {
                    DEFAULT: 'hsl(var(--tertiary))',
                    container: 'hsl(var(--tertiary-container))',
                    'on-tertiary': 'hsl(var(--on-tertiary))',
                    'on-tertiary-container':
                        'hsl(var(--on-tertiary-container))',
                },
                error: {
                    DEFAULT: 'hsl(var(--error))',
                    container: 'hsl(var(--error-container))',
                    'on-error': 'hsl(var(--on-error))',
                    'on-error-container': 'hsl(var(--on-error-container))',
                },
                background: 'hsl(var(--background))',
                'on-background': 'hsl(var(--on-background))',
                surface: 'hsl(var(--surface))',
                'on-surface': 'hsl(var(--on-surface))',
                'surface-variant': 'hsl(var(--surface-variant))',
                'on-surface-variant': 'hsl(var(--on-surface-variant))',
                outline: 'hsl(var(--outline))',
                'outline-variant': 'hsl(var(--outline-variant))',
                shadow: 'hsl(var(--shadow))',
                scrim: 'hsl(var(--scrim))',
                'inverse-surface': 'hsl(var(--inverse-surface))',
                'inverse-on-surface': 'hsl(var(--inverse-on-surface))',
                'inverse-primary': 'hsl(var(--inverse-primary))',
                'primary-fixed': 'hsl(var(--primary-fixed))',
                'on-primary-fixed': 'hsl(var(--on-primary-fixed))',
                'primary-fixed-dim': 'hsl(var(--primary-fixed-dim))',
                'on-primary-fixed-variant':
                    'hsl(var(--on-primary-fixed-variant))',
                'secondary-fixed': 'hsl(var(--secondary-fixed))',
                'on-secondary-fixed': 'hsl(var(--on-secondary-fixed))',
                'secondary-fixed-dim': 'hsl(var(--secondary-fixed-dim))',
                'on-secondary-fixed-variant':
                    'hsl(var(--on-secondary-fixed-variant))',
                'tertiary-fixed': 'hsl(var(--tertiary-fixed))',
                'on-tertiary-fixed': 'hsl(var(--on-tertiary-fixed))',
                'tertiary-fixed-dim': 'hsl(var(--tertiary-fixed-dim))',
                'on-tertiary-fixed-variant':
                    'hsl(var(--on-tertiary-fixed-variant))',
                'surface-dim': 'hsl(var(--surface-dim))',
                'surface-bright': 'hsl(var(--surface-bright))',
                'surface-container-lowest':
                    'hsl(var(--surface-container-lowest))',
                'surface-container-low': 'hsl(var(--surface-container-low))',
                'surface-container': 'hsl(var(--surface-container))',
                'surface-container-high': 'hsl(var(--surface-container-high))',
                'surface-container-highest':
                    'hsl(var(--surface-container-highest))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            animation: {
                ripple: 'ripple 0.6s ease-out',
            },
            keyframes: {
                ripple: {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(4)',
                        opacity: '0',
                    },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
