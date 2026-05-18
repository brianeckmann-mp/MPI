import { useEffect, useId, useRef, useState } from "react";
import { Agentation } from "agentation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { initShowcase } from "./showcase";
import { GraystoneExperience, GRAYSTONE_PAGES, VarsitySignalStyleGuidePage } from "./graystone";
import { GraystoneIconHome } from "./graystone-icons";
import { VARSITY_SIGNAL_IMAGES } from "./varsity-signal-assets";

const NAV_ITEMS = ["index", "AI", "system", "brand", "projects", "about"];
const VARSITY_SIGNAL_PAGES = [
  "varsity-signal",
  "varsity-signal-style-guide",
  "varsity-signal-team-page",
  "varsity-signal-home-page",
  "varsity-signal-about-page",
];
const MDS_PAGES = [
  "mds",
  "mds-foundations",
  "mds-foundations-brand",
  "mds-foundations-colors",
  "mds-foundations-type",
  "mds-foundations-motifs",
  "mds-foundations-photography",
  "mds-foundations-motion",
  "mds-foundations-spacing",
  "mds-components",
  "mds-patterns",
  "mds-resources",
];
const STANDALONE_PAGES = [...GRAYSTONE_PAGES, ...VARSITY_SIGNAL_PAGES, ...MDS_PAGES, "unified-playon-design", "maxpreps-gameday-rush"];
const ALL_PAGES = [...NAV_ITEMS, ...STANDALONE_PAGES];
const TEAM_THEMES = [
  { name: "Red", primary: "#CC0022", secondary: "#8F0018", dark: "#52000E" },
  { name: "Pink", primary: "#CD0066", secondary: "#A30052", dark: "#5A002D" },
  { name: "Orange", primary: "#D5350B", secondary: "#A92A09", dark: "#611806" },
  { name: "Yellow", primary: "#FFCC05", secondary: "#C8880A", dark: "#503604" },
  { name: "Purple", primary: "#754ACC", secondary: "#5E3BA5", dark: "#2F1D52" },
  { name: "Blue", primary: "#046DFF", secondary: "#034CB2", dark: "#022C66" },
  { name: "Teal", primary: "#1580A5", secondary: "#116885", dark: "#0A3543" },
  { name: "Green", primary: "#00824B", secondary: "#005B34", dark: "#00341E" },
  { name: "Turquoise", primary: "#108073", secondary: "#0C665B", dark: "#07342F" },
];

const getVarsitySignalImageAsset = (id) => VARSITY_SIGNAL_IMAGES.find((image) => image.id === id);

const getVarsitySignalImageSrc = (baseUrl, id, width = 1600) => {
  const image = getVarsitySignalImageAsset(id);
  if (!image) return "";
  const variant = image.variants.find((item) => item.width === width) ?? image.variants.at(-1);
  return `${baseUrl}${variant?.src ?? image.src}`;
};

const ACALANES_TEAM_PAGE = {
  school: "Acalanes",
  mascot: "Dons",
  sport: "Varsity Boys Football",
  season: "Fall 25-26",
  location: "Lafayette, CA",
  coach: "Joel Isaac",
  league: "Diablo - Foothill",
  section: "North Coast Section",
  division: "Division 5",
  divisionCode: "D5",
  record: "10-3",
  leagueRecord: "5-0",
  followers: "606",
  lastUpdated: "Jan 20, 2026",
  address: "1200 Pleasant Hill Rd, Lafayette, CA",
  phone: "(925) 280-3970",
  primary: "#022C66",
  secondary: "#ffffff",
  accent: "#f2b820",
  mascotPath: "mascot-4.svg",
  teamPhoto: "https://image-development.maxpreps.io/team-photo/d3f943a6-448f-4f26-8754-84299a3d7201/e/6/0/d3f943a6-448f-4f26-8754-84299a3d7201_e6042da9-e5ce-4f18-a841-ae5e6cf48015.jpg?version=639044554471450390",
  video: {
    title: "11/21 Highlights @ Cardinal Newman",
    description: "Boys varsity football highlights @ Cardinal Newman on November 21, 2025",
    meta: "PlayOn · Sat, Nov 22 2025 · 3:28 · 5 views",
    thumbnail: "https://delivery.vod.nfhsnetwork.com/postprocessor_v2/69216e74555d0f2ece05be6d/ppv2_20251122152433551477.jpg",
  },
  schedule: [
    { date: "Nov 7", opponent: "Las Lomas", location: "@", context: "Final", result: "W", score: "40-28", accent: "#8F0018", mascot: "mascot-1.svg" },
    { date: "Nov 14", opponent: "Marin Catholic", location: "vs", context: "NCS D1/Open", result: "W", score: "51-21", accent: "#022C66", mascot: "mascot-8.svg" },
    { date: "Nov 21", opponent: "Cardinal Newman", location: "@", context: "NCS D1/Open", result: "L", score: "17-52", accent: "#CC0022", mascot: "mascot-10.svg" },
  ],
  leaders: [
    { name: "Finley Rivera", role: "WR, FS · Jr.", label: "Receiving Yards Per Game", header: "Y/G", value: "86.2" },
    { name: "Josh Elerts", role: "RB, DE · Sr.", label: "Rushing Yards Per Game", header: "Y/G", value: "100.8" },
    { name: "Josh Elerts", role: "RB, DE · Sr.", label: "Total TDs", header: "Tot", value: "15" },
    { name: "Finley Rivera", role: "WR, FS · Jr.", label: "Tackles Per Game", header: "Tckl/G", value: "5.2" },
    { name: "Bryce Birdsong", role: "DE · Sr.", label: "Sacks", header: "Sak", value: "11.0" },
    { name: "Grant Ricker", role: "WR, SS · Sr.", label: "Interceptions", header: "Int", value: "7" },
    { name: "Tyler Winkles", role: "QB · Jr.", label: "Passing TDs", header: "TD Passes", value: "28" },
    { name: "Finley Rivera", role: "WR, FS · Jr.", label: "Receiving TDs", header: "Rec", value: "14" },
  ],
  performers: [
    { stat: "Rushing Yards", value: "1,210", header: "Yds", athlete: "Josh Elerts", rank: "#12 in North Coast Section" },
    { stat: "Receiving Yards", value: "1,034", header: "Yds", athlete: "Finley Rivera", rank: "#5 in North Coast Section" },
    { stat: "Sacks", value: "11.0", header: "Sak", athlete: "Bryce Birdsong", rank: "#5 in North Coast Section" },
  ],
  rankings: [
    { label: "California", value: "98", movement: "+4" },
    { label: "North Coast Section", value: "12", movement: "+2" },
    { label: "Division 5", value: "3", movement: "Hold" },
  ],
  staff: [
    { name: "Joel Isaac", role: "Head Coach" },
    { name: "Jeff", role: "Assistant Coach" },
    { name: "Roman", role: "Assistant Coach" },
    { name: "Andres", role: "Statistician" },
  ],
  nearbyTeams: [
    "Castlemont",
    "Elite",
    "Encinal",
    "Menlo-Atherton",
    "Oakland",
    "Oakland Tech",
    "Skyline",
    "Saint Ignatius College Prep",
  ],
  updates: [
    { type: "News", date: "Dec 5, 2025", title: "Football Recap: Acalanes Falls Short of Cardinal Newman in the Playoffs + How To Watch", source: "Team Reports", action: "Read Article" },
    { type: "News", date: "Nov 26, 2025", title: "Northern California high school football rankings, notes: De La Salle headed to Open final; Pitt, Cardinal Newman battle in NCS D1 final", source: "Staff Report", action: "Read Article" },
    { type: "Stats", date: "Nov 21, 2025", title: "Stats have been entered for the Acalanes vs. Cardinal Newman on Friday, Nov. 21, 2025.", source: "Game Stats · Season Stats", action: "View Stats" },
    { type: "Scores", date: "Nov 21, 2025", title: "Acalanes lost their at Cardinal Newman HS game against Cardinal Newman High School by a score of 17-52.", source: "Final", action: "Box Score" },
    { type: "News", date: "Nov 17, 2025", title: "Football Game Preview: Acalanes Dons vs. Cardinal Newman Cardinals + Official Tickets", source: "Team Reports", action: "Read Article" },
    { type: "Photos", date: "Nov 17, 2025", title: "Photographer Bill Bill has posted a new gallery Marin Catholic @ Acalanes (NCS D1 Semifinal) containing 69 photos.", source: "Pro Photos", action: "All Photos" },
    { type: "Photos", date: "Nov 16, 2025", title: "Photographer Sam Sam has posted a new gallery Acalanes @ Las Lomas (Senior Night) containing 232 photos.", source: "Pro Photos", action: "All Photos" },
    { type: "News", date: "Nov 15, 2025", title: "Football Recap: Acalanes Skates Past Marin Catholic with Ease", source: "Team Reports", action: "Read Article" },
    { type: "Stats", date: "Nov 14, 2025", title: "Stats have been entered for the Acalanes vs. Marin Catholic on Friday, Nov. 14, 2025.", source: "Game Stats · Season Stats", action: "View Stats" },
    { type: "Scores", date: "Nov 14, 2025", title: "Acalanes won their at Acalanes HS game against Marin Catholic High School by a score of 51-21.", source: "Final", action: "Box Score" },
    { type: "News", date: "Nov 13, 2025", title: "Northern California high school football rankings, notes: De La Salle looks to be Open Division representative", source: "Staff Report", action: "Read Article" },
    { type: "News", date: "Nov 12, 2025", title: "Football Game Preview: Acalanes Dons vs. Marin Catholic Wildcats + Official Tickets", source: "Team Reports", action: "Read Article" },
  ],
};

function getPageFromHash() {
  const rawHash = window.location.hash.replace(/^#/, "");
  const normalized = rawHash.toLowerCase();
  if (normalized === "unified-playon-design") {
    return "graystone-home";
  }
  if (normalized === "graystone-varsity-signal") {
    return "varsity-signal-style-guide";
  }
  if (normalized === "maxpreps-design-system" || normalized === "mds") {
    return "mds-foundations-brand";
  }
  if (normalized === "mds-foundations") {
    return "mds-foundations-brand";
  }
  return ALL_PAGES.find((item) => item.toLowerCase() === normalized) ?? "index";
}

function MaxPrepsLogo({ fill = "#E10500" }) {
  return (
    <svg
      width="145"
      height="42"
      viewBox="0 0 145 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.3651 0H53.5175L51.6556 6.57706C53.2317 7.08306 54.377 8.60687 54.377 10.4124C54.377 12.6307 52.6482 14.4273 50.5156 14.4273C48.3829 14.4273 46.6541 12.6283 46.6541 10.41C46.6541 8.58961 47.8189 7.05872 49.4153 6.56574L47.5372 0H39.666L45.9536 19.763L39.0278 41.1765H47.0645L50.5392 29.9817L53.9902 41.1765H62.0033L55.1249 19.7988L61.3651 0Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.7676 10.4889C47.7676 12.1164 49.013 13.4357 50.5493 13.4357C52.0856 13.4357 53.331 12.1164 53.331 10.4889C53.331 8.86148 52.0856 7.54199 50.5493 7.54199C49.013 7.54199 47.7676 8.86148 47.7676 10.4889Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M143.972 14.2915L144.988 10.6762L142.128 8.06555H132.673L128.513 10.6764L126.456 17.7287L134.902 20.249L134.174 22.7815H132.498L133.149 20.5175H125.676L124.447 24.7955L127.514 27.734H136.508L140.875 24.9718L143.097 17.2458L134.796 14.7936L135.32 13.018H136.999L136.632 14.2915H143.972Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M118.091 16.8385H116.363L117.488 13.018H119.155L118.091 16.8385ZM127.221 10.7243L124.331 8.06555H111.514L105.876 27.734H113.234L114.971 21.6495H120.502L124.846 19.0356L127.221 10.7243Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.2897 21.791L99.8141 19.9515H105.457L106.958 14.8575H101.335L101.85 13.018H108.802L110.151 8.06555H95.7559L90.1006 27.734H104.478L106.178 21.791H99.2897Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.87 15.7065H83.0959L83.868 13.018H85.6391L84.87 15.7065ZM89.0919 17.6669L92.1648 15.776L93.5595 10.7941L90.7074 8.06555H77.8018L72.1616 27.734H79.6265L81.8726 19.9515H83.6519L81.4157 27.734H88.7197L91.0775 19.512L89.0919 17.6669Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.6602 16.8005C66.6602 16.8005 64.911 16.8289 64.908 16.8289L65.9984 13.018H67.7475L66.6602 16.8005ZM75.7251 10.7338L72.9087 8.06555H60.3557L56.6338 19.7393L59.2557 27.734H61.7376L63.5282 21.6495H68.9529L73.3495 19.0805L75.7251 10.7338Z"
        fill={fill}
      />
      <mask id="mask0_home_logo" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="8" width="45" height="20">
        <path d="M0 8.06555H44.3639V27.734H0V8.06555Z" fill="white" />
      </mask>
      <g mask="url(#mask0_home_logo)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.5072 19.8123L37.4542 13.018H38.0135L37.2196 19.8246L34.5072 19.8123ZM41.8821 27.734L44.364 19.7795L40.7461 8.06555H33.9582L24.8809 26.5418L29.9366 8.06555H19.9088L14.5454 18.9742L15.3922 8.06555H5.40094L0 27.734H6.12454L9.4752 15.6782L9.17387 27.734H15.3254L21.6721 15.6782L18.2683 27.734H31.6493L32.9885 24.5576L36.5905 24.563L36.1737 27.734H41.8821Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

function MaxPrepsWordmark({ fill = "#E10500" }) {
  const maskId = useId().replace(/:/g, "");

  return (
    <svg
      width="235"
      height="66"
      viewBox="0 0 235 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.4537 0H86.7352L83.7176 10.5233C86.272 11.3329 88.1282 13.771 88.1282 16.6599C88.1282 20.2091 85.3263 23.0837 81.87 23.0837C78.4136 23.0837 75.6118 20.2053 75.6118 16.656C75.6118 13.7434 77.4995 11.294 80.0867 10.5052L77.0431 0H64.2862L74.4764 31.6208L63.252 65.8824H76.2769L81.9083 47.9707L87.5014 65.8824H100.488L89.3404 31.6781L99.4537 0Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.417 16.7821C77.417 19.3862 79.4355 21.4971 81.9253 21.4971C84.4151 21.4971 86.4336 19.3862 86.4336 16.7821C86.4336 14.1783 84.4151 12.0671 81.9253 12.0671C79.4355 12.0671 77.417 14.1783 77.417 16.7821Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M233.334 22.8664L234.981 17.0819L230.346 12.9048H215.022L208.28 17.0821L204.947 28.3659L218.635 32.3983L217.454 36.4504H214.739L215.793 32.828H203.683L201.691 39.6727L206.661 44.3744H221.238L228.315 39.9548L231.917 27.5932L218.462 23.6697L219.313 20.8288H222.033L221.438 22.8664H233.334Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M191.389 26.9416H188.588L190.412 20.8288H193.113L191.389 26.9416ZM206.186 17.1588L201.503 12.9048H180.729L171.593 44.3744H183.516L186.332 34.6392H195.297L202.336 30.4569L206.186 17.1588Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M160.918 34.8656L161.767 31.9224H170.912L173.345 23.772H164.232L165.067 20.8288H176.334L178.52 12.9048H155.19L146.025 44.3744H169.326L172.081 34.8656H160.918Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M137.548 25.1304H134.673L135.924 20.8288H138.794L137.548 25.1304ZM144.39 28.2669L149.371 25.2415L151.631 17.2705L147.009 12.9048H126.093L116.952 44.3744H129.05L132.69 31.9224H135.574L131.95 44.3744H143.787L147.608 31.2192L144.39 28.2669Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108.035 26.8807C108.035 26.8807 105.2 26.9262 105.196 26.9262L106.963 20.8288H109.797L108.035 26.8807ZM122.727 17.174L118.162 12.9048H97.8177L91.7856 31.5828L96.0349 44.3744H100.057L102.959 34.6392H111.751L118.877 30.5287L122.727 17.174Z"
        fill={fill}
      />
      <mask id={maskId} style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="12" width="72" height="33">
        <path d="M0 12.9048H71.9002V44.3744H0V12.9048Z" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55.9255 31.6996L60.7016 20.8288H61.6081L60.3213 31.7193L55.9255 31.6996ZM67.8778 44.3744L71.9003 31.6471L66.0368 12.9048H55.0358L40.3241 42.4667L48.5179 12.9048H32.2659L23.5737 30.3587L24.946 12.9048H8.75324L0 44.3744H9.92597L15.3564 25.0851L14.868 44.3744H24.8377L35.1238 25.0851L29.6073 44.3744H51.2937L53.4642 39.2922L59.3018 39.3008L58.6263 44.3744H67.8778Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

function IntroGate({ state, onDismiss, currentPage }) {
  const baseUrl = import.meta.env.BASE_URL;
  const [logoRect, setLogoRect] = useState(null);

  useEffect(() => {
    if (currentPage !== "index") {
      setLogoRect(null);
      return undefined;
    }

    let frameId = 0;

    const measure = () => {
      const node = document.querySelector("[data-home-logo]");
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      setLogoRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
      });
    };

    const scheduleMeasure = () => {
      frameId = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [currentPage]);

  return (
    <button
      type="button"
      className={`intro-gate${state === "opening" ? " is-opening" : ""}`}
      onClick={onDismiss}
      aria-label="Enter MaxPreps Design"
    >
      <div className="intro-gate__content">
        <div className="intro-gate__inner">
          <div className="intro-gate__hero">
            <div className="intro-gate__copy">
              <div
                className={`intro-gate__logo${logoRect ? " intro-gate__logo--measured" : ""}`}
                aria-label="MaxPreps"
                style={
                  logoRect
                    ? {
                        left: `${logoRect.left}px`,
                        top: `${logoRect.top}px`,
                        width: `${logoRect.width}px`,
                      }
                    : undefined
                }
              >
                <MaxPrepsLogo fill="#ffffff" />
              </div>
              <div className="intro-gate__spacer" aria-hidden="true">
                The pulse of high school sports.
              </div>
            </div>

            <div className="intro-gate__art">
              <img src={`${baseUrl}intro.png`} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
        <span className="intro-gate__hint">Click anywhere to enter</span>
      </div>
    </button>
  );
}

function EditorialBackdrop({
  variant,
  number,
  leftEyebrow,
  leftValue,
  leftMeta,
  rightEyebrow,
  rightValue,
  rightMeta,
  hidePanel = false,
}) {
  return (
    <div className={`editorial-art editorial-art--${variant}`} aria-hidden="true">
      <div className="editorial-art__grid">
        <span className="editorial-art__line editorial-art__line--v1"></span>
        <span className="editorial-art__line editorial-art__line--v2"></span>
        <span className="editorial-art__line editorial-art__line--v3"></span>
        <span className="editorial-art__line editorial-art__line--h1"></span>
        <span className="editorial-art__line editorial-art__line--h2"></span>
        <span className="editorial-art__line editorial-art__line--h3"></span>
      </div>
      <div className="editorial-art__dotfield"></div>
      <div className="editorial-art__sweep editorial-art__sweep--one"></div>
      <div className="editorial-art__sweep editorial-art__sweep--two"></div>
      <div className="editorial-art__axis editorial-art__axis--diag"></div>
      <div className="editorial-art__axis editorial-art__axis--soft"></div>
      <div className="editorial-art__arc"></div>
      {hidePanel ? null : (
        <div className="editorial-art__panel">
          <div className="editorial-art__panel-lines"></div>
          <div className="editorial-art__panel-slash"></div>
        </div>
      )}
      <div className="editorial-art__play">
        <span className="editorial-art__play-mark editorial-art__play-mark--o1"></span>
        <span className="editorial-art__play-mark editorial-art__play-mark--o2"></span>
        <span className="editorial-art__play-mark editorial-art__play-mark--x1"></span>
        <span className="editorial-art__play-line editorial-art__play-line--one"></span>
        <span className="editorial-art__play-line editorial-art__play-line--two"></span>
      </div>
      <div className="editorial-art__number">{number}</div>
      <div className="editorial-art__data editorial-art__data--left">
        <span className="editorial-art__eyebrow">{leftEyebrow}</span>
        <span className="editorial-art__value">{leftValue}</span>
        <span className="editorial-art__meta">{leftMeta}</span>
      </div>
      <div className="editorial-art__data editorial-art__data--right">
        <span className="editorial-art__eyebrow">{rightEyebrow}</span>
        <span className="editorial-art__value">{rightValue}</span>
        <span className="editorial-art__meta">{rightMeta}</span>
      </div>
      <div className="editorial-art__route editorial-art__route--one"></div>
      <div className="editorial-art__route editorial-art__route--two"></div>
      <div className="editorial-art__mark"></div>
    </div>
  );
}

function SystemComponentBackdrop() {
  return (
    <div className="system-canvas" aria-hidden="true">
      <div className="system-canvas__grid">
        <span className="system-canvas__line system-canvas__line--v1"></span>
        <span className="system-canvas__line system-canvas__line--v2"></span>
        <span className="system-canvas__line system-canvas__line--h1"></span>
        <span className="system-canvas__line system-canvas__line--h2"></span>
      </div>

      <div className="system-card system-card--tokens">
        <span className="system-card__label">Tokens</span>
        <div className="system-tokens">
          <span className="system-token system-token--accent"></span>
          <span className="system-token"></span>
          <span className="system-token"></span>
          <span className="system-token"></span>
        </div>
      </div>

      <div className="system-card system-card--tabs">
        <span className="system-card__label">Tabs</span>
        <div className="system-tabs">
          <span className="system-tabs__item system-tabs__item--active"></span>
          <span className="system-tabs__item"></span>
          <span className="system-tabs__item"></span>
        </div>
        <div className="system-lines">
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="system-card system-card--toggle">
        <span className="system-card__label">Controls</span>
        <div className="system-toggleRow">
          <span className="system-toggle system-toggle--on"></span>
          <span className="system-toggleLabel"></span>
        </div>
        <div className="system-toggleRow">
          <span className="system-check"></span>
          <span className="system-toggleLabel system-toggleLabel--short"></span>
        </div>
      </div>

      <div className="system-card system-card--pagination">
        <span className="system-card__label">Navigation</span>
        <div className="system-pagination">
          <span></span>
          <span></span>
          <span className="system-pagination__active"></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

function AiPage() {
  useEffect(() => {
    const cleanup = initShowcase();
    return cleanup;
  }, []);

  return (
    <>
      <div className="global-dots" id="globalDots" aria-hidden="true"></div>

      <aside className="progress-rail progress-rail--ai" aria-label="Section progress">
        <div className="progress-rail__count progress-rail__count--ai" aria-live="polite">
          <span id="aiProgressCurrent">01</span>
          <span>/</span>
          <span>06</span>
        </div>
        <div className="progress-rail__track">
          <div className="progress-rail__fill" id="progressFill"></div>
        </div>
        <div className="progress-rail__points">
          {["Intro", "Motion", "Intelligence", "Insights", "Edge", "Pulse"].map(
            (label, index) => (
              <button
                key={label}
                className={`progress-rail__point${index === 0 ? " is-active" : ""}`}
                data-target={index}
                type="button"
              >
                <span className="progress-rail__bullet"></span>
                <span className="progress-rail__label">{label}</span>
              </button>
            ),
          )}
        </div>
      </aside>

      <main className="scene-rail" id="sceneRail">
        <section className="scene scene--intro is-active" data-scene="intro" aria-label="Intro">
          <div className="scene__inner">
            <div className="intro-stage">
              <div className="shape-anchor shape-anchor--intro" data-anchor="intro">
                <div className="brand-mark brand-mark--intro">
                  <svg viewBox="0 0 152 200" aria-hidden="true">
                    <use href="#maxpreps-mark"></use>
                  </svg>
                </div>
              </div>
              <div className="intro-copy">
                <h1>MaxPreps AI</h1>
              </div>
              <button className="scroll-cue" id="scrollCue" type="button" aria-label="Scroll to continue">
                <span>Scroll to continue</span>
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <use href="#icon-chevron"></use>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="scene scene--manifesto" data-scene="manifesto" aria-label="Manifesto">
          <div className="scene__inner">
            <div className="scene-layout scene-layout--manifesto">
              <div className="shape-anchor shape-anchor--row" data-anchor="manifesto"></div>
              <div className="scene-copy">
                <p className="scene-label">Concept Space</p>
                <h2>Designed for motion</h2>
                <p>Representing the platform that powers high school sports</p>
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--brand" data-scene="intelligence" aria-label="MaxPreps Intelligence">
          <div className="scene__inner">
            <div className="scene-layout scene-layout--brand">
              <div className="shape-anchor shape-anchor--brand" data-anchor="intelligence"></div>
              <div className="scene-copy scene-copy--brand">
                <div className="brand-lockup">
                  <h2>
                    <span>MaxPreps</span> <strong>Intelligence</strong>
                  </h2>
                  <svg className="brand-lockup__icon" viewBox="0 0 64 64" aria-hidden="true">
                    <use href="#icon-spark"></use>
                  </svg>
                </div>
                <p className="brand-lockup__subcopy">
                  Access over 24 years of high school sports data
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--brand" data-scene="insights" aria-label="MaxPreps Insights">
          <div className="scene__inner">
            <div className="scene-layout scene-layout--brand">
              <div className="shape-anchor shape-anchor--brand" data-anchor="insights"></div>
              <div className="scene-copy scene-copy--brand">
                <div className="brand-lockup">
                  <h2>
                    <span>MaxPreps</span> <strong>Insights</strong>
                  </h2>
                  <svg className="brand-lockup__icon" viewBox="0 0 64 64" aria-hidden="true">
                    <use href="#icon-network"></use>
                  </svg>
                </div>
                <p className="brand-lockup__subcopy">
                  Make sense of the moments, metrics, and momentum
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--brand" data-scene="edge" aria-label="MaxPreps Edge">
          <div className="scene__inner">
            <div className="scene-layout scene-layout--brand">
              <div className="shape-anchor shape-anchor--brand" data-anchor="edge"></div>
              <div className="scene-copy scene-copy--brand">
                <div className="brand-lockup">
                  <h2>
                    <span>MaxPreps</span> <strong>Edge</strong>
                  </h2>
                  <svg className="brand-lockup__icon" viewBox="0 0 64 64" aria-hidden="true">
                    <use href="#icon-edge"></use>
                  </svg>
                </div>
                <p className="brand-lockup__subcopy">
                  Personalized experiences that adapt to your interests
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--brand" data-scene="pulse" aria-label="MaxPreps Pulse">
          <div className="scene__inner">
            <div className="scene-layout scene-layout--brand">
              <div className="shape-anchor shape-anchor--brand" data-anchor="pulse"></div>
              <div className="scene-copy scene-copy--brand">
                <div className="brand-lockup">
                  <h2>
                    <span>MaxPreps</span> <strong>Pulse</strong>
                  </h2>
                  <svg className="brand-lockup__icon" viewBox="0 0 64 64" aria-hidden="true">
                    <use href="#icon-pulse"></use>
                  </svg>
                </div>
                <p className="brand-lockup__subcopy">
                  Get the right context in the moment you need it
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function HomePage() {
  const baseUrl = import.meta.env.BASE_URL;
  const railRef = useRef(null);
  const [artMissing, setArtMissing] = useState(false);
  const [storyMissing, setStoryMissing] = useState(false);
  const [hypeMissing, setHypeMissing] = useState(false);
  const [athletesMissing, setAthletesMissing] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const homeScenes = ["Intro", "Story", "Hype", "Scale"];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return undefined;
    }

    const handleScroll = () => {
      const viewport = rail.clientHeight || window.innerHeight;
      const nextScene = Math.max(0, Math.min(homeScenes.length - 1, Math.round(rail.scrollTop / viewport)));
      setCurrentScene(nextScene);
    };

    handleScroll();
    rail.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      rail.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [homeScenes.length]);

  const scrollToScene = (index) => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollTo({
      top: index * rail.clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <aside className="progress-rail progress-rail--home" aria-label="Index page progress">
        <div className="progress-rail__track">
          <div
            className="progress-rail__fill"
            style={{
              height: `${(currentScene / Math.max(1, homeScenes.length - 1)) * 100}%`,
              width: `${(currentScene / Math.max(1, homeScenes.length - 1)) * 100}%`,
              "--progress": `${(currentScene / Math.max(1, homeScenes.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
        <div className="progress-rail__count" aria-live="polite">
          <span>{String(currentScene + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(homeScenes.length).padStart(2, "0")}</span>
        </div>
      </aside>

      <main className="scene-rail scene-rail--home" ref={railRef}>
      <section className="scene scene--home-hero is-active" aria-label="Home hero">
        <div className="scene__inner scene__inner--home">
          <div className="home-hero">
            <div className="home-hero__artwork" aria-hidden="true">
              <div className="home-grid">
                <span className="home-grid__line home-grid__line--v1"></span>
                <span className="home-grid__line home-grid__line--v2"></span>
                <span className="home-grid__line home-grid__line--v3"></span>
                <span className="home-grid__line home-grid__line--h1"></span>
                <span className="home-grid__line home-grid__line--h2"></span>
                <span className="home-grid__line home-grid__line--h3"></span>
              </div>
              <div className="home-dotfield"></div>
              <div className="home-sweep home-sweep--one"></div>
              <div className="home-sweep home-sweep--two"></div>
              <div className="home-data-arc"></div>
              <div className="home-axis home-axis--diag"></div>
              <div className="home-axis home-axis--soft"></div>
              <div className="home-panel">
                <div className="home-panel__lines"></div>
                <div className="home-panel__slash"></div>
              </div>
              <div className="home-index-number">001</div>
              <div className="home-data home-data--left">
                <span className="home-data__eyebrow">Live Graph</span>
                <span className="home-data__value">Win Prob.</span>
                <span className="home-data__meta">68.4%</span>
              </div>
              <div className="home-data home-data--right">
                <span className="home-data__eyebrow">Tracking</span>
                <span className="home-data__value">Play Speed</span>
                <span className="home-data__meta">21.7 mph</span>
              </div>
              <div className="home-route home-route--one"></div>
              <div className="home-route home-route--two"></div>
              <div className="home-mark home-mark--cross"></div>
              <div className="home-mark home-mark--dot"></div>
            </div>

            <div className="home-hero__copy">
              <div className="home-logo" aria-label="MaxPreps" data-home-logo>
                <MaxPrepsLogo />
              </div>
              <h1>The pulse of high school sports.</h1>
            </div>

            <div className="home-hero__art" aria-label="Athlete cutout stage">
              <div className="home-hero__art-shell">
                <img
                  className={`home-hero__image${artMissing ? " is-hidden" : ""}`}
                  src={`${baseUrl}home-index.png`}
                  alt="Football players competing for a catch"
                  onError={() => setArtMissing(true)}
                />
                <div className={`home-hero__art-frame${artMissing ? " is-visible" : ""}`}>
                  <span>Add `public/home-index.png`</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scene scene--home-story" aria-label="Home story">
        <div className="scene__inner scene__inner--home scene__inner--art">
          <EditorialBackdrop
            variant="story"
            number="2-1"
            leftEyebrow="Storyline"
            leftValue="Team Arc"
            leftMeta="Archive"
            rightEyebrow="Coverage"
            rightValue="Season Thread"
            rightMeta="Play-by-play"
          />
          <div className="index-story-scene">
            <h2>
              Every team has a <span className="copy-accent">story</span>.
            </h2>
            <div className="index-story-scene__frame">
              <img
                className={`index-story-scene__image${storyMissing ? " is-hidden" : ""}`}
                src={`${baseUrl}index-story.png`}
                alt="Team celebration story collage"
                onError={() => setStoryMissing(true)}
              />
              <div className={`index-story-scene__fallback${storyMissing ? " is-visible" : ""}`}>
                <span>Add `public/index-story.png`</span>
              </div>
            </div>
            <p>We&rsquo;re here to share it.</p>
          </div>
        </div>
      </section>

      <section className="scene scene--home-next" aria-label="Home next placeholder">
        <div className="scene__inner scene__inner--home scene__inner--art">
          <EditorialBackdrop
            variant="hype"
            number="24-17"
            leftEyebrow="Signals"
            leftValue="Crowd Heat"
            leftMeta="Live"
            rightEyebrow="Momentum"
            rightValue="Hype Index"
            rightMeta="92%"
          />
          <div className="index-hype-scene">
            <p className="index-hype-scene__copy index-hype-scene__copy--left">
              We don&rsquo;t create the <span className="copy-accent">moments</span>.
            </p>
            <div className="index-hype-scene__frame">
              <img
                className={`index-hype-scene__image${hypeMissing ? " is-hidden" : ""}`}
                src={`${baseUrl}index-hype.png`}
                alt="Fans and team hype moment"
                onError={() => setHypeMissing(true)}
              />
              <div className={`index-hype-scene__fallback${hypeMissing ? " is-visible" : ""}`}>
                <span>Add `public/index-hype.png`</span>
              </div>
            </div>
            <p className="index-hype-scene__copy index-hype-scene__copy--right">Only the hype.</p>
          </div>
        </div>
      </section>

      <section className="scene scene--home-athletes" aria-label="Every score matters">
        <div className="scene__inner scene__inner--home scene__inner--art">
          <EditorialBackdrop
            variant="scale"
            number="25-23"
            leftEyebrow="Scale"
            leftValue="Game Log"
            leftMeta="National"
            rightEyebrow="Network"
            rightValue="Athlete Graph"
            rightMeta="Realtime"
          />
          <div className="index-athletes-scene">
            <div className="index-athletes-scene__layout">
              <div className="index-athletes-scene__imageWrap">
                <img
                  className={`index-athletes-scene__image${athletesMissing ? " is-hidden" : ""}`}
                  src={`${baseUrl}index-athletes.png`}
                  alt="Multiple athletes across sports"
                  onError={() => setAthletesMissing(true)}
                />
                <div className={`index-athletes-scene__fallback${athletesMissing ? " is-visible" : ""}`}>
                  <span>Add `public/index-athletes.png`</span>
                </div>
              </div>

              <div className="index-athletes-scene__content">
                <h2>Every. Score. Matters.</h2>
                <div className="index-athletes-scene__stats" aria-label="MaxPreps scale">
                  <div className="index-athletes-scene__stat">
                    <strong>514,000+</strong>
                    <span>teams</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>2.3 million+</strong>
                    <span>games</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>3.5 million+</strong>
                    <span>athletes</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>188,000+</strong>
                    <span>coaches</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>11,500+</strong>
                    <span>ADs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

function SystemPage() {
  const baseUrl = import.meta.env.BASE_URL;
  const railRef = useRef(null);
  const [headerMissing, setHeaderMissing] = useState(false);
  const [scoreboardMissing, setScoreboardMissing] = useState(false);
  const [rosterMissing, setRosterMissing] = useState(false);
  const [mobileMissing, setMobileMissing] = useState(false);
  const [newsMissing, setNewsMissing] = useState(false);
  const [diagramMissing, setDiagramMissing] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(TEAM_THEMES[5]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return undefined;
    }

    const handleScroll = () => {
      const viewport = rail.clientHeight || window.innerHeight;
      const nextScene = Math.max(0, Math.min(3, Math.round(rail.scrollTop / viewport)));
      setCurrentScene(nextScene);
    };

    handleScroll();
    rail.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      rail.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const systemThemeStyle = {
    "--system-theme-primary": selectedTheme.primary,
    "--system-theme-secondary": selectedTheme.secondary,
    "--system-theme-dark": selectedTheme.dark,
  };
  const systemProgress = (currentScene / 3) * 100;

  return (
    <>
      <aside className="progress-rail progress-rail--home progress-rail--system" aria-label="System page progress">
        <div className="progress-rail__track">
          <div
            className="progress-rail__fill"
            style={{
              height: `${systemProgress}%`,
              width: `${systemProgress}%`,
              "--progress": `${systemProgress}%`,
            }}
          ></div>
        </div>
        <div className="progress-rail__count" aria-live="polite">
          <span>{String(currentScene + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>04</span>
        </div>
      </aside>

      <main className="scene-rail scene-rail--home" ref={railRef}>
        <section className="scene scene--system-hero is-active" aria-label="System hero">
          <div className="scene__inner scene__inner--home scene__inner--art">
            <SystemComponentBackdrop />
            <div className="system-hero">
              <div className="system-hero__copy">
                <h1>MaxPreps Design System</h1>
              </div>

              <div className="system-hero__media">
                <img
                  className={`system-hero__image${headerMissing ? " is-hidden" : ""}`}
                  src={`${baseUrl}headers.png`}
                  alt="MaxPreps design system headers"
                  onError={() => setHeaderMissing(true)}
                />
                <div className={`system-hero__fallback${headerMissing ? " is-visible" : ""}`}>
                  <span>Add `public/headers.png`</span>
                </div>
              </div>

              <p className="system-hero__subcopy">Built for every team, designed for every fan.</p>
            </div>
          </div>
        </section>

        <section className="scene scene--system-story" aria-label="System story">
          <div className="scene__inner scene__inner--home">
            <div className="system-story">
              <div className="system-story__copy">
                <h2>
                  Built for the complexity of high school sports and to unify experiences across
                  platforms, products, and moments.
                </h2>
                <p>
                  It brings together the principles, patterns, components, and product thinking
                  that help teams move faster while creating experiences that feel unmistakably
                  MaxPreps.
                </p>
              </div>

              <div className="system-story__media">
                <div className="system-story__asset system-story__asset--scoreboard">
                  <img
                    className={scoreboardMissing ? "is-hidden" : ""}
                    src={`${baseUrl}system-scene2-scoreboard.png`}
                    alt="Live game scoreboard component"
                    onError={() => setScoreboardMissing(true)}
                  />
                  <div className={`system-story__fallback${scoreboardMissing ? " is-visible" : ""}`}>
                    <span>Add `public/system-scene2-scoreboard.png`</span>
                  </div>
                </div>

                <div className="system-story__assetGrid">
                  <div className="system-story__asset system-story__asset--roster">
                    <img
                      className={rosterMissing ? "is-hidden" : ""}
                      src={`${baseUrl}system-scene2-roster.png`}
                      alt="Roster and tabs component"
                      onError={() => setRosterMissing(true)}
                    />
                    <div className={`system-story__fallback${rosterMissing ? " is-visible" : ""}`}>
                      <span>Add `public/system-scene2-roster.png`</span>
                    </div>
                  </div>

                  <div className="system-story__asset system-story__asset--app">
                    <img
                      className={mobileMissing ? "is-hidden" : ""}
                      src={`${baseUrl}system-scene2-app.png`}
                      alt="App team experience component"
                      onError={() => setMobileMissing(true)}
                    />
                    <div className={`system-story__fallback${mobileMissing ? " is-visible" : ""}`}>
                      <span>Add `public/system-scene2-app.png`</span>
                    </div>
                  </div>
                </div>

                <div className="system-story__asset system-story__asset--news">
                  <img
                    className={newsMissing ? "is-hidden" : ""}
                    src={`${baseUrl}system-scene2-news.png`}
                    alt="News and article component"
                    onError={() => setNewsMissing(true)}
                  />
                  <div className={`system-story__fallback${newsMissing ? " is-visible" : ""}`}>
                    <span>Add `public/system-scene2-news.png`</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--system-reach" aria-label="System reach">
          <div className="scene__inner scene__inner--home">
            <div className="system-reach">
              <div className="system-reach__media">
                <img
                  className={`system-reach__image${diagramMissing ? " is-hidden" : ""}`}
                  src={`${baseUrl}diagram.png?v=20260325-1`}
                  alt="Diagram showing the reach of the MaxPreps design system"
                  onError={() => setDiagramMissing(true)}
                />
                <div className={`system-story__fallback${diagramMissing ? " is-visible" : ""}`}>
                  <span>Add `public/diagram.png`</span>
                </div>
              </div>

              <div className="system-reach__copy">
                <h2>Design system reach</h2>
                <p>
                  Extends across web, native apps, product ecosystems, brand identity, marketing,
                  and AI experiences—connecting every touchpoint through one shared visual and
                  product foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--system-theme" aria-label="System theming playground">
          <div className="scene__inner scene__inner--home">
            <div className="system-theme" style={systemThemeStyle}>
              <div className="system-theme__header">
                <h2>Themed component sets for school and team experiences</h2>
              </div>

              <div className="system-theme__layout">
                <div className="system-theme__selectors" aria-label="Team color selectors">
                  <div className="team-palette">
                    {TEAM_THEMES.map((theme) => {
                      const isActive = theme.name === selectedTheme.name;
                      return (
                      <button
                        key={theme.name}
                        type="button"
                        className={`team-palette__swatch${isActive ? " is-active" : ""}`}
                        onClick={() => setSelectedTheme(theme)}
                        aria-pressed={isActive}
                        aria-label={`Apply ${theme.name} theme`}
                      >
                        <span
                          className="team-palette__chip"
                          style={{ backgroundColor: theme.primary }}
                        >
                          {isActive ? (
                            <svg
                              className="team-palette__icon"
                              viewBox="0 0 64 64"
                              aria-hidden="true"
                            >
                              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" />
                              <path d="M32 5V59" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                              <path d="M5 32H59" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                              <path d="M14 13C22 18 27 24 29 32C27 40 22 46 14 51" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M50 13C42 18 37 24 35 32C37 40 42 46 50 51" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </span>
                      </button>
                      );
                    })}
                  </div>
                </div>

                <div className="system-theme__components">
                  <div className="system-preview system-preview--buttons">
                    <div className="system-button-group">
                      <button className="system-button-group__item is-active" type="button">
                        Latest Videos
                      </button>
                      <button className="system-button-group__item" type="button">
                        Team Overview
                      </button>
                      <button className="system-button-group__item system-button-group__item--link" type="button">
                        Contribute
                      </button>
                    </div>
                  </div>

                  <div className="system-preview system-preview--loader">
                    <div className="system-loader">
                      <span className="system-loader__track"></span>
                      <span className="system-loader__fill"></span>
                    </div>
                  </div>

                  <div className="system-preview system-preview--stats">
                    <div className="system-stat-strip">
                      {[
                        ["YDS", "472"],
                        ["AVG", "34.5"],
                        ["Y/G", "50.2"],
                        ["REC", "35"],
                        ["TDS", "12"],
                      ].map(([label, value]) => (
                        <div key={label} className="system-stat-strip__item">
                          <span className="system-stat-strip__label">{label}</span>
                          <strong className="system-stat-strip__value">{value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="system-preview system-preview--input">
                    <label className="system-edge-input">
                      <span className="system-edge-input__label">
                        EDGE <sup>AI</sup>
                      </span>
                      <span className="system-edge-input__field">
                        <span className="system-edge-input__placeholder">
                          Any stat, score, or story across high school sports
                        </span>
                        <span className="system-edge-input__send">↑</span>
                      </span>
                    </label>
                  </div>

                  <div className="system-preview system-preview--tabs">
                    <div className="system-tabs-bar">
                      {["Thu Jun 30", "Fri Jul 1", "Today", "Sun Jul 3", "Mon Jul 4"].map((label, index) => (
                        <button
                          key={label}
                          className={`system-tabs-bar__item${index === 2 ? " is-active" : ""}`}
                          type="button"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <main className="scene-rail scene-rail--home">
      <section className="scene scene--about-hero is-active" aria-label="About MaxPreps">
        <div className="scene__inner scene__inner--home scene__inner--art">
          <EditorialBackdrop
            variant="about"
            number="2002"
            leftEyebrow="Archive"
            leftValue="Founded"
            leftMeta="California"
            rightEyebrow="Coverage"
            rightValue="High School Sports"
            rightMeta="National"
            hidePanel
          />
          <div className="about-hero">
            <div className="about-hero__mark" aria-label="MaxPreps">
              <MaxPrepsWordmark />
            </div>
            <p className="about-hero__subcopy">Established in 2002</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectsPage({ onOpenProject }) {
  const cards = [
    {
      title: "Unified PlayOn Design",
      meta: "Project Graystone",
      description: "A unified design vision and experience for the PlayOn product portfolio",
      action: () => onOpenProject("graystone-home"),
    },
    {
      title: "Varsity Signal",
      meta: "Standalone project",
      description: "A dedicated MaxPreps design system workspace for the style guide, team page, home page, and about page.",
      action: () => onOpenProject("varsity-signal"),
    },
    {
      title: "MaxPreps Design System (MDS)",
      meta: "Design system",
      description: "A product design system hub for foundations, components, patterns, and resources across MaxPreps experiences.",
      action: () => onOpenProject("mds-foundations-brand"),
    },
    {
      title: "MaxPreps GameDay Rush",
      meta: "Project #4 / Browser game",
      description: "A Phaser 3 high school football runner prototype with MaxPreps-inspired branding, live ticker, HUD, spirit meter, and end-game badges.",
      action: () => onOpenProject("maxpreps-gameday-rush"),
    },
  ];

  return (
    <main className="scene-rail scene-rail--home">
      <section className="scene scene--projects is-active" aria-label="Projects">
        <div className="scene__inner scene__inner--home">
          <div className="projects-page">
            {cards.map((card) => {
              const isInteractive = Boolean(card.action);
              const Tag = isInteractive ? "button" : "div";

              return (
                <Tag
                  key={card.title}
                  className={`project-card${isInteractive ? " is-link" : ""}${card.disabled ? " is-disabled" : ""}`}
                  type={isInteractive ? "button" : undefined}
                  onClick={card.action}
                >
                  <p className="project-card__meta">{card.meta}</p>
                  <h2>{card.title}</h2>
                  {card.description ? (
                    <p className="project-card__description">{card.description}</p>
                  ) : null}
                </Tag>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

const VARSITY_SIGNAL_PROJECT_NAV = [
  {
    id: "varsity-signal-style-guide",
    title: "Style Guide",
    eyebrow: "Current system",
    description: "The working Varsity Signal foundations page: palette, type, image treatment, UI components, applications, social, and email assets.",
  },
  {
    id: "varsity-signal-team-page",
    title: "Team Page",
    eyebrow: "Next page",
    description: "A team-specific branding surface for school colors, mascot expression, game modules, top performers, and season story blocks.",
  },
  {
    id: "varsity-signal-home-page",
    title: "Home Page",
    eyebrow: "Next page",
    description: "The Varsity Signal consumer-facing home concept: live games, trending moments, athlete recognition, and local discovery.",
  },
  {
    id: "varsity-signal-about-page",
    title: "About Page",
    eyebrow: "Next page",
    description: "A clear story page for what Varsity Signal is, why it exists, and how it should show up across MaxPreps surfaces.",
  },
];

function VarsitySignalProjectIndex({ onNavigate }) {
  return (
    <section className="varsity-signal-project-index" aria-labelledby="varsity-signal-project-title">
      <div className="varsity-signal-project-index__hero">
        <span>Standalone project</span>
        <h1 id="varsity-signal-project-title">
          Varsity
          <em>Signal</em>
        </h1>
        <p>
          A dedicated workspace for the new MaxPreps style system, separated from Project Graystone so the language can grow into product pages, marketing surfaces, and school-specific branding.
        </p>
      </div>
      <div className="varsity-signal-project-index__grid">
        {VARSITY_SIGNAL_PROJECT_NAV.map((item) => (
          <button key={item.id} type="button" className="varsity-signal-project-card" onClick={() => onNavigate(item.id)}>
            <span>{item.eyebrow}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function VarsitySignalProjectPlaceholder({ page }) {
  return (
    <section className="graystone-page varsity-signal-project-placeholder" aria-labelledby={`${page.id}-title`}>
      <div className="varsity-signal-project-placeholder__panel">
        <span>{page.eyebrow}</span>
        <h1 id={`${page.id}-title`}>{page.title}</h1>
        <p>{page.description}</p>
        <div className="varsity-signal-project-placeholder__modules" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

function VarsitySignalTeamPage() {
  const baseUrl = import.meta.env.BASE_URL;
  const [activeFeedFilter, setActiveFeedFilter] = useState("All");
  const teamPhotoFallback = getVarsitySignalImageSrc(baseUrl, "scoreboard-huddle", 960);
  const feedPhoto = getVarsitySignalImageSrc(baseUrl, "student-energy", 960);
  const featurePhoto = getVarsitySignalImageSrc(baseUrl, "rivalry-hero", 960);
  const team = ACALANES_TEAM_PAGE;
  const mascotSrc = `${baseUrl}${team.mascotPath}`;
  const filteredUpdates = activeFeedFilter === "All"
    ? team.updates
    : team.updates.filter((update) => update.type === activeFeedFilter);
  const feedFilters = ["All", "News", "Stats", "Photos", "Scores"];

  return (
    <section className="varsity-team-reference" aria-label="Acalanes Dons football team page">
      <div className="varsity-team-reference__shell" style={{ "--team-primary": team.primary, "--team-accent": team.accent }}>
        <div className="varsity-team-reference__sitebar" aria-label="MaxPreps team page frame">
          <MaxPrepsLogo fill="#E10500" />
          <div className="varsity-team-reference__search">Search teams, athletes, schools...</div>
          <button type="button">Log In</button>
        </div>

        <header className="varsity-team-reference__header">
          <div className="varsity-team-reference__identity">
            <img src={mascotSrc} alt="Acalanes Dons mascot" />
            <div>
              <p>{team.location}</p>
              <h1>{team.school} {team.mascot}</h1>
              <span>{team.sport} · {team.season}</span>
            </div>
          </div>
          <div className="varsity-team-reference__summary" aria-label="Team summary">
            <span><strong>{team.record}</strong> Overall</span>
            <span><strong>{team.leagueRecord}</strong> League</span>
            <span><strong>{team.followers}</strong> Followers</span>
          </div>
          <div className="varsity-team-reference__actions">
            <button type="button">Follow</button>
            <button type="button">Manage Team</button>
          </div>
        </header>

        <nav className="varsity-team-reference__nav" aria-label="Acalanes team sections">
          {["Home", "Schedule", "Roster", "Videos", "Stats", "Standings", "Rankings", "Photos", "News", "More"].map((item) => (
            <button key={item} type="button" className={item === "Home" ? "is-active" : ""}>{item}</button>
          ))}
        </nav>

        <div className="varsity-team-reference__ad">Advertisement</div>

        <div className="varsity-team-reference__layout">
          <main className="varsity-team-reference__main">
            <section className="varsity-team-reference__title-card">
              <div>
                <span>Team Home</span>
                <h2>Acalanes Football</h2>
                <p>{team.school} High School · {team.location} · {team.section}</p>
              </div>
              <button type="button">Contribute to the Team</button>
            </section>

            <section className="varsity-team-reference-card varsity-team-reference-card--video">
              <div className="varsity-team-reference-card__header">
                <span>Latest Video</span>
                <a href="#varsity-signal-team-page">View all videos</a>
              </div>
              <div className="varsity-team-reference__video-grid">
                <figure>
                  <img src={team.video.thumbnail} alt="Acalanes football highlight thumbnail" />
                  <button type="button" aria-label="Play latest highlight">Play</button>
                </figure>
                <div>
                  <h3>{team.video.title}</h3>
                  <p>{team.video.description}</p>
                  <small>{team.video.meta}</small>
                </div>
              </div>
            </section>

            <section className="varsity-team-reference-card varsity-team-reference-card--feed">
              <div className="varsity-team-reference-card__header">
                <span>Acalanes Football Updates</span>
                <small>Latest team activity</small>
              </div>
              <div className="varsity-team-reference__filters" role="tablist" aria-label="Filter team updates">
                {feedFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={activeFeedFilter === filter}
                    className={activeFeedFilter === filter ? "is-active" : ""}
                    onClick={() => setActiveFeedFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="varsity-team-reference__updates">
                {filteredUpdates.map((update, index) => (
                  <article key={`${update.date}-${update.title}`}>
                    <div className="varsity-team-reference__update-icon" aria-hidden="true">{update.type.slice(0, 1)}</div>
                    <div>
                      <span>{update.type} · {update.date}</span>
                      <h3>{update.title}</h3>
                      <p>{update.source}</p>
                      <button type="button">{update.action}</button>
                    </div>
                    {index === 5 && <img src={feedPhoto} alt="" />}
                  </article>
                ))}
              </div>
              <p className="varsity-team-reference__updated">Team and page updated {team.lastUpdated}</p>
            </section>
          </main>

          <aside className="varsity-team-reference__rail">
            <section className="varsity-team-reference-card varsity-team-reference-card--schedule">
              <div className="varsity-team-reference-card__header">
                <span>Schedule at a Glance</span>
                <a href="#varsity-signal-team-page">View schedule</a>
              </div>
              <div className="varsity-team-reference__schedule">
                {team.schedule.map((game) => (
                  <article key={`${game.date}-${game.opponent}`} style={{ "--opponent": game.accent }}>
                    <span>{game.date}</span>
                    <img src={`${baseUrl}${game.mascot}`} alt="" />
                    <div>
                      <strong>{game.location} {game.opponent}</strong>
                      <small>{game.context}</small>
                    </div>
                    <b>{game.result}</b>
                    <em>{game.score}</em>
                  </article>
                ))}
              </div>
            </section>

            <section className="varsity-team-reference-card">
              <div className="varsity-team-reference-card__header">
                <span>Rankings</span>
                <a href="#varsity-signal-team-page">Full rankings</a>
              </div>
              <div className="varsity-team-reference__rankings">
                {team.rankings.map((ranking) => (
                  <article key={ranking.label}>
                    <span>{ranking.label}</span>
                    <strong>#{ranking.value}</strong>
                    <small>{ranking.movement}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className="varsity-team-reference-card">
              <div className="varsity-team-reference-card__header">
                <span>Team Leaders</span>
                <a href="#varsity-signal-team-page">View all stats</a>
              </div>
              <div className="varsity-team-reference__leaders">
                {team.leaders.slice(0, 6).map((leader) => (
                  <article key={`${leader.name}-${leader.label}`}>
                    <b>{leader.header}</b>
                    <div>
                      <strong>{leader.value}</strong>
                      <span>{leader.label}</span>
                      <p>{leader.name} · {leader.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="varsity-team-reference-card varsity-team-reference-card--meet">
              <div className="varsity-team-reference-card__header">
                <span>Meet the Team</span>
                <a href="#varsity-signal-team-page">Full roster</a>
              </div>
              <img
                src={team.teamPhoto}
                alt="Acalanes football team"
                onError={(event) => {
                  event.currentTarget.src = teamPhotoFallback;
                }}
              />
              <div className="varsity-team-reference__staff">
                {team.staff.map((member) => (
                  <p key={`${member.name}-${member.role}`}><strong>{member.name}</strong><span>{member.role}</span></p>
                ))}
              </div>
            </section>

            <section className="varsity-team-reference-card">
              <div className="varsity-team-reference-card__header">
                <span>Top Performers</span>
                <a href="#varsity-signal-team-page">More leaders</a>
              </div>
              <div className="varsity-team-reference__performers">
                {team.performers.map((performer) => (
                  <article key={performer.stat}>
                    <b>{performer.header}</b>
                    <div>
                      <strong>{performer.value}</strong>
                      <span>{performer.stat}</span>
                      <p>{performer.athlete} · {performer.rank}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="varsity-team-reference-card varsity-team-reference-card--feature">
              <img src={featurePhoto} alt="" />
              <div>
                <span>{team.division}</span>
                <strong>{team.league}</strong>
                <p>{team.address} · {team.phone}</p>
              </div>
            </section>

            <section className="varsity-team-reference-card">
              <div className="varsity-team-reference-card__header">
                <span>Nearby Football Teams</span>
              </div>
              <div className="varsity-team-reference__nearby">
                {team.nearbyTeams.map((nearbyTeam) => (
                  <a key={nearbyTeam} href="#varsity-signal-team-page">{nearbyTeam}</a>
                ))}
              </div>
            </section>

            <div className="varsity-team-reference__ad varsity-team-reference__ad--rail">Advertisement</div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function VarsitySignalProjectShell({ currentPage, onNavigate, onExit }) {
  const activePage = VARSITY_SIGNAL_PROJECT_NAV.find((item) => item.id === currentPage);
  const activeId = currentPage === "varsity-signal" ? "varsity-signal" : activePage?.id;
  const content = currentPage === "varsity-signal"
    ? <VarsitySignalProjectIndex onNavigate={onNavigate} />
    : currentPage === "varsity-signal-style-guide"
      ? <VarsitySignalStyleGuidePage />
      : currentPage === "varsity-signal-team-page"
        ? <VarsitySignalTeamPage />
      : activePage
        ? <VarsitySignalProjectPlaceholder page={activePage} />
        : <VarsitySignalProjectIndex onNavigate={onNavigate} />;

  return (
    <main className="graystone graystone--maxpreps-dark graystone--varsity-signal varsity-signal-project" aria-label="Varsity Signal project">
      <header className="varsity-signal-project-header">
        <button type="button" className="varsity-signal-project-header__back" onClick={() => onExit("projects")}>
          Projects
        </button>
        <button type="button" className="varsity-signal-project-header__brand" onClick={() => onNavigate("varsity-signal")}>
          <MaxPrepsWordmark fill="#E10500" />
          <span>Varsity Signal</span>
        </button>
        <nav className="varsity-signal-project-header__nav" aria-label="Varsity Signal pages">
          <button
            type="button"
            className={activeId === "varsity-signal" ? "is-active" : ""}
            aria-current={activeId === "varsity-signal" ? "page" : undefined}
            onClick={() => onNavigate("varsity-signal")}
          >
            Index
          </button>
          {VARSITY_SIGNAL_PROJECT_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeId === item.id ? "is-active" : ""}
              aria-current={activeId === item.id ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </header>
      {content}
    </main>
  );
}

const MDS_PROJECT_NAV = [
  {
    id: "mds-foundations-brand",
    match: "mds-foundations",
    title: "Foundations",
    eyebrow: "Tokens",
    description: "Color, type, spacing, elevation, iconography, and accessibility rules for every MaxPreps product surface.",
  },
  {
    id: "mds-components",
    title: "Components",
    eyebrow: "Reusable UI",
    description: "Core product components with states, anatomy, usage guidance, and code-ready behavior.",
  },
  {
    id: "mds-patterns",
    title: "Patterns",
    comingSoon: true,
    eyebrow: "Product flows",
    description: "Repeatable page and workflow patterns for search, schedules, scoreboards, team pages, feeds, and monetization.",
  },
  {
    id: "mds-resources",
    title: "Resources",
    comingSoon: true,
    eyebrow: "Adoption",
    description: "Libraries, governance, contribution paths, migration checklists, and implementation references.",
  },
];

const MDS_FOUNDATION_NAV = [
  { id: "mds-foundations-brand", title: "Brand", eyebrow: "Identity" },
  { id: "mds-foundations-colors", title: "Colors", eyebrow: "Palette" },
  { id: "mds-foundations-type", title: "Type", eyebrow: "Typography" },
  { id: "mds-foundations-motifs", title: "Motifs + Textures", eyebrow: "Visual system" },
  { id: "mds-foundations-photography", title: "Photography", eyebrow: "Image style" },
  { id: "mds-foundations-motion", title: "Motion", eyebrow: "Behavior", comingSoon: true },
  { id: "mds-foundations-spacing", title: "Spacing", eyebrow: "Layout", comingSoon: true },
];

const MDS_MAXPREPS_LOGOS = [
  { title: "Primary Logo Red", file: "maxpreps-logo-red.svg", theme: "light", kind: "wordmark" },
  { title: "Primary Logo Black", file: "maxpreps-logo-black.svg", theme: "light", kind: "wordmark" },
  { title: "Primary Logo White", file: "maxpreps-logo-white.svg", theme: "dark", kind: "wordmark" },
  { title: "Icon Red", file: "maxpreps-icon-red.svg", theme: "light", kind: "icon" },
  { title: "Icon Black", file: "maxpreps-icon-black.svg", theme: "light", kind: "icon" },
  { title: "Icon White", file: "maxpreps-icon-white.svg", theme: "dark", kind: "icon" },
  { title: "Photographer Red", file: "maxpreps-photographer-red.svg", theme: "light", kind: "subbrand" },
  { title: "Photographer Black", file: "maxpreps-photographer-black.svg", theme: "light", kind: "subbrand" },
  { title: "Photographer White", file: "maxpreps-photographer-white.svg", theme: "dark", kind: "subbrand" },
  { title: "Advantage Red + Gray", file: "maxpreps-advantage-red-gray.svg", theme: "light", kind: "subbrand" },
  { title: "Advantage Red + White", file: "maxpreps-advantage-red-white.svg", theme: "dark", kind: "subbrand" },
  { title: "Advantage White", file: "maxpreps-advantage-white.svg", theme: "dark", kind: "subbrand" },
];

const MDS_BRAND_COLORS = [
  { name: "MaxPreps Red", hex: "#E10500", note: "Brand, live states, and primary action." },
  { name: "White", hex: "#FFFFFF", note: "Logo reversal, product surfaces, and contrast." },
  { name: "Black", hex: "#000000", note: "Core mark, text, and high-contrast UI." },
];

const MDS_UI_COLOR_STEPS = ["0", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90", "95", "100"];

const MDS_UI_PALETTES = [
  {
    id: "neutral",
    label: "Neutral",
    usage: "Default black, white, gray, text, and utility surface scale.",
    values: {
      0: "#FDFDFD", 5: "#FBFBFB", 10: "#FAFAFA", 20: "#F2F2F2", 30: "#EDEDED", 40: "#DADADA", 50: "#C2C2C2", 60: "#ACACAC", 70: "#8D8D8D", 80: "#6E6E6E", 90: "#3F3F3F", 95: "#2D2D2D", 100: "#1A1A1A",
    },
  },
  {
    id: "warm",
    label: "Warm",
    usage: "Default product canvas, text, borders, and quiet surfaces.",
    values: {
      0: "#FEFDFC", 5: "#FCFBF9", 10: "#FBFAF8", 20: "#F3F0ED", 30: "#EEE9E5", 40: "#DCD6D1", 50: "#C7C0B9", 60: "#B0A8A1", 70: "#928A84", 80: "#756C66", 90: "#4B443F", 95: "#342D29", 100: "#211B18",
    },
  },
  {
    id: "red",
    label: "Red",
    usage: "Brand thread, live urgency, and primary action.",
    values: {
      0: "#FFFBFB", 5: "#FFF9F9", 10: "#FFF7F7", 20: "#F9DEDD", 30: "#F4B7B4", 40: "#EE8882", 50: "#E95C53", 60: "#E53328", 70: "#E10500", 80: "#C80000", 90: "#A80000", 95: "#930000", 100: "#7D0000",
    },
  },
  {
    id: "blue",
    label: "Blue",
    usage: "Links, information states, and secondary product emphasis.",
    values: {
      0: "#FAFCFF", 5: "#F8FAFF", 10: "#F5F8FF", 20: "#D7E3FA", 30: "#AFC7F6", 40: "#7EA6F7", 50: "#4E84F7", 60: "#2A6BE8", 70: "#0D55D9", 80: "#004ACE", 90: "#0036B5", 95: "#002EAA", 100: "#00259E",
    },
  },
  {
    id: "green",
    label: "Green",
    usage: "Positive states, availability, and success confirmation.",
    values: {
      0: "#FBFFFC", 5: "#F9FFFB", 10: "#F7FFF9", 20: "#D7F3DE", 30: "#B2ECBF", 40: "#84E59D", 50: "#52DB7A", 60: "#1FCC66", 70: "#0DBD5A", 80: "#089F4B", 90: "#067F3C", 95: "#056F35", 100: "#045E2D",
    },
  },
  {
    id: "orange",
    label: "Orange",
    usage: "Warm emphasis, alerts adjacent to warnings, and sports-energy accents.",
    values: {
      0: "#FFFBF8", 5: "#FFF8F2", 10: "#FFF0E8", 20: "#FBD8C6", 30: "#F7B48E", 40: "#EF884E", 50: "#E65C22", 60: "#D5350B", 70: "#BF2F0A", 80: "#A92909", 90: "#841F07", 95: "#661806", 100: "#4A1104",
    },
  },
  {
    id: "yellow",
    label: "Yellow",
    usage: "Highlights, warnings, and achievement moments.",
    values: {
      0: "#F9F3DE", 5: "#F5EDCE", 10: "#F2E7BD", 20: "#F2DD8A", 30: "#F2CE3F", 40: "#F2BE2C", 50: "#EBAA17", 60: "#CC9618", 70: "#996C05", 80: "#805804", 90: "#593C00", 95: "#422C00", 100: "#2B1C00",
    },
  },
];

const MDS_TEAM_COLORS = [
  { hex: "#1580A5", name: "Aqua", aliases: ["Light Blue", "Powder Blue", "Sky Blue"] },
  { hex: "#222222", name: "Black", aliases: [] },
  { hex: "#034CB2", name: "Cobalt", aliases: ["Blue", "Royal Blue"] },
  { hex: "#4F311C", name: "Brown", aliases: [] },
  { hex: "#C8880A", name: "Gold", aliases: ["Buff", "Cream", "Maize", "Old Gold", "Tan", "Vegas Gold"] },
  { hex: "#52000E", name: "Burgundy", aliases: ["Garnet"] },
  { hex: "#CC4E10", name: "Burnt Orange", aliases: ["Copper", "Texas Orange"] },
  { hex: "#CC0022", name: "Red", aliases: ["Cardinal", "Sapphire", "Scarlet"] },
  { hex: "#046DFF", name: "Columbia", aliases: ["Carolina Blue"] },
  { hex: "#8F0018", name: "Crimson", aliases: ["Cherry", "Cranberry", "Maroon"] },
  { hex: "#503604", name: "Chocolate", aliases: [] },
  { hex: "#022C66", name: "Navy", aliases: ["Dark Blue", "Midnight Blue"] },
  { hex: "#005B34", name: "Hunter Green", aliases: ["Dark Green"] },
  { hex: "#00341E", name: "Forest Green", aliases: [] },
  { hex: "#454444", name: "Gray", aliases: [] },
  { hex: "#00824B", name: "Green", aliases: ["Kelly Green", "Olive"] },
  { hex: "#CD0066", name: "Magenta", aliases: ["Old Rose", "Pink", "Salmon"] },
  { hex: "#108073", name: "Teal", aliases: ["Marine Blue", "Turquoise"] },
  { hex: "#D5350B", name: "Orange", aliases: [] },
  { hex: "#737272", name: "Platinum", aliases: ["Silver"] },
  { hex: "#754ACC", name: "Purple", aliases: [] },
];

const MDS_TYPE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MDS_TYPE_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const MDS_TYPE_NUMBERS = "0123456789";

const MDS_TYPE_SPECIMENS = [
  {
    id: "type-display",
    role: "Page titles / display",
    name: "Champion Gothic",
    className: "mds-type-specimen--champion",
    description: "Condensed sports authority for page titles, hero statements, rivalry weeks, playoff moments, rankings, and high-emphasis editorial surfaces.",
    options: ["Bold"],
    showLowercase: false,
    examples: ["WHERE THE SEASON LIVES", "RIVALRY WEEK", "STATE PLAYOFFS"],
  },
  {
    id: "type-subheads",
    role: "Subheaders / UI emphasis",
    name: "Siro SemiBold",
    className: "mds-type-specimen--siro-semibold",
    description: "Strong but readable UI type for section headers, module titles, tab labels, filters, and compact product hierarchy.",
    examples: ["Season Stats", "Latest Headlines", "Team Leaders"],
  },
  {
    id: "type-body",
    role: "Paragraphs / product copy",
    name: "Siro Regular",
    className: "mds-type-specimen--siro-regular",
    description: "The default reading voice for descriptions, summaries, helper text, news snippets, and product explanations across the light theme.",
    examples: ["A practical color system where MaxPreps red anchors brand and action.", "Scores, schedules, rankings, and stories stay clear and scannable."],
  },
  {
    id: "type-data",
    role: "Scores / stats / labels",
    name: "Chivo Mono",
    className: "mds-type-specimen--chivo",
    description: "Structured data type for scores, records, timestamps, tables, stat rows, rankings, abbreviations, and metadata.",
    examples: ["Q4 07:24", "REC 48   YDS 812   TD 11   AVG 16.9", "FINAL 32-28"],
  },
  {
    id: "type-accent",
    role: "Accent / human energy",
    name: "Marker Sport",
    className: "mds-type-specimen--marker",
    description: "Handwritten energy for stickers, tape labels, social callouts, senior night, clutch moments, and limited expressive annotations.",
    examples: ["BUILT DIFFERENT", "SENIOR NIGHT", "CLUTCH"],
  },
];

const MDS_MOTIF_TEXTURES = [
  { name: "Halftone", className: "halftone", description: "Local newspaper dot texture for rankings, recaps, archives, and editorial shadows." },
  { name: "Tape", className: "tape", description: "Locker-room tape for labels, player names, matchup notes, and quick annotations." },
  { name: "Turf / Field", className: "turf", description: "Field marks and grass texture for football, soccer, lacrosse, and outdoor game surfaces." },
  { name: "Ticket Stub", className: "ticket", description: "Event, playoff, GoFan, rivalry, and admissions language with perforated edges." },
  { name: "Chain Link", className: "chain", description: "Fence geometry for local venue texture, sidelines, fields, and gritty framing." },
  { name: "Jersey Mesh", className: "mesh", description: "Athletic fabric texture for uniforms, badges, stat cards, and layered collage." },
];

const MDS_MOTIFS = [
  { name: "Scoreboard", className: "score", value: "12:00", description: "Use for clock, quarter, final, live, OT, and score-state references." },
  { name: "Marker Circle", className: "marker", value: "Senior", description: "Use sparingly for human callouts and student-section energy." },
  { name: "Player ID", className: "barcode", value: "", description: "Use as a structured data artifact for tickets, rosters, and player modules." },
  { name: "Tape Label", className: "tape-label", value: "Game day", description: "Use for labels, notes, and local context without feeling like a SaaS chip." },
  { name: "Chrome Badge", className: "chrome", value: "P", description: "Use for awards, verified recognition, player-of-the-game, and premium moments." },
];

const MDS_PHOTOGRAPHY_TREATMENTS = [
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

const MDS_BUTTON_OVERVIEW = [
  {
    id: "primary",
    title: "Primary",
    description: "Use for the highest-priority action on a surface. Red is reserved for brand, live, urgent, or true primary actions.",
    example: "Watch Live",
  },
  {
    id: "secondary",
    title: "Secondary",
    description: "Use for supportive actions that should remain visible without competing with the primary action.",
    example: "Game Details",
  },
  {
    id: "tertiary",
    title: "Tertiary",
    description: "Use for quiet actions in dense UI, secondary navigation, or repeated rows where button chrome would add noise.",
    example: "View Roster",
  },
];

const MDS_PAGE_CONTENT = {
  "mds-foundations-brand": {
    title: "Brand",
    intro: "The identity layer for MDS: a MaxPreps ecosystem that feels authoritative, trustworthy, and unmistakably sports-native.",
    sections: [
      {
        id: "brand-position",
        title: "Position",
        kicker: "System promise",
        body: "MaxPreps should feel like the trusted source for every team, athlete, score, schedule, ranking, and local sports moment.",
        items: ["Trusted sports authority", "Local-first context", "Clear product confidence", "Room for school pride"],
      },
      {
        id: "brand-voice",
        title: "Voice",
        kicker: "Tone",
        body: "Language should be direct, useful, and sports-literate. Avoid hype when the user needs data, and avoid sterile UI copy when the moment deserves energy.",
        items: ["Plainspoken", "Confident", "Specific", "Moment-aware"],
      },
      {
        id: "brand-logo",
        title: "Logo Usage",
        kicker: "Recognition",
        body: "The MaxPreps mark should be present in product chrome and brand moments without competing with school identity or core task completion.",
        items: ["Red preferred", "High-contrast lockups", "Avoid decorative distortion", "Respect clear space"],
      },
    ],
  },
  "mds-foundations-colors": {
    title: "Colors",
    intro: "A practical color system where MaxPreps red anchors brand and action while team colors carry local identity.",
    sections: [
      {
        id: "color-brand",
        title: "Brand",
        body: "The brand set is intentionally small: red, white, and black. Red is the identity thread and should stay reserved for MaxPreps, live moments, and primary action.",
        items: ["MaxPreps Red", "White", "Black"],
      },
      {
        id: "color-ui",
        title: "UI",
        body: "The UI palette supplies scales for product backgrounds, states, dividers, and emphasis. Use the selector to inspect a family and step without showing every token at once.",
        items: ["Family selector", "Step selector", "Live token preview"],
      },
      {
        id: "color-teams",
        title: "Teams",
        body: "Team colors carry school identity. Use the canonical color name as the bold label, with alternate school-color language shown as supporting copy.",
        items: ["Canonical name", "Mapped hex", "Common aliases"],
      },
    ],
  },
  "mds-foundations-type": {
    title: "Type",
    intro: "Typography supports fast scanning, sports data precision, and moments where MaxPreps needs broadcast energy without leaving the light product theme.",
    sections: [
      {
        id: "type-display",
        title: "Champion Gothic",
        body: "Condensed display type for page titles and big sports moments.",
        items: ["Page titles", "Hero moments", "Campaign headlines"],
      },
      {
        id: "type-subheads",
        title: "Siro SemiBold",
        body: "Subheader and UI emphasis type for clear product hierarchy.",
        items: ["Section headers", "Module titles", "Navigation emphasis"],
      },
      {
        id: "type-body",
        title: "Siro Regular",
        body: "Paragraph and product copy type for readable explanations.",
        items: ["Body copy", "Descriptions", "Helper text"],
      },
      {
        id: "type-data",
        title: "Chivo Mono",
        body: "Structured data type for scores, stats, labels, and timestamps.",
        items: ["Scores", "Stats", "Tables"],
      },
      {
        id: "type-accent",
        title: "Marker Sport",
        body: "Expressive accent type for human callouts and social-energy moments.",
        items: ["Stickers", "Tape labels", "Callouts"],
      },
    ],
  },
  "mds-foundations-motifs": {
    title: "Motifs + Textures",
    intro: "Analog broadcast collage elements for MaxPreps surfaces: scoreboard hardware, local artifacts, athletic materials, and school-pride texture.",
    sections: [
      {
        id: "motifs-textures",
        title: "Textures",
        body: "Use texture to make product moments feel local and tactile while keeping the interface clear.",
        items: ["Halftone", "Tape", "Turf", "Ticket Stub", "Chain Link", "Jersey Mesh"],
      },
      {
        id: "motifs-elements",
        title: "Motifs",
        body: "Motifs are reusable graphic artifacts that connect product UI to game-night culture.",
        items: ["Scoreboard", "Marker Circle", "Player ID", "Tape Label", "Chrome Badge"],
      },
      {
        id: "motifs-usage",
        title: "Usage",
        body: "Use motifs as emphasis and structure, not decoration. They should clarify status, reinforce local identity, or add moment energy.",
        items: ["Make data legible", "Respect team colors", "Keep red intentional"],
      },
    ],
  },
  "mds-foundations-photography": {
    title: "Photography",
    intro: "Varsity Signal photography should feel real, flash-heavy, imperfect, and local while preserving MaxPreps trust and product readability.",
    sections: [
      {
        id: "photo-principles",
        title: "Principles",
        body: "Photography should feel captured, not staged: emotional faces, close crops, gym light, field texture, and real athlete moments.",
        items: ["Real moments", "High contrast", "Local atmosphere", "No fake athletes"],
      },
      {
        id: "photo-treatments",
        title: "Treatments",
        body: "Use the approved image treatments to create visual variety while keeping the system recognizable.",
        items: ["Contrast", "Flash", "Grain", "VHS", "Torn Paper", "Chromatic Offset"],
      },
      {
        id: "photo-usage",
        title: "Usage",
        body: "Choose treatments by product context: clarity for core pages, energy for social, and editorial texture for stories and recaps.",
        items: ["Product clarity first", "Editorial energy second", "Avoid overprocessing"],
      },
    ],
  },
  "mds-foundations-motion": {
    title: "Motion",
    intro: "Motion should feel fast and broadcast-native while preserving trust, legibility, and user control.",
    sections: [
      {
        id: "motion-principles",
        title: "Principles",
        kicker: "Behavior",
        body: "Use motion to clarify state changes, make live sports feel alive, and celebrate moments without blocking core tasks.",
        items: ["Fast", "Purposeful", "Readable", "Reduced-motion safe"],
      },
      {
        id: "motion-product",
        title: "Product Motion",
        kicker: "Interaction",
        body: "Product interactions should stay restrained: tabs, filters, drawers, score updates, and loading states need clarity first.",
        items: ["120-240ms transitions", "No decorative delays", "Stable layout", "Clear state changes"],
      },
      {
        id: "motion-brand",
        title: "Brand Motion",
        kicker: "Expression",
        body: "Brand and campaign surfaces can use score flips, sticker pops, type slams, flash cuts, and ticker crawls.",
        items: ["Score flip", "Sticker pop", "Type slam", "Camera flash"],
      },
    ],
  },
  "mds-foundations-spacing": {
    title: "Spacing",
    intro: "Spacing and layout rules should make MaxPreps pages dense, calm, and easy to scan across desktop and mobile.",
    sections: [
      {
        id: "spacing-scale",
        title: "Scale",
        kicker: "8px grid",
        body: "Use a predictable spacing scale so modules, controls, cards, and page gutters align across product surfaces.",
        items: ["4", "8", "12", "16", "24", "32", "48"],
      },
      {
        id: "spacing-density",
        title: "Density",
        kicker: "Sports utility",
        body: "Schedules, rosters, rankings, and score pages need efficient density. Marketing-style spacing should not leak into workhorse product views.",
        items: ["Dense tables", "Compact filters", "Readable rows", "No oversized product cards"],
      },
      {
        id: "spacing-responsive",
        title: "Responsive Layout",
        kicker: "Breakpoints",
        body: "Layouts should preserve task flow when side rails collapse, sticky context moves, and modules stack.",
        items: ["Fixed control sizes", "Fluid content columns", "Sticky context rails", "Mobile-first stacking"],
      },
    ],
  },
  "mds-components": {
    title: "Components",
    intro: "A starter catalog for the UI pieces MaxPreps uses every day, beginning with button behavior, hierarchy, and theming.",
    sections: [
      {
        id: "button-overview",
        title: "Button Overview",
        body: "Buttons use hierarchy first: primary for decisive action, secondary for support, and tertiary for quiet utility.",
        items: ["Primary", "Secondary", "Tertiary"],
      },
      {
        id: "button-renderer",
        title: "Interactive Renderer",
        body: "Use the renderer to inspect theme, size, icon placement, and variant combinations.",
        items: ["Light", "Dark", "Dynamic", "Small", "Medium", "Large"],
      },
    ],
  },
  "mds-patterns": {
    title: "Patterns",
    intro: "Reusable product compositions for high-traffic MaxPreps workflows, from team discovery to live game context.",
    sections: [
      {
        id: "team-pages",
        title: "Team Pages",
        kicker: "School hub",
        body: "Team pages combine identity, schedule, updates, rankings, media, and roster context without losing scan speed.",
        items: ["Team identity header", "Schedule at a glance", "Team updates feed", "Leadership rail"],
      },
      {
        id: "game-context",
        title: "Game Context",
        kicker: "Before and after",
        body: "Game pages should support previews, live states, final recaps, tickets, watch CTAs, and related editorial modules.",
        items: ["Preview state", "Live state", "Final state", "Ticket/watch module"],
      },
      {
        id: "search",
        title: "Search + Discovery",
        kicker: "Find anything",
        body: "Search should bias toward schools, teams, athletes, schedules, rankings, and local relevance.",
        items: ["Global search", "Scoped filters", "Recent teams", "Location-aware results"],
      },
      {
        id: "feeds",
        title: "Feeds + Updates",
        kicker: "Timeline",
        body: "Feeds need strong metadata, clear source trust, and media moments without becoming social clutter.",
        items: ["News update", "Stats update", "Photo update", "Score update"],
      },
    ],
  },
  "mds-resources": {
    title: "Resources",
    intro: "The operating layer for adopting and maintaining MDS across design, engineering, content, and product teams.",
    sections: [
      {
        id: "libraries",
        title: "Design Libraries",
        kicker: "Figma",
        body: "Foundations, components, and templates should live as versioned Figma libraries with usage documentation next to the assets.",
        items: ["Foundations library", "Components library", "Templates library", "Varsity Signal adjunct"],
      },
      {
        id: "engineering",
        title: "Engineering References",
        kicker: "Implementation",
        body: "Code references should map to production components and include API, state, accessibility, and responsive behavior notes.",
        items: ["React component map", "Token export", "Storybook", "A11y checklist"],
      },
      {
        id: "governance",
        title: "Governance",
        kicker: "Contribution",
        body: "MDS needs a clear intake path so teams can propose changes without fragmenting the system.",
        items: ["Request template", "Review cadence", "Version notes", "Decision log"],
      },
      {
        id: "migration",
        title: "Migration",
        kicker: "Adoption",
        body: "Prioritize high-traffic surfaces first, then stabilize shared primitives before broad page-level redesign.",
        items: ["Inventory", "Token alignment", "Component replacement", "QA signoff"],
      },
    ],
  },
};

function getReadableColor(hex) {
  const cleanHex = hex.replace("#", "");
  const red = Number.parseInt(cleanHex.slice(0, 2), 16);
  const green = Number.parseInt(cleanHex.slice(2, 4), 16);
  const blue = Number.parseInt(cleanHex.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.58 ? "#0B0D10" : "#FFFFFF";
}

function MdsColorsContent() {
  const [activePaletteId, setActivePaletteId] = useState("red");
  const [activeStep, setActiveStep] = useState("70");
  const activePalette = MDS_UI_PALETTES.find((palette) => palette.id === activePaletteId) ?? MDS_UI_PALETTES[0];
  const activeHex = activePalette.values[activeStep] ?? activePalette.values[70];
  const readableColor = getReadableColor(activeHex);

  return (
    <div className="mds-color-page">
      <section id="color-brand" className="mds-color-section mds-color-section--brand">
        <div className="mds-color-section__intro">
          <h2>Brand</h2>
          <p>The smallest possible brand palette: red, white, and black. Keep red meaningful so it continues to carry identity, live state, and primary action.</p>
        </div>
        <div className="mds-brand-color-grid">
          {MDS_BRAND_COLORS.map((color) => (
            <article key={color.name} className="mds-brand-color-card" style={{ "--mds-swatch": color.hex }}>
              <div className="mds-brand-color-card__sample" />
              <strong>{color.name}</strong>
              <code>{color.hex}</code>
              <p>{color.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="color-ui" className="mds-color-section">
        <div className="mds-color-section__intro">
          <h2>UI</h2>
          <p>Core product colors are organized by family and step. Select a family and code to preview the background color, token name, and value.</p>
        </div>
        <div className="mds-ui-color-lab">
          <div className="mds-ui-color-controls" aria-label="UI palette controls">
            <div>
              <strong>Background color</strong>
              <div className="mds-ui-color-button-grid">
                {MDS_UI_PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    className={activePalette.id === palette.id ? "is-active" : ""}
                    onClick={() => setActivePaletteId(palette.id)}
                  >
                    <span style={{ background: palette.values[70] ?? palette.values[50] }} />
                    {palette.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <strong>Code</strong>
              <div className="mds-ui-step-grid">
                {MDS_UI_COLOR_STEPS.map((step) => (
                  <button
                    key={step}
                    type="button"
                    className={activeStep === step ? "is-active" : ""}
                    onClick={() => setActiveStep(step)}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mds-ui-color-preview" style={{ background: activeHex, color: readableColor }}>
            <span>{activePalette.label}</span>
            <strong>{activePalette.id} {activeStep}</strong>
            <code>{activeHex}</code>
            <p>{activePalette.usage}</p>
          </div>
        </div>
      </section>

      <section id="color-teams" className="mds-color-section">
        <div className="mds-color-section__intro">
          <h2>Teams</h2>
          <p>These are canonical team-color mappings from the source palette. The bold name is the primary label; aliases help map school language back to the system.</p>
        </div>
        <div className="mds-team-color-table">
          {MDS_TEAM_COLORS.map((color) => (
            <article key={`${color.hex}-${color.name}`} className="mds-team-color-row">
              <span className="mds-team-color-dot" style={{ background: color.hex }} />
              <code>{color.hex}</code>
              <p>
                <strong>{color.name}</strong>
                {color.aliases.length > 0 ? `, ${color.aliases.join(", ")}` : ""}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MdsTypeContent() {
  return (
    <div className="mds-type-page">
      {MDS_TYPE_SPECIMENS.map((type) => (
        <section key={type.id} id={type.id} className={`mds-type-specimen ${type.className}`}>
          <div className="mds-type-specimen__meta">
            <span>{type.role}</span>
            <h2>{type.name}</h2>
            <p>{type.description}</p>
            {type.options ? (
              <div className="mds-type-specimen__options" aria-label={`${type.name} options`}>
                {type.options.map((option) => <strong key={option}>{option}</strong>)}
              </div>
            ) : null}
          </div>
          <div className="mds-type-specimen__sample">
            <strong>{type.name}</strong>
            <div className="mds-type-specimen__alphabet" aria-label={`${type.name} alphabet`}>
              <span>{MDS_TYPE_ALPHABET}</span>
              {type.showLowercase === false ? null : <span>{MDS_TYPE_LOWERCASE}</span>}
              <span>{MDS_TYPE_NUMBERS}</span>
            </div>
          </div>
          <div className="mds-type-specimen__examples">
            <span>Examples</span>
            <div>
              {type.examples.map((example) => (
                <p key={example}>{example}</p>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function MdsMotifsContent() {
  return (
    <div className="mds-motif-page">
      <section id="motifs-textures" className="mds-motif-section">
        <div className="mds-motif-section__intro">
          <h2>Textures</h2>
          <p>Use these as low-opacity surfaces, clipped overlays, section dividers, or local detail in high-energy modules. They should add tactility without burying product information.</p>
        </div>
        <div className="mds-texture-grid">
          {MDS_MOTIF_TEXTURES.map((texture) => (
            <article key={texture.name} className="mds-texture-card">
              <span className={`mds-texture-card__sample mds-texture-card__sample--${texture.className}`} />
              <strong>{texture.name}</strong>
              <p>{texture.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="motifs-elements" className="mds-motif-section">
        <div className="mds-motif-section__intro">
          <h2>Motifs</h2>
          <p>Motifs should behave like recognizable sports artifacts: scoreboard reads, ticket systems, locker-room labels, player IDs, and award marks.</p>
        </div>
        <div className="mds-motif-grid">
          {MDS_MOTIFS.map((motif) => (
            <article key={motif.name} className="mds-motif-card">
              <span className={`mds-motif-sample mds-motif-sample--${motif.className}`}>{motif.value}</span>
              <strong>{motif.name}</strong>
              <p>{motif.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="motifs-usage" className="mds-motif-section mds-motif-section--usage">
        <div>
          <h2>Usage</h2>
          <p>Local authenticity comes first. Use these elements to support a story, status, or school identity moment. Avoid adding every motif to one component.</p>
        </div>
        <ul>
          <li>Scoreboard elements belong near live, final, clock, period, and score states.</li>
          <li>Ticket and tape motifs work best for event promotion, GoFan, labels, and matchup context.</li>
          <li>Halftone, mesh, turf, and chain-link textures should stay subtle behind readable content.</li>
        </ul>
      </section>
    </div>
  );
}

function MdsPhotographyContent() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="mds-photo-page">
      <section id="photo-principles" className="mds-photo-section mds-photo-section--principles">
        <div>
          <h2>Principles</h2>
          <p>Use photography that feels like a real high school sports moment: sweat, flash, gym lights, field texture, scoreboard glow, sideline emotion, and imperfect local atmosphere.</p>
        </div>
        <div className="mds-photo-principles-grid">
          {["Captured, not staged", "Close-cropped emotion", "Punchy highlights", "Trustworthy enough for product"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section id="photo-treatments" className="mds-photo-section">
        <div className="mds-photo-section__intro">
          <h2>Treatments</h2>
          <p>Approved Varsity Signal photo effects for product, editorial, social, and campaign surfaces.</p>
        </div>
        <div className="mds-photo-treatment-grid">
          {MDS_PHOTOGRAPHY_TREATMENTS.map((effect) => {
            const image = getVarsitySignalImageAsset(effect.imageId);
            return (
              <article key={effect.name} className={`mds-photo-treatment mds-photo-treatment--${effect.className}`}>
                <figure>
                  {image ? (
                    <img
                      src={getVarsitySignalImageSrc(baseUrl, effect.imageId, 960)}
                      alt={image.alt}
                      loading="lazy"
                    />
                  ) : null}
                </figure>
                <div>
                  <strong><span>{effect.number}.</span> {effect.name}</strong>
                  <p>{effect.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="photo-usage" className="mds-photo-section mds-photo-section--usage">
        <div>
          <h2>Usage</h2>
          <p>Use heavier treatment in editorial and social surfaces. Keep core product pages readable: image energy should support scores, stats, rankings, schedules, and CTAs.</p>
        </div>
        <div className="mds-photo-usage-grid">
          <article>
            <strong>Product pages</strong>
            <p>Use high contrast, flash, and subtle grain. Avoid treatments that reduce athlete recognition or stat legibility.</p>
          </article>
          <article>
            <strong>Editorial + recap</strong>
            <p>Use halftone, torn paper, and archive feeling to frame rankings, recaps, history, and playoff stories.</p>
          </article>
          <article>
            <strong>Social assets</strong>
            <p>Use VHS, chromatic offset, sticker energy, and tighter crops for shareable moment graphics.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function MdsButtonExample({ variant, size = "medium", theme = "light", color = "brand", iconLeft = false, iconRight = false, children }) {
  return (
    <button
      type="button"
      className={`mds-button-example mds-button-example--${variant} mds-button-example--${size} mds-button-example--${theme} mds-button-example--${color}`}
    >
      {iconLeft ? <span className="mds-button-example__icon mds-button-example__icon--play" aria-hidden="true" /> : null}
      <span>{children}</span>
      {iconRight ? (
        <span className="mds-button-example__icon mds-button-example__icon--external" aria-hidden="true">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </span>
      ) : null}
    </button>
  );
}

function MdsComponentsContent() {
  const [variant, setVariant] = useState("primary");
  const [theme, setTheme] = useState("light");
  const [size, setSize] = useState("medium");
  const [buttonColor, setButtonColor] = useState("brand");
  const [iconLeft, setIconLeft] = useState(true);
  const [iconRight, setIconRight] = useState(false);

  const controlGroups = [
    { label: "Theme", value: theme, setter: setTheme, options: ["light", "dark", "dynamic"] },
    { label: "Color", value: buttonColor, setter: setButtonColor, options: ["brand", "neutral"] },
    { label: "Size", value: size, setter: setSize, options: ["small", "medium", "large"] },
    { label: "Variant", value: variant, setter: setVariant, options: ["primary", "secondary", "tertiary"] },
  ];

  return (
    <div className="mds-components-page">
      <section id="button-overview" className="mds-component-section">
        <div className="mds-component-section__intro">
          <h2>Button Overview</h2>
          <p>Buttons should stay practical and hierarchy-driven. Use red only when the action deserves primary emphasis, live energy, or brand urgency.</p>
        </div>
        <div className="mds-button-overview-grid">
          {MDS_BUTTON_OVERVIEW.map((button) => (
            <article key={button.id} className="mds-button-overview-card">
              <div>
                <span>{button.id}</span>
                <h3>{button.title}</h3>
                <p>{button.description}</p>
              </div>
              <MdsButtonExample
                variant={button.id}
                iconLeft={button.id === "primary"}
                iconRight={button.id === "tertiary"}
              >
                {button.example}
              </MdsButtonExample>
            </article>
          ))}
        </div>
      </section>

      <section id="button-renderer" className="mds-component-section">
        <div className="mds-component-section__intro">
          <h2>Interactive Button Renderer</h2>
          <p>Preview the button API across theme, color, size, icon placement, and variant. Left and right icons can be used independently or together.</p>
        </div>
        <div className="mds-button-lab">
          <div className="mds-button-lab__controls">
            {controlGroups.map((group) => (
              <div key={group.label}>
                <strong>{group.label}</strong>
                <div>
                  {group.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={group.value === option ? "is-active" : ""}
                      onClick={() => group.setter(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <strong>Icon</strong>
              <div>
                <button
                  type="button"
                  className={iconLeft ? "is-active" : ""}
                  onClick={() => setIconLeft((value) => !value)}
                >
                  Left
                </button>
                <button
                  type="button"
                  className={iconRight ? "is-active" : ""}
                  onClick={() => setIconRight((value) => !value)}
                >
                  Right
                </button>
              </div>
            </div>
          </div>
          <div className={`mds-button-lab__preview mds-button-lab__preview--${theme}`}>
            <span>Rendered button</span>
            <MdsButtonExample
              variant={variant}
              size={size}
              theme={theme}
              color={buttonColor}
              iconLeft={iconLeft}
              iconRight={iconRight}
            >
              Watch Live
            </MdsButtonExample>
            <code>{`<Button variant="${variant}" theme="${theme}" color="${buttonColor}" size="${size}" icon="${iconLeft && iconRight ? "both" : iconLeft ? "left" : iconRight ? "right" : "none"}" />`}</code>
          </div>
        </div>
      </section>
    </div>
  );
}

function MdsProjectPage({ currentPage, onNavigate, onExit }) {
  const activeId = currentPage === "mds" || currentPage === "mds-foundations" ? "mds-foundations-brand" : currentPage;
  const activeTopId = activeId.startsWith("mds-foundations") ? "mds-foundations" : activeId;
  const page = MDS_PAGE_CONTENT[activeId] ?? MDS_PAGE_CONTENT["mds-foundations-brand"];
  const activeFoundationItem = MDS_FOUNDATION_NAV.find((item) => item.id === activeId);
  const activeTopItem = MDS_PROJECT_NAV.find((item) => (item.match ?? item.id) === activeTopId);
  const isComingSoonPage = Boolean(activeFoundationItem?.comingSoon || activeTopItem?.comingSoon);
  const isBrandPage = activeId === "mds-foundations-brand";
  const isColorsPage = activeId === "mds-foundations-colors";
  const isTypePage = activeId === "mds-foundations-type";
  const isMotifsPage = activeId === "mds-foundations-motifs";
  const isPhotographyPage = activeId === "mds-foundations-photography";
  const isComponentsPage = activeId === "mds-components";
  const sidebarTitle = activeTopId === "mds-foundations" ? "Foundation pages" : activeTopItem?.title ?? "Sub pages";
  const sidebarSubPages = activeTopId === "mds-foundations"
    ? MDS_FOUNDATION_NAV
    : [{ id: activeId, title: isComponentsPage ? "Button" : page.title, comingSoon: isComingSoonPage }];
  const overviewItems = activeTopId === "mds-foundations"
    ? MDS_FOUNDATION_NAV.map((item) => ({
      ...item,
      description: MDS_PAGE_CONTENT[item.id]?.intro ?? "",
    }))
    : MDS_PROJECT_NAV.map((item) => ({
      ...item,
      id: item.id,
    }));
  const handleSectionJump = (event, sectionId) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mds-project" aria-label="MaxPreps Design System project">
      <button
        type="button"
        className="graystone-home-button mds-project-home-button"
        aria-label="Back to projects"
        onClick={() => onExit("projects")}
      >
        <GraystoneIconHome />
      </button>

      <header className="mds-project-header">
        <button type="button" className="mds-project-header__brand" onClick={() => onNavigate("mds-foundations-brand")}>
          <MaxPrepsWordmark fill="#E10500" />
          <span>MDS</span>
        </button>
        <nav className="mds-project-header__nav" aria-label="MDS primary pages">
          {MDS_PROJECT_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${activeTopId === (item.match ?? item.id) ? "is-active" : ""}${item.comingSoon ? " is-disabled" : ""}`}
              aria-current={activeTopId === (item.match ?? item.id) ? "page" : undefined}
              disabled={item.comingSoon}
              onClick={() => {
                if (!item.comingSoon) onNavigate(item.id);
              }}
            >
              <span>{item.title}</span>
              {item.comingSoon ? <em>Coming soon</em> : null}
            </button>
          ))}
        </nav>
      </header>

      <div className="mds-project-layout">
        <aside className="mds-project-sidebar" aria-label="MDS side navigation">
          <div>
            <span>{sidebarTitle}</span>
            {sidebarSubPages.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${activeId === item.id ? "is-active" : ""}${item.comingSoon ? " is-disabled" : ""}`}
                disabled={item.comingSoon}
                onClick={() => {
                  if (!item.comingSoon) onNavigate(item.id);
                }}
              >
                <strong>{item.title}</strong>
                {item.comingSoon ? <small>Coming soon</small> : null}
              </button>
            ))}
          </div>
          <div>
            <span>On this page</span>
            {isComingSoonPage ? (
              <button type="button" className="is-disabled" disabled>
                <strong>Coming soon</strong>
              </button>
            ) : page.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} onClick={(event) => handleSectionJump(event, section.id)}>{section.title}</a>
            ))}
          </div>
        </aside>

        <section className="mds-project-content" aria-labelledby="mds-page-title">
          <div className="mds-project-hero">
            {isComingSoonPage ? <p className="mds-coming-soon-label">Coming soon</p> : null}
            <h1 id="mds-page-title">{page.title}</h1>
            <span>{page.intro}</span>
          </div>

          {isBrandPage && !isComingSoonPage ? (
            <div className="mds-project-overview-grid mds-project-logo-grid" aria-label="MaxPreps logo assets">
              {MDS_MAXPREPS_LOGOS.map((logo) => (
                <article key={logo.file} className={`mds-project-logo-card mds-project-logo-card--${logo.theme} mds-project-logo-card--${logo.kind}`}>
                  <img src={`${import.meta.env.BASE_URL}mds/logos/${logo.file}`} alt={logo.title} />
                  <strong>{logo.title}</strong>
                </article>
              ))}
            </div>
          ) : !isComingSoonPage && !isColorsPage && !isTypePage && !isMotifsPage && !isPhotographyPage && !isComponentsPage ? (
            <div className="mds-project-overview-grid">
              {overviewItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={activeId === item.id ? "is-active" : ""}
                  onClick={() => onNavigate(item.id)}
                >
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </button>
              ))}
            </div>
          ) : null}

          {isComingSoonPage ? (
            <div className="mds-coming-soon-panel">
              <strong>Coming soon</strong>
              <p>This MDS page has not been designed yet. It is intentionally disabled until the page direction is defined.</p>
            </div>
          ) : isColorsPage ? (
            <MdsColorsContent />
          ) : isTypePage ? (
            <MdsTypeContent />
          ) : isMotifsPage ? (
            <MdsMotifsContent />
          ) : isPhotographyPage ? (
            <MdsPhotographyContent />
          ) : isComponentsPage ? (
            <MdsComponentsContent />
          ) : (
            <div className="mds-project-section-grid">
              {page.sections.map((section) => (
                <article key={section.id} id={section.id} className="mds-project-section-card">
                  <div>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </div>
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function PlaceholderPage({ title }) {
  const variant = title.toLowerCase() === "brand" ? "brand" : "about";

  return (
    <main className="scene-rail scene-rail--home">
      <section className="scene is-active" aria-label={`${title} placeholder`}>
        <div className="scene__inner scene__inner--home scene__inner--art">
          <EditorialBackdrop
            variant={variant}
            number={title.toLowerCase() === "brand" ? "BRND" : "NEXT"}
            leftEyebrow={title.toLowerCase() === "brand" ? "Identity" : "Coming"}
            leftValue={title.toLowerCase() === "brand" ? "Motion Language" : "Next Scene"}
            leftMeta={title.toLowerCase() === "brand" ? "Logo / Color / Tone" : "In Progress"}
            rightEyebrow={title.toLowerCase() === "brand" ? "Expression" : "Direction"}
            rightValue={title.toLowerCase() === "brand" ? "Brand System" : title}
            rightMeta={title.toLowerCase() === "brand" ? "Live Assets" : "Editorial Build"}
          />
          <div className="home-story">
            <p className="scene-label">Placeholder</p>
            <h2>{title}</h2>
            <p>This page will follow the same scene-based structure once we start designing it.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function GameDayRushProjectPage({ onExit }) {
  return (
    <main className="gameday-rush-project" aria-label="MaxPreps GameDay Rush project">
      <button type="button" className="gameday-rush-project__back" onClick={() => onExit("projects")}>
        Projects
      </button>
      <iframe
        className="gameday-rush-project__frame"
        title="MaxPreps GameDay Rush"
        src={`${import.meta.env.BASE_URL}projects/maxpreps-gameday-rush/`}
      />
    </main>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromHash());
  const [introState, setIntroState] = useState("active");
  const [graystoneAuthenticated, setGraystoneAuthenticated] = useState(() => {
    return window.localStorage.getItem("graystone:authenticated") === "true";
  });
  const [graystoneLoginReturnPage, setGraystoneLoginReturnPage] = useState("graystone-playon-home");
  const isStandalonePage = STANDALONE_PAGES.includes(currentPage);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const nextHash = `#${currentPage.toLowerCase()}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [currentPage]);

  useEffect(() => {
    window.localStorage.setItem("graystone:authenticated", graystoneAuthenticated ? "true" : "false");
  }, [graystoneAuthenticated]);

  useEffect(() => {
    if (introState !== "opening") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIntroState("done");
    }, 1100);

    return () => window.clearTimeout(timeoutId);
  }, [introState]);

  return (
    <>
      {introState !== "done" && currentPage === "index" ? (
        <IntroGate
          state={introState}
          currentPage={currentPage}
          onDismiss={() => {
            if (introState === "active") {
              setIntroState("opening");
            }
          }}
        />
      ) : null}

      {!isStandalonePage ? (
        <header className="site-header" aria-label="Primary">
          <div className="site-brandmark" aria-label="MaxPreps">
            <MaxPrepsWordmark />
          </div>
          <nav className="site-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className={`site-nav__link${item === currentPage ? " is-active" : ""}`}
                type="button"
                aria-current={item === currentPage ? "page" : undefined}
                onClick={() => {
                  setCurrentPage(item);
                  window.history.replaceState(null, "", `#${item.toLowerCase()}`);
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        </header>
      ) : null}

      <svg aria-hidden="true" className="sprite-sheet">
        <symbol id="maxpreps-mark" viewBox="0 0 152 200">
          <path d="M25 12h33l18 54 18-54h33l-34 79 35 97H95l-19-61-19 61H24l35-97z" />
          <circle cx="76" cy="78" r="17" fill="#ffffff" />
          <circle cx="76" cy="78" r="12" fill="none" stroke="#ed1408" strokeWidth="7" />
        </symbol>
        <symbol id="icon-spark" viewBox="0 0 64 64">
          <path
            d="M31.5 4l4.8 19.7L56 28.5l-19.7 4.8L31.5 53l-4.8-19.7L7 28.5l19.7-4.8z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </symbol>
        <symbol id="icon-network" viewBox="0 0 64 64">
          <circle cx="14" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="42" cy="18" r="6" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="48" cy="46" r="6" fill="none" stroke="currentColor" strokeWidth="4" />
          <path
            d="M19 30l17-9m3 4l5 15M20 35l21 8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </symbol>
        <symbol id="icon-edge" viewBox="0 0 64 64">
          <path
            d="M12 14h40v40"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </symbol>
        <symbol id="icon-pulse" viewBox="0 0 64 64">
          <path
            d="M6 34h12l5-14 8 28 8-20 5 10h14"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </symbol>
        <symbol id="icon-chevron" viewBox="0 0 64 64">
          <path
            d="M18 24l14 16 14-16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </symbol>
      </svg>

      {currentPage === "AI" ? <AiPage /> : null}
      {currentPage === "index" ? <HomePage /> : null}
      {currentPage === "projects" ? (
        <ProjectsPage
          onOpenProject={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
        />
      ) : null}
      {currentPage === "system" ? <SystemPage /> : null}
      {currentPage === "brand" ? <PlaceholderPage title="Brand" /> : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {VARSITY_SIGNAL_PAGES.includes(currentPage) ? (
        <VarsitySignalProjectShell
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
          onExit={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
        />
      ) : null}
      {MDS_PAGES.includes(currentPage) ? (
        <MdsProjectPage
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
          onExit={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
        />
      ) : null}
      {currentPage === "maxpreps-gameday-rush" ? (
        <GameDayRushProjectPage
          onExit={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
        />
      ) : null}
      {GRAYSTONE_PAGES.includes(currentPage) ? (
        <GraystoneExperience
          currentPage={currentPage}
          isAuthenticated={graystoneAuthenticated}
          loginReturnPage={graystoneLoginReturnPage}
          onAuthChange={setGraystoneAuthenticated}
          onLoginReturnPageChange={setGraystoneLoginReturnPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
          onExit={(page) => {
            setCurrentPage(page);
            window.history.replaceState(null, "", `#${page.toLowerCase()}`);
          }}
        />
      ) : null}

      {import.meta.env.DEV ? <Agentation /> : null}
    </>
  );
}
