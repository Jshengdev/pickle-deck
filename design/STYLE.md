# How pickje code is styled

The brand guideline (the why and the how) is `BRAND.md`; this page is the short version for code.

The tokens live in one source, `design/tools/tokens.mjs`. Run `node tools/tokens.mjs` and it writes `src/tokens/generated/`:

| File | Use it when |
|---|---|
| `tokens.css` | any web code: `@import` it once, then use `var(--surface-plane)` and the other variables |
| `tailwind.css` | Tailwind v4: `@import "tailwindcss"; @import "./tokens/generated/tailwind.css";` then `bg-surface-plane`, `text-ink`, `rounded-plane` |
| `tokens.ts` | TypeScript: `import { tokens, role } from '…/tokens'`; `role('pickle')` gives `var(--pickle)`; canvas and SVG code reads `.hex` |
| `tokens.json` | Swift, Figma or anything else: W3C DTCG, OKLCH values with a hex fallback under `$extensions.hex` |

## The rules
1. **Use roles, never palette steps or raw hex.** Write `--surface-plane`, `--ink`, `--pickle` or `--attention`, not
   `--silver-100` or `#E9EAEE`. If a role is missing, add it to `SOURCE.semantic` and regenerate.
2. **Pickle and Blicky are body colours, never text** on a light ground. Text is `--ink`, `--text-secondary` or
   `--text-muted`.
3. **Accents each have one job (s07, s08).** `--attention` (spark yellow) is the burst and the odd word. `--catch` (amber)
   is the catch only: the wall catching a mismatch. `--stuck` (stop red) means stuck, and nothing else. `--cheek` is a
   face, never an error. One live accent per surface.
4. **Softness is grain, not blur.** No `filter: blur()`, no `backdrop-filter`, no big `box-shadow`. Shadows, glows and
   soft edges are particles dispersing (`GrainField`, `material.elevation` 1–4). The one exception is a hairline contact
   shadow (≤ 1 px).
5. **No paper, no beige.** The one neutral is silver (metal, chrome, concrete). The ground is `--surface-ground`; things
   sit on it in three materials, each coloured by a role (`<Surface material=…>` in `src/material/Surface.tsx`):
   **metal** for cards, planes and objects (any `shape`), coloured **felt** (forest first) for trays, wells and bands,
   **moss** where something is alive (it can wrap any shape). No plastic. Small things (buttons, chips, keys, toggles, meters) are flat token colour. A texture never brings
   its own colour. Light comes from the upper left (`light.keyAngle` 225°): highlights top-left, shade bottom-right.
6. **Motion goes through the engine.** Durations come from `--duration-*` and `tokens.motion.ms`. Eases come from
   `--ease-*` or the GSAP named eases. Anything alive (eyes, follow, tilt) uses `tokens.motion.spring`. Nothing moves
   without one of the animation principles: anticipation, follow-through, slow in and slow out, arcs, squash and stretch.
7. **Type, 4 voices:** Pretendard for people (titles, sentences, labels, buttons, inputs); Fairfax HD for the second
   voice (ledes, notes, never a label or input); Geist Pixel Circle for what the cast says and Pickle prints; Geist Pixel
   for the machine's words and every count. Levels come from `--t-{voice}-{1–4}`. No label above a title, no all-caps,
   no italics, numerals not words, captions only when they add something.
8. **Space comes from `--space-*`** (a 4 px base). **Radii nest** on the chain band 36 → tray 28 → card 18 → control 12 →
   chip 8 → hair 4 → pixel 2 (inner = outer − gap). Every element's padding, gap and height is in `tokens.component`; use
   the kit (`src/ui/kit`) rather than restyling. On slides, the same chain × 1.6.
9. **Layers come from `--layer-*`**: stage, desktop, ring, cast, ui, bubble, toast.
10. **The cast is the approved drawing**: import `Pickle` / `Blicky` from `src/cast/Cast.tsx` with a `pose` and a `look`
    (drawn, sticker, traced). Never redraw it inside a feature. No pixel mark.
