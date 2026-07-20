import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ─── Colors ────────────────────────────────────────────────────────────
      colors: {
        "bg-main": "#0A0A0A",
        "bg-surface": "#111111",
        "bg-elevated": "#1A1A1A",
        "border-default": "#2A2A2A",
        "border-active": "#8B5CF6",
        "text-primary": "#FFFFFF",
        "text-secondary": "#E5E7EB",
        "text-muted": "#A1A1AA",
        "primary-blue": "#3B82F6",
        "secondary-purple": "#8B5CF6",
        success: "#22C55E",
      },

      // ─── Font Families ──────────────────────────────────────────────────────
      fontFamily: {
        satoshi: ["var(--font-satoshi)", "Inter", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Courier New", "monospace"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      // ─── Font Sizes ─────────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["12px", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xs: ["14px", { lineHeight: "1.6" }],
        sm: ["16px", { lineHeight: "1.6" }],
        base: ["18px", { lineHeight: "1.8" }],
        lg: ["20px", { lineHeight: "1.8" }],
        xl: ["24px", { lineHeight: "1.3" }],
        "2xl": ["32px", { lineHeight: "1.2" }],
        "3xl": ["40px", { lineHeight: "1.2" }],
        "4xl": ["48px", { lineHeight: "1.1" }],
        "5xl": ["56px", { lineHeight: "1.1" }],
        "6xl": ["64px", { lineHeight: "1.1" }],
        "7xl": ["72px", { lineHeight: "1.1" }],
      },

      // ─── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        "4.5": "18px",
        "13": "52px",
        "15": "60px",
        "18": "72px",
        "30": "120px",
        "section": "120px",
        "section-mobile": "80px",
      },

      // ─── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        card: "24px",
        button: "16px",
        badge: "8px",
        full: "9999px",
        "inner-image": "16px",
      },

      // ─── Max Widths ─────────────────────────────────────────────────────────
      maxWidth: {
        container: "1280px",
        content: "650px",
        "profile-card": "480px",
      },

      // ─── Box Shadows ────────────────────────────────────────────────────────
      boxShadow: {
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.15)",
        "glow-purple-lg": "0 0 30px rgba(139, 92, 246, 0.20)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.15)",
      },

      // ─── Background Images ──────────────────────────────────────────────────
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        "gradient-primary-hover": "linear-gradient(135deg, #2563EB, #7C3AED)",
        "gradient-text": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },

      // ─── Animation ──────────────────────────────────────────────────────────
      transitionDuration: {
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
        page: "400ms",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.30)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
        "fade-in-down": "fade-in-down 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "blink": "blink 1s step-end infinite",
      },

      // ─── Height ─────────────────────────────────────────────────────────────
      height: {
        navbar: "80px",
        "btn-primary": "56px",
        "btn-secondary": "56px",
        "btn-sm": "48px",
        "btn-xs": "40px",
        badge: "32px",
      },

      // ─── Z-index ────────────────────────────────────────────────────────────
      zIndex: {
        navbar: "100",
        dropdown: "200",
        tooltip: "300",
        modal: "1000",
      },
    },
  },
  plugins: [],
};

export default config;
