import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createDashboardSnapshot } from "./scripts/design-system-dashboard-data.mjs";

function designSystemDashboardPlugin() {
  return {
    name: "design-system-dashboard-live-data",
    configureServer(server) {
      server.middlewares.use("/api/design-system-dashboard", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify(createDashboardSnapshot()));
      });
    },
    closeBundle() {
      const source = path.resolve("projects/design-system-dashboard/data/live.json");
      const target = path.resolve("dist/projects/design-system-dashboard/data/live.json");
      if (!fs.existsSync(source) || !fs.existsSync("dist")) return;
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(source, target);
    },
  };
}

export default defineConfig({
  base: "/MPI/",
  plugins: [react(), designSystemDashboardPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        gamedayRush: "projects/maxpreps-gameday-rush/index.html",
        designSystemDashboard: "projects/design-system-dashboard/index.html",
        designSystemDashboardUpdate: "projects/design-system-dashboard/update.html",
      },
    },
  },
});
