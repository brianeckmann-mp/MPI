/// <reference types="@figma/plugin-typings" />

type Hex = `#${string}`;
type FontMap = {
  display: FontName;
  marker: FontName;
  mono: FontName;
  ui: FontName;
};

const TOKENS = {
  core: {
    night: "#050506",
    charcoal: "#111114",
    graphite: "#1B1B1F",
    warmWhite: "#F5F1E8",
    steel: "#8A8F98",
    chrome: "#C8CDD3",
    ticket: "#D7C8A8",
  },
  brand: {
    maxprepsRed: "#E31B23",
    scoreboardRed: "#FF2731",
    deepRed: "#8F0E14",
  },
  team: {
    blue: "#1646D8",
    gold: "#F4B728",
    green: "#16A34A",
    orange: "#F97316",
    purple: "#7C3AED",
  },
};

const ALL_COLORS: Array<{ group: string; name: string; hex: Hex }> = [
  { group: "Core", name: "Night Field Black", hex: TOKENS.core.night as Hex },
  { group: "Core", name: "Charcoal", hex: TOKENS.core.charcoal as Hex },
  { group: "Core", name: "Graphite", hex: TOKENS.core.graphite as Hex },
  { group: "Core", name: "Warm White", hex: TOKENS.core.warmWhite as Hex },
  { group: "Core", name: "Steel Gray", hex: TOKENS.core.steel as Hex },
  { group: "Core", name: "Chrome", hex: TOKENS.core.chrome as Hex },
  { group: "Core", name: "Ticket Paper", hex: TOKENS.core.ticket as Hex },
  { group: "Brand", name: "MaxPreps Red", hex: TOKENS.brand.maxprepsRed as Hex },
  { group: "Brand", name: "Scoreboard Red", hex: TOKENS.brand.scoreboardRed as Hex },
  { group: "Brand", name: "Deep Red", hex: TOKENS.brand.deepRed as Hex },
  { group: "Team", name: "Team Blue", hex: TOKENS.team.blue as Hex },
  { group: "Team", name: "Team Gold", hex: TOKENS.team.gold as Hex },
  { group: "Team", name: "Team Green", hex: TOKENS.team.green as Hex },
  { group: "Team", name: "Team Orange", hex: TOKENS.team.orange as Hex },
  { group: "Team", name: "Team Purple", hex: TOKENS.team.purple as Hex },
];

let fonts: FontMap;
let paintStyles: Record<string, PaintStyle> = {};
let textStyles: Record<string, TextStyle> = {};

function rgb(hex: Hex): RGB {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16) / 255,
    g: parseInt(clean.slice(2, 4), 16) / 255,
    b: parseInt(clean.slice(4, 6), 16) / 255,
  };
}

function solid(hex: Hex, opacity = 1): SolidPaint {
  return { type: "SOLID", color: rgb(hex), opacity };
}

function gradient(from: Hex, to: Hex): GradientPaint {
  return {
    type: "GRADIENT_LINEAR",
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0, color: { ...rgb(from), a: 1 } },
      { position: 1, color: { ...rgb(to), a: 1 } },
    ],
  };
}

function shadow(opacity = 0.32): Effect {
  return {
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: opacity },
    offset: { x: 0, y: 18 },
    radius: 28,
    spread: -8,
    visible: true,
    blendMode: "NORMAL",
  };
}

async function pickFont(candidates: string[], styleCandidates = ["Regular", "Bold"]): Promise<FontName> {
  const available = await figma.listAvailableFontsAsync();
  for (const family of candidates) {
    const match = available.find((font) => font.fontName.family === family && styleCandidates.includes(font.fontName.style));
    if (match) return match.fontName;
  }
  return { family: "Arial", style: "Regular" };
}

async function loadFonts(): Promise<void> {
  fonts = {
    display: await pickFont(["Champion Gothic", "Druk Condensed", "Impact", "Arial Narrow", "Arial"], ["Regular", "Bold"]),
    marker: await pickFont(["Marker Sport", "Permanent Marker", "Comic Sans MS", "Arial"], ["Regular", "Bold"]),
    mono: await pickFont(["Chivo Mono", "Roboto Mono", "IBM Plex Mono", "Courier New"], ["Regular", "Medium", "Bold"]),
    ui: await pickFont(["Siro", "Inter", "Arial"], ["Regular", "Medium", "Bold"]),
  };
  await Promise.all([
    figma.loadFontAsync(fonts.display),
    figma.loadFontAsync(fonts.marker),
    figma.loadFontAsync(fonts.mono),
    figma.loadFontAsync(fonts.ui),
  ]);
}

function createFrame(name: string, width: number, height: number, fills: Paint[] = [solid(TOKENS.core.charcoal as Hex)]): FrameNode {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(width, height);
  frame.fills = fills;
  frame.cornerRadius = 0;
  frame.clipsContent = false;
  return frame;
}

function setAuto(frame: FrameNode | ComponentNode, direction: "VERTICAL" | "HORIZONTAL", gap = 16, padding = 0): void {
  frame.layoutMode = direction;
  frame.itemSpacing = gap;
  frame.paddingTop = padding;
  frame.paddingRight = padding;
  frame.paddingBottom = padding;
  frame.paddingLeft = padding;
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
}

function createText(name: string, characters: string, options: {
  font?: FontName;
  size?: number;
  color?: Hex;
  width?: number;
  uppercase?: boolean;
  align?: "LEFT" | "CENTER" | "RIGHT";
  lineHeight?: number;
} = {}): TextNode {
  const node = figma.createText();
  node.name = name;
  node.fontName = options.font ?? fonts.ui;
  node.fontSize = options.size ?? 18;
  node.lineHeight = { unit: "PERCENT", value: options.lineHeight ?? 115 };
  node.textAlignHorizontal = options.align ?? "LEFT";
  node.fills = [solid(options.color ?? TOKENS.core.warmWhite as Hex)];
  node.characters = options.uppercase ? characters.toUpperCase() : characters;
  if (options.width) {
    node.resize(options.width, node.height);
    node.textAutoResize = "HEIGHT";
  }
  return node;
}

function createSection(parent: FrameNode, title: string): FrameNode {
  const section = createFrame(title, 1824, 200, [solid(TOKENS.core.charcoal as Hex, 0.92)]);
  setAuto(section, "VERTICAL", 28, 40);
  section.cornerRadius = 16;
  section.strokes = [solid("#2E2E34" as Hex)];
  section.effects = [shadow(0.18)];
  const heading = createText(`${title} / Heading`, title.replace(/^\d+\s/, "").toUpperCase(), {
    font: fonts.display,
    size: 52,
    color: TOKENS.core.warmWhite as Hex,
    width: 1660,
    uppercase: true,
  });
  const rule = figma.createRectangle();
  rule.name = `${title} / Red Thread Divider`;
  rule.resize(280, 8);
  rule.fills = [solid(TOKENS.brand.maxprepsRed as Hex)];
  rule.rotation = -1.5;
  section.appendChild(heading);
  section.appendChild(rule);
  parent.appendChild(section);
  section.layoutSizingHorizontal = "FILL";
  return section;
}

function createPaintStyles(): void {
  paintStyles = {};
  for (const token of ALL_COLORS) {
    const style = figma.createPaintStyle();
    style.name = `Varsity Signal/${token.group}/${token.name}`;
    style.paints = [solid(token.hex)];
    style.description = token.hex;
    paintStyles[token.name] = style;
  }
}

function createTextStyles(): void {
  const specs = [
    ["Display/Hero", fonts.display, 96],
    ["Display/Section", fonts.display, 52],
    ["Marker/Callout", fonts.marker, 36],
    ["Data/Chivo Mono", fonts.mono, 18],
    ["UI/Body", fonts.ui, 18],
  ] as const;
  textStyles = {};
  for (const [name, font, size] of specs) {
    const style = figma.createTextStyle();
    style.name = `Varsity Signal/${name}`;
    style.fontName = font;
    style.fontSize = size;
    style.lineHeight = { unit: "PERCENT", value: 110 };
    textStyles[name] = style;
  }
}

function createDotPattern(parent: FrameNode, color: Hex, countX = 14, countY = 8, opacity = 0.55): void {
  for (let y = 0; y < countY; y++) {
    for (let x = 0; x < countX; x++) {
      const dot = figma.createEllipse();
      dot.name = "Texture/Dot";
      dot.resize(4 + ((x + y) % 3), 4 + ((x + y) % 3));
      dot.x = 12 + x * 12;
      dot.y = 12 + y * 12;
      dot.fills = [solid(color, opacity)];
      parent.appendChild(dot);
      if (parent.layoutMode !== "NONE") dot.layoutPositioning = "ABSOLUTE";
    }
  }
}

function createScanlines(parent: FrameNode, color: Hex, gap = 9): void {
  for (let y = 8; y < parent.height - 8; y += gap) {
    const line = figma.createRectangle();
    line.name = "Texture/VHS Scanline";
    line.resize(parent.width - 20, 1);
    line.x = 10;
    line.y = y;
    line.fills = [solid(color, 0.34)];
    parent.appendChild(line);
  }
}

function createColorSwatch(name: string, hex: Hex): FrameNode {
  const card = createFrame(`Color Swatch/${name}`, 242, 152, [solid(TOKENS.core.graphite as Hex)]);
  setAuto(card, "VERTICAL", 10, 12);
  card.cornerRadius = 12;
  card.strokes = [solid("#313138" as Hex)];
  const chip = figma.createRectangle();
  chip.name = `Token/${name}`;
  chip.resize(218, 68);
  chip.cornerRadius = 6;
  chip.fills = [solid(hex)];
  card.appendChild(chip);
  card.appendChild(createText("Name", name, { font: fonts.mono, size: 14, width: 218 }));
  card.appendChild(createText("Hex", hex, { font: fonts.mono, size: 12, color: TOKENS.core.steel as Hex, width: 218 }));
  return card;
}

function createTextureCard(name: string, type: string): FrameNode {
  const card = createFrame(`Texture Motif/${name}`, 250, 190, [solid(TOKENS.core.night as Hex)]);
  card.cornerRadius = 10;
  card.strokes = [solid("#34343A" as Hex)];
  const visual = createFrame("Visual", 250, 130, [solid(TOKENS.core.graphite as Hex)]);
  visual.clipsContent = true;
  card.appendChild(visual);
  if (type === "halftone") createDotPattern(visual, TOKENS.core.warmWhite as Hex, 18, 10, 0.65);
  if (type === "vhs") createScanlines(visual, TOKENS.core.warmWhite as Hex, 7);
  if (type === "turf") {
    visual.fills = [gradient("#0B4B2D" as Hex, "#2AA64A" as Hex)];
    for (let x = 18; x < 240; x += 36) {
      const line = figma.createRectangle();
      line.name = "Field Marker";
      line.resize(5, 130);
      line.x = x;
      line.fills = [solid(TOKENS.core.warmWhite as Hex, 0.7)];
      visual.appendChild(line);
    }
  }
  if (type === "ticket" || type === "tape") {
    visual.fills = [solid(TOKENS.core.ticket as Hex)];
    createDotPattern(visual, "#7B6B50" as Hex, 18, 3, 0.18);
  }
  if (type === "chain") {
    for (let x = -80; x < 320; x += 24) {
      const a = figma.createLine();
      a.name = "Chain Link / Diagonal";
      a.resize(180, 0);
      a.x = x;
      a.y = 0;
      a.rotation = 42;
      a.strokes = [solid(TOKENS.core.chrome as Hex, 0.7)];
      visual.appendChild(a);
      const b = figma.createLine();
      b.name = "Chain Link / Diagonal";
      b.resize(180, 0);
      b.x = x;
      b.y = 130;
      b.rotation = -42;
      b.strokes = [solid(TOKENS.core.chrome as Hex, 0.5)];
      visual.appendChild(b);
    }
  }
  if (type === "scoreboard") {
    visual.fills = [solid("#090303" as Hex)];
    visual.appendChild(createText("Scoreboard Numerals", "12:00", { font: fonts.mono, size: 44, color: TOKENS.brand.scoreboardRed as Hex, width: 220, align: "CENTER" }));
  }
  if (type === "marker") {
    visual.appendChild(createText("Marker Circle", "SENIOR", { font: fonts.marker, size: 36, color: TOKENS.brand.maxprepsRed as Hex, width: 220, align: "CENTER" }));
  }
  if (type === "barcode") {
    for (let x = 20; x < 226; x += 8) {
      const bar = figma.createRectangle();
      bar.name = "Barcode Bar";
      bar.resize((x % 3) + 2, 92);
      bar.x = x;
      bar.y = 18;
      bar.fills = [solid(TOKENS.core.warmWhite as Hex)];
      visual.appendChild(bar);
    }
  }
  if (type === "chrome") {
    const badge = figma.createEllipse();
    badge.name = "Chrome Badge";
    badge.resize(150, 82);
    badge.x = 50;
    badge.y = 24;
    badge.fills = [gradient(TOKENS.core.chrome as Hex, "#565B63" as Hex)];
    badge.strokes = [solid(TOKENS.core.warmWhite as Hex, 0.7)];
    visual.appendChild(badge);
  }
  if (type === "slash") {
    const slash = figma.createRectangle();
    slash.name = "Red Slash";
    slash.resize(190, 42);
    slash.x = 26;
    slash.y = 46;
    slash.rotation = -6;
    slash.fills = [solid(TOKENS.brand.maxprepsRed as Hex)];
    visual.appendChild(slash);
  }
  const label = createText("Label", name, { font: fonts.mono, size: 13, width: 226, color: TOKENS.core.warmWhite as Hex, uppercase: true, align: "CENTER" });
  label.x = 12;
  label.y = 150;
  card.appendChild(label);
  return card;
}

function componentBase(name: string, w: number, h: number): ComponentNode {
  const component = figma.createComponent();
  component.name = name;
  component.resize(w, h);
  component.fills = [solid(TOKENS.core.charcoal as Hex)];
  component.cornerRadius = 12;
  component.strokes = [solid("#3A3A42" as Hex)];
  component.effects = [shadow(0.2)];
  return component;
}

function createButtonComponent(secondary = false): ComponentNode {
  const c = componentBase(secondary ? "Button / Secondary / Game Details" : "Button / Primary / Watch Live", 260, 58);
  setAuto(c, "HORIZONTAL", 12, 16);
  c.primaryAxisAlignItems = "CENTER";
  c.counterAxisAlignItems = "CENTER";
  c.fills = [solid(secondary ? TOKENS.core.charcoal as Hex : TOKENS.brand.maxprepsRed as Hex)];
  const icon = figma.createPolygon();
  icon.name = secondary ? "Icon/Arrow" : "Icon/Play";
  icon.pointCount = 3;
  icon.resize(16, 16);
  icon.fills = [solid(TOKENS.core.warmWhite as Hex)];
  c.appendChild(icon);
  c.appendChild(createText("Label", secondary ? "GAME DETAILS" : "WATCH LIVE", { font: fonts.mono, size: 15, width: 170, uppercase: true }));
  return c;
}

function createLiveScoreCard(): ComponentNode {
  const c = componentBase("Card / Live Score", 360, 270);
  setAuto(c, "VERTICAL", 14, 18);
  const meta = createText("Meta", "● LIVE        Q4 07:24", { font: fonts.mono, size: 15, color: TOKENS.brand.scoreboardRed as Hex, width: 320 });
  c.appendChild(meta);
  for (const row of [["Team Blue", "NORTHSIDE", "32"], ["Deep Red", "RIVERVIEW", "28"]]) {
    const line = createFrame(`Team Row/${row[1]}`, 320, 48, [solid(TOKENS.core.graphite as Hex)]);
    setAuto(line, "HORIZONTAL", 14, 10);
    const logo = figma.createRectangle();
    logo.name = `Logo Placeholder/${row[0]}`;
    logo.resize(30, 30);
    logo.cornerRadius = 5;
    logo.fills = [solid(row[0] === "Deep Red" ? TOKENS.brand.deepRed as Hex : TOKENS.team.blue as Hex)];
    line.appendChild(logo);
    line.appendChild(createText("Team", row[1], { font: fonts.ui, size: 17, width: 190, uppercase: true }));
    line.appendChild(createText("Score", row[2], { font: fonts.mono, size: 28, width: 50, align: "RIGHT" }));
    c.appendChild(line);
  }
  const btn = createButtonComponent(false).createInstance();
  btn.name = "CTA / Watch Live";
  c.appendChild(btn);
  return c;
}

function createPlayerStatCard(): ComponentNode {
  const c = componentBase("Card / Player Stat", 360, 420);
  const photo = createFrame("Athlete Photo Placeholder", 360, 230, [gradient("#101828" as Hex, TOKENS.team.blue as Hex)]);
  createDotPattern(photo, TOKENS.core.warmWhite as Hex, 18, 10, 0.16);
  c.appendChild(photo);
  const num = createText("Number", "#24", { font: fonts.display, size: 72, color: TOKENS.brand.maxprepsRed as Hex, width: 120 });
  num.x = 226;
  num.y = 24;
  c.appendChild(num);
  const name = createText("Player Name", "JAYDEN\nWILLIAMS", { font: fonts.display, size: 40, width: 300, uppercase: true });
  name.x = 22;
  name.y = 250;
  c.appendChild(name);
  const stats = createText("Stats", "REC 48    YDS 812    TD 11    AVG 16.9", { font: fonts.mono, size: 15, color: TOKENS.core.warmWhite as Hex, width: 316 });
  stats.x = 22;
  stats.y = 358;
  c.appendChild(stats);
  return c;
}

function createTicketModule(): ComponentNode {
  const c = componentBase("Module / Ticket", 300, 420);
  c.fills = [solid(TOKENS.core.ticket as Hex)];
  c.strokes = [solid("#927E5A" as Hex)];
  c.appendChild(createText("Admit", "ADMIT ONE", { font: fonts.mono, size: 14, color: TOKENS.core.night as Hex, width: 260, align: "CENTER" }));
  c.appendChild(createText("Title", "PLAYOFFS", { font: fonts.display, size: 64, color: TOKENS.core.night as Hex, width: 260, align: "CENTER" }));
  c.appendChild(createText("Year", "2024", { font: fonts.mono, size: 22, color: TOKENS.brand.maxprepsRed as Hex, width: 260, align: "CENTER" }));
  const meta = createText("Metadata", "SEC B     ROW 12     SEAT 7", { font: fonts.mono, size: 16, color: TOKENS.core.night as Hex, width: 260, align: "CENTER" });
  meta.y = 248;
  c.appendChild(meta);
  const bars = createTextureCard("Barcode / Player ID", "barcode");
  bars.name = "Barcode";
  bars.resize(230, 92);
  bars.x = 35;
  bars.y = 302;
  c.appendChild(bars);
  return c;
}

function createBadge(): ComponentNode {
  const c = componentBase("Badge / Player of the Game", 260, 260);
  const shield = figma.createPolygon();
  shield.name = "Shield";
  shield.pointCount = 6;
  shield.resize(138, 148);
  shield.x = 61;
  shield.y = 28;
  shield.fills = [solid(TOKENS.core.graphite as Hex)];
  shield.strokes = [solid(TOKENS.brand.maxprepsRed as Hex)];
  shield.strokeWeight = 4;
  c.appendChild(shield);
  const star = figma.createStar();
  star.name = "Star";
  star.resize(46, 46);
  star.x = 107;
  star.y = 78;
  star.fills = [solid(TOKENS.brand.maxprepsRed as Hex)];
  c.appendChild(star);
  const label = createText("Label", "PLAYER OF\nTHE GAME", { font: fonts.display, size: 30, width: 210, align: "CENTER", uppercase: true });
  label.x = 25;
  label.y = 178;
  c.appendChild(label);
  return c;
}

function createTapeLabel(): ComponentNode {
  const c = componentBase("Label / Tape / Game Day", 260, 82);
  c.fills = [solid(TOKENS.core.ticket as Hex)];
  c.rotation = -2.5;
  c.appendChild(createText("Text", "GAME DAY", { font: fonts.marker, size: 34, color: TOKENS.core.night as Hex, width: 230, align: "CENTER" }));
  return c;
}

function createStoryCard(): ComponentNode {
  const c = componentBase("Card / Top Story", 360, 430);
  const image = createFrame("Image Placeholder", 360, 210, [gradient(TOKENS.core.graphite as Hex, TOKENS.brand.deepRed as Hex)]);
  createScanlines(image, TOKENS.core.warmWhite as Hex, 11);
  c.appendChild(image);
  const label = createText("Category", "TOP STORY", { font: fonts.mono, size: 14, color: TOKENS.brand.maxprepsRed as Hex, width: 300 });
  label.x = 22;
  label.y = 236;
  c.appendChild(label);
  const headline = createText("Headline", "THE COMEBACK THAT CHANGED THE SEASON", { font: fonts.display, size: 42, width: 316, uppercase: true });
  headline.x = 22;
  headline.y = 262;
  c.appendChild(headline);
  const date = createText("Date", "OCT 12", { font: fonts.mono, size: 16, color: TOKENS.core.steel as Hex, width: 300 });
  date.x = 22;
  date.y = 390;
  c.appendChild(date);
  return c;
}

function createApplicationCard(title: string, lines: string[], accent: Hex): FrameNode {
  const card = createFrame(`Application/${title}`, 330, 430, [gradient(TOKENS.core.graphite as Hex, TOKENS.core.night as Hex)]);
  card.cornerRadius = 12;
  card.strokes = [solid("#373740" as Hex)];
  createDotPattern(card, TOKENS.core.warmWhite as Hex, 12, 7, 0.15);
  const slash = figma.createRectangle();
  slash.name = "Off-center Red Slash";
  slash.resize(220, 42);
  slash.x = 24;
  slash.y = 58;
  slash.rotation = -4;
  slash.fills = [solid(accent)];
  card.appendChild(slash);
  const h = createText("Title", lines[0], { font: fonts.display, size: 54, width: 286, uppercase: true });
  h.x = 22;
  h.y = 42;
  card.appendChild(h);
  const meta = createText("Meta", lines.slice(1).join("\n"), { font: fonts.mono, size: 18, width: 286, color: TOKENS.core.warmWhite as Hex });
  meta.x = 22;
  meta.y = 250;
  card.appendChild(meta);
  const caption = createText("Card Label", title, { font: fonts.mono, size: 13, color: TOKENS.core.chrome as Hex, width: 286, uppercase: true });
  caption.x = 22;
  caption.y = 386;
  card.appendChild(caption);
  return card;
}

function createMotionCard(title: string, note: string, type: string): FrameNode {
  const card = createFrame(`Motion/${title}`, 210, 260, [solid(TOKENS.core.graphite as Hex)]);
  card.cornerRadius = 12;
  card.strokes = [solid("#3B3B43" as Hex)];
  const visual = createFrame("Visual", 210, 132, [solid(TOKENS.core.night as Hex)]);
  card.appendChild(visual);
  if (type === "score") visual.appendChild(createText("Score Flip", "28\n14", { font: fonts.mono, size: 44, color: TOKENS.brand.scoreboardRed as Hex, width: 180, align: "CENTER" }));
  if (type === "sticker") visual.appendChild(createText("Sticker", "CLUTCH", { font: fonts.marker, size: 34, color: TOKENS.brand.maxprepsRed as Hex, width: 180, align: "CENTER" }));
  if (type === "vhs") createScanlines(visual, TOKENS.core.warmWhite as Hex, 7);
  if (type === "flash") visual.fills = [gradient(TOKENS.core.warmWhite as Hex, TOKENS.core.graphite as Hex)];
  if (type === "red") visual.fills = [gradient(TOKENS.brand.maxprepsRed as Hex, TOKENS.core.night as Hex)];
  const label = createText("Label", title, { font: fonts.mono, size: 14, width: 178, uppercase: true });
  label.x = 16;
  label.y = 152;
  card.appendChild(label);
  const body = createText("Note", note, { font: fonts.ui, size: 13, color: TOKENS.core.chrome as Hex, width: 178 });
  body.x = 16;
  body.y = 182;
  card.appendChild(body);
  return card;
}

function addTextureOverlay(frame: FrameNode): void {
  const dots = figma.createFrame();
  dots.name = "Global Texture / Low Opacity Halftone";
  dots.resize(frame.width, 420);
  dots.fills = [];
  dots.opacity = 0.22;
  createDotPattern(dots, TOKENS.core.warmWhite as Hex, 70, 22, 0.26);
  frame.appendChild(dots);
}

function addCover(parent: FrameNode): void {
  const section = createSection(parent, "00 Cover");
  section.fills = [gradient(TOKENS.core.night as Hex, TOKENS.core.graphite as Hex)];
  const hero = createText("Title", "FRIDAY NIGHT\nFEVER DREAM", { font: fonts.display, size: 150, width: 1280, uppercase: true });
  section.appendChild(hero);
  const subtitle = createText("Subtitle", "Local legends, broadcast energy, scrapbook soul.", { font: fonts.marker, size: 38, color: TOKENS.brand.maxprepsRed as Hex, width: 980 });
  subtitle.rotation = -2;
  section.appendChild(subtitle);
  section.appendChild(createText("Supporting Copy", "An expressive visual language for MaxPreps high school sports — built from real photography, school pride, trusted data, athlete recognition, and the emotional electricity of Friday night.", { font: fonts.ui, size: 24, color: TOKENS.core.chrome as Hex, width: 1180 }));
  const row = createFrame("Cover Metadata Row", 1660, 90, []);
  setAuto(row, "HORIZONTAL", 24, 0);
  row.appendChild(createTextureCard("Tape / Every Team", "tape"));
  row.appendChild(createText("Scoreboard", "Q4 07:24", { font: fonts.mono, size: 42, color: TOKENS.brand.scoreboardRed as Hex, width: 260 }));
  row.appendChild(createText("Est Badge", "EST. 2002", { font: fonts.mono, size: 22, width: 200 }));
  section.appendChild(row);
  addTextureOverlay(section);
}

function addPrinciples(parent: FrameNode): void {
  const section = createSection(parent, "01 Brand Principle");
  section.appendChild(createText("Core Line", "LOCAL LEGENDS. BROADCAST ENERGY. SCRAPBOOK SOUL.", { font: fonts.display, size: 72, width: 1600, uppercase: true }));
  section.appendChild(createText("Body", "High school sports are not sleek. They are bright gym lights, muddy fields, local rivals, parents in bleachers, student sections, box scores, rankings, highlights, and the names that matter to a community.", { font: fonts.ui, size: 24, color: TOKENS.core.chrome as Hex, width: 1460 }));
  const row = createFrame("Principle Cards", 1660, 260, []);
  setAuto(row, "HORIZONTAL", 24, 0);
  for (const [title, copy] of [
    ["REAL", "Use authentic sports moments, emotional faces, and imperfect local texture."],
    ["TRUSTED", "Scores, stats, schedules, rankings, and rosters should feel precise and authoritative."],
    ["LOUD", "Use broadcast type, scoreboard motion, red accents, and team-color energy."],
  ]) {
    const card = createFrame(`Principle/${title}`, 520, 230, [solid(TOKENS.core.graphite as Hex)]);
    setAuto(card, "VERTICAL", 16, 24);
    card.cornerRadius = 12;
    card.appendChild(createText("Title", title, { font: fonts.display, size: 58, color: title === "LOUD" ? TOKENS.brand.maxprepsRed as Hex : TOKENS.core.warmWhite as Hex, width: 460 }));
    card.appendChild(createText("Copy", copy, { font: fonts.ui, size: 20, color: TOKENS.core.chrome as Hex, width: 440 }));
    row.appendChild(card);
  }
  section.appendChild(row);
}

function addColors(parent: FrameNode): void {
  const section = createSection(parent, "02 Color System");
  const grid = createFrame("Color Token Grid", 1660, 520, []);
  setAuto(grid, "HORIZONTAL", 16, 0);
  for (const token of ALL_COLORS) grid.appendChild(createColorSwatch(token.name, token.hex));
  section.appendChild(grid);
  section.appendChild(createText("Rule", "MaxPreps red is the thread. Team colors are the proof.", { font: fonts.marker, size: 42, color: TOKENS.brand.maxprepsRed as Hex, width: 1200 }));
}

function addTypography(parent: FrameNode): void {
  const section = createSection(parent, "03 Typography");
  const samples = [
    ["DISPLAY — Champion Gothic / Knockout / Compacta-style", "WHERE THE SEASON LIVES", "Use for hero statements, game titles, rivalry week, playoff moments, and campaign headlines.", fonts.display, 76],
    ["MARKER — Marker Sport-style", "BUILT DIFFERENT", "Use for callouts, stickers, tape labels, senior night, clutch moments, and handwritten emotion.", fonts.marker, 64],
    ["DATA — Chivo Mono", "Q4 07:24   REC 48   YDS 812   TD 11   AVG 16.9", "Use for scores, stats, tables, labels, timestamps, rankings, metadata, and all structured sports information.", fonts.mono, 34],
    ["UI — clean compact sans", "Schedules, Rosters, Rankings, News, Videos", "Use for navigation and readable product UI.", fonts.ui, 34],
  ] as const;
  for (const [label, sample, notes, font, size] of samples) {
    const card = createFrame(`Type Sample/${label}`, 1660, 210, [solid(TOKENS.core.night as Hex, 0.6)]);
    setAuto(card, "VERTICAL", 12, 24);
    card.cornerRadius = 12;
    card.appendChild(createText("Label", label, { font: fonts.mono, size: 16, color: TOKENS.brand.maxprepsRed as Hex, width: 1500 }));
    card.appendChild(createText("Sample", sample, { font, size, width: 1500, uppercase: true }));
    card.appendChild(createText("Notes", notes, { font: fonts.ui, size: 18, color: TOKENS.core.chrome as Hex, width: 1360 }));
    section.appendChild(card);
  }
  section.appendChild(createText("Fallback Note", "Fallback note: exact commercial fonts may be replaced by Impact, Permanent Marker, Chivo Mono/Roboto Mono, or Siro/Inter depending on local availability.", { font: fonts.mono, size: 15, color: TOKENS.core.steel as Hex, width: 1400 }));
}

function addPhotography(parent: FrameNode): void {
  const section = createSection(parent, "04 Photography Treatment");
  const row = createFrame("Image Treatment Cards", 1660, 360, []);
  setAuto(row, "HORIZONTAL", 20, 0);
  for (const [title, treatment, color] of [
    ["Flash Photo", "High contrast, vignette, bright center, crushed blacks.", "#F5F1E8"],
    ["Red Wash", "Red multiply gradient over shadows.", TOKENS.brand.maxprepsRed],
    ["Halftone Editorial", "Dotted overlay, newspaper texture.", TOKENS.core.chrome],
    ["Sideline Grain", "Black-and-white grain, imperfect texture.", TOKENS.core.steel],
    ["Rough Cutout", "Athlete placeholder silhouette with red offset shadow.", TOKENS.team.blue],
  ] as const) {
    const card = createFrame(`Photo Treatment/${title}`, 312, 340, [solid(TOKENS.core.night as Hex)]);
    card.cornerRadius = 12;
    const visual = createFrame("Image Placeholder", 312, 230, [gradient(TOKENS.core.graphite as Hex, color as Hex)]);
    createDotPattern(visual, TOKENS.core.warmWhite as Hex, 16, 9, title === "Halftone Editorial" ? 0.55 : 0.12);
    if (title === "Rough Cutout") {
      const cut = figma.createPolygon();
      cut.name = "Rough Athlete Silhouette";
      cut.pointCount = 6;
      cut.resize(116, 162);
      cut.x = 98;
      cut.y = 34;
      cut.fills = [solid(TOKENS.core.warmWhite as Hex)];
      cut.strokes = [solid(TOKENS.brand.maxprepsRed as Hex)];
      cut.strokeWeight = 8;
      visual.appendChild(cut);
    }
    card.appendChild(visual);
    const label = createText("Label", title, { font: fonts.mono, size: 14, color: TOKENS.brand.maxprepsRed as Hex, width: 276, uppercase: true });
    label.x = 18;
    label.y = 248;
    card.appendChild(label);
    const copy = createText("Treatment", treatment, { font: fonts.ui, size: 15, color: TOKENS.core.chrome as Hex, width: 276 });
    copy.x = 18;
    copy.y = 278;
    card.appendChild(copy);
    row.appendChild(card);
  }
  section.appendChild(row);
  section.appendChild(createText("Caption", "Real. Raw. Flash. High contrast. Halftone. Motion. Imperfect.", { font: fonts.mono, size: 18, color: TOKENS.core.chrome as Hex, width: 1000 }));
}

function addTextures(parent: FrameNode): void {
  const section = createSection(parent, "05 Textures + Motifs");
  const grid = createFrame("Texture Grid", 1660, 470, []);
  setAuto(grid, "HORIZONTAL", 16, 0);
  [
    ["Halftone", "halftone"], ["VHS Scanlines", "vhs"], ["Turf / Field", "turf"], ["Ticket Stub", "ticket"],
    ["Gym Floor", "tape"], ["Chain Link", "chain"], ["Scoreboard", "scoreboard"], ["Marker Circle", "marker"],
    ["Barcode / Player ID", "barcode"], ["Tape Label", "tape"], ["Chrome Badge", "chrome"], ["Red Slash", "slash"],
  ].forEach(([name, type]) => grid.appendChild(createTextureCard(name, type)));
  section.appendChild(grid);
}

function addComponents(parent: FrameNode): void {
  const section = createSection(parent, "06 UI Components");
  const grid = createFrame("Component Grid", 1660, 920, []);
  setAuto(grid, "HORIZONTAL", 22, 0);
  [createButtonComponent(false), createButtonComponent(true), createLiveScoreCard(), createPlayerStatCard(), createTicketModule(), createBadge(), createTapeLabel(), createStoryCard()].forEach((node) => grid.appendChild(node));
  section.appendChild(grid);
}

function addApplications(parent: FrameNode): void {
  const section = createSection(parent, "07 Application Examples");
  const row = createFrame("Application Grid", 1660, 480, []);
  setAuto(row, "HORIZONTAL", 18, 0);
  [
    ["Game Day Poster", ["RIVALRY WEEK", "NORTHSIDE VS RIVERVIEW", "FRI 7PM"], TOKENS.brand.maxprepsRed],
    ["Instagram Post", ["PLAYER OF THE GAME", "24 PTS / 9 REB / 5 AST"], TOKENS.team.gold],
    ["Highlight Thumbnail", ["TOP 5 PLAYS", "WEEK 7"], TOKENS.team.green],
    ["Athlete Profile Header", ["#10 ELIJAH THOMPSON", "812 YDS / 11 TD"], TOKENS.team.blue],
    ["Playoff Card", ["STATE PLAYOFFS", "ROUND 2", "TICKETS ON GOFAN"], TOKENS.brand.deepRed],
  ].forEach(([title, lines, accent]) => row.appendChild(createApplicationCard(title as string, lines as string[], accent as Hex)));
  section.appendChild(row);
}

function addMotion(parent: FrameNode): void {
  const section = createSection(parent, "08 Motion Language");
  const row = createFrame("Motion Cards", 1660, 300, []);
  setAuto(row, "HORIZONTAL", 16, 0);
  [
    ["Score Flip", "Segment numerals snap between states.", "score"],
    ["Sticker Pop", "Callouts slap on with slight overshoot.", "sticker"],
    ["VHS Glitch", "Broadcast artifacts for video moments.", "vhs"],
    ["Type Slam", "Condensed headlines hit on beat.", "red"],
    ["Camera Flash", "White burst reveals a highlight.", "flash"],
    ["Tape Pop", "Labels land slightly rotated.", "sticker"],
    ["Red Scan", "Brand thread wipes across cards.", "red"],
    ["Stat Count-Up", "Data increments with scoreboard rhythm.", "score"],
  ].forEach(([title, note, type]) => row.appendChild(createMotionCard(title, note, type)));
  section.appendChild(row);
  section.appendChild(createText("Caption", "Fast cuts. Kinetic type. Glitches. Flash. Scoreboard flips. Built for energy, but grounded in trust.", { font: fonts.mono, size: 18, color: TOKENS.core.chrome as Hex, width: 1200 }));
}

function addUsage(parent: FrameNode): void {
  const section = createSection(parent, "09 Usage Rules");
  const row = createFrame("Usage Columns", 1660, 410, []);
  setAuto(row, "HORIZONTAL", 24, 0);
  const data = [
    ["DO", ["Use real high school imagery.", "Let team colors show local pride.", "Use MaxPreps red for brand moments and primary action.", "Use Chivo Mono for scores and stats.", "Make UI feel like trusted sports hardware.", "Use texture with restraint."], TOKENS.team.green],
    ["AVOID", ["Generic SaaS cards.", "Over-polished pro sports advertising.", "Fake AI-looking athletes.", "Excessive neon.", "Sterile white dashboards.", "Nostalgia that feels like a costume."], TOKENS.brand.deepRed],
  ] as const;
  for (const [title, items, accent] of data) {
    const card = createFrame(`Usage/${title}`, 810, 380, [solid(TOKENS.core.graphite as Hex)]);
    setAuto(card, "VERTICAL", 16, 26);
    card.cornerRadius = 12;
    card.appendChild(createText("Title", title, { font: fonts.display, size: 54, color: accent as Hex, width: 730 }));
    card.appendChild(createText("Rules", items.map((item) => `• ${item}`).join("\n"), { font: fonts.ui, size: 21, color: TOKENS.core.chrome as Hex, width: 720 }));
    row.appendChild(card);
  }
  section.appendChild(row);
}

function addFinalLockup(parent: FrameNode): void {
  const section = createSection(parent, "10 Final Lockup");
  section.fills = [solid(TOKENS.core.night as Hex)];
  section.appendChild(createText("Brand", "MAXPREPS", { font: fonts.display, size: 130, color: TOKENS.brand.maxprepsRed as Hex, width: 1400, uppercase: true, align: "CENTER" }));
  section.appendChild(createText("Line", "WHERE THE SEASON LIVES", { font: fonts.display, size: 92, width: 1500, uppercase: true, align: "CENTER" }));
  section.appendChild(createText("Meta", "EVERY TEAM. EVERY GAME. EVERY PLAYER.", { font: fonts.mono, size: 28, color: TOKENS.core.chrome as Hex, width: 1500, align: "CENTER" }));
  addTextureOverlay(section);
}

async function main(): Promise<void> {
  await loadFonts();
  createPaintStyles();
  createTextStyles();

  const page = figma.createPage();
  page.name = "Friday Night Fever Dream Style Guide";
  await figma.setCurrentPageAsync(page);

  const guide = createFrame("Friday Night Fever Dream Style Guide", 1920, 2600, [solid(TOKENS.core.night as Hex)]);
  guide.x = 120;
  guide.y = 120;
  setAuto(guide, "VERTICAL", 40, 48);
  page.appendChild(guide);

  addCover(guide);
  addPrinciples(guide);
  addColors(guide);
  addTypography(guide);
  addPhotography(guide);
  addTextures(guide);
  addComponents(guide);
  addApplications(guide);
  addMotion(guide);
  addUsage(guide);
  addFinalLockup(guide);

  guide.resizeWithoutConstraints(1920, Math.max(guide.height, 2600));
  figma.currentPage.selection = [guide];
  figma.viewport.scrollAndZoomIntoView([guide]);
  figma.notify("Friday Night Fever Dream style guide generated.");
  figma.closePlugin();
}

main();
