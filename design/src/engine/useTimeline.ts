import { useRef, useState, useCallback } from 'react'
import type { Timeline } from './types'

/** Holds a recipe's timeline so the cookbook transport can play, pause, scrub and loop it. */
export function useTimeline() {
  const tl = useRef<Timeline | null>(null)
  const [, force] = useState(0)
  const attach = useCallback((t: Timeline) => { tl.current = t; force((n) => n + 1) }, [])
  return { tl, attach }
}
