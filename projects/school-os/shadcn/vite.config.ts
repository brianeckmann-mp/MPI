import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { port: 5273 },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        landing: "landing/index.html",
        login: "login/index.html",
      },
    },
  },
});
