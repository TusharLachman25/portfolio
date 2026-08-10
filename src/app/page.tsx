import Link from 'next/link';
import { CopyEmailButton } from '@/components/CopyEmailButton';
import { ACADEMIC, heroShot, PROJECTS, type AcademicItem, type Project } from '@/data/projects';
import {
  DISCIPLINE,
  EDUCATION,
  EMAIL,
  GITHUB,
  GRAD_FROM,
  HERO_STATS,
  LINKEDIN,
  RESUME,
  SKILLS,
  SUMMER_INTERNSHIP,
  TITLE_BLOCK,
  type Unit,
  WORK_RIGHTS,
} from '@/data/site';
import { accentVars, pad } from '@/lib/accent';

export default function Home() {
  return (
    <main>
      {/* Hidden on phones, where the app bar above it already says who this is
          and two stacked sticky headers eat a third of the screen. */}
      {/* The right-hand slot deliberately doesn't repeat the availability pill
          sitting 60px below it in the hero — two near-identical lines that close
          together read as a template, not as emphasis. */}
      <div className="stickybar stickybar--home">
        <span className="eyebrow mono">TUSHAR LACHMAN — {DISCIPLINE.toUpperCase()}</span>
        <span className="eyebrow eyebrow--dim mono">MELBOURNE · RMIT, GRADUATING JULY 2027</span>
      </div>

      <Hero />

      <section id="work" className="wrap section" style={{ paddingTop: 'clamp(34px,4.4vw,52px)' }}>
        <div className="rule-head">
          <h2 className="mono">SYSTEM SHEETS</h2>
          <span className="rule" />
          <span className="eyebrow eyebrow--dim mono">CLICK TO OPEN</span>
        </div>
        <div className="sheets">
          {PROJECTS.map((project, i) => (
            <SheetCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <section id="academic" className="wrap section">
        <div className="rule-head">
          <h2 className="mono">ACADEMIC PROJECTS</h2>
          <span className="rule" />
          <span className="eyebrow eyebrow--dim mono">RMIT COURSEWORK</span>
        </div>
        <div className="cards">
          {ACADEMIC.map((item) => (
            <AcademicCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <Education />
      <Specification />
      <Closing />
    </main>
  );
}

function Hero() {
  // Deliberately not revealed on scroll: it is the first thing on screen, and
  // fading it in means the page is blank until the bundle lands.
  return (
    <section className="wrap section--lead">
      <div className="hero-grid">
        <div>
          <p className="available mono" style={{ margin: 0 }}>
            <span className="available__dot" aria-hidden />
            <span className="available__text">OPEN TO SOFTWARE, DATA &amp; AI/ML ROLES</span>
          </p>
          <h1 className="hero-title">Tushar Lachman</h1>
          <p className="hero-lead">
            I build software end to end — and then get it into people&rsquo;s hands.{' '}
            <strong>One of them runs a family practice in Jakarta every day, on a paid monthly subscription.</strong>
          </p>
          <p className="hero-sub">
            Computer Science at RMIT, minoring in AI &amp; Machine Learning. Most of what I build starts as a problem I
            actually have. Open to any tech role — software, data, ML, platform, QA or product — as a summer intern
            over {SUMMER_INTERNSHIP}, or a graduate from {GRAD_FROM}.
          </p>
          <div className="actions">
            <a href="#work" className="btn-solid">
              See the work&nbsp;↓
            </a>
            <CopyEmailButton />
            <a href={RESUME} className="link-mono mono" target="_blank" rel="noreferrer">
              RÉSUMÉ ↓
            </a>
          </div>
        </div>

        <div className="titleblock">
          <div className="titleblock__head mono">AT A GLANCE</div>
          {TITLE_BLOCK.map((row) => (
            <div className="titleblock__row" key={row.key}>
              <span className="titleblock__k mono">{row.key}</span>
              <span className="titleblock__v">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats">
        {HERO_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <div className="stat__v">{stat.value}</div>
            <div className="stat__l mono">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SheetCard({ project, index }: { project: Project; index: number }) {
  const thumb = heroShot(project);

  return (
    <Link href={`/work/${project.slug}`} className="sheet-card" style={accentVars(project.accent)} data-reveal>
      <div className="sheet-card__strip">
        <span className="sheet-card__kind mono">
          <span aria-hidden />
          {pad(index)} — {project.kind}
        </span>
        <span className="eyebrow eyebrow--dim mono">{project.period}</span>
      </div>

      <div className="sheet-card__body">
        <div style={{ minWidth: 0 }}>
          <div className="sheet-card__id">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="applogo" src={project.logo} alt="" width={44} height={44} />
            <div style={{ minWidth: 0 }}>
              <h3 className="sheet-card__title">{project.name}</h3>
              <span className="pill mono">{project.status}</span>
            </div>
          </div>
          <p className="sheet-card__tagline">{project.tagline}</p>

          <div className="minirule">
            <span className="mono">SYSTEM</span>
            <span className="rule" />
          </div>
          <div className="chips">
            {project.layers.slice(0, 6).map((layer) => (
              <span className="chip mono" key={layer}>
                <span aria-hidden />
                {layer}
              </span>
            ))}
          </div>

          <div className="open-sheet">Open sheet →</div>
        </div>

        <div>
          {thumb ? (
            <div className="thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb} alt="" loading="lazy" />
            </div>
          ) : (
            <div className="thumb--empty mono">
              NO CAPTURES YET
              <br />
              SCREENSHOTS TO COME
            </div>
          )}
          {project.metrics.length > 0 && (
            <div className="minimetrics">
              {project.metrics.slice(0, 2).map((m) => (
                <div key={m.label}>
                  <div className="minimetric__v">{m.value}</div>
                  <div className="minimetric__l mono">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function AcademicCard({ item }: { item: AcademicItem }) {
  return (
    <Link href={`/academic/${item.slug}`} className="card" data-reveal>
      <div className="card__head mono">
        <span>{item.kind}</span>
        <span className="card__term">{item.term}</span>
      </div>
      <h3 className="card__title">{item.name}</h3>
      <p className="card__course mono">{item.course}</p>
      <p className="card__brief">{item.points[0]}</p>
      <div className="card__stack">
        {item.stack.slice(0, 4).map((tech) => (
          <span className="tag mono" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}

function Education() {
  const total = EDUCATION.completed.length + EDUCATION.current.length;
  const highDistinctions = EDUCATION.completed.filter((u) => u.hd).length;

  // One list, not three. Which year a unit was taken in tells a recruiter
  // nothing; what the degree has actually covered tells them everything. The
  // only split kept is done versus still running, because claiming a unit is
  // finished mid-semester would not be true.
  return (
    <section id="education" className="wrap section" data-reveal>
      <div className="rule-head">
        <h2 className="mono">EDUCATION</h2>
        <span className="rule" />
        <span className="eyebrow eyebrow--dim mono">
          {total} UNITS · {highDistinctions} HIGH DISTINCTIONS
        </span>
      </div>
      <div className="panel">
        <div className="edu__head">
          <div>
            <h3 className="edu__degree">{EDUCATION.degree}</h3>
            <p className="edu__meta">
              {EDUCATION.minor} · {EDUCATION.institution}
            </p>
          </div>
          <span className="edu__when mono">{EDUCATION.period}</span>
        </div>
        <UnitRow label="COMPLETED" units={EDUCATION.completed} />
        <UnitRow label="IN PROGRESS" units={EDUCATION.current} />
      </div>
    </section>
  );
}

function UnitRow({ label, units }: { label: string; units: Unit[] }) {
  return (
    <div className="edu__row">
      <span className="edu__year mono">
        {label}
        <span className="edu__count">{pad(units.length)}</span>
      </span>
      <div className="edu__courses">
        {units.map((unit) => (
          <span className={`tag tag--unit mono${unit.hd ? ' tag--hd' : ''}`} key={unit.code}>
            <span className="tag__code">{unit.code}</span>
            {unit.name}
            {unit.hd && <span className="tag__hd">HD</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function Specification() {
  return (
    <section id="skills" className="wrap section" data-reveal>
      <div className="rule-head">
        <h2 className="mono">SPECIFICATION</h2>
        <span className="rule" />
      </div>
      <div className="panel">
        {SKILLS.map((skill) => (
          <div className="spec__row" key={skill.label}>
            <span className="spec__k mono">{skill.label}</span>
            <span className="spec__v">{skill.items}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="contact" className="wrap section--close closing" data-reveal>
      <h2>Let&rsquo;s build something that ships.</h2>
      <p>
        I&rsquo;m after a summer internship over {SUMMER_INTERNSHIP} and a graduate role from {GRAD_FROM}, and
        I&rsquo;m not precious about which corner of the stack it&rsquo;s in — software, data, ML, platform, QA or
        product. Happy to walk through any of the private projects in detail: architecture, trade-offs, the parts that
        went wrong.
      </p>
      <p className="closing__rights">{WORK_RIGHTS}</p>
      <div className="actions">
        <CopyEmailButton className="btn-accent" />
        <a className="btn-outline" href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="btn-outline" href={GITHUB} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn-outline" href={RESUME} target="_blank" rel="noreferrer">
          Résumé ↓
        </a>
      </div>
      <p className="copyright mono">© 2026 TUSHAR LACHMAN · {EMAIL.toUpperCase()}</p>
    </section>
  );
}
