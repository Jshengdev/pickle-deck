# pickle-deck

The final presentation for **pickje**, built at Cal Hacks 13.0 (October 2026). It runs on the pickje brand system, and
everything you need to make beautiful, on-brand slides is in this repo:
- the design tokens
- the materials: metal, felt, moss
- the cast, Pickle and Blicky
- the UI kit and the charts
- the 58-page brand book that shows how it all fits
- a materials lab to experiment in

> **pickje sees what you mean.** Pickle rides your cursor and keeps the context; Blicky sketches and talks.

## Run it

```bash
npm install
npm run dev          # http://127.0.0.1:5320
```

| URL | What |
|---|---|
| `/` | **The brand book.** 58 pages, every one live code. ← → to page, G for the grid. |
| `/?deck=pitch` | **The final presentation.** It starts as a wireframe of the draft outline. This is where we build. |
| `/?lab` | **The materials lab.** Material × form × colour × light; stack 2 layers; keep presets. |

| Command | What |
|---|---|
| `npm run pdf` | Writes every slide to `deck/exports/pickje-deck.pdf` at 1920 × 1080 (needs `npm run dev` running). `DECK=pitch npm run pdf` exports the presentation. |
| `npm run tokens` | Regenerates the tokens after you edit `design/tools/tokens.mjs`. |
| `npm run typecheck` | Checks the types. |

The dials (DialKit, bottom right) tune materials and layout live. Their starting values are in `deck/src/dials.json`, and
they hide in print.

## Where things are

```
design/
  BRAND.md              the brand guideline, short form: read this first
  STYLE.md              the 11 rules for code
  tools/tokens.mjs      the one source of every value (colour, type, space, radius, motion, materials)
  src/tokens/           generated tokens (CSS variables, TS), fonts (Geist Pixel, Fairfax HD, OFL)
  src/material/         <Surface>: metal, felt, flock, moss on one shared WebGL renderer; CC0 textures
  src/cast/             Pickle and Blicky as drawn; <Pickle pose look>, <Blicky pose look>, <Say>; PickleFace (alive)
  src/ui/kit/           Card, Tray, Band, Button, Toggle, Tag, Key, Meter, Stat, Printed, Logo, Wordmark,
                        Banner, Scribble, Bars, Flow
  src/engine/           GSAP with the brand's named eases
deck/
  src/brand/            the brand book (frame.tsx = the page frame; slides-a…d; index.tsx = the order)
  src/pitch/            THE FINAL PRESENTATION: start here
  src/lab/              the materials lab
  pitch/OUTLINE-draft1.md   the draft story (11 slides); every line is his words, a fact with proof, or a draft
docs/
  SPEC.md               the product spec, with his words verbatim
  STATUS.md             what works, with proof; slides cite numbers from here
  spec/design-01-branding-and-motion.md   every design decision in his words, in order, with build logs
  spec/design-01-refs/  his 12 picks (s01–s12): the source of the brand
```

## Making a slide

Slides build one idea per → press, and each can have its own dials: see [deck/src/pitch/README.md](deck/src/pitch/README.md).

```tsx
import { Surface } from '@design/material/Surface'
import { Card, Tray, Meter, Bars } from '@design/ui/kit'
import { Pickle, Say } from '@design/cast/Cast'
import { Page } from '../brand/frame'

export function TheMoment() {
  return (
    <Page title="It already knows what you’re looking at">
      <Tray width={1728} height={420} scale={1.6}>
        <Card width={520} height={320} scale={1.6} lifted>…</Card>
      </Tray>
    </Page>
  )
}
```

Then add it to `deck/src/pitch/index.tsx`: `{ title: 'The moment', chapter: 'Demo', render: TheMoment }`.

The 5 templates (Title, Chapter, Content, Numbers, Moment) and the banner generator are on the brand book's "Building a
deck" chapter. Copy one and change the words.

## The short version of the brand

- **Colour:** silver and forest felt lead (60 / 30); the cast and signals are the last 10. Roles, never hex.
- **Type, 4 voices:**
  - Pretendard for people
  - Fairfax HD as the second voice (sentences only)
  - Geist Pixel Circle for what the cast says and prints
  - Geist Pixel for the machine and every count
- **Materials:**
  - Metal carries content and takes any form.
  - Felt holds things.
  - Moss means alive and wraps any shape.
  - One light, from the upper left.
- **Every slide:** a title that's a short sentence with a verb, then the real thing. Captions only when they add something.
- **Every number names its source**, for example "docs/STATUS.md, C4".
- **Never** any of the 21 signs of a careless page (BRAND.md §13): stripes, borders round blocks, badges, monospace labels, placeholders, glass, glow, purple gradients, light-grey text, entrance animations, proof nobody can check, …

**Open call:** the logo. There are 6 directions on page 9 of the book; the pick is still to be made.

## Credits

See [CREDITS.md](CREDITS.md). Fonts are OFL and textures are CC0; all code was written during the hacking period.
