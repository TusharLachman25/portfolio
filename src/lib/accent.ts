import type { CSSProperties } from 'react';

/** Per-project accents ride on a CSS custom property so a card and everything
 * inside it — chips, numerals, washes — recolour from one declaration instead
 * of threading the hex through a dozen inline styles. */
export function accentVars(accent: string, extra?: Record<string, string>): CSSProperties {
  return { '--accent': accent, ...extra } as CSSProperties;
}

/** Two-digit counter, the way the sheets label everything: 00, 01, 02… */
export const pad = (n: number) => String(n).padStart(2, '0');
