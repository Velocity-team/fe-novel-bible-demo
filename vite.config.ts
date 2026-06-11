import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // 프리뷰/호스팅 환경이 PORT를 지정하면 그 포트를 사용한다
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
});
