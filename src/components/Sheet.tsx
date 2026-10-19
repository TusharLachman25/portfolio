import Link from 'next/link';
import type { Flow, Metric, NoteGroup, Shot } from '@/data/projects';
import { accentVars, pad } from '@/lib/accent';
import { responsive } from '@/lib/responsive';
import { CopyEmailButton } from './CopyEmailButton';
import { Gallery, type FlowView } from './Gallery';

/** The hero screenshot's width in the layout: about 510px beside the title on
 * a laptop, the full column once the hero stacks below 1180px. */
const PANEL_SIZES = '(max-width: 779px) calc(100vw - 36px), (max-width: 1179px) calc(100vw - 314px), 620px';

/** A note as the sheet draws it. Every project note has a headline; the
 * academic units' shorter points go without one. */
export interface SheetNote {
  head?: string;
  body: string;
  more?: string;
}

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
  /** "The hard parts" — the numbered rows. Shown in full. */
  notes: SheetNote[];
  /** Further notes, folded by topic under the ones above and numbered on from
   * them. For a sheet with more decisions worth naming than anyone reads in
   * one sitting. */
  noteGroups?: NoteGroup[];
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
  /** Two sentences of `mediaNote` to show by default. Where it exists the full
   * note moves behind a "How these were captured" expander under it. */
  mediaNoteSummary?: string;
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

/** One numbered note: its point in a line, the case for it, and, where the
 * story runs long, the rest folded underneath. The headline is a real heading
 * so a screen reader can walk the list the way a skimmer reads it: an h3 under
 * the section, an h4 inside a folded topic, whose title is the h3. */
function NoteRow({ n, note, heading: Heading }: { n: number; note: SheetNote; heading: 'h3' | 'h4' }) {
  return (
    <div className="note-row">
      <span className="note-row__n">{n}</span>
      <div className="note-row__text">
        {note.head && <Heading className="note-row__head">{note.head}</Heading>}
        <p>{note.body}</p>
        {note.more && (
          <details className="note-row__more">
            <summary>READ THE REST</summary>
            <p>{note.more}</p>
          </details>
        )}
      </div>
    </div>
  );
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
          <video
            src={view.trailer}
            poster={view.trailerPoster}
            controls
            playsInline
            preload="metadata"
            aria-label={`${view.name} — trailer`}
          />
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
          <video
            src={view.video}
            poster={view.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={`${view.name} — full walkthrough`}
          />
        </figure>
      )}
    </section>
  );

  // A project either has features walked through step by step, or a flat list
  // of screenshots. The flat list becomes one unnamed group so the gallery only
  // has to understand one shape.
  const flows: FlowView[] = (
    view.flows ?? (view.shots.length > 0 ? [{ title: '', caption: '', steps: view.shots }] : [])
  ).map((flow: Flow) => ({
    ...flow,
    steps: flow.steps.map((step) => ({ ...step, ...responsive(step.src) })),
  }));

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
          {view.mediaNoteSummary ? (
            <div>
              <p>{view.mediaNoteSummary}</p>
              <details className="footnote__more">
                <summary>HOW THESE WERE CAPTURED</summary>
                <p>{view.mediaNote}</p>
              </details>
            </div>
          ) : (
            <p>{view.mediaNote}</p>
          )}
        </div>
      )}
    </section>
  );

  const panel = view.panel ? responsive(view.panel) : undefined;

  // Every note is numbered once, in reading order: the ones shown in full
  // first, then each folded group carrying on from where the last stopped.
  const groups = view.noteGroups ?? [];
  const noteTotal = groups.reduce((n, g) => n + g.notes.length, view.notes.length);
  const groupStart = groups.map((_, i) =>
    groups.slice(0, i).reduce((n, g) => n + g.notes.length, view.notes.length),
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
        {/* Without a hero image the second column is dropped rather than
            filled: a placeholder announcing an absence is louder than the
            absence, and the title reads better across the full width. */}
        <div className={view.panel ? 'sheet-hero__grid' : 'sheet-hero__grid sheet-hero__grid--solo'}>
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

          {view.panel && (
            <div className="frame">
              <div className="frame__inner">
                <div className="frame__bar" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                {/* The one eagerly-loaded image on the page, so it carries its
                    real intrinsic size — without it the hero reflows the
                    moment the screenshot lands. Deliberately no
                    fetchPriority="high": React carries it into the preloads
                    Next issues for every route the sidebar prefetches, so
                    each sheet's hero would jump the queue on every page. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={view.panel}
                  srcSet={panel?.srcSet}
                  sizes={panel?.srcSet ? PANEL_SIZES : undefined}
                  alt={`${view.name} — screenshot`}
                  width={view.panelSize?.width}
                  height={view.panelSize?.height}
                />
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
              {/* A sheet with neither a repository nor a word about why omits
                  the row entirely — an empty SOURCE line reads as a broken
                  link rather than as an absence of one. */}
              {(view.repo || view.repoNote) && (
                <>
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
                </>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap sheet-section" data-reveal>
        <div className="h2row">
          <h2>The hard parts</h2>
          <span className="rule" />
          <span className="h2row__count mono">{pad(noteTotal)} NOTES</span>
        </div>
        <div>
          {view.notes.map((note, i) => (
            <NoteRow key={note.head ?? note.body.slice(0, 40)} n={i + 1} note={note} heading="h3" />
          ))}
        </div>
        {/* The rest, folded by topic: the same disclosure the screenshots
            use, so there is one way on the page of saying "more in here". */}
        {groups.length > 0 && (
          <div className="notegroups">
            <div className="minirule">
              <span className="mono">{pad(noteTotal - view.notes.length)} MORE, BY TOPIC</span>
              <span className="rule" />
            </div>
            {groups.map((group, g) => (
              <details className="flow flow--notes" key={group.title}>
                <summary className="flow__summary">
                  <span className="flow__head">
                    <h3 className="flow__title">{group.title}</h3>
                    <span className="rule" />
                    <span className="flow__count mono">
                      {pad(group.notes.length)} {group.notes.length === 1 ? 'NOTE' : 'NOTES'}
                    </span>
                    <span className="flow__toggle mono" aria-hidden>
                      <span className="flow__chev">›</span>
                      <span className="flow__when-closed">SHOW</span>
                      <span className="flow__when-open">HIDE</span>
                    </span>
                  </span>
                  <span className="flow__lead">{group.caption}</span>
                </summary>
                {group.notes.map((note, i) => (
                  <NoteRow key={note.head} n={groupStart[g] + i + 1} note={note} heading="h4" />
                ))}
              </details>
            ))}
          </div>
        )}
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
