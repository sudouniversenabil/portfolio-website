import { useEffect, useState } from "react";

const items = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const Navber = () => {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observedSections = new Set();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length === 0) return;

        const current = visibleSections.reduce((nearest, entry) =>
          entry.intersectionRatio > nearest.intersectionRatio ? entry : nearest
        );
        const item = items.find(({ id }) => id === current.target.id);
        if (item) setActive(item.label);
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    const observeSections = () => {
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && !observedSections.has(section)) {
          sectionObserver.observe(section);
          observedSections.add(section);
        }
      }
      if (observedSections.size === items.length) {
        sectionMountObserver.disconnect();
      }
    };

    const main = document.querySelector("main");
    const sectionMountObserver = new MutationObserver(observeSections);
    if (main) {
      sectionMountObserver.observe(main, { childList: true, subtree: true });
    }
    observeSections();

    return () => {
      sectionMountObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const goTo = (id, label) => (event) => {
    event.preventDefault();
    setActive(label);
    document.getElementById(id)?.scrollIntoView({
      behavior:
        window.matchMedia(
          "(max-width: 767px), (prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 z-50 w-full border-b border-cyan-500/30 bg-black/90 font-mono"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-[760px] flex-wrap items-center justify-center gap-2 px-3 py-2">
        {items.map((item) => {
          const isActive = active === item.label;

          return (
            <a
              key={item.label}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={goTo(item.id, item.label)}
              className={`
                rounded-sm border px-4 py-2 text-xs tracking-wide
                transition-colors duration-150
                sm:text-sm
                ${
                  isActive
                    ? "border-cyan-500/40 text-cyan-200"
                    : "border-transparent text-slate-300 hover:text-cyan-100"
                }
              `}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navber;
