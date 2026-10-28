import { lazy, Suspense, useEffect, useState } from "react";
import Navber from "./components/Navber";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));

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
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior:
            window.matchMedia(
              "(max-width: 767px), (prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth",
        })
      }
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center
        border border-cyan-500/30 bg-black/90 font-mono text-cyan-200
        transition-[opacity,transform] duration-200
        hover:scale-105 hover:border-cyan-300/60
        ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}
      `}
    >
      ↑
    </button>
  );
}

function App() {
  return (
    <div className="site-background min-h-screen text-slate-100">
      <Navber />
      <main className="relative z-10 flex min-h-screen flex-col items-center gap-20 px-0 pb-20 pt-16 sm:gap-24 sm:pb-24">
        <Home />
        <Suspense fallback={<div className="min-h-screen w-full" aria-hidden="true" />}>
          <About />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <BackToTop />
    </div>
  );
}

export default App;
