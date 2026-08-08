'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ACADEMIC, PROJECTS } from '@/data/projects';
import { EMAIL, GITHUB, LINKEDIN, RESUME } from '@/data/site';
import { CommandPalette } from './CommandPalette';
import { copyEmail } from './copy';

/** Both glyphs are always in the DOM and CSS picks the one that matches
 * `html[data-theme]`. Deriving it from React state instead would mean the
 * server rendering one icon and the pre-paint script implying the other. */
function ThemeGlyph() {
  return (
    <>
      <span className="only-dark" aria-hidden>
        ☀
      </span>
      <span className="only-light" aria-hidden>
        ☾
      </span>
    </>
  );
}

function setTheme(next: 'dark' | 'light') {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('tl-theme', next);
  } catch {
    /* private browsing — the toggle still works for this session */
  }
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const closeDrawer = useCallback(() => setDrawer(false), []);

  // The drawer lives as an attribute on <html> so the sidebar transform and the
  // scrim can be driven by the same CSS that handles the breakpoint.
  useEffect(() => {
    document.documentElement.dataset.drawer = drawer ? '1' : '0';
    document.body.style.overflow = drawer ? 'hidden' : '';
  }, [drawer]);

  // Route changes close both overlays — otherwise a back-button navigation on a
  // phone lands on a new page still covered by the menu. Adjusted during render
  // rather than in an effect so the new page never paints behind the old drawer.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setDrawer(false);
    setPalette(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onToast = (e: Event) => setToast((e as CustomEvent<string>).detail);
    window.addEventListener('tl-toast', onToast);
    return () => window.removeEventListener('tl-toast', onToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  // Scroll reveal. Elements are hidden by CSS only once the boot script has
  // added `.js`, and a timeout un-hides everything regardless, so a stalled
  // observer can never leave the page blank.
  useEffect(() => {
    // The CSS switches the effect off entirely on touch and narrow screens;
    // skip the observer there too rather than animating nothing.
    if (window.matchMedia('(hover: none), (max-width: 779px)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.revealed)'));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        }
      },
      // Start the fade a screen early so the element has finished arriving by
      // the time it is actually on screen. Waiting until it is 12% visible
      // means a fast scroll lands on something still fading in.
      { rootMargin: '0px 0px 25% 0px', threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));

    const fallback = setTimeout(() => {
      els.forEach((el) => el.classList.add('revealed'));
    }, 2000);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
  };

  const toggleRail = () => {
    const root = document.documentElement;
    const next = root.dataset.rail === '1' ? '0' : '1';
    root.dataset.rail = next;
    try {
      localStorage.setItem('tl-rail', next);
    } catch {
      /* ignore */
    }
  };

  const isHome = pathname === '/';

  return (
    <>
      {/* Phone top bar — the only navigation on screen until the drawer opens */}
      <div className="topbar">
        <button className="topbar__burger" onClick={() => setDrawer(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
        <Link href="/" className="topbar__id">
          <div className="topbar__name">Tushar Lachman</div>
          <div className="topbar__sub mono">Melbourne · RMIT ’27</div>
        </Link>
        <button className="side__theme" onClick={toggleTheme} aria-label="Toggle colour theme">
          <ThemeGlyph />
        </button>
      </div>

      {drawer && <button className="scrim" onClick={closeDrawer} aria-label="Close menu" />}

      <aside className="side">
        {/* Expanded sidebar. Hidden by CSS when the rail is on, and always
            shown inside the phone drawer regardless of the rail setting. */}
        <div className="side__full">
          <div className="side__head">
            <Link href="/" className="side__brand" onClick={closeDrawer}>
              <span className="mark">TL</span>
              <span style={{ minWidth: 0 }}>
                <span className="side__name" style={{ display: 'block' }}>
                  Tushar Lachman
                </span>
                <span className="side__sub mono" style={{ display: 'block' }}>
                  Melbourne · RMIT ’27
                </span>
              </span>
            </Link>
            <button
              className="icon-btn side__collapse"
              onClick={toggleRail}
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              «
            </button>
            <button
              className="icon-btn side__close"
              onClick={closeDrawer}
              title="Close menu"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="side__tools">
            <button className="side__search" onClick={() => setPalette(true)}>
              Search…
              <span className="side__kbd mono">⌘K</span>
            </button>
            <button className="side__theme" onClick={toggleTheme} aria-label="Toggle colour theme">
              <ThemeGlyph />
            </button>
          </div>

          <nav className="side__scroll noscroll">
            <Link
              href="/"
              className="nav"
              aria-current={isHome ? 'page' : undefined}
              style={{ marginTop: 14 }}
              onClick={closeDrawer}
            >
              <span className="nav__dot nav__dot--brand" />
              Home
            </Link>

            <div className="side__section mono">
              <span>PROJECTS</span>
              <span className="side__count">{String(PROJECTS.length).padStart(2, '0')}</span>
            </div>
            <div className="side__list">
              {PROJECTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="nav"
                  aria-current={pathname === `/work/${p.slug}` ? 'page' : undefined}
                  onClick={closeDrawer}
                >
                  <span className="nav__dot" style={{ background: p.accent }} />
                  {p.short}
                </Link>
              ))}
            </div>

            <div className="side__section mono">
              <span>ACADEMIC PROJECTS</span>
              <span className="side__count">{String(ACADEMIC.length).padStart(2, '0')}</span>
            </div>
            <div className="side__list">
              {ACADEMIC.map((a) => (
                <Link
                  key={a.slug}
                  href={`/academic/${a.slug}`}
                  className="nav"
                  aria-current={pathname === `/academic/${a.slug}` ? 'page' : undefined}
                  onClick={closeDrawer}
                >
                  <span className="nav__dot nav__dot--hollow" />
                  {a.short}
                </Link>
              ))}
            </div>

            <div className="side__section mono">
              <span>ELSEWHERE</span>
            </div>
            <div className="side__list" style={{ paddingBottom: 6 }}>
              <a className="nav" href={GITHUB} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a className="nav" href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="nav" href={RESUME}>
                Résumé ↓
              </a>
            </div>
          </nav>

          <div className="side__cta">
            <button className="btn-primary" onClick={copyEmail}>
              Get in touch
            </button>
          </div>
        </div>

        {/* Collapsed icon rail */}
        <div className="side__rail rail">
          <Link href="/" className="rail__mark" title="Home">
            TL
          </Link>
          <button
            className="rail__btn"
            onClick={toggleRail}
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            »
          </button>
          <span className="rail__rule" />
          <Link href="/" className="rail__btn" title="Home" aria-current={isHome ? 'page' : undefined}>
            ⌂
          </Link>
          <span className="rail__rule" />
          <div className="rail__scroll noscroll">
            {PROJECTS.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="rail__btn"
                title={p.name}
                aria-current={pathname === `/work/${p.slug}` ? 'page' : undefined}
              >
                <span
                  style={{ width: 9, height: 9, borderRadius: 3, background: p.accent }}
                  aria-hidden
                />
              </Link>
            ))}
            <span className="rail__rule" />
            {ACADEMIC.map((a) => (
              <Link
                key={a.slug}
                href={`/academic/${a.slug}`}
                className="rail__btn"
                title={a.name}
                aria-current={pathname === `/academic/${a.slug}` ? 'page' : undefined}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 3,
                    border: '1px solid var(--bd-2)',
                  }}
                  aria-hidden
                />
              </Link>
            ))}
          </div>
          <button className="rail__btn" onClick={toggleTheme} aria-label="Toggle colour theme">
            <ThemeGlyph />
          </button>
          <button className="rail__mail" onClick={copyEmail} title={EMAIL} aria-label="Copy email address">
            ✉
          </button>
        </div>
      </aside>

      <div className="content">{children}</div>

      {palette && <CommandPalette onClose={() => setPalette(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
