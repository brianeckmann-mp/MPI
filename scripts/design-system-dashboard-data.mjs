import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

export const DEFAULT_REPOS = {
  designSystem: {
    label: "maxpreps-design-system",
    repoPath: process.env.MAXPREPS_DESIGN_SYSTEM_REPO
      ? path.resolve(process.env.MAXPREPS_DESIGN_SYSTEM_REPO)
      : path.resolve(ROOT_DIR, "../maxpreps-design-system"),
    branch: process.env.MAXPREPS_DESIGN_SYSTEM_BRANCH || "main",
  },
  consumer: {
    label: "maxpreps-fe-react",
    repoPath: process.env.MAXPREPS_REACT_REPO
      ? path.resolve(process.env.MAXPREPS_REACT_REPO)
      : path.resolve(ROOT_DIR, "../maxpreps-fe-react"),
    branch: process.env.MAXPREPS_REACT_BRANCH || "master",
  },
};

export const SNAPSHOT_PATH = path.join(ROOT_DIR, "projects", "design-system-dashboard", "data", "live.json");
const MANUAL_ROADMAP_QUEUE = {
  source: "Manual queue provided in dashboard request on 2026-06-08",
  sections: [
    {
      title: "Foundations",
      items: ["Type", "Shadows / Elevation"],
    },
    {
      title: "Components",
      items: ["Card", "Text Input", "Modal", "Tabs", "Select (Dropdown)"],
    },
    {
      title: "Patterns",
      items: [],
    },
  ],
};

function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function listDirs(parentPath) {
  try {
    return fs
      .readdirSync(parentPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function listFiles(parentPath) {
  try {
    return fs
      .readdirSync(parentPath, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function git(repoPath, args, options = {}) {
  try {
    return execFileSync("git", ["-C", repoPath, ...args], {
      encoding: "utf8",
      stdio: options.stdio || ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (options.throwOnError) throw error;
    return "";
  }
}

function collectFiles(parentPath, extensions, ignoredDirs = new Set(["node_modules", ".git", ".next", "dist", "build", "coverage"])) {
  const files = [];

  function walk(dir) {
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.name.startsWith(".") && entry.name !== ".storybook") continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!ignoredDirs.has(entry.name)) walk(fullPath);
        continue;
      }
      if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  walk(parentPath);
  return files.sort((a, b) => a.localeCompare(b));
}

function repoSource(repoPath, label) {
  if (!fs.existsSync(repoPath)) {
    return { label, repoPath, exists: false, branch: "missing", dirty: false };
  }

  return {
    label,
    repoPath,
    exists: true,
    branch: git(repoPath, ["branch", "--show-current"]) || "unknown",
    dirty: Boolean(git(repoPath, ["status", "--porcelain"])),
    updatedAt: new Date().toISOString(),
  };
}

function recentCommits(repoPath, limit = 8) {
  const raw = git(repoPath, ["log", `-${limit}`, "--pretty=format:%H%x1f%h%x1f%an%x1f%aI%x1f%s"]);
  if (!raw) return [];
  return raw.split("\n").map((line) => {
    const [sha, shortSha, author, date, message] = line.split("\x1f");
    return { sha, shortSha, author, date, message };
  });
}

function packageRows(designSystemRepo) {
  const packageGroups = [
    { parent: "packages", kind: "Package" },
    { parent: "libraries", kind: "Library" },
  ];

  return packageGroups
    .flatMap(({ parent, kind }) =>
      listDirs(path.join(designSystemRepo, parent)).map((dir) => ({ parent, kind, dir })),
    )
    .map(({ parent, kind, dir }) => {
      const pkg = safeReadJson(path.join(designSystemRepo, parent, dir, "package.json"));
      return pkg
        ? {
            dir,
            kind,
            name: pkg.name || dir,
            version: pkg.version || "0.0.0",
            private: Boolean(pkg.private),
            description: pkg.description || "No package.json description",
            source: `${parent}/${dir}/package.json`,
          }
        : null;
    })
    .filter(Boolean);
}

function themeNames(designSystemRepo) {
  const css = safeRead(path.join(designSystemRepo, "packages", "tokens", "themes.css"));
  return [...css.matchAll(/\[data-theme=["']([^"']+)["']\]/g)]
    .map((match) => match[1])
    .filter((theme, index, all) => all.indexOf(theme) === index);
}

function componentRows(designSystemRepo) {
  const componentsPath = path.join(designSystemRepo, "packages", "design-system", "components");
  const componentDirs = listDirs(componentsPath);
  const storyFiles = listFiles(path.join(designSystemRepo, "apps", "storybook", "stories"));

  return componentDirs.map((folderName) => {
    const componentPath = path.join(componentsPath, folderName);
    const hasIndex = fs.existsSync(path.join(componentPath, "index.ts"));
    const hasServer = listFiles(componentPath).some((file) => file.endsWith(".server.tsx"));
    const hasTests = listFiles(componentPath).some((file) => /\.(spec|test)\.(t|j)sx?$/.test(file));
    const hasStory = storyFiles.some((file) => file.toLowerCase().startsWith(folderName.toLowerCase()));

    return {
      name: folderName,
      category: "Component folder",
      priority: "—",
      status: hasIndex && hasServer ? "available" : "detected",
      tests: hasTests,
      storybook: hasStory,
      hasIndex,
      hasServer,
      path: path.relative(designSystemRepo, componentPath),
    };
  });
}

function workflowRows(designSystemRepo) {
  return listFiles(path.join(designSystemRepo, ".github", "workflows")).map((file) => ({
    name: file.replace(/\.disabled$/, ""),
    file,
    active: !file.endsWith(".disabled"),
    source: `.github/workflows/${file}`,
  }));
}

function infrastructureRows(designSystemRepo, packages, themes, workflows, components) {
  const rootPackage = safeReadJson(path.join(designSystemRepo, "package.json")) || {};
  const tokensPackage = safeReadJson(path.join(designSystemRepo, "packages", "tokens", "package.json")) || {};
  const designSystemPackage = safeReadJson(path.join(designSystemRepo, "packages", "design-system", "package.json")) || {};
  const storyFiles = listFiles(path.join(designSystemRepo, "apps", "storybook", "stories")).filter((file) =>
    /\.(stories|mdx)\./.test(file) || file.endsWith(".mdx"),
  );
  const testFiles = collectFiles(path.join(designSystemRepo, "packages", "design-system"), [".ts", ".tsx"]).filter((file) =>
    /\.(spec|test)\.(t|j)sx?$/.test(file),
  );
  const lockfiles = ["pnpm-lock.yaml", "package-lock.json", "yarn.lock"].filter((file) => fs.existsSync(path.join(designSystemRepo, file)));
  const tokenPipelineVersion = tokensPackage.dependencies?.["@terrazzo/cli"] || tokensPackage.devDependencies?.["@terrazzo/cli"] || "";
  const registry = designSystemPackage.publishConfig?.registry || rootPackage.publishConfig?.registry || "";
  const packageManager = rootPackage.packageManager || lockfiles[0] || "";

  return [
    {
      title: "Workflow Files",
      value: `${workflows.filter((workflow) => workflow.active).length}/${workflows.length}`,
      status: workflows.length ? "available" : "missing",
      detail: `${workflows.length} files detected; ${workflows.filter((workflow) => workflow.active).length} active.`,
      source: ".github/workflows",
    },
    {
      title: "Root Test Script",
      value: rootPackage.scripts?.test || "Not detected",
      status: rootPackage.scripts?.test ? "available" : "missing",
      detail: rootPackage.scripts?.test ? "package.json contains scripts.test." : "package.json does not contain scripts.test.",
      source: "package.json",
    },
    {
      title: "Token Pipeline Dependency",
      value: tokenPipelineVersion || "Not detected",
      status: tokenPipelineVersion ? "available" : "missing",
      detail: tokenPipelineVersion ? "@terrazzo/cli is declared in the tokens package." : "@terrazzo/cli is not declared in the tokens package.",
      source: "packages/tokens/package.json",
    },
    {
      title: "Theme Selectors",
      value: String(themes.length),
      status: themes.length ? "available" : "missing",
      detail: `${themes.length} [data-theme] selectors parsed from the token CSS file.`,
      source: "packages/tokens/themes.css",
    },
    {
      title: "Package Manager",
      value: packageManager || "Not detected",
      status: packageManager ? "available" : "missing",
      detail: lockfiles.length ? `${lockfiles.join(", ")} detected.` : "No lockfile detected at the repo root.",
      source: lockfiles[0] || "repo root",
    },
    {
      title: "Workspace Packages",
      value: String(packages.length),
      status: packages.length ? "available" : "missing",
      detail: `${packages.length} package/library package.json files detected.`,
      source: "packages/*, libraries/*",
    },
    {
      title: "Storybook Story Files",
      value: String(storyFiles.length),
      status: storyFiles.length ? "available" : "missing",
      detail: `${storyFiles.length} Storybook story/doc files detected.`,
      source: "apps/storybook/stories",
    },
    {
      title: "Component Test Files",
      value: String(testFiles.length),
      status: testFiles.length ? "available" : "missing",
      detail: `${testFiles.length} test files detected under packages/design-system.`,
      source: "packages/design-system",
    },
    {
      title: "Component Folders",
      value: String(components.length),
      status: components.length ? "available" : "missing",
      detail: `${components.length} folders detected in packages/design-system/components.`,
      source: "packages/design-system/components",
    },
    {
      title: "Publish Registry",
      value: registry || "Not declared",
      status: registry ? "available" : "missing",
      detail: registry ? "publishConfig.registry is declared." : "No publishConfig.registry found in root or design-system package.json.",
      source: "package.json, packages/design-system/package.json",
    },
  ];
}

function foundationRows(designSystemRepo, components, packages, themes, workflows) {
  const availableComponents = components.filter((component) => component.status === "available");
  const activeWorkflows = workflows.filter((workflow) => workflow.active);
  const hasTypography = fs.existsSync(path.join(designSystemRepo, "packages", "design-system", "system", "typography.css"));
  const hasTsup = Boolean(safeReadJson(path.join(designSystemRepo, "packages", "design-system", "package.json"))?.scripts?.build);
  const storyFiles = listFiles(path.join(designSystemRepo, "apps", "storybook", "stories")).filter((file) =>
    /\.(stories|mdx)\./.test(file) || file.endsWith(".mdx"),
  );
  const testFiles = collectFiles(path.join(designSystemRepo, "packages", "design-system"), [".ts", ".tsx"]).filter((file) =>
    /\.(spec|test)\.(t|j)sx?$/.test(file),
  );

  return [
    {
      title: "Token Theme File",
      status: themes.length > 0 ? "available" : "missing",
      detail: `${themes.length} [data-theme] selectors found in packages/tokens/themes.css.`,
      tags: ["packages/tokens/themes.css", `${themes.length} themes`],
      progress: themes.length > 0 ? 100 : 0,
    },
    {
      title: "Component Folders",
      status: components.length > 0 ? "available" : "missing",
      detail: `${components.length} component folders found in packages/design-system/components.`,
      tags: ["packages/design-system/components", `${availableComponents.length} server exports`],
      progress: components.length ? 100 : 0,
    },
    {
      title: "Workspace Packages",
      status: packages.length > 0 ? "available" : "missing",
      detail: `${packages.length} workspace packages/libraries detected under packages/* and libraries/*.`,
      tags: ["packages/*", "libraries/*", `${packages.length} workspaces`],
      progress: packages.length ? 100 : 0,
    },
    {
      title: "GitHub Workflows",
      status: workflows.length > 0 ? "available" : "missing",
      detail: `${workflows.length} workflow files detected; ${activeWorkflows.length} are active and ${workflows.length - activeWorkflows.length} are disabled.`,
      tags: [".github/workflows", `${activeWorkflows.length} active`],
      progress: workflows.length ? Math.round((activeWorkflows.length / workflows.length) * 100) : 0,
    },
    {
      title: "Storybook Stories",
      status: storyFiles.length > 0 ? "available" : "missing",
      detail: `${storyFiles.length} Storybook story/doc files found in apps/storybook/stories.`,
      tags: ["apps/storybook/stories", ...storyFiles.slice(0, 3)],
      progress: storyFiles.length ? 100 : 0,
    },
    {
      title: "Component Tests",
      status: testFiles.length > 0 ? "available" : "missing",
      detail: `${testFiles.length} component test files found under packages/design-system.`,
      tags: ["*.spec.tsx", "*.test.tsx", ...testFiles.map((file) => path.basename(file)).slice(0, 2)],
      progress: testFiles.length ? 100 : 0,
    },
    {
      title: "Typography CSS",
      status: hasTypography ? "available" : "missing",
      detail: hasTypography
        ? "packages/design-system/system/typography.css exists."
        : "packages/design-system/system/typography.css was not found.",
      tags: ["packages/design-system/system/typography.css"],
      progress: hasTypography ? 100 : 0,
    },
    {
      title: "Package Build Script",
      status: hasTsup ? "available" : "missing",
      detail: `The design-system package ${hasTsup ? "has" : "does not have"} a build script configured.`,
      tags: ["tsup", "ESM", "CJS", "Types"],
      progress: hasTsup ? 100 : 0,
    },
  ];
}

function consumerSnapshot(consumerRepo, components) {
  const source = repoSource(consumerRepo, "maxpreps-fe-react");
  if (!source.exists) {
    return {
      source,
      packageName: "maxpreps-fe-react",
      hasDesignSystemDependency: false,
      imports: [],
      usageByComponent: [],
      metrics: {
        importFiles: 0,
        importStatements: 0,
        totalPages: 0,
        pagesWithDesignSystem: 0,
        pageCoverage: 0,
        teamsUsingDesignSystem: 0,
        migrationCandidates: 0,
        legacySharedUiComponents: 0,
        legacyCoreComponents: 0,
        dirtyFiles: 0,
      },
      adoptionStage: 1,
      adoptionLabel: "Awareness",
      adoptionStatus: "No consumer repo found",
      legacyExamples: [],
      commits: [],
    };
  }

  const pkg = safeReadJson(path.join(consumerRepo, "package.json")) || {};
  const dependencies = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const hasDesignSystemDependency = Boolean(dependencies["@playon-maxpreps/dsm"] || dependencies["@playon-maxpreps/design-system"]);
  const sourceFiles = collectFiles(path.join(consumerRepo, "src"), [".ts", ".tsx", ".js", ".jsx"]);
  const pageFiles = sourceFiles.filter((file) => {
    const rel = path.relative(consumerRepo, file);
    return rel.startsWith("src/pages/") || (rel.startsWith("src/app/") && /(?:^|\/)(page|layout)\.(t|j)sx?$/.test(rel));
  });
  const importRegex = /@playon-maxpreps\/(?:dsm|design-system)(?:\/server)?/g;
  const imports = [];
  const pagesWithDesignSystem = new Set();
  const usageByComponent = new Map(components.map((component) => [component.name, 0]));

  for (const file of sourceFiles) {
    const content = safeRead(file);
    const matches = [...content.matchAll(importRegex)];
    if (!matches.length) continue;

    const rel = path.relative(consumerRepo, file);
    imports.push({ file: rel, count: matches.length });
    if (pageFiles.includes(file)) pagesWithDesignSystem.add(file);

    for (const component of components) {
      const tagName = component.name.split(" / ")[0].replace(/\s+/g, "");
      const tagRegex = new RegExp(`<${tagName}(\\s|>|\\.)`, "g");
      const usage = content.match(tagRegex)?.length || 0;
      if (usage) usageByComponent.set(component.name, (usageByComponent.get(component.name) || 0) + usage);
    }
  }

  const sharedUiDirs = listDirs(path.join(consumerRepo, "src", "projects", "shared", "ui"));
  const sharedCoreDirs = listDirs(path.join(consumerRepo, "src", "projects", "shared", "corecomponents"));
  const radixDirs = listDirs(path.join(consumerRepo, "src", "projects", "shared", "ui-radix"));
  const componentNames = new Set(components.map((component) => component.name.split(" / ")[0].replace(/\s+/g, "").toLowerCase()));
  const overlappingLegacy = [...sharedUiDirs, ...sharedCoreDirs, ...radixDirs].filter((dir) => componentNames.has(dir.toLowerCase()));
  const dirtyFiles = git(consumerRepo, ["status", "--porcelain"]).split("\n").filter(Boolean).length;
  const importStatements = imports.reduce((sum, item) => sum + item.count, 0);
  const teamsUsingDesignSystem = new Set(imports.map((item) => item.file.match(/^src\/projects\/([^/]+)/)?.[1]).filter(Boolean)).size;
  const pageCoverage = pageFiles.length ? Math.round((pagesWithDesignSystem.size / pageFiles.length) * 100) : 0;
  const adoptionStage = importStatements > 0 ? (teamsUsingDesignSystem > 1 ? 3 : 2) : 1;

  return {
    source,
    packageName: pkg.name || "maxpreps-fe-react",
    hasDesignSystemDependency,
    imports: imports.slice(0, 20),
    usageByComponent: [...usageByComponent.entries()]
      .map(([name, count]) => ({ name, count }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count),
    metrics: {
      importFiles: imports.length,
      importStatements,
      totalPages: pageFiles.length,
      pagesWithDesignSystem: pagesWithDesignSystem.size,
      pageCoverage,
      teamsUsingDesignSystem,
      migrationCandidates: overlappingLegacy.length,
      legacySharedUiComponents: sharedUiDirs.length,
      legacyCoreComponents: sharedCoreDirs.length,
      radixComponents: radixDirs.length,
      sourceFiles: sourceFiles.length,
      dirtyFiles,
    },
    adoptionStage,
    adoptionLabel: ["", "Awareness", "First Use", "Growing Use", "Default Choice"][adoptionStage],
    adoptionStatus: importStatements
      ? `${importStatements} design-system imports found in ${imports.length} files.`
      : "No @playon-maxpreps/dsm imports found yet.",
    legacyExamples: overlappingLegacy.slice(0, 12),
    commits: recentCommits(consumerRepo, 5),
  };
}

function recentActivity(designSystem, consumer) {
  const activities = [];
  const dsmVersion = designSystem.packages.find((pkg) => pkg.name === "@playon-maxpreps/dsm")?.version;
  if (dsmVersion) {
    activities.push({ type: "Package", status: "available", event: `@playon-maxpreps/dsm package.json reports v${dsmVersion}`, date: "Live" });
  }
  activities.push({
    type: "Components",
    status: designSystem.counts.done ? "available" : "missing",
    event: `${designSystem.counts.done} available component folders with index/server files; ${designSystem.counts.inProgress} detected without the full file pattern`,
    date: "Live",
  });
  activities.push({
    type: "Consumer",
    status: consumer.metrics.importStatements ? "available" : "missing",
    event: consumer.adoptionStatus,
    date: "Live",
  });
  activities.push({
    type: "Migration",
    status: consumer.metrics.migrationCandidates ? "detected" : "missing",
    event: `${consumer.metrics.migrationCandidates} consumer UI folder names overlap current design-system component folders`,
    date: "Live",
  });
  for (const commit of designSystem.commits.slice(0, 4)) {
    activities.push({ type: "Commit", status: "active", event: commit.message, date: commit.date });
  }
  return activities;
}

export function createDashboardSnapshot(options = {}) {
  const repos = {
    designSystem: { ...DEFAULT_REPOS.designSystem, ...(options.designSystem || {}) },
    consumer: { ...DEFAULT_REPOS.consumer, ...(options.consumer || {}) },
  };
  const designSystemRepo = repos.designSystem.repoPath;
  const consumerRepo = repos.consumer.repoPath;

  if (!fs.existsSync(designSystemRepo)) {
    return { ok: false, error: `Repo not found at ${designSystemRepo}` };
  }

  const packages = packageRows(designSystemRepo);
  const components = componentRows(designSystemRepo);
  const themes = themeNames(designSystemRepo);
  const workflows = workflowRows(designSystemRepo);
  const counts = {
    done: components.filter((component) => component.status === "available").length,
    inProgress: components.filter((component) => component.status === "detected").length,
    nextUp: 0,
    planned: 0,
    total: components.length,
  };
  const dsmPackage = packages.find((pkg) => pkg.name === "@playon-maxpreps/dsm");
  const foundations = foundationRows(designSystemRepo, components, packages, themes, workflows);
  const infrastructure = infrastructureRows(designSystemRepo, packages, themes, workflows, components);
  const designSystem = {
    source: repoSource(designSystemRepo, repos.designSystem.label),
    packages,
    themes,
    components,
    counts,
    workflows,
    foundations,
    commits: recentCommits(designSystemRepo),
    version: dsmPackage?.version || packages[0]?.version || "0.0.0",
    infrastructure: {
      activeWorkflows: workflows.filter((workflow) => workflow.active).length,
      totalWorkflows: workflows.length,
      testRunner: safeReadJson(path.join(designSystemRepo, "package.json"))?.scripts?.test ? "Vitest" : "—",
      tokenPipeline: safeReadJson(path.join(designSystemRepo, "packages", "tokens", "package.json"))?.dependencies?.["@terrazzo/cli"] || "Not detected",
      packageRegistry: safeReadJson(path.join(designSystemRepo, "packages", "design-system", "package.json"))?.publishConfig?.registry || "Not declared",
      signals: infrastructure,
    },
  };
  const consumer = consumerSnapshot(consumerRepo, components);
  const activity = recentActivity(designSystem, consumer);

  return {
    ok: true,
    source: designSystem.source,
    generatedAt: new Date().toISOString(),
    packages,
    themes,
    components,
    counts,
    workflows,
    foundations,
    roadmapQueue: MANUAL_ROADMAP_QUEUE,
    commits: designSystem.commits,
    version: designSystem.version,
    designSystem,
    consumer,
    activity,
  };
}

export function writeDashboardSnapshot(snapshot = createDashboardSnapshot(), outputPath = SNAPSHOT_PATH) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return outputPath;
}

function hasLocalBranch(repoPath, branch) {
  try {
    execFileSync("git", ["-C", repoPath, "show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function updateRepo({ label, repoPath, branch }, { dryRun = false } = {}) {
  const dirty = git(repoPath, ["status", "--porcelain"]);
  if (dirty && !dryRun) {
    throw new Error(`${label} has uncommitted changes. Commit, stash, or discard them before pulling ${branch}.`);
  }

  const currentBranch = git(repoPath, ["branch", "--show-current"]) || "unknown";
  const commands = [
    ["fetch", "origin", branch],
    currentBranch === branch
      ? null
      : hasLocalBranch(repoPath, branch)
        ? ["checkout", branch]
        : ["checkout", "--track", `origin/${branch}`],
    ["pull", "--ff-only", "origin", branch],
  ].filter(Boolean);

  if (dryRun) {
    return commands.map((args) => `git -C ${repoPath} ${args.join(" ")}`);
  }

  for (const args of commands) {
    git(repoPath, args, { stdio: "inherit", throwOnError: true });
  }
  return [];
}

export function updateDashboardRepos(options = {}) {
  const repos = [
    { ...DEFAULT_REPOS.designSystem, ...(options.designSystem || {}) },
    { ...DEFAULT_REPOS.consumer, ...(options.consumer || {}) },
  ];

  for (const repo of repos) {
    if (!fs.existsSync(path.join(repo.repoPath, ".git"))) {
      throw new Error(`${repo.label} is not a git repo at ${repo.repoPath}`);
    }
  }

  if (!options.dryRun) {
    const dirtyRepos = repos
      .map((repo) => ({ ...repo, dirty: git(repo.repoPath, ["status", "--porcelain"]) }))
      .filter((repo) => repo.dirty);
    if (dirtyRepos.length) {
      throw new Error(
        dirtyRepos
          .map((repo) => `${repo.label} has uncommitted changes. Commit, stash, or discard them before pulling ${repo.branch}.`)
          .join("\n"),
      );
    }
  }

  for (const repo of repos) {
    updateRepo(repo, { dryRun: options.dryRun });
  }

  if (!options.skipSnapshot && !options.dryRun) {
    return writeDashboardSnapshot(createDashboardSnapshot());
  }

  return null;
}

function runCli() {
  const [command = "snapshot", ...args] = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const skipSnapshot = args.includes("--skip-snapshot");

  if (command === "snapshot") {
    const outputPath = writeDashboardSnapshot(createDashboardSnapshot());
    console.log(`Wrote dashboard snapshot: ${outputPath}`);
    return;
  }

  if (command === "update") {
    if (dryRun) {
      const repos = [DEFAULT_REPOS.designSystem, DEFAULT_REPOS.consumer];
      for (const repo of repos) {
        console.log(`\n${repo.label}:`);
        for (const line of updateRepo(repo, { dryRun: true })) console.log(`  ${line}`);
      }
      return;
    }

    const outputPath = updateDashboardRepos({ skipSnapshot });
    console.log("Pulled dashboard repos.");
    if (outputPath) console.log(`Wrote dashboard snapshot: ${outputPath}`);
    console.log("Reload the dashboard page, or keep Vite running for live endpoint data.");
    return;
  }

  console.error("Usage: node scripts/design-system-dashboard-data.mjs [snapshot|update] [--dry-run] [--skip-snapshot]");
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    runCli();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
