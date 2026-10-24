import { tokens } from './generated/tokens'

const s = tokens.semantic
/** Colour roles as hex, for canvas and SVG code that can't read CSS variables. Generated values; edit tools/tokens.mjs. */
export const color = {
  ink: s.ink.hex, paper: s['surface-ground'].hex, paperShade: s['surface-sunken'].hex, plane: s['surface-plane'].hex,
  pickle: s.pickle.hex, brine: s['pickle-stripe'].hex, sky: s.blicky.hex, skyDeep: tokens.palettes.sky.steps['500'].hex,
  spark: s.attention.hex, cheek: s.cheek.hex, moss: s.moss.hex, checked: s.checked.hex, stuck: s.stuck.hex,
  risoGreen: tokens.palettes.moss.steps['600'].hex, risoBlue: tokens.palettes.sky.steps['800'].hex, glassDark: tokens.palettes.sky.steps['900'].hex,
} as const
export type ColorRole = keyof typeof color
