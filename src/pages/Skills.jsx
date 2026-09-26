import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "HTML5", icon: "Ht", category: "Frontend", level: 90, note: "Semantic, accessible markup for every page I build." },
  { name: "CSS3", icon: "Cs", category: "Frontend", level: 85, note: "Layouts, animations, and styling from scratch." },
  { name: "JavaScript", icon: "Js", category: "Frontend", level: 85, note: "Core language for everything I build on the web." },
  { name: "React.js", icon: "Re", category: "Frontend", level: 80, note: "Building interactive UIs with components and hooks." },
  { name: "Next.js", icon: "Nx", category: "Frontend", level: 50, learning: true, note: "Actively learning this right now — routing, SSR, app router." },
  { name: "Tailwind CSS", icon: "Tw", category: "Frontend", level: 90, note: "Styling fast with utility classes, no context switching." },
  { name: "Responsive Design", icon: "Rd", category: "Frontend", level: 75, note: "Layouts that work from phone to desktop." },
  { name: "Node.js", icon: "No", category: "Backend", level: 90, note: "Running JavaScript on the server, outside the browser." },
  { name: "Express.js", icon: "Ex", category: "Backend", level: 80, note: "Routing and middleware for REST APIs." },
  { name: "REST API", icon: "Ra", category: "Backend", level: 70, note: "Designing predictable endpoints for client-server communication." },
  { name: "FastAPI", icon: "Fa", category: "Backend", level: 75, learning: true, note: "Currently learning this for Python backend development." },
  { name: "Auth & JWT", icon: "Jw", category: "Backend", level: 65, note: "Login flows and token-based authentication." },
  { name: "MongoDB", icon: "Mo", category: "Database", level: 80, note: "Document database for flexible, JSON-like data." },
  { name: "PostgreSQL", icon: "Pg", category: "Database", level: 60, note: "Relational database for structured, related data." },
  { name: "Git & GitHub", icon: "Gh", category: "Tools", level: 75, note: "Version control and collaborating on code." },
];

const categories = ["Frontend", "Backend", "Database", "Tools"];

const Skills = () => {
  const [activeCat, setActiveCat] = useState("Frontend");
  const [revealed, setRevealed] = useState(false);
  const [barsOn, setBarsOn] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-trigger the bar-fill animation every time the active category changes
  useEffect(() => {
    setBarsOn(false);
    const t = setTimeout(() => setBarsOn(true), 80);
    return () => clearTimeout(t);
  }, [activeCat, revealed]);

  const visibleSkills = skills.filter((s) => s.category === activeCat);

  const categoryAverages = categories.map((cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    const avg = Math.round(
      catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length
    );
    return { cat, avg };
  });

  const lowestCat = categoryAverages.reduce((min, c) =>
    c.avg < min.avg ? c : min
  );

  return (
    <div
      id="skills"
      ref={sectionRef}
      className="flex min-h-screen w-full scroll-mt-24 items-center justify-center px-[5%] pb-16"
    >
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInSide {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
        @keyframes barGlowPulse {
          0%, 100% { filter: brightness(1); }
          50%      { filter: brightness(1.35); }
        }
        .reveal { opacity: 0; }
        .reveal.on { animation: revealUp 0.7s ease-out both; }
        .bar-fill { transition: width 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .bar-shimmer {
          animation: shimmer 2.2s ease-in-out infinite;
          animation-delay: 1s;
        }
        .bar-glow { animation: barGlowPulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .skill-card, .bar-fill, .bar-shimmer, .bar-glow {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      <div
        className="
          w-full max-w-[1100px] rounded-[28px] border border-[#ff5a00]/20
          bg-[linear-gradient(135deg,rgba(90,20,0,0.5),rgba(13,2,0,0.7))]
          p-8 text-[#f6ece8] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]
          backdrop-blur-2xl md:p-14
        "
      >
        <div className={`reveal ${revealed ? "on" : ""}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d9cdc9]/70">
            What I work with
          </p>
          <h1 className="mt-2 font-['Fraunces',_'Georgia',_serif] text-[clamp(2rem,4.5vw,3rem)] font-semibold">
            See my skills
          </h1>
          <p className="mt-3 max-w-[60ch] text-[#d9cdc9]">
            Pick a category to see what I use to build the frontend, the backend, and everything that connects them — with an honest look at how confident I am in each.
          </p>
        </div>

        {/* Category pills */}
        <div
          className={`reveal mt-8 flex flex-wrap gap-2 ${revealed ? "on" : ""}`}
          style={{ animationDelay: "0.15s" }}
        >
          {categories.map((cat) => {
            const isActive = activeCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onMouseEnter={() => setActiveCat(cat)}
                onClick={() => setActiveCat(cat)}
                className={`
                  relative rounded-xl border px-5 py-2.5 text-sm font-medium
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "border-[#ff5a00]/50 bg-[#ff5a00]/15 text-[#ffae66]"
                      : "border-[#f6ece8]/15 bg-[#f6ece8]/[0.05] text-[#f6ece8]/80 hover:border-[#ff5a00]/30 hover:text-[#ffae66]"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Overall category comparison chart */}
        <div
          className={`reveal mt-7 rounded-2xl border border-[#f6ece8]/10 bg-[#f6ece8]/[0.03] p-5 ${revealed ? "on" : ""}`}
          style={{ animationDelay: "0.25s" }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#d9cdc9]/60">
            Overall strength by category
          </p>
          <div className="flex flex-col gap-3.5">
            {categoryAverages.map(({ cat, avg }) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm text-[#f6ece8]/85">
                  {cat}
                </span>
                <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[#f6ece8]/10">
                  <div
                    className="bar-fill bar-glow relative h-full rounded-full bg-gradient-to-r from-[#ff3d00] via-[#ff8a00] to-[#ffcf00]"
                    style={{ width: revealed ? `${avg}%` : "0%" }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm tabular-nums text-[#ffae66]">
                  {avg}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs italic text-[#d9cdc9]/60">
            {lowestCat.cat} sits a bit lower right now ({lowestCat.avg}%) — still building depth here as a fresher, growing fast.
          </p>
        </div>

        {/* Skill cards for the active category */}
        <div
          key={activeCat}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleSkills.map((skill, i) => (
            <div
              key={skill.name}
              tabIndex={0}
              className="
                skill-card group relative flex flex-col gap-3 overflow-hidden
                rounded-2xl border border-[#f6ece8]/15 bg-[#f6ece8]/5 p-5
                backdrop-blur-xl transition-all duration-500 ease-out
                hover:-translate-y-1 hover:border-[#ff5a00]/50 hover:bg-[#f6ece8]/10
                hover:shadow-[0_10px_40px_-15px_rgba(255,90,0,0.5)]
                focus:border-[#ff5a00]/50 focus:outline-none
              "
              style={{ animation: `slideInSide 0.5s ease-out ${i * 0.06}s both` }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="
                    flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                    border border-[#ff5a00]/30 bg-[#ff5a00]/10 text-sm font-semibold text-[#ffae66]
                    transition-transform duration-500 ease-out group-hover:scale-110
                  "
                >
                  {skill.icon}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="
                        block truncate text-base font-medium text-[#f6ece8]
                        transition-all duration-500 ease-out
                        group-hover:-translate-y-0.5 group-focus:-translate-y-0.5
                      "
                    >
                      {skill.name}
                    </span>
                    {skill.learning ? (
                      <span className="shrink-0 rounded-full border border-[#ffcf00]/40 bg-[#ffcf00]/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#ffcf66]">
                        Learning
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs tabular-nums text-[#ffae66]">
                        {skill.level}%
                      </span>
                    )}
                  </div>

                  {/* Proficiency bar */}
                  <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-[#f6ece8]/10">
                    <div
                      className="bar-fill relative h-full rounded-full bg-gradient-to-r from-[#ff3d00] via-[#ff8a00] to-[#ffcf00]"
                      style={{ width: barsOn ? `${skill.level}%` : "0%" }}
                    >
                      <span className="bar-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              <span
                className="
                  block max-h-0 translate-y-2 text-sm leading-snug text-[#d9cdc9] opacity-0
                  transition-all duration-500 ease-out
                  group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100
                  group-focus:max-h-20 group-focus:translate-y-0 group-focus:opacity-100
                "
              >
                {skill.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;