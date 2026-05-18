/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // base tokens (CSS variables)
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        bone: "rgb(var(--c-bone) / <alpha-value>)",
        rose: "rgb(var(--c-rose) / <alpha-value>)",
        charcoal: "rgb(var(--c-charcoal) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",

        // added tokens
        dark: "rgb(var(--c-dark) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
      },
      fontFamily: {
        // UIはロゴと競合しない：サンセリフ固定
        ui: "var(--font-ui)",
        sans: "var(--font-ui)",
      },
      letterSpacing: {
        ui: "0.08em",
        uiWide: "0.12em",
      },
      backgroundImage: {
        // 黒い高級グラデ（全体の地）
        "auria-dark":
          "radial-gradient(1200px 680px at 22% 18%, rgb(255 255 255 / 0.06), transparent 60%), radial-gradient(900px 560px at 72% 36%, rgb(160 110 89 / 0.10), transparent 62%), linear-gradient(180deg, rgb(0 0 0 / 0.88) 0%, rgb(0 0 0 / 0.78) 40%, rgb(0 0 0 / 0.92) 100%)",
        // うっすい霧（読みやすさ用）
        "auria-fog":
          "linear-gradient(90deg, rgb(255 255 255 / 0.00) 0%, rgb(255 255 255 / 0.06) 38%, rgb(255 255 255 / 0.14) 70%, rgb(255 255 255 / 0.22) 100%)",
      },
      boxShadow: {
        // 影は“黒の重さ”で。ぼやけすぎ禁止。
        auria: "0 18px 42px rgb(0 0 0 / 0.35), 0 2px 10px rgb(0 0 0 / 0.22)",
      },
    },
  },
  plugins: [],
};