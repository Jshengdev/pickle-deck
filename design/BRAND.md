# pickje · brand guideline and design system

Version 2, 24 October 2026. Draft for his approval.
- **The book:** `pickje/deck`, 58 pages of live code. Run `npm run dev` there, then open http://127.0.0.1:5320.
- **The materials lab:** the same app at `?lab`.
- **Values:** `tools/tokens.mjs`.
- **The kit:** `src/ui/kit`.
- **The cast:** `src/cast`.
- **His words:** `docs/spec/design-01-branding-and-motion.md`.

## 1 · The idea

**pickje sees what you mean.** Every page is clean, tactile and alive.

The look is silver and dark green, felt with metal, and moss as the living element. It's in UG's restraint: one object on
one seamless colour, lit like a product, with quiet type.

From his 12 picks we keep 4 things:
- the waving die-cut sticker (s01)
- the traced outline of the cast (s02)
- silver on dark green
- moss that's alive

No pixel mark ("It was really just used for inspiration").

## 2 · Hierarchy

Every page is the title, then the hero. A line under the title appears only when it adds something. Captions are rare
("No unnecessary caption text is needed").

The title is a short sentence with a verb, with numerals, not words. Nothing sits above a title.

## 3 · The logo (his pick pending)

6 directions, all from the drawn cast (`<Logo kind=…>`):
1. Standing on moss
2. Pickle peeking over Blicky
3. The waving sticker
4. Grown in moss
5. Traced in one line
6. The felt patch

The wordmark is "pickje" in Pretendard 800, tight. The sticker goes everywhere: on cards, slides and laptops, as drawn,
tilted a little.

## 4 · Colour

There are 4 groups. Code uses roles, never hex.

| Group | Roles |
|---|---|
| Surfaces and textures | `--surface-ground` silver · metal · `--surface-felt` **forest, the main felt** · `--surface-felt-sky` · `--surface-felt-sage` (an almost invisible texture) · `--surface-night` |
| Text | `--ink` · `--text-secondary` (body, 8.7:1) · `--text-muted` (captions, 5.9:1) · `--text-on-dark` |
| The cast | `--pickle` #C4DC2E · `--pickle-stripe` · `--blicky` #63ADF7 · `--cheek` |
| Signals | spark (the burst) · amber `--catch` (the catch) · stop red `--stuck` (stuck) · `--checked` (matched) · `--focus` |

**Balance:** 60 silver, 30 forest, 10 for the cast and signals.

## 5 · Type: 4 voices, 4 levels each

| Voice | Face | For |
|---|---|---|
| People | Pretendard | Titles, sentences, buttons, labels, inputs |
| Second | Fairfax HD | Ledes, notes, the quiet line under a title |
| The cast | Geist Pixel Circle | What Pickle prints, what the cast says (`<Say>`, `<Printed>`) |
| The machine | Geist Pixel | The machine's words, and **every count** (`<Stat>`, times, meters) |

Levels on slides (size · weight), set as `--t-{voice}-{1–4}`:

| Voice | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| head | 61 · 700 | 31 · 500 | 25 · 400 | 20 · 400 |
| second | 49 | 31 | 25 | 20 |
| dot | 61 | 39 | 25 | 20 |
| pixel | 149 | 61 | 25 | 20 |

**Fairfax HD and sign #6:** Fairfax HD is a fixed-width face, so it carries sentences and notes, never a label, a button or an input.

**The print:** dots are worn on purpose. `<Printed wear>` mixes the dot face with the 08.3 ladder's "reduced" rung.

## 6 · Space and radius

The grid is 4 px. Corners nest along the chain: band 36 → tray 28 → card 18 → control 12 → chip 8 → hair 4 → pixel 2
(inner = outer − gap).

| Element | Padding | Gap | Height |
|---|---|---|---|
| Card | 24 | 12 | |
| Tray | 24 | 16 | |
| Band | 32 × 40 | | |
| Control | | | 40 |
| Chip | | | 28 |

Slides use 12 columns, margin 96 and gutter 32, with everything × 1.6.

## 7 · Materials

**Metal**
- Brushed and more contrasty (`contrast` 1.35).
- It takes many forms: a plane, coin, pill, ring, pebble or letters (`shape`, `dome`).

**Felt**
- Forest is the main felt, sky a second, sage almost invisible.
- Fibres spill over the edge, and it cuts into shapes.

**Moss**
- Life green, with shade shifting the hue greener instead of darker.
- The undertone shows where it's sparse.
- Pink, blue and white flowers grow in patches.
- It wraps any shape: a ring, the cast's silhouettes, the word.

**Light and lanes**
- One light, from the upper left, and 4 heights.
- No stripe, glass, glow, moss under words, or light from 2 sides.

**The lab** (`?lab`): pick a material, form, colour and light; stack a second layer; see it in every form; keep presets.

## 8 · The cast

Import it, never redraw it (`<Pickle pose look>`, `<Blicky pose look>`).

| | |
|---|---|
| Poses | wave, listen, point (shows you), cheer (got it), dazed (just woke), asleep, and sketch with a pencil (Blicky) |
| Looks | drawn (in the product), sticker (stuck on things), traced (banners and backgrounds) |
| Speech | the dot face |

Banners (`<Banner seed felt>`) are the traced cast, a felt piece and a hand-drawn mark, varied by seed and kept clear of
the title side.

## 9 · Motion

| Timing | ms | Use |
|---|---|---|
| dot | 40 | fill, print |
| hitStop | 90 | an impact |
| drain | 80 | empty |
| swap | 220 | a card swap |

Steps for the machine, springs for the living. Nothing animates in, and only one thing moves on a slide.

## 10 · UI elements and UX patterns

**The card**
- The title is the state.
- The line under it is his words in Fairfax HD.
- The foot holds the meter and the time in Geist Pixel.
- The active card lifts.

**Trays and bands:** trays hold cards; bands open chapters.

**Small things** are flat colour.

**UX patterns**
- It rides the cursor and opens small at the bottom right.
- Wake with a shake; sleep with ⌃⌥⌘P.
- State is said in words.
- Amber means a catch.

## 11 · Data and diagrams

`<Bars>` and `<Flow>` follow the same rules:
- Real numbers, each with its source under it.
- Numerals in Geist Pixel; labels in text colours.
- 1 series and 1 hue, no legend; a hover shows the note.

Examples in the book:
- STATUS piece counts
- screen-reading speeds (SPEC M3, M4; STATUS C4, C5)
- the magic moment, step by step (C2, C6, C4, C7, C8)

## 12 · Building a deck

There are 5 templates: Title (forest), Chapter (banner), Content, Numbers and Moment. Import `@design`; don't restyle it.
The tools are the lab (`?lab`), banners by seed, the charts, and `npm run pdf`.

## 13 · The 21 things we never do

1. Stripes on cards
2. Borders around every block
3. Coloured italics
4. Labels above headings
5. Badges that mean nothing
6. Monospace labels and inputs
7. Numbers written as words
8. Noun-list titles
9. Emoji icons
10. Placeholders
11. Overstuffed screens
12. Labelled metaphors
13. Text demos
14. Glass
15. The same radius and shadow everywhere
16. Light grey text
17. Pointless motion
18. Entrance animations
19. Purple gradients
20. Glow and neon on dark
21. Proof nobody can check

What we do instead is on the last 2 pages of the book.
