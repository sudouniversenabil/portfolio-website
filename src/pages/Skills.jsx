import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React.js", icon: "Re", category: "Frontend", note: "Building interactive UIs with components and hooks." },
  { name: "Next.js", icon: "Nx", category: "Frontend", note: "Server-rendered and static React apps." },
  { name: "JavaScript", icon: "Js", category: "Frontend", note: "Core language for everything I build on the web." },
  { name: "Tailwind CSS", icon: "Tw", category: "Frontend", note: "Styling fast with utility classes, no context switching." },
  { name: "Responsive Design", icon: "Rd", category: "Frontend", note: "Layouts that work from phone to desktop." },
  { name: "Node.js", icon: "No", category: "Backend", note: "Running JavaScript on the server, outside the browser." },
  { name: "Express.js", icon: "Ex", category: "Backend", note: "Routing and middleware for REST APIs." },
  { name: "REST API", icon: "Ra", category: "Backend", note: "Designing predictable endpoints for client-server communication." },
  { name: "FastAPI", icon: "Fa", category: "Backend", note: "Currently learning this for Python backend development." },
  { name: "Auth & JWT", icon: "Jw", category: "Backend", note: "Login flows and token-based authentication." },
  { name: "Frontend ↔ Backend", icon: "Fb", category: "Backend", note: "Connecting a React UI to a working API." },
  { name: "MongoDB", icon: "Mo", category: "Database", note: "Document database for flexible, JSON-like data." },
  { name: "PostgreSQL", icon: "Pg", category: "Database", note: "Relational database for structured, related data." },
  { name: "Git & GitHub", icon: "Gh", category: "Tools", note: "Version control and collaborating on code." },
];

const categories = ["Frontend", "Backend", "Database", "Tools"];

const Skills = () => {
  const [activeCat, setActiveCat] = useState("");
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect(); // only reveal once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleSkills = skills.filter((s) => s.category === activeCat);

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
        .reveal { opacity: 0; }
        .reveal.on { animation: revealUp 0.7s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .skill-card { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div
        className="
          w-full max-w-[1100px] rounded-[28px] border border-[#ff3b57]/20
          bg-[linear-gradient(135deg,rgba(58,10,18,0.5),rgba(10,2,5,0.7))]
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
            Pick a category to see what I use to build the frontend, the backend, and everything that connects them.
          </p>
        </div>

        {/* Category pills - same visual language as the navbar */}
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
                      ? "border-[#ff3b57]/50 bg-[#ff3b57]/15 text-[#ff8a97]"
                      : "border-[#f6ece8]/15 bg-[#f6ece8]/[0.05] text-[#f6ece8]/80 hover:border-[#ff3b57]/30 hover:text-[#ff8a97]"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
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
                skill-card group relative flex min-h-[110px] items-center gap-4
                overflow-hidden rounded-2xl border border-[#f6ece8]/15
                bg-[#f6ece8]/5 p-5 backdrop-blur-xl
                transition-all duration-500 ease-out
                hover:border-[#ff3b57]/50 hover:bg-[#f6ece8]/10
                focus:border-[#ff3b57]/50 focus:outline-none
              "
              style={{ animation: `slideInSide 0.5s ease-out ${i * 0.06}s both` }}
            >
              <span
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                  border border-[#ff3b57]/30 bg-[#ff3b57]/10 text-sm font-semibold text-[#ff8a97]
                "
              >
                {skill.icon}
              </span>

              <div className="min-w-0">
                <span
                  className="
                    block text-base font-medium text-[#f6ece8]
                    transition-all duration-500 ease-out
                    group-hover:-translate-y-1 group-focus:-translate-y-1
                  "
                >
                  {skill.name}
                </span>

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;