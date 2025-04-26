
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,js,jsx}",
		"./components/**/*.{ts,tsx,js,jsx}",
		"./app/**/*.{ts,tsx,js,jsx}",
		"./src/**/*.{ts,tsx,js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				quiz: {
					light: '#EDE9FE',
					DEFAULT: '#8B5CF6',
					dark: '#6D28D9'
				},
				explainer: {
					light: '#DBEAFE',
					DEFAULT: '#60A5FA',
					dark: '#2563EB'
				},
				white: "#fff",
				black: "#000",
				transparent: "#ffffff00",
				richblack: {
					5: "#F1F2FF",
					25: "#DBDDEA",
					50: "#C5C7D4",
					100: "#AFB2BF",
					200: "#999DAA",
					300: "#838894",
					400: "#6E727F",
					500: "#585D69",
					600: "#424854",
					700: "#2C333F",
					800: "#161D29",
					900: "#000814",
				},
				richblue: {
					5: "#ECF5FF",
					25: "#C6D6E1",
					50: "#A0B7C3",
					100: "#7A98A6",
					200: "#537988",
					300: "#2D5A6A",
					400: "#073B4C",
					500: "#063544",
					600: "#042E3B",
					700: "#032833",
					800: "#01212A",
					900: "#001B22",
				},
				blue: {
					5: "#EAF5FF",
					25: "#B4DAEC",
					50: "#7EC0D9",
					100: "#47A5C5",
					200: "#118AB2",
					300: "#0F7A9D",
					400: "#0C6A87",
					500: "#0A5A72",
					600: "#074B5D",
					700: "#053B48",
					800: "#022B32",
					900: "#001B1D",
				},
				caribbeangreen: {
					5: "#C1FFFD",
					25: "#83F1DE",
					50: "#44E4BF",
					100: "#06D6A0",
					200: "#05BF8E",
					300: "#05A77B",
					400: "#049069",
					500: "#037957",
					600: "#026144",
					700: "#014A32",
					800: "#01321F",
					900: "#001B0D",
				},
				brown: {
					5: "#FFF4C4",
					25: "#FFE395",
					50: "#FFD166",
					100: "#E7BC5B",
					200: "#CFA64F",
					300: "#B89144",
					400: "#A07C39",
					500: "#88662D",
					600: "#705122",
					700: "#593C17",
					800: "#41260B",
					900: "#291100",
				},
				pink: {
					5: "#FFF1F1",
					25: "#FBC7D1",
					50: "#F79CB0",
					100: "#F37290",
					200: "#EF476F",
					300: "#D43D63",
					400: "#BA3356",
					500: "#9F294A",
					600: "#841E3E",
					700: "#691432",
					800: "#4F0A25",
					900: "#340019",
				},
				yellow: {
					5: "#FFF970",
					25: "#FFE83D",
					50: "#FFD60A",
					100: "#E7C009",
					200: "#CFAB08",
					300: "#B69507",
					400: "#9E8006",
					500: "#866A04",
					600: "#6E5503",
					700: "#553F02",
					800: "#3D2A01",
					900: "#251400",
				},
				orange: {
					50: "#fff7ed",
					100: "#ffedd5",
					200: "#fed7aa",
					300: "#fdba74",
					400: "#fb923c",
					500: "#f97316",
					600: "#ea580c",
					700: "#c2410c",
					800: "#9a3412",
					900: "#7c2d12",
					950: "#431407",
				},
				navyblue: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#38bdf8",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
					950: "#172554"
				},
				"pure-greys": {
					5: "#F9F9F9",
					25: "#E2E2E2",
					50: "#CCCCCC",
					100: "#B5B5B5",
					200: "#9E9E9E",
					300: "#888888",
					400: "#717171",
					500: "#5B5B5B",
					600: "#444444",
					700: "#2D2D2D",
					800: "#171717",
					900: "#141414",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideIn: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'slide-in': 'slideIn 0.5s ease-out forwards'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
