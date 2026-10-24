# CLAUDE.md · how to work in pickle-deck

You are helping build pickje's final presentation (Cal Hacks 13.0). The brand system is finished and approved; your job
is to make slides with it, not to restyle it.

## Read first, in order
1. `design/BRAND.md`: the brand in one page.
2. `README.md`: running it, the map, how to add a slide.
3. The brand book itself (`npm run dev`, then `/`). Pages 50–55 cover building a deck: templates, banners, anatomy, code.
4. `deck/pitch/OUTLINE-draft1.md`: the draft story.
5. `docs/spec/design-01-branding-and-motion.md`: his words on every design call, if a choice is unclear.

## Rules
- **Import, don't restyle.** Use `@design/ui/kit`, `@design/material/Surface` and `@design/cast/Cast`. Colours come from
  roles (`var(--surface-felt)`, `var(--catch)`), type from `--t-{head|second|dot|pixel}-{1–4}`, and sizes from
  `tokens.component` × `tokens.component.deck.scale` (1.6) on slides. If something is missing, add it to
  `design/tools/tokens.mjs` and run `npm run tokens`.
- **Every slide:** `<Page title>` with a short sentence that has a verb and uses numerals, then one hero (the real
  rendered thing), then at most a line or 3 short rules. Nothing above the title. Captions only when they add something.
- **The 4 voices:**
  - Pretendard: people.
  - Fairfax HD: second voice, sentences only.
  - Geist Pixel Circle: what the cast says and prints (`<Say>`, `<Printed>`).
  - Geist Pixel: the machine and every count (`<Stat>`, times).
- **Colour:** silver ground and forest felt lead; sky felt now and then; sage is near-invisible texture. Cast colours
  are for bodies only. Each signal has 1 job: amber is the catch, red is stuck.
- **Never the 21** (BRAND.md §13): no stripes, borders round blocks, badges, monospace labels, emoji, placeholders,
  glass, glow, purple gradients, light-grey text, entrance animations, noun-list titles, numbers as words, or proof
  nobody can check.
- **Numbers carry their source.** Cite `docs/STATUS.md` or `docs/SPEC.md` IDs (C4, M3…). Don't invent metrics, logos,
  quotes or testimonials. Quote his words exactly, typos and all.
- **The cast is drawn once.** Use `<Pickle pose look>` and `<Blicky pose look>`. Never redraw them. There is no pixel mark.
- **Motion has a reason:** steps for the machine, springs for the living. Nothing animates in; 1 moving thing a slide.

## Check your work
- Run `npm run typecheck`.
- Open the slide in `npm run dev` (`?deck=pitch`), look at it, and check it against the 21.
- Run `npm run pdf` (`DECK=pitch` for the presentation) when a pass is done.
