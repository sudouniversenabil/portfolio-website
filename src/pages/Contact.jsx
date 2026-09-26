
import { useEffect, useRef, useState } from "react";
import Socials from "../components/Socials";

const EMAIL = "nabilsikder00@gmail.com";

const Contact = () => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — mailto link below still works
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Project inquiry from ${form.name || "your website"}`
    );

    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || "Someone from the portfolio site"}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const infoCards = [
    { label: "Based in", value: "Bangladesh" },
    { label: "Availability", value: "Open to work" },
    { label: "Response time", value: "Within 24h" },
  ];

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen w-full scroll-mt-24 items-center justify-center px-[5%] pb-16"
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

        @keyframes pulseDot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.5;
            transform: scale(0.85);
          }
        }

        .reveal {
          opacity: 0;
        }

        .reveal.on {
          animation: revealUp 0.7s ease-out both;
        }

        .status-dot {
          animation: pulseDot 1.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .status-dot {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        className={`
          reveal ${revealed ? "on" : ""}
          w-full max-w-[880px] rounded-[28px]
          border border-[#ff5a00]/20
          bg-[linear-gradient(135deg,rgba(90,20,0,0.55),rgba(13,2,0,0.75))]
          p-8 text-center text-[#f6ece8]
          shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl md:p-14
        `}
      >
        {/* Availability Badge */}
        <span
          className="
            inline-flex items-center gap-2 rounded-full
            border border-[#ff5a00]/40
            bg-[#ff5a00]/10
            px-4 py-1.5
            text-xs font-medium tracking-wide text-[#ffae66]
          "
        >
          <span
            className="
              status-dot h-1.5 w-1.5 rounded-full
              bg-[#ff5a00]
            "
          />

          Currently available for freelance work
        </span>

        {/* Heading */}
        <h1
          className="
            mt-5
            font-['Fraunces',_'Georgia',_serif]
            text-[clamp(2rem,5vw,3.2rem)]
            font-semibold
          "
        >
          Let's build something{" "}
          <span className="text-[#ff8a00]">together</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-[52ch] text-[#d9cdc9]">
          Have a project in mind, a role to fill, or just want to say hi?
          My inbox is open — drop a message below or reach out directly.
        </p>

        {/* Quick info row */}
        <div
          className="
            mx-auto mt-8 grid max-w-[560px]
            grid-cols-1 gap-3 sm:grid-cols-3
          "
        >
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="
                rounded-2xl
                border border-[#f6ece8]/[0.12]
                bg-[#f6ece8]/[0.04]
                px-4 py-3
                backdrop-blur-xl
              "
            >
              <p
                className="
                  text-[0.65rem]
                  uppercase
                  tracking-[0.2em]
                  text-[#b7ada9]
                "
              >
                {card.label}
              </p>

              <p className="mt-1 text-sm font-medium text-[#f6ece8]">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Email */}
        <div
          className="
            mx-auto mt-6 flex max-w-[480px]
            flex-col items-center gap-3
            rounded-2xl
            border border-[#f6ece8]/[0.15]
            bg-[#f6ece8]/[0.05]
            p-5
            backdrop-blur-xl
            sm:flex-row sm:justify-between
          "
        >
          {/* FIX 1: Missing <a> */}
          <a
            href={`mailto:${EMAIL}`}
            className="
              text-sm font-medium text-[#f6ece8]
              transition-colors
              hover:text-[#ffae66]
              sm:text-base
            "
          >
            {EMAIL}
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className="
                rounded-xl
                border border-[#f6ece8]/[0.20]
                bg-[#f6ece8]/[0.06]
                px-3 py-2
                text-xs font-medium text-[#f6ece8]
                transition-all duration-300
                hover:border-[#ff5a00]/50
                hover:bg-[#ff5a00]/10
              "
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            {/* FIX 2: Missing <a> */}
            <a
              href={`mailto:${EMAIL}`}
              className="
                rounded-xl
                border border-[#ff5a00]/40
                bg-[#ff5a00]/[0.15]
                px-3 py-2
                text-xs font-medium text-[#ffae66]
                transition-all duration-300
                hover:bg-[#ff5a00]/[0.25]
              "
            >
              Say hello
            </a>
          </div>
        </div>

        {/* Mini contact form */}
        <form
          onSubmit={sendMessage}
          className="
            mx-auto mt-6 flex max-w-[560px]
            flex-col gap-3 text-left
          "
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="
              rounded-xl
              border border-[#f6ece8]/[0.15]
              bg-[#f6ece8]/[0.05]
              px-4 py-3
              text-sm text-[#f6ece8]
              placeholder:text-[#b7ada9]/70
              outline-none
              backdrop-blur-xl
              transition-all duration-300
              focus:border-[#ff5a00]/50
              focus:bg-[#f6ece8]/[0.08]
            "
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell me a bit about your project..."
            className="
              resize-none
              rounded-xl
              border border-[#f6ece8]/[0.15]
              bg-[#f6ece8]/[0.05]
              px-4 py-3
              text-sm text-[#f6ece8]
              placeholder:text-[#b7ada9]/70
              outline-none
              backdrop-blur-xl
              transition-all duration-300
              focus:border-[#ff5a00]/50
              focus:bg-[#f6ece8]/[0.08]
            "
          />

          <button
            type="submit"
            className="
              mt-1 self-center
              rounded-xl
              border border-[#ff5a00]/40
              bg-gradient-to-r
              from-[#ff3d00] to-[#ffae00]
              px-8 py-3
              text-sm font-semibold text-[#0d0200]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_10px_30px_-10px_rgba(255,90,0,0.6)]
            "
          >
            Send Message
          </button>

          <p
            className="
              text-center
              text-[0.7rem]
              text-[#b7ada9]/70
            "
          >
            This opens your email app with the message pre-filled — nothing
            is sent from here directly.
          </p>
        </form>

        {/* Socials */}
        <div className="mt-9 flex items-center justify-center gap-4">
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default Contact;

