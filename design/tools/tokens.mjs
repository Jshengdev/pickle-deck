#!/usr/bin/env node
// tokens.mjs — the ONE source of pickje's design tokens. Edit SOURCE below, then run `node tools/tokens.mjs`.
// It writes src/tokens/generated/: tokens.ts (typed), tokens.css (CSS variables), tailwind.css (Tailwind v4 @theme),
// tokens.json (W3C DTCG, with a hex fallback on every colour for Swift and anything without OKLCH).
//
// Colour theory used for every natural ramp (his words: "guided by the saturation of the particle with slight
// adjustments to hue to compensiate for color theory"): lightness runs 0.975 → 0.18; saturation (OKLCH chroma) peaks in
// the middle of the ramp and falls off toward white and toward ink; the hue drifts warm in the tints and cool in the
// shades. The brand's exact colours are anchors: the ramp passes through them.
import fs from 'node:fs'
import path from 'node:path'

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const L_AT = { 50: 0.975, 100: 0.94, 200: 0.89, 300: 0.83, 400: 0.75, 500: 0.66, 600: 0.56, 700: 0.46, 800: 0.37, 900: 0.27, 950: 0.18 }

const SOURCE = {
  palettes: {
    // One neutral, cool and clean (his words 2026-10-24: "Remove the paper or beige color. standarize that"). The light end
    // is near-white metal; the hue leans to UG's concrete and chrome (a grey with the garden in it), never warm.
    silver: { note: 'the one neutral: metal, chrome, concrete; down to ink', hueLight: 196, hueDark: 236, chroma: 0.014, peak: 0.55, anchors: { 950: '#121212' } },
    matcha: { note: "UG's sage backdrop, kept green so it never reads as cream: the felt trays", hueLight: 126, hueDark: 142, chroma: 0.045, peak: 0.35, anchors: {} },
    moss:   { note: 'living moss: life green, not olive (his words 2026-10-24: "a little bit more green and a little more alive")', hueLight: 118, hueDark: 140, chroma: 0.15, peak: 0.55, anchors: {} },
    forest: { note: "UG's flocked green, deep felt", hueLight: 124, hueDark: 150, chroma: 0.12, peak: 0.45, anchors: { 600: '#648B43', 800: '#1E3D1F' } },
    lichen: { note: "Pickle's lime: new growth", hueLight: 108, hueDark: 136, chroma: 0.19, peak: 0.35, anchors: { 300: '#C4DC2E', 400: '#8CC63F' } },
    sky:    { note: "Blicky's sky, down to riso ink", hueLight: 238, hueDark: 266, chroma: 0.15, peak: 0.45, anchors: { 400: '#63ADF7', 800: '#324079' } },
    pollen: { note: 'spark yellow: the burst', hueLight: 98, hueDark: 80, chroma: 0.17, peak: 0.3, anchors: { 300: '#F7C933' } },
    amber:  { note: 'amber catch: the catch only (s08)', hueLight: 80, hueDark: 52, chroma: 0.16, peak: 0.38, anchors: { 400: '#F4A12E' } },
    petal:  { note: 'the small flowers in the moss (his words: "add small petals and pink")', hueLight: 352, hueDark: 364, chroma: 0.14, peak: 0.4, anchors: {} },
    ember:  { note: 'cheek red (a face) and stop red (stuck, nothing else)', hueLight: 30, hueDark: 20, chroma: 0.22, peak: 0.5, anchors: { 500: '#EE3445', 600: '#D8202F' } },
  },
  // Exact single colours from his s07 that are not on a ramp.
  fixed: { night: '#161513' },
  // Semantic roles: code uses THESE, never a raw palette step (see STYLE.md).
  semantic: {
    'surface-ground': 'silver-100',   // the clean metal-white the whole product sits on (no paper, no beige)
    'surface-plane': 'silver-50',     // the metal plane: cards, the bubble
    'surface-raised': 'silver-50',    // a plane lifted toward you (more sheen, higher elevation)
    'surface-sunken': 'silver-200',   // wells, inputs
    'surface-felt': 'forest-800',     // the main felt: forest green, the colourway with silver (his words 2026-10-24: "silver and darker. Green as the main colorway")
    'surface-felt-deep': 'forest-900', // the darkest felt: a band on forest, the deepest tray
    'surface-felt-sage': 'matcha-200', // sage: "more of like a more invisible texture" on silver
    'surface-felt-sky': 'sky-500',    // sky felt: "the sky blue one just feels really good"
    'surface-felt-neutral': 'silver-300', // grey felt, when colour would compete
    'surface-night': 'night',         // the title card (s07)
    'ink': 'silver-950',              // text, outlines, the cast's marker line, the eyes
    'text-secondary': 'silver-800',   // body sentences: 8.7:1 on the ground (no light grey text, sign #16)
    'text-muted': 'silver-700',       // captions only: 5.9:1 on the ground; on felt use ink or text-secondary
    'text-on-dark': 'silver-50',
    'text-on-dark-muted': 'silver-400',
    'line-hair': 'silver-300',
    'line-strong': 'silver-950',
    'pickle': 'lichen-300',           // Pickle's body; never text on a light ground
    'pickle-stripe': 'lichen-400',
    'blicky': 'sky-400',              // Blicky's body; never text on a light ground
    'cheek': 'ember-500',             // a face, not an error
    'moss': 'moss-500',
    'moss-tip': 'moss-300',
    'moss-crevice': 'moss-700',
    'moss-undertone': 'forest-700',   // what shows between shoots where the moss is sparse
    'moss-petal': 'petal-300',        // the pink flowers in the moss
    'moss-petal-blue': 'sky-300',     // the blue ones
    'moss-petal-light': 'silver-50',  // the white ones
    'moss-pollen': 'pollen-300',      // their centres
    'attention': 'pollen-300',        // the spark: the odd word, the burst
    'catch': 'amber-400',             // the catch only: the wall catches a mismatch
    'checked': 'forest-600',          // said back and matched
    'stuck': 'ember-600',             // stop red: stuck, nothing else
    'focus': 'sky-500',
    'state-asleep': 'silver-400', 'state-listening': 'sky-300', 'state-heard': 'lichen-300', 'state-working': 'pollen-300',
    'state-waiting': 'pollen-400', 'state-checked': 'forest-600', 'state-stuck': 'ember-600',
  },
  material: {
    // Three materials, one interface (plastic was removed, his words 2026-10-24: "remove plastic dont really like it") (his words 2026-10-24: "metalic and felt like combine color and texture into a clean
    // interface"; UG: chrome tools, cushion moss, flocked felt, sage seamless). Each takes a colour ROLE; the texture never
    // brings its own colour.
    grain: { size: 0.75, density: 0.9, hueShift: 10, satJitter: 0.5, fps: 12 },                 // the brand's texture; blur is grain
    metal: { stops: ['silver-50', 'silver-100', 'silver-300', 'silver-500'], env: 'matcha-300', brushed: 0.35, sheen: 0.7, specks: 0.18, bevel: 1.2, contrast: 1.35, dome: 0 },   // "a little bit more contrasty"
    felt: { noise: 0.9, scale: 3, light: 235, sheen: 1.1, fringe: 1.2, hueJitter: 3, satJitter: 0.25 },   // s03: "NOISE 0.90 × 3 · LIGHT 235° · SHEEN 1.1"
    flock: { noise: 0.7, scale: 2, light: 235, sheen: 1.4, fringe: 0.3, hueJitter: 4, satJitter: 0.3 },   // s04: the blue flocked tray
    moss: { body: 'moss-500', tip: 'moss-300', crevice: 'moss-700', undertone: 'moss-undertone', sparse: 0.35, petal: 'moss-petal', petalBlue: 'moss-petal-blue', petalLight: 'moss-petal-light', pollen: 'moss-pollen', cushion: 30, detail: 1, scale: 1.15, bloom: 0.3, bright: 1.08, dew: 0.6, hueJitter: 8, satJitter: 0.45, fringe: 4 },
    elevation: {                                                                                  // shadows are grain dispersing, not blur
      1: { spread: 6, density: 0.32, offsetX: 1, offsetY: 3 }, 2: { spread: 12, density: 0.38, offsetX: 3, offsetY: 7 },
      3: { spread: 22, density: 0.42, offsetX: 6, offsetY: 14 }, 4: { spread: 36, density: 0.46, offsetX: 10, offsetY: 22 },
    },
    shadowInk: 'silver-900',
  },
  light: { keyAngle: 225, softness: 0.6, warmth: 0.15, ambient: 0.35, rim: 0.25 },
  motion: {
    ms: { instant: 90, quick: 180, base: 280, gentle: 420, slow: 620, scene: 900, hold: 1000, breath: 4000, blinkEvery: 6000,
      dot: 40, hitStop: 90, drain: 80, swap: 220 },   // s12: 40 ms per dot (ring and meter fill), 90 ms hit-stop, 80 ms per dot drain, 220 ms card swap
    ease: { out: 'cubic-bezier(0.16, 1, 0.3, 1)', inOut: 'cubic-bezier(0.65, 0, 0.35, 1)', in: 'cubic-bezier(0.55, 0, 1, 0.45)',
      anticipate: 'cubic-bezier(0.36, -0.28, 0.6, 1)', overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    spring: { alive: { stiffness: 170, damping: 12 }, gentle: { stiffness: 120, damping: 20 }, snappy: { stiffness: 420, damping: 32 }, dingy: { stiffness: 140, damping: 9 } },
    aliveness: { breathDepth: 0.02, blinkJitter: 1500, eyeLag: 0.06, idleDrift: 3 },
  },
  type: {
    // s09: Geist Pixel for the machine, Pretendard for you. Pixel Circle is the dot-matrix print (s11).
    // His voices (2026-10-24): Pretendard the main face; Fairfax HD the secondary; Geist Pixel Circle "what the pickle prints
    // and what the characters speak with"; Geist Pixel "the machine written language" and the counts; Geist Mono for code.
    family: { head: "'Pretendard', ui-sans-serif, system-ui, sans-serif", second: "'Fairfax HD', 'Pretendard', sans-serif",
      dot: "'Geist Pixel Circle', 'Geist Pixel Square', monospace", pixel: "'Geist Pixel Square', 'Geist Mono Variable', monospace",
      mono: "'Geist Mono Variable', ui-monospace, monospace" },
    // 4 levels for each voice, on slides (px, weight, tracking em, leading). Screens use the same weights and tracking at the
    // text scale. "standardize the boldness and the spacing between each one with all the four levels for each one".
    levels: {
      head:   { 1: [61, 700, -0.045, 1.04], 2: [31, 500, -0.02, 1.3], 3: [25, 400, -0.01, 1.45], 4: [20, 400, 0, 1.45] },
      second: { 1: [49, 400, 0, 1.1], 2: [31, 400, 0, 1.3], 3: [25, 400, 0, 1.4], 4: [20, 400, 0, 1.4] },
      dot:    { 1: [61, 400, 0, 1.15], 2: [39, 400, 0, 1.25], 3: [25, 400, 0, 1.35], 4: [20, 400, 0, 1.35] },
      pixel:  { 1: [149, 400, -0.02, 0.95], 2: [61, 400, 0, 1.05], 3: [25, 400, 0, 1.3], 4: [20, 400, 0.01, 1.3] },
    },
    size: { micro: 11, small: 13, body: 16, lead: 20, title: 25, heading: 31, display: 39, hero: 49, giant: 61 },
    deck: { kicker: 20, caption: 25, body: 31, lead: 39, title: 61, hero: 95, giant: 149 },          // the same major third, on the 1920 canvas
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    tracking: { giant: '-0.05em', display: '-0.045em', title: '-0.03em', body: '-0.01em', mono: '0em' },
    leading: { tight: 1.05, snug: 1.25, body: 1.5 },
  },
  space: { 0: 0, 0.5: 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80 },
  // Radii nest: a shape inside another sits concentric, inner = outer − the gap between them, snapped down to this scale.
  // The chain band 36 → tray 28 → card 18 → control 12 → chip 8 → hair 4 → pixel 2 steps by the standard gaps (8, 10, 6, 4, 4, 2).
  radius: { none: 0, pixel: 2, hair: 4, chip: 8, control: 12, card: 18, tray: 28, band: 36, round: 9999 },
  // Every UI element's padding, gap and radius, so nothing is chosen by eye twice. px, on the 4 px grid.
  component: {
    band:    { radius: 'band', padX: 40, padY: 32, gap: 12, note: 'deep felt band: chapters, the title card' },
    tray:    { radius: 'tray', pad: 24, gap: 16, inset: 10, note: 'felt tray: holds cards; a card tucked in it sits 10 px from the edge' },
    card:    { radius: 'card', pad: 24, gap: 12, note: 'metal plane: one idea per card' },
    control: { radius: 'control', height: 40, padX: 16, gap: 8, note: 'buttons, inputs, the toggle' },
    chip:    { radius: 'chip', height: 28, padX: 10, gap: 6, note: 'status tags, keys' },
    segment: { radius: 'pixel', width: 15, height: 8, gap: 3, note: 'meter segments (s08)' },
    icon:    { grid: 9, px: 2, note: 'pixel icons: a 9 × 9 grid, 2 px a pixel (18 px), 3 px on slides' },
    deck:    { width: 1920, height: 1080, margin: 96, gutter: 32, columns: 12, scale: 1.6, note: 'the pitch deck canvas; every element keeps its chain × 1.6 on a slide' },
  },
  usage: { ground: 0.6, felt: 0.3, accent: 0.1, note: '60 · 30 · 10: silver ground and metal, forest felt, then the cast and the accents' },
  layer: { stage: 0, desktop: 1, ring: 10, cast: 20, ui: 30, bubble: 40, toast: 50 },
}

// ---- colour math (OKLCH ⇄ sRGB) -------------------------------------------------------------------------------
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)
function hexToOklch(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => toLin(parseInt(hex.slice(i, i + 2), 16) / 255))
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  let H = (Math.atan2(B, A) * 180) / Math.PI; if (H < 0) H += 360
  return [L, Math.hypot(A, B), H]
}
function oklchToRgb([L, C, H]) {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
}
const inGamut = (rgb) => rgb.every((c) => c >= -0.0005 && c <= 1.0005)
function clampToGamut([L, C, H]) { let c = C; while (c > 0 && !inGamut(oklchToRgb([L, c, H]))) c -= 0.002; return [L, Math.max(0, c), H] }
const hexOf = (lch) => '#' + oklchToRgb(lch).map((c) => Math.round(Math.min(1, Math.max(0, toGam(Math.min(1, Math.max(0, c))))) * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
const css = ([L, C, H]) => `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`

function ramp(spec) {
  const out = {}
  STEPS.forEach((step, i) => {
    const t = i / (STEPS.length - 1)
    const H = spec.hueLight + (spec.hueDark - spec.hueLight) * t
    const bell = Math.sin(Math.PI * Math.min(1, Math.max(0, t <= spec.peak ? (t / spec.peak) * 0.5 : 0.5 + ((t - spec.peak) / (1 - spec.peak)) * 0.5)))
    let lch = [L_AT[step], spec.chroma * (0.12 + 0.88 * bell), H]
    if (spec.anchors[step]) lch = hexToOklch(spec.anchors[step])
    lch = clampToGamut(lch)
    out[step] = { oklch: css(lch), hex: spec.anchors[step] ?? hexOf(lch), lch: lch.map((v) => +v.toFixed(4)) }
  })
  return out
}

const palettes = Object.fromEntries(Object.entries(SOURCE.palettes).map(([name, spec]) => [name, { note: spec.note, steps: ramp(spec) }]))
const fixed = Object.fromEntries(Object.entries(SOURCE.fixed).map(([k, hex]) => { const lch = hexToOklch(hex); return [k, { oklch: css(lch), hex, lch: lch.map((v) => +v.toFixed(4)) }] }))
const ref = (r) => { if (fixed[r]) return { fam: r, step: null, ...fixed[r] }; const [fam, step] = r.split('-'); return { fam, step, ...palettes[fam].steps[step] } }

// ---- outputs ------------------------------------------------------------------------------------------------------
const out = path.resolve(import.meta.dirname, '..', 'src', 'tokens', 'generated')
fs.mkdirSync(out, { recursive: true })
const kebab = (s) => String(s).replace(/\./g, '_')

const vars = []
for (const [fam, p] of Object.entries(palettes)) for (const [step, v] of Object.entries(p.steps)) vars.push(`  --${fam}-${step}: ${v.oklch};`)
for (const [k, v] of Object.entries(fixed)) vars.push(`  --${k}: ${v.oklch};`)
for (const [role, r] of Object.entries(SOURCE.semantic)) vars.push(`  --${role}: var(--${r});`)
for (const [k, v] of Object.entries(SOURCE.type.size)) vars.push(`  --text-${k}: ${v}px;`)
for (const [k, v] of Object.entries(SOURCE.type.tracking)) vars.push(`  --tracking-${k}: ${v};`)
for (const [k, v] of Object.entries(SOURCE.type.leading)) vars.push(`  --leading-${k}: ${v};`)
for (const [k, v] of Object.entries(SOURCE.type.family)) vars.push(`  --font-${k}: ${v};`)
for (const [k, v] of Object.entries(SOURCE.space)) vars.push(`  --space-${kebab(k)}: ${v}px;`)
for (const [k, v] of Object.entries(SOURCE.radius)) vars.push(`  --radius-${k}: ${v}px;`)
for (const [k, v] of Object.entries(SOURCE.layer)) vars.push(`  --layer-${k}: ${v};`)
for (const [k, v] of Object.entries(SOURCE.type.deck)) vars.push(`  --deck-${k}: ${v}px;`)
// the 4 levels of each voice as ready font shorthands: font: var(--t-head-1); letter-spacing: var(--t-head-1-track)
for (const [face, lv] of Object.entries(SOURCE.type.levels)) for (const [n, [size, weight, track, lead]] of Object.entries(lv)) {
  vars.push(`  --t-${face}-${n}: ${weight} ${size}px/${lead} var(--font-${face});`)
  vars.push(`  --t-${face}-${n}-track: ${track}em;`)
}
for (const [comp, spec] of Object.entries(SOURCE.component)) for (const [k, v] of Object.entries(spec)) {
  if (k === 'note') continue
  vars.push(`  --${comp}-${k}: ${k === 'radius' ? `var(--radius-${v})` : typeof v === 'number' ? `${v}px` : v};`)
}
for (const [k, v] of Object.entries(SOURCE.motion.ms)) vars.push(`  --duration-${k}: ${v}ms;`)
for (const [k, v] of Object.entries(SOURCE.motion.ease)) vars.push(`  --ease-${k}: ${v};`)
vars.push(`  --light-key-angle: ${SOURCE.light.keyAngle}deg;`)
fs.writeFileSync(path.join(out, 'tokens.css'), `/* GENERATED by tools/tokens.mjs. Do not edit; edit SOURCE there. */\n:root {\n${vars.join('\n')}\n}\n`)

const tw = []
for (const [fam, p] of Object.entries(palettes)) for (const [step, v] of Object.entries(p.steps)) tw.push(`  --color-${fam}-${step}: ${v.oklch};`)
for (const [k, v] of Object.entries(fixed)) tw.push(`  --color-${k}: ${v.oklch};`)
for (const [role, r] of Object.entries(SOURCE.semantic)) tw.push(`  --color-${role}: var(--color-${r});`)
for (const [k, v] of Object.entries(SOURCE.type.family)) tw.push(`  --font-${k}: ${v};`)
for (const [k, v] of Object.entries(SOURCE.type.size)) tw.push(`  --text-${k}: ${v}px;`)
for (const [k, v] of Object.entries(SOURCE.radius)) tw.push(`  --radius-${k}: ${v}px;`)
for (const [k, v] of Object.entries(SOURCE.motion.ease)) tw.push(`  --ease-${k}: ${v};`)
fs.writeFileSync(path.join(out, 'tailwind.css'), `/* GENERATED by tools/tokens.mjs. Tailwind v4: @import this after "tailwindcss". */\n@theme {\n${tw.join('\n')}\n}\n`)

const semantic = Object.fromEntries(Object.entries(SOURCE.semantic).map(([role, r]) => [role, { ref: r, oklch: ref(r).oklch, hex: ref(r).hex }]))
const ts = { palettes, fixed, semantic, component: SOURCE.component, usage: SOURCE.usage, material: SOURCE.material, light: SOURCE.light, motion: SOURCE.motion, type: SOURCE.type, space: SOURCE.space, radius: SOURCE.radius, layer: SOURCE.layer }
fs.writeFileSync(path.join(out, 'tokens.ts'), `/* GENERATED by tools/tokens.mjs. Do not edit; edit SOURCE there. */\nexport const tokens = ${JSON.stringify(ts, null, 2)} as const\nexport type Role = keyof typeof tokens.semantic\nexport type Palette = keyof typeof tokens.palettes\n/** A semantic role as a CSS variable, e.g. role('surface-plane') → 'var(--surface-plane)'. */\nexport const role = (r: Role) => \`var(--\${r})\`\n`)

const dtcg = { color: {}, semantic: {} }
for (const [fam, p] of Object.entries(palettes)) { dtcg.color[fam] = {}; for (const [step, v] of Object.entries(p.steps)) dtcg.color[fam][step] = { $type: 'color', $value: v.oklch, $extensions: { hex: v.hex } } }
dtcg.fixed = Object.fromEntries(Object.entries(fixed).map(([k, v]) => [k, { $type: 'color', $value: v.oklch, $extensions: { hex: v.hex } }]))
for (const [role, r] of Object.entries(SOURCE.semantic)) dtcg.semantic[role] = { $type: 'color', $value: fixed[r] ? `{fixed.${r}}` : `{color.${r.replace('-', '.')}}` }
dtcg.duration = Object.fromEntries(Object.entries(SOURCE.motion.ms).map(([k, v]) => [k, { $type: 'duration', $value: `${v}ms` }]))
dtcg.cubicBezier = Object.fromEntries(Object.entries(SOURCE.motion.ease).map(([k, v]) => [k, { $type: 'cubicBezier', $value: v.slice(v.indexOf('(') + 1).match(/-?[\d.]+/g).map(Number) }]))
dtcg.dimension = { space: Object.fromEntries(Object.entries(SOURCE.space).map(([k, v]) => [k, { $type: 'dimension', $value: `${v}px` }])), radius: Object.fromEntries(Object.entries(SOURCE.radius).map(([k, v]) => [k, { $type: 'dimension', $value: `${v}px` }])) }
fs.writeFileSync(path.join(out, 'tokens.json'), JSON.stringify(dtcg, null, 2))

console.log(`tokens: ${Object.keys(palettes).length} palettes × ${STEPS.length} steps, ${Object.keys(SOURCE.semantic).length} roles → src/tokens/generated/{tokens.ts, tokens.css, tailwind.css, tokens.json}`)
for (const [fam, p] of Object.entries(palettes)) console.log(fam.padEnd(7), STEPS.map((s) => p.steps[s].hex).join(' '))
