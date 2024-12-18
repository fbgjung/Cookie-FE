import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console"; // 추가

export default defineConfig({
  plugins: [
    react(),
    removeConsole({
      // 옵션 설정: 제거할 로그 타입
      exclude: ["error", "warn"], // "log"만 제거
    }),
  ],
  define: {
    global: "window",
  },
});
