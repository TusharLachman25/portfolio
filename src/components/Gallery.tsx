'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Flow, Shot } from '@/data/projects';
import { pad } from '@/lib/accent';

/** Steps grouped under the feature they belong to. A project that hasn't been
 * walked through feature by feature passes a single unnamed group instead.
 *
 * `portrait` widens the grid to one column: phone captures are tall and narrow,
 * and two of them in a half-width cell are a pair of unreadable slivers. */
export function Gallery({ flows, portrait }: { flows: Flow[]; portrait?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  // The lightbox runs across every step on the page, so the arrow keys walk the
  // whole sheet rather than stopping at the end of a group. Each group carries
  // the index its first step occupies in that flattened list.
  const all = useMemo<Shot[]>(() => flows.flatMap((f) => f.steps), [flows]);
  const groups = useMemo(
    () =>
      flows.map((flow, i) => ({
        flow,
        offset: flows.slice(0, i).reduce((n, f) => n + f.steps.length, 0),
      })),
    [flows],
  );

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setOpen((i) => ((i ?? 0) + 1) % all.length);
      if (e.key === 'ArrowLeft') setOpen((i) => ((i ?? 0) - 1 + all.length) % all.length);
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, all.length, close]);

  const current = open === null ? null : all[open];

  return (
    <>
      {groups.map(({ flow, offset }, groupIndex) => {
        {/* Caption first, image second — you should know what you are about to
            look at before you look at it. Two up, so a nine-step feature is
            five rows rather than nine screenfuls. */}
        const grid = (
          <div className={portrait ? 'gallery gallery--portrait' : 'gallery'}>
            {flow.steps.map((step, i) => (
              <button key={step.src} className="figure" onClick={() => setOpen(offset + i)}>
                <span className="figure__cap">
                  <span className="figure__head">
                    <span className="figure__fig mono">STEP {pad(i + 1)}</span>
                    <span className="figure__title">{step.title}</span>
                  </span>
                  <span className="figure__desc">{step.caption}</span>
                </span>
                <span className="figure__box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={step.src} alt={`${step.title} — ${step.caption}`} loading="lazy" />
                  <span className="figure__zoom mono" aria-hidden>
                    ⤢ ENLARGE
                  </span>
                </span>
              </button>
            ))}
          </div>
        );

        // An untitled group is a project's plain screenshot list — there is
        // nothing to label a collapsed state with, so it stays open.
        if (!flow.title) {
          return (
            <section className="flow" key="screens">
              {grid}
            </section>
          );
        }

        // <details> rather than React state: it collapses before hydration,
        // survives with JavaScript off, is keyboard-operable for free, and
        // keeps the images inside it from loading until someone asks for them.
        //
        // The first feature opens by default. Every group closed meant a page
        // of grey bars where the screenshots should be — the strongest evidence
        // on the sheet, behind a click nobody was told to make. One open group
        // shows what the rest contain and still keeps the page short.
        return (
          <details className="flow" key={flow.title} open={groupIndex === 0}>
            <summary className="flow__summary">
              <span className="flow__head">
                <h3 className="flow__title">{flow.title}</h3>
                <span className="rule" />
                <span className="flow__count mono">
                  {pad(flow.steps.length)} {flow.steps.length === 1 ? 'STEP' : 'STEPS'}
                </span>
                <span className="flow__toggle mono" aria-hidden>
                  <span className="flow__chev">›</span>
                  <span className="flow__when-closed">SHOW</span>
                  <span className="flow__when-open">HIDE</span>
                </span>
              </span>
              <span className="flow__lead">{flow.caption}</span>
            </summary>
            {grid}
          </details>
        );
      })}

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title} onClick={close}>
          {/* A phone has no Escape key, and the figure swallows taps so they
              don't dismiss the image being read — without this button there is
              no obvious way out on the device most people open this on. */}
          <button className="lightbox__close" onClick={close} aria-label="Close image">
            ✕
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={`${current.title} — ${current.caption}`} />
            <figcaption className="mono">
              <span>{current.title}</span>
              <span style={{ opacity: 0.6 }}>
                {(open ?? 0) + 1} / {all.length}
                {/* Hidden on touch by CSS: a phone has neither key, and the ✕
                    above is the affordance there. */}
                <span className="lightbox__keys">
                  {all.length > 1 ? ' · ESC TO CLOSE · ← →' : ' · ESC TO CLOSE'}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
