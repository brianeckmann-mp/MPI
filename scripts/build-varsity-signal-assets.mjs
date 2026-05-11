import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "public", "varsity-signal");
const sourceRoot = path.join(root, "source-images");
const widths = [640, 960, 1600];

const picks = [
  {
    id: "rivalry-hero",
    role: "hero",
    source: "source-images/2025-2026/December/duncanville_vs_north_shore_(uil_6a_d1_football_final)_football_robbie_rakestraw.jpg",
    alt: "Football player running under stadium lights",
  },
  {
    id: "scoreboard-huddle",
    role: "hero",
    source: "source-images/2025-2026/December/randle_vs_south_oak_cliff_(uil_5a_d2_football_final)_football_robbie_rakestraw.jpg",
    alt: "High school football players celebrating a playoff moment",
  },
  {
    id: "profile-athlete",
    role: "athlete",
    source: "source-images/2025-2026/October/st_frances_academy_40_st_joseph27s_prep_football_marcus_handy.jpg",
    alt: "Football athlete portrait crop for profile treatment",
  },
  {
    id: "student-energy",
    role: "photo",
    source: "source-images/2025-2026/November/carthage_vs_pleasant_grove_(uil_4a_d2_football_region_semifinal)_football_wayne_grubbs.jpg",
    alt: "Sideline energy during a high school football game",
  },
  {
    id: "basketball-gym",
    role: "photo",
    source: "source-images/2025-2026/February/broomfield_40_mountain_vista_basketball_tim_bourke.jpg",
    alt: "Basketball player in a high school gym",
  },
  {
    id: "court-final",
    role: "photo",
    source: "source-images/2025-2026/February/bishop_gorman_vs_democracy_prep_agassi_campus_(niaa_5a_final)_girls_basketball_jenni_webber.jpg",
    alt: "Girls basketball championship action",
  },
  {
    id: "volleyball-final",
    role: "photo",
    source: "source-images/2025-2026/November/plano_east_vs_byron_nelson_(uil_6_d1_regional_final)_volleyball_michael_horbovetz.jpg",
    alt: "Volleyball players competing at the net",
  },
  {
    id: "championship-net",
    role: "photo",
    source: "source-images/2021-22/November 2021/brandeis_vs_keller_(uil_volleyball_6a_finals)_volleyball_robbie_rakestraw.jpg",
    alt: "Championship volleyball celebration",
  },
  {
    id: "game-poster",
    role: "application",
    source: "source-images/2021-22/December 2021/spring_vs_duncanville_(uil_6a_region_playoff)_football_tommy_hays.jpg",
    alt: "Football rivalry game poster image",
  },
  {
    id: "track-state",
    role: "effect",
    source: "source-images/2021-22/May 2022/uil_6a_state_track_meet_track_26_field_tommy_hays.jpg",
    alt: "Track athlete competing at a state meet",
  },
  {
    id: "wrestling-championship",
    role: "effect",
    source: "source-images/2021-22/January 2022/cvaa_championships_wrestling_ming_chung_lin.jpg",
    alt: "Wrestlers competing under gym lighting",
  },
];

if (!existsSync(sourceRoot)) {
  throw new Error("Expected source-images/ at the repo root.");
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const assets = picks.map((pick) => {
  const sourcePath = path.join(root, pick.source);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing source image: ${pick.source}`);
  }

  const variants = widths.map((width) => {
    const filename = `${pick.id}-${width}.jpg`;
    const outputPath = path.join(outputDir, filename);

    execFileSync("sips", [
      "-Z",
      String(width),
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      "74",
      sourcePath,
      "--out",
      outputPath,
    ], { stdio: "ignore" });

    return {
      width,
      src: `varsity-signal/${filename}`,
      bytes: statSync(outputPath).size,
    };
  });

  return {
    id: pick.id,
    role: pick.role,
    alt: pick.alt,
    source: pick.source,
    src: variants[1].src,
    srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    variants,
  };
});

const module = `export const VARSITY_SIGNAL_IMAGES = ${JSON.stringify(assets, null, 2)};\n`;
writeFileSync(path.join(root, "src", "varsity-signal-assets.js"), module);
writeFileSync(path.join(outputDir, "manifest.json"), JSON.stringify(assets, null, 2));

const totalBytes = assets.flatMap((asset) => asset.variants).reduce((sum, item) => sum + item.bytes, 0);
console.log(`Generated ${assets.length} Varsity Signal images in ${path.relative(root, outputDir)} (${Math.round(totalBytes / 1024)} KB).`);
