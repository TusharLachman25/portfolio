import Link from 'next/link';

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
        The page you asked for isn&rsquo;t here. Everything that does exist is one press of{' '}
        <span className="mono">⌘K</span> away, or in the sidebar.
      </p>
      <div className="actions">
        <Link href="/" className="btn-solid">
          Back to the work
        </Link>
      </div>
    </main>
  );
}
