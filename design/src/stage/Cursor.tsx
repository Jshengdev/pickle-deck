/** The macOS arrow cursor, drawn fresh: black with a white edge, tip at (0, 0). */
export function Cursor({ size = 26 }: { size?: number }) {
  return (
    <svg width={size * 0.7} height={size} viewBox="0 0 14 20" style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,.35))' }}>
      <path d="M1 1L1 16.5L4.7 13L7.4 19.2L10 18L7.4 12L12.6 12Z" fill="#121212" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}
