/** Type tokens. Pretendard for words people read; Geist Mono for machine lines; printed text is drawn as dots. */
export const type = {
  face: { head: "'Pretendard', system-ui, sans-serif", mono: "'Geist Mono Variable', ui-monospace, monospace" },
  size: { hero: 56, title: 28, body: 16, small: 13, micro: 11 },
  tracking: { hero: '-0.045em', title: '-0.03em', body: '-0.01em', micro: '0.02em' },
} as const
