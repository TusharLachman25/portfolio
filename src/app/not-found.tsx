import type { Metadata } from 'next';
import Link from 'next/link';
import { ShortcutHint } from '@/components/ShortcutHint';

/** Without this the tab and the history entry read "Tushar Lachman Portfolio"
 * like the home page, for a page that isn't one. */
export const metadata: Metadata = {
  title: 'Not found',
};

export default function NotFound() {
  return (
    <main className="wrap section--lead" style={{ paddingBottom: 90 }}>
      <p className="eyebrow mono" style={{ color: 'var(--ink-4)' }}>
        ERROR 404
      </p>
      <h1 className="sheet-title" style={{ marginTop: 18 }}>
        No sheet at this address.
      </h1>
      <p className="hero-sub" style={{ marginTop: 20 }}>
        The page you asked for isn&rsquo;t here. Everything that does exist is in the{' '}
        <span className="off-phone">sidebar</span>
        <span className="on-phone">menu</span>
        {/* The shortcut half drops out on touch screens, which have no key to press. */}
        <span className="kbd-hint">
          , or one press of <ShortcutHint className="mono" /> away
        </span>
        .
      </p>
      <div className="actions">
        <Link href="/" className="btn-solid">
          Back to the work
        </Link>
      </div>
    </main>
  );
}
