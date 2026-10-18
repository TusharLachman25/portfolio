/** The palette shortcut as this machine spells it. Both spellings render and
 * CSS keeps the one the boot script's `data-os` asks for — ⌘K on Apple
 * hardware, Ctrl K everywhere else — so the server never has to guess the
 * visitor's keyboard. Hidden on touch screens, which have no key to press. */
export function ShortcutHint({ className = '' }: { className?: string }) {
  return (
    <span className={`kbd-hint ${className}`.trim()}>
      <span className="kbd-mac">⌘K</span>
      <span className="kbd-other">Ctrl K</span>
    </span>
  );
}
