import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa"; // PWA 플러그인 주석 처리

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
});
