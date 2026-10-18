'use client';

import { EMAIL } from '@/data/site';

function toast(message: string) {
  window.dispatchEvent(new CustomEvent('tl-toast', { detail: message }));
}

/** Copies the address and confirms it. This is the default rather than a
 * `mailto:`, which on a laptop with no mail client configured opens nothing at
 * all and leaves the visitor assuming the button is broken; the mailto: sits
 * beside it as its own control (CopyEmailButton) for anyone who has one. The
 * Shell listens for the event, so any page can call this without threading a
 * context through. */
export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast('Email copied');
    return;
  } catch {
    // The async Clipboard API needs a secure context and, in some browsers, a
    // permission the visitor has denied. Fall through rather than give up.
  }

  if (legacyCopy(EMAIL)) {
    toast('Email copied');
    return;
  }

  // Nothing could reach the clipboard. Say the address out loud instead of
  // failing silently, so it can at least be read off the screen.
  toast(EMAIL);
}

/** `document.execCommand` is deprecated but still the only copy path that works
 * without the Clipboard API, and it costs one hidden textarea to support. */
function legacyCopy(text: string): boolean {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
  document.body.appendChild(field);
  field.select();

  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(field);
  return ok;
}
