import { memo, useState } from "react";
import Reveal from "../components/Reveal";

const categories = [
  "Frontend",
  "Backend & Database",
  "GenAI & LLMs",
  "AI Frameworks & Tools",
  "DevOps & Deployment",
];

const skills = [
  { name: "HTML5", icon: "Ht", category: "Frontend" },
  { name: "CSS3", icon: "Cs", category: "Frontend" },
  { name: "JavaScript", icon: "Js", category: "Frontend" },
  {name:"TypeScript",icon:"Ts",category:"Frontend"},
  { name: "React.js", icon: "Re", category: "Frontend" },
  { name: "Next.js", icon: "Nx", category: "Frontend" },
  { name: "Tailwind CSS", icon: "Tw", category: "Frontend" },
  { name: "Responsive Design", icon: "Rd", category: "Frontend" },
  { name: "Node.js", icon: "No", category: "Backend & Database" },
  { name: "Express.js", icon: "Ex", category: "Backend & Database" },
  { name: "MongoDB", icon: "Mo", category: "Backend & Database" },
  { name: "PostgreSQL", icon: "Pg", category: "Backend & Database" },
  { name: "Python", icon: "Py", category: "Backend & Database" },
  { name: "FastAPI", icon: "Fa", category: "Backend & Database" },
  { name: "REST APIs", icon: "Ra", category: "Backend & Database" },
  { name: "Auth & JWT", icon: "Jw", category: "Backend & Database" },
  { name: "Prompt Engineering", icon: "PE", category: "GenAI & LLMs" },
  { name: "LLM APIs (OpenAI, Claude, Gemini)", icon: "LLM", category: "GenAI & LLMs" },
  { name: "RAG", icon: "RG", category: "GenAI & LLMs" },
  { name: "AI Agents", icon: "AG", category: "GenAI & LLMs" },
  { name: "Function / Tool Calling", icon: "TC", category: "GenAI & LLMs" },
  { name: "MCP (Model Context Protocol)", icon: "MCP", category: "GenAI & LLMs" },
  { name: "Fine-tuning (LoRA / QLoRA)", icon: "FT", category: "GenAI & LLMs" },
  { name: "Hugging Face", icon: "HF", category: "GenAI & LLMs" },
  { name: "LangChain", icon: "LC", category: "AI Frameworks & Tools" },
  { name: "LlamaIndex", icon: "LI", category: "AI Frameworks & Tools" },
  { name: "LangGraph", icon: "LG", category: "AI Frameworks & Tools" },
  { name: "Embeddings & Semantic Search", icon: "ES", category: "AI Frameworks & Tools" },
  { name: "Vector Databases (pgvector, Pinecone, Chroma, Qdrant)", icon: "VDB", category: "AI Frameworks & Tools" },
  { name: "LangSmith / Langfuse", icon: "LS", category: "AI Frameworks & Tools" },
  { name: "Docker", icon: "Dk", category: "DevOps & Deployment" },
  { name: "Git / GitHub", icon: "Gh", category: "DevOps & Deployment" },
  { name: "Vercel", icon: "Ve", category: "DevOps & Deployment" },
  { name: "AWS / Render", icon: "AW", category: "DevOps & Deployment" },
];

const categoryId = (category) =>
  `skill-tab-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

const SkillCard = memo(function SkillCard({ skill }) {
  return (
    <article className="hud-panel flex min-w-0 items-center gap-4 rounded-sm border border-cyan-500/30 bg-black/80 p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-cyan-500/30 bg-slate-950 font-mono text-xs font-semibold text-cyan-200">
        {skill.icon}
      </span>
      <h3 className="min-w-0 flex-1 font-mono text-xs leading-relaxed text-slate-100 sm:text-sm">
        {skill.name}
      </h3>
    </article>
  );
});

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const visibleSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  const selectByKeyboard = (event, currentIndex) => {
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else {
      return;
    }

    event.preventDefault();
    setActiveCategory(categories[nextIndex]);
    document.getElementById(categoryId(categories[nextIndex]))?.focus();
  };

  return (
    <Reveal
      as="section"
      id="skills"
      className="flex min-h-screen w-full scroll-mt-20 items-center justify-center px-[5%] pb-16"
    >
      <div className="hud-panel w-full max-w-[1100px] rounded-sm border border-cyan-500/30 bg-black/80 p-6 text-slate-100 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/70">
          // capability matrix
        </p>
        <h2 className="mt-2 font-mono text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-tight text-cyan-50">
          Skills &amp; Technologies
        </h2>
        <p className="mt-3 max-w-[65ch] text-sm text-slate-300">
          A snapshot of the technologies I use across full-stack engineering,
          generative AI, and modern application delivery.
        </p>

        <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {categories.map((category, index) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                id={categoryId(category)}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="skill-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveCategory(category)}
                onKeyDown={(event) => selectByKeyboard(event, index)}
                className={`
                  rounded-sm border px-3 py-2 font-mono text-[11px]
                  transition-transform duration-200 hover:-translate-y-0.5
                  sm:px-4 sm:text-xs
                  ${
                    isActive
                      ? "border-cyan-500/50 bg-cyan-950/60 text-cyan-100"
                      : "border-slate-100/15 bg-black/80 text-slate-300 hover:border-cyan-500/40"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div
          key={activeCategory}
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={categoryId(activeCategory)}
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default Skills;
