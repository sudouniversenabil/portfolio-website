
import { useEffect, useState } from "react";
import { assets } from "../assets/pic";
// import Socials from "./Contact";

const roles = [
  "Full-Stack Developer",
  "React & Node.js Engineer",
  "API Builder",
];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  const scrollToSkills = (e) => {
    e.preventDefault();

    document.getElementById("skills")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="home"
      className="
        flex min-h-screen w-full scroll-mt-24
        items-center justify-center px-[5%]
      "
    >
      <style>{`
        @keyframes slideLSide {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRSide {
          from {
            opacity: 0;
            transform: translateX(60px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes roleFade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }

          10% {
            opacity: 1;
            transform: translateY(0);
          }

          90% {
            opacity: 1;
            transform: translateY(0);
          }

          100% {
            opacity: 0;
            transform: translateY(-6px);
          }
        }

        @keyframes fireText {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        .role-fade {
          animation: roleFade 2.8s ease-in-out both;
        }

        .fire-text {
          background: linear-gradient(
            90deg,
            #ff3d00,
            #ffae00,
            #ff3d00
          );

          background-size: 200% auto;

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          animation: fireText 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-anim,
          .role-fade,
          .fire-text {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        className="
          relative mx-auto grid w-full max-w-[1150px]
          grid-cols-1 items-center gap-10
          overflow-hidden rounded-[28px]
          border border-[#ff5a00]/20
          bg-[linear-gradient(135deg,rgba(90,20,0,0.55),rgba(13,2,0,0.75))]
          p-6
          text-[#f6ece8]
          shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
          md:p-12
        "
      >
        {/* Top bar: badge + connect button */}

        <div
          className="
            home-anim
            col-span-full
            flex
            items-center
            justify-between
          "
          style={{
            animation: "fadeUp 0.7s ease-out both",
          }}
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border border-[#ff5a00]/40
              bg-[#ff5a00]/10
              px-4
              py-2
              text-xs
              font-medium
              tracking-wide
              text-[#ffae66]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#ff5a00]
              "
            />

            Full-Stack Developer
          </span>

          {/* Connect button */}

          <a
            href="#skills"
            onClick={scrollToSkills}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border border-[#f6ece8]/20
              bg-[#f6ece8]/[0.06]
              px-4
              py-2
              text-xs
              font-medium
              text-[#f6ece8]
              transition-all
              duration-300
              hover:border-[#ff5a00]/50
              hover:bg-[#ff5a00]/10
            "
          >
            Let's Connect

            <span aria-hidden="true">
              →
            </span>
          </a>
        </div>

        {/* Left: text */}

        <div
          className="
            home-anim
            flex
            flex-col
            items-center
            gap-5
            pt-8
            text-center
            md:items-start
            md:pt-10
            md:text-left
          "
          style={{
            animation: "slideLSide 0.8s ease-out 0.15s both",
          }}
        >
          <p className="text-sm text-[#b7ada9]">
            Hey, I'm Nabil —
          </p>

          <h1
            className="
              font-['Fraunces',_'Georgia',_serif]
              text-[clamp(2.4rem,6vw,4rem)]
              font-semibold
              leading-[1.05]
              text-[#f6ece8]
            "
          >
            Full-Stack{" "}
            <span className="fire-text">
              Developer
            </span>
          </h1>

          {/* Cycling role line */}

          <div className="h-6 overflow-hidden">
            <p
              key={roleIndex}
              className="
                role-fade
                text-sm
                font-medium
                tracking-wide
                text-[#ffae66]
              "
            >
              {roles[roleIndex]}
            </p>
          </div>

          <p
            className="
              max-w-[46ch]
              text-[clamp(1rem,1.5vw,1.15rem)]
              text-[#d9cdc9]
            "
          >
            Good code should feel{" "}
            <span className="text-[#ffae66]">
              invisible
            </span>
            .
          </p>

          <p
            className="
              max-w-[54ch]
              text-[clamp(0.9rem,1.3vw,1rem)]
              leading-relaxed
              text-[#b7ada9]
            "
          >
            I'm Nabil Sikder — I build things for the web
            from the ground up: interfaces that feel natural
            in React, and the APIs and databases underneath
            that quietly make them work. Right now I'm
            deepening my backend craft with FastAPI while
            shipping full-stack projects in React, Node.js,
            and MongoDB. I care less about writing clever
            code and more about writing code someone else
            can open a year from now and actually understand.
          </p>

          <div
            className="
              mt-2
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
              md:justify-start
            "
          >
            {/* <Socials /> */}
          </div>
        </div>

        {/* Right: portrait with floating status cards */}

        <div
          className="
            home-anim
            relative
            mx-auto
            flex
            w-full
            max-w-[380px]
            justify-center
            md:max-w-none
          "
          style={{
            animation: "slideRSide 0.8s ease-out 0.15s both",
          }}
        >
          <div
            className="
              home-anim
              relative
              aspect-[4/5]
              w-full
              max-w-[380px]
            "
            style={{
              animation: "popIn 0.7s ease-out 0.4s both",
            }}
          >
            {/* Image glow */}

            <div
              className="
                absolute
                -inset-4
                rounded-[2rem]
                bg-[radial-gradient(circle,#ff5a00_0%,transparent_70%)]
                opacity-60
                blur-2xl
              "
            />

            {/* Profile image */}

            <img
              src={assets.profile}
              alt="Nabil Shikder"
              className="
                relative
                h-full
                w-full
                rounded-[2rem]
                border-4
                border-[#f6ece8]/15
                object-cover
                shadow-2xl
                transition-all
                duration-500
                ease-out
                hover:scale-[1.02]
                hover:border-[#ff5a00]/60
              "
            />

            {/* Status card 1 */}

            <div
              className="
                home-anim
                absolute
                bottom-[18%]
                left-[-12%]
                rounded-2xl
                border border-[#f6ece8]/15
                bg-[#0d0200]/70
                px-4
                py-3
                text-left
                shadow-xl
                backdrop-blur-xl
              "
              style={{
                animation: "fadeUp 0.6s ease-out 0.8s both",
              }}
            >
              <p
                className="
                  text-[0.65rem]
                  uppercase
                  tracking-[0.2em]
                  text-[#b7ada9]
                "
              >
                Status
              </p>

              <p className="text-sm font-semibold text-[#f6ece8]">
                Open to Work
              </p>
            </div>

            {/* Status card 2 */}

            <div
              className="
                home-anim
                absolute
                bottom-[2%]
                right-[-8%]
                rounded-2xl
                border border-[#f6ece8]/15
                bg-[#0d0200]/70
                px-4
                py-3
                text-left
                shadow-xl
                backdrop-blur-xl
              "
              style={{
                animation: "fadeUp 0.6s ease-out 0.95s both",
              }}
            >
              <p
                className="
                  text-[0.65rem]
                  uppercase
                  tracking-[0.2em]
                  text-[#b7ada9]
                "
              >
                Based in
              </p>

              <p className="text-sm font-semibold text-[#f6ece8]">
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tag row */}

        <div
          className="
            home-anim
            col-span-full
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-8
            gap-y-3
            border-t
            border-[#f6ece8]/10
            pt-6
            text-xs
            text-[#b7ada9]
            md:justify-start
          "
          style={{
            animation: "fadeUp 0.7s ease-out 0.6s both",
          }}
        >
          <span>
            <span className="text-[#ff5a00]">
              #01
            </span>{" "}
            React.js
          </span>

          <span>
            <span className="text-[#ff5a00]">
              #02
            </span>{" "}
            Node.js
          </span>

          <span>
            <span className="text-[#ff5a00]">
              #03
            </span>{" "}
            MongoDB
          </span>

          <span>
            <span className="text-[#ff5a00]">
              #04
            </span>{" "}
            Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
