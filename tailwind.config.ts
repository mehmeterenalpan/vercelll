import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0d",
        card: "#111114",
        border: "#1b1b1f",
        text: "#e5e7eb",
        muted: "#9ca3af",
        accent: "#22d3ee"
      },
      fontFamily: {
        mono: ["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace"]
      }
    },
  },
  plugins: [typography],
};
export default config;
