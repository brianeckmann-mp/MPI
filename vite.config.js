import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/MPI/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        gamedayRush: "projects/maxpreps-gameday-rush/index.html",
      },
    },
  },
});
