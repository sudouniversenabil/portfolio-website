import { useEffect, useRef, useState } from "react";
import Socials from "../components/Socials";

const EMAIL = "nabilsikder00@gmail.com";

const Contact = () => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
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

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen w-full scroll-mt-24 items-center justify-center px-[5%] pb-16"
    >
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal { opacity: 0; }
        .reveal.on { animation: revealUp 0.7s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .reveal { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div
        className={`
          reveal ${revealed ? "on" : ""}
          w-full max-w-[720px] rounded-[28px] border border-[#ff3b57]/20
          bg-[linear-gradient(135deg,rgba(58,10,18,0.55),rgba(10,2,5,0.75))]
          p-8 text-center text-[#f6ece8] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl md:p-14
        `}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[#d9cdc9]/70">
          Get in touch
        </p>

        <h1 className="mt-2 font-['Fraunces',_'Georgia',_serif] text-[clamp(2rem,5vw,3.2rem)] font-semibold">
          Let's build something <span className="text-[#ff3b57]">together</span>
        </h1>

        <p className="mx-auto mt-3 max-w-[50ch] text-[#d9cdc9]">
          Have a project in mind or just want to say hi? My inbox is open.
        </p>

        {/* Email */}
        <div
          className="
            mx-auto mt-8 flex max-w-[480px] flex-col items-center gap-3
            rounded-2xl border border-[#f6ece8]/15 bg-[#f6ece8]/5 p-5
            backdrop-blur-xl sm:flex-row sm:justify-between
          "
        >
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm font-medium text-[#f6ece8] transition-colors hover:text-[#ff8a97] sm:text-base"
          >
            {EMAIL}
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className="
                rounded-xl border border-[#f6ece8]/20 bg-[#f6ece8]/[0.06] px-3 py-2
                text-xs font-medium text-[#f6ece8] transition-all duration-300
                hover:border-[#ff3b57]/50 hover:bg-[#ff3b57]/10
              "
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <a
              href={`mailto:${EMAIL}`}
              className="
                rounded-xl border border-[#ff3b57]/40 bg-[#ff3b57]/15 px-3 py-2
                text-xs font-medium text-[#ff8a97] transition-all duration-300
                hover:bg-[#ff3b57]/25
              "
            >
              Say hello
            </a>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Socials />
        </div>
      </div>
    </div>
  )
}

export default Contact;