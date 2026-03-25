export function initShowcase() {
  const DOT_COUNT = 12;
  const SNAP_DURATION = 1250;
  const WHEEL_THRESHOLD = 90;

  const rail = document.querySelector("#sceneRail");
  const scenes = [...document.querySelectorAll(".scene")];
  const introScene = document.querySelector(".scene--intro");
  const scrollCue = document.querySelector("#scrollCue");
  const globalDotsEl = document.querySelector("#globalDots");
  const progressFill = document.querySelector("#progressFill");
  const progressPoints = [...document.querySelectorAll(".progress-rail__point")];

  if (!rail || !introScene || !scrollCue || !globalDotsEl || !progressFill) {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const palette = ["#ed1408", "#ef3129", "#f24a43", "#f56662", "#f78d89", "#f9b6b3", "#fce9e8"];
  const anchors = Object.fromEntries(
    [...document.querySelectorAll("[data-anchor]")].map((node) => [node.dataset.anchor, node]),
  );
  const dots = createDots(globalDotsEl, DOT_COUNT, 18);
  const pointer = { x: 0.5, y: 0.5 };

  let currentSceneIndex = 0;
  let isSnapping = false;
  let touchStartY = 0;
  let wheelAccumulator = 0;
  let rafId = 0;
  let snapTimeoutId = 0;

  const introTimeline = {
    start: performance.now(),
    dropEnd: prefersReducedMotion ? 260 : 1050,
    spinEnd: prefersReducedMotion ? 520 : 1850,
    textAt: prefersReducedMotion ? 680 : 2350,
    cueAt: prefersReducedMotion ? 860 : 2950,
  };

  const shapeRow = Array.from({ length: DOT_COUNT }, (_, index) => [
    0.08 + index * 0.075,
    0.5 + Math.sin(index * 0.45) * 0.01,
  ]);

  const shapeIntelligence = [
    [0.5, 0.08],
    [0.36, 0.24],
    [0.64, 0.24],
    [0.18, 0.44],
    [0.36, 0.44],
    [0.64, 0.44],
    [0.82, 0.44],
    [0.4, 0.64],
    [0.6, 0.64],
    [0.5, 0.82],
    [0.5, 0.44],
    [0.5, 0.64],
  ];

  const shapeInsights = [
    [0.26, 0.18],
    [0.5, 0.24],
    [0.74, 0.3],
    [0.38, 0.42],
    [0.62, 0.48],
    [0.5, 0.68],
    [0.5, 0.68],
    [0.5, 0.68],
    [0.5, 0.68],
    [0.5, 0.68],
    [0.5, 0.68],
    [0.5, 0.68],
  ];

  const shapeEdge = [
    [0.18, 0.24],
    [0.36, 0.24],
    [0.54, 0.24],
    [0.72, 0.24],
    [0.72, 0.42],
    [0.72, 0.6],
    [0.72, 0.78],
    [0.72, 0.78],
    [0.72, 0.78],
    [0.72, 0.78],
    [0.72, 0.78],
    [0.72, 0.78],
  ];

  const shapePulse = [
    [0.42, 0.16],
    [0.2, 0.34],
    [0.38, 0.34],
    [0.56, 0.34],
    [0.52, 0.52],
    [0.7, 0.52],
    [0.88, 0.52],
    [0.64, 0.68],
    [0.64, 0.68],
    [0.64, 0.68],
    [0.64, 0.68],
    [0.64, 0.68],
  ];

  const sceneShapes = {
    manifesto: {
      points: shapeRow,
      visibility: Array.from({ length: DOT_COUNT }, () => 1),
    },
    intelligence: {
      points: shapeIntelligence,
      visibility: [1, 0.78, 0.78, 0.62, 0.44, 0.44, 0.62, 0.34, 0.34, 0.22, 0.3, 0.18],
    },
    insights: {
      points: shapeInsights,
      visibility: [1, 0.72, 0.38, 0.8, 0.42, 0.18, 0, 0, 0, 0, 0, 0],
    },
    edge: {
      points: shapeEdge,
      visibility: [0.35, 0.5, 0.72, 1, 0.86, 0.56, 0.26, 0, 0, 0, 0, 0],
    },
    pulse: {
      points: shapePulse,
      visibility: [0.74, 0.28, 0.46, 0.68, 0.66, 0.82, 1, 0.38, 0, 0, 0, 0],
    },
  };

  function createDots(container, count, size) {
    container.innerHTML = "";
    return Array.from({ length: count }, (_, index) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.style.setProperty("--size", `${size}px`);
      dot.style.setProperty("--color", paletteColor(index, count));
      dot.style.setProperty("--opacity", "0");
      container.appendChild(dot);
      return dot;
    });
  }

  function paletteColor(index, count) {
    const progress = count <= 1 ? 0 : index / (count - 1);
    const paletteIndex = Math.min(
      palette.length - 1,
      Math.round(progress * (palette.length - 1)),
    );
    return palette[paletteIndex];
  }

  function getAnchorRect(name) {
    const anchor = anchors[name];
    return anchor ? anchor.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
  }

  function getIntroCircleShape(time) {
    const elapsed = time - introTimeline.start;
    const spinProgress =
      elapsed <= introTimeline.dropEnd
        ? 0
        : Math.min(
            1,
            (elapsed - introTimeline.dropEnd) /
              Math.max(1, introTimeline.spinEnd - introTimeline.dropEnd),
          );
    const rotation = Math.PI * 0.8 * spinProgress;
    const pointerPullX = (pointer.x - 0.5) * 0.1;
    const pointerPullY = (pointer.y - 0.5) * 0.1;

    return Array.from({ length: DOT_COUNT }, (_, index) => {
      const angle = (Math.PI * 2 * index) / DOT_COUNT + rotation - Math.PI / 2;
      const radius = 0.34 + Math.sin(time / 1400 + index * 0.3) * 0.012;
      return [
        0.5 + Math.cos(angle) * radius + pointerPullX * Math.cos(angle),
        0.5 + Math.sin(angle) * radius + pointerPullY * Math.sin(angle),
      ];
    });
  }

  function renderDots(shape, rect, options = {}) {
    const {
      floatAmount = 1.8,
      pointerInfluence = 0,
      opacityBase = 0.98,
      fadeIn = 1,
      visibility = [],
    } = options;

    dots.forEach((dot, index) => {
      const [px, py] = shape[index % shape.length];
      const floatX = prefersReducedMotion ? 0 : Math.sin(performance.now() / 1400 + index * 0.5) * floatAmount;
      const floatY = prefersReducedMotion ? 0 : Math.cos(performance.now() / 1500 + index * 0.55) * floatAmount;
      const parallaxX = (pointer.x - 0.5) * pointerInfluence * (0.35 + (index % 4) * 0.09);
      const parallaxY = (pointer.y - 0.5) * pointerInfluence * (0.35 + (index % 5) * 0.08);
      const scale = 1 + Math.cos(performance.now() / 1000 + index * 0.45) * 0.025;
      const visible = visibility[index] ?? 1;

      dot.style.setProperty("--x", `${rect.left + px * rect.width + floatX + parallaxX}px`);
      dot.style.setProperty("--y", `${rect.top + py * rect.height + floatY + parallaxY}px`);
      dot.style.setProperty("--scale", scale.toFixed(3));
      dot.style.setProperty("--opacity", `${Math.max(0, (opacityBase - index * 0.018) * visible) * fadeIn}`);
      dot.style.setProperty("--color", paletteColor(index, dots.length));
    });
  }

  function introReady() {
    return prefersReducedMotion || introScene.classList.contains("is-cue-visible");
  }

  function updateIntro(now) {
    const elapsed = now - introTimeline.start;
    const rect = getAnchorRect("intro");
    const circleShape = getIntroCircleShape(now);
    const dropProgress = Math.min(1, elapsed / Math.max(1, introTimeline.dropEnd));
    const easedDrop = 1 - Math.pow(1 - dropProgress, 3);
    const shape = circleShape.map(([px, py]) => [px, py * easedDrop + -0.22 * (1 - easedDrop)]);
    const fadeIn = Math.min(1, elapsed / (prefersReducedMotion ? 140 : 520));

    if (elapsed >= introTimeline.textAt) {
      introScene.classList.add("is-lockup-visible");
    }

    if (elapsed >= introTimeline.cueAt) {
      introScene.classList.add("is-cue-visible");
    }

    renderDots(shape, rect, {
      floatAmount: 1.1,
      pointerInfluence: 18,
      opacityBase: 0.96,
      fadeIn,
    });
  }

  function updateSceneDots() {
    const sceneName = scenes[currentSceneIndex]?.dataset.scene;
    if (!sceneName || sceneName === "intro") {
      return;
    }

    const rect = getAnchorRect(sceneName);
    const sceneShape = sceneShapes[sceneName] || sceneShapes.manifesto;
    const isBrandScene = ["intelligence", "insights", "edge", "pulse"].includes(sceneName);

    renderDots(sceneShape.points, rect, {
      floatAmount: isBrandScene ? 0.55 : 0.75,
      pointerInfluence: isBrandScene ? 2.5 : 2,
      opacityBase: 0.95,
      fadeIn: 1,
      visibility: sceneShape.visibility,
    });
  }

  function updateActiveScene() {
    const viewport = rail.clientHeight || window.innerHeight;
    currentSceneIndex = Math.max(
      0,
      Math.min(scenes.length - 1, Math.round(rail.scrollTop / viewport)),
    );

    scenes.forEach((scene, index) => {
      scene.classList.toggle("is-active", index === currentSceneIndex);
    });

    progressPoints.forEach((point, index) => {
      point.classList.toggle("is-active", index === currentSceneIndex);
    });

    const progress = rail.scrollTop / Math.max(1, rail.scrollHeight - rail.clientHeight);
    progressFill.style.height = `${progress * 100}%`;
  }

  function snapToScene(index) {
    const targetIndex = Math.max(0, Math.min(scenes.length - 1, index));
    if (targetIndex === currentSceneIndex) {
      return;
    }

    isSnapping = true;
    wheelAccumulator = 0;
    rail.scrollTo({
      top: scenes[targetIndex].offsetTop,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.clearTimeout(snapTimeoutId);
    snapTimeoutId = window.setTimeout(() => {
      isSnapping = false;
      updateActiveScene();
    }, prefersReducedMotion ? 140 : SNAP_DURATION);
  }

  function canAdvanceForward() {
    return currentSceneIndex !== 0 || introReady();
  }

  function handleWheel(event) {
    if (prefersReducedMotion || isSnapping) {
      return;
    }

    event.preventDefault();
    wheelAccumulator += event.deltaY;

    if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) {
      return;
    }

    const direction = wheelAccumulator > 0 ? 1 : -1;
    wheelAccumulator = 0;

    if (direction > 0 && !canAdvanceForward()) {
      return;
    }

    snapToScene(currentSceneIndex + direction);
  }

  function handleKeydown(event) {
    if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      if (!canAdvanceForward()) {
        return;
      }
      snapToScene(currentSceneIndex + 1);
    }

    if (event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      snapToScene(currentSceneIndex - 1);
    }
  }

  function handleTouchStart(event) {
    touchStartY = event.changedTouches[0].clientY;
  }

  function handleTouchEnd(event) {
    if (isSnapping) {
      return;
    }

    const deltaY = touchStartY - event.changedTouches[0].clientY;
    if (Math.abs(deltaY) < 44) {
      return;
    }

    if (deltaY > 0 && !canAdvanceForward()) {
      return;
    }

    snapToScene(currentSceneIndex + (deltaY > 0 ? 1 : -1));
  }

  function handlePointerMove(event) {
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = event.clientY / window.innerHeight;
  }

  function animate(now) {
    if (scenes[currentSceneIndex]?.dataset.scene === "intro") {
      updateIntro(now);
    } else {
      updateSceneDots();
    }

    rafId = window.requestAnimationFrame(animate);
  }

  function handleResize() {
    updateActiveScene();
  }

  function handleScrollCueClick() {
    if (canAdvanceForward()) {
      snapToScene(1);
    }
  }

  scrollCue.addEventListener("click", handleScrollCueClick);
  progressPoints.forEach((point) => {
    point.addEventListener("click", () => {
      const targetIndex = Number(point.dataset.target);
      if (targetIndex > 0 && !canAdvanceForward()) {
        return;
      }
      snapToScene(targetIndex);
    });
  });

  rail.addEventListener("wheel", handleWheel, { passive: false });
  rail.addEventListener("scroll", updateActiveScene, { passive: true });
  window.addEventListener("keydown", handleKeydown);
  rail.addEventListener("touchstart", handleTouchStart, { passive: true });
  rail.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  updateActiveScene();
  rafId = window.requestAnimationFrame(animate);

  return () => {
    window.cancelAnimationFrame(rafId);
    window.clearTimeout(snapTimeoutId);
    scrollCue.removeEventListener("click", handleScrollCueClick);
    rail.removeEventListener("wheel", handleWheel);
    rail.removeEventListener("scroll", updateActiveScene);
    window.removeEventListener("keydown", handleKeydown);
    rail.removeEventListener("touchstart", handleTouchStart);
    rail.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", handleResize);
    globalDotsEl.innerHTML = "";
  };
}
