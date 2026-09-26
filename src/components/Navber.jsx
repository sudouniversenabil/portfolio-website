import { useEffect, useState } from "react";

const items = [
  { label: "Home", id: "home" },
  { label: "About", id: "home" },
  { label: "Services", id: "home" },
  { label: "Skill", id: "skills" },
  { label: "Contact", id: "home" },
];

// Several nav labels currently point at the same "home" section (there's no
// separate About/Services/Contact section yet). When that section is in
// view, this decides which single label should light up.
const defaultLabelForId = {
  home: "Home",
  skills: "Skill",
};

const Navber = () => {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const ids = [...new Set(items.map((item) => item.id))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const label = defaultLabelForId[visible.target.id];
          if (label) setActive(label);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const goTo = (id, label) => (e) => {
    e.preventDefault();
    setActive(label);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="
        sticky top-4 z-50 mt-10 w-[92%] max-w-[720px]
        animate-[slideDown_1s_ease-out]
        rounded-2xl border border-[#ff3b57]/20 bg-[#0a0203]/40 p-3
        font-medium shadow-xl backdrop-blur-xl
        transition-[background-color,border-color] duration-700 ease-out
        hover:bg-[#0a0203]/60
      "
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item) => {
          const isActive = active === item.label;

          return (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={goTo(item.id, item.label)}
              className={`
                relative rounded-xl px-4 py-2 text-sm transition-all duration-500 ease-out
                hover:-translate-y-0.5 hover:text-[#ff8a97]
                ${isActive ? "text-[#ff8a97]" : "text-[#f6ece8]/85"}
              `}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                className={`
                  absolute inset-0 rounded-xl border border-[#ff3b57]/30
                  bg-[#ff3b57]/10 backdrop-blur-xl transition-all duration-500 ease-out
                  ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navber;