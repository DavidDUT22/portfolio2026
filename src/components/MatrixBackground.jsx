import { useEffect, useRef } from "react";

/**
 * Tunable configuration for the Matrix rain effect.
 * Adjust these values to change the look and feel of the animation.
 */
const MATRIX_CONFIG = {
  // Characters used in the falling streams.
  characters:
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*+-=/<>",
  fontSize: 16, // px, size of each character
  color: "#20b2a6", // matches the portfolio's --color-primary teal-green
  leadColor: "#eafff9", // near-white leading character for a subtle "brighter head" effect
  glow: 6, // px, canvas shadowBlur strength
  fps: 24, // animation frames per second (lower = better performance)
  baseOpacity: 0.14, // overall canvas opacity (readability control)
  trailFade: 0.08, // how quickly trailing characters fade (higher = shorter trails)
  minSpeed: 0.4, // rows per frame, slowest streams
  maxSpeed: 1.1, // rows per frame, fastest streams
  densityDesktop: 1, // 1 = one stream per column
  densityMobile: 0.6, // fewer streams on small screens
  mobileBreakpoint: 768, // px
  reducedMotionOpacity: 0.05, // static/near-static opacity when prefers-reduced-motion is set
};

export const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let columns = [];
    let animationFrameId = null;
    let lastFrameTime = 0;
    let resizeTimeout = null;
    let width = 0;
    let height = 0;

    const isMobile = () => window.innerWidth < MATRIX_CONFIG.mobileBreakpoint;

    const buildColumns = () => {
      const density = isMobile()
        ? MATRIX_CONFIG.densityMobile
        : MATRIX_CONFIG.densityDesktop;

      const columnWidth = MATRIX_CONFIG.fontSize;
      const columnCount = Math.floor(width / columnWidth);
      const activeCount = Math.max(1, Math.floor(columnCount * density));

      // Pick a pseudo-random subset of columns so streams don't fill every pixel.
      const allIndexes = Array.from({ length: columnCount }, (_, i) => i);
      for (let i = allIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
      }
      const chosen = allIndexes.slice(0, activeCount);

      columns = chosen.map((colIndex) => ({
        x: colIndex * columnWidth,
        y: Math.random() * -height, // stagger starting positions
        speed:
          MATRIX_CONFIG.minSpeed +
          Math.random() * (MATRIX_CONFIG.maxSpeed - MATRIX_CONFIG.minSpeed),
        length: 8 + Math.floor(Math.random() * 18),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${MATRIX_CONFIG.fontSize}px monospace`;

      buildColumns();
      // Clear on resize so no stale artifacts remain at the old canvas size.
      ctx.clearRect(0, 0, width, height);
    };

    const randomChar = () =>
      MATRIX_CONFIG.characters[
        Math.floor(Math.random() * MATRIX_CONFIG.characters.length)
      ];

    const drawFrame = () => {
      // Semi-transparent fill creates the fading trail effect without
      // tracking per-character state.
      ctx.fillStyle = `rgba(15, 20, 24, ${MATRIX_CONFIG.trailFade})`;
      ctx.fillRect(0, 0, width, height);

      ctx.shadowBlur = MATRIX_CONFIG.glow;
      ctx.shadowColor = MATRIX_CONFIG.color;

      for (const col of columns) {
        for (let i = 0; i < col.length; i++) {
          const charY = col.y - i * MATRIX_CONFIG.fontSize;
          if (charY < -MATRIX_CONFIG.fontSize || charY > height) continue;

          const isLead = i === 0;
          ctx.fillStyle = isLead ? MATRIX_CONFIG.leadColor : MATRIX_CONFIG.color;
          ctx.globalAlpha = isLead ? 1 : Math.max(0.15, 1 - i / col.length);
          ctx.fillText(randomChar(), col.x, charY);
        }

        col.y += col.speed * MATRIX_CONFIG.fontSize * 0.1;

        // Reset the stream once it has fully fallen past the viewport.
        if (col.y - col.length * MATRIX_CONFIG.fontSize > height) {
          col.y = Math.random() * -height * 0.5;
          col.speed =
            MATRIX_CONFIG.minSpeed +
            Math.random() *
              (MATRIX_CONFIG.maxSpeed - MATRIX_CONFIG.minSpeed);
          col.length = 8 + Math.floor(Math.random() * 18);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const tick = (time) => {
      animationFrameId = requestAnimationFrame(tick);

      const frameInterval = 1000 / MATRIX_CONFIG.fps;
      if (time - lastFrameTime < frameInterval) return;
      lastFrameTime = time;

      drawFrame();
    };

    const drawStaticFrame = () => {
      // A single, gentle frame for reduced-motion users: still on-theme,
      // but no continuous animation.
      ctx.fillStyle = "rgba(15, 20, 24, 1)";
      ctx.fillRect(0, 0, width, height);
      ctx.shadowBlur = MATRIX_CONFIG.glow;
      ctx.shadowColor = MATRIX_CONFIG.color;
      ctx.fillStyle = MATRIX_CONFIG.color;

      for (const col of columns) {
        ctx.globalAlpha = 0.5;
        ctx.fillText(randomChar(), col.x, col.y % height);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const start = () => {
      resize();

      if (reducedMotionQuery.matches) {
        drawStaticFrame();
        return;
      }

      lastFrameTime = 0;
      animationFrameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        stop();
        start();
      }, 150);
    };

    const handleMotionPreferenceChange = () => {
      stop();
      start();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else if (!reducedMotionQuery.matches) {
        lastFrameTime = 0;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    start();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener(
      "change",
      handleMotionPreferenceChange
    );

    return () => {
      stop();
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      reducedMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        opacity: MATRIX_CONFIG.baseOpacity,
      }}
    />
  );
};
