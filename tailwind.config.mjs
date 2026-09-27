/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Enforced 8px base spacing scale
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px (base unit)
        'md': '1rem',      // 16px (standard gap)
        'lg': '1.5rem',    // 24px (comfortable)
        'xl': '2rem',      // 32px (spacious / section padding desktop)
        '2xl': '2.5rem',   // 40px (hero horizontal padding)
        '3xl': '3rem',     // 48px (touch target / section separator)
        '4xl': '4rem',     // 64px (major section gap)
        '5xl': '5rem',     // 80px (section vertical padding)
        '6xl': '6rem',     // 96px (major section vertical padding)
      },
      colors: {
        // PRIMARY COLOR - Koyu Lacivert (Güven Rengi)
        "primary": {
          "50": "#f0f7ff",
          "100": "#e0f0ff",
          "200": "#b8d4e8",
          "300": "#7ca8d4",
          "400": "#5989c4",
          "500": "#3b7bc9",
          "600": "#2563a8",
          "700": "#1a4d7a",
          "800": "#0f2b4b",
          "900": "#0a1f35",
        },
        "primary-light": "#7ca8d4",
        "primary-dark": "#1a4d7a",

        // SECONDARY COLOR - Nane Yeşili (Terapi Rengi)
        "mint": {
          "50": "#e8faf6",
          "100": "#c2e8dc",
          "200": "#8bc9b0",
          "300": "#5aaa8d",
          "400": "#4da878",
          "500": "#3a8a66",
          "600": "#2d6d52",
          "700": "#1d4d3d",
          "800": "#112f2a",
          "900": "#091f1d",
        },

        // ACCENT COLOR - Yumuşak Kayısı (Sıcaklık)
        "apricot": {
          "50": "#fef7f0",
          "100": "#f9e5b8",
          "200": "#f4c47e",
          "300": "#daa520",
          "400": "#c89812",
          "500": "#b8860b",
          "600": "#8b5a2b",
          "700": "#5a3a1a",
          "800": "#3a2410",
          "900": "#1f1308",
        },

        // NEUTRAL COLORS - Temiz Gri Skalası
        "gray": {
          "50": "#f9fafb",
          "100": "#f3f4f6",
          "200": "#e5e7eb",
          "300": "#d1d5db",
          "400": "#9ca3af",
          "500": "#6b7280",
          "600": "#4b5563",
          "700": "#374151",
          "800": "#1f2937",
          "900": "#111827",
        },

        // SEMANTIC COLORS
        "success": {
          "50": "#f0fdf4",
          "600": "#16a34a",
          "700": "#15803d",
        },
        "warning": {
          "50": "#fffbeb",
          "600": "#d97706",
          "700": "#b45309",
        },
        "error": {
          "50": "#fef2f2",
          "600": "#dc2626",
          "700": "#b91c1c",
        },
        "info": {
          "50": "#f0f9ff",
          "600": "#0284c7",
          "700": "#0369a1",
        },

        // MEDICAL CONTEXT COLORS
        "medical-safe": "#10b981",
        "medical-caution": "#f59e0b",
        "medical-risk": "#ef4444",

        // SURFACE COLORS
        "background": "#f9fafb",
        "surface": "#ffffff",
        "surface-subtle": "#f3f4f6",
      },
      fontFamily: {
        "headline": ["var(--font-headline)"],
        "serif": ["var(--font-headline)"], // Legacy class; headings share the selected family.
        "body": ["var(--font-body)"],
        "label": ["var(--font-label)"],
        "mono": ["var(--font-mono)"]
      },
      // Fluid typography scales (responsive, no breakpoint jumps)
      fontSize: {
        // Hero headlines: clamp(min, viewport-based, max)
        "heading-hero": ["clamp(2.5rem, 8vw, 4.5rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-xl": ["clamp(2rem, 6vw, 3rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-lg": ["clamp(1.5rem, 4vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-md": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-sm": ["clamp(1rem, 2vw, 1.25rem)", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-xs": ["1rem", { lineHeight: "1.4", fontWeight: "700" }],
        // Body text sizes
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        // Labels and captions
        "label": ["0.875rem", { lineHeight: "1.5", fontWeight: "600", letterSpacing: "0.08em" }],
        "caption": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        // Legacy (compatibility)
        "hero": ["clamp(2.5rem, 8vw, 4.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-lg": ["clamp(3rem, 10vw, 6rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "section": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.2", fontWeight: "600" }],
        "section-lg": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2", fontWeight: "600" }]
      },
      borderRadius: {
        "none": "0",
        "sm": "0.25rem",      // 4px
        "DEFAULT": "0.5rem",  // 8px - modern default
        "lg": "0.75rem",      // 12px
        "xl": "1rem",         // 16px
        "2xl": "1.5rem",      // 24px
        "3xl": "2rem",        // 32px
        "full": "9999px"      // Fully rounded
      },
      boxShadow: {
        "none": "none",
        "xs": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "sm": "0 1px 3px rgba(0, 0, 0, 0.1)",
        "md": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px rgba(0, 0, 0, 0.1)",
        "xl": "0 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        "inner": "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "fade-in": "fadeIn 300ms ease-out",
        "fade-out": "fadeOut 300ms ease-in",
        "slide-in": "slideIn 300ms cubic-bezier(0, 0, 0.2, 1)",
        "slide-in-from-left": "slideInFromLeft 300ms cubic-bezier(0, 0, 0.2, 1)",
        "slide-in-from-right": "slideInFromRight 300ms cubic-bezier(0, 0, 0.2, 1)",
        "slide-out": "slideOut 300ms cubic-bezier(0.4, 0, 1, 1)",
        "scale-in": "scaleIn 300ms cubic-bezier(0, 0, 0.2, 1)",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spring-bounce": "springBounce 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        springBounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      transitionDuration: {
        "150": "150ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      lineHeight: {
        "tight": "1.4",       // Headlines (was 1.2-1.3 default)
        "snug": "1.5",        // Subheads
        "DEFAULT": "1.65",    // Body (improved from ~1.5)
        "relaxed": "1.8",     // Long-form content
        "loose": "2"
      },
      letterSpacing: {
        "tighter": "-0.025em",
        "tight": "-0.0125em",
        "DEFAULT": "0",
        "wide": "0.025em",
        "wider": "0.05em",
        "widest": "0.1em",
        "ultra": "0.2em"       // uppercase labels (was 0.15em)
      },
    },
  },
  plugins: [],
}
