import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

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
                // Premium color palette
                'dark-blue': '#0F172A',
                'cobalt': '#1E40AF',
                'cyan-subtle': '#E0F2FE',
                'lavender': '#F3E8FF',

                // Spectrum colors for prismatic effects
                spectrum: {
                    red: '#EF4444',
                    orange: '#F97316',
                    yellow: '#EAB308',
                    green: '#22C55E',
                    cyan: '#06B6D4',
                    blue: '#3B82F6',
                    violet: '#8B5CF6',
                },

                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            backgroundImage: {
                // Subtle mesh gradients for luminous tech aesthetic
                'mesh-light': 'radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(243, 232, 255, 0.2) 0px, transparent 50%)',
                'mesh-dark': 'radial-gradient(at 0% 0%, rgba(30, 64, 175, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%)',

                // Gradient for text
                'gradient-premium': 'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)',
                'gradient-spectrum': 'linear-gradient(90deg, #EF4444, #F97316, #EAB308, #22C55E, #06B6D4, #3B82F6, #8B5CF6)',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            letterSpacing: {
                'tighter': '-0.02em',
                'premium': '-0.01em',
            },
            boxShadow: {
                'soft': '0 2px 40px -8px rgba(0, 0, 0, 0.12)',
                'soft-lg': '0 8px 60px -12px rgba(0, 0, 0, 0.15)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
                'glow-spectrum': '0 0 30px rgba(139, 92, 246, 0.6)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            animation: {
                'glow-border': 'glow-border 10s linear infinite',
                'typewriter': 'typewriter 0.05s steps(1) forwards',
                'blur-clear': 'blur-clear 0.3s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 10s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'elastic-pop': 'elastic-pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'spectrum-flow': 'spectrum-flow 3s linear infinite',
                'light-beam': 'light-beam 2s ease-in-out infinite',
            },
            keyframes: {
                'glow-border': {
                    '0%': {
                        backgroundPosition: '0% 50%',
                        filter: 'hue-rotate(0deg)',
                    },
                    '100%': {
                        backgroundPosition: '400% 50%',
                        filter: 'hue-rotate(360deg)',
                    },
                },
                'typewriter': {
                    'to': { opacity: '1' },
                },
                'blur-clear': {
                    '0%': {
                        filter: 'blur(8px)',
                        opacity: '0',
                    },
                    '100%': {
                        filter: 'blur(0px)',
                        opacity: '1',
                    },
                },
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0px)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    },
                },
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '0.4',
                        filter: 'brightness(1)',
                    },
                    '50%': {
                        opacity: '1',
                        filter: 'brightness(1.2)',
                    },
                },
                'shimmer': {
                    '0%': {
                        backgroundPosition: '-200% 0',
                    },
                    '100%': {
                        backgroundPosition: '200% 0',
                    },
                },
                'elastic-pop': {
                    '0%': {
                        transform: 'scale(0.95)',
                    },
                    '50%': {
                        transform: 'scale(1.05)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                    },
                },
                'spectrum-flow': {
                    '0%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                    },
                },
                'light-beam': {
                    '0%, 100%': {
                        opacity: '0.3',
                        transform: 'scaleY(0.8)',
                    },
                    '50%': {
                        opacity: '1',
                        transform: 'scaleY(1.2)',
                    },
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [tailwindAnimate],
}

export default config
