import { useEffect, useId, useRef, useState } from "react";
import { Agentation } from "agentation";
import { initShowcase } from "./showcase";

const NAV_ITEMS = ["index", "system", "brand", "AI", "about"];
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

function getPageFromHash() {
  const rawHash = window.location.hash.replace(/^#/, "");
  const normalized = rawHash.toLowerCase();
  return NAV_ITEMS.find((item) => item.toLowerCase() === normalized) ?? "index";
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

function IntroGate({ state, onDismiss }) {
  const baseUrl = import.meta.env.BASE_URL;

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
              <div className="intro-gate__logo" aria-label="MaxPreps">
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

      <aside className="progress-rail" aria-label="Section progress">
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
            style={{ height: `${(currentScene / Math.max(1, homeScenes.length - 1)) * 100}%` }}
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
              <div className="home-logo" aria-label="MaxPreps">
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
                    <strong>1.5+ Million</strong>
                    <span>games &amp; athletes</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>200,000+</strong>
                    <span>teams</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>20,000+</strong>
                    <span>coaches</span>
                  </div>
                  <div className="index-athletes-scene__stat">
                    <strong>350,000+</strong>
                    <span>coaches</span>
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
            style={{ height: `${systemProgress}%` }}
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
                    {TEAM_THEMES.map((theme) => (
                      <button
                        key={theme.name}
                        type="button"
                        className={`team-palette__swatch${theme.name === selectedTheme.name ? " is-active" : ""}`}
                        onClick={() => setSelectedTheme(theme)}
                        aria-pressed={theme.name === selectedTheme.name}
                        aria-label={`Apply ${theme.name} theme`}
                      >
                        <span
                          className="team-palette__chip"
                          style={{ backgroundColor: theme.primary }}
                        ></span>
                      </button>
                    ))}
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

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromHash());
  const [introState, setIntroState] = useState("active");

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
      {introState !== "done" ? (
        <IntroGate
          state={introState}
          onDismiss={() => {
            if (introState === "active") {
              setIntroState("opening");
            }
          }}
        />
      ) : null}

      <div className="site-brandmark" aria-label="MaxPreps">
        <MaxPrepsWordmark />
      </div>

      <header className="site-header" aria-label="Primary">
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
      {currentPage === "system" ? <SystemPage /> : null}
      {currentPage === "brand" ? <PlaceholderPage title="Brand" /> : null}
      {currentPage === "about" ? <AboutPage /> : null}

      {import.meta.env.DEV ? <Agentation /> : null}
    </>
  );
}
