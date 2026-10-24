/** A wireframe slide: number, title, the draft lines and which template it will use. Deliberately plain. */
export function Wire({ n, title, template, lines }: { n: number; title: string; template: string; lines: string[] }) {
  return (
    <div style={{ position: 'absolute', inset: 'var(--slide-margin)', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ font: '20px var(--font-pixel)', color: 'var(--text-muted)' }}>{String(n).padStart(2, '0')} · draft 1 · template: {template}</div>
      <div style={{ font: '700 calc(var(--deck-title) * var(--type-scale))/1.05 var(--font-head)', letterSpacing: 'var(--tracking-display)' }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 32, display: 'grid', gap: 14, font: 'calc(var(--deck-caption) * var(--type-scale))/1.4 var(--font-head)', color: 'var(--text-secondary)', maxWidth: 1500 }}>
        {lines.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </div>
  )
}
