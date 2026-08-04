import { Shot, Video } from "@/components/Media";
import { ACADEMIC, ALSO_BUILT, PROJECTS, type AcademicItem, type Project } from "@/data/projects";

const EMAIL = "tusharbudhrani@gmail.com";
const GITHUB = "https://github.com/TusharLachman25";
const LINKEDIN = "https://www.linkedin.com/in/tusharlachman-505264345";
const RESUME = "/Tushar-Lachman-Resume.pdf";

const SKILLS: { label: string; items: string }[] = [
  { label: "Languages", items: "Python · TypeScript · JavaScript · Java · C · C++ · SQL · Prolog" },
  { label: "Frameworks", items: "React · React Native (Expo) · Next.js · Node.js · Flask · Streamlit · Tailwind CSS" },
  {
    label: "Cloud & DevOps",
    items: "AWS (EC2, ECS, S3, DynamoDB) · Docker · Vercel · EAS Build · Firebase Cloud Messaging · Git",
  },
  {
    label: "Backend & data",
    items: "PostgreSQL · Supabase · REST API design · serverless functions · OAuth 2.0 · schema design & migrations",
  },
  {
    label: "AI & data science",
    items: "Claude API · Google Gemini (text & vision) · scikit-learn · pandas · NLTK · transformers · NetworkX",
  },
];

export default function Home() {
  return (
    <div className="relative z-10">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6">
        <Hero />
        <section id="work" className="scroll-mt-24 pb-8">
          <SectionLabel>Selected work</SectionLabel>
          <div className="flex flex-col gap-24">
            {PROJECTS.map((p) => (
              <ProjectBlock key={p.slug} project={p} />
            ))}
          </div>
          <p className="mt-14 border-t border-white/10 pt-6 text-[14px] text-slate-500">
            <span className="text-slate-400">Also built — </span>
            {ALSO_BUILT}
          </p>
        </section>
        <Academic />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06080c]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.2em] text-slate-300"
        >
          TL
        </a>
        <nav className="flex items-center gap-5 text-[13px] text-slate-400">
          <a href="#work" className="transition hover:text-slate-100">
            Work
          </a>
          <a href="#academic" className="hidden transition hover:text-slate-100 sm:inline">
            Academic
          </a>
          <a href="#skills" className="hidden transition hover:text-slate-100 sm:inline">
            Skills
          </a>
          <a href="#contact" className="transition hover:text-slate-100">
            Contact
          </a>
          <a
            href={RESUME}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-white/30 hover:bg-white/5"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="py-20 sm:py-28">
      <p className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.22em] text-sky-400/80">
        MELBOURNE, AUSTRALIA
      </p>
      <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
        Tushar Lachman
      </h1>
      <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-400 sm:text-[19px]">
        Computer Science student at RMIT University, minoring in Artificial Intelligence &amp; Machine Learning. I build
        full-stack software end to end — and then get it into people&rsquo;s hands.{" "}
        <span className="text-slate-200">
          One of my projects is now sold on a monthly subscription and runs a medical practice in Jakarta every day.
        </span>
      </p>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-500">
        Most of what I build starts as a problem I actually have. Graduating July 2027 and looking for a software
        engineering internship or graduate role.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-lg bg-sky-400 px-4 py-2.5 text-[14px] font-semibold text-[#06080c] transition hover:bg-sky-300"
        >
          Get in touch
        </a>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/15 px-4 py-2.5 text-[14px] font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
        >
          GitHub
        </a>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/15 px-4 py-2.5 text-[14px] font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="mb-12 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.22em] text-slate-500">
      {children.toUpperCase()}
    </h2>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  const { accent } = project;

  return (
    <article className="scroll-mt-24" id={project.slug}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">{project.name}</h3>
        {project.status && (
          <span
            className="rounded-full px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wider"
            style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}33` }}
          >
            {project.status}
          </span>
        )}
      </div>

      <p className="mt-2 text-[15px] text-slate-400">
        {project.tagline} <span className="text-slate-600">· {project.period}</span>
      </p>

      <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-slate-300">{project.blurb}</p>

      <ul className="mt-6 flex max-w-3xl flex-col gap-2.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[14.5px] leading-relaxed text-slate-400">
            <span
              aria-hidden
              className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full"
              style={{ background: accent }}
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-[family-name:var(--font-mono)] text-[11.5px] text-slate-400"
          >
            {s}
          </span>
        ))}
      </div>

      {(project.repo || project.repoNote) && (
        <p className="mt-5 text-[13.5px] text-slate-500">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-white/20 underline-offset-4 transition hover:text-slate-200"
            >
              View source on GitHub →
            </a>
          ) : (
            project.repoNote
          )}
        </p>
      )}

      {project.trailer && (
        <figure className="mt-8 flex flex-col gap-2">
          <Video src={project.trailer} poster={project.trailerPoster} accent={accent} />
          <figcaption className="text-[13px] text-slate-500">Trailer</figcaption>
        </figure>
      )}

      {project.video && (
        <figure className="mt-8 flex flex-col gap-2">
          <Video src={project.video} poster={project.poster} accent={accent} />
          <figcaption className="text-[13px] text-slate-500">
            {project.trailer ? 'Full walkthrough — the app running, unedited' : 'Walkthrough'}
          </figcaption>
        </figure>
      )}

      {project.shots.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {project.shots.map((s) => (
            <Shot key={s.src} src={s.src} caption={s.caption} accent={accent} />
          ))}
        </div>
      )}
    </article>
  );
}

function Academic() {
  return (
    <section id="academic" className="scroll-mt-24 pt-24">
      <SectionLabel>Academic work</SectionLabel>
      <div className="grid gap-4 sm:grid-cols-2">
        {ACADEMIC.map((a) => (
          <AcademicCard key={a.name} item={a} />
        ))}
      </div>
    </section>
  );
}

function AcademicCard({ item }: { item: AcademicItem }) {
  return (
    <article className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <h3 className="text-[16px] font-semibold text-slate-100">{item.name}</h3>
      <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-slate-500">{item.course}</p>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-400">{item.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10.5px] text-slate-500"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <SectionLabel>Skills</SectionLabel>
      <dl className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {SKILLS.map((s) => (
          <div key={s.label} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.14em] text-slate-500">
              {s.label.toUpperCase()}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-slate-300">{s.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pb-24">
      <SectionLabel>Contact</SectionLabel>
      <p className="max-w-2xl text-[17px] leading-relaxed text-slate-300">
        I&rsquo;m looking for a software engineering internship or graduate role, and I&rsquo;m happy to walk through any
        of the private projects above in detail.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-lg bg-sky-400 px-4 py-2.5 text-[14px] font-semibold text-[#06080c] transition hover:bg-sky-300"
        >
          {EMAIL}
        </a>
        <a
          href={RESUME}
          className="rounded-lg border border-white/15 px-4 py-2.5 text-[14px] font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
        >
          Download résumé
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="font-[family-name:var(--font-mono)] text-[11.5px] tracking-wider text-slate-600">
          © {new Date().getFullYear()} TUSHAR LACHMAN
        </p>
      </div>
    </footer>
  );
}
