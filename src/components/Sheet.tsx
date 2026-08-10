import Link from 'next/link';
import type { Flow, Metric, Shot } from '@/data/projects';
import { accentVars, pad } from '@/lib/accent';
import { CopyEmailButton } from './CopyEmailButton';
import { Gallery } from './Gallery';

export interface SheetView {
  /** Breadcrumb root — "Projects" or "Academic projects". */
  crumb: string;
  crumbHref: string;
  name: string;
  kind: string;
  status: string;
  tagline: string;
  /** Shown next to the buttons and again in the facts list. */
  period: string;
  role: string;
  accent: string;
  /** Square app mark. Academic units have none — they aren't products. */
  logo?: string;
  blurb: string;
  layers: string[];
  stack: string[];
  metrics: Metric[];
  /** "The hard parts" — the numbered rows. */
  notes: string[];
  /** Hero screenshot, framed in browser chrome. */
  panel?: string;
  /** Its intrinsic size, so the hero reserves the right box before it loads. */
  panelSize?: { width: number; height: number };
  shots: Shot[];
  /** Feature-by-feature sequences; where present they replace `shots`. */
  flows?: Flow[];
  /** Portrait phone captures, which need the full width to stay readable. */
  portraitShots?: boolean;
  mediaNote?: string;
  /** A word from whoever uses the thing. Rendered only when it exists. */
  testimonial?: { quote: string; attribution: string };
  trailer?: string;
  trailerPoster?: string;
  trailerNote?: string;
  video?: string;
  poster?: string;
  videoNote?: string;
  repo?: string;
  repoNote?: string;
  index: number;
  total: number;
  prevHref: string;
  nextHref: string;
  nextName: string;
  nextAccent: string;
  /** Copy for the dashed "more to add" slot, where one is warranted. */
  moreToAdd?: string;
}

export function Sheet(view: SheetView) {
  const hasVideo = Boolean(view.trailer || view.video);

  // The media runs directly under the hero and the written case sits below it.
  // Someone skimming five project pages will watch a 45-second trailer long
  // before they will read twelve numbered notes, so the thing most likely to
  // hold them goes first and the detail rewards whoever stays.
  const watch = hasVideo && (
    <section id="watch" className="wrap sheet-section" data-reveal>
      <div className="h2row h2row--tight">
        <h2>Watch it run</h2>
        <span className="rule" />
        <span className="h2row__count mono">{view.trailer && view.video ? '02 TAKES' : '01 TAKE'}</span>
      </div>

      {view.trailer && (
        <figure className="video-figure">
          <figcaption className="figure__cap">
            <span className="figure__head">
              <span className="figure__fig mono">TRAILER</span>
              <span className="figure__title">The short, edited version</span>
              {/* Every trailer is scored; the walkthroughs are silent. Saying so
                  once here beats repeating it in five hand-written notes. */}
              <span className="figure__sound mono">♪ SOUND ON</span>
            </span>
            <span className="figure__desc">
              {view.trailerNote ?? 'A short, edited tour of the product, cut from footage of the real thing running.'}
            </span>
          </figcaption>
          <video src={view.trailer} poster={view.trailerPoster} controls playsInline preload="metadata" />
        </figure>
      )}

      {view.video && (
        <figure className="video-figure">
          <figcaption className="figure__cap">
            <span className="figure__head">
              <span className="figure__fig mono">FULL WALKTHROUGH</span>
              <span className="figure__title">The unedited take</span>
            </span>
            <span className="figure__desc">{view.videoNote ?? 'The app running, unedited and at real speed.'}</span>
          </figcaption>
          <video src={view.video} poster={view.poster} controls playsInline preload="metadata" />
        </figure>
      )}
    </section>
  );

  // A project either has features walked through step by step, or a flat list
  // of screenshots. The flat list becomes one unnamed group so the gallery only
  // has to understand one shape.
  const flows: Flow[] =
    view.flows ?? (view.shots.length > 0 ? [{ title: '', caption: '', steps: view.shots }] : []);

  const stepCount = flows.reduce((n, f) => n + f.steps.length, 0);

  const screens = stepCount > 0 && (
    <section id="screens" className="wrap sheet-section" data-reveal>
      <div className="h2row h2row--tight">
        <h2>{view.flows ? 'Every feature, step by step' : 'The app, screen by screen'}</h2>
        <span className="rule" />
        {/* Everything is collapsed by default, so the totals go here — otherwise
            a closed page looks like it holds six paragraphs and no pictures. */}
        <span className="h2row__count mono">
          {view.flows
            ? `${pad(flows.length)} FEATURES · ${pad(stepCount)} SCREENS · OPEN ONE`
            : 'CLICK TO ENLARGE'}
        </span>
      </div>
      <Gallery flows={flows} portrait={view.portraitShots} />
      {view.mediaNote && (
        <div className="footnote">
          <span aria-hidden>*</span>
          <p>{view.mediaNote}</p>
        </div>
      )}
    </section>
  );

  return (
    <main style={accentVars(view.accent, { '--next-accent': view.nextAccent })}>
      <div className="stickybar">
        <div className="crumb">
          <Link href={view.crumbHref}>{view.crumb}</Link>
          <span className="crumb__sep" aria-hidden>
            /
          </span>
          <span className="crumb__here">{view.name}</span>
        </div>
        <div className="pager">
          {/* One-based: "00 / 04" on the first of five reads as though one is
              missing. The sheets number themselves from 00 elsewhere, but a
              position counter is not a label. */}
          <span className="eyebrow eyebrow--dim mono">
            {pad(view.index + 1)} / {pad(view.total)}
          </span>
          <Link className="pager__btn" href={view.prevHref} aria-label="Previous">
            ←
          </Link>
          <Link className="pager__btn" href={view.nextHref} aria-label="Next">
            →
          </Link>
        </div>
      </div>

      <header className="sheet-hero">
        <div className="sheet-hero__wash" aria-hidden />
        <div className="sheet-hero__grid">
          <div style={{ minWidth: 0, maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexWrap: 'wrap' }}>
              <span className="kicker mono">{view.kind}</span>
              <span className="pill mono">{view.status}</span>
            </div>
            {view.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="applogo applogo--lg" src={view.logo} alt="" width={64} height={64} />
            )}
            <h1 className="sheet-title">{view.name}</h1>
            <p className="sheet-tagline">{view.tagline}</p>
            <div className="actions">
              {hasVideo && (
                <a href="#watch" className="btn-solid">
                  ▶&nbsp;&nbsp;Watch it run
                </a>
              )}
              {view.repo && (
                <a className="btn-outline" href={view.repo} target="_blank" rel="noreferrer">
                  Source on GitHub ↗
                </a>
              )}
              <span className="eyebrow eyebrow--dim mono">{view.period}</span>
            </div>
          </div>

          {view.panel ? (
            <div className="frame">
              <div className="frame__inner">
                <div className="frame__bar" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                {/* The one eagerly-loaded image on the page, so it carries its
                    real intrinsic size — without it the hero reflows the moment
                    the screenshot lands. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={view.panel}
                  alt={`${view.name} — screenshot`}
                  width={view.panelSize?.width}
                  height={view.panelSize?.height}
                />
              </div>
            </div>
          ) : (
            <div className="dashed">
              <div>
                <div className="dashed__label mono">NO CAPTURES YET</div>
                <p>This one has no screenshots on file. Happy to demo it live.</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {view.metrics.length > 0 && (
        <section className="band">
          <div className="band__inner">
            {view.metrics.map((m) => (
              <div className="band__cell" key={m.label}>
                <div className="band__v">{m.value}</div>
                <div className="band__l mono">{m.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {watch}
      {screens}

      <section className="wrap why" data-reveal>
        <div className="why__label mono">WHY IT EXISTS</div>
        <p>{view.blurb}</p>
      </section>

      {/* Only ever rendered from real supplied words — an absent testimonial is
          an absent section, never a placeholder that reads like a quote. */}
      {view.testimonial && (
        <section className="wrap sheet-section" data-reveal>
          <figure className="quote">
            <blockquote>{view.testimonial.quote}</blockquote>
            <figcaption className="mono">{view.testimonial.attribution}</figcaption>
          </figure>
        </section>
      )}

      {/* Architecture before the hard parts: the notes below refer to layers by
          name, so the shape of the system has to be on screen first. */}
      <section className="wrap sheet-section" data-reveal>
        <div className="two-col">
          <div>
            <div className="h2row h2row--tight">
              <h2>How it&rsquo;s put together</h2>
              <span className="rule" />
            </div>
            <div className="spine">
              {view.layers.map((layer, i) => (
                <div className="spine__item" key={layer}>
                  <div className="spine__n mono">L{pad(i)}</div>
                  <div className="spine__t">{layer}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h2row h2row--tight">
              <h2>Built with</h2>
              <span className="rule" />
            </div>
            <div className="pills">
              {view.stack.map((tech) => (
                <span className="pill-chip mono" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <dl className="facts">
              <dt className="mono">PERIOD</dt>
              <dd>{view.period}</dd>
              <dt className="mono">ROLE</dt>
              <dd>{view.role}</dd>
              <dt className="mono">SOURCE</dt>
              <dd>
                {view.repo ? (
                  <a href={view.repo} target="_blank" rel="noreferrer">
                    View on GitHub ↗
                  </a>
                ) : (
                  view.repoNote
                )}
              </dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap sheet-section" data-reveal>
        <div className="h2row">
          <h2>The hard parts</h2>
          <span className="rule" />
          <span className="h2row__count mono">{pad(view.notes.length)} NOTES</span>
        </div>
        <div>
          {view.notes.map((note, i) => (
            <div className="note-row" key={note.slice(0, 40)}>
              <span className="note-row__n">{i + 1}</span>
              <p>{note}</p>
            </div>
          ))}
        </div>
        {view.moreToAdd && (
          <div
            style={{
              margin: '24px 0 0',
              border: '1px dashed var(--bd-2)',
              borderRadius: 16,
              padding: '22px 24px',
            }}
          >
            <div className="dashed__label mono" style={{ color: 'var(--ink-4)' }}>
              MORE TO ADD HERE
            </div>
            <p style={{ margin: '10px 0 0', maxWidth: 640, fontSize: 15, lineHeight: 1.68, color: 'var(--ink-3)' }}>
              {view.moreToAdd}
            </p>
          </div>
        )}
      </section>

      {/* The next-project band loops forever, so without this a visitor who
          reads every sheet is never once asked to get in touch. */}
      <section className="wrap sheet-section" data-reveal>
        <div className="askrow">
          <p className="askrow__text">
            Want the parts that aren&rsquo;t on this page — the architecture arguments, the things that broke, a live
            walkthrough?
          </p>
          <CopyEmailButton className="btn-accent" />
        </div>
      </section>

      <Link href={view.nextHref} className="nextband">
        <span className="nextband__wash" aria-hidden />
        <span className="nextband__inner">
          <span style={{ minWidth: 0 }}>
            <span className="nextband__label mono" style={{ display: 'block' }}>
              NEXT
            </span>
            <span className="nextband__name" style={{ display: 'block' }}>
              {view.nextName}
            </span>
          </span>
          <span className="nextband__arrow" aria-hidden>
            →
          </span>
        </span>
      </Link>
    </main>
  );
}
