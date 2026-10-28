import { memo, useState } from "react";
import Socials from "../components/Socials";
import Reveal from "../components/Reveal";

const EMAIL = "nabilsikder00@gmail.com";

const infoCards = [
  { label: "Based in", value: "Bangladesh" },
  { label: "Availability", value: "Open to work" },
  { label: "Response time", value: "Within 24h" },
];

const InfoCard = memo(function InfoCard({ card }) {
  return (
    <div className="rounded-sm border border-cyan-500/30 bg-black/80 px-4 py-3">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
        {card.label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-100">{card.value}</p>
    </div>
  );
});

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Could not copy email address.", error);
    }
  };

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry from ${form.name || "your website"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || "Someone from the portfolio site"}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Reveal
      as="section"
      id="contact"
      className="flex min-h-screen w-full scroll-mt-20 items-center justify-center px-[5%] pb-16"
    >
      <div className="hud-panel w-full max-w-[880px] rounded-sm border border-cyan-500/30 bg-black/80 p-6 text-center text-slate-100 md:p-12">
        <span className="inline-flex items-center gap-2 border border-emerald-400/30 bg-black/80 px-4 py-1.5 font-mono text-xs tracking-wide text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          SYSTEM ONLINE
        </span>

        <h2 className="mt-5 font-mono text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-tight">
          Let&apos;s build something <span className="text-cyan-300">together</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-sm text-slate-300">
          Have a project in mind, a role to fill, or just want to say hi? My
          inbox is open—drop a message below or reach out directly.
        </p>

        <div className="mx-auto mt-7 grid max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-3">
          {infoCards.map((card) => (
            <InfoCard key={card.label} card={card} />
          ))}
        </div>

        <div className="mx-auto mt-5 flex max-w-[480px] flex-col items-center gap-3 border border-cyan-500/30 bg-black/80 p-4 sm:flex-row sm:justify-between">
          <a
            href={`mailto:${EMAIL}`}
            className="break-all text-sm font-medium text-cyan-100 hover:text-cyan-300 sm:text-base"
          >
            {EMAIL}
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className="border border-cyan-500/30 bg-black/80 px-3 py-2 text-xs text-slate-200 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="border border-cyan-500/40 bg-cyan-950/60 px-3 py-2 font-mono text-xs text-cyan-100 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Say hello
            </a>
          </div>
        </div>

        <form
          onSubmit={sendMessage}
          className="mx-auto mt-5 flex max-w-[560px] flex-col gap-3 text-left"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="border border-slate-100/15 bg-black/80 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-500/50"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell me a bit about your project..."
            className="resize-none border border-slate-100/15 bg-black/80 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-500/50"
          />
          <button
            type="submit"
            className="mt-1 self-center border border-cyan-500/40 bg-cyan-950/70 px-8 py-3 font-mono text-sm font-semibold text-cyan-100 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Send Message
          </button>
          <p className="text-center text-[0.7rem] text-slate-500">
            This opens your email app with the message pre-filled—nothing is
            sent from here directly.
          </p>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Socials />
        </div>
      </div>
    </Reveal>
  );
};

export default Contact;
