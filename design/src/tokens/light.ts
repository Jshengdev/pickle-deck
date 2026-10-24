/** Light tokens for 2.5D: one key light from the upper left, soft. Surfaces read these to place highlights, shadows and
    rim light with CSS, so every card is lit from the same window. */
export const light = {
  keyAngle: 225,          // degrees, upper left
  keySoftness: 0.6,       // 0 hard to 1 very soft
  ambient: 0.35,          // how much the shade side still sees
  rim: 0.25,              // edge light on the far side
  warmth: 0.15,           // 0 neutral to 1 warm lamp
  shadow: {
    contact: '0 1px 1px rgba(18,18,18,.18)',
    near: '0 6px 14px -6px rgba(18,18,18,.28)',
    far: '0 26px 48px -26px rgba(30,24,10,.45)',
  },
} as const
