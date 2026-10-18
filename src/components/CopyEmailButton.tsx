'use client';

import { EMAIL } from '@/data/site';
import { copyEmail } from './copy';

/** The address, as a button that copies it, joined to an envelope that opens
 * the visitor's own mail app. Copying stays the default because it always
 * works; the mailto: is there for everyone who does have a mail client set up,
 * and on a phone it is usually the quicker of the two. */
export function CopyEmailButton({ className = 'btn-outline' }: { className?: string }) {
  return (
    <span className="mailsplit">
      <button className={className} onClick={copyEmail} title="Copy the address">
        {EMAIL}
      </button>
      <a className={className} href={`mailto:${EMAIL}`} title="Open in your mail app" aria-label="Open in your mail app">
        ✉
      </a>
    </span>
  );
}
