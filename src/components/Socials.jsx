const links = [
  {
    label: "Email",
    href: "mailto:nabilsikder00@gmail.com",
    glow: "#ff8a97",
    external: false,
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.2.7 6.8 5.1 6.8-5.1H5.2ZM19 7.9l-6.4 4.8a1 1 0 0 1-1.2 0L5 7.9v10.6h14V7.9Z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nabil-shikder-708644387/",
    glow: "#5c9bd6",
    external: true,
    icon: (
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.04c.45-.85 1.55-1.75 3.19-1.75 3.42 0 4.05 2.25 4.05 5.17V20Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bulid.fullstack.with_nabil_/",
    glow: "#d6689a",
    external: true,
    icon: (
      <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 5.94a2.34 2.34 0 1 1 0-4.68 2.34 2.34 0 0 1 0 4.68Zm4.6-6.1a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0ZM20 7.2c-.07-1.36-.38-2.56-1.39-3.57C17.6 2.62 16.4 2.31 15.04 2.24 13.64 2.16 10.36 2.16 8.96 2.24 7.6 2.31 6.4 2.62 5.39 3.63 4.38 4.64 4.07 5.84 4 7.2 3.92 8.6 3.92 11.88 4 13.28c.07 1.36.38 2.56 1.39 3.57 1.01 1.01 2.21 1.32 3.57 1.39 1.4.08 4.68.08 6.08 0 1.36-.07 2.56-.38 3.57-1.39 1.01-1.01 1.32-2.21 1.39-3.57.08-1.4.08-4.68 0-6.08ZM18.3 14.7a3.62 3.62 0 0 1-2.04 2.04c-1.41.56-4.76.43-6.32.43s-4.91.13-6.32-.43a3.62 3.62 0 0 1-2.04-2.04c-.56-1.41-.43-4.76-.43-6.32s-.13-4.91.43-6.32A3.62 3.62 0 0 1 3.62 0" />
    ),
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/Nabil_Sikder/",
    glow: "#e08a5c",
    external: true,
    icon: (
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.83 1.45 5.35 3.73 7.03-.12.44-.65 2.33-.68 2.46 0 0-.01.11.06.15.07.05.16.02.16.02.21-.03 2.43-1.6 2.83-1.87A11.6 11.6 0 0 0 12 19c5.52 0 10-4.03 10-9s-4.48-9-10-9Zm5.29 8.07a1.43 1.43 0 0 1-1.43 1.43c-.32 0-.61-.1-.85-.28-.84.55-1.98.9-3.24.94l.62-2.9 2.02.43a1.02 1.02 0 1 0 .1-.5l-2.25-.48a.25.25 0 0 0-.3.19l-.7 3.26c-1.28-.03-2.44-.38-3.28-.93a1.42 1.42 0 0 1-.85.28 1.43 1.43 0 0 1-.71-2.67c.36-.2.78-.24 1.16-.1a5.9 5.9 0 0 1 2.98-.98l.6-2.6a.24.24 0 0 1 .3-.19l1.9.4a1.03 1.03 0 1 1-.1.5l-1.68-.36-.51 2.24a5.95 5.95 0 0 1 2.9.98c.38-.15.81-.12 1.17.1.42.25.68.71.68 1.24ZM9 12.6c0 .44.44.8.98.8s.97-.36.97-.8-.43-.8-.97-.8-.98.36-.98.8Zm5.04 1.84a.2.2 0 0 0-.28 0c-.5.4-1.19.58-1.76.58-.57 0-1.26-.19-1.76-.58a.2.2 0 0 0-.27.28c.6.5 1.4.7 2.03.7.63 0 1.43-.2 2.03-.7a.2.2 0 0 0 .01-.28Zm-.06-1.04c.54 0 .98-.36.98-.8s-.44-.8-.98-.8-.97.36-.97.8.43.8.97.8Z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/sudouniversenabil",
    glow: "#c9cdd3",
    external: true,
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.19-3.37-1.19-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.38-2.02 1-2.73-.1-.26-.44-1.3.1-2.71 0 0 .82-.27 2.7 1.04a9.2 9.2 0 0 1 4.92 0c1.87-1.31 2.69-1.04 2.69-1.04.54 1.41.2 2.45.1 2.71.62.71 1 1.62 1 2.73 0 3.91-2.34 4.77-4.57 5.02.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z" />
    ),
  },
];

const Socials = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <style>{`
        @keyframes socialPop {
          from { opacity: 0; transform: translateY(10px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .social-item { animation: none !important; }
        }
      `}</style>

      {links.map(({ label, href, icon, glow, external }, i) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={label}
          style={{ "--glow": glow, animation: `socialPop 0.5s ease-out ${i * 0.08}s both` }}
          className="
            social-item group relative flex h-12 w-12 items-center justify-center
            rounded-full border border-[#f6ece8]/20 bg-[#f6ece8]/[0.06]
            text-[#f6ece8]/75 backdrop-blur-xl
            transition-all duration-500 ease-out
            hover:-translate-y-1.5 hover:scale-110 hover:text-[#f6ece8]
            hover:border-[color:var(--glow)]/60 hover:bg-[#f6ece8]/[0.1]
            hover:shadow-[0_0_22px_-2px_var(--glow)]
          "
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            {icon}
          </svg>

          <span
            className="
              pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2
              whitespace-nowrap rounded-md border border-[#f6ece8]/10 bg-[#0a0203]/90
              px-2 py-1 text-[0.65rem] font-medium text-[#f6ece8]/90
              opacity-0 translate-y-1
              transition-all duration-300 ease-out
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default Socials;