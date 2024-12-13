import plugin from 'tailwindcss/plugin.js'
import type { Config } from 'tailwindcss'
import { parseToHsla, hsla } from 'color2k'

const defaultLightColors = {
    background: '0 0% 100%',
    foreground: '222.2 47.4% 11.2%',
    muted: '210 40% 96.1%',
    'muted-foreground': '215.4 16.3% 46.9%',
    popover: '0 0% 100%',
    'popover-foreground': '222.2 47.4% 11.2%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    card: '0 0% 100%',
    'card-foreground': '222.2 47.4% 11.2%',
    primary: '222.2 47.4% 11.2%',
    'primary-foreground': '210 40% 98%',
    secondary: '210 40% 96.1%',
    'secondary-foreground': '222.2 47.4% 11.2%',
    accent: '210 40% 96.1%',
    'accent-foreground': '222.2 47.4% 11.2%',
    destructive: '0 100% 50%',
    'destructive-foreground': '210 40% 98%',
    ring: '215 20.2% 65.1%',
} as const

const defaultDarkColors = {
    background: '224 71% 4%',
    foreground: '213 31% 91%',
    muted: '223 47% 11%',
    'muted-foreground': '215.4 16.3% 56.9%',
    accent: '216 34% 17%',
    'accent-foreground': '210 40% 98%',
    popover: '224 71% 4%',
    'popover-foreground': '215 20.2% 65.1%',
    border: '216 34% 17%',
    input: '216 34% 17%',
    card: '224 71% 4%',
    'card-foreground': '213 31% 91%',
    primary: '210 40% 98%',
    'primary-foreground': '222.2 47.4% 1.2%',
    secondary: '222.2 47.4% 11.2%',
    'secondary-foreground': '210 40% 98%',
    destructive: '0 63% 31%',
    'destructive-foreground': '210 40% 98%',
    ring: '216 34% 17%',
} as const

interface PluginOptions {
    lightColors?: Partial<Record<keyof typeof defaultLightColors, string>>
    darkColors?: Partial<Record<keyof typeof defaultDarkColors, string>>
}

function convertColorToHslValues(color: string): string {
    try {
        // If it's already in our HSL format, return as is
        if (/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/.test(color)) {
            return color
        }

        // Convert any valid CSS color to HSL values
        const [h, s, l] = parseToHsla(color)
        const hue = Math.round(h * 360)
        const saturation = Math.round(s * 100)
        const lightness = Math.round(l * 100)
        return `${hue} ${saturation}% ${lightness}%`
    } catch (error) {
        console.warn(`Invalid color value: ${color}. Using default.`)
        return color
    }
}

function processColorConfig<T extends Record<string, string>>(
    colors: T,
): Record<keyof T, string> {
    return Object.fromEntries(
        Object.entries(colors).map(([key, value]) => [
            key,
            convertColorToHslValues(value),
        ]),
    ) as Record<keyof T, string>
}

export function shadcnPlugin(options: PluginOptions = {}) {
    const processedLightColors = processColorConfig({
        ...defaultLightColors,
        ...options.lightColors,
    })
    const processedDarkColors = processColorConfig({
        ...defaultDarkColors,
        ...options.darkColors,
    })

    return plugin(
        function ({ addBase }) {
            addBase({
                ':root': Object.fromEntries(
                    Object.entries(processedLightColors).map(([key, value]) => [
                        `--${key}`,
                        value,
                    ]),
                ),
                '.dark': Object.fromEntries(
                    Object.entries(processedDarkColors).map(([key, value]) => [
                        `--${key}`,
                        value,
                    ]),
                ),
                '*': {
                    'border-color': 'hsl(var(--border))',
                },
                body: {
                    'background-color': 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                },
            })
        },
        {
            theme: {
                extend: {
                    colors: {
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        primary: {
                            DEFAULT: 'hsl(var(--primary))',
                            foreground: 'hsl(var(--primary-foreground))',
                        },
                        secondary: {
                            DEFAULT: 'hsl(var(--secondary))',
                            foreground: 'hsl(var(--secondary-foreground))',
                        },
                        destructive: {
                            DEFAULT: 'hsl(var(--destructive))',
                            foreground: 'hsl(var(--destructive-foreground))',
                        },
                        muted: {
                            DEFAULT: 'hsl(var(--muted))',
                            foreground: 'hsl(var(--muted-foreground))',
                        },
                        accent: {
                            DEFAULT: 'hsl(var(--accent))',
                            foreground: 'hsl(var(--accent-foreground))',
                        },
                        popover: {
                            DEFAULT: 'hsl(var(--popover))',
                            foreground: 'hsl(var(--popover-foreground))',
                        },
                        card: {
                            DEFAULT: 'hsl(var(--card))',
                            foreground: 'hsl(var(--card-foreground))',
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
}

export default shadcnPlugin
