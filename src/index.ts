import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

const lightColors = {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 47.4% 11.2%)',
    muted: 'hsl(210 40% 96.1%)',
    'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
    popover: 'hsl(0 0% 100%)',
    'popover-foreground': 'hsl(222.2 47.4% 11.2%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    input: 'hsl(214.3 31.8% 91.4%)',
    card: 'hsl(0 0% 100%)',
    'card-foreground': 'hsl(222.2 47.4% 11.2%)',
    primary: 'hsl(222.2 47.4% 11.2%)',
    'primary-foreground': 'hsl(210 40% 98%)',
    secondary: 'hsl(210 40% 96.1%)',
    'secondary-foreground': 'hsl(222.2 47.4% 11.2%)',
    accent: 'hsl(210 40% 96.1%)',
    'accent-foreground': 'hsl(222.2 47.4% 11.2%)',
    destructive: 'hsl(0 100% 50%)',
    'destructive-foreground': 'hsl(210 40% 98%)',
    ring: 'hsl(215 20.2% 65.1%)',
}

const darkColors = {
    background: 'hsl(224 71% 4%)',
    foreground: 'hsl(213 31% 91%)',
    muted: 'hsl(223 47% 11%)',
    'muted-foreground': 'hsl(215.4 16.3% 56.9%)',
    accent: 'hsl(216 34% 17%)',
    'accent-foreground': 'hsl(210 40% 98%)',
    popover: 'hsl(224 71% 4%)',
    'popover-foreground': 'hsl(215 20.2% 65.1%)',
    border: 'hsl(216 34% 17%)',
    input: 'hsl(216 34% 17%)',
    card: 'hsl(224 71% 4%)',
    'card-foreground': 'hsl(213 31% 91%)',
    primary: 'hsl(210 40% 98%)',
    'primary-foreground': 'hsl(222.2 47.4% 1.2%)',
    secondary: 'hsl(222.2 47.4% 11.2%)',
    'secondary-foreground': 'hsl(210 40% 98%)',
    destructive: 'hsl(0 63% 31%)',
    'destructive-foreground': 'hsl(210 40% 98%)',
    ring: 'hsl(216 34% 17%)',
}

export default plugin(
    function ({ addBase }) {
        addBase({
            ':root': lightColors,
            '.dark': darkColors,
            '*': {
                'border-color': 'hsl(214.3 31.8% 91.4%)',
            },
            body: {
                'background-color': lightColors.background,
                color: lightColors.foreground,
                '-webkit-font-smoothing': 'antialiased',
                '-moz-osx-font-smoothing': 'grayscale',
            },
            '.dark body': {
                'background-color': darkColors.background,
                color: darkColors.foreground,
            },
        })
    },
    {
        theme: {
            extend: {
                colors: {
                    border: lightColors.border,
                    input: lightColors.input,
                    ring: lightColors.ring,
                    background: lightColors.background,
                    foreground: lightColors.foreground,
                    primary: {
                        DEFAULT: lightColors.primary,
                        foreground: lightColors['primary-foreground'],
                    },
                    secondary: {
                        DEFAULT: lightColors.secondary,
                        foreground: lightColors['secondary-foreground'],
                    },
                    destructive: {
                        DEFAULT: lightColors.destructive,
                        foreground: lightColors['destructive-foreground'],
                    },
                    muted: {
                        DEFAULT: lightColors.muted,
                        foreground: lightColors['muted-foreground'],
                    },
                    accent: {
                        DEFAULT: lightColors.accent,
                        foreground: lightColors['accent-foreground'],
                    },
                    popover: {
                        DEFAULT: lightColors.popover,
                        foreground: lightColors['popover-foreground'],
                    },
                    card: {
                        DEFAULT: lightColors.card,
                        foreground: lightColors['card-foreground'],
                    },
                },
                borderRadius: {
                    lg: '0.5rem',
                    md: '0.3rem',
                    sm: '0.1rem',
                },
            },
        },
    },
)
