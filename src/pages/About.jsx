import { memo } from "react";
import Reveal from "../components/Reveal";

const highlights = [
  {
    icon: "FS",
    title: "Full-Stack Development",
    description: "Building responsive web apps across frontend and backend.",
  },
  {
    icon: "AI",
    title: "GenAI & LLM Apps",
    description: "Integrating language models into useful product experiences.",
  },
  {
    icon: "RAG",
    title: "RAG & AI Agents",
    description: "Designing grounded answers with retrieval and agent workflows.",
  },
  {
    icon: "UI",
    title: "Clean UI/UX",
    description: "Creating clear, accessible, and thoughtful user experiences.",
  },
];

const HighlightCard = memo(function HighlightCard({ highlight }) {
  return (
    <article className="hud-panel rounded-sm border border-cyan-500/30 bg-black/80 p-5 transition-transform duration-200 hover:-translate-y-0.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-cyan-500/30 bg-slate-950 font-mono text-xs font-semibold text-cyan-200">
        {highlight.icon}
      </span>
      <h3 className="mt-4 font-mono text-sm font-medium text-cyan-50">
        {highlight.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {highlight.description}
      </p>
    </article>
  );
});

const About = () => (
  <Reveal
    as="section"
    id="about"
    className="flex min-h-screen w-full scroll-mt-20 items-center justify-center px-[5%] pb-16"
  >
    <div className="hud-panel w-full max-w-[1100px] rounded-sm border border-cyan-500/30 bg-black/80 p-6 text-slate-100 md:p-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/70">
        // about me
      </p>
      <h2 className="mt-2 font-mono text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-tight text-cyan-50">
        Who I Am
      </h2>
      <p className="mt-4 max-w-[72ch] text-sm leading-relaxed text-slate-300">
        I&apos;m Nabil Sikder, a Full-Stack &amp; AI Engineer from Bangladesh.
        I build responsive, AI-powered web applications—from polished
        interfaces to the APIs and data layers behind them. My work brings
        full-stack engineering together with GenAI, LLM integrations, RAG, and
        agentic workflows. I&apos;m passionate about clean UX and turning
        complex ideas into useful products.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight) => (
          <HighlightCard key={highlight.title} highlight={highlight} />
        ))}
      </div>
    </div>
  </Reveal>
);

export default About;
