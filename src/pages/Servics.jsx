
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: "FS",
    title: "Full-Stack Web App",
    desc: "Complete web applications built end to end — React/Next.js frontend connected to a Node.js/Express backend with a real database.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    icon: "Fe",
    title: "Frontend Development",
    desc: "Fast, responsive, pixel-accurate interfaces with React, Next.js, and Tailwind — from a design file or from scratch.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: "Be",
    title: "Backend Development",
    desc: "REST APIs, authentication, and server logic that's clean and scalable — built with Node.js and Express.",
    tags: ["Node.js", "Express", "REST API"],
  },
  {
    icon: "Ec",
    title: "E-commerce Website",
    desc: "Online stores with product listings, cart, checkout, and admin management — built to actually sell.",
    tags: ["Cart & Checkout", "Admin Panel", "Payments"],
  },
  {
    icon: "Lp",
    title: "Landing Page",
    desc: "High-converting single pages for products, launches, or personal brands — fast-loading and mobile-first.",
    tags: ["Conversion-focused", "SEO-ready", "Responsive"],
  },
  {
    icon: "Tb",
    title: "Ticket & Booking System",
    desc: "Booking flows for events, appointments, or tickets — availability, slots, confirmations, all handled.",
    tags: ["Booking Logic", "Database", "Email Confirm"],
  },
];

const Services = () => {
  const [revealed, setRevealed] = useState(false);
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
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="services"
      ref={sectionRef}
      className="
        flex min-h-screen w-full scroll-mt-24
        items-center justify-center
        px-[5%] pb-16
      "
    >
      <style>{`
        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconFlicker {
          0%, 100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.3);
          }
        }

        .reveal {
          opacity: 0;
        }

        .reveal.on {
          animation: revealUp 0.7s ease-out both;
        }

        .service-icon {
          animation: iconFlicker 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .service-card,
          .service-icon {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        className="
          w-full max-w-[1100px]
          rounded-[28px]
          border border-[#ff5a00]/20
          bg-[linear-gradient(135deg,rgba(90,20,0,0.5),rgba(13,2,0,0.7))]
          p-8
          text-[#f6ece8]
          shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]
          backdrop-blur-2xl
          md:p-14
        "
      >
        {/* Header */}
        <div className={`reveal ${revealed ? "on" : ""}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d9cdc9]/70">
            What I offer
          </p>

          <h1
            className="
              mt-2
              font-['Fraunces',_'Georgia',_serif]
              text-[clamp(2rem,4.5vw,3rem)]
              font-semibold
            "
          >
            Services
          </h1>

          <p className="mt-3 max-w-[60ch] text-[#d9cdc9]">
            From a single landing page to a full-stack app with its own
            booking system — here's what I can build for you.
          </p>
        </div>

        {/* Services */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              tabIndex={0}
              className="
                service-card
                group
                relative
                flex
                flex-col
                gap-4
                overflow-hidden
                rounded-2xl
                border
                border-[#f6ece8]/15
                bg-[#f6ece8]/5
                p-6
                backdrop-blur-xl
                transition-all
                duration-500
                ease-out
                hover:-translate-y-1.5
                hover:border-[#ff5a00]/50
                hover:bg-[#f6ece8]/10
                hover:shadow-[0_14px_45px_-15px_rgba(255,90,0,0.55)]
                focus:border-[#ff5a00]/50
                focus:outline-none
              "
              style={{
                animation: revealed
                  ? `cardIn 0.6s ease-out ${index * 0.08}s both`
                  : "none",
                opacity: revealed ? undefined : 0,
              }}
            >
              {/* Icon */}
              <span
                className="
                  service-icon
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#ff5a00]/30
                  bg-gradient-to-br
                  from-[#ff3d00]/20
                  to-[#ffcf00]/10
                  text-sm
                  font-semibold
                  text-[#ffae66]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-110
                "
              >
                {service.icon}
              </span>

              {/* Content */}
              <div>
                <h3 className="text-lg font-medium text-[#f6ece8]">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#d9cdc9]">
                  {service.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border
                      border-[#ff5a00]/25
                      bg-[#ff5a00]/10
                      px-2.5
                      py-1
                      text-[11px]
                      text-[#ffae66]
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom glow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-[2px]
                  bg-gradient-to-r
                  from-transparent
                  via-[#ff8a00]
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`reveal mt-10 text-center ${revealed ? "on" : ""}`}
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-sm text-[#d9cdc9]/80">
            Have something specific in mind that's not listed here?
          </p>

          <a
            href="#contact"
            className="
              mt-3
              inline-block
              rounded-xl
              border
              border-[#ff5a00]/40
              bg-[#ff5a00]/10
              px-6
              py-2.5
              text-sm
              font-medium
              text-[#ffae66]
              transition-all
              duration-300
              ease-out
              hover:-translate-y-0.5
              hover:bg-[#ff5a00]/20
            "
          >
            Let's talk about it
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;

