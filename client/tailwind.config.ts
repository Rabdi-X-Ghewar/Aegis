/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Additional brown shades for more flexibility
				brown: {
					50: "hsl(30, 50%, 95%)",
					100: "hsl(30, 50%, 90%)",
					200: "hsl(30, 45%, 80%)",
					300: "hsl(25, 40%, 70%)",
					400: "hsl(25, 40%, 60%)",
					500: "hsl(25, 40%, 50%)",
					600: "hsl(25, 40%, 40%)",
					700: "hsl(25, 40%, 30%)",
					800: "hsl(25, 40%, 20%)",
					900: "hsl(25, 40%, 10%)",
				},
				cream: {
					50: "hsl(43, 50%, 97%)",
					100: "hsl(43, 45%, 94%)",
					200: "hsl(43, 40%, 90%)",
					300: "hsl(43, 35%, 85%)",
					400: "hsl(43, 30%, 80%)",
					500: "hsl(43, 25%, 75%)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [],
};