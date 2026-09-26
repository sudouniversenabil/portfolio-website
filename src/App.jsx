import React, { useEffect, useRef, useState } from "react";
import Navber from "./components/Navber";
import Home from "./pages/Home";
import Skills from "./pages/Skills";


import Contact from "./pages/Contact";

function DriftBackground() {
  const rootRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let target = window.scrollY;
    let current = target;
    let raf;

    const onScroll = () => {
      target = window.scrollY;
    };

    const loop = () => {
      current += (target - current) * 0.065;

      if (Math.abs(target - current) < 0.05) {
        current = target;
      }

      if (rootRef.current) {
        rootRef.current.style.setProperty("--scroll", current.toFixed(2));
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    loop();

    const t = setTimeout(() => setLoaded(true), 50);

    return () => {
      window.removeEventListener("scroll", onScroll);
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
        bg-[linear-gradient(160deg,#050203_0%,#1a0508_32%,#3a0a12_58%,#170307_100%)]
        transition-[opacity,filter]
        duration-[1400ms]
        ease-out
        motion-reduce:transition-none
        ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}
      `}
      style={{ "--scroll": 0 }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light"
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

      {/* Center-right backlight */}
      <div
        className="
          pointer-events-none absolute right-[8vw] top-[10vh] h-[70vh] w-[45vw]
          rounded-full bg-[radial-gradient(circle,#ff2d4a_0%,rgba(255,45,74,0.18)_45%,transparent_75%)]
          opacity-70 blur-[10px] will-change-transform
        "
        style={{ transform: "translate3d(0, calc(var(--scroll) * -0.05px), 0)" }}
      />

      {/* Left neon streak */}
      <div
        className="
          pointer-events-none absolute left-[4vw] top-[-10vh] h-[130vh] w-[6px]
          rounded-full bg-[#ff3b57] opacity-60 blur-[6px] will-change-transform
        "
        style={{ transform: "translate3d(0, calc(var(--scroll) * -0.4px), 0)" }}
      />

      {/* Right neon streak */}
      <div
        className="
          pointer-events-none absolute right-[10vw] top-[20vh] h-[110vh] w-[4px]
          rounded-full bg-[#ff7a8a] opacity-45 blur-[6px] will-change-transform
        "
        style={{ transform: "translate3d(0, calc(var(--scroll) * -0.6px), 0)" }}
      />

      {/* Orb One */}
      <div
        className="
          absolute left-[-12vw] top-[78vh] h-[35vw] w-[35vw] min-h-70 min-w-70
          rounded-full bg-[#7a1020] blur-[1px] mix-blend-screen will-change-transform
        "
        style={{
          transform:
            "translate3d(0, calc(var(--scroll) * -0.22px), 0) scale(calc(1 + var(--scroll) * 0.00012))",
        }}
      />

      {/* Orb Two */}
      <div
        className="
          absolute right-[-5vw] top-[150vh] h-[26vw] w-[26vw]
          rounded-full bg-[#ff2d4a] opacity-[0.5] blur-[1px] will-change-transform
        "
        style={{
          transform:
            "translate3d(calc(var(--scroll) * 0.02px), calc(var(--scroll) * -0.38px), 0)",
        }}
      />

      {/* Orb Three */}
      <div
        className="
          absolute left-[24vw] top-[222vh] h-[40vw] w-[40vw]
          rounded-full bg-[#450a12] opacity-[0.85] blur-[1px] mix-blend-screen will-change-transform
          max-[700px]:left-[-18vw] max-[700px]:h-[76vw] max-[700px]:w-[76vw]
        "
        style={{
          transform:
            "translate3d(0, calc(var(--scroll) * -0.55px), 0) rotate(calc(var(--scroll) * -0.02deg))",
        }}
      />

      {/* Orb Four */}
      <div
        className="
          absolute right-[6vw] top-[300vh] h-[30vw] w-[30vw]
          rounded-full bg-[#ff5c72] opacity-[0.35] blur-[1px] will-change-transform
        "
        style={{
          transform:
            "translate3d(calc(var(--scroll) * -0.015px), calc(var(--scroll) * -0.7px), 0)",
        }}
      />

      {/* Orb Five */}
      <div
        className="
          absolute left-[-10vw] top-[378vh] h-[44vw] w-[44vw]
          rounded-full bg-[#2a060c] opacity-[0.8] blur-[1px] will-change-transform
          max-[700px]:left-[-18vw] max-[700px]:h-[76vw] max-[700px]:w-[76vw]
        "
        style={{
          transform:
            "translate3d(0, calc(var(--scroll) * -0.85px), 0) scale(calc(1 + var(--scroll) * 0.00018))",
        }}
      />

      {/* Back Ridge */}
      <div
        className="
          absolute left-[-5vw] top-[70vh] h-[42vh] w-[110vw] rotate-[-4deg]
          rounded-[50%_50%_0_0] bg-[#130205] opacity-[0.75] will-change-transform
        "
        style={{ transform: "translate3d(0, calc(var(--scroll) * -0.14px), 0) rotate(-4deg)" }}
      />

      {/* Front Ridge */}
      <div
        className="
          absolute left-[-5vw] top-[80vh] h-[42vh] w-[110vw]
          rounded-[50%_50%_0_0] bg-[#0a0102] will-change-transform
        "
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
        bg-[#050203]
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
          className="loader-ring absolute inset-0 rounded-full border-2 border-[#ff3b57]/20 border-t-[#ff3b57]"
          style={{ animation: "ringSpin 1.1s linear infinite" }}
        />
        <span
          className="loader-mono text-lg font-semibold tracking-widest text-[#ff8a97]"
          style={{ animation: "pulseGlow 1.6s ease-in-out infinite" }}
        >
          NS
        </span>
      </div>

      <div className="h-[3px] w-40 overflow-hidden rounded-full bg-[#f6ece8]/10">
        <div
          className="loader-bar h-full rounded-full bg-[#ff3b57]"
          style={{ animation: "barFill 1.3s ease-in-out forwards" }}
        />
      </div>

      <p className="text-xs uppercase tracking-[0.35em] text-[#b7ada9]">Loading</p>
    </div>
  );
}

function App() {
  // isLoading gates the real page and its entrance animations.
  // showLoader stays true a bit longer so the loader's own fade-out can play.
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Keep the loader up for a minimum time so it never just flashes,
    // and also wait for the actual page (images etc.) to finish loading.
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
      // matches Loader's 650ms exit transition above
      setTimeout(() => setShowLoader(false), 650);
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <DriftBackground />

      {showLoader && <Loader exiting={!isLoading} />}

      {/* Mounting the page only once loading is done means Navber/Home/Skills
          play their own entrance animations right as the loader fades away. */}
      {!isLoading && (
        <div className="relative z-10 flex min-h-screen flex-col items-center gap-24 pb-24">
          <Navber />
          <Home />
          <Skills />
          {/* <Contact/> */}
          <Contact/>
        </div>

      )}
    </div>
  );
}

export default App;