const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab inside an open dialog: past the last control it wraps to the
 * first, and Shift+Tab before the first wraps to the last. Without it a
 * keyboard walks straight out of the viewer or the palette into the page
 * hidden underneath, which a screen reader then reads as if it were on top. */
export function trapTab(e: { key: string; shiftKey: boolean; preventDefault(): void }, root: HTMLElement | null) {
  if (e.key !== 'Tab' || !root) return;
  // Rendered controls only — getClientRects is empty for anything not drawn,
  // and unlike offsetParent it works for the viewer's fixed-position buttons.
  const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  );
  if (items.length === 0) return;

  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || !root.contains(active))) {
    e.preventDefault();
    first.focus();
  }
}
