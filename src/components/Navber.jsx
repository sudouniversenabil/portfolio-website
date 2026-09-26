
import { useEffect, useState } from "react";

const items = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Skill", id: "skills" },
  { label: "Contact", id: "contact" },
];

const Navber = () => {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visibleSection) {
          const activeItem = items.find(
            (item) => item.id === visibleSection.target.id
          );

          if (activeItem) {
            setActive(activeItem.label);
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const goTo = (id, label) => (e) => {
    e.preventDefault();

    setActive(label);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="
        sticky top-4 z-50 mt-10 w-[92%] max-w-[720px]
        animate-[slideDown_1s_ease-out]
        rounded-2xl border border-[#ff5a00]/20
        bg-[#0d0200]/40 p-3
        font-medium
        shadow-[0_0_25px_rgba(255,90,0,0.12)]
        backdrop-blur-xl
        transition-[background-color,border-color]
        duration-700 ease-out
        hover:bg-[#0d0200]/60
      "
    >
      <style>{`
        @keyframes navEmberPulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(255, 90, 0, 0.25);
          }

          50% {
            box-shadow: 0 0 16px rgba(255, 150, 0, 0.5);
          }
        }

        .nav-active-pill {
          animation: navEmberPulse 2.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-active-pill {
            animation: none !important;
          }
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item) => {
          const isActive = active === item.label;

          return (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={goTo(item.id, item.label)}
              className={`
                relative rounded-xl px-4 py-2 text-sm
                transition-all duration-500 ease-out
                hover:-translate-y-0.5
                hover:text-[#ffae66]
                ${
                  isActive
                    ? "text-[#ffcf9e]"
                    : "text-[#f6ece8]/85"
                }
              `}
            >
              <span className="relative z-10">
                {item.label}
              </span>

              <span
                className={`
                  absolute inset-0 rounded-xl
                  border border-[#ff5a00]/40
                  bg-gradient-to-r
                  from-[#ff3d00]/20
                  to-[#ffae00]/20
                  backdrop-blur-xl
                  transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "nav-active-pill scale-100 opacity-100"
                      : "scale-90 opacity-0"
                  }
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

