# For whoever polishes the pitch deck: start here

You're helping finish **pickje's** final presentation for Cal Hacks 13.0. Everything you need to make it look right and
say true things is in this repo: the brand system, the brand book, the live notepads, the product docs and the design
log. Johnny makes the calls; this file tells you where everything is and what's still his to decide.

> **pickje sees what you mean.** Pickle rides your cursor and keeps the context; Blicky sketches and talks.

**Deadline:** Devpost submission by **Sun Oct 25, 9:00 AM PST** (a hard deadline), with a demo video (`docs/EVENT.md`).

## 1. Run it

```bash
git pull
npm install
npm run dev                 # http://127.0.0.1:5320
```

| URL | What |
|---|---|
| `/?deck=pitch` | **The presentation you're polishing.** 11 slides, wired from the draft outline. Source: `deck/src/pitch/` |
| `/` | The brand book: 58 pages of live code, every rule shown. ← → to page, G for the grid |
| `/?notepads` | **New:** the two final notepads, live (Pickle's notepad, and Blicky's scratchpad with `?notepads=blicky`). Replay them, tune them with the dials, screenshot them for slides |
| `/?lab` | The materials lab (metal, felt, moss) |

`npm run pdf` writes the slides to a PDF (`DECK=pitch npm run pdf` for the presentation, with `npm run dev` running).

## 2. The story and the facts

- **The draft story:** `deck/pitch/OUTLINE-draft1.md`. Eleven slides: title, problem, meet Pickle and Blicky, shake to wake, the magic moment, the demo, your north star, how it works, it works, why it matters, close. Every line in it is one of three things: his words, a fact with its proof, or a draft clearly marked. Keep it that way.
- **What pickje is, in full:** `docs/PRODUCT.md` (the product README).
  - Pickle is the context brain: it knows which project this is, keeps each project's memory, and speaks first.
  - Blicky is the tutor on the screen: it flies to the spot, draws on your actual document, and talks you through one step at a time. It never gives away a result you haven't reached.
  - Nothing opens in a chat window.
- **Numbers you can use** (each has its source; quote them with their caveat):

| Number | What it measures | Caveat | Source |
|---|---|---|---|
| 52% | Rubric criteria met on the first full live exam | Not a clean number: that run had demo examples in its prompts. The pass bar is 80% over two runs | `docs/PRODUCT.md:27-29` |
| 0 | Answers given away early | | `docs/PRODUCT.md:28` |
| 20/21 | Chemistry criteria | | `docs/PRODUCT.md:28` |
| 16/16 | Reveal criteria | | `docs/PRODUCT.md:50` |
| 16/16 | Routed to the right project | | `docs/PRODUCT.md:70` |
| 6 ms | From Pickle's write to the card updating (Convex) | | `docs/PRODUCT.md:79` |
| 15/18 | Found in the top 3 on a staged question set (Elastic) | Staged data | `docs/PRODUCT.md:87` |

- More detail is in `docs/STATUS.md` and `docs/EVALS.md`. Don't round, and don't drop a caveat.
- **Sponsor tracks**, what each asks for, and the risk if we skip it: `docs/SPONSORS.md` (Factory, Cartesia, Moss, Convex, Elastic, Mana, and more).
- **The spec**, with his words verbatim: `docs/SPEC.md`. His product vocabulary: `docs/VERBS.md`.

## 3. The demo, beat by beat (where the visuals come from)

These are the beats as the specs and code have them. `docs/frontend-plan/index.html` has the clickable version (open it with `npm run dev` running, at `/docs/frontend-plan/index.html`).

| Beat | What happens | Visual you can show |
|---|---|---|
| Shake to wake | Pickle pops up at the cursor and listens | the cast, `design/src/cast/` |
| Circle and ask | He circles a molecule and asks out loud | |
| Blicky teaches | Blicky flies, draws rings, labels and structures; the voice waits for each mark | |
| "Completed" | Blicky's scratchpad saves the idea, the sources it drew on, and the diagrams | `/?notepads=blicky` |
| Click Blicky | Pickle's notepad: north star, last stop (hover shows the screen and what was said), next step, a tab per project | `/?notepads` |
| Switch projects, close and recap | A blue tab opens another project's plan; the close writes a new last stop and next step | `/?notepads` |

Ready-made images: `docs/frontend-plan/img/` (both pads finished, Blicky while writing, the hover preview) and `docs/frontend-plan/art/reference/` (the open sequence frame by frame).

## 4. The look: the brand rules

The short version of `design/BRAND.md` (read it, it's short) and his calls from today (`docs/spec/design-02-blicky-states.md`):

- **Materials:** metal, felt, moss, on `<Surface>` (`design/src/material/`). Glass plastic (light blue, from his Cofounder reference) is **for small parts only**: page numbers, tabs, small buttons.
- **Type:**
  - **Pretendard** for headings and UI.
  - **Fairfax HD** for the written, handwritten-feeling words.
  - **Geist Pixel** for counts, labels and the machine's voice.
- **Colour:** "one made header color and then maybe one thing to be green. Other than that, everything else should be pretty neutral." Pickle's colour is forest green; Blicky's is sky blue.
- **Never:** blur shadows (shadows are lines and grain), beige, light grey text, rainbow colours.
- **His inspiration:** `docs/refs/2026-10-24/00-refs-mapped.png` shows each reference beside his words: Cofounder's double-bezel cards, pixel grass, the pastel pills, the light blue glass.
- **Tokens:** every value comes from `design/tools/tokens.mjs`. Change a value there, then run `npm run tokens`; don't hardcode a hex.
- **Code rules:** `design/STYLE.md` (11 rules). DialKit (the dials, bottom right) on every page; the dials hide in print.

The building blocks for slides:
- UI kit: `design/src/ui/kit/` (Card, Tray, Band, Button, Tag, Stat, Meter, Bars, Flow…).
- The notepads as components: `design/src/ui/product/NotesPad.tsx`. You can put a live notepad on a slide.
- The cast: `<Pickle pose look>` and `<Blicky pose look>`, plus their everyday states (`design/src/cast/Live.tsx`).

## 5. Calls that are Johnny's (ask him, don't decide)

From the outline (`deck/pitch/OUTLINE-draft1.md`, "Calls that are his"):
1. The problem number.
2. A live demo or the clip on slide 6.
3. Which three numbers go on slide 9.
4. Which tracks to name on slide 10.
5. The slide count and length: 11 slides, about 3 minutes, is a draft.

Also open:
- **The logo** isn't picked yet (6 directions explored).
- **Changing a brand rule** (a new colour, a new material) is his call.

## 6. Questions you might have

- **Is the product real?** Yes: a native Mac app plus a local service. It isn't in this repo; it lives in Johnny's pickje repo on his Mac. This repo has the design system, the deck and copies of the docs. For anything about the app's code, ask Johnny.
- **What's staged and what's live?** The notepads here show three made-up projects (every word written as "test"): an o-chem worksheet, a desk lamp in Fusion 360, and a critique of an app's onboarding. In the product, they're fed live. Elastic and Mana use staged data only. Say "staged" on a slide wherever it applies.
- **Can I quote Johnny?** Yes, verbatim, from `docs/SPEC.md` and `docs/spec/design-0*.md`. Don't paraphrase a quote; typos stay as he typed them, or leave the quote out.
- **Fonts and image credits:** `CREDITS.md` (the fonts are OFL; the textures are CC0).
- **Where's the history of a design decision?**
  - `docs/spec/design-01-branding-and-motion.md`: the brand.
  - `docs/spec/design-02-blicky-states.md`: the cast states, the notepads, metal and glass, and the plan for the app.
  - Both are in his words, in order.
- **What's `docs/frontend-plan/`?** The plan for putting the two notepads into the Mac app (a SwiftUI port), with today's surfaces, the tokens, the live data and the demo beats. `HANDOFF-PROMPT.md` there is the brief for that port. It's context for you, not your task.
- **Something is wrong or missing?** Tell Johnny. Don't fill a gap with a guess on a slide.
