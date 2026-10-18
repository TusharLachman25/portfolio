/** Trim to whole sentences within `max`, falling back to a word boundary.
 * Search engines cut a description at around 155 characters, and a sentence
 * that stops mid-word reads as broken in a search result. */
export function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const head = text.slice(0, max);
  const lastStop = head.lastIndexOf('. ');
  if (lastStop > max * 0.5) return head.slice(0, lastStop + 1);
  return `${head.slice(0, head.lastIndexOf(' '))}…`;
}
