const { fontFamily } = require("tailwindcss/defaultTheme")

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

const svgToDataUri = require("mini-svg-data-uri")

const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "3xl": "1800px",
        "4xl": "2500px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
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
          hover: "hsl(var(--card-hover))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-250px * 5))",
          },
        },
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // Scale in
        "scale-in": {
          "0%": {
            opacity: 0,
            transform: "scale(0.7)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        // Fade in
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        // Reveal Effect
        reveal: {
          "0%": {
            opacity: 0,
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: 1, filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: 1, filter: "brightness(1) blur(0)", scale: "1" },
        },
        // spinner-loader
        spinner: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0.15,
          },
        },
        // MagicUI
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "image-glow": {
          "0%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(0.74, 0.25, 0.76, 1)",
          },
          "10%": {
            opacity: "0.7",
            "animation-timing-function": "cubic-bezier(0.12, 0.01, 0.08, 0.99)",
          },
          "100%": {
            opacity: "0.4",
          },
        },
        "magic-fade-in": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "none" },
        },
        "magic-fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "none" },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        // spinner loader
        spinner: "spinner 1.2s linear infinite",
        // Reveal Effect
        reveal: "reveal 0.7s ease-in-out",
        "reveal-repeat": "reveal 0.7s ease-in-out infinite",

        // Accordion
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Fade up and down
        fade: "fade 0.8s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "fade-in": "fade-in 0.2s",
        "scale-in": "scale-in 0.2s ease-out",

        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
        ["infinite-slider"]: "infiniteSlider 20s linear infinite",

        // MagicUI
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "image-glow": "image-glow 4100ms 600ms ease-out forwards",
        "magic-fade-in":
          "magic-fade-in 1000ms var(--animation-delay, 0ms) ease forwards",
        "magic-fade-up":
          "magic-fade-up 1000ms var(--animation-delay, 0ms) ease forwards",
        shimmer: "shimmer 8s infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      scale: {
        102: "1.02",
      },
      boxShadow: {
        "card-light":
          "0px 32px 40px -16px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.06)",
        outline:
          // "0px 1px 0.5px 0px rgba(255 , 255, 255,0.15) inset, 0px 1.551px 1.201px 0px rgba(255, 255, 255, 0.10) inset, 1.15px 0px 1.551px 0px rgba(255, 255, 255, 0.20) inset",

          "inset 0.5px 0.8px 1.25px rgba(255, 255, 255, 0.125), inset 0px 0.8px 1.2px rgba(255, 255, 255, 0.10), inset 0.8px 0px 0.8px rgba(255, 255, 255, 0.15);",
        top: "inset 0px 1px 1px rgba(255, 255, 255, 0.10)",
        "outline-light":
          "0px 1px 0.5px 0px rgba(0, 0, 0,0.15) inset, 0px 1.551px 1.201px 0px rgba(0, 0, 0, 0.10) inset, 1.15px 0px 1.551px 0px rgba(0, 0, 0, 0.20) inset",
        "inner-outline":
          "inset 0px -0.73px 0.73px rgba(255,255,255,0.59), inset 1.46px 2.92px 2.92px -0.73px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
    defineBackgroundPatternUtilities,
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}

function defineBackgroundPatternUtilities({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  )
}
