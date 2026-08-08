'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ACADEMIC, PROJECTS } from '@/data/projects';
import { EMAIL, GITHUB, LINKEDIN, RESUME } from '@/data/site';
import { copyEmail } from './copy';

interface Item {
  label: string;
  kind: string;
  accent: string;
  run: () => void;
}

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...PROJECTS.map((p) => ({
        label: p.name,
        kind: 'PROJECT',
        accent: p.accent,
        run: () => router.push(`/work/${p.slug}`),
      })),
      ...ACADEMIC.map((a) => ({
        label: a.name,
        kind: 'ACADEMIC',
        accent: '#818cf8',
        run: () => router.push(`/academic/${a.slug}`),
      })),
      { label: 'Home — all work', kind: 'PAGE', accent: '#64748b', run: () => router.push('/') },
      {
        label: 'Toggle dark mode',
        kind: 'ACTION',
        accent: '#64748b',
        run: () => {
          const root = document.documentElement;
          const next = root.dataset.theme === 'light' ? 'dark' : 'light';
          root.dataset.theme = next;
          try {
            localStorage.setItem('tl-theme', next);
          } catch {
            /* ignore */
          }
        },
      },
      { label: `Copy email — ${EMAIL}`, kind: 'ACTION', accent: '#64748b', run: copyEmail },
      {
        label: 'Download résumé',
        kind: 'LINK',
        accent: '#64748b',
        run: () => window.open(RESUME, '_blank'),
      },
      {
        label: 'GitHub — TusharLachman25',
        kind: 'LINK',
        accent: '#64748b',
        run: () => window.open(GITHUB, '_blank', 'noreferrer'),
      },
      { label: 'LinkedIn', kind: 'LINK', accent: '#64748b', run: () => window.open(LINKEDIN, '_blank', 'noreferrer') },
    ],
    [router],
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((i) => `${i.label} ${i.kind}`.toLowerCase().includes(needle));
  }, [items, q]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    item.run();
    onClose();
  };

  return (
    <div
      className="overlay"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            // The highlight has to go back to the top with the results, or
            // Enter fires whatever happened to be third in the previous list.
            setActive(0);
          }}
          placeholder="Jump to a project, section or link…"
          aria-label="Search projects and actions"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((i) => (i + 1) % Math.max(results.length, 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              choose(results[active]);
            } else if (e.key === 'Escape') {
              onClose();
            }
          }}
        />
        {results.length === 0 ? (
          <div className="palette__empty">Nothing matches “{q}”.</div>
        ) : (
          <ul className="palette__list noscroll">
            {results.map((item, i) => (
              <li key={item.label}>
                <button
                  className="palette__item"
                  data-active={i === active ? '1' : undefined}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(item)}
                >
                  <span className="palette__dot" style={{ background: item.accent }} />
                  <span className="palette__label">{item.label}</span>
                  <span className="palette__kind mono">{item.kind}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
