import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  esbuild: {
    drop: ["console"], // ESBuild 옵션으로 console 제거
  },
});
