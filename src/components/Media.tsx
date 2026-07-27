'use client';

import { useEffect, useRef, useState } from 'react';

/** A missing image fails while the server-rendered HTML is still being
 * parsed — before React hydrates — so an `onError` prop alone never fires
 * and the slot shows a broken-image icon instead of the placeholder.
 * Re-checking the element once on mount catches those early failures;
 * the `onError` handler covers anything that fails later. */
function useLoadFailed(ref: React.RefObject<HTMLImageElement | null>) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [ref]);

  return [failed, () => setFailed(true)] as const;
}

/** A screenshot slot. Until the real file exists under /public/media it
 * renders a labelled placeholder showing exactly which filename to drop
 * in, so the layout is never broken and nothing has to be wired up
 * afterwards — replacing the file is the whole job. */
export function Shot({ src, caption, accent }: { src: string; caption: string; accent: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [missing, markMissing] = useLoadFailed(ref);

  return (
    <figure className="group flex flex-col gap-2">
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
        style={{ aspectRatio: '16 / 10' }}
      >
        {missing && <Placeholder file={src} accent={accent} />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={ref}
          src={src}
          alt={missing ? '' : caption}
          onError={markMissing}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${
            missing ? 'hidden' : ''
          }`}
        />
      </div>
      <figcaption className="text-[13px] text-slate-500">{caption}</figcaption>
    </figure>
  );
}

export function Video({ src, poster, accent }: { src: string; poster?: string; accent: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);

  // Same pre-hydration timing problem as the images above: a missing file
  // has already failed by the time React attaches the handler, and the
  // element reports it as having no usable source.
  useEffect(() => {
    const el = ref.current;
    if (el && el.networkState === el.NETWORK_NO_SOURCE) setMissing(true);
  }, []);

  if (missing) {
    return (
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
        style={{ aspectRatio: '16 / 9' }}
      >
        <Placeholder file={src} accent={accent} label="Demo video" />
      </div>
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      onError={() => setMissing(true)}
      className="w-full rounded-xl border border-white/10 bg-black"
      style={{ aspectRatio: '16 / 9' }}
    />
  );
}

function Placeholder({ file, accent, label = 'Screenshot' }: { file: string; accent: string; label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ background: `radial-gradient(circle at 50% 40%, ${accent}, transparent 70%)` }}
      />
      <div
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-dashed"
        style={{ borderColor: `${accent}66`, color: accent }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
      <div className="relative text-[12px] font-medium text-slate-400">{label} slot</div>
      <code className="relative rounded bg-black/40 px-2 py-1 text-[11px] text-slate-500">{file}</code>
    </div>
  );
}
