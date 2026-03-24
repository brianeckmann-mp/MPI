import { useEffect, useRef, useState } from "react";
import { Agentation } from "agentation";
import { initShowcase } from "./showcase";

const NAV_ITEMS = ["index", "system", "brand", "AI", "about"];

function MaxPrepsLogo() {
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
        fill="#E10500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.7676 10.4889C47.7676 12.1164 49.013 13.4357 50.5493 13.4357C52.0856 13.4357 53.331 12.1164 53.331 10.4889C53.331 8.86148 52.0856 7.54199 50.5493 7.54199C49.013 7.54199 47.7676 8.86148 47.7676 10.4889Z"
        fill="#E10500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M143.972 14.2915L144.988 10.6762L142.128 8.06555H132.673L128.513 10.6764L126.456 17.7287L134.902 20.249L134.174 22.7815H132.498L133.149 20.5175H125.676L124.447 24.7955L127.514 27.734H136.508L140.875 24.9718L143.097 17.2458L134.796 14.7936L135.32 13.018H136.999L136.632 14.2915H143.972Z"
        fill="#E10500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M118.091 16.8385H116.363L117.488 13.018H119.155L118.091 16.8385ZM127.221 10.7243L124.331 8.06555H111.514L105.876 27.734H113.234L114.971 21.6495H120.502L124.846 19.0356L127.221 10.7243Z"
        fill="#E10500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.2897 21.791L99.8141 19.9515H105.457L106.958 14.8575H101.335L101.85 13.018H108.802L110.151 8.06555H95.7559L90.1006 27.734H104.478L106.178 21.791H99.2897Z"
        fill="#E10500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.87 15.7065H83.0959L83.868 13.018H85.6391L84.87 15.7065ZM89.0919 17.6669L92.1648 15.776L93.5595 10.7941L90.7074 8.06555H77.8018L72.1616 27.734H79.6265L81.8726 19.9515H83.6519L81.4157 27.734H88.7197L91.0775 19.512L89.0919 17.6669Z"
        fill="#E10500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.6602 16.8005C66.6602 16.8005 64.911 16.8289 64.908 16.8289L65.9984 13.018H67.7475L66.6602 16.8005ZM75.7251 10.7338L72.9087 8.06555H60.3557L56.6338 19.7393L59.2557 27.734H61.7376L63.5282 21.6495H68.9529L73.3495 19.0805L75.7251 10.7338Z"
        fill="#E10500"
      />
      <mask id="mask0_home_logo" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="8" width="45" height="20">
        <path d="M0 8.06555H44.3639V27.734H0V8.06555Z" fill="white" />
      </mask>
      <g mask="url(#mask0_home_logo)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.5072 19.8123L37.4542 13.018H38.0135L37.2196 19.8246L34.5072 19.8123ZM41.8821 27.734L44.364 19.7795L40.7461 8.06555H33.9582L24.8809 26.5418L29.9366 8.06555H19.9088L14.5454 18.9742L15.3922 8.06555H5.40094L0 27.734H6.12454L9.4752 15.6782L9.17387 27.734H15.3254L21.6721 15.6782L18.2683 27.734H31.6493L32.9885 24.5576L36.5905 24.563L36.1737 27.734H41.8821Z"
          fill="#E10500"
        />
      </g>
    </svg>
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
          {["Intro", "Motion", "Intelligence", "Insights", "Edge", "Pulse", "Next"].map(
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
              </div>
            </div>
          </div>
        </section>

        <section className="scene scene--outro" data-scene="outro" aria-label="Next scene placeholder">
          <div className="scene__inner">
            <div className="scene-layout scene-layout--manifesto">
              <div className="shape-anchor shape-anchor--row" data-anchor="outro"></div>
              <div className="scene-copy">
                <p className="scene-label">Placeholder</p>
                <h2>Future content wires in here.</h2>
                <p>
                  This end scene is ready for navigation, imagery, product storytelling, and the next
                  layer of the MaxPreps AI site build.
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
                  src="/home-index.png"
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
        <div className="scene__inner scene__inner--home">
          <div className="index-story-scene">
            <h2>Every team has a story.</h2>
            <div className="index-story-scene__frame">
              <img
                className={`index-story-scene__image${storyMissing ? " is-hidden" : ""}`}
                src="/index-story.png"
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
        <div className="scene__inner scene__inner--home">
          <div className="index-hype-scene">
            <p className="index-hype-scene__copy index-hype-scene__copy--left">
              We don&rsquo;t create the moments.
            </p>
            <div className="index-hype-scene__frame">
              <img
                className={`index-hype-scene__image${hypeMissing ? " is-hidden" : ""}`}
                src="/index-hype.png"
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
        <div className="scene__inner scene__inner--home">
          <div className="index-athletes-scene">
            <div className="index-athletes-scene__layout">
              <div className="index-athletes-scene__imageWrap">
                <img
                  className={`index-athletes-scene__image${athletesMissing ? " is-hidden" : ""}`}
                  src="/index-athletes.png"
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

function PlaceholderPage({ title }) {
  return (
    <main className="scene-rail scene-rail--home">
      <section className="scene is-active" aria-label={`${title} placeholder`}>
        <div className="scene__inner scene__inner--home">
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
  const [currentPage, setCurrentPage] = useState("index");

  return (
    <>
      <header className="site-header" aria-label="Primary">
        <nav className="site-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`site-nav__link${item === currentPage ? " is-active" : ""}`}
              type="button"
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => setCurrentPage(item)}
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
      {currentPage === "system" ? <PlaceholderPage title="System" /> : null}
      {currentPage === "brand" ? <PlaceholderPage title="Brand" /> : null}
      {currentPage === "about" ? <PlaceholderPage title="About" /> : null}

      {import.meta.env.DEV ? <Agentation /> : null}
    </>
  );
}
