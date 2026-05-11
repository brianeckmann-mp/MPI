import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBaseball,
  faBasketball,
  faBuildingColumns,
  faCalendarCheck,
  faCalendarDay,
  faCalendarPlus,
  faChartLine,
  faChevronRight,
  faCircleDollarToSlot,
  faCircleUser,
  faEnvelope,
  faEye,
  faFootball,
  faKey,
  faLocationDot,
  faLock,
  faMobileScreenButton,
  faPeopleGroup,
  faPen,
  faShieldHalved,
  faSliders,
  faTableCellsLarge,
  faTicketSimple,
  faVideo,
  faVolleyball,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { VARSITY_SIGNAL_IMAGES } from "./varsity-signal-assets";
import {
  GraystoneIconChevron,
  GraystoneIconFacebook,
  GraystoneIconFilter,
  GraystoneIconGridMenu,
  GraystoneIconHome,
  GraystoneIconInfo,
  GraystoneIconInstagram,
  GraystoneIconList,
  GraystoneIconSearch,
  GraystoneIconStar,
  GraystoneIconTikTok,
  GraystoneIconUser,
  GraystoneIconWavePulse,
  GraystoneIconX,
  GraystoneIconYoutube,
} from "./graystone-icons";

export const GRAYSTONE_PAGES = [
  "graystone-home",
  "graystone-cross-brand-animations",
  "graystone-data-imagery",
  "graystone-login",
  "graystone-playon-home",
  "graystone-playon-hq",
  "graystone-nfhs-home",
  "graystone-maxpreps-home",
  "graystone-maxpreps-videos",
  "graystone-watch",
  "graystone-scores",
  "graystone-programs",
  "graystone-studio",
];

const HEADER_MENUS = [
  {
    id: "sports",
    label: "Sports",
    items: ["Football", "Basketball", "Baseball", "Softball", "Volleyball", "Soccer"],
  },
  {
    id: "schools",
    label: "Schools",
    items: ["Rankings", "Programs", "Districts", "Regions", "Schedules", "Rosters"],
  },
  {
    id: "explore",
    label: "Explore",
    items: ["Highlights", "Livestreams", "Rankings", "Collections", "Stories", "Trends"],
  },
];

const LOCAL_PAGES = [
  { id: "graystone-home", label: "Home" },
  { id: "graystone-maxpreps-videos", label: "Watch" },
  { id: "graystone-scores", label: "Scores" },
  { id: "graystone-programs", label: "Programs" },
  { id: "graystone-studio", label: "Studio" },
];

const BRAND_TREE = [
  { id: "playon", label: "PlayOn", logo: "po.svg", links: ["Home", "Login", "Account"] },
  { id: "maxpreps", label: "MaxPreps", logo: "mp.svg", links: ["Home", "Login", "Account"] },
  { id: "nfhs-network", label: "NFHS Network", logo: "nfhs.svg", links: ["Home", "Login", "Account"] },
  { id: "gofan", label: "GoFan", logo: "gf.svg", links: ["Home", "Login", "Account"] },
];

const NFHS_SPORTS_MENU = {
  "Fall sports": ["Football", "Volleyball", "Boys Soccer", "Girls Soccer", "Cross Country"],
  "Winter sports": ["Basketball", "Wrestling", "Ice Hockey", "Swimming", "Competitive Cheer"],
  "Spring sports": ["Baseball", "Softball", "Track & Field", "Lacrosse", "Tennis"],
};

const NFHS_PRIMARY_LINKS = ["Schools", "States & Associations"];

const CONCEPT_LINKS = [
  {
    id: "graystone-cross-brand-animations",
    title: "Cross brand animations",
    description: "Shared motion patterns for brand transitions, global navigation, and product handoffs.",
  },
];

const DATA_IMAGERY_TOKEN_SETS = {
  Symbols: ["TD", "Q4", "4TH & 1", "QB1", "WR", "DB", "INT", "FG", "PAT", "OT", "1ST", "3RD"],
  Stats: ["RUSH", "PASS", "TKL", "SACK", "YDS", "REC", "AST", "COMP", "RTG", "AVG", "LONG", "SOLO"],
  Names: ["JAXON 7", "MILES 12", "CARTER 30", "ELI 3", "NOAH 21", "TYLER 11", "MASON 8", "CAM 2"],
  Scores: ["28-21", "FINAL", "14-10", "35-28", "7-0", "21-17", "Q2", "Q3", "11/14", "8:00P"],
  Ecosystem: ["MAXPREPS", "GOFAN", "NFHS", "PLAYON", "ROSTER", "RANKINGS", "STREAM", "TICKETS", "HIGHLIGHTS"],
};

DATA_IMAGERY_TOKEN_SETS.Mixed = [
  ...DATA_IMAGERY_TOKEN_SETS.Symbols,
  ...DATA_IMAGERY_TOKEN_SETS.Stats,
  ...DATA_IMAGERY_TOKEN_SETS.Names,
  ...DATA_IMAGERY_TOKEN_SETS.Scores,
  ...DATA_IMAGERY_TOKEN_SETS.Ecosystem,
  "PLAYER OF THE GAME",
  "STATE TOP 25",
  "LIVE NOW",
  "BOX SCORE",
];

const CROSS_BRAND_SPHERES = [
  {
    id: "send",
    brandId: "playon",
    iconId: "send",
    sportIconId: "football",
    label: "PlayOn",
    description: "the operational hub for schools",
    revealText: "all your events for game day",
    colorA: "#2cd6df",
    colorB: "#1397aa",
    colorC: "#b9fbff",
    iconColor: "#18c8d2",
    delay: "0s",
  },
  {
    id: "maxpreps",
    brandId: "maxpreps",
    iconId: "maxpreps",
    sportIconId: "basketball",
    label: "MaxPreps",
    description: "scores, stats, and stories",
    revealText: "the source for teams and athletes",
    colorA: "#ff463f",
    colorB: "#a80000",
    colorC: "#ffd0ce",
    iconColor: "#e10500",
    delay: "-1.8s",
  },
  {
    id: "play",
    brandId: "nfhs-network",
    iconId: "play",
    sportIconId: "volleyball",
    label: "NFHS Network",
    description: "streaming",
    revealText: "live and on-demand streaming",
    colorA: "#ffe353",
    colorB: "#c69000",
    colorC: "#fff5b8",
    iconColor: "#d9a900",
    delay: "-3.1s",
  },
  {
    id: "ticket",
    brandId: "gofan",
    iconId: "ticket",
    sportIconId: "softball",
    label: "Ticket",
    description: "ticketing",
    revealText: "game and event ticketing",
    colorA: "#6f7275",
    colorB: "#242628",
    colorC: "#f2f2f0",
    iconColor: "#3f4143",
    delay: "-4.4s",
  },
];

const MAXPREPS_HOME_LINKS = ["Photos", "Videos", "News", "Tickets", "Watch"];

const GRAYSTONE_SIMULATED_USER = {
  firstName: "Brian",
  avatar: "B",
};

const GRAYSTONE_ACCOUNT_MENU = [
  { id: "account", label: "Account" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "athlete-profiles", label: "Athlete profiles" },
];

const MAXPREPS_SPORTS_MENU = {
  boys: ["Football", "Basketball", "Baseball", "Wrestling", "Soccer", "Lacrosse"],
  girls: ["Basketball", "Softball", "Volleyball", "Soccer", "Lacrosse", "Flag Football"],
  coed: ["Track & Field", "Cross Country", "Swimming", "Tennis", "Golf", "Cheer"],
};

const PLAYON_AUDIENCE_MENUS = [
  {
    id: "playon-schools",
    label: "Schools & Organizations",
    header: "For schools and organizations",
    groups: {
      operations: ["PlayOn HQ", "Event setup", "Reporting", "Fundraising"],
      gameday: ["Digital ticketing", "Streaming workflows", "Fan messaging", "Check-in tools"],
    },
  },
  {
    id: "playon-fans",
    label: "Fans & Families",
    header: "For fans and families",
    groups: {
      access: ["Buy tickets", "Find events", "Season passes", "Mobile entry"],
      moments: ["Watch live", "Highlights", "Scores", "Stories"],
    },
  },
];

const BRAND_SWITCHER_ITEMS = [
  { id: "playon", label: "PlayOn" },
  { id: "maxpreps", label: "MaxPreps" },
  { id: "nfhs-network", label: "NFHS Network" },
  { id: "gofan", label: "GoFan" },
  { id: "maxpreps-advantage", label: "MaxPreps Advantage" },
];

const SEARCH_RESULTS = [
  {
    label: "Millwood Falcons",
    meta: "Varsity Football · Oklahoma City, OK",
    type: "Program",
  },
  {
    label: "Campbell Hall Vikings",
    meta: "Varsity Football · Studio City, CA",
    type: "Program",
  },
  {
    label: "Freshman All-America Watchlist",
    meta: "Editorial package · Watch",
    type: "Collection",
  },
  {
    label: "California Friday Night board",
    meta: "Live games · Rankings · Clips",
    type: "Experience",
  },
];

const WATCH_RAILS = [
  {
    title: "Live and upcoming",
    items: [
      {
        badge: "Live",
        title: "Millwood vs. Carl Albert",
        detail: "Varsity Football",
        meta: "Oklahoma City · Q1 · 9:00",
        gradient: "linear-gradient(135deg, #2a2244 0%, #15161b 100%)",
      },
      {
        badge: "7:00 PM",
        title: "De La Salle at Pittsburg",
        detail: "Varsity Football",
        meta: "California · Tonight",
        gradient: "linear-gradient(135deg, #4f1f14 0%, #131418 100%)",
      },
      {
        badge: "Replay",
        title: "Friday night spotlight",
        detail: "Top highlights",
        meta: "On demand now",
        gradient: "linear-gradient(135deg, #272d40 0%, #121318 100%)",
      },
    ],
  },
  {
    title: "Based on your interests",
    items: [
      {
        badge: "Suggested",
        title: "High school football now",
        detail: "Live board",
        meta: "Programs you follow",
        gradient: "linear-gradient(135deg, #0f3554 0%, #131418 100%)",
      },
      {
        badge: "For your teams",
        title: "Replay package and condensed games",
        detail: "On demand",
        meta: "Recent finals and recaps",
        gradient: "linear-gradient(135deg, #6b1e35 0%, #131418 100%)",
      },
      {
        badge: "Collection",
        title: "Freshman All-America",
        detail: "Featured players",
        meta: "Editorial package",
        gradient: "linear-gradient(135deg, #173152 0%, #131418 100%)",
      },
    ],
  },
];

const WATCH_PAGE_FEATURED_VIDEO = {
  title: "Millwood freshman watchlist: top plays and scouting notes",
  description:
    "A rebuilt watch surface for Graystone MaxPreps, centered on one primary viewing canvas with supporting context and an always-available next-up rail.",
  channel: "Freshman All-America",
  date: "Nov 14, 2025",
  views: "214,203 views",
  duration: "12:48",
  badge: "Featured",
  detail: "Football · Player spotlight",
  thumbnail: "/MPI/thumbnail-1.png",
};

const WATCH_PAGE_PLAYLIST = [
  {
    id: "watch-1",
    title: "Campbell Hall fourth-quarter run",
    detail: "Boys Basketball · Replay",
    duration: "6:12",
    thumbnail: "/MPI/thumbnail-2.png",
  },
  {
    id: "watch-2",
    title: "Mater Dei red-zone drives",
    detail: "Friday night recap",
    duration: "8:04",
    thumbnail: "/MPI/thumbnail-3.png",
  },
  {
    id: "watch-3",
    title: "Lincoln Frazier film study",
    detail: "QB mechanics",
    duration: "4:58",
    thumbnail: "/MPI/thumbnail-8.png",
  },
  {
    id: "watch-4",
    title: "Friday night spotlight: instant-impact plays",
    detail: "National watchlist",
    duration: "7:24",
    thumbnail: "/MPI/thumbnail-4.png",
  },
  {
    id: "watch-5",
    title: "Top performers across boys and girls hoops",
    detail: "Weekend recap",
    duration: "5:48",
    thumbnail: "/MPI/thumbnail-5.png",
  },
];

const WATCH_PAGE_CHANNELS = ["For you", "Highlights", "Shows", "Plays", "Rankings", "Playlists"];

const SCORE_ROWS = [
  { time: "Final", matchup: "Millwood 24 · Carl Albert 17", tag: "Top game", tone: "accent" },
  { time: "Q3", matchup: "Brophy Prep 14 · Hamilton 10", tag: "Live", tone: "neutral" },
  { time: "7:00 PM", matchup: "De La Salle at Serra", tag: "Upcoming", tone: "neutral" },
  { time: "Tomorrow", matchup: "Mater Dei vs. St. John Bosco", tag: "Featured", tone: "neutral" },
];

const PROGRAM_CARDS = [
  { title: "Millwood Falcons", meta: "Football · Oklahoma", accent: "#3d63ff" },
  { title: "Campbell Hall Vikings", meta: "Basketball · California", accent: "#8a5bff" },
  { title: "De La Salle Spartans", meta: "Football · California", accent: "#00a36d" },
  { title: "Brophy Broncos", meta: "Football · Arizona", accent: "#f0a215" },
];

const STUDIO_MODULES = [
  { label: "Search orchestration", detail: "Overlay states, quick links, input behaviors" },
  { label: "Watch rail", detail: "Featured stream, shelves, live status, callouts" },
  { label: "Program identity", detail: "Team theming, records, rankings, follow states" },
  { label: "Experience glue", detail: "Cross-product primitives for media, scores, and AI" },
];

const MAXPREPS_FOLLOWED_TEAMS = [
  {
    id: "millwood",
    name: "Millwood Falcons",
    sport: "Varsity Football",
    record: "7-0",
    accent: "#255dff",
    logo: "mascot-1.svg",
  },
  {
    id: "campbell-hall",
    name: "Campbell Hall Vikings",
    sport: "Boys Basketball",
    record: "8-1",
    accent: "#7a57ff",
    logo: "mascot-2.svg",
  },
  {
    id: "mater-dei",
    name: "Mater Dei Monarchs",
    sport: "Football",
    record: "9-1",
    accent: "#00a36d",
    logo: "mascot-3.svg",
  },
];

const MAXPREPS_FOLLOWED_PLAYERS = [
  {
    id: "mosciski",
    name: "Pamela Mosciski",
    teamId: "campbell-hall",
    detail: "SF · 2026 · Studio City, CA",
    avatar: "person-2.png",
  },
  {
    id: "iliolo",
    name: "Adam Iliolo",
    teamId: "millwood",
    detail: "OLB · 2026 · Santa Margarita, CA",
    avatar: "person-3.png",
  },
  {
    id: "frazier",
    name: "Lincoln Frazier",
    teamId: "millwood",
    detail: "QB · 2027 · Oklahoma City, OK",
    avatar: "person-4.png",
  },
  {
    id: "watts",
    name: "Emma Watts",
    teamId: "mater-dei",
    detail: "SG · 2026 · Santa Ana, CA",
    avatar: "person-5.png",
  },
];

const MAXPREPS_HOME_MODES = {
  personalized: {
    label: "Personalized",
    description:
      "A tailored homepage built around the teams, players, games, and stories you already follow, so the most relevant moments surface first.",
  },
  national: {
    label: "National",
    description:
      "A broader front page shaped by the biggest matchups, top performers, rankings movement, and must-watch storylines from across the country.",
  },
};

const MAXPREPS_TEAM_LOGOS = {
  "Millwood": "mascot-1.svg",
  "Millwood Falcons": "mascot-1.svg",
  "Millwood (OK)": "mascot-1.svg",
  "Campbell Hall": "mascot-2.svg",
  "Campbell Hall Vikings": "mascot-2.svg",
  "Campbell Hall (CA)": "mascot-2.svg",
  "Mater Dei": "mascot-3.svg",
  "Mater Dei Monarchs": "mascot-3.svg",
  "Mater Dei (CA)": "mascot-3.svg",
  "Carl Albert": "mascot-4.svg",
  "Sierra Canyon": "mascot-5.svg",
  "Sierra Canyon (CA)": "mascot-5.svg",
  "St. John Bosco": "mascot-6.svg",
  "St. John Bosco (CA)": "mascot-6.svg",
  "St. Mary's": "mascot-7.svg",
  "Buford (GA)": "mascot-8.svg",
  "Buford": "mascot-8.svg",
  "St. Frances Academy (MD)": "mascot-9.svg",
  "Bishop Gorman (NV)": "mascot-10.svg",
  "Santa Margarita (CA)": "mascot-11.svg",
  "Santa Margarita": "mascot-11.svg",
  "Carrollton (GA)": "mascot-12.svg",
  "IMG Academy (FL)": "mascot-13.svg",
  "Westlake": "mascot-14.svg",
  "Montverde Academy": "mascot-15.svg",
  "Link Academy": "mascot-16.svg",
  "Harvard-Westlake": "mascot-17.svg",
  "Harvard-Westlake (CA)": "mascot-17.svg",
  "St. Frances Academy": "mascot-9.svg",
  "Bishop Gorman": "mascot-10.svg",
  "Carrollton": "mascot-12.svg",
  "IMG Academy": "mascot-13.svg",
};

const MAXPREPS_CONTENT_PREFERENCES = [
  { id: "highlights", label: "Highlights" },
  { id: "videos", label: "Videos" },
  { id: "upcomingGames", label: "Upcoming games" },
  { id: "scores", label: "Scores" },
  { id: "news", label: "News" },
  { id: "stats", label: "Stats" },
];

const MAXPREPS_CONTENT_PREFERENCE_DEFAULTS = Object.fromEntries(
  MAXPREPS_CONTENT_PREFERENCES.map(({ id }) => [id, true]),
);

const VARSITY_SIGNAL_PALETTE = [
  { name: "Night Field Black", value: "#05090a", note: "base" },
  { name: "Scoreboard White", value: "#f6f2e8", note: "surface" },
  { name: "Newsprint Bone", value: "#ebe3d3", note: "page" },
  { name: "Press Box Pewter", value: "#6f766f", note: "neutral accent" },
  { name: "Turf Green", value: "#16a34a", note: "system" },
  { name: "Gym Floor Gold", value: "#f2b820", note: "warmth" },
  { name: "MaxPreps Red", value: "#e10500", note: "live" },
  { name: "Electric Blue", value: "#006dff", note: "action" },
  { name: "Chrome Silver", value: "#cfd8dc", note: "badge" },
  { name: "Ticket Tan", value: "#e7d8b8", note: "paper" },
];

const VARSITY_SIGNAL_TEXTURES = [
  { name: "Halftone", className: "halftone" },
  { name: "Tape", className: "tape" },
  { name: "Turf", className: "turf" },
  { name: "Ticket Stub", className: "ticket" },
  { name: "Chain Link", className: "chain" },
  { name: "Jersey Mesh", className: "mesh" },
];

const VARSITY_SIGNAL_COMPONENTS = [
  { label: "LIVE", className: "live" },
  { label: "FINAL", className: "final" },
  { label: "OT", className: "ot" },
  { label: "UPSET ALERT", className: "upset" },
  { label: "RIVALRY WEEK", className: "rivalry" },
  { label: "PLAYER ID", className: "barcode" },
  { label: "GAME DAY", className: "tape" },
  { label: "CHROME BADGE", className: "chrome" },
];

const VARSITY_SIGNAL_APPLICATIONS = [
  {
    label: "Game day poster",
    title: "Rivalry Week",
    meta: "Northside vs. Riverview",
    accent: "#e10500",
  },
  {
    label: "Instagram post",
    title: "Player of the Game",
    meta: "32 PTS · 8 REB · 5 AST",
    accent: "#6f766f",
  },
  {
    label: "Highlight thumbnail",
    title: "Top 5 Plays",
    meta: "Week 7",
    accent: "#006dff",
  },
  {
    label: "Athlete profile",
    title: "#10 Elijah Thompson",
    meta: "812 REC YDS · 11 TDS",
    accent: "#7447ff",
  },
];

const VARSITY_SIGNAL_MARKETING_ASSETS = [
  {
    label: "Instagram Story",
    title: "Final: 32-28",
    meta: "1080 x 1920",
    imageId: "scoreboard-huddle",
    className: "story",
  },
  {
    label: "Square Social",
    title: "Player of the Game",
    meta: "1080 x 1080",
    imageId: "profile-athlete",
    className: "square",
  },
  {
    label: "Video Thumbnail",
    title: "Top 5 Plays",
    meta: "16:9 social/video",
    imageId: "court-final",
    className: "thumb",
  },
  {
    label: "Email Header",
    title: "Watch Live Tonight",
    meta: "1200 x 480",
    imageId: "game-poster",
    className: "email",
  },
  {
    label: "Email Header",
    title: "Weekly Highlights",
    meta: "1200 x 480",
    imageId: "volleyball-final",
    className: "email",
  },
];

const VARSITY_SIGNAL_VISUAL_EFFECTS = [
  {
    number: "1",
    name: "High Contrast Sports Grade",
    description: "Punchy contrast, controlled color, and deep blacks focused on the athlete.",
    imageId: "profile-athlete",
    className: "contrast",
  },
  {
    number: "2",
    name: "Flash Photo Treatment",
    description: "On-camera flash energy with a crisp subject and a darker, richer background.",
    imageId: "championship-net",
    className: "flash",
  },
  {
    number: "3",
    name: "Sideline Grain",
    description: "Film grain and rough texture that keeps the image real, local, and imperfect.",
    imageId: "student-energy",
    className: "grain",
  },
  {
    number: "4",
    name: "VHS Scanlines",
    description: "Subtle scanlines, timecode, and color distortion for broadcast energy.",
    imageId: "game-poster",
    className: "vhs",
  },
  {
    number: "5",
    name: "Torn Paper Edge",
    description: "Ripped-paper framing for headlines, photo cards, modules, and recap panels.",
    imageId: "track-state",
    className: "torn",
  },
  {
    number: "6",
    name: "Chromatic Offset",
    description: "A slight broadcast RGB split for motion, tension, and game-night energy.",
    imageId: "volleyball-final",
    className: "chromatic",
  },
];

const VARSITY_SIGNAL_MOTION_REFERENCES = [
  {
    label: "Score Flip",
    note: "180-240ms hard flip. Digits change like a real board, then settle cleanly.",
    className: "score-flip",
    meta: "Q4 07:24",
  },
  {
    label: "Sticker Pop",
    note: "Fast overshoot and snap-back. Use for clutch, senior night, and award callouts.",
    className: "sticker-pop",
    meta: "140ms pop",
  },
  {
    label: "VHS Glitch",
    note: "Two-frame tracking tear with RGB offset. Best for video, recaps, and throwbacks.",
    className: "vhs-glitch",
    meta: "2 frame hit",
  },
  {
    label: "Type Slam",
    note: "Condensed headline enters with a punch, red rule follows a beat later.",
    className: "type-slam",
    meta: "impact beat",
  },
  {
    label: "Ticket Wipe",
    note: "A ticket-stub edge wipes between promos, GoFan modules, and game details.",
    className: "ticket-wipe",
    meta: "left to right",
  },
  {
    label: "Camera Flash",
    note: "One bright flash over a real photo. Use as a transition into the moment.",
    className: "camera-flash",
    meta: "1 flash",
  },
];

const getVarsitySignalImage = (id) => VARSITY_SIGNAL_IMAGES.find((image) => image.id === id);

const getVarsitySignalSrc = (baseUrl, image) => `${baseUrl}${image.src}`;

const getVarsitySignalSrcSet = (baseUrl, image) => (
  image.variants.map((variant) => `${baseUrl}${variant.src} ${variant.width}w`).join(", ")
);

const VARSITY_SIGNAL_TEAM_THEMES = [
  {
    school: "Northside Knights",
    mascot: "N",
    logo: "mascot-4.svg",
    sport: "Varsity Football",
    primary: "#172554",
    secondary: "#f8fafc",
    accent: "#d4af37",
    record: "8-1",
  },
  {
    school: "Riverview Rams",
    mascot: "R",
    logo: "mascot-9.svg",
    sport: "Girls Basketball",
    primary: "#7f1d1d",
    secondary: "#111827",
    accent: "#f2b820",
    record: "12-3",
  },
  {
    school: "East Valley Tigers",
    mascot: "EV",
    logo: "mascot-3.svg",
    sport: "Baseball",
    primary: "#14532d",
    secondary: "#f97316",
    accent: "#ebe3d3",
    record: "10-4",
  },
];

const MAXPREPS_SPORT_FILTER_OPTIONS = {
  sports: [
    { id: "all", label: "All sports" },
    { id: "football", label: "Football" },
    { id: "basketball", label: "Basketball" },
    { id: "baseball", label: "Baseball" },
    { id: "flag-football", label: "Flag football" },
  ],
  genders: [
    { id: "all", label: "All genders" },
    { id: "boys", label: "Boys" },
    { id: "girls", label: "Girls" },
    { id: "coed", label: "Coed" },
  ],
  levels: [
    { id: "varsity", label: "Varsity" },
    { id: "jv", label: "JV" },
    { id: "freshman", label: "Freshman" },
  ],
};

const MAXPREPS_SPORT_FILTER_DEFAULTS = {
  sports: "all",
  genders: "all",
  levels: "varsity",
};

function inferFacetSport(sourceText) {
  if (sourceText.includes("flag football")) return "flag-football";
  if (sourceText.includes("football")) return "football";
  if (sourceText.includes("basketball")) return "basketball";
  if (sourceText.includes("baseball")) return "baseball";
  return null;
}

function inferFacetGender(sourceText, sport) {
  if (sourceText.includes("boys")) return "boys";
  if (sourceText.includes("girls")) return "girls";
  if (sport === "flag-football") return "girls";
  if (sport === "basketball") return "boys";
  if (sport === "football" || sport === "baseball") return "boys";
  return "coed";
}

function inferFacetLevel(sourceText) {
  if (sourceText.includes("freshman")) return "freshman";
  if (sourceText.includes("junior varsity") || sourceText.includes(" jv")) return "jv";
  return "varsity";
}

function getItemFacets(item = {}) {
  const sourceText = [
    item.sport,
    item.gender,
    item.level,
    item.meta,
    item.title,
    item.detail,
    item.sentence,
    item.category,
    item.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const sport = item.sportFilter ?? inferFacetSport(sourceText);
  const gender = item.genderFilter ?? inferFacetGender(sourceText, sport);
  const level = item.levelFilter ?? inferFacetLevel(sourceText);

  return { sport, gender, level };
}

function matchesFilterGroup(value, selectedValue) {
  if (selectedValue === "all") return true;
  if (!value) return true;
  return value === selectedValue;
}

function matchesSportFilters(item, filters) {
  const facets = getItemFacets(item);
  return (
    matchesFilterGroup(facets.sport, filters.sports) &&
    matchesFilterGroup(facets.gender, filters.genders) &&
    matchesFilterGroup(facets.level, filters.levels)
  );
}

const MAXPREPS_TEXT_FEED = {
  personalized: [
    {
      id: "p-1",
      label: "",
      title: "National High School Football rankings updated",
      meta: "",
    },
    {
      id: "p-2",
      label: "",
      title: "Tyler Winkles stats from 11/14 game were validated",
      meta: "",
    },
    {
      id: "p-3",
      label: "",
      title: "Edge AI predicts the Acalanes have a 78% chance to make the playoffs",
      meta: "",
    },
    {
      id: "p-4",
      label: "",
      title: "Roster has been added to Wolverines Varsity Boys Basketball",
      meta: "",
    },
  ],
  national: [
    {
      id: "n-1",
      label: "National",
      title: "Top-ranked programs, live score swings, and breakout performers are leading the feed.",
      meta: "National board",
    },
    {
      id: "n-2",
      label: "Update",
      title: "Freshman All-America watchlist and weekly risers are active across the homepage.",
      meta: "Editorial priority",
    },
    {
      id: "n-3",
      label: "Announcement",
      title: "Live games, highlights, and rankings movement are blended without team-specific filters.",
      meta: "Broad discovery",
    },
  ],
};

const MAXPREPS_STATS = {
  personalized: [
    {
      id: "game-stats",
      type: "game",
      sportFilter: "basketball",
      genderFilter: "boys",
      levelFilter: "varsity",
      sentence: "Stats have been entered for the Campbell Hall vs. Sierra Canyon game on Saturday, Nov. 15, 2025.",
      subject: "Campbell Hall vs. Sierra Canyon",
      preview: [
        { value: "238", label: "Passing yards" },
        { value: "237", label: "Receiving yards" },
        { value: "270", label: "Rushing yards" },
      ],
      links: [
        { label: "Game stats", kind: "primary" },
        { label: "Season stats", kind: "secondary" },
      ],
    },
    {
      id: "player-stats",
      type: "player",
      sportFilter: "football",
      genderFilter: "boys",
      levelFilter: "varsity",
      sentence: "Stats have been entered for Lincoln Frazier in the Millwood vs. Carl Albert game on Friday, Nov. 14, 2025.",
      subject: "Lincoln Frazier",
      preview: [
        { value: "312", label: "Passing yards" },
        { value: "4", label: "Passing TD" },
        { value: "68", label: "Rush yards" },
      ],
      links: [
        { label: "Player stats", kind: "primary" },
        { label: "Game stats", kind: "secondary" },
      ],
    },
  ],
  national: [
    {
      id: "national-game-stats",
      type: "game",
      sportFilter: "football",
      genderFilter: "boys",
      levelFilter: "varsity",
      sentence: "Stats have been entered for the Mater Dei vs. St. John Bosco game on Friday, Nov. 14, 2025.",
      subject: "Mater Dei vs. St. John Bosco",
      preview: [
        { value: "451", label: "Total yards" },
        { value: "31", label: "Points" },
        { value: "6.8", label: "Yards / play" },
      ],
      links: [
        { label: "Game stats", kind: "primary" },
        { label: "National stats", kind: "secondary" },
      ],
    },
    {
      id: "national-player-stats",
      type: "player",
      sportFilter: "basketball",
      genderFilter: "girls",
      levelFilter: "varsity",
      sentence: "Stats have been entered for Kaleena Smith in Ontario Christian's latest game on Thursday, Nov. 13, 2025.",
      subject: "Kaleena Smith",
      preview: [
        { value: "31", label: "Points" },
        { value: "9", label: "Assists" },
        { value: "6", label: "Rebounds" },
      ],
      links: [
        { label: "Player stats", kind: "primary" },
        { label: "National leaders", kind: "secondary" },
      ],
    },
  ],
};

const MAXPREPS_RANKINGS = {
  personalized: {
    title: "HS Team Rankings",
    updated: "Tuesday, Dec 23, 2025",
    rows: [
      { rank: 1, name: "Sierra Canyon (CA)", record: "9-0", strength: "37.2", short: "SC", accent: "#6d28d9", sportFilter: "basketball", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 2, name: "Mater Dei (CA)", record: "9-1", strength: "36.4", short: "MD", accent: "#b91c1c", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 3, name: "Campbell Hall (CA)", record: "8-1", strength: "34.8", short: "CH", accent: "#7a57ff", sportFilter: "basketball", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 4, name: "Millwood (OK)", record: "7-0", strength: "33.5", short: "MF", accent: "#255dff", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 5, name: "St. John Bosco (CA)", record: "9-1", strength: "32.9", short: "SJB", accent: "#111827", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 6, name: "Harvard-Westlake (CA)", record: "8-2", strength: "31.1", short: "HW", accent: "#4b5563", sportFilter: "basketball", genderFilter: "boys", levelFilter: "varsity" },
    ],
  },
  national: {
    title: "HS Football Rankings",
    updated: "Tuesday, Dec 23, 2025",
    rows: [
      { rank: 1, name: "Buford (GA)", record: "15-0", strength: "37.2", short: "BF", accent: "#15803d", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 2, name: "St. Frances Academy (MD)", record: "9-1", strength: "37.5", short: "SFA", accent: "#1f2937", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 3, name: "Bishop Gorman (NV)", record: "11-1", strength: "34.7", short: "BG", accent: "#1d4ed8", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 4, name: "Santa Margarita (CA)", record: "11-3", strength: "64.9", short: "SM", accent: "#2563eb", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 5, name: "Carrollton (GA)", record: "14-1", strength: "37.5", short: "CAR", accent: "#92400e", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
      { rank: 6, name: "IMG Academy (FL)", record: "9-0", strength: "44.3", short: "IMG", accent: "#0ea5e9", sportFilter: "football", genderFilter: "boys", levelFilter: "varsity" },
    ],
  },
};

const MAXPREPS_VIDEO_PLAYLIST_NATIONAL = [
  {
    id: "featured-national",
    teamId: "national",
    tag: "National",
    title: "The biggest high school sports moments this week",
    meta: "14:12 · Daily front page package",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-1.png",
  },
  {
    id: "national-football",
    teamId: "national",
    tag: "Football",
    title: "Friday night spotlight: instant-impact plays",
    meta: "7:24 · National watchlist",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-2.png",
  },
  {
    id: "national-hoops",
    teamId: "national",
    tag: "Basketball",
    title: "Top performers across boys and girls hoops",
    meta: "5:48 · Weekend recap",
    sportFilter: "basketball",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-3.png",
  },
  {
    id: "national-breakout",
    teamId: "national",
    tag: "Breakout",
    title: "Risers, stars, and new names to know",
    meta: "4:51 · National scouting desk",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "freshman",
    thumbnail: "/MPI/thumbnail-1.png",
  },
];

const MAXPREPS_UPCOMING_GAMES_NATIONAL = [
  {
    id: "national-game-1",
    teamId: "national",
    sport: "Football",
    gameType: "Regular season",
    status: "Fri 11/14 @7:00pm",
    context: "Preview game",
    teams: [
      { name: "Mater Dei", record: "10-0", short: "MD", accent: "#b91c1c" },
      { name: "St. John Bosco", record: "9-1", short: "SJB", accent: "#111827" },
    ],
    prediction: { team: "Mater Dei", probability: "54%", summary: "likely to win" },
    footer: "Going to the game?",
    footerAction: "Provide score updates",
  },
  {
    id: "national-game-2",
    teamId: "national",
    sport: "Boys Basketball",
    gameType: "Regular season",
    status: "Sat 11/15 @6:30pm",
    context: "National spotlight",
    teams: [
      { name: "Montverde Academy", record: "8-0", short: "MV", accent: "#065f46" },
      { name: "Link Academy", record: "7-1", short: "LA", accent: "#111827" },
    ],
    prediction: { team: "Montverde Academy", probability: "61%", summary: "likely to win" },
    footer: "Need the matchup?",
    footerAction: "Set a reminder",
  },
  {
    id: "national-game-3",
    teamId: "national",
    sport: "Football",
    gameType: "Playoff",
    status: "Sat 11/15 @8:00pm",
    context: "Regional spotlight",
    teams: [
      { name: "Westlake", record: "9-1", short: "WL", accent: "#111827" },
      { name: "Buford", record: "10-0", short: "BF", accent: "#7c2d12" },
    ],
    prediction: { team: "Buford", probability: "57%", summary: "likely to win" },
    footer: "Want the preview?",
    footerAction: "Open game center",
  },
];

const MAXPREPS_NEWS_NATIONAL = [
  {
    id: "national-news-1",
    teamId: "national",
    category: "Rankings",
    title: "National Top 25 shifts after a weekend of statement wins",
    meta: "2h ago · 5 min read",
    excerpt: "Statement wins and late score swings reshaped the Top 25 picture from coast to coast.",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-1.png",
  },
  {
    id: "national-news-2",
    teamId: "national",
    category: "Players",
    title: "Five underclassmen who changed the conversation this week",
    meta: "Today · 4 min read",
    excerpt: "Fresh names are forcing their way into the national spotlight on both sides of the ball.",
    sportFilter: "basketball",
    genderFilter: "girls",
    levelFilter: "freshman",
    thumbnail: "/MPI/thumbnail-2.png",
  },
  {
    id: "national-news-3",
    teamId: "national",
    category: "Watch",
    title: "Where the biggest live-stream windows open up this weekend",
    meta: "This week · 3 min read",
    excerpt: "The must-watch matchups and stream windows worth building your weekend around.",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-3.png",
  },
  {
    id: "national-news-4",
    teamId: "national",
    category: "Playoffs",
    title: "Bracket movement begins to sharpen the national picture",
    meta: "Today · 3 min read",
    excerpt: "Regional results are clarifying where the biggest postseason collisions are coming.",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-1.png",
  },
];

const MAXPREPS_SCORES_NATIONAL = [
  {
    id: "national-score-1",
    teamId: "national",
    status: "Final",
    date: "11/14",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    teams: [
      { name: "Mater Dei", record: "10-0", score: 35, short: "MD", accent: "#b91c1c" },
      { name: "St. Mary's", record: "1-9", score: 14, short: "SM", accent: "#111827" },
    ],
  },
  {
    id: "national-score-2",
    teamId: "national",
    status: "Final",
    date: "11/14",
    sportFilter: "basketball",
    genderFilter: "boys",
    levelFilter: "varsity",
    teams: [
      { name: "Link Academy", record: "9-1", score: 71, short: "LA", accent: "#111827" },
      { name: "IMG Academy", record: "8-2", score: 68, short: "IM", accent: "#2563eb" },
    ],
  },
  {
    id: "national-score-3",
    teamId: "national",
    status: "Final",
    date: "11/13",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    teams: [
      { name: "Buford", record: "10-0", score: 28, short: "BF", accent: "#7c2d12" },
      { name: "Collins Hill", record: "7-3", score: 24, short: "CH", accent: "#1d4ed8" },
    ],
  },
];

const MAXPREPS_VIDEO_PLAYLIST = [
  {
    id: "featured",
    teamId: "millwood",
    tag: "Featured",
    title: "Millwood freshman watchlist: top plays and scouting notes",
    meta: "12:48 · 2026 Freshman All-America",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "freshman",
    thumbnail: "/MPI/thumbnail-1.png",
  },
  {
    id: "campbell-hall-run",
    teamId: "campbell-hall",
    tag: "Replay",
    title: "Campbell Hall fourth-quarter run",
    meta: "6:12 · Boys Basketball",
    sportFilter: "basketball",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-2.png",
  },
  {
    id: "mater-dei-redzone",
    teamId: "mater-dei",
    tag: "Highlights",
    title: "Mater Dei red-zone drives",
    meta: "8:04 · Friday night recap",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/thumbnail-3.png",
  },
  {
    id: "millwood-breakdown",
    teamId: "millwood",
    tag: "Breakdown",
    title: "Lincoln Frazier film study",
    meta: "4:58 · QB mechanics",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "freshman",
    thumbnail: "/MPI/thumbnail-8.png",
  },
];

const MAXPREPS_NETWORK_MATCHUPS = [
  {
    id: "eldorado-rio-grande-morning",
    status: "Live",
    sport: "Varsity Boys Baseball",
    teams: [
      { name: "Eldorado", short: "ELD", accent: "#d97706", logo: "mascot-18.svg" },
      { name: "Rio Grande", short: "RG", accent: "#c80000", logo: "mascot-19.svg" },
    ],
    time: "May 9, 2026 | 10:00 AM MDT",
    location: "Albuquerque, NM",
  },
  {
    id: "eldorado-rio-grande-afternoon",
    status: "Upcoming",
    sport: "Varsity Boys Baseball",
    teams: [
      { name: "Eldorado", short: "ELD", accent: "#d97706", logo: "mascot-18.svg" },
      { name: "Rio Grande", short: "RG", accent: "#c80000", logo: "mascot-19.svg" },
    ],
    time: "May 9, 2026 | 1:00 PM MDT",
    location: "Albuquerque, NM",
  },
  {
    id: "atrisco-rio-rancho-evening",
    status: "Upcoming",
    sport: "Varsity Boys Baseball",
    teams: [
      { name: "Atrisco", short: "AT", accent: "#facc15", logo: "mascot-11.svg" },
      { name: "Rio Rancho", short: "RR", accent: "#15803d", logo: "mascot-12.svg" },
    ],
    time: "May 8, 2026 | 4:00 PM MDT",
    location: "Albuquerque, NM",
  },
  {
    id: "atrisco-rio-rancho-morning",
    status: "Upcoming",
    sport: "Varsity Boys Baseball",
    teams: [
      { name: "Atrisco", short: "AT", accent: "#facc15", logo: "mascot-11.svg" },
      { name: "Rio Rancho", short: "RR", accent: "#15803d", logo: "mascot-12.svg" },
    ],
    time: "May 9, 2026 | 10:00 AM MDT",
    location: "Albuquerque, NM",
  },
];

const MAXPREPS_UPCOMING_GAMES = [
  {
    id: "game-1",
    teamId: "millwood",
    sport: "Varsity Football",
    gameType: "Regular season",
    status: "Fri 11/14 @7:00pm",
    context: "Preview game",
    teams: [
      { name: "Millwood", record: "7-0", short: "MF", accent: "#255dff" },
      { name: "Carl Albert", record: "10-0", short: "CA", accent: "#c2410c" },
    ],
    prediction: { team: "Millwood", probability: "63%", summary: "likely to win" },
    footer: "Going to the game?",
    footerAction: "Provide score updates",
  },
  {
    id: "game-2",
    teamId: "campbell-hall",
    sport: "Boys Basketball",
    gameType: "Regular season",
    status: "Sat 11/15 @6:00pm",
    context: "Preview game",
    teams: [
      { name: "Campbell Hall", record: "8-1", short: "CH", accent: "#7a57ff" },
      { name: "Sierra Canyon", record: "9-0", short: "SC", accent: "#111827" },
    ],
    prediction: { team: "Sierra Canyon", probability: "58%", summary: "likely to win" },
    footer: "Want the preview?",
    footerAction: "Open game center",
  },
  {
    id: "game-3",
    teamId: "mater-dei",
    sport: "Football",
    gameType: "Playoff",
    status: "Fri 11/14 @8:00pm",
    context: "Preview game",
    teams: [
      { name: "Mater Dei", record: "9-1", short: "MD", accent: "#00a36d" },
      { name: "St. John Bosco", record: "9-1", short: "SJB", accent: "#111827" },
    ],
    prediction: { team: "Mater Dei", probability: "51%", summary: "win probability edge" },
    footer: "Need the matchup?",
    footerAction: "Set a reminder",
  },
];

const MAXPREPS_NEWS = [
  {
    id: "news-1",
    teamId: "millwood",
    category: "NFL Draft",
    title: "State-by-state look at every player selected in the NFL Draft over last decade",
    meta: "Apr 20, 2026 · Zack Poff",
    excerpt:
      "Florida and Texas have produced nearly a quarter of all NFL Draft selections since 2016, with the four biggest states accounting for 39.9 percent of picks.",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/article-hero.webp",
  },
  {
    id: "news-2",
    teamId: "campbell-hall",
    category: "Flag Football",
    title: "High school girls flag football: Who are the top quarterbacks in the state of Florida this spring?",
    meta: "Apr 15, 2026 · Nick Pecoraro",
    excerpt:
      "Florida’s long-running spring flag football scene is producing another strong class of quarterbacks, led by prolific passers and record-setting seasons across the state.",
    sportFilter: "flag-football",
    genderFilter: "girls",
    levelFilter: "varsity",
    thumbnail: "/MPI/article-image-1.webp",
  },
  {
    id: "news-3",
    teamId: "mater-dei",
    category: "Rankings",
    title: "High school baseball rankings: California, Arkansas programs headline newcomers in this week's MaxPreps Top 25",
    meta: "Apr 14, 2026 · Kevin Askeland",
    excerpt:
      "Orange Lutheran strengthened its resume with another Boras South Classic title, while California and Arkansas programs led this week’s movement into the MaxPreps Top 25.",
    sportFilter: "baseball",
    genderFilter: "boys",
    levelFilter: "varsity",
    thumbnail: "/MPI/article-image-2.webp",
  },
  {
    id: "news-4",
    teamId: "millwood",
    category: "Awards",
    title: "High school girls basketball: Kaleena Smith of Ontario Christian named MaxPreps National Player of the Year",
    meta: "Apr 7, 2026 · Aaron Williams",
    excerpt:
      "The junior guard averaged 31.5 points per game while leading Ontario Christian to state and national titles, earning MaxPreps National Player of the Year honors.",
    sportFilter: "basketball",
    genderFilter: "girls",
    levelFilter: "varsity",
    thumbnail: "/MPI/article-image-3.webp",
  },
];

const MAXPREPS_SCORES = [
  {
    id: "score-1",
    teamId: "millwood",
    status: "Final",
    date: "11/14",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    teams: [
      { name: "Millwood", record: "10-0", score: 24, short: "MF", accent: "#255dff" },
      { name: "Carl Albert", record: "1-9", score: 17, short: "CA", accent: "#c2410c" },
    ],
  },
  {
    id: "score-2",
    teamId: "campbell-hall",
    status: "Final",
    date: "11/14",
    sportFilter: "basketball",
    genderFilter: "boys",
    levelFilter: "varsity",
    teams: [
      { name: "Campbell Hall", record: "10-0", score: 68, short: "CH", accent: "#7a57ff" },
      { name: "Harvard-Westlake", record: "8-2", score: 63, short: "HW", accent: "#111827" },
    ],
  },
  {
    id: "score-3",
    teamId: "mater-dei",
    status: "Final",
    date: "11/13",
    sportFilter: "football",
    genderFilter: "boys",
    levelFilter: "varsity",
    teams: [
      { name: "Mater Dei", record: "9-1", score: 35, short: "MD", accent: "#00a36d" },
      { name: "St. Mary's", record: "6-4", score: 14, short: "SM", accent: "#111827" },
    ],
  },
];

function GraystoneTeamMark({ team, size = "md" }) {
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedName = team.name?.replace(/\s*\([^)]+\)\s*$/, "");
  const logo = team.logo ?? MAXPREPS_TEAM_LOGOS[team.name] ?? MAXPREPS_TEAM_LOGOS[normalizedName];
  const initials = team.short ?? team.name.split(" ").map((part) => part[0]).join("").slice(0, 3);

  return (
    <span
      className={`graystone-team-mark graystone-team-mark--${size}`}
      style={{ "--team-accent": team.accent ?? "#121317" }}
      aria-hidden="true"
    >
      {logo ? <img src={`${baseUrl}${logo}`} alt="" /> : initials}
    </span>
  );
}

function GraystonePlayerMark({ player, size = "md" }) {
  const baseUrl = import.meta.env.BASE_URL;
  const initials = player.name.split(" ").map((part) => part[0]).join("").slice(0, 2);

  return (
    <span className={`graystone-player-mark graystone-player-mark--${size}`} aria-hidden="true">
      {player.avatar ? <img src={`${baseUrl}${player.avatar}`} alt="" /> : initials}
    </span>
  );
}

function GraystoneMaxPrepsNewsSection({ stories }) {
  const [heroStory, ...railStories] = stories.slice(0, 4);

  return (
    <div className="graystone-maxpreps-news-layout">
      <article className="graystone-maxpreps-news-card graystone-maxpreps-news-card--hero">
        <div
          className="graystone-maxpreps-news-card__media"
          style={{ backgroundImage: `url(${heroStory.thumbnail})` }}
          aria-hidden="true"
        />
        <div className="graystone-maxpreps-news-card__body graystone-maxpreps-news-card__body--hero">
          <strong>{heroStory.title}</strong>
          <p>{heroStory.excerpt}</p>
          <small>{heroStory.meta}</small>
        </div>
      </article>

      <div className="graystone-maxpreps-news-rail">
        {railStories.map((story) => (
          <article key={story.id} className="graystone-maxpreps-news-card graystone-maxpreps-news-card--compact">
            <div
              className="graystone-maxpreps-news-card__thumb"
              style={{ backgroundImage: `url(${story.thumbnail})` }}
              aria-hidden="true"
            />
            <div className="graystone-maxpreps-news-card__body graystone-maxpreps-news-card__body--compact">
              <strong>{story.title}</strong>
              <p>{story.excerpt}</p>
              <small>{story.meta}</small>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function GraystoneMaxPrepsFooter() {
  const footerLinks = [
    "About us",
    "Mobile apps",
    "Subscribe",
    "Privacy policy",
    "Terms of use",
    "California notice",
    "Your privacy choices",
    "Support",
  ];

  return (
    <footer className="graystone-maxpreps-footer" aria-label="MaxPreps footer">
      <div className="graystone-maxpreps-footer__inner">
        <div className="graystone-maxpreps-footer__brand">
          <GraystoneMaxPrepsWordmark />
        </div>

        <div className="graystone-maxpreps-footer__social">
          <button type="button" aria-label="TikTok">
            <GraystoneIconTikTok />
          </button>
          <button type="button" aria-label="YouTube">
            <GraystoneIconYoutube />
          </button>
          <button type="button" aria-label="Instagram">
            <GraystoneIconInstagram />
          </button>
          <button type="button" aria-label="X">
            <GraystoneIconX />
          </button>
          <button type="button" aria-label="Facebook">
            <GraystoneIconFacebook />
          </button>
        </div>

        <nav className="graystone-maxpreps-footer__links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <button key={link} type="button">
              {link}
            </button>
          ))}
        </nav>

        <div className="graystone-maxpreps-footer__subbrand">
          <GraystonePlayOnWordmark />
        </div>

        <div className="graystone-maxpreps-footer__legal">
          <p>© 2026 MaxPreps, Inc.</p>
          <p>MaxPreps is a registered trademark of MaxPreps, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

function GraystonePlayOnFooter() {
  const footerGroups = [
    { title: "Products", links: ["PlayOn HQ", "GoFan", "NFHS Network", "MaxPreps"] },
    { title: "Company", links: ["About", "Careers", "Newsroom", "Contact"] },
    { title: "Customers", links: ["Schools", "Districts", "Athletic directors", "Fans"] },
    { title: "Support", links: ["Help center", "Ticket support", "Streaming support", "Status"] },
  ];

  return (
    <footer className="graystone-playon-footer" aria-label="PlayOn footer">
      <div className="graystone-playon-footer__inner">
        <div className="graystone-playon-footer__brand">
          <GraystonePlayOnWordmark wordFill="#FBFAF8" />
          <p>One connected platform for school events, fans, and communities.</p>
        </div>

        <div className="graystone-playon-footer__social" aria-label="Social links">
          <button type="button" aria-label="Facebook">
            <GraystoneIconFacebook />
          </button>
          <button type="button" aria-label="Instagram">
            <GraystoneIconInstagram />
          </button>
          <button type="button" aria-label="TikTok">
            <GraystoneIconTikTok />
          </button>
          <button type="button" aria-label="YouTube">
            <GraystoneIconYoutube />
          </button>
          <button type="button" aria-label="X">
            <GraystoneIconX />
          </button>
        </div>

        <nav className="graystone-playon-footer__links" aria-label="Footer links">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <strong>{group.title}</strong>
              {group.links.map((link) => (
                <button key={link} type="button">
                  {link}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="graystone-playon-footer__legal">
          <p>© 2026 PlayOn Sports.</p>
          <p>PlayOn powers game day across ticketing, streaming, scores, stats, and stories.</p>
        </div>
      </div>
    </footer>
  );
}

function GraystoneNfhsFooter() {
  const footerGroups = [
    {
      title: "About Us",
      links: ["PlayOn! Sports", "NFHS.org", "High School Support Program", "Help & Customer Support"],
    },
    {
      title: "Browse",
      links: ["Ways to Watch", "Find Your School", "Search Sport, State, or Association", "Buy Tickets to Live Events", "Buy Digital Copies of Events"],
    },
    {
      title: "Join the Network",
      links: ["Become a Network School", "Automated Production", "VidSwap Coaching Tools", "Media Partners"],
    },
  ];
  const popularSports = [
    ["Basketball", "Football", "Wrestling"],
    ["Volleyball", "Soccer", "Cheerleading & Dance"],
    ["Ice Hockey", "Baseball"],
  ];
  const legalLinks = ["California Privacy Rights", "Privacy Policy", "Terms of Use"];

  return (
    <footer className="graystone-nfhs-footer" aria-label="NFHS Network footer">
      <div className="graystone-nfhs-footer__inner">
        <div className="graystone-nfhs-footer__top">
          <div className="graystone-nfhs-footer__brand">
            <GraystoneNfhsWordmark />

            <div className="graystone-nfhs-footer__social" aria-label="Social links">
              <button type="button" aria-label="Facebook">
                <GraystoneIconFacebook />
              </button>
              <button type="button" aria-label="Instagram">
                <GraystoneIconInstagram />
              </button>
              <button type="button" aria-label="X">
                <GraystoneIconX />
              </button>
              <button type="button" aria-label="YouTube">
                <GraystoneIconYoutube />
              </button>
            </div>
          </div>

          <nav className="graystone-nfhs-footer__columns" aria-label="NFHS footer links">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <strong>{group.title}</strong>
                {group.links.map((link) => (
                  <button key={link} type="button">
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="graystone-nfhs-footer__popular">
          <nav className="graystone-nfhs-footer__popular-tabs" aria-label="Popular browse groups">
            {["Popular Sports", "Popular States", "Popular Associations"].map((label) => (
              <button key={label} type="button">
                {label}
              </button>
            ))}
          </nav>
          <div className="graystone-nfhs-footer__sports">
            {popularSports.map((column) => (
              <div key={column.join("-")}>
                {column.map((sport) => (
                  <button key={sport} type="button">
                    {sport}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="graystone-nfhs-footer__bottom">
          <div className="graystone-nfhs-footer__legal">
            <p>© 2026 NFHS Network LLC</p>
            <nav aria-label="Legal links">
              {legalLinks.map((link) => (
                <button key={link} type="button">
                  {link}
                </button>
              ))}
            </nav>
          </div>

          <div className="graystone-nfhs-footer__products">
            <span>A Product of</span>
            <div>
              <GraystonePlayOnWordmark wordFill="#ffffff" />
              <GraystoneMaxPrepsWordmark fill="#ffffff" />
              <GraystoneGofanWordmark />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GraystoneNfhsHomePage() {
  const baseUrl = import.meta.env.BASE_URL;
  const networkRows = [
    {
      title: "Games near you",
      events: [
        {
          sport: "Varsity Boys Baseball",
          matchup: "Eldorado vs Rio Grande",
          time: "Today · 10:00 AM MDT",
          location: "Albuquerque, NM",
          status: "Live",
          duration: "Live",
          image: "nfhs-event-1.png",
          teams: ["EL", "RG"],
          icon: faBaseball,
        },
        {
          sport: "Girls Soccer",
          matchup: "Acalanes vs Las Lomas",
          time: "Today · 4:30 PM PDT",
          location: "Walnut Creek, CA",
          status: "Upcoming",
          duration: "4:30 PM",
          image: "nfhs-event-2.png",
          teams: ["AC", "LL"],
          icon: faFootball,
        },
        {
          sport: "Track & Field",
          matchup: "NMAA Outdoor Championship",
          time: "Tomorrow · 8:00 AM MDT",
          location: "Albuquerque, NM",
          status: "Upcoming",
          duration: "8:00 AM",
          image: "nfhs-event-3.png",
          teams: ["NM", "TF"],
          icon: faChartLine,
        },
      ],
    },
    {
      title: "Top matchups",
      events: [
        {
          sport: "Varsity Football",
          matchup: "Mater Dei vs St. John Bosco",
          time: "Friday · 8:00 PM PDT",
          location: "Santa Ana, CA",
          status: "Upcoming",
          duration: "8:00 PM",
          image: "nfhs-event-4.png",
          teams: ["MD", "SJB"],
          icon: faFootball,
        },
        {
          sport: "Boys Basketball",
          matchup: "Campbell Hall vs Sierra Canyon",
          time: "Saturday · 6:00 PM PDT",
          location: "Studio City, CA",
          status: "Upcoming",
          duration: "6:00 PM",
          image: "nfhs-event-5.png",
          teams: ["CH", "SC"],
          icon: faBasketball,
        },
        {
          sport: "Softball",
          matchup: "Aledo vs Barbers Hill",
          time: "Today · 7:00 PM CDT",
          location: "Austin, TX",
          status: "Live",
          duration: "Live",
          image: "nfhs-event-6.png",
          teams: ["AL", "BH"],
          icon: faBaseball,
        },
      ],
    },
    {
      title: "Live and upcoming",
      events: [
        {
          sport: "Track & Field",
          matchup: "2026 NMAA Outdoor Championship",
          time: "Live now",
          location: "Albuquerque, NM",
          status: "Live",
          duration: "Live",
          image: "nfhs-event-3.png",
          teams: ["NM", "TF"],
          icon: faChartLine,
        },
        {
          sport: "Varsity Boys Volleyball",
          matchup: "Mira Costa vs Loyola",
          time: "Today · 5:30 PM PDT",
          location: "Manhattan Beach, CA",
          status: "Upcoming",
          duration: "5:30 PM",
          image: "nfhs-event-1.png",
          teams: ["MC", "LY"],
          icon: faVolleyball,
        },
        {
          sport: "Girls Lacrosse",
          matchup: "Valor Christian vs Cherry Creek",
          time: "Tomorrow · 6:00 PM MDT",
          location: "Highlands Ranch, CO",
          status: "Upcoming",
          duration: "6:00 PM",
          image: "nfhs-event-2.png",
          teams: ["VC", "CC"],
          icon: faChartLine,
        },
      ],
    },
  ];
  const browseSports = [
    ["Football", faFootball],
    ["Basketball", faBasketball],
    ["Baseball", faBaseball],
    ["Softball", faBaseball],
    ["Volleyball", faVolleyball],
    ["Track & Field", faChartLine],
    ["Soccer", faFootball],
    ["Lacrosse", faChartLine],
    ["Wrestling", faPeopleGroup],
    ["Swimming", faChartLine],
    ["Cheer", faPeopleGroup],
    ["More events", faCalendarDay],
  ];
  const states = ["California", "Texas", "Florida", "Georgia", "New York", "Ohio", "Colorado", "Arizona"];

  return (
    <section className="graystone-page graystone-nfhs-homepage" aria-label="NFHS Network homepage">
      <section className="graystone-nfhs-hero">
        <div className="graystone-nfhs-hero__copy">
          <span className="graystone-nfhs-kicker">Live and on demand high school sports</span>
          <h1>Your front row seat on game day</h1>
          <p>Unlimited streaming and on-demand high school sports for the players and teams that matter the most.</p>

          <div className="graystone-nfhs-search" role="search">
            <GraystoneIconSearch />
            <input type="search" placeholder="Search by school, team, or event" />
          </div>

          <div className="graystone-nfhs-hero__actions">
            <button type="button">Subscribe to watch</button>
            <button type="button">Browse schools</button>
          </div>
        </div>

        <div className="graystone-nfhs-hero__media">
          <img src={`${baseUrl}thumbnail-7.png`} alt="NFHS Network livestream preview" />
          <div className="graystone-nfhs-player__controls" aria-hidden="true">
            <span className="graystone-nfhs-player__time">00:00</span>
            <span className="graystone-nfhs-player__track">
              <i />
            </span>
            <span className="graystone-nfhs-player__time">Live</span>
          </div>
        </div>
      </section>

      <section className="graystone-nfhs-section graystone-nfhs-network">
        <div className="graystone-nfhs-network__rows">
          {networkRows.map((row) => (
            <div key={row.title} className="graystone-nfhs-network-row">
              <div className="graystone-nfhs-network-row__header">
                <h3>{row.title}</h3>
                <button type="button">
                  View all
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
              <div className="graystone-nfhs-live__grid">
                {row.events.map((event) => (
                  <article key={`${row.title}-${event.matchup}`} className="graystone-nfhs-event-card">
                    <div className="graystone-nfhs-event-card__thumb">
                      <img src={`${baseUrl}${event.image}`} alt="" />
                      <div className="graystone-nfhs-event-card__sport-banner">
                        <FontAwesomeIcon icon={event.icon} />
                        <span>{event.sport}</span>
                      </div>
                      <div className="graystone-nfhs-event-card__thumb-footer">
                        {event.status !== "Live" ? (
                          <span className="graystone-nfhs-event-card__tag">{event.status}</span>
                        ) : null}
                        <span className="graystone-nfhs-event-card__duration">{event.duration}</span>
                      </div>
                    </div>
                    <div className="graystone-nfhs-event-card__body">
                      <div className="graystone-nfhs-event-card__matchup">
                        <strong>{event.matchup}</strong>
                      </div>
                      <p>
                        <FontAwesomeIcon icon={faCalendarDay} />
                        {event.time}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} />
                        {event.location}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="graystone-nfhs-section graystone-nfhs-browse">
        <div className="graystone-nfhs-section__header">
          <div>
            <span className="graystone-nfhs-kicker">Browse</span>
            <h2>Find games by sport</h2>
          </div>
        </div>
        <div className="graystone-nfhs-browse__grid">
          {browseSports.map(([sport, icon]) => (
            <button key={sport} type="button">
              <FontAwesomeIcon icon={icon} />
              <span>{sport}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="graystone-nfhs-section graystone-nfhs-states">
        <div>
          <span className="graystone-nfhs-kicker">State associations</span>
          <h2>Every postseason run has a home.</h2>
          <p>
            Follow championship coverage, live schedules, and replay libraries from partner state associations.
          </p>
        </div>
        <div className="graystone-nfhs-states__list">
          {states.map((state) => (
            <button key={state} type="button">
              {state}
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ))}
        </div>
      </section>

      <GraystoneNfhsFooter />
    </section>
  );
}

function GraystonePlayOnHomePage() {
  const baseUrl = import.meta.env.BASE_URL;
  const metrics = [
    ["27K+", "schools and districts"],
    ["2.5M+", "events powered yearly"],
    ["18M+", "fans connected"],
    ["4", "trusted ecosystem brands"],
  ];
  const ecosystem = [
    {
      brand: "GoFan",
      logo: <GraystoneGofanWordmark />,
      detail: "Digital ticketing and event access for schools and fans.",
      stats: [
        ["750K", "Events each year"],
        ["7,500", "Schools ticketing"],
        ["40", "Postseason partnerships"],
      ],
    },
    {
      brand: "NFHS Network",
      logo: <GraystoneNfhsWordmark />,
      detail: "Live and on-demand streaming for school communities.",
      stats: [
        ["600K", "Events each year"],
        ["8,500", "Schools broadcasting"],
        ["46", "Postseason partnerships"],
      ],
    },
    {
      brand: "MaxPreps",
      logo: <GraystoneMaxPrepsWordmark />,
      detail: "Scores, stats, rankings, rosters, stories, and athletes.",
      stats: [
        ["50M", "Visitors each year"],
        ["525K", "Teams covered"],
        ["2.5M", "Student athletes"],
      ],
    },
  ];
  const timeline = [
    ["Before the game", "Publish events, manage tickets, promote matchups, and set streaming coverage."],
    ["Game night", "Scan tickets, capture highlights, stream live, and keep fans connected."],
    ["After the buzzer", "Surface scores, stats, stories, replays, and community moments."],
  ];

  return (
    <section className="graystone-page graystone-playon-homepage" aria-label="PlayOn home page">
      <section className="graystone-playon-hero">
        <div className="graystone-playon-hero__copy">
          <span className="graystone-playon-kicker">Connected. Seamless. Powerful.</span>
          <h1>
            One event.
            <span>More impact.</span>
          </h1>
          <p>
            PlayOn brings the full high school event ecosystem together, from school operations to ticketing,
            streaming, scores, stories, and fan experiences.
          </p>
          <div className="graystone-playon-hero__actions">
            <button type="button" className="graystone-playon-audience-cta graystone-playon-audience-cta--school">
              <i aria-hidden="true">
                <FontAwesomeIcon icon={faBuildingColumns} />
              </i>
              <span>
                <strong>Schools & Organizations</strong>
                <small>Manage ticketing, streaming, and stats for your programs</small>
              </span>
              <b>Grow your school</b>
            </button>
            <button type="button" className="graystone-playon-audience-cta graystone-playon-audience-cta--fan">
              <i aria-hidden="true">
                <FontAwesomeIcon icon={faPeopleGroup} />
              </i>
              <span>
                <strong>Fans & Families</strong>
                <small>Buy tickets, watch games, and follow your favorite teams</small>
              </span>
              <b>Find your school</b>
            </button>
          </div>
        </div>

        <div className="graystone-playon-hero__visual" aria-hidden="true">
          <div className="graystone-playon-hero__image">
            <img src={`${baseUrl}playon-hero.png`} alt="" />
          </div>
        </div>
      </section>

      <section className="graystone-playon-metrics" aria-label="PlayOn scale">
        {metrics.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="graystone-playon-story" aria-label="Every game has a story">
        <div className="graystone-playon-story__media">
          <img src={`${baseUrl}image-2.jpg`} alt="" />
          <img src={`${baseUrl}image-4.jpg`} alt="" />
          <img src={`${baseUrl}image-5.jpg`} alt="" />
        </div>
        <div className="graystone-playon-story__copy">
          <span className="graystone-playon-kicker">Every game has a story.</span>
          <h2>From the first ticket scanned to the final highlight shared.</h2>
          <p>
            The best school experiences do not live in one product. PlayOn connects the operational, fan,
            media, and athlete layers so every game can become a larger community moment.
          </p>
        </div>
      </section>

      <section className="graystone-playon-ecosystem" aria-label="PlayOn ecosystem">
        <div className="graystone-playon-section-heading">
          <span className="graystone-playon-kicker">Trusted brands. Proven at scale.</span>
          <h2>One connected ecosystem for the entire event lifecycle.</h2>
        </div>
        <div className="graystone-playon-ecosystem__grid">
          {ecosystem.map((item) => (
            <article key={item.brand} className={`graystone-playon-ecosystem__card graystone-playon-ecosystem__card--${item.brand.toLowerCase().replaceAll(" ", "-")}`}>
              <div className="graystone-playon-ecosystem__intro">
                <div className="graystone-playon-ecosystem__logo">{item.logo}</div>
                <p>{item.detail}</p>
              </div>
              <div className="graystone-playon-ecosystem__stats">
                {item.stats.map(([value, label]) => (
                  <div key={label} className="graystone-playon-ecosystem__stat">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="graystone-playon-timeline" aria-label="Game day flow">
        <div className="graystone-playon-timeline__layout">
          <div className="graystone-playon-timeline__content">
            <div className="graystone-playon-section-heading">
              <span className="graystone-playon-kicker">One game. More impact.</span>
              <h2>Connect the moments before, during, and after the event.</h2>
            </div>
            <div className="graystone-playon-timeline__grid">
              {timeline.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
          <figure className="graystone-playon-timeline__image">
            <img src={`${baseUrl}image-6.jpg`} alt="" />
          </figure>
        </div>
      </section>

      <section className="graystone-playon-quote" aria-label="PlayOn quote">
        <div>
          <img src={`${baseUrl}image-7.png`} alt="" />
          <p>
            "When every product is <em>connected</em>, game day becomes simpler for schools and more <em>meaningful</em> for fans."
          </p>
        </div>
      </section>

      <GraystonePlayOnFooter />
    </section>
  );
}

function GraystonePlayOnHqPage() {
  const baseUrl = import.meta.env.BASE_URL;
  const hqNavItems = [
    { label: "Today", icon: faCalendarDay },
    { label: "Events", icon: faCalendarCheck },
    { label: "Seasons", icon: faFootball },
    { label: "Fan Zone", icon: faPeopleGroup },
    { label: "Financial Hub", icon: faCircleDollarToSlot },
    { label: "Account", icon: faCircleUser },
    { label: "Create", icon: faCalendarPlus },
  ];
  const hqEvents = [
    {
      sport: "Boys Baseball",
      title: "Centennial vs Eastview",
      level: "V / JV / FR",
      location: "Johns Creek, GA",
      datetime: "Mon 12-18-2025 5:00 PM",
      mark: "CE",
      accent: "#b20016",
      icon: faBaseball,
      metrics: [
        ["Tickets sold", "120"],
        ["Ticket sales", "$513"],
      ],
    },
    {
      sport: "Boys Basketball",
      title: "Centennial vs Spartans",
      level: "V / JV / FR",
      location: "Johns Creek, GA",
      datetime: "Mon 12-18-2025 5:00 PM",
      mark: "CS",
      accent: "#ae001a",
      icon: faBasketball,
      metrics: [
        ["Tickets sold", "234"],
        ["Ticket sales", "$678"],
      ],
    },
    {
      sport: "Girls Swimming",
      title: "Centennial vs Eastview",
      level: "V / JV / FR",
      location: "Johns Creek, GA",
      datetime: "Mon 12-18-2025 5:00 PM",
      mark: "CE",
      accent: "#c60024",
      icon: faMobileScreenButton,
      stream: true,
      metrics: [
        ["Live Views", "3,239"],
        ["VOD Views", "1,249"],
      ],
    },
    {
      sport: "Girls Volleyball",
      title: "Centennial vs Milton",
      level: "V / JV / FR",
      location: "Johns Creek, GA",
      datetime: "Mon 12-18-2025 7:00 PM",
      mark: "CM",
      accent: "#b20016",
      icon: faVolleyball,
      metrics: [
        ["Tickets sold", "92"],
        ["Ticket sales", "$426"],
      ],
    },
  ];
  const ticketTypes = [
    ["Adult", "$10.00", "#00aeb8"],
    ["Senior", "$2.00", "#5b7fd6"],
    ["Child", "$5.00", "#7d63d8"],
    ["Student", "$2.00", "#d9704f"],
  ];
  const integrations = [
    ["VNN", "17", "vnn.png"],
    ["Rank One", "12", "rankone.png"],
  ];
  const concessions = [
    ["Sandwich", "$5.00", "#3f6ed8"],
    ["Soda", "$2.00", "#8790aa"],
  ];
  const salesBars = [
    ["Basketball", 94, "#343f73", "20"],
    ["Baseball", 78, "#6792bd", "16"],
    ["Football", 63, "#8790aa", "13"],
    ["Softball", 48, "#9daf9f", "9"],
    ["Wrestling", 25, "#d66a42", "4"],
  ];
  const renderToggle = (label, status = "On") => (
    <span className="graystone-playon-hq__toggle">
      <span className="graystone-playon-hq__toggle-label">{label}</span>
      <span className="graystone-playon-hq__toggle-control">
        <i aria-hidden="true" />
        <em>{status}</em>
      </span>
    </span>
  );

  return (
    <section className="graystone-page graystone-playon-hq" aria-label="PlayOn HQ product page">
      <div className="graystone-playon-hq__shell">
        <aside className="graystone-playon-hq__rail" aria-label="HQ sections">
          <nav>
            {hqNavItems.map((item, index) => (
              <button key={item.label} type="button" className={index === 0 ? "is-active" : ""}>
                <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="graystone-playon-hq__main">
          <section className="graystone-playon-hq__events" aria-label="Events today">
            <div className="graystone-playon-hq__events-toolbar">
              <div className="graystone-playon-hq__events-summary">
                <div className="graystone-playon-hq__events-title">
                  <span className="graystone-playon-hq__school-mark">
                    <img src={`${baseUrl}mascot-6.svg`} alt="Centennial" />
                  </span>
                  <div>
                    <h1>Dec-18-2025</h1>
                  </div>
                </div>
                <div className="graystone-playon-hq__events-meta" aria-label="Event totals">
                  <span className="graystone-playon-hq__events-count">7 Events Today</span>
                  <span><FontAwesomeIcon icon={faTicketSimple} aria-hidden="true" />5 Ticketed Events</span>
                  <span><FontAwesomeIcon icon={faVideo} aria-hidden="true" />2 Streaming Events</span>
                </div>
              </div>
              <div className="graystone-playon-hq__filter-stack" aria-label="Event filters">
                <button type="button" className="graystone-playon-hq__icon-button" aria-label="Filter events">
                  <FontAwesomeIcon icon={faSliders} aria-hidden="true" />
                </button>
                <button type="button" className="graystone-playon-hq__icon-button" aria-label="View options">
                  <FontAwesomeIcon icon={faTableCellsLarge} aria-hidden="true" />
                </button>
                <button type="button" className="graystone-playon-hq__date-select">
                  Today <GraystoneIconChevron aria-hidden="true" />
                </button>
                <label className="graystone-playon-hq__search">
                  <GraystoneIconSearch aria-hidden="true" />
                  <input type="search" placeholder="Search team, sport or date" />
                </label>
              </div>
            </div>
            <div className="graystone-playon-hq__event-grid">
              {hqEvents.map((event) => (
                <article key={event.title} className="graystone-playon-hq__event-card">
                  <header>
                    <FontAwesomeIcon icon={event.icon} />
                    <strong>{event.sport}</strong>
                    {event.stream ? (
                      <span className="graystone-playon-hq__stream-badge" aria-label="NFHS Network stream">
                        <i aria-hidden="true" />
                        <FontAwesomeIcon icon={faVideo} aria-hidden="true" />
                        <GraystoneNfhsWordmark />
                      </span>
                    ) : null}
                  </header>
                  <div className="graystone-playon-hq__event-body">
                    <span className="graystone-playon-hq__team-tile" style={{ "--event-accent": event.accent }}>
                      {event.mark}
                    </span>
                    <div>
                      <h3>{event.title}</h3>
                      <p>{event.level}</p>
                      <small><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />{event.location}</small>
                      <small><FontAwesomeIcon icon={faCalendarDay} aria-hidden="true" />{event.datetime}</small>
                    </div>
                  </div>
                  <div className="graystone-playon-hq__metric-pair">
                    {event.metrics.map(([label, value]) => (
                      <span key={label}>
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </span>
                    ))}
                  </div>
                  <footer>
                    <button type="button">
                      <FontAwesomeIcon icon={faChartLine} aria-hidden="true" />
                      View
                    </button>
                    <button type="button">
                      <FontAwesomeIcon icon={faPen} aria-hidden="true" />
                      Edit
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <section className="graystone-playon-hq__panel graystone-playon-hq__tickets" aria-label="Ticket setup">
            <div className="graystone-playon-hq__panel-header">
              <div>
                <span className="graystone-playon-hq__label">Tickets</span>
                <h2>Today’s Event Tickets</h2>
              </div>
            </div>
            <div className="graystone-playon-hq__ticket-layout">
              <div className="graystone-playon-hq__ticket-event">
                <span className="graystone-playon-hq__team-tile" style={{ "--event-accent": "#b20016" }}>
                  CE
                </span>
                <div>
                  <strong>Centennial vs Eastview</strong>
                  <p>Boys Baseball</p>
                  <p>V / JV / FR</p>
                  <small><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />Johns Creek, GA</small>
                  <small><FontAwesomeIcon icon={faCalendarDay} aria-hidden="true" />Mon 12-18-2025 5:00 PM</small>
                  <button type="button">
                    <FontAwesomeIcon icon={faPen} aria-hidden="true" />
                    Edit Tickets
                  </button>
                </div>
              </div>
              <div className="graystone-playon-hq__ticket-list">
                {ticketTypes.map(([type, price, color]) => (
                  <div key={type} className="graystone-playon-hq__ticket-row">
                    <span style={{ "--ticket-accent": color }}>
                      <strong>{type}</strong>
                      <em>{price}</em>
                    </span>
                    {renderToggle("On Sale", "On Sale")}
                    {renderToggle("Box Office")}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="graystone-playon-hq__ops-grid">
            <section className="graystone-playon-hq__panel graystone-playon-hq__integrations" aria-label="Event integrations">
              <div className="graystone-playon-hq__panel-header">
                <div>
                  <span className="graystone-playon-hq__label">Event integrations</span>
                  <h2>Event Integrations</h2>
                  <p>Publish events from partners with one click.</p>
                </div>
              </div>
              <div className="graystone-playon-hq__mini-list">
                {integrations.map(([name, value, logo]) => (
                  <button key={name} type="button">
                    <span className="graystone-playon-hq__partner-logo">
                      <img src={`${baseUrl}${logo}`} alt={name} />
                    </span>
                    <small>New</small>
                    <strong>{value}</strong>
                    <em>Publish <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /></em>
                  </button>
                ))}
              </div>
            </section>

            <section className="graystone-playon-hq__panel graystone-playon-hq__concessions" aria-label="Concessions">
              <div className="graystone-playon-hq__panel-header">
                <div>
                  <span className="graystone-playon-hq__label">Concessions</span>
                  <h2>Concessions</h2>
                  <p>Get ready for your concession tonight.</p>
                </div>
              </div>
              <div className="graystone-playon-hq__concession-layout">
                <div className="graystone-playon-hq__concession-list">
                  {concessions.map(([item, price, color]) => (
                    <div key={item}>
                      <span style={{ "--ticket-accent": color }}>
                        <strong>{item}</strong>
                        <em>{price}</em>
                      </span>
                      {renderToggle("On Sale", "On Sale")}
                      {renderToggle("Box Office")}
                    </div>
                  ))}
                </div>
                <aside>
                  <strong>Varsity Boys Concession</strong>
                  <p>V / JV / FR</p>
                  <small>Johns Creek, GA</small>
                  <small>Thur 11-09-2024 5:00 PM</small>
                  <button type="button">
                    <FontAwesomeIcon icon={faPen} aria-hidden="true" />
                    Edit concession
                  </button>
                </aside>
              </div>
            </section>
          </div>

          <section className="graystone-playon-hq__panel graystone-playon-hq__reports" aria-label="Sales reports">
            <div className="graystone-playon-hq__panel-header">
              <div>
                <span className="graystone-playon-hq__label">Sales reports</span>
                <h2>Generated Sales Reports</h2>
              </div>
            </div>
            <div className="graystone-playon-hq__report-layout">
              <label>
                <span>Report type</span>
                <select defaultValue="Weekly Payment Statement">
                  <option>Weekly Payment Statement</option>
                  <option>Daily Sales Summary</option>
                  <option>Event Payout Report</option>
                </select>
              </label>
              <label>
                <span>Transaction period end date</span>
                <select defaultValue="Mon-Sep-1-2023">
                  <option>Mon-Sep-1-2023</option>
                  <option>Tue-Sep-5-2023</option>
                  <option>Fri-Sep-8-2023</option>
                </select>
              </label>
              <div className="graystone-playon-hq__report-metrics">
                <article>
                  <strong>$5,620.00</strong>
                  <span>For this selected period</span>
                </article>
                <article>
                  <strong>7</strong>
                  <span>Events Paid Out</span>
                </article>
              </div>
            </div>
          </section>

          <section className="graystone-playon-hq__panel graystone-playon-hq__activity" aria-label="Ticket sales by activity">
            <div className="graystone-playon-hq__panel-header">
              <div>
                <span className="graystone-playon-hq__label">Sales activity</span>
                <h2>Ticket Sales By Activity</h2>
              </div>
            </div>
            <div className="graystone-playon-hq__activity-layout">
              <div className="graystone-playon-hq__chart" aria-label="Ticket sales chart">
                {salesBars.map(([label, value, color, total]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <div>
                      <i style={{ width: `${value}%`, background: color }} />
                    </div>
                    <strong>{total}</strong>
                  </div>
                ))}
              </div>
              <div className="graystone-playon-hq__activity-stats">
                <article>
                  <span>Tickets Sold</span>
                  <strong>123</strong>
                </article>
                <article>
                  <span>Ticket sales</span>
                  <strong>$782</strong>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
      <GraystonePlayOnFooter />
    </section>
  );
}

function GraystoneMaxPrepsWordmark({ fill = "#E10500" }) {
  return (
    <svg width="88" height="25" viewBox="0 0 88 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M37.2423 0H32.4796L31.3496 3.94623C32.3062 4.24984 33.0013 5.16412 33.0013 6.24745C33.0013 7.57842 31.952 8.6564 30.6578 8.6564C29.3635 8.6564 28.3143 7.57698 28.3143 6.246C28.3143 5.15377 29.0211 4.23523 29.99 3.93944L28.8502 0H24.0732L27.8891 11.8578L23.6859 24.7059H28.5633L30.6721 17.989L32.7665 24.7059H37.6296L33.4552 11.8793L37.2423 0Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M28.9901 6.2933C28.9901 7.26982 29.746 8.06143 30.6783 8.06143C31.6107 8.06143 32.3665 7.26982 32.3665 6.2933C32.3665 5.31687 31.6107 4.52518 30.6783 4.52518C29.746 4.52518 28.9901 5.31687 28.9901 6.2933Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M87.3761 8.57489L87.9929 6.4057L86.2571 4.83929H80.519L77.9941 6.40578L76.7461 10.6372L81.8719 12.1493L81.4297 13.6689H80.4128L80.8075 12.3105H76.2727L75.5267 14.8773L77.3881 16.6404H82.8465L85.4968 14.9831L86.8453 10.3474L81.8071 8.87612L82.1256 7.81079H83.1441L82.9214 8.57489H87.3761Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M71.669 10.1031H70.62L71.3032 7.81079H72.3145L71.669 10.1031ZM77.21 6.43456L75.4562 4.83929H67.6774L64.256 16.6404H68.721L69.7754 12.9897H73.1323L75.7683 11.4213L77.21 6.43456Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M60.2585 13.0746L60.5767 11.9709H64.0011L64.9123 8.91449H61.4995L61.8124 7.81079H66.0313L66.8502 4.83929H58.1138L54.6816 16.6404H63.4072L64.4389 13.0746H60.2585Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M51.5073 9.42389H50.4306L50.8992 7.81079H51.974L51.5073 9.42389ZM54.0695 10.6001L55.9344 9.46558L56.7809 6.47642L55.0499 4.83929H47.2176L43.7946 16.6404H48.325L49.6881 11.9709H50.768L49.4109 16.6404H53.8436L55.2746 11.7072L54.0695 10.6001Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M40.4557 10.0803C40.4557 10.0803 39.3941 10.0973 39.3923 10.0973L40.0541 7.81079H41.1156L40.4557 10.0803ZM45.9572 6.44025L44.248 4.83929H36.6296L34.3707 11.8435L35.962 16.6404H37.4682L38.5549 12.9897H41.8472L44.5154 11.4482L45.9572 6.44025Z" fill={fill}/>
      <mask id="graystone-maxpreps-wordmark-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="4" width="27" height="13">
        <path d="M0 4.83929H26.9243V16.6404H0V4.83929Z" fill="white"/>
      </mask>
      <g mask="url(#graystone-maxpreps-wordmark-mask)">
        <path fillRule="evenodd" clipRule="evenodd" d="M20.9422 11.8873L22.7307 7.81079H23.0701L22.5883 11.8947L20.9422 11.8873ZM25.4179 16.6404L26.9242 11.8677L24.7285 4.83929H20.609L15.1 15.925L18.1682 4.83929H12.0824L8.82743 11.3845L9.34134 4.83929H3.27766L-0.000152588 16.6404H3.71681L5.75031 9.40691L5.56744 16.6404H9.30078L13.1526 9.40691L11.0868 16.6404H19.2077L20.0205 14.7346L22.2065 14.7378L21.9535 16.6404H25.4179Z" fill={fill}/>
      </g>
    </svg>
  );
}

function GraystonePlayOnWordmark({ wordFill = "black", arrowFill = "#00C9D2" } = {}) {
  return (
    <svg width="346" height="103" viewBox="0 0 346 103" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#graystone-playon-brandmark-clip)">
        <path d="M330.8 26.2C324 26.2 318.1 29 312.8 34.6C313.1 31.4 312.9 29.3 312.9 27.8H293.6C293.6 31.9 293 35.6 291.8 42.9L290.8 48.8C290.6 36.3 280.8 26 265.4 26C257.5 26 249.9 28.9 244.1 33.8L247.6 27.8H228L213.6 55.9L209.1 27.8H177.8L173.9 31.6C171.9 28.8 166.8 26.3 161.5 26.3C148.1 26.3 138.5 34.6 134.7 46.3L142 0H121.9L114 49.6C115 37.4 108.3 26.3 95.5 26.3C88.9 26.2 84 28.3 79.9 33.6C79.9 31.2 79.8 29.3 79.5 27.7H61.7C61.7 31.8 61.4 35.2 60.2 42.5L49.4 102.6H69.5L74.7 73.7C78.2 75.9 83.4 76.9 85.9 76.9C99.9 76.9 109.9 67.8 113.2 55.2L109.6 75.4H129.7L133.3 55.3C133 66.8 139.7 76.9 151.9 76.9C158.6 76.9 163.5 74.8 167.7 69.5C167.7 71.9 167.8 73.8 168.1 75.4H185.8C185.8 71.3 186.1 67.9 187.3 60.6L191.6 36L200.7 75.4L184.4 102.6H204L235.1 49.3C235.1 49.5 235 49.6 235 49.8C232.5 64.3 242.8 77.2 260 77.2C272.5 77.2 284.8 69.8 289.2 57.9L286.1 75.3H306.2L310.1 53.5C311.5 45.4 316.1 42 319.7 42C322.8 42 325.3 44 324.4 48.4L319.7 75.2H339.9L345.1 44.9C347 33.2 340.5 26.2 330.8 26.2ZM93.7 51.6C92.4 58.7 88.7 63.2 83.8 63.2C78.9 63.2 76.5 58.7 77.9 51.6C79.3 44.3 82.9 40 87.8 40C92.7 40 94.9 44.3 93.7 51.6ZM169.6 51.6C168.2 58.9 164.6 63.2 159.7 63.2C154.8 63.2 152.6 58.9 153.8 51.6C155.1 44.5 158.8 40 163.7 40C168.6 40 171 44.5 169.6 51.6ZM270.5 51.9C268.8 61.4 264.5 63.5 261 63.5C256.8 63.5 253.2 60.7 254.9 51.2C256.6 41.7 260.8 39.6 264.4 39.6C268.5 39.6 272.2 42.5 270.5 51.9Z" fill={wordFill}/>
        <path d="M31.7 47.1L46.1 58.8L55.6 0.0999756L0 21.3L14.4 33L35.3 25L31.7 47.1Z" fill={arrowFill}/>
      </g>
      <defs>
        <clipPath id="graystone-playon-brandmark-clip">
          <rect width="345.43" height="102.6" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function GraystoneNfhsWordmark() {
  return (
    <svg width="229" height="110" viewBox="0 0 229 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M210.375 15.7992C210.375 14.482 209.998 14.1057 208.68 14.1057H196.359C195.041 14.1057 194.664 14.482 194.664 15.7992V20.8725C194.664 21.9037 194.951 22.1897 196.638 22.6564L215.443 27.3532C224.662 29.7017 228.985 31.4856 228.985 40.8868V53.0129C228.985 61.6614 224.85 65.7938 216.197 65.7938H189.581C180.927 65.7938 176.792 61.6614 176.792 53.0129V43.988H194.476V50.0021C194.476 51.3193 194.853 51.6956 196.171 51.6956H209.622C210.94 51.6956 211.316 51.3193 211.316 50.0021V44.2665C211.316 43.2353 210.849 42.9492 209.343 42.5729L190.537 37.7782C181.319 35.4297 176.996 33.6458 176.996 24.2446V12.7809C176.988 4.13987 181.13 0 189.784 0H215.27C223.924 0 228.059 4.13234 228.059 12.7809V21.1434H210.375V15.7842V15.7992Z" fill="black"/>
      <path d="M5.24186 65.8013H0V51.3193H5.24186V14.4895H0V0H5.24186H20.9147H22.3608L53.9701 40.232V14.4895H48.7282V0H53.9701H69.6429H70.9986H99.6179V14.4895H71.089V25.479H93.5627V39.9685H71.089V65.8013H70.9986H53.9701L22.3608 25.5693V65.8013H11.9523H5.24186Z" fill="black"/>
      <path d="M128.478 65.8013H132.236V51.3193H128.478V38.6588H148.655V51.3193H144.189V65.8013H148.655H165.766H169.645V51.3193H165.766V14.4895H169.645V0H165.766H148.655H144.189V14.4895H148.655V25.3962H128.478V14.4895H132.236V0H128.478H111.367H106.773V14.4895H111.367V51.3193H106.773V65.8013H111.367H128.478Z" fill="black"/>
      <path d="M0.391632 109.172V79.3951H8.13392L22.4361 97.603V79.3951H30.1407V109.172H22.4361L8.13392 90.9642V109.172H0.391632Z" fill="black"/>
      <path d="M54.1282 85.9512H44.9249V90.9265H53.6161V97.4826H44.9249V102.616H54.1282V109.172H37.175V79.3951H54.1282V85.9512Z" fill="black"/>
      <path d="M73.3635 85.9512V109.172H65.6212V85.9512H59.2571V79.3951H79.7275V85.9512H73.3635Z" fill="black"/>
      <path d="M92.1769 79.3951L97.3133 98.6267L103.632 79.3951H109.8L116.119 98.6267L121.256 79.3951H129.352L120.465 109.172H112.564L106.72 91.9126L100.876 109.172H92.9752L84.0882 79.3951H92.1844H92.1769Z" fill="black"/>
      <path d="M132.078 94.2835C132.078 92.0705 132.485 90.0156 133.306 88.1038C134.119 86.1919 135.257 84.5284 136.703 83.1058C138.149 81.6832 139.881 80.5692 141.899 79.7713C143.918 78.966 146.132 78.567 148.557 78.567C150.982 78.567 153.166 78.966 155.192 79.7713C157.218 80.5767 158.965 81.6832 160.427 83.1058C161.888 84.5284 163.025 86.1919 163.846 88.1038C164.659 90.0156 165.066 92.0705 165.066 94.2835C165.066 96.4964 164.659 98.5588 163.846 100.463C163.032 102.375 161.888 104.038 160.427 105.461C158.965 106.884 157.218 107.998 155.192 108.796C153.166 109.601 150.952 110 148.557 110C146.162 110 143.918 109.601 141.899 108.796C139.888 107.99 138.149 106.884 136.703 105.461C135.257 104.038 134.119 102.375 133.306 100.463C132.493 98.5588 132.078 96.4964 132.078 94.2835ZM140.175 94.2835C140.175 95.4652 140.401 96.5641 140.845 97.5652C141.289 98.5663 141.899 99.4319 142.66 100.17C143.421 100.907 144.309 101.479 145.326 101.886C146.343 102.292 147.412 102.495 148.55 102.495C149.687 102.495 150.756 102.292 151.773 101.886C152.79 101.479 153.686 100.907 154.462 100.17C155.237 99.4319 155.847 98.5663 156.299 97.5652C156.744 96.5641 156.97 95.4727 156.97 94.2835C156.97 93.0942 156.744 92.0103 156.299 91.0092C155.847 90.0081 155.237 89.1425 154.462 88.4048C153.686 87.6672 152.79 87.0951 151.773 86.6887C150.756 86.2822 149.687 86.079 148.55 86.079C147.412 86.079 146.343 86.2822 145.326 86.6887C144.309 87.0951 143.421 87.6672 142.66 88.4048C141.892 89.1425 141.289 90.0081 140.845 91.0092C140.393 92.0103 140.175 93.1017 140.175 94.2835Z" fill="black"/>
      <path d="M196.321 109.172H186.681L179.293 97.7235V109.172H171.55V79.3951H183.601C185.258 79.3951 186.711 79.636 187.946 80.1253C189.181 80.6145 190.206 81.2769 191.012 82.1199C191.817 82.9629 192.42 83.9339 192.827 85.0404C193.233 86.1469 193.437 87.3286 193.437 88.5932C193.437 90.8588 192.887 92.6954 191.795 94.103C190.703 95.5105 189.091 96.4664 186.952 96.9632L196.314 109.165L196.321 109.172ZM179.293 92.7029H180.754C182.283 92.7029 183.458 92.3868 184.271 91.7545C185.084 91.1223 185.491 90.2115 185.491 89.0297C185.491 87.848 185.084 86.9372 184.271 86.305C183.458 85.6727 182.283 85.3565 180.754 85.3565H179.293V92.7029Z" fill="black"/>
      <path d="M208.891 91.6793L218.336 79.3951H227.893L216.084 93.4933L229 109.172H218.961L208.884 96.2557V109.172H201.141V79.3951H208.884V91.6793H208.891Z" fill="black"/>
    </svg>
  );
}

function GraystoneGofanWordmark() {
  return (
    <svg width="358" height="65" viewBox="0 0 358 65" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M201.733 1.60211H231.91C236.147 1.60211 238.781 2.51761 239.755 4.29137L262.258 48.8072L265.293 54.7579V48.0634V16.7077V15.1056H263.69H258.422V1.77377H282.586C286.48 1.77377 289.171 3.31866 290.775 6.46567L290.832 6.58011L290.889 6.69454L314.996 38.3363L317.86 42.1127V37.3636V16.7077V15.1056H316.256H310.072V1.77377H343.971V15.1056H337.558H335.954V16.7077L335.897 63.3979H319.692C315.684 63.3979 313.05 62.368 311.847 60.3081L311.79 60.2509L311.733 60.1937L286.366 27.007L283.503 23.2879V27.9798V48.4067V50.0088H285.106H291.29V63.4551H271.821H256.761H238.266V49.7799H242.217H244.679L243.648 47.5484L241.243 42.2271L240.843 41.3116H239.812H217.251H216.22L215.819 42.2271L213.357 47.5484L212.326 49.7799H214.789H218.74V63.4551H187.303V49.7227H193.315H194.232L194.69 48.9217L213.013 17.3371L214.388 14.934H211.639H201.676H167.204H165.601V16.5361V26.8926V28.4947H167.204H186.158V37.1919H167.204H165.601V38.794V48.235V49.8372H167.204H173.388L173.331 63.5123H139.833V49.8372H146.017H147.621V48.235V16.5933V14.9912H146.017H139.833V1.65933H201.733M237.292 33.6444L236.262 31.4129L230.192 18.081L228.76 14.9912L227.272 18.0238L220.801 31.3556L219.713 33.6444H222.29H234.83H237.292ZM201.733 0H138.344V16.4789H146.132V48.1206H138.344V65H174.992L175.049 48.1778H167.261V38.7368H187.818V26.8926H167.204V16.5361H201.676H211.639L193.315 48.1206H185.7V65.0572H220.286V48.1778H214.731L217.194 42.8565H239.755L242.16 48.1778H236.662V65.0572H256.761H271.821H292.893V48.4067H285.106V27.9798L310.473 61.1664C312.019 63.7412 315.054 65.0572 319.692 65.0572H337.5L337.558 16.765H345.517V0.228873H308.469V16.765H316.256V37.4208L292.149 5.77905C290.259 2.05986 287.053 0.228873 282.529 0.171655H256.761V16.7077H263.633V48.0634L241.129 3.54754C239.869 1.20158 236.777 0 231.91 0H201.733ZM234.83 32.0423H222.29L228.76 18.7104L234.83 32.0423Z" fill="black"/>
      <path d="M129.125 4.46303C126.205 1.48768 121.738 0 115.611 0H88.6983C82.8004 0 78.5058 1.31602 75.8717 3.89085C71.8061 6.80898 69.7447 11.8442 69.7447 18.9965V43.5431C77.7614 35.4753 89.0992 30.2685 100.838 27.6937V16.8222L127.865 37.3063L100.895 57.7905V47.0334C89.8436 46.0035 79.1356 48.0634 70.89 54.0141C71.2335 55.044 71.6916 55.9595 72.207 56.7606C73.753 59.1065 74.7837 60.3081 75.1846 60.3081C77.7614 63.3979 82.3995 64.9428 89.0419 64.9428H115.153C118.818 64.9428 121.853 64.485 124.258 63.6268C126.319 62.8829 128.495 61.2236 130.728 58.6488C133.191 55.9595 134.45 51.6681 134.45 45.8891V18.9965C134.508 12.3019 132.733 7.43838 129.125 4.46303Z" fill="black"/>
      <path d="M64.5339 22.2579V17.0511C64.5339 11.6725 62.7588 7.38116 59.1513 4.23415C56.2882 1.37324 52.1081 0 46.5537 0L18.2092 0C13.2847 0 9.61996 0.972711 7.27223 2.91813C2.46225 5.89349 0 11.1576 0 18.7104V46.118C0 52.3548 1.60333 56.9894 4.80998 60.022C7.84485 63.2262 12.3113 64.8283 18.152 64.8283H46.5537C49.6459 64.8283 51.9936 64.5423 53.5969 63.9128C56.1737 62.8829 58.2351 61.5669 59.8957 59.9648C62.4725 57.4472 64.0186 54.1857 64.4194 50.2377C64.4766 49.4938 64.5339 48.6928 64.5339 47.8917V26.5493H37.85V38.3935H43.2326V46.3468C43.2326 47.3195 42.2019 47.9489 40.0832 48.235H24.9088C22.5611 47.7201 21.3586 46.919 21.3586 45.7746V19.1109C21.3586 17.3944 22.5611 16.5361 24.9088 16.5361H39.9114C41.6865 16.5361 42.8317 17.3944 43.2326 19.1109V22.3151L64.5339 22.2579Z" fill="black"/>
      <path d="M358 4.46303C358 6.98063 355.996 8.92606 353.534 8.92606C351.071 8.92606 349.067 6.92342 349.067 4.46303C349.067 2.00264 351.071 0 353.534 0C355.996 0 358 2.00264 358 4.46303ZM349.697 4.46303C349.697 6.58011 351.415 8.23944 353.534 8.23944C355.652 8.23944 357.313 6.58011 357.313 4.46303C357.313 2.34595 355.652 0.68662 353.534 0.68662C351.415 0.68662 349.697 2.34595 349.697 4.46303ZM352.675 7.03785H351.816V1.8882H353.877C354.851 1.8882 355.309 2.51761 355.309 3.14701C355.309 3.77641 354.851 4.23416 354.163 4.34859C354.793 4.40581 355.022 4.63468 355.08 5.66461C355.08 5.89349 355.137 6.69454 355.309 6.98063H354.507C354.278 6.63732 354.335 5.9507 354.278 5.26408C354.221 4.6919 353.763 4.6919 353.534 4.6919H352.675V7.03785ZM352.675 4.0625H353.763C354.278 4.0625 354.507 3.66197 354.507 3.20423C354.507 2.86092 354.335 2.40317 353.763 2.40317H352.675V4.0625Z" fill="black"/>
    </svg>
  );
}

function GraystoneMaxPrepsAdvantageWordmark() {
  return (
    <svg width="304" height="86" viewBox="0 0 304 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M128.666 0H112.211L108.307 13.5769C111.612 14.6215 114.013 17.767 114.013 21.4942C114.013 26.0734 110.389 29.7821 105.917 29.7821C101.446 29.7821 97.8207 26.0684 97.8207 21.4892C97.8207 17.7314 100.263 14.5712 103.61 13.5536L99.6724 0H83.1686L96.3519 40.7965L81.8306 85H98.6812L105.967 61.8908L113.203 85H130.004L115.582 40.8704L128.666 0Z" fill="#E10500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M100.156 21.6519C100.156 25.0116 102.767 27.7351 105.988 27.7351C109.209 27.7351 111.821 25.0116 111.821 21.6519C111.821 18.2925 109.209 15.5687 105.988 15.5687C102.767 15.5687 100.156 18.2925 100.156 21.6519Z" fill="#E10500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M301.869 29.5018L304 22.0387L298.003 16.6495H278.179L269.456 22.039L265.144 36.5971L282.853 41.7996L281.325 47.0275H277.812L279.175 42.354H263.508L260.931 51.185L267.362 57.2509H286.22L295.376 51.5489L300.035 35.6002L282.629 30.5381L283.729 26.8729H287.248L286.479 29.5018H301.869Z" fill="#E10500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M247.604 34.7595H243.979L246.34 26.8729H249.834L247.604 34.7595ZM266.747 22.138L260.688 16.6495H233.813L221.993 57.2509H237.419L241.062 44.6908H252.659L261.766 39.2949L266.747 22.138Z" fill="#E10500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M208.182 44.9829L209.282 41.1856H221.113L224.26 30.6702H212.47L213.551 26.8729H228.126L230.955 16.6495H200.773L188.915 57.2509H219.061L222.625 44.9829H208.182Z" fill="#E10500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M177.948 32.4227H174.229L175.848 26.8729H179.561L177.948 32.4227ZM186.801 36.4694L193.243 32.5662L196.168 22.282L190.188 16.6495H163.128L151.302 57.2509H166.954L171.664 41.1856H175.394L170.706 57.2509H186.02L190.964 40.2784L186.801 36.4694Z" fill="#E10500"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M139.767 34.6809C139.767 34.6809 136.1 34.7396 136.094 34.7396L138.38 26.8729H142.047L139.767 34.6809ZM158.774 22.1576L152.869 16.6495H126.549L118.745 40.7475L124.242 57.2509H129.446L133.2 44.6908H144.575L153.793 39.3875L158.774 22.1576Z" fill="#E10500"/>
      <mask id="graystone-maxpreps-advantage-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="16" width="94" height="42">
        <path d="M0 16.6495H93.0188V57.2509H0V16.6495Z" fill="white"/>
      </mask>
      <g mask="url(#graystone-maxpreps-advantage-mask)">
        <path fillRule="evenodd" clipRule="evenodd" d="M72.3518 40.8982L78.5308 26.8729H79.7035L78.0389 40.9236L72.3518 40.8982ZM87.8148 57.2509L93.0187 40.8304L85.4331 16.6495H71.2008L52.1681 54.7897L62.7684 16.6495H41.743L30.4976 39.1681L32.2731 16.6495H11.3241L-0.00012207 57.2509H12.8413L19.8667 32.3643L19.2349 57.2509H32.1329L45.4402 32.3643L38.3034 57.2509H66.3596L69.1676 50.6939L76.7199 50.705L75.8459 57.2509H87.8148Z" fill="#E10500"/>
      </g>
      <path d="M157.568 85.0147L156.535 60.4615H150.197L140.802 85.0147H146.32L147.994 80.0938H152.093V85.0147H157.56H157.568ZM152.016 75.8552H149.497L151.957 68.9217L152.016 75.8552Z" fill="#414042"/>
      <path d="M176.503 62.4487C175.376 61.1268 173.386 60.4615 170.585 60.4615H163.393L159.217 85.0147H166.553C171.78 85.0147 174.829 82.7461 175.607 78.2602L177.486 67.361C177.827 65.2545 177.503 63.6085 176.512 62.4572L176.503 62.4487ZM168.304 64.6575H169.859C170.815 64.6575 171.422 64.8195 171.703 65.1607C171.977 65.4762 172.028 66.0476 171.874 66.9516L169.918 78.3711C169.645 79.9829 169.107 80.8102 166.946 80.8102H165.537L168.304 64.6575Z" fill="#414042"/>
      <path d="M190.57 60.4615L185.215 75.2071L184.899 60.4615H179.228L180.842 85.0147H186.325L196.301 60.4615H190.57Z" fill="#414042"/>
      <path d="M207.216 85.0147L206.183 60.4615H199.846L190.451 85.0147H195.968L197.651 80.0938H201.75V85.0147H207.216ZM201.665 75.8552H199.145L201.605 68.9217L201.665 75.8552Z" fill="#414042"/>
      <path d="M223.419 60.4615L221.301 72.8447L218.081 60.4615H213.076L208.899 85.0147H214.075L216.287 71.9919L219.823 85.0147H224.418L228.603 60.4615H223.419Z" fill="#414042"/>
      <path d="M230.089 60.4615L229.346 64.8281H234.419L230.986 85.0147H236.606L240.039 64.8281H245.027L245.779 60.4615H230.089Z" fill="#414042"/>
      <path d="M256.779 85.0147L255.746 60.4615H249.409L240.014 85.0147H245.531L247.205 80.0938H251.305V85.0147H256.771H256.779ZM251.228 75.8552H248.708L251.168 68.9217L251.228 75.8552Z" fill="#414042"/>
      <path d="M274.801 62.052C273.699 60.7557 271.846 60.0649 269.429 60.0649C264.902 60.0649 261.443 62.5552 260.819 66.2651L258.624 78.9382C258.317 80.8059 258.667 82.4007 259.641 83.552C260.674 84.7716 262.374 85.4112 264.552 85.4112C266.55 85.4112 268.173 84.8569 269.6 83.6885L269.984 85.0189H272.819L275.006 72.2178H266.747L266.081 76.1238H268.916L268.446 78.87C268.19 80.3112 267.345 81.0106 265.867 81.0106C265.175 81.0106 264.706 80.8656 264.449 80.5671C264.219 80.2942 264.15 79.8422 264.244 79.2452L266.439 66.3162C266.661 65.0284 267.439 64.4059 268.814 64.4059C269.446 64.4059 269.881 64.5423 270.103 64.8152C270.317 65.0711 270.377 65.4975 270.266 66.086L269.711 69.5996H275.211L275.749 66.3248C276.039 64.6276 275.706 63.1522 274.784 62.0691L274.801 62.052Z" fill="#414042"/>
      <path d="M292.6 64.7598L293.352 60.4615H280.139L275.954 85.0147H289.483L290.226 80.6482H282.317L283.376 74.4054H288.97L289.671 70.2436H284.076L285.007 64.7598H292.6Z" fill="#414042"/>
    </svg>
  );
}

function GraystoneBrandLogo({ brandId }) {
  if (brandId === "playon") return <GraystonePlayOnWordmark />;
  if (brandId === "maxpreps") return <GraystoneMaxPrepsWordmark />;
  if (brandId === "nfhs-network") return <GraystoneNfhsWordmark />;
  if (brandId === "gofan") return <GraystoneGofanWordmark />;
  if (brandId === "maxpreps-advantage") return <GraystoneMaxPrepsAdvantageWordmark />;
  return null;
}

function GraystoneBrandSwitcher({ activeBrandId = "maxpreps", onNavigate, onClose }) {
  return (
    <div className="graystone-brand-switcher" role="menu" aria-label="Brand switcher">
      {BRAND_SWITCHER_ITEMS.map((brand) => {
        return (
          <button
            key={brand.id}
            type="button"
            className={`graystone-brand-switcher__item${brand.id === activeBrandId ? " is-active" : ""}`}
            onClick={() => {
              if (brand.id === "maxpreps") {
                onNavigate("graystone-maxpreps-home");
              } else if (brand.id === "playon") {
                onNavigate("graystone-playon-home");
              } else if (brand.id === "nfhs-network") {
                onNavigate("graystone-nfhs-home");
              } else {
                onNavigate("graystone-home");
              }
              onClose();
            }}
          >
            <span className={`graystone-brand-switcher__logo graystone-brand-switcher__logo--${brand.id}`}>
              <GraystoneBrandLogo brandId={brand.id} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

const GRAYSTONE_SPORT_ICON_MAP = {
  football: faFootball,
  basketball: faBasketball,
  volleyball: faVolleyball,
  softball: faBaseball,
};

function GraystoneSportIcon({ id }) {
  return <FontAwesomeIcon icon={GRAYSTONE_SPORT_ICON_MAP[id] ?? faFootball} aria-hidden="true" />;
}

function GraystoneCrossBrandIcon({ id }) {
  if (id === "football") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M20 72C26 47 50 27 78 24C96 22 103 29 100 45C96 70 70 91 43 94C26 96 16 88 20 72Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39 81C55 70 72 54 90 33M53 55L67 69M58 50L72 64M64 44L78 58" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "basketball") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M60 20C48 37 48 83 60 100M60 20C72 37 72 83 60 100M20 60H100M31 36C48 48 72 48 89 36M31 84C48 72 72 72 89 84" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "volleyball") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M33 31C48 35 61 46 66 60M66 60C78 53 87 42 91 29M66 60C52 62 39 72 32 88M66 60C80 64 91 73 96 87M23 55C39 52 55 54 66 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "softball") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M37 28C49 43 55 63 52 94M83 28C71 43 65 63 68 94" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M43 42L36 47M48 54L40 59M51 67L43 72M77 42L84 47M72 54L80 59M69 67L77 72" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "play") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M31 21L96 60L31 99V21Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" />
      </svg>
    );
  }

  if (id === "send") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M19 58L92 28L72 96L58 62L19 58Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "maxpreps") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M36 18H53L60 43L67 18H84L72 60L84 102H67L60 77L53 102H36L48 60L36 18Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="miter" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M21 38H99V52C91 52 85 58 85 66C85 74 91 80 99 80V94H21V80C29 80 35 74 35 66C35 58 29 52 21 52V38Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="miter" />
    </svg>
  );
}

function GraystoneLoginPage({ onSignIn }) {
  return (
    <section className="graystone-login" aria-label="Graystone sign in">
      <div className="graystone-login__decor graystone-login__decor--left" aria-hidden="true" />
      <div className="graystone-login__decor graystone-login__decor--right" aria-hidden="true" />

      <div className="graystone-login__welcome">
        <div className="graystone-login__account-tag">
          <span />
          <strong>One account.</strong>
          <strong>All experiences.</strong>
        </div>

        <div>
          <h1>Welcome back.</h1>
          <p>Sign in to access your account across the PlayOn ecosystem.</p>
        </div>

        <div className="graystone-login__brands" aria-label="PlayOn ecosystem brands">
          <span className="graystone-login__brand graystone-login__brand--playon">
            <GraystonePlayOnWordmark />
          </span>
          <span className="graystone-login__brand graystone-login__brand--maxpreps">
            <GraystoneMaxPrepsWordmark />
          </span>
          <span className="graystone-login__brand graystone-login__brand--nfhs">
            <GraystoneNfhsWordmark />
          </span>
          <span className="graystone-login__brand graystone-login__brand--gofan">
            <GraystoneGofanWordmark />
          </span>
        </div>
      </div>

      <form
        className="graystone-login__card"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSignIn();
        }}
      >
        <div className="graystone-login__form-header">
          <h2>Sign in</h2>
          <p>Enter your email and password to continue.</p>
        </div>

        <label className="graystone-login__field">
          <span>Email address</span>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" placeholder="name@example.com" />
          </div>
        </label>

        <label className="graystone-login__field">
          <span>Password</span>
          <div>
            <FontAwesomeIcon icon={faLock} />
            <input type="password" placeholder="Enter your password" />
            <FontAwesomeIcon icon={faEye} />
          </div>
        </label>

        <div className="graystone-login__meta">
          <label>
            <input type="checkbox" />
            <span>Keep me signed in</span>
          </label>
          <button type="button">Forgot password?</button>
        </div>

        <button type="submit" className="graystone-login__submit">
          Sign in
        </button>

        <div className="graystone-login__divider">
          <span>Or continue with</span>
        </div>

        <div className="graystone-login__providers" aria-label="Alternative sign in options">
          <button type="button" aria-label="Continue with Google">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button type="button" aria-label="Continue with Apple">
            <FontAwesomeIcon icon={faApple} />
          </button>
          <button type="button" aria-label="Continue with Microsoft">
            <FontAwesomeIcon icon={faMicrosoft} />
          </button>
          <button type="button" aria-label="Continue with single sign-on">
            <FontAwesomeIcon icon={faKey} />
          </button>
        </div>

        <p className="graystone-login__signup">
          Don&apos;t have an account? <button type="button">Sign up</button>
        </p>
      </form>

      <div className="graystone-login__trust">
        <article>
          <FontAwesomeIcon icon={faShieldHalved} />
          <div>
            <strong>Secure & trusted</strong>
            <p>Your data is protected with enterprise-grade security.</p>
          </div>
        </article>
        <article>
          <FontAwesomeIcon icon={faPeopleGroup} />
          <div>
            <strong>One account. All access.</strong>
            <p>Use one account to access PlayOn and all partner products.</p>
          </div>
        </article>
        <article>
          <FontAwesomeIcon icon={faMobileScreenButton} />
          <div>
            <strong>Anywhere, anytime</strong>
            <p>Manage your teams, tickets, and experiences on the go.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function GraystoneShell({
  currentPage,
  isAuthenticated,
  loginReturnPage,
  onAuthChange,
  onLoginReturnPageChange,
  onNavigate,
  onExit,
}) {
  const isMaxPrepsPage =
    currentPage === "graystone-maxpreps-home" ||
    currentPage === "graystone-maxpreps-videos";
  const isPlayOnPage = currentPage === "graystone-playon-home" || currentPage === "graystone-playon-hq";
  const isNfhsPage = currentPage === "graystone-nfhs-home";
  const isLoginPage = currentPage === "graystone-login";
  const isBrandHeaderPage = isMaxPrepsPage || isPlayOnPage || isNfhsPage;
  const isMaxPrepsVideosPage = currentPage === "graystone-maxpreps-videos";
  const isConceptPage =
    currentPage === "graystone-cross-brand-animations" || currentPage === "graystone-data-imagery";
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchContext, setSearchContext] = useState("general");
  const [expandedBrands, setExpandedBrands] = useState(() => ["maxpreps"]);
  const brandMenuRef = useRef(null);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    setOpenMenu(null);
    setSearchOpen(false);
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (openMenu !== "brands") return;
      if (brandMenuRef.current?.contains(event.target)) return;
      setOpenMenu((value) => (value === "brands" ? null : value));
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (openMenu !== "account") return;
      if (accountMenuRef.current?.contains(event.target)) return;
      setOpenMenu((value) => (value === "account" ? null : value));
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  const filteredResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const searchSource =
      searchContext === "team"
        ? MAXPREPS_FOLLOWED_TEAMS.map((team) => ({
            label: team.name,
            meta: `${team.sport} · ${team.record}`,
            type: "Team",
          }))
        : searchContext === "player"
          ? MAXPREPS_FOLLOWED_PLAYERS.map((player) => ({
              label: player.name,
              meta: player.detail,
              type: "Athlete",
            }))
          : SEARCH_RESULTS;

    if (!query) {
      return searchSource;
    }

    return searchSource.filter((item) => {
      return `${item.label} ${item.meta} ${item.type}`.toLowerCase().includes(query);
    });
  }, [searchContext, searchValue]);

  const openSearchWithContext = (context = "general") => {
    setOpenMenu(null);
    setSearchContext(context);
    setSearchValue("");
    setSearchOpen(true);
  };

  const activeBrandId = isPlayOnPage ? "playon" : isNfhsPage ? "nfhs-network" : "maxpreps";
  const brandHomePage = isPlayOnPage
    ? "graystone-playon-home"
    : isNfhsPage
      ? "graystone-nfhs-home"
      : "graystone-maxpreps-home";
  const brandNavLabel = isPlayOnPage ? "PlayOn" : isNfhsPage ? "NFHS Network" : "MaxPreps";
  const brandMenuLabel = "Sports";
  const brandMenuHeader = "Popular sports";
  const brandMenuHeaderLink = "All sports";

  let page = null;

  if (currentPage === "graystone-home") {
    page = (
      <GraystoneHomePage
        expandedBrands={expandedBrands}
        onNavigate={onNavigate}
        onToggleBrand={(brandId) => {
          setExpandedBrands((current) =>
            current.includes(brandId)
              ? current.filter((item) => item !== brandId)
              : [...current, brandId],
          );
        }}
      />
    );
  } else if (currentPage === "graystone-cross-brand-animations") {
    page = <GraystoneCrossBrandAnimationsPage />;
  } else if (currentPage === "graystone-data-imagery") {
    page = <GraystoneDataImageryPage />;
  } else if (currentPage === "graystone-login") {
    page = (
      <GraystoneLoginPage
        onSignIn={() => {
          onAuthChange(true);
          onNavigate(loginReturnPage);
        }}
      />
    );
  } else if (currentPage === "graystone-playon-home") {
    page = <GraystonePlayOnHomePage />;
  } else if (currentPage === "graystone-playon-hq") {
    page = <GraystonePlayOnHqPage />;
  } else if (currentPage === "graystone-nfhs-home") {
    page = <GraystoneNfhsHomePage />;
  } else if (currentPage === "graystone-maxpreps-home") {
    page = (
      <GraystoneMaxPrepsHomePage
        isAuthenticated={isAuthenticated}
        onRequestSearch={openSearchWithContext}
        onRequestSignIn={() => {
          onLoginReturnPageChange("graystone-maxpreps-home");
          onNavigate("graystone-login");
        }}
        onNavigate={onNavigate}
      />
    );
  } else if (currentPage === "graystone-maxpreps-videos") {
    page = <GraystoneWatchPage />;
  } else if (currentPage === "graystone-watch") {
    page = <GraystoneWatchPage />;
  } else if (currentPage === "graystone-scores") {
    page = <GraystoneScoresPage />;
  } else if (currentPage === "graystone-programs") {
    page = <GraystoneProgramsPage />;
  } else {
    page = <GraystoneStudioPage />;
  }

  return (
    <main
      className={`graystone${
        currentPage === "graystone-home"
          ? " graystone--light"
          : isConceptPage
            ? " graystone--light graystone--concept-art"
          : isLoginPage
            ? " graystone--login"
          : isPlayOnPage
            ? " graystone--playon-light"
          : isNfhsPage
            ? " graystone--maxpreps-dark graystone--nfhs-dark"
          : isMaxPrepsVideosPage
            ? " graystone--maxpreps-dark"
            : isMaxPrepsPage
            ? " graystone--maxpreps-light"
            : ""
      }`}
      aria-label="Project Graystone"
    >
      {!isConceptPage && !isLoginPage && (
        <header className="graystone-header">
          {currentPage === "graystone-home" ? (
            <div className="graystone-header__inner graystone-header__inner--landing">
              <div className="graystone-brand graystone-brand--landing">
                <button className="graystone-brand__back" type="button" onClick={() => onExit("projects")}>
                  Back to Projects
                </button>
              </div>
            </div>
          ) : isBrandHeaderPage ? (
            <div className="graystone-header__inner graystone-header__inner--maxpreps">
              <div ref={brandMenuRef} className="graystone-maxpreps-cluster graystone-maxpreps-cluster--brand">
                {!isNfhsPage && (
                  <>
                    <button
                      type="button"
                      className="graystone-maxpreps-gridmenu"
                      aria-label="Open menu"
                      onClick={() => {
                        setSearchOpen(false);
                        setOpenMenu((value) => (value === "brands" ? null : "brands"));
                      }}
                    >
                      <GraystoneIconGridMenu />
                    </button>
                    <div className={`graystone-maxpreps-gridmenu-panel${openMenu === "brands" ? " is-open" : ""}`}>
                      <GraystoneBrandSwitcher activeBrandId={activeBrandId} onNavigate={onNavigate} onClose={() => setOpenMenu(null)} />
                    </div>
                  </>
                )}
                <a
                  className={`graystone-maxpreps-logo${isPlayOnPage ? " graystone-playon-logo" : ""}${isNfhsPage ? " graystone-nfhs-logo" : ""}`}
                  href={`#${brandHomePage}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(brandHomePage);
                  }}
                >
                  {isPlayOnPage ? (
                    <GraystonePlayOnWordmark />
                  ) : isNfhsPage ? (
                    <GraystoneNfhsWordmark />
                  ) : (
                    <GraystoneMaxPrepsWordmark fill={isMaxPrepsVideosPage ? "#FF241F" : "#E10500"} />
                  )}
                </a>

              <nav className="graystone-maxpreps-primary" aria-label={`${brandNavLabel} primary navigation`}>
                {isPlayOnPage ? (
                  PLAYON_AUDIENCE_MENUS.map((menu) => (
                    <div
                      key={menu.id}
                      className="graystone-maxpreps-nav"
                      onPointerEnter={() => {
                        setSearchOpen(false);
                        setOpenMenu((value) => (value === menu.id ? value : menu.id));
                      }}
                      onPointerLeave={() => {
                        setOpenMenu((value) => (value === menu.id ? null : value));
                      }}
                      onFocus={() => {
                        setSearchOpen(false);
                        setOpenMenu(menu.id);
                      }}
                      onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget)) return;
                        setOpenMenu((value) => (value === menu.id ? null : value));
                      }}
                    >
                      <button
                        type="button"
                        className={`graystone-maxpreps-nav__sports${openMenu === menu.id ? " is-open" : ""}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setOpenMenu((value) => (value === menu.id ? null : menu.id));
                        }}
                      >
                        <span>{menu.label}</span>
                        <GraystoneIconChevron />
                      </button>
                      <div className={`graystone-maxpreps-sports graystone-playon-audience-menu${openMenu === menu.id ? " is-open" : ""}`}>
                        <div className="graystone-maxpreps-sports__grid">
                          {Object.entries(menu.groups).map(([group, items]) => (
                            <div key={group} className="graystone-maxpreps-sports__column">
                              <div className="graystone-maxpreps-sports__label">{group}</div>
                              {items.map((item) => (
                                <button key={item} type="button" className="graystone-maxpreps-sports__item">
                                  {item}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : isNfhsPage ? (
                  <>
                    <button type="button" className="graystone-maxpreps-link graystone-nfhs-live-count">
                      <span className="graystone-nfhs-live-count__dot" aria-hidden="true" />
                      <span>21 Live</span>
                    </button>
                    <div
                      className="graystone-maxpreps-nav"
                      onPointerEnter={() => {
                        setSearchOpen(false);
                        setOpenMenu("sports");
                      }}
                      onPointerLeave={() => {
                        setOpenMenu((value) => (value === "sports" ? null : value));
                      }}
                    >
                      <button
                        type="button"
                        className={`graystone-maxpreps-nav__sports${openMenu === "sports" ? " is-open" : ""}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setOpenMenu((value) => (value === "sports" ? null : "sports"));
                        }}
                      >
                        <span>Sports</span>
                        <GraystoneIconChevron />
                      </button>
                      <div className={`graystone-maxpreps-sports graystone-nfhs-sports-menu${openMenu === "sports" ? " is-open" : ""}`}>
                        <div className="graystone-maxpreps-sports__grid">
                          {Object.entries(NFHS_SPORTS_MENU).map(([group, items]) => (
                            <div key={group} className="graystone-maxpreps-sports__column">
                              <div className="graystone-maxpreps-sports__label">{group}</div>
                              {items.map((item) => (
                                <button key={item} type="button" className="graystone-maxpreps-sports__item">
                                  {item}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {NFHS_PRIMARY_LINKS.map((item) => (
                      <button key={item} type="button" className="graystone-maxpreps-link">
                        {item}
                      </button>
                    ))}
                    <span className="graystone-nfhs-nav-divider" aria-hidden="true" />
                    <button type="button" className="graystone-maxpreps-link graystone-nfhs-ticket-link">
                      Tickets
                    </button>
                  </>
                ) : (
                  <>
                    <div className="graystone-maxpreps-nav">
                      <button
                        type="button"
                        className={`graystone-maxpreps-nav__sports${openMenu === "sports" ? " is-open" : ""}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setOpenMenu((value) => (value === "sports" ? null : "sports"));
                        }}
                      >
                        <span>{brandMenuLabel}</span>
                        <GraystoneIconChevron />
                      </button>
                      <div className={`graystone-maxpreps-sports${openMenu === "sports" ? " is-open" : ""}`}>
                        <div className="graystone-maxpreps-sports__header">
                          <strong>{brandMenuHeader}</strong>
                          <span>{brandMenuHeaderLink}</span>
                        </div>
                        <div className="graystone-maxpreps-sports__grid">
                          {Object.entries(MAXPREPS_SPORTS_MENU).map(([group, items]) => (
                            <div key={group} className="graystone-maxpreps-sports__column">
                              <div className="graystone-maxpreps-sports__label">{group}</div>
                              {items.map((item) => (
                                <button key={item} type="button" className="graystone-maxpreps-sports__item">
                                  {item}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {MAXPREPS_HOME_LINKS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="graystone-maxpreps-link"
                        onClick={() => {
                          if (item === "Videos" || item === "Watch") {
                            onNavigate("graystone-maxpreps-videos");
                          }
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </>
                )}
              </nav>
            </div>

            <div className="graystone-maxpreps-cluster graystone-maxpreps-cluster--utility">
              <button
                type="button"
                className={`graystone-maxpreps-search${searchOpen ? " is-open" : ""}`}
                onClick={() => {
                  if (searchOpen) {
                    setSearchOpen(false);
                    return;
                  }
                  openSearchWithContext("general");
                }}
                aria-label="Toggle search"
              >
                <GraystoneIconSearch />
                <span>Search</span>
              </button>

              <button type="button" className="graystone-maxpreps-link graystone-maxpreps-link--icon">
                <GraystoneIconStar />
                <span>Favorites</span>
              </button>
            </div>

            <div className="graystone-maxpreps-cluster graystone-maxpreps-cluster--social">
              <div className="graystone-maxpreps-social" aria-label="Social links">
                <button type="button" className="graystone-maxpreps-social__button" aria-label="Facebook">
                  <GraystoneIconFacebook />
                </button>
                <button type="button" className="graystone-maxpreps-social__button" aria-label="Instagram">
                  <GraystoneIconInstagram />
                </button>
                <button type="button" className="graystone-maxpreps-social__button" aria-label="TikTok">
                  <GraystoneIconTikTok />
                </button>
                <button type="button" className="graystone-maxpreps-social__button" aria-label="X">
                  <GraystoneIconX />
                </button>
                <button type="button" className="graystone-maxpreps-social__button" aria-label="YouTube">
                  <GraystoneIconYoutube />
                </button>
              </div>
            </div>

            <div className="graystone-maxpreps-cluster graystone-maxpreps-cluster--account">
              {isPlayOnPage ? (
                <>
                  {!isAuthenticated ? (
                    <button
                      type="button"
                      className="graystone-maxpreps-link graystone-maxpreps-link--icon graystone-playon-header-login"
                      onClick={() => {
                        setOpenMenu(null);
                        onLoginReturnPageChange("graystone-playon-home");
                        onNavigate("graystone-login");
                      }}
                    >
                      <GraystoneIconUser />
                      <span>HQ Login</span>
                    </button>
                  ) : (
                    <div ref={accountMenuRef} className="graystone-maxpreps-account graystone-playon-account">
                      <button
                        type="button"
                        className={`graystone-maxpreps-account__trigger${openMenu === "account" ? " is-open" : ""}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setOpenMenu((value) => (value === "account" ? null : "account"));
                        }}
                        aria-haspopup="menu"
                        aria-expanded={openMenu === "account"}
                      >
                        <span className="graystone-maxpreps-account__avatar" aria-hidden="true">
                          {GRAYSTONE_SIMULATED_USER.avatar}
                        </span>
                        <span className="graystone-maxpreps-account__name">{GRAYSTONE_SIMULATED_USER.firstName}</span>
                      </button>

                      <div className={`graystone-maxpreps-account__menu${openMenu === "account" ? " is-open" : ""}`} role="menu" aria-label="Account menu">
                        {GRAYSTONE_ACCOUNT_MENU.map((item) => (
                          <button key={item.id} type="button" className="graystone-maxpreps-account__item" role="menuitem">
                            {item.label}
                          </button>
                        ))}
                        <button
                          type="button"
                          className="graystone-maxpreps-account__item graystone-maxpreps-account__item--logout"
                          role="menuitem"
                          onClick={() => {
                            onAuthChange(false);
                            setOpenMenu(null);
                            setSearchOpen(false);
                          }}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    className="graystone-playon-header-demo"
                    onClick={() => {
                      setOpenMenu(null);
                      onNavigate(isAuthenticated ? "graystone-playon-hq" : "graystone-playon-home");
                    }}
                  >
                    {isAuthenticated ? "PlayOn HQ" : "Book a demo"}
                  </button>
                </>
              ) : !isAuthenticated ? (
                <button
                  type="button"
                  className="graystone-maxpreps-link graystone-maxpreps-link--icon"
                  onClick={() => {
                    setOpenMenu(null);
                    onLoginReturnPageChange(currentPage);
                    onNavigate("graystone-login");
                  }}
                >
                  <GraystoneIconUser />
                  <span>Login</span>
                </button>
              ) : (
                <div ref={accountMenuRef} className="graystone-maxpreps-account">
                  <button
                    type="button"
                    className={`graystone-maxpreps-account__trigger${openMenu === "account" ? " is-open" : ""}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setOpenMenu((value) => (value === "account" ? null : "account"));
                    }}
                    aria-haspopup="menu"
                    aria-expanded={openMenu === "account"}
                  >
                    <span className="graystone-maxpreps-account__avatar" aria-hidden="true">
                      {GRAYSTONE_SIMULATED_USER.avatar}
                    </span>
                    <span className="graystone-maxpreps-account__name">{GRAYSTONE_SIMULATED_USER.firstName}</span>
                  </button>

                  <div className={`graystone-maxpreps-account__menu${openMenu === "account" ? " is-open" : ""}`} role="menu" aria-label="Account menu">
                    {GRAYSTONE_ACCOUNT_MENU.map((item) => (
                      <button key={item.id} type="button" className="graystone-maxpreps-account__item" role="menuitem">
                        {item.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="graystone-maxpreps-account__item graystone-maxpreps-account__item--logout"
                      role="menuitem"
                      onClick={() => {
                        onAuthChange(false);
                        setOpenMenu(null);
                        setSearchOpen(false);
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
              {isNfhsPage && (
                <button type="button" className="graystone-nfhs-subscribe">
                  Subscribe
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="graystone-header__inner">
              <div className="graystone-brand">
                <button className="graystone-brand__back" type="button" onClick={() => onExit("projects")}>
                  Projects
                </button>
                <div className="graystone-brand__mark">
                  <span className="graystone-brand__eyebrow">Project Graystone</span>
                  <strong>Unified PlayOn Design</strong>
                </div>
              </div>

              <nav className="graystone-global-nav" aria-label="Graystone global navigation">
                {HEADER_MENUS.map((menu) => (
                  <div
                    key={menu.id}
                    className={`graystone-menu${openMenu === menu.id ? " is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="graystone-menu__trigger"
                      onClick={() => {
                        setSearchOpen(false);
                        setOpenMenu((value) => (value === menu.id ? null : menu.id));
                      }}
                    >
                      <span>{menu.label}</span>
                      <GraystoneIconChevron />
                    </button>
                    <div className="graystone-menu__panel">
                      {menu.items.map((item) => (
                        <button key={item} type="button" className="graystone-menu__item">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className={`graystone-search-button${searchOpen ? " is-open" : ""}`}
                  onClick={() => {
                    setOpenMenu(null);
                    setSearchOpen((value) => !value);
                  }}
                  aria-label="Toggle search"
                >
                  <GraystoneIconSearch />
                </button>
              </nav>
            </div>

            <div className="graystone-header__subnav">
              <div className="graystone-header__subnav-inner">
                {LOCAL_PAGES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`graystone-page-link${item.id === currentPage ? " is-active" : ""}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        </header>
      )}

      <div
        className={`graystone-search-overlay${searchOpen ? " is-open" : ""}${isBrandHeaderPage ? " graystone-search-overlay--maxpreps" : ""}`}
        onClick={() => setSearchOpen(false)}
      >
        <div className="graystone-search-panel" onClick={(event) => event.stopPropagation()}>
          {isMaxPrepsPage && searchContext !== "general" && (
            <div className="graystone-search-panel__context">
              <span className="graystone-kicker graystone-kicker--dark">
                {searchContext === "team" ? "Add team to follow" : "Add player to follow"}
              </span>
            </div>
          )}
          <div className="graystone-search-input">
            <GraystoneIconSearch />
            <input
              type="search"
              placeholder={
                searchContext === "team"
                  ? "Search teams to follow"
                  : searchContext === "player"
                    ? "Search athletes to follow"
                    : "Search teams, athletes, or experiences"
              }
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button type="button" onClick={() => setSearchOpen(false)}>
              Close
            </button>
          </div>
          <div className="graystone-search-results">
            {filteredResults.map((item) => (
              <button key={item.label} type="button" className="graystone-search-result">
                <span className="graystone-search-result__type">{item.type}</span>
                <strong>{item.label}</strong>
                <span>{item.meta}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentPage !== "graystone-home" && !isLoginPage && (
        <button
          type="button"
          className="graystone-home-button"
          aria-label="Back to projects"
          onClick={() => onExit("projects")}
        >
          <GraystoneIconHome />
        </button>
      )}

      <div className="graystone-page-shell">{page}</div>
    </main>
  );
}

function GraystoneHomePage({ expandedBrands, onToggleBrand, onNavigate }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="graystone-page graystone-page--home" aria-label="Graystone home page">
      <div className="graystone-home-hero">
        <img src={`${baseUrl}graystone-landing.png`} alt="Graystone brand portfolio" />
      </div>
      <div className="graystone-home-tree">
        {BRAND_TREE.map((brand) => {
          const isExpanded = expandedBrands.includes(brand.id);

          return (
            <div key={brand.id} className={`graystone-tree-group${isExpanded ? " is-open" : ""}`}>
              <button
                type="button"
                className="graystone-tree-group__trigger"
                onClick={() => onToggleBrand(brand.id)}
              >
                <span className={`graystone-tree-group__brand${brand.id === "gofan" ? " graystone-tree-group__brand--gofan" : ""}`}>
                  <img src={`${baseUrl}${brand.logo}`} alt={`${brand.label} logo`} />
                  <span>{brand.label}</span>
                </span>
                <GraystoneIconChevron />
              </button>
              <div className="graystone-tree-group__children">
                <div className="graystone-tree-group__children-inner">
                  {brand.links.map((link) => (
                    <button
                      key={link}
                      type="button"
                      className="graystone-tree-link"
                      onClick={() => {
                        if (brand.id === "playon" && link === "Home") {
                          onNavigate("graystone-playon-home");
                        }
                        if (brand.id === "maxpreps" && link === "Home") {
                          onNavigate("graystone-maxpreps-home");
                        }
                      }}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <section className="graystone-concept-links" aria-label="Concept links">
        <div className="graystone-concept-links__header">
          <span className="graystone-kicker">Concepts</span>
          <h2>Concept art</h2>
        </div>
        <div className="graystone-concept-links__list">
          {CONCEPT_LINKS.map((concept) => (
            <button
              key={concept.id}
              type="button"
              className="graystone-concept-link"
              onClick={() => onNavigate(concept.id)}
            >
              <span>
                <strong>{concept.title}</strong>
                <small>{concept.description}</small>
              </span>
              <GraystoneIconChevron />
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

function GraystoneCrossBrandAnimationsPage() {
  const [conceptScene, setConceptScene] = useState(0);
  const railRef = useRef(null);
  const conceptSceneRef = useRef(0);

  useEffect(() => {
    conceptSceneRef.current = conceptScene;
  }, [conceptScene]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let wheelAccumulator = 0;
    let touchStartY = 0;
    let isSnapping = false;
    let snapTimeoutId = 0;

    const snapToScene = (index) => {
      const nextScene = Math.max(0, Math.min(3, index));

      isSnapping = true;
      wheelAccumulator = 0;
      conceptSceneRef.current = nextScene;
      setConceptScene(nextScene);

      window.clearTimeout(snapTimeoutId);
      snapTimeoutId = window.setTimeout(() => {
        isSnapping = false;
      }, prefersReducedMotion ? 120 : 760);
    };

    const handleWheel = (event) => {
      if (prefersReducedMotion || isSnapping) {
        return;
      }

      event.preventDefault();
      wheelAccumulator += event.deltaY;

      if (Math.abs(wheelAccumulator) < 70) {
        return;
      }

      const direction = wheelAccumulator > 0 ? 1 : -1;
      snapToScene(conceptSceneRef.current + direction);
    };

    const handleKeydown = (event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        snapToScene(conceptSceneRef.current + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        snapToScene(conceptSceneRef.current - 1);
      }
    };

    const handleTouchStart = (event) => {
      touchStartY = event.changedTouches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (isSnapping) {
        return;
      }

      const deltaY = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 44) {
        return;
      }

      snapToScene(conceptSceneRef.current + (deltaY > 0 ? 1 : -1));
    };

    rail.addEventListener("wheel", handleWheel, { passive: false });
    rail.addEventListener("touchstart", handleTouchStart, { passive: true });
    rail.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.clearTimeout(snapTimeoutId);
      rail.removeEventListener("wheel", handleWheel);
      rail.removeEventListener("touchstart", handleTouchStart);
      rail.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <section className="graystone-page graystone-page--concept-art" aria-label="Cross brand animations concept page">
      <div
        ref={railRef}
        className={`graystone-concept-scroll${conceptScene >= 1 ? " is-transformed" : ""}${conceptScene >= 2 ? " is-sports" : ""}${conceptScene === 3 ? " is-reveal" : ""}`}
        tabIndex={0}
      >
        <section className="graystone-concept-scene" aria-label="Brand logo and icon transformation">
          <h1 className="graystone-concept-heading">The connected tissue of High School Sports</h1>
          <h2 className="graystone-concept-heading graystone-concept-heading--transformed">
            Making every game easier to find, follow, attend, watch, and celebrate for players, schools, families, and fans.
          </h2>
          <h2 className="graystone-concept-heading graystone-concept-heading--sports">
            Making all high school sports moments relevant no matter the level.
          </h2>
          <h2 className="graystone-concept-heading graystone-concept-heading--reveal">
            Connecting every step of the game day journey.
          </h2>

          <div className="graystone-concept-logo-row">
            {CROSS_BRAND_SPHERES.map((sphere) => (
              <div key={sphere.brandId} className={`graystone-concept-logo graystone-concept-logo--${sphere.brandId}`}>
                <GraystoneBrandLogo brandId={sphere.brandId} />
              </div>
            ))}
          </div>

          <div className="graystone-concept-sphere-row graystone-concept-sphere-row--blank">
            {CROSS_BRAND_SPHERES.map((sphere) => (
              <div
                key={sphere.id}
                className={`graystone-concept-sphere graystone-concept-sphere--${sphere.id}`}
                style={{
                  "--sphere-a": sphere.colorA,
                  "--sphere-b": sphere.colorB,
                  "--sphere-c": sphere.colorC,
                  "--icon-color": sphere.iconColor,
                  "--sphere-delay": sphere.delay,
                }}
              >
                <span className="graystone-concept-sphere__orb" />
                <span className="graystone-concept-sphere__icon">
                  <GraystoneCrossBrandIcon id={sphere.iconId} />
                </span>
                <span className="graystone-concept-sphere__sport-icon">
                  <GraystoneSportIcon id={sphere.sportIconId} />
                </span>
                <span className="graystone-concept-sphere__caption">{sphere.description}</span>
              </div>
            ))}
          </div>

          <div className="graystone-concept-reveal-list" aria-hidden={conceptScene !== 3}>
            {CROSS_BRAND_SPHERES.map((sphere, index) => (
              <div
                key={sphere.brandId}
                className="graystone-concept-reveal-item"
                style={{
                  "--icon-color": sphere.iconColor,
                  "--reveal-index": index,
                  "--origin-x": `${(index - 1.5) * 14.8}rem`,
                  "--origin-y": "0rem",
                  "--stack-y": `${(index - 1.5) * 3.25}rem`,
                  "--text-end": `${sphere.revealText.length + 1}ch`,
                }}
              >
                <span className="graystone-concept-reveal-square" />
                <span className="graystone-concept-reveal-text">{sphere.revealText}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="graystone-concept-scroll-cue"
            onClick={() => {
              const nextScene = conceptScene >= 3 ? 0 : conceptScene + 1;
              conceptSceneRef.current = nextScene;
              setConceptScene(nextScene);
            }}
            aria-label={conceptScene >= 3 ? "Return to brand logos" : "Advance brand animation"}
          >
            <span>Scroll</span>
            <GraystoneIconChevron />
          </button>
        </section>
      </div>
    </section>
  );
}

function graystoneClamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function GraystoneDataPortraitCanvas({ imageSrc, settings, scrollProgress, recordingMode, canvasRef }) {
  const wrapRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const settingsRef = useRef(settings);
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    if (!canvas || !wrap) {
      return undefined;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const context = canvas.getContext("2d");

    let frameId = 0;
    let resizeObserver = null;
    let imageData = null;
    let sampleWidth = 0;
    let sampleHeight = 0;
    let tokenIndex = 0;

    const fitImage = (targetWidth, targetHeight) => {
      const imageRatio = image.width / image.height;
      const targetRatio = targetWidth / targetHeight;
      let width = targetWidth;
      let height = targetHeight;
      let x = 0;
      let y = 0;

      if (imageRatio > targetRatio) {
        height = targetHeight;
        width = height * imageRatio;
        x = (targetWidth - width) / 2;
      } else {
        width = targetWidth;
        height = width / imageRatio;
        y = (targetHeight - height) / 2;
      }

      return { x, y, width, height };
    };

    const prepareImageData = () => {
      if (!image.complete || !image.naturalWidth || !sampleContext) {
        return;
      }

      sampleWidth = Math.min(220, Math.max(120, Math.round(wrap.clientWidth / 4)));
      sampleHeight = Math.max(160, Math.round(sampleWidth * (wrap.clientHeight / Math.max(1, wrap.clientWidth))));
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      sampleContext.clearRect(0, 0, sampleWidth, sampleHeight);
      const fitted = fitImage(sampleWidth, sampleHeight);
      sampleContext.drawImage(image, fitted.x, fitted.y, fitted.width, fitted.height);
      imageData = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight);
    };

    const getBrightness = (sampleX, sampleY) => {
      if (!imageData) return 0;

      const x = graystoneClamp(Math.round(sampleX), 0, sampleWidth - 1);
      const y = graystoneClamp(Math.round(sampleY), 0, sampleHeight - 1);
      const index = (y * sampleWidth + x) * 4;
      const data = imageData.data;
      return data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
    };

    const draw = (time = 0) => {
      const rect = wrap.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        prepareImageData();
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0d0d0d";
      context.fillRect(0, 0, width, height);

      if (!imageData) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      const activeSettings = settingsRef.current;
      const tokenSet = DATA_IMAGERY_TOKEN_SETS[activeSettings.mode] ?? DATA_IMAGERY_TOKEN_SETS.Mixed;
      const densityGap = graystoneClamp(24 - activeSettings.density * 2.3, 8, 19);
      const fontSize = activeSettings.tokenSize;
      const contrast = activeSettings.contrast / 50;
      const dissolve = graystoneClamp(0.2 + progressRef.current * 0.9, 0, 1);
      const motion = recordingMode ? 0 : activeSettings.motion / 100;
      const pointer = pointerRef.current;

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `600 ${fontSize}px "Chivo Mono", ui-monospace, monospace`;
      context.shadowColor = "rgba(255, 255, 255, 0.08)";
      context.shadowBlur = 5 * dissolve;
      tokenIndex = 0;

      for (let y = densityGap / 2; y < height; y += densityGap) {
        for (let x = densityGap / 2; x < width; x += densityGap) {
          const sampleX = (x / width) * sampleWidth;
          const sampleY = (y / height) * sampleHeight;
          const brightness = getBrightness(sampleX, sampleY);
          const localContrast = Math.pow(brightness / 255, graystoneClamp(2.3 - contrast, 0.55, 2.5));
          const edge =
            Math.abs(getBrightness(sampleX + 1, sampleY) - getBrightness(sampleX - 1, sampleY)) +
            Math.abs(getBrightness(sampleX, sampleY + 1) - getBrightness(sampleX, sampleY - 1));
          const edgeBoost = graystoneClamp((edge / 255) * (activeSettings.edgeDetail / 36), 0, 0.55);
          const alpha = graystoneClamp((localContrast + edgeBoost - 0.1) * dissolve, 0, 0.98);

          const token = tokenSet[tokenIndex % tokenSet.length];
          const wave = Math.sin(time * 0.0017 + x * 0.031 + y * 0.021) * motion * 5;
          const pointerDistance = Math.hypot(pointer.x - x, pointer.y - y);
          const pointerLift = pointer.active ? graystoneClamp(1 - pointerDistance / 170, 0, 1) * 9 : 0;
          const isPortrait = alpha >= 0.18;

          context.save();
          context.translate(x + wave, y - pointerLift);
          if (isPortrait) {
            context.rotate((edgeBoost - 0.12) * 0.08 + Math.sin(time * 0.0007 + tokenIndex) * motion * 0.035);
            context.globalAlpha = graystoneClamp(0.52 + alpha * 0.58, 0, 1);
            context.fillStyle = "rgba(247, 247, 244, 0.96)";
            context.fillText(token, 0, 0);
          } else {
            context.globalAlpha = 0.46;
            context.fillStyle = "rgba(247, 247, 244, 0.78)";
            context.fillText("·", 0, 0);
          }
          context.restore();
          tokenIndex += 1;
        }
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const start = () => {
      prepareImageData();
      frameId = window.requestAnimationFrame(draw);
    };

    image.addEventListener("load", start);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    resizeObserver = new ResizeObserver(() => prepareImageData());
    resizeObserver.observe(wrap);

    if (image.complete) {
      start();
    }

    return () => {
      image.removeEventListener("load", start);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [canvasRef, imageSrc, recordingMode]);

  return (
    <div ref={wrapRef} className="graystone-data-canvas-wrap">
      <canvas ref={canvasRef} className="graystone-data-canvas" aria-label="Typographic sports data portrait" />
    </div>
  );
}

function GraystoneDataControl({ label, min, max, value, onChange }) {
  return (
    <label className="graystone-data-control">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output>{value}</output>
    </label>
  );
}

function GraystoneDataImageryPage() {
  return (
    <section className="graystone-page graystone-page--data-imagery" aria-label="Data imagery concept disabled" />
  );
}

function VarsitySignalScorebug() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="varsity-signal-scorebug" aria-label="Scoreboard component example">
      <div className="varsity-signal-scorebug__status">
        <span>Live</span>
        <strong>Q3 07:24</strong>
      </div>
      {[
        { name: "Northside", score: 32, logo: "mascot-4.svg" },
        { name: "Riverview", score: 28, logo: "mascot-9.svg" },
      ].map((team) => (
        <div key={team.name} className="varsity-signal-scorebug__team">
          <span className="varsity-signal-scorebug__mark">
            <img src={`${baseUrl}${team.logo}`} alt="" />
          </span>
          <strong>{team.name}</strong>
          <span>{team.score}</span>
        </div>
      ))}
      <div className="varsity-signal-scorebug__actions">
        <button type="button">
          <FontAwesomeIcon icon={faVideo} />
          Watch live
        </button>
        <button type="button">Game details</button>
      </div>
    </div>
  );
}

function VarsitySignalAthleteCard({ baseUrl, image }) {
  return (
    <article className="varsity-signal-athlete-card" aria-label="Athlete card component example">
      <div className="varsity-signal-athlete-card__media" aria-hidden="true">
        {image && (
          <img
            src={getVarsitySignalSrc(baseUrl, image)}
            srcSet={getVarsitySignalSrcSet(baseUrl, image)}
            sizes="(max-width: 760px) 100vw, 22rem"
            alt=""
            loading="lazy"
          />
        )}
      </div>
      <div className="varsity-signal-athlete-card__body">
        <em>#24</em>
        <span>Jayden Williams</span>
        <strong>Northside High</strong>
        <small>SR · QB · 6'2" · 195 lbs</small>
      </div>
      <div className="varsity-signal-athlete-card__stats">
        <span><strong>48</strong> Rec</span>
        <span><strong>812</strong> Yds</span>
        <span><strong>11</strong> TD</span>
        <span><strong>16.9</strong> Avg</span>
      </div>
    </article>
  );
}

function VarsitySignalTicket() {
  return (
    <article className="varsity-signal-ticket" aria-label="Ticket module component example">
      <span className="varsity-signal-ticket__eyebrow">Admit one</span>
      <strong>Playoffs</strong>
      <div className="varsity-signal-ticket__meta">
        <span>Sec B</span>
        <span>Row 12</span>
        <span>Seat 7</span>
      </div>
      <div className="varsity-signal-ticket__barcode" aria-hidden="true" />
      <span className="varsity-signal-ticket__presented">Presented by PlayOn Sports</span>
    </article>
  );
}

export function VarsitySignalStyleGuidePage() {
  const baseUrl = import.meta.env.BASE_URL;
  const heroImages = [
    getVarsitySignalImage("rivalry-hero"),
    getVarsitySignalImage("scoreboard-huddle"),
    getVarsitySignalImage("basketball-gym"),
  ].filter(Boolean);
  const visualEffects = VARSITY_SIGNAL_VISUAL_EFFECTS.map((effect) => ({
    ...effect,
    image: getVarsitySignalImage(effect.imageId),
  })).filter((effect) => effect.image);
  const applicationImages = [
    getVarsitySignalImage("game-poster"),
    getVarsitySignalImage("profile-athlete"),
    getVarsitySignalImage("court-final"),
    getVarsitySignalImage("scoreboard-huddle"),
  ].filter(Boolean);
  const marketingAssets = VARSITY_SIGNAL_MARKETING_ASSETS.map((asset) => ({
    ...asset,
    image: getVarsitySignalImage(asset.imageId),
  })).filter((asset) => asset.image);
  const athleteImage = getVarsitySignalImage("profile-athlete");

  return (
    <section className="graystone-page graystone-page--varsity-signal" aria-label="Varsity Signal style guide">
      <div className="varsity-signal">
        <section className="varsity-signal-hero">
          <div className="varsity-signal-hero__copy">
            <div className="varsity-signal-hero__masthead">
              <GraystoneMaxPrepsWordmark fill="#E10500" />
              <span>Style guide · version 1.0</span>
            </div>
            <h1>
              Varsity
              <span>Signal</span>
            </h1>
            <p className="varsity-signal-hero__tag">Friday night. Every night.</p>
            <p className="varsity-signal-hero__body">
              Local legends, broadcast energy, scrapbook soul. A louder MaxPreps visual language for real high school sports moments: sweaty gyms, scoreboard glow, booster banners, blurry phone photos, student sections, and every kid having the biggest night of their life.
            </p>
            <div className="varsity-signal-hero__chips" aria-label="Style attributes">
              {["Fast", "Loud", "Local", "Imperfect", "Proud", "Shareable"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="varsity-signal-hero__collage" aria-hidden="true">
            {heroImages.map((image, index) => (
              <div key={image.id} className={`varsity-signal-photo varsity-signal-photo--${["one", "two", "three"][index]}`}>
                <img
                  src={getVarsitySignalSrc(baseUrl, image)}
                  srcSet={getVarsitySignalSrcSet(baseUrl, image)}
                  sizes="(max-width: 760px) 76vw, 34vw"
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
            <div className="varsity-signal-hero__score">12:00</div>
            <div className="varsity-signal-hero__sticker">Clutch</div>
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--palette" aria-labelledby="varsity-signal-palette">
          <div className="varsity-signal-section-heading">
            <span>01</span>
            <h2 id="varsity-signal-palette">Color Palette</h2>
            <p>PlayOn provides the frame. School colors provide the electricity.</p>
          </div>
          <div className="varsity-signal-palette-grid">
            {VARSITY_SIGNAL_PALETTE.map((color) => (
              <article key={color.name} className="varsity-signal-swatch">
                <span style={{ background: color.value }} />
                <strong>{color.name}</strong>
                <small>{color.value} · {color.note}</small>
              </article>
            ))}
          </div>
          <div className="varsity-signal-team-stripes" aria-label="Team color flexibility">
            {["#6f766f", "#e10500", "#f2b820", "#006dff", "#16213e", "#16a34a", "#f6f2e8"].map((color) => (
              <span key={color} style={{ background: color }} />
            ))}
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--theme-system" aria-labelledby="varsity-signal-theme-system">
          <div className="varsity-signal-section-heading">
            <span>02</span>
            <h2 id="varsity-signal-theme-system">Theme System</h2>
            <p>Light is the default product theme. Dark remains available for broadcast, video, live game, and social-forward moments.</p>
          </div>
          <div className="varsity-signal-theme-grid">
            <article className="varsity-signal-theme-card varsity-signal-theme-card--light">
              <span>Default</span>
              <strong>Light theme</strong>
              <p>Newsprint surfaces, dark type, restrained neutral accent, and school-color modules layered in where local identity matters.</p>
              <div>
                <small className="varsity-signal-theme-card__state varsity-signal-theme-card__state--live">Live</small>
                <b>Northside 32</b>
                <b>Riverview 28</b>
              </div>
            </article>
            <article className="varsity-signal-theme-card varsity-signal-theme-card--dark">
              <span>Variant</span>
              <strong>Dark theme</strong>
              <p>Night-field surfaces for watch pages, game heroes, scoreboards, highlight reels, and high-energy campaign placements.</p>
              <div>
                <small className="varsity-signal-theme-card__state varsity-signal-theme-card__state--final">Final</small>
                <b>Clutch drive</b>
                <b>Watch replay</b>
              </div>
            </article>
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--team-page" aria-labelledby="varsity-signal-team-page">
          <div className="varsity-signal-section-heading">
            <span>03</span>
            <h2 id="varsity-signal-team-page">Team Color Page</h2>
            <p>Team pages should feel locally owned without breaking the PlayOn frame: school color drives posters, chips, badges, rails, and hero panels.</p>
          </div>
          <div className="varsity-signal-team-grid">
            {VARSITY_SIGNAL_TEAM_THEMES.map((team) => (
              <article
                key={team.school}
                className="varsity-signal-team-card"
                style={{
                  "--team-primary": team.primary,
                  "--team-secondary": team.secondary,
                  "--team-accent": team.accent,
                }}
              >
                <div className="varsity-signal-team-card__mast">
                  <span>
                    <img src={`${baseUrl}${team.logo}`} alt="" />
                  </span>
                  <div>
                    <strong>{team.school}</strong>
                    <small>{team.sport}</small>
                  </div>
                </div>
                <div className="varsity-signal-team-card__poster">
                  <b>{team.record}</b>
                  <span>Rivalry week</span>
                </div>
                <div className="varsity-signal-team-card__tokens">
                  <span style={{ background: team.primary }} />
                  <span style={{ background: team.secondary }} />
                  <span style={{ background: team.accent }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--type" aria-labelledby="varsity-signal-type">
          <div className="varsity-signal-section-heading">
            <span>04</span>
            <h2 id="varsity-signal-type">Typography</h2>
            <p>Broadcast headlines, squared UI labels, and sticker accents in one system.</p>
          </div>
          <div className="varsity-signal-type-grid">
            <article className="varsity-signal-type-card varsity-signal-type-card--champion">
              <span>Hero / Headlines</span>
              <strong>Champion Gothic</strong>
              <small>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />0123456789</small>
              <p>Loud. Bold. Built for big moments. Use for scores, names, rankings, and game titles.</p>
            </article>
            <article className="varsity-signal-type-card varsity-signal-type-card--siro">
              <span>Secondary / UI</span>
              <strong>Siro Semi Condensed</strong>
              <small>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz&nbsp;&nbsp;0123456789</small>
              <p>Clean. Strong. Great for stats, navigation, and body copy. Chivo Mono carries scores, stat rows, tables, timestamps, and metadata.</p>
            </article>
            <article className="varsity-signal-type-card varsity-signal-type-card--accent">
              <span>Accent / Decorative</span>
              <div className="varsity-signal-type-accent-grid">
                <div className="varsity-signal-type-accent varsity-signal-type-accent--pixel">
                  <strong>Varsity Pixel</strong>
                  <small>ABCDEFGHJKLMNPQRSTUVWXYZ<br />0123456789</small>
                </div>
                <div className="varsity-signal-type-accent varsity-signal-type-accent--druk">
                  <strong>Druk Condensed</strong>
                  <small>ABCDEFGHJKLMNPQRSTUVWXYZ<br />0123456789</small>
                </div>
                <div className="varsity-signal-type-accent varsity-signal-type-accent--marker">
                  <strong>Marker Script</strong>
                  <small>ABCDEFGHJKLMNPQRSTUVWXYZ<br />0123456789</small>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--textures" aria-labelledby="varsity-signal-textures">
          <div className="varsity-signal-section-heading">
            <span>05</span>
            <h2 id="varsity-signal-textures">Textures + Motifs</h2>
            <p>Analog broadcast collage built from local sports artifacts.</p>
          </div>
          <div className="varsity-signal-texture-grid">
            {VARSITY_SIGNAL_TEXTURES.map((texture) => (
              <article key={texture.name} className="varsity-signal-texture">
                <span className={`varsity-signal-texture__sample varsity-signal-texture__sample--${texture.className}`} />
                <strong>{texture.name}</strong>
              </article>
            ))}
          </div>
          <div className="varsity-signal-motif-row">
            <span className="varsity-signal-motif varsity-signal-motif--score">12:00</span>
            <span className="varsity-signal-motif varsity-signal-motif--marker">Senior</span>
            <span className="varsity-signal-motif varsity-signal-motif--barcode" />
            <span className="varsity-signal-motif varsity-signal-motif--tape">Game day</span>
            <span className="varsity-signal-motif varsity-signal-motif--chrome">P</span>
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--photo" aria-labelledby="varsity-signal-photo">
          <div className="varsity-signal-section-heading">
            <span>06</span>
            <h2 id="varsity-signal-photo">Photography Treatment</h2>
            <p>Requested visual effects applied as reusable image treatments: contrast, flash, grain, VHS, torn paper, and chromatic offset.</p>
          </div>
          <div className="varsity-signal-effects-grid">
            {visualEffects.map((effect) => (
              <article key={effect.number} className={`varsity-signal-effect-card varsity-signal-effect-card--${effect.className}`}>
                <figure className="varsity-signal-effect-card__media">
                  <img
                    src={getVarsitySignalSrc(baseUrl, effect.image)}
                    srcSet={getVarsitySignalSrcSet(baseUrl, effect.image)}
                    sizes="(max-width: 760px) 100vw, 28vw"
                    alt={effect.image.alt}
                    loading="lazy"
                  />
                </figure>
                <div className="varsity-signal-effect-card__copy">
                  <strong><span>{effect.number}.</span> {effect.name}</strong>
                  <p>{effect.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--components" aria-labelledby="varsity-signal-components">
          <div className="varsity-signal-section-heading">
            <span>07</span>
            <h2 id="varsity-signal-components">UI Components</h2>
            <p>Scoreboard language, recognition cards, ticket modules, and social-ready badges.</p>
          </div>
          <div className="varsity-signal-components-grid">
            <VarsitySignalScorebug />
            <VarsitySignalAthleteCard baseUrl={baseUrl} image={athleteImage} />
            <VarsitySignalTicket />
          </div>
          <div className="varsity-signal-badge-row">
            {VARSITY_SIGNAL_COMPONENTS.map((item) => (
              <span key={item.label} className={`varsity-signal-component-chip varsity-signal-component-chip--${item.className}`}>
                {item.label}
              </span>
            ))}
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--applications" aria-labelledby="varsity-signal-applications">
          <div className="varsity-signal-section-heading">
            <span>08</span>
            <h2 id="varsity-signal-applications">Application Examples</h2>
            <p>Game pages, athlete profiles, team hubs, sponsorship patches, and social formats.</p>
          </div>
          <div className="varsity-signal-application-grid">
            {VARSITY_SIGNAL_APPLICATIONS.map((item, index) => {
              const image = applicationImages[index];

              return (
                <article key={item.label} className="varsity-signal-application" style={{ "--signal-card-accent": item.accent }}>
                  {image && (
                    <img
                      src={getVarsitySignalSrc(baseUrl, image)}
                      srcSet={getVarsitySignalSrcSet(baseUrl, image)}
                      sizes="(max-width: 760px) 100vw, 24vw"
                      alt={image.alt}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--marketing" aria-labelledby="varsity-signal-marketing">
          <div className="varsity-signal-section-heading">
            <span>09</span>
            <h2 id="varsity-signal-marketing">Social + Email Assets</h2>
            <p>Reusable campaign surfaces for social posts, story templates, video thumbnails, and email headers.</p>
          </div>
          <div className="varsity-signal-marketing-grid">
            {marketingAssets.map((asset) => (
              <article key={`${asset.label}-${asset.title}`} className={`varsity-signal-marketing-card varsity-signal-marketing-card--${asset.className}`}>
                <img
                  src={getVarsitySignalSrc(baseUrl, asset.image)}
                  srcSet={getVarsitySignalSrcSet(baseUrl, asset.image)}
                  sizes="(max-width: 760px) 100vw, 30vw"
                  alt={asset.image.alt}
                  loading="lazy"
                />
                <div>
                  <span>{asset.label}</span>
                  <strong>{asset.title}</strong>
                  <small>{asset.meta}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="varsity-signal-panel varsity-signal-panel--motion" aria-labelledby="varsity-signal-motion">
          <div className="varsity-signal-section-heading">
            <span>10</span>
            <h2 id="varsity-signal-motion">Motion Language</h2>
            <p>Sports broadcast, not software demo: snap zooms, scoreboard flips, sticker pops, flash cuts, VHS glitches, ticker crawls, and kinetic type slams.</p>
          </div>
          <div className="varsity-signal-motion-grid">
            {VARSITY_SIGNAL_MOTION_REFERENCES.map((item) => (
              <article key={item.label} className={`varsity-signal-motion-card varsity-signal-motion-card--${item.className}`}>
                <div className="varsity-signal-motion-card__stage" aria-hidden="true">
                  <span className="varsity-signal-motion-card__frame varsity-signal-motion-card__frame--before" />
                  <span className="varsity-signal-motion-card__arrow">→</span>
                  <span className="varsity-signal-motion-card__frame varsity-signal-motion-card__frame--after" />
                </div>
                <div className="varsity-signal-motion-card__copy">
                  <small>{item.meta}</small>
                  <strong>{item.label}</strong>
                  <p>{item.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function GraystoneMaxPrepsHomePage({ isAuthenticated, onRequestSearch, onRequestSignIn, onNavigate }) {
  const baseUrl = import.meta.env.BASE_URL;
  const [homepageMode, setHomepageMode] = useState("personalized");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [sportFiltersOpen, setSportFiltersOpen] = useState(false);
  const [contentPreferences, setContentPreferences] = useState(MAXPREPS_CONTENT_PREFERENCE_DEFAULTS);
  const [sportFilters, setSportFilters] = useState(MAXPREPS_SPORT_FILTER_DEFAULTS);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState("all");
  const isNationalMode = homepageMode === "national";

  const followedTeams = useMemo(
    () => MAXPREPS_FOLLOWED_TEAMS.filter((team) => matchesSportFilters(team, sportFilters)),
    [sportFilters],
  );

  const followedPlayers = useMemo(
    () =>
      MAXPREPS_FOLLOWED_PLAYERS.filter((player) => {
        const team = MAXPREPS_FOLLOWED_TEAMS.find((item) => item.id === player.teamId);
        return matchesSportFilters({ ...player, sport: team?.sport }, sportFilters);
      }),
    [sportFilters],
  );

  const activeTeam =
    selectedTeam === "all"
      ? null
      : followedTeams.find((item) => item.id === selectedTeam) ?? null;
  const activePlayer =
    selectedPlayer === "all"
      ? null
      : followedPlayers.find((item) => item.id === selectedPlayer) ?? null;

  const contextualSelection = activePlayer ?? activeTeam;
  const hasActiveFilters = Boolean(activeTeam || activePlayer);

  const filteredPlayers = isNationalMode ? [] : followedPlayers.filter(
    (item) =>
      (selectedTeam === "all" || item.teamId === selectedTeam) &&
      (selectedPlayer === "all" || item.id === selectedPlayer),
  );
  const selectedPlayerTeamId =
    selectedPlayer === "all"
      ? "all"
      : followedPlayers.find((player) => player.id === selectedPlayer)?.teamId ?? "all";
  const playlistSource = isNationalMode ? MAXPREPS_VIDEO_PLAYLIST_NATIONAL : MAXPREPS_VIDEO_PLAYLIST;
  const filteredPlaylist = playlistSource.filter(
    (item) =>
      matchesSportFilters(item, sportFilters) &&
      (isNationalMode ||
        ((selectedTeam === "all" || item.teamId === selectedTeam) &&
          (selectedPlayer === "all" || selectedPlayerTeamId === item.teamId))),
  );
  const shelfVideos = [
    ...filteredPlaylist,
    ...playlistSource.filter((item) => !filteredPlaylist.some((filteredItem) => filteredItem.id === item.id)),
  ].slice(0, 4);
  const featuredVideo = filteredPlaylist[0] ?? playlistSource[0];
  const playlistItems = filteredPlaylist.slice(1);
  const filteredGames = (isNationalMode ? MAXPREPS_UPCOMING_GAMES_NATIONAL : MAXPREPS_UPCOMING_GAMES).filter(
    (item) =>
      matchesSportFilters(item, sportFilters) &&
      (isNationalMode || selectedTeam === "all" || item.teamId === selectedTeam),
  );
  const filteredNews = MAXPREPS_NEWS.filter(
    (item) =>
      matchesSportFilters(item, sportFilters) &&
      (isNationalMode || selectedTeam === "all" || item.teamId === selectedTeam),
  );
  const filteredScores = (isNationalMode ? MAXPREPS_SCORES_NATIONAL : MAXPREPS_SCORES).filter(
    (item) =>
      matchesSportFilters(item, sportFilters) &&
      (isNationalMode || selectedTeam === "all" || item.teamId === selectedTeam),
  );
  const textFeed = MAXPREPS_TEXT_FEED[homepageMode];
  const statsItems = MAXPREPS_STATS[homepageMode].filter((item) => matchesSportFilters(item, sportFilters));
  const rankingsModule = MAXPREPS_RANKINGS[homepageMode];
  const filteredRankingRows = rankingsModule.rows.filter((row) => matchesSportFilters(row, sportFilters));
  const showHighlights = contentPreferences.highlights;
  const showVideos = contentPreferences.videos;
  const showUpcomingGames = contentPreferences.upcomingGames;
  const showScores = contentPreferences.scores;
  const showNews = contentPreferences.news;
  const showStats = contentPreferences.stats;
  const showLoggedOutEmptyState = !isAuthenticated && !isNationalMode;
  const showEdgeAIBetaPrompt = false;
  const showNationalMarketingPanel = isNationalMode && !isAuthenticated;
  const canShowHomepageContent = isAuthenticated || isNationalMode;
  const hasHeroFeed = !isNationalMode && showHighlights && isAuthenticated;
  const hasRightHeroPanel = hasHeroFeed || showEdgeAIBetaPrompt || showNationalMarketingPanel;
  const showVideoShelf = showVideos && canShowHomepageContent && shelfVideos.length > 0;
  const showMiddleTop = (showUpcomingGames && filteredGames.length > 0) || filteredRankingRows.length > 0;
  const showMiddleBottom = (showScores && filteredScores.length > 0) || (showStats && statsItems.length > 0);
  const showNewsAfterVideos = isNationalMode && showNews && canShowHomepageContent && filteredNews.length > 0;

  useEffect(() => {
    if (!preferencesOpen && !sportFiltersOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreferencesOpen(false);
        setSportFiltersOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [preferencesOpen, sportFiltersOpen]);

  useEffect(() => {
    if (!isAuthenticated) {
      setSelectedTeam("all");
      setSelectedPlayer("all");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedTeam !== "all" && !followedTeams.some((team) => team.id === selectedTeam)) {
      setSelectedTeam("all");
    }
    if (selectedPlayer !== "all" && !followedPlayers.some((player) => player.id === selectedPlayer)) {
      setSelectedPlayer("all");
    }
  }, [followedPlayers, followedTeams, selectedPlayer, selectedTeam]);

  return (
    <section
      className="graystone-page graystone-page--maxpreps-home"
      aria-label="Graystone MaxPreps home page"
    >
      <div className="graystone-maxpreps-homepage">
        {preferencesOpen && (
          <div
            className="graystone-maxpreps-preferences-modal"
            role="presentation"
            onClick={() => setPreferencesOpen(false)}
          >
            <div
              className="graystone-maxpreps-preferences-modal__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="graystone-maxpreps-preferences-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="graystone-section__header graystone-section__header--maxpreps graystone-section__header--stacked">
                <div>
                  <span className="graystone-kicker graystone-kicker--dark">Content preferences</span>
                  <h3 id="graystone-maxpreps-preferences-title">Customize your homepage</h3>
                </div>
                <button type="button" onClick={() => setPreferencesOpen(false)}>
                  Done
                </button>
              </div>
              <p className="graystone-maxpreps-preferences-modal__copy">
                Choose which modules stay visible on the homepage. All content types are on by default.
              </p>
              <div className="graystone-maxpreps-preferences-modal__options">
                {MAXPREPS_CONTENT_PREFERENCES.map((option) => (
                  <label key={option.id} className="graystone-maxpreps-preferences-modal__option">
                    <input
                      type="checkbox"
                      checked={contentPreferences[option.id]}
                      onChange={() =>
                        setContentPreferences((current) => ({
                          ...current,
                          [option.id]: !current[option.id],
                        }))
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {sportFiltersOpen && (
          <div
            className="graystone-maxpreps-preferences-modal"
            role="presentation"
            onClick={() => setSportFiltersOpen(false)}
          >
            <div
              className="graystone-maxpreps-preferences-modal__dialog graystone-maxpreps-preferences-modal__dialog--filters"
              role="dialog"
              aria-modal="true"
              aria-labelledby="graystone-maxpreps-sport-filters-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="graystone-section__header graystone-section__header--maxpreps graystone-section__header--stacked">
                <div>
                  <span className="graystone-kicker graystone-kicker--dark">Filter by sport</span>
                  <h3 id="graystone-maxpreps-sport-filters-title">Refine the homepage feed</h3>
                </div>
                <button type="button" onClick={() => setSportFiltersOpen(false)}>
                  Done
                </button>
              </div>
              <p className="graystone-maxpreps-preferences-modal__copy">
                Adjust the homepage by sport, roster type, and level. All filters are on by default.
              </p>
              <div className="graystone-maxpreps-filter-groups">
                {Object.entries(MAXPREPS_SPORT_FILTER_OPTIONS).map(([group, options]) => (
                  <section key={group} className="graystone-maxpreps-filter-group">
                    <span className="graystone-kicker graystone-kicker--dark">
                      {group === "sports" ? "Sports" : group === "genders" ? "Gender" : "Level"}
                    </span>
                    <label className="graystone-maxpreps-filter-group__select-wrap">
                      <select
                        className="graystone-maxpreps-filter-group__select"
                        value={sportFilters[group]}
                        onChange={(event) =>
                          setSportFilters((current) => ({
                            ...current,
                            [group]: event.target.value,
                          }))
                        }
                      >
                        {options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}

        <section className="graystone-maxpreps-homepage__heading">
          <h1>Home of High School Sports</h1>
        </section>

        <section
          className={`graystone-maxpreps-homepage__hero${
            hasRightHeroPanel ? "" : " graystone-maxpreps-homepage__hero--solo"
          }`}
        >
          <div className="graystone-maxpreps-homepage__preferences">
            <div className="graystone-maxpreps-homepage__mode-panel">
              <div className="graystone-section__header graystone-section__header--maxpreps graystone-section__header--stacked">
                <div>
                  <span className="graystone-kicker graystone-kicker--dark">Homepage experience</span>
                </div>
              </div>
              <div className="graystone-maxpreps-homepage__mode-row">
                <div className="graystone-maxpreps-mode-toggle" role="tablist" aria-label="Homepage mode">
                  {Object.entries(MAXPREPS_HOME_MODES).map(([mode, config]) => (
                    <button
                      key={mode}
                      type="button"
                      className={`graystone-maxpreps-mode-toggle__button${homepageMode === mode ? " is-active" : ""}`}
                      onClick={() => setHomepageMode(mode)}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
                <div className="graystone-maxpreps-homepage__action-buttons">
                  <button
                    type="button"
                    className="graystone-maxpreps-preferences-trigger"
                    aria-haspopup="dialog"
                    aria-expanded={preferencesOpen}
                    onClick={() => {
                      setSportFiltersOpen(false);
                      setPreferencesOpen(true);
                    }}
                  >
                    <GraystoneIconList />
                    <span>Content preferences</span>
                  </button>
                  {isNationalMode && (
                    <button
                      type="button"
                      className="graystone-maxpreps-preferences-trigger graystone-maxpreps-preferences-trigger--filter"
                      aria-haspopup="dialog"
                      aria-expanded={sportFiltersOpen}
                      onClick={() => {
                        setPreferencesOpen(false);
                        setSportFiltersOpen(true);
                      }}
                    >
                      <GraystoneIconFilter />
                      <span>Filter by sport</span>
                    </button>
                  )}
                </div>
              </div>
              <p className="graystone-maxpreps-mode-toggle__description">
                {MAXPREPS_HOME_MODES[homepageMode].description}
              </p>
            </div>

            {!isNationalMode && (
              <div className={`graystone-maxpreps-context${showLoggedOutEmptyState ? " graystone-maxpreps-context--marketing" : ""}`}>
                {showLoggedOutEmptyState ? (
                  <div className="graystone-maxpreps-context__logged-out">
                    <div className="graystone-maxpreps-context__marketing">
                      <div className="graystone-maxpreps-context__marketing-options">
                        <section className="graystone-maxpreps-context__marketing-card">
                          <div className="graystone-maxpreps-context__badges" aria-hidden="true">
                            <span className="graystone-maxpreps-context__badge graystone-maxpreps-context__badge--team">
                              <img src={`${baseUrl}mascot-1.svg`} alt="" />
                            </span>
                            <span className="graystone-maxpreps-context__badge graystone-maxpreps-context__badge--team">
                              <img src={`${baseUrl}mascot-2.svg`} alt="" />
                            </span>
                            <span className="graystone-maxpreps-context__badge graystone-maxpreps-context__badge--player">
                              <img src={`${baseUrl}person-2.png`} alt="" />
                            </span>
                            <span className="graystone-maxpreps-context__badge graystone-maxpreps-context__badge--player">
                              <img src={`${baseUrl}person-3.png`} alt="" />
                            </span>
                          </div>
                          <div className="graystone-maxpreps-context__marketing-copy">
                            <h3>Search for your favorite players, teams, and sports</h3>
                            <p>
                              Start with search and shape the homepage around the programs, athletes,
                              and sports you care about most.
                            </p>
                          </div>
                          <div className="graystone-maxpreps-context__empty-actions">
                            <button
                              type="button"
                              className="graystone-maxpreps-context__empty-button"
                              onClick={() => onRequestSearch("general")}
                            >
                              <GraystoneIconSearch />
                              <span>Search</span>
                            </button>
                          </div>
                        </section>

                        <div className="graystone-maxpreps-context__marketing-divider" aria-hidden="true">
                          <span>Or</span>
                        </div>

                        <section className="graystone-maxpreps-context__marketing-card graystone-maxpreps-context__marketing-card--ai">
                          <div className="graystone-maxpreps-edge-ai">
                            <div className="graystone-maxpreps-edge-ai__label-row">
                              <span className="graystone-maxpreps-edge-ai__label">
                                <span>EDGE</span>
                                <sup>AI</sup>
                              </span>
                              <span className="graystone-maxpreps-edge-ai__beta">
                                Beta
                                <GraystoneIconInfo />
                              </span>
                            </div>
                            <p className="graystone-maxpreps-edge-ai__copy">
                              Converse with the AI to automatically build your homepage preferences.
                            </p>
                            <button type="button" className="graystone-maxpreps-edge-ai__field">
                              <span className="graystone-maxpreps-edge-ai__placeholder">
                                Type here to start chatting
                              </span>
                              <span className="graystone-maxpreps-edge-ai__send" aria-hidden="true">↑</span>
                            </button>
                          </div>
                        </section>
                      </div>

                      <section className="graystone-maxpreps-context__save-note">
                        <p>
                          Sign up for a free MaxPreps account to save your preferences across
                          browsers and devices. Without an account, your preferences still save
                          locally in this browser.
                        </p>
                      </section>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="graystone-section__header graystone-section__header--maxpreps">
                      <div>
                        <span className="graystone-kicker graystone-kicker--dark">Filters</span>
                      </div>
                      {isAuthenticated && hasActiveFilters && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTeam("all");
                            setSelectedPlayer("all");
                          }}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {hasActiveFilters ? (
                      <div className="graystone-maxpreps-context__applied">
                        <button
                          type="button"
                          className="graystone-maxpreps-chip graystone-maxpreps-chip--dismiss"
                          onClick={() => {
                            setSelectedTeam("all");
                            setSelectedPlayer("all");
                          }}
                        >
                          {activePlayer ? (
                            <GraystonePlayerMark player={activePlayer} size="sm" />
                          ) : activeTeam ? (
                            <GraystoneTeamMark team={activeTeam} size="sm" />
                          ) : null}
                          <span>{contextualSelection?.name}</span>
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                    ) : (
                      <>
                    <p className="graystone-maxpreps-context__empty">
                      No filters applied
                    </p>
                    <div className="graystone-maxpreps-context__group">
                      <span className="graystone-kicker graystone-kicker--dark">Teams</span>
                      <div className="graystone-maxpreps-chip-row">
                        {followedTeams.map((team) => (
                          <button
                            key={team.id}
                            type="button"
                            className="graystone-maxpreps-chip graystone-maxpreps-chip--team"
                            style={{ "--team-accent": team.accent }}
                            onClick={() => {
                              setSelectedTeam(team.id);
                              setSelectedPlayer("all");
                            }}
                          >
                            <GraystoneTeamMark team={team} size="sm" />
                            {team.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="graystone-maxpreps-context__group">
                      <span className="graystone-kicker graystone-kicker--dark">Players</span>
                      <div className="graystone-maxpreps-chip-row">
                        {followedPlayers.map((player) => (
                          <button
                            key={player.id}
                            type="button"
                            className="graystone-maxpreps-chip"
                            onClick={() => {
                              setSelectedPlayer(player.id);
                              setSelectedTeam("all");
                            }}
                          >
                            <GraystonePlayerMark player={player} size="sm" />
                            {player.name}
                          </button>
                        ))}
                      </div>
                    </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {showEdgeAIBetaPrompt && (
            <aside className="graystone-maxpreps-homepage__feed graystone-maxpreps-homepage__feed--edge-ai">
              <div className="graystone-maxpreps-edge-ai">
                <div className="graystone-maxpreps-edge-ai__label-row">
                  <span className="graystone-maxpreps-edge-ai__label">
                    EDGE<sup>AI</sup>
                  </span>
                  <span className="graystone-maxpreps-edge-ai__beta">
                    <span>Beta</span>
                    <GraystoneIconInfo />
                  </span>
                </div>
                <p className="graystone-maxpreps-edge-ai__copy">
                  Converse with the AI to automatically build your homepage preferences.
                </p>
                <button type="button" className="graystone-maxpreps-edge-ai__field">
                  <span className="graystone-maxpreps-edge-ai__placeholder">
                    Type here to start chatting
                  </span>
                  <span className="graystone-maxpreps-edge-ai__send" aria-hidden="true">↑</span>
                </button>
              </div>
            </aside>
          )}

          {showNationalMarketingPanel && (
            <aside className="graystone-maxpreps-homepage__feed graystone-maxpreps-homepage__feed--promo">
              <div className="graystone-maxpreps-promo">
                <h3>Personalize your homepage</h3>
                <p>
                  Start with teams and players you already care about, or use Edge AI to build a
                  custom homepage view for you. You do not need to sign up before trying it.
                </p>
                <div className="graystone-maxpreps-promo__actions">
                  <button
                    type="button"
                    className="graystone-maxpreps-promo__button graystone-maxpreps-promo__button--primary"
                    onClick={() => setHomepageMode("personalized")}
                  >
                    Personalize
                  </button>
                  <button
                    type="button"
                    className="graystone-maxpreps-promo__button"
                    onClick={() => {
                      if (!isAuthenticated) {
                        onRequestSignIn?.();
                      }
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </aside>
          )}

          {hasHeroFeed && (
            <aside className="graystone-maxpreps-homepage__feed">
              <div className="graystone-section__header graystone-section__header--maxpreps graystone-section__header--stacked">
                <div>
                  <span className="graystone-kicker graystone-kicker--dark">Your highlights</span>
                </div>
              </div>
              <div className="graystone-maxpreps-feed-list">
                {textFeed.map((item) => (
                  <article key={item.id} className="graystone-maxpreps-feed-item">
                    <strong>{item.title}</strong>
                  </article>
                ))}
              </div>
            </aside>
          )}
        </section>

        {showVideoShelf && (
          <section className="graystone-maxpreps-network-live" aria-label="Live now on the network">
            <div className="graystone-section__header graystone-section__header--maxpreps graystone-maxpreps-network-live__header">
              <div className="graystone-maxpreps-network-live__title">
                <GraystoneNfhsWordmark />
                <h3>Live now on the network</h3>
              </div>
              <button type="button">View all live and on-demand events</button>
            </div>
            <div className="graystone-maxpreps-network-live__layout">
              <article className="graystone-maxpreps-network-live__player">
                <div
                  className="graystone-maxpreps-network-live__video"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(18, 19, 23, 0.04), rgba(18, 19, 23, 0.28)), url(${baseUrl}track.png)` }}
                >
                  <span className="graystone-maxpreps-network-live__watermark" aria-hidden="true">
                    NFHS<br />Network
                  </span>
                  <span className="graystone-maxpreps-network-live__live-badge">Live</span>
                </div>
                <div className="graystone-maxpreps-network-live__details">
                  <span className="graystone-maxpreps-network-live__sport">
                    <FontAwesomeIcon icon={faVideo} />
                    Varsity Boys and Girls Track and Field
                  </span>
                  <h4>2026 NMAA 1A-3A Outdoor Track &amp; Field Championship Day 1 Pole Vault</h4>
                  <p>
                    <strong>May 8, 2026</strong>
                    <span>|</span>
                    <strong>8:00 AM MDT</strong>
                    <span>|</span>
                    <span>Albuquerque, NM</span>
                  </p>
                </div>
              </article>

              <aside className="graystone-maxpreps-network-live__rail-wrap">
                <div className="graystone-maxpreps-network-live__rail-header">
                  <h4>More matchups</h4>
                  <label className="graystone-maxpreps-network-live__search">
                    <GraystoneIconSearch />
                    <span>Search games...</span>
                  </label>
                </div>
                <div className="graystone-maxpreps-network-live__rail">
                  <div className="graystone-maxpreps-network-live__matchups">
                    {MAXPREPS_NETWORK_MATCHUPS.map((matchup) => (
                      <button key={matchup.id} type="button" className="graystone-maxpreps-network-live__matchup">
                        <span className="graystone-maxpreps-network-live__matchup-tag">
                          <FontAwesomeIcon icon={faBaseball} />
                          {matchup.sport}
                        </span>
                        <span className="graystone-maxpreps-network-live__matchup-teams">
                          <GraystoneTeamMark team={matchup.teams[0]} size="sm" />
                          <span aria-hidden="true">/</span>
                          <GraystoneTeamMark team={matchup.teams[1]} size="sm" />
                          <strong>{matchup.teams[0].name} vs {matchup.teams[1].name}</strong>
                        </span>
                        <span className="graystone-maxpreps-network-live__matchup-meta graystone-maxpreps-network-live__matchup-meta--time">
                          <span>
                            <FontAwesomeIcon icon={faCalendarDay} />
                            {matchup.time}
                          </span>
                          <span className={`graystone-maxpreps-network-live__matchup-status${matchup.status !== "Live" ? " graystone-maxpreps-network-live__matchup-status--muted" : ""}`}>
                            {matchup.status}
                          </span>
                        </span>
                        <span className="graystone-maxpreps-network-live__matchup-meta">
                          <FontAwesomeIcon icon={faLocationDot} />
                          {matchup.location}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}

        {showVideoShelf && (
          <section className="graystone-maxpreps-video-shelf">
            <div className="graystone-section__header graystone-section__header--maxpreps">
              <h3>Watch next</h3>
              <button type="button">More videos</button>
            </div>
            <div className="graystone-maxpreps-video-shelf__grid">
              {shelfVideos.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="graystone-maxpreps-video-shelf__item"
                  onClick={() => onNavigate("graystone-maxpreps-videos")}
                >
                  <span
                    className="graystone-maxpreps-playlist__thumb graystone-maxpreps-video-shelf__thumb"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                    aria-hidden="true"
                  >
                    <span className="graystone-maxpreps-playlist__duration">{item.meta.split(" · ")[0]}</span>
                    <span className="graystone-maxpreps-playlist__scrim">
                      <span className="graystone-maxpreps-playlist__play" aria-hidden="true" />
                    </span>
                  </span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </section>
        )} 

        {showNewsAfterVideos && (
          <section className="graystone-maxpreps-panel graystone-maxpreps-panel--news">
            <div className="graystone-section__header graystone-section__header--maxpreps">
              <h3>Trending stories</h3>
              <button type="button">More posts</button>
            </div>
            <div className="graystone-maxpreps-news-list">
              <GraystoneMaxPrepsNewsSection stories={filteredNews} />
            </div>
          </section>
        )}

        {showMiddleTop && canShowHomepageContent && (
          <section
            className={`graystone-maxpreps-grid graystone-maxpreps-grid--top${
              showUpcomingGames ? "" : " graystone-maxpreps-grid--single"
            }`}
          >
            {showUpcomingGames && filteredGames.length > 0 && (
              <div className="graystone-maxpreps-column">
                <section className="graystone-maxpreps-panel">
                  <div className="graystone-section__header graystone-section__header--maxpreps">
                    <h3>Upcoming games</h3>
                    <button type="button">See schedule</button>
                  </div>
                  <div className="graystone-maxpreps-game-list">
                    {filteredGames.map((game, index) => (
                      <article
                        key={game.id}
                        className={`graystone-maxpreps-game-card${index === 0 ? " graystone-maxpreps-game-card--featured" : ""}`}
                      >
                        <div className={`graystone-maxpreps-card-layout${index === 0 ? " graystone-maxpreps-card-layout--featured" : ""}`}>
                          <div className="graystone-maxpreps-card-layout__top">
                            <div className="graystone-maxpreps-card-layout__body">
                              {index === 0 && (
                                <p
                                  className="graystone-maxpreps-game-card__featured-message"
                                  aria-label="Game of the Week"
                                >
                                  <span>Game</span>
                                  <span>of the</span>
                                  <span>Week</span>
                                </p>
                              )}
                              <p className="graystone-maxpreps-game-card__eyebrow">
                                <span>Varsity</span>
                                <span aria-hidden="true">•</span>
                                <span>{game.sport.replace(/^Varsity\s+/i, "")}</span>
                                <span aria-hidden="true">•</span>
                                <span>{game.gameType}</span>
                              </p>
                              <div className="graystone-maxpreps-matchup">
                                <div className="graystone-maxpreps-matchup__teams">
                                  {game.teams.map((team) => (
                                    <div key={team.name} className="graystone-maxpreps-matchup__row">
                                      <GraystoneTeamMark team={team} />
                                      <div className="graystone-maxpreps-matchup__team-copy">
                                        <strong>{team.name}</strong>
                                        <span>{team.record}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="graystone-maxpreps-matchup__meta">
                                  <span>{game.status}</span>
                                  <button type="button" className="graystone-maxpreps-matchup__ghost-action">
                                    Preview game
                                    <span aria-hidden="true">›</span>
                                  </button>
                                </div>
                              </div>
                              <div className="graystone-maxpreps-game-card__actions">
                                <button type="button" className="graystone-maxpreps-cta graystone-maxpreps-cta--outline-heavy graystone-maxpreps-cta--stream">Stream live</button>
                                <button type="button" className="graystone-maxpreps-cta graystone-maxpreps-cta--subtle">Buy tickets</button>
                              </div>
                            </div>
                            <div className="graystone-maxpreps-card-layout__media">
                              <div
                                className="graystone-maxpreps-card-thumb graystone-maxpreps-card-thumb--game"
                                style={{ backgroundImage: `url(${baseUrl}thumbnail-${index + 4}.png)` }}
                                aria-hidden="true"
                              >
                                <span className="graystone-maxpreps-card-thumb__duration">2:09</span>
                                <span className="graystone-maxpreps-card-thumb__scrim">
                                  <span className="graystone-maxpreps-card-thumb__play" aria-hidden="true" />
                                </span>
                              </div>
                              <span className="graystone-maxpreps-card-layout__label">Featured game video</span>
                            </div>
                          </div>
                          <div className="graystone-maxpreps-game-card__bottom">
                            <div className="graystone-maxpreps-game-card__footer">
                              <span>{game.footer}</span>
                              <button type="button" className="graystone-maxpreps-link-action">{game.footerAction}</button>
                            </div>
                            <div className="graystone-maxpreps-prediction">
                              <p className="graystone-maxpreps-prediction__copy">
                                <span className="graystone-maxpreps-prediction__pulse" aria-hidden="true">
                                  <GraystoneIconWavePulse />
                                </span>
                                <span className="graystone-maxpreps-prediction__value">{game.prediction.probability}</span>{" "}
                                {game.prediction.summary} for {game.prediction.team}.
                                <span className="graystone-maxpreps-prediction__info" aria-hidden="true">
                                  <GraystoneIconInfo />
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {filteredRankingRows.length > 0 && (
              <div className="graystone-maxpreps-column">
                <section className="graystone-maxpreps-panel graystone-maxpreps-panel--rankings">
                  <div className="graystone-section__header graystone-section__header--maxpreps graystone-section__header--rankings">
                    <div>
                      <h3>{rankingsModule.title}</h3>
                      <p>Last updated: {rankingsModule.updated}</p>
                    </div>
                    <button type="button">All rankings</button>
                  </div>
                  <div className="graystone-maxpreps-rankings">
                    <div className="graystone-maxpreps-rankings__header">
                      <span>#</span>
                      <span>Team</span>
                      <span>Ovr.</span>
                      <span>Str.</span>
                    </div>
                    <div className="graystone-maxpreps-rankings__rows">
                      {filteredRankingRows.map((team) => (
                        <article key={team.rank} className="graystone-maxpreps-rankings__row">
                          <span className="graystone-maxpreps-rankings__rank">{team.rank}</span>
                          <div className="graystone-maxpreps-rankings__team">
                            <GraystoneTeamMark team={team} />
                            <strong>{team.name}</strong>
                          </div>
                          <span className="graystone-maxpreps-rankings__record">{team.record}</span>
                          <span className="graystone-maxpreps-rankings__strength">{team.strength}</span>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </section>
        )}

        {showMiddleBottom && canShowHomepageContent && (
          <section
            className={`graystone-maxpreps-grid graystone-maxpreps-grid--bottom${
              showScores && showStats ? "" : " graystone-maxpreps-grid--single"
            }`}
          >
            {showScores && filteredScores.length > 0 && (
              <div className="graystone-maxpreps-column">
                <section className="graystone-maxpreps-panel">
                  <div className="graystone-section__header graystone-section__header--maxpreps">
                    <h3>Scores</h3>
                    <button type="button">Open scores</button>
                  </div>
                  <div className="graystone-maxpreps-score-list">
                    {filteredScores.map((game, index) => (
                      <article key={game.id} className="graystone-maxpreps-score-card">
                        <div className="graystone-maxpreps-card-layout graystone-maxpreps-card-layout--score">
                          <div className="graystone-maxpreps-card-layout__body">
                            <div className="graystone-maxpreps-matchup">
                              <div className="graystone-maxpreps-matchup__teams">
                                {game.teams.map((team) => (
                                  <div key={team.name} className="graystone-maxpreps-matchup__row graystone-maxpreps-matchup__row--score">
                                    <GraystoneTeamMark team={team} />
                                    <div className="graystone-maxpreps-matchup__team-copy graystone-maxpreps-matchup__team-copy--score">
                                      <strong>{team.name}</strong>
                                      <span>{team.record}</span>
                                    </div>
                                    <em>{team.score}</em>
                                  </div>
                                ))}
                              </div>
                              <div
                                className={`graystone-maxpreps-matchup__meta graystone-maxpreps-matchup__meta--score ${
                                  game.teams[0].score > game.teams[1].score
                                    ? "graystone-maxpreps-matchup__meta--winner-top"
                                    : game.teams[1].score > game.teams[0].score
                                      ? "graystone-maxpreps-matchup__meta--winner-bottom"
                                      : ""
                                }`}
                              >
                                <span>{game.date}</span>
                                <strong>{game.status}</strong>
                              </div>
                            </div>
                            <div className="graystone-maxpreps-score-card__actions">
                              <button type="button" className="graystone-maxpreps-cta graystone-maxpreps-cta--score-primary">Watch highlights</button>
                              <button type="button" className="graystone-maxpreps-cta graystone-maxpreps-cta--score-secondary">See box score</button>
                            </div>
                          </div>
                          <div className="graystone-maxpreps-card-layout__media graystone-maxpreps-card-layout__media--score">
                            <div
                              className="graystone-maxpreps-card-thumb graystone-maxpreps-card-thumb--score"
                              style={{ backgroundImage: `url(${baseUrl}thumbnail-${index + 4}.png)` }}
                              aria-hidden="true"
                            >
                              <span className="graystone-maxpreps-card-thumb__duration">1:12</span>
                              <span className="graystone-maxpreps-card-thumb__scrim">
                                <span className="graystone-maxpreps-card-thumb__play" aria-hidden="true" />
                              </span>
                            </div>
                            <span className="graystone-maxpreps-card-layout__label">Game highlights</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {showStats && statsItems.length > 0 && (
              <div className="graystone-maxpreps-column">
                <section className="graystone-maxpreps-panel graystone-maxpreps-panel--stats">
                  <div className="graystone-section__header graystone-section__header--maxpreps">
                <h3>Stats</h3>
                    <button type="button">Open stats</button>
                  </div>
                  <div className="graystone-maxpreps-stats-grid">
                    {statsItems.map((item) => {
                      const [beforeSubject = "", afterSubject = ""] = item.sentence.split(item.subject);

                      return (
                        <article key={item.id} className="graystone-maxpreps-stat-update">
                          <p className="graystone-maxpreps-stat-update__sentence">
                            {beforeSubject}
                            <button type="button" className="graystone-maxpreps-stat-update__subject">
                              {item.subject}
                            </button>
                            {afterSubject}
                          </p>
                          <div className="graystone-maxpreps-stat-update__preview">
                            {item.preview.map((stat) => (
                              <div key={stat.label} className="graystone-maxpreps-stat-update__tile">
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                              </div>
                            ))}
                          </div>
                          <div className="graystone-maxpreps-stat-update__links">
                            {item.links.map((link) => (
                              <button
                                key={link.label}
                                type="button"
                                className={`graystone-maxpreps-stat-update__link${
                                  link.kind === "secondary" ? " graystone-maxpreps-stat-update__link--secondary" : ""
                                }`}
                              >
                                {link.label}
                              </button>
                            ))}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}
          </section>
        )}

        {showNews && canShowHomepageContent && !showNewsAfterVideos && filteredNews.length > 0 && (
          <section className="graystone-maxpreps-panel graystone-maxpreps-panel--news">
            <div className="graystone-section__header graystone-section__header--maxpreps">
              <h3>Trending stories</h3>
              <button type="button">More posts</button>
            </div>
            <div className="graystone-maxpreps-news-list">
              <GraystoneMaxPrepsNewsSection stories={filteredNews} />
            </div>
          </section>
        )}

        <GraystoneMaxPrepsFooter />
      </div>
    </section>
  );
}

function GraystoneWatchPage() {
  return (
    <section className="graystone-page graystone-page--watch graystone-watch-page" aria-label="Graystone watch page">
      <div className="graystone-watch-page__inner">
        <aside className="graystone-watch-page__channels" aria-label="Video categories">
          <h1>Video</h1>
          <div className="graystone-watch-page__channel-list">
            {WATCH_PAGE_CHANNELS.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`graystone-watch-page__channel-button${index === 0 ? " is-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <div className="graystone-watch-page__main">
          <article className="graystone-watch-player-card">
            <div className="graystone-watch-player-card__badges">
              <span className="graystone-badge graystone-badge--live">{WATCH_PAGE_FEATURED_VIDEO.badge}</span>
              <span className="graystone-badge graystone-badge--watch">{WATCH_PAGE_FEATURED_VIDEO.detail}</span>
            </div>
            <div
              className="graystone-watch-player-card__surface"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 9, 12, 0.04), rgba(8, 9, 12, 0.42)), url(${WATCH_PAGE_FEATURED_VIDEO.thumbnail})` }}
            >
              <span className="graystone-watch-player-card__duration">{WATCH_PAGE_FEATURED_VIDEO.duration}</span>
              <button type="button" className="graystone-watch-player-card__play" aria-label="Play featured video">
                <span className="graystone-watch-player-card__play-icon"></span>
              </button>
            </div>

            <div className="graystone-watch-player-card__details">
              <h2>{WATCH_PAGE_FEATURED_VIDEO.title}</h2>
              <div className="graystone-watch-player-card__meta">
                <span>{WATCH_PAGE_FEATURED_VIDEO.date}</span>
                <span>{WATCH_PAGE_FEATURED_VIDEO.duration}</span>
              </div>
              <p>{WATCH_PAGE_FEATURED_VIDEO.description}</p>
            </div>
          </article>
        </div>

        <aside className="graystone-watch-page__sidebar">
          <div className="graystone-watch-page__playlist">
            <div className="graystone-watch-page__playlist-header">
              <h2>Watch next</h2>
              <span>{WATCH_PAGE_PLAYLIST.length} videos</span>
            </div>
            <div className="graystone-watch-page__playlist-items">
              {WATCH_PAGE_PLAYLIST.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={`graystone-watch-page__playlist-item${index === 0 ? " is-active" : ""}`}
                >
                  <span
                    className="graystone-watch-page__playlist-thumb"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 9, 12, 0.08), rgba(8, 9, 12, 0.42)), url(${video.thumbnail})` }}
                  >
                    <span className="graystone-watch-page__playlist-duration">{video.duration}</span>
                    <span className="graystone-watch-page__playlist-play" aria-hidden="true"></span>
                  </span>
                  <span className="graystone-watch-page__playlist-copy">
                    <strong>{video.title}</strong>
                    <span>{video.detail}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <GraystoneMaxPrepsFooter />
    </section>
  );
}

function GraystoneScoresPage() {
  return (
    <section className="graystone-page graystone-page--scores" aria-label="Graystone scores page">
      <div className="graystone-page-copy">
        <span className="graystone-kicker">Scores</span>
        <h1>Scoreboards tuned for live context and faster scanning.</h1>
        <p>
          This page is reserved for the scoreboard and game-state views that sit beside watch,
          highlights, and editorial coverage in the Graystone prototype.
        </p>
      </div>
      <div className="graystone-scores-grid">
        {SCORE_ROWS.map((row) => (
          <article key={row.matchup} className={`graystone-score-row graystone-score-row--${row.tone}`}>
            <span>{row.time}</span>
            <strong>{row.matchup}</strong>
            <em>{row.tag}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function GraystoneProgramsPage() {
  return (
    <section className="graystone-page graystone-page--programs" aria-label="Graystone programs page">
      <div className="graystone-page-copy">
        <span className="graystone-kicker">Programs</span>
        <h1>Program identity systems that flex across media, scores, and school experiences.</h1>
        <p>
          This page gives us a place to prototype themed program cards, rankings modules, and school
          profile states without depending on the main portfolio shell.
        </p>
      </div>
      <div className="graystone-program-grid">
        {PROGRAM_CARDS.map((card) => (
          <article key={card.title} className="graystone-program-card">
            <span className="graystone-program-card__accent" style={{ "--graystone-accent": card.accent }}></span>
            <strong>{card.title}</strong>
            <p>{card.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function GraystoneStudioPage() {
  return (
    <section className="graystone-page graystone-page--studio" aria-label="Graystone studio page">
      <div className="graystone-page-copy">
        <span className="graystone-kicker">Studio</span>
        <h1>The prototype workspace for design language, product patterns, and interaction systems.</h1>
        <p>
          Graystone is where we can rebuild the product shell with a new visual language while
          keeping the behaviors we know matter: discovery, navigation, search, and live-state depth.
        </p>
      </div>
      <div className="graystone-studio-grid">
        {STUDIO_MODULES.map((module) => (
          <article key={module.label} className="graystone-studio-card">
            <strong>{module.label}</strong>
            <p>{module.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GraystoneExperience({
  currentPage,
  isAuthenticated,
  loginReturnPage,
  onAuthChange,
  onLoginReturnPageChange,
  onNavigate,
  onExit,
}) {
  return (
    <GraystoneShell
      currentPage={currentPage}
      isAuthenticated={isAuthenticated}
      loginReturnPage={loginReturnPage}
      onAuthChange={onAuthChange}
      onLoginReturnPageChange={onLoginReturnPageChange}
      onNavigate={onNavigate}
      onExit={onExit}
    />
  );
}
