/** Motion tokens. Every duration and ease an action uses comes from here, so the whole product retimes in one place.
    Durations follow the clicky panel's spreadsheet (research, not code). Eases are named; the engine registers them. */
export const ease = {
  out: 'power3.out',            // things arriving
  inOut: 'power2.inOut',        // things travelling
  route: 'route',               // the strip's launch: anticipation pull, then a long glide (CustomEase)
  land: 'land',                 // landing with a small settle (CustomBounce)
  press: 'press',               // the stamp's slam (CustomBounce, strong)
  wiggle: 'unsure',             // misregistration jitter (CustomWiggle)
  step: 'steps(1)',             // a printer head moves in steps
  breathe: 'sine.inOut',
} as const

export const ms = {
  bubbleOpen: 180,
  catchTick: 260,
  groundScan: 320,
  attuneLids: 1800,
  keepRedraw: 600,
  recallRise: 420,
  bringBackStill: 2000,
  bringBackWords: 1400,
  doorsRise: 900,
  doorsStagger: 150,
  showLine: 280,
  routeNothing: 500,
  routeStrip: 620,
  wallClose: 380,
  sayBackLine: 250,
  threadStagger: 200,
  heldStill: 1000,
  gaugeAsk: 500,
  pushLean: 450,
  teachMove: 1600,
  curateList: 700,
  learnPair: 650,
  measureCount: 900,
  stampPress: 420,
  printChar: 28,
  blinkEvery: 6000,
  blink: 90,
  breath: 4000,
} as const

/** Seconds, for GSAP. */
export const s = (k: keyof typeof ms) => ms[k] / 1000
