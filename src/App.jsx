import React, { useEffect, useRef, useState } from "react";
import Navber from "./components/Navber";
import Home from "./pages/Home";
import Skills from "./pages/Skills";

import Contact from "./pages/Contact";
import Services from "./pages/Servics";

/* ---------- Ember field: rising sparks + occasional streaking flare ---------- */
function EmberField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let embers = [];
    let flares = [];
    let w, h;

    const fireColors = [
      [255, 106, 0],   // orange
      [255, 61, 0],    // red-orange
      [255, 174, 0],   // amber
      [255, 30, 30],   // ember red
    ];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
      const count = Math.floor((w * h) / 7000);
      embers = Array.from({ length: count }, () => spawnEmber(Math.random() * h));
    };

    const spawnEmber = (startY) => {
      const c = fireColors[Math.floor(Math.random() * fireColors.length)];
      return {
        x: Math.random() * w,
        y: startY !== undefined ? startY : h + Math.random() * 100,
        r: Math.random() * 1.8 + 0.6,
        color: c,
        baseAlpha: Math.random() * 0.5 + 0.35,
        rise: Math.random() * 0.35 + 0.15,
        drift: Math.random() * 0.6 - 0.3,
        flicker: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const maybeSpawnFlare = () => {
      if (Math.random() < 0.004 && flares.length < 2) {
        const startX = Math.random() * w * 0.6 + w * 0.2;
        const startY = Math.random() * h * 0.4 + h * 0.3;
        flares.push({
          x: startX,
          y: startY,
          len: Math.random() * 70 + 50,
          speed: Math.random() * 6 + 4,
          angle: -Math.PI / 2.3 + (Math.random() * 0.3 - 0.15),
          life: 1,
        });
      }
    };

    let t = 0;
    const loop = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // rising embers
      for (const e of embers) {
        e.y -= e.rise;
        e.x += e.drift;
        if (e.y < -20) {
          Object.assign(e, spawnEmber(h + Math.random() * 60));
        }
        const flicker = Math.sin(t * e.flicker + e.phase) * 0.3;
        const alpha = Math.max(0, e.baseAlpha + flicker);
        const [r, g, b] = e.color;

        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        glow.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,235,200,${Math.min(1, alpha + 0.3)})`;
        ctx.fill();
      }

      // occasional upward flare
      maybeSpawnFlare();
      flares = flares.filter((f) => f.life > 0);
      for (const f of flares) {
        const dx = Math.cos(f.angle) * f.speed;
        const dy = Math.sin(f.angle) * f.speed;
        f.x += dx;
        f.y += dy;
        f.life -= 0.015;

        const tailX = f.x - Math.cos(f.angle) * f.len;
        const tailY = f.y - Math.sin(f.angle) * f.len;
        const grad = ctx.createLinearGradient(f.x, f.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,220,150,${f.life})`);
        grad.addColorStop(1, "rgba(255,61,0,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-[9] opacity-80 mix-blend-screen"
    />
  );
}

/* ---------- Scroll progress bar ---------- */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[90] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#ff3d00] via-[#ffae00] to-[#ff3d00] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function DriftBackground() {
  const rootRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let target = window.scrollY;
    let current = target;
    let mx = 0, my = 0, cmx = 0, cmy = 0;
    let raf;

    const onScroll = () => {
      target = window.scrollY;
    };

    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      current += (target - current) * 0.065;
      cmx += (mx - cmx) * 0.05;
      cmy += (my - cmy) * 0.05;

      if (Math.abs(target - current) < 0.05) {
        current = target;
      }

      if (rootRef.current) {
        rootRef.current.style.setProperty("--scroll", current.toFixed(2));
        rootRef.current.style.setProperty("--mx", cmx.toFixed(3));
        rootRef.current.style.setProperty("--my", cmy.toFixed(3));
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    loop();

    const t = setTimeout(() => setLoaded(true), 50);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`
        fixed
        inset-0
        -z-10
        overflow-hidden
        bg-[linear-gradient(160deg,#050100_0%,#2a0800_28%,#5c1400_50%,#8a2200_68%,#1a0400_100%)]
        transition-[opacity,filter]
        duration-[1400ms]
        ease-out
        motion-reduce:transition-none
        ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}
      `}
      style={{ "--scroll": 0, "--mx": 0, "--my": 0 }}
    >
      <style>{`
        @keyframes emberPulse {
          0%, 100% { opacity: var(--e-min, 0.5); filter: brightness(1); }
          50%      { opacity: var(--e-max, 0.9); filter: brightness(1.25); }
        }
        .ember-glow { animation: emberPulse var(--e-dur, 3.4s) ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ember-glow { animation: none !important; }
        }
      `}</style>

      <EmberField />

      {/* Heat-shimmer noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg
              viewBox='0 0 180 180'
              xmlns='http://www.w3.org/2000/svg'
            %3E
              %3Cfilter id='n'%3E
                %3CfeTurbulence
                  type='fractalNoise'
                  baseFrequency='.82'
                  numOctaves='3'
                  stitchTiles='stitch'
                /%3E
              %3C/filter%3E
              %3Crect
                width='100%25'
                height='100%25'
                filter='url(%23n)'
                opacity='.24'
              /%3E
            %3C/svg%3E")
          `,
        }}
      />

      {/* Center-right backlight — molten core */}
      <div
        className="ember-glow pointer-events-none absolute right-[8vw] top-[10vh] h-[70vh] w-[45vw]
          rounded-full bg-[radial-gradient(circle,#ff8a00_0%,rgba(255,90,0,0.22)_45%,transparent_75%)]
          blur-[10px] will-change-transform"
        style={{
          "--e-dur": "4.2s",
          transform:
            "translate3d(calc(var(--mx) * -14px), calc(var(--scroll) * -0.05px + var(--my) * -10px), 0)",
        }}
      />

      {/* Left neon streak */}
      <div
        className="ember-glow pointer-events-none absolute left-[4vw] top-[-10vh] h-[130vh] w-[6px]
          rounded-full bg-[#ff5a00] blur-[6px] will-change-transform"
        style={{
          "--e-min": 0.45, "--e-max": 0.85, "--e-dur": "2.6s",
          transform: "translate3d(calc(var(--mx) * 6px), calc(var(--scroll) * -0.4px), 0)",
        }}
      />

      {/* Right neon streak */}
      <div
        className="ember-glow pointer-events-none absolute right-[10vw] top-[20vh] h-[110vh] w-[4px]
          rounded-full bg-[#ffb300] blur-[6px] will-change-transform"
        style={{
          "--e-min": 0.3, "--e-max": 0.6, "--e-dur": "3s",
          transform: "translate3d(calc(var(--mx) * -8px), calc(var(--scroll) * -0.6px), 0)",
        }}
      />

      {/* Orb One - deep ember */}
      <div
        className="ember-glow absolute left-[-12vw] top-[78vh] h-[35vw] w-[35vw] min-h-70 min-w-70
          rounded-full bg-[#8a1f00] blur-[1px] mix-blend-screen will-change-transform"
        style={{
          "--e-min": 0.6, "--e-max": 1, "--e-dur": "3.8s",
          transform:
            "translate3d(calc(var(--mx) * 22px), calc(var(--scroll) * -0.22px + var(--my) * 14px), 0) scale(calc(1 + var(--scroll) * 0.00012))",
        }}
      />

      {/* Orb Two - bright coal */}
      <div
        className="ember-glow absolute right-[-5vw] top-[150vh] h-[26vw] w-[26vw]
          rounded-full bg-[#ff4d00] blur-[1px] will-change-transform"
        style={{
          "--e-min": 0.4, "--e-max": 0.75, "--e-dur": "2.9s",
          transform:
            "translate3d(calc(var(--scroll) * 0.02px + var(--mx) * -18px), calc(var(--scroll) * -0.38px), 0)",
        }}
      />

      {/* Orb Three */}
      <div
        className="ember-glow absolute left-[24vw] top-[222vh] h-[40vw] w-[40vw]
          rounded-full bg-[#6b1400] mix-blend-screen will-change-transform
          max-[700px]:left-[-18vw] max-[700px]:h-[76vw] max-[700px]:w-[76vw]"
        style={{
          "--e-min": 0.7, "--e-max": 1, "--e-dur": "4.6s",
          transform:
            "translate3d(calc(var(--mx) * 16px), calc(var(--scroll) * -0.55px), 0) rotate(calc(var(--scroll) * -0.02deg))",
        }}
      />

      {/* Orb Four - amber flicker */}
      <div
        className="ember-glow absolute right-[6vw] top-[300vh] h-[30vw] w-[30vw]
          rounded-full bg-[#ffae00] blur-[1px] will-change-transform"
        style={{
          "--e-min": 0.25, "--e-max": 0.55, "--e-dur": "2.4s",
          transform:
            "translate3d(calc(var(--scroll) * -0.015px + var(--mx) * -20px), calc(var(--scroll) * -0.7px), 0)",
        }}
      />

      {/* Orb Five - dying coal */}
      <div
        className="ember-glow absolute left-[-10vw] top-[378vh] h-[44vw] w-[44vw]
          rounded-full bg-[#3a0a00] will-change-transform
          max-[700px]:left-[-18vw] max-[700px]:h-[76vw] max-[700px]:w-[76vw]"
        style={{
          "--e-min": 0.6, "--e-max": 0.95, "--e-dur": "5.2s",
          transform:
            "translate3d(calc(var(--mx) * 10px), calc(var(--scroll) * -0.85px), 0) scale(calc(1 + var(--scroll) * 0.00018))",
        }}
      />

      {/* Back Ridge */}
      <div
        className="absolute left-[-5vw] top-[70vh] h-[42vh] w-[110vw] rotate-[-4deg]
          rounded-[50%_50%_0_0] bg-[#1a0400] opacity-[0.8] will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--scroll) * -0.14px), 0) rotate(-4deg)" }}
      />

      {/* Front Ridge */}
      <div
        className="absolute left-[-5vw] top-[80vh] h-[42vh] w-[110vw]
          rounded-[50%_50%_0_0] bg-[#0d0200] will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--scroll) * -0.3px), 0) rotate(4deg)" }}
      />
    </div>
  );
}

function Loader({ exiting }) {
  return (
    <div
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6
        bg-[#0d0200]
        transition-[opacity,transform,filter] duration-[650ms] ease-in-out
        ${exiting ? "pointer-events-none scale-105 opacity-0 blur-md" : "opacity-100"}
      `}
    >
      <style>{`
        @keyframes ringSpin { to { transform: rotate(360deg); } }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.07); }
        }
        @keyframes barFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .loader-ring, .loader-mono, .loader-bar { animation: none !important; }
        }
      `}</style>

      <div className="relative flex h-24 w-24 items-center justify-center">
        <span
          className="loader-ring absolute inset-0 rounded-full border-2 border-[#ff5a00]/25 border-t-[#ff5a00]"
          style={{ animation: "ringSpin 1.1s linear infinite" }}
        />
        <span
          className="loader-mono text-lg font-semibold tracking-widest text-[#ffb066]"
          style={{ animation: "pulseGlow 1.6s ease-in-out infinite" }}
        >
          NS
        </span>
      </div>

      <div className="h-[3px] w-40 overflow-hidden rounded-full bg-[#f6ece8]/10">
        <div
          className="loader-bar h-full rounded-full bg-gradient-to-r from-[#ff3d00] to-[#ffae00]"
          style={{ animation: "barFill 1.3s ease-in-out forwards" }}
        />
      </div>

      <p className="text-xs uppercase tracking-[0.35em] text-[#c99b83]">Loading</p>
    </div>
  );
}

/* ---------- Back-to-top button ---------- */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`
        fixed bottom-8 right-8 z-[80] flex h-12 w-12 items-center justify-center
        rounded-full border border-[#ff5a00]/40 bg-[#0d0200]/70 backdrop-blur-sm
        text-[#ffae66] shadow-[0_0_20px_rgba(255,90,0,0.4)]
        transition-all duration-300 ease-out
        hover:scale-110 hover:bg-[#ff5a00]/20
        ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}
      `}
    >
      ↑
    </button>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1300));
    const pageReady = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });

    Promise.all([minDelay, pageReady]).then(() => {
      setIsLoading(false);
      setTimeout(() => setShowLoader(false), 650);
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <DriftBackground />
      <ScrollProgress />

      {showLoader && <Loader exiting={!isLoading} />}

      {!isLoading && (
        <div className="relative z-10 flex min-h-screen flex-col items-center gap-24 pb-24">
          <Navber />
          <Home />
          <Skills />
          <Services/>
          {/* <Contact/> */}
          <Contact />
          <BackToTop />
        </div>
      )}
    </div>
  );
}

export default App;