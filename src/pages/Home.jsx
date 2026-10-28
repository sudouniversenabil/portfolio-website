import { memo, useEffect, useState } from "react";
import { assets } from "../assets/pic";

const typingMessages = [
  "Building intelligent systems...",
  "Training ideas into products...",
  "Turning data into decisions...",
];

const StatusCard = memo(function StatusCard({ label, value, className = "" }) {
  return (
    <div
      className={`hud-panel absolute rounded-sm border border-cyan-500/30 bg-black/90 px-4 py-3 text-left ${className}`}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-cyan-50">{value}</p>
    </div>
  );
});

const Home = () => {
  const [typingEnabled, setTypingEnabled] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState(typingMessages[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  const scrollToSkills = (event) => {
    event.preventDefault();
    document.getElementById("skills")?.scrollIntoView({
      behavior:
        window.matchMedia(
          "(max-width: 767px), (prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const desktopViewport = window.matchMedia("(min-width: 768px)");

    const updateTypingPreference = () => {
      const shouldAnimate =
        !motionPreference.matches && desktopViewport.matches;
      setTypingEnabled(shouldAnimate);
      if (!shouldAnimate) {
        setMessageIndex(0);
        setTypedMessage(typingMessages[0]);
        setIsDeleting(false);
      }
    };

    updateTypingPreference();
    motionPreference.addEventListener("change", updateTypingPreference);
    desktopViewport.addEventListener("change", updateTypingPreference);

    return () => {
      motionPreference.removeEventListener("change", updateTypingPreference);
      desktopViewport.removeEventListener("change", updateTypingPreference);
    };
  }, []);

  useEffect(() => {
    if (!typingEnabled) return undefined;

    const message = typingMessages[messageIndex];
    const isComplete = typedMessage === message;
    const isEmpty = typedMessage.length === 0;
    const delay =
      isComplete && !isDeleting ? 1250 : isDeleting ? 28 : isEmpty ? 350 : 48;

    const timer = window.setTimeout(() => {
      if (!isDeleting && !isComplete) {
        setTypedMessage(message.slice(0, typedMessage.length + 1));
      } else if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isDeleting && !isEmpty) {
        setTypedMessage(typedMessage.slice(0, -1));
      } else {
        setIsDeleting(false);
        setMessageIndex((index) => (index + 1) % typingMessages.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, messageIndex, typedMessage, typingEnabled]);

  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-4rem)] w-full scroll-mt-20 items-center justify-center px-[5%]"
    >
      <div className="hud-panel relative mx-auto grid w-full max-w-[1150px] grid-cols-1 items-center gap-8 rounded-sm border border-cyan-500/30 bg-black/80 p-6 text-slate-100 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:p-12">
        <div className="col-span-full flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 border border-cyan-500/30 bg-black/80 px-3 py-2 font-mono text-xs tracking-wide text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            SYSTEM ONLINE
          </span>
          <a
            href="#skills"
            onClick={scrollToSkills}
            className="border border-cyan-500/30 bg-black/80 px-4 py-2 font-mono text-xs text-cyan-100 transition-transform duration-200 hover:-translate-y-0.5 sm:text-sm"
          >
            Let&apos;s Connect <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-5 pt-4 text-center md:items-start md:text-left">
          <p className="font-mono text-sm text-slate-400">Hey, I&apos;m Nabil —</p>
          <h1 className="font-mono text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.08] text-slate-50">
            Full-Stack &amp; <span className="text-cyan-300">AI Engineer</span>
          </h1>
          <div className="min-h-6 max-w-full font-mono text-xs tracking-wide text-cyan-200 sm:text-sm">
            <span className="text-cyan-400/70">&gt; </span>
            {typedMessage}
            {typingEnabled && <span className="typing-cursor text-cyan-300" />}
          </div>
          <p className="max-w-[46ch] font-mono text-[clamp(1rem,1.5vw,1.15rem)] text-cyan-50/85">
            I build AI-powered web applications
          </p>
          <p className="max-w-[54ch] text-sm leading-relaxed text-slate-300/80">
            I&apos;m Nabil Sikder, a Full-Stack Developer from Bangladesh and an
            AI Engineer focused on GenAI. I build responsive web experiences
            with React, Node.js, and practical AI features. I enjoy connecting
            reliable backend systems with intuitive interfaces and useful LLM
            workflows.
          </p>
          <p className="font-mono text-xs text-cyan-200/60">
            &gt; initializing portfolio...
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[380px] justify-center md:max-w-none">
          <div className="relative aspect-[4/5] w-full max-w-[380px]">
            <img
              src={assets.profile}
              alt="Nabil Sikder"
              width="1031"
              height="960"
              fetchPriority="high"
              className="relative h-full w-full rounded-sm border border-cyan-500/30 object-cover"
            />
            <StatusCard
              label="Status"
              value="Open to Work"
              className="bottom-[18%] left-[-6%] sm:left-[-12%]"
            />
            <StatusCard
              label="Based in"
              value="Bangladesh"
              className="bottom-[2%] right-[-4%] sm:right-[-8%]"
            />
          </div>
        </div>

        <div className="col-span-full flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-cyan-500/20 pt-5 font-mono text-xs text-slate-400 md:justify-start">
          <span><span className="text-cyan-300">#01</span> React.js</span>
          <span><span className="text-cyan-300">#02</span> Node.js</span>
          <span><span className="text-cyan-300">#03</span> MongoDB</span>
          <span><span className="text-cyan-300">#04</span> Tailwind CSS</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
