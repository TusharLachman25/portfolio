/** What a phone's browser bar is drawn in for each theme: the theme's --side,
 * the colour of the phone top bar directly underneath it. The layout serves
 * the dark one; the boot script and setTheme() put a meta of their own in
 * front of it when the page is light, so the bar follows the theme the page
 * is actually in rather than the phone's own light or dark setting. */
export const THEME_COLOR = { dark: '#0d1219', light: '#ffffff' } as const;

export type Theme = keyof typeof THEME_COLOR;

/** The id of the theme-color meta this file and the boot script manage. The
 * one Next renders from the layout's viewport export is never touched, so
 * hydration always finds it as the server sent it. */
export const THEME_META_ID = 'tl-theme-color';

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;

  let meta = document.getElementById(THEME_META_ID) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.id = THEME_META_ID;
    meta.name = 'theme-color';
    // First in <head>, because browsers take the first theme-color they find.
    document.head.prepend(meta);
  }
  meta.content = THEME_COLOR[next];

  try {
    localStorage.setItem('tl-theme', next);
  } catch {
    /* private browsing — the toggle still works for this session */
  }
}

export function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
}
