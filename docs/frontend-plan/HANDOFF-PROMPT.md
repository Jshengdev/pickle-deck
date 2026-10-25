# Handoff: port the two final notepads into the shell, and make the design tokens one system

You're working in `~/code/pickje`. pickje has two characters: Pickle, who lives at the cursor, and Blicky, who flies and draws. The front end is the native Mac shell in `app/shell` (SwiftPM, SwiftUI plus Core Animation). The design system lives in `design/` (Vite, React, Storybook). Two notepads were designed there and signed off as the finals. Your job is to put them in the shell, as close to the Storybook finals as possible, and to make the design system's tokens the single source the shell reads.

Follow the repo's `CLAUDE.md` (his rules: keep his words verbatim; ask by click before deciding anything he hasn't told you; screen and voice stay on this Mac; never print keys).

## 1. His decisions (verbatim, 2026-10-24, about 7:40 PM)

> "hmmm lets just tryt to prot to swiftui and try to replicate it as close as possible. yes 2 sounds good. blickets sketchs are in the pad if theres not enough reasonable space on the screen. The scratch pad is just meant to summarize ideas and save the diagrams that were drawn so if it gets too cluttered it can pull the diagrma form on the screen and save it in the scratch pad. makes it the ones ocur for the tokens ensure the branding adn starnadizeton of desing can be properly designed."

This answers the four calls on the plan page (`docs/frontend-plan/index.html`, section "Your calls"):

1. **Port to SwiftUI**, as close to the finals as possible. Don't use a web view.
2. **Keep a crop of the screen for each last stop.** Only the crop, never the full frame. It stays on this Mac, in the project folder, and is deleted with the project. Screenshots never go to Elastic (`docs/SPONSORS.md:21`).
3. **Blicky's sketches go in the pad when there isn't reasonable room on the screen.** The scratchpad summarizes ideas and saves the diagrams that were drawn. When the screen gets too cluttered, a diagram is pulled off the screen and saved into the scratchpad.
4. **Tokens:** `design/tools/tokens.mjs` is the one source for the shell too, so the branding and design are standardized everywhere.

Earlier words that shaped the finals are logged, verbatim, in `docs/spec/design-02-blicky-states.md`. Read its last sections (from "ok lets move the note pads to final" on).

## 2. Read these first

| What | Where |
|---|---|
| The plan: shell today, tokens and drift, live data, field-by-field mapping, demo beats | `docs/frontend-plan/index.html` (open it in a browser) |
| **The spec for both pads**: layout, numbers, motion | `design/src/ui/product/NotesPad.tsx` (635 lines). Treat it as the source of truth; section 4 below summarizes it |
| The open sequence (the pad rises, the character flies onto the pad) and the staged data | `design/src/stories/NotesPad.stories.tsx`: `FinalPad` at line 271; `STAGED` / `PICKLE` / `PROJECTS` at 108-128; `SCRATCH` at 244 |
| Tabs (green plan tab and blue project tabs, hover card) | `design/src/ui/product/Notepad.tsx`: `Tabs` at line 39, sizes at 32 |
| Glass plastic for small parts | `design/src/material/Glass.tsx` |
| Tokens, the single source | `design/tools/tokens.mjs` (run `node tools/tokens.mjs`; it writes `src/tokens/generated/*`) |
| Brand rules | `design/BRAND.md`, `design/STYLE.md` |
| Art the shell can't draw (transparent PNG, @2x and @3x) | `docs/frontend-plan/art/`: `binding-moss`, `binding-felt-sky`, `binding-felt-forest`, `sticker-pickle`, `sticker-blicky` (rotated 12°), plus `-flat` versions. Each has 20 pt of room on every side for fibres and grain shadow, sized for a pad 400 pt wide |
| What it must look like | `docs/frontend-plan/art/reference/*.jpg` (the open sequence, hover preview, tab hover, Blicky's glint, done) and `docs/frontend-plan/img/` |
| Live in Storybook, to compare side by side | `cd design && npx storybook dev -p 6006` → Product/Notes pad → "Final: Pickle's notepad", "Final: Blicky's scratchpad" (dials included) |
| The shell's surfaces and data | Today: `ContextCard.swift`, `LiveCard.swift`, `NotesWindow.swift`, `AppController.swift:114-121, 892-909`, `Talk.swift:391-504`. Server: `app/service/talk-server.ts:130-145` (`/watch`), `app/convex/card.ts`, `app/service/turn.ts`, `app/service/sessions.ts` |

## 3. What to build

### A. Tokens, one system (do this first)

- `tools/tokens.mjs` also writes the shell's tokens:
  - roles: `ink`, `text-secondary`, `text-muted`, `text-on-dark`, `surface-page`, `surface-ground`, `surface-night`, `line-hair`, `blicky-ink` (sky-700), `pickle-ink` (forest-700), `attention`, `checked`, and the palette steps the pads use;
  - the type scale and the four font roles;
  - radii;
  - motion ms (`dot 40`, `hitStop 90`, `drain 80`, `swap 220`, `quick 180`, `base 280`, `gentle 420`).
- Output: a generated `app/shell/tokens.json` section, or a generated Swift file. `Tokens.swift` gets a role layer, and the surfaces read roles, never hex.
- Fix the drift table on the plan page:
  - pencil lead `#3D9DC3`;
  - beige pencil wood;
  - highlight `#FFD84D` → `attention`;
  - panel `#141414` → `surface-night` / `text-on-dark`;
  - light-grey labels → `text-muted`;
  - radii onto the scale;
  - blur shadows → lines and grain;
  - type sizes onto 11, 13, 16, 20, 25, 31;
  - blink, caption and fade timings.
- Add Geist Pixel Square to `app/shell/fonts` (it's in `design/src/tokens/fonts/`).
- The dials page and `DialServer` keep working, now on roles. `tokens.json` on disk must match the code: today it's missing 5 groups.
- Done when: no hex literal is left in the two pads, the panel, the bubble or the stamp; the dials still tune live; `swift run shakecheck` passes.

### B. Pickle's notepad (replaces the context card)

- **Opens** on a click on Blicky, the same trigger as today (`AppController.swift:114-121`). It's a floating NSPanel at the bottom right of the screen.
- **Data:** `CardSnapshot` from `/watch`, plus a new `peek`:

| Field | Shows as |
|---|---|
| `northStar` | north star, at the top |
| `whereItStopped` | last stop, with "preview" on hover |
| `next` | next step, the one green thing |
| `sessions[]` | earlier stops |
| `projects[]` | a blue tab each; hover shows its next step, click opens that project |
| route chip, trust line, LIVE | small, in Geist Pixel along the bottom |
| Reset / Clear screen | two small buttons under the pad |

- **The load button** shows but is disabled, with the tooltip "load: planned, not wired yet". His words: "keep a load button on the side as a possible additional in the future we will plan it out later".
- **Done when:** a side-by-side screenshot of the shell's pad and the Storybook final, at the same width, match in layout, type, colour and motion. The open sequence matches the reference frames.

### C. Blicky's scratchpad (replaces the notes window)

- **Opens** on the `notes` command, and at a "completed" moment in a teaching turn: the final molecule, or the three-step summary.
- **Content, top to bottom:**
  - working on;
  - completed, plus its context;
  - FROM: dotted routes to each source of the content: the screen it was on, what he said, his rule (decision or memlog), a note and his reaction to it;
  - the sketches;
  - up next.
- There are no dates.
- **The clutter rule** (his words, above):
  - Blicky draws on the screen by default.
  - If there isn't reasonable room near the anchor for a diagram, it's drawn into the pad instead.
  - When the screen gets too cluttered, the oldest diagram flies off the screen into the pad and is saved there.
  - The pad keeps every diagram from the session, and it summarizes ideas, not transcripts.
  - This connects to spec 0006:593-604 (run 1: "it kept writing all over the place", and his click "Wait for my pad").
  - How you measure "reasonable room" and "too cluttered" is a choice to bring to him by click: a free-area threshold, an overlap with text or marks, a mark count.
- **While it writes**, the metal border turns to clear glass with a running catch: prismatic, never rainbow. When writing ends it's metal again.
- **Done when:** the side-by-side match, as in B; a diagram moves from the screen into the pad when clutter crosses the threshold; and the pad's sketches are the same marks that were on the screen.

### D. The data the pads need (server)

- **Keep the crop for each last stop:**
  - Today the turn's frame is deleted at turn end (`turn.ts:155-160`).
  - Keep only the region crop (the circled region or Blicky's located box), the way `card.mjs` / `turn.ts:365-388` already crop, under the project folder (e.g. `references/` or `stops/`).
  - Delete it with the project. Never upload it.
- **`/watch` carries a `peek` per project:**
  - the crop's path;
  - `where` (app and window, no date);
  - `said` (his words, from the session file or `moment.says`);
  - `reply` (Blicky's line);
  - `sessions.ts:455-467` has all of it.
- **The `project` pin keeps every field** (`AppController.swift:892-898` drops `north_star` and `where_it_stopped` today).
- **Talk.swift forwards to the scratchpad:** `notes`, the marks moved off the screen, `screen{frame_id, app, window}`, `route`, `session`. The glint runs while say and do lines are streaming. `Talk.swift` currently ignores `route`, `recall`, `bring_back`, `session` and `replay`.

## 4. The look, in numbers

Sizes are at a pad width of 400 pt: `k = width / 400`, and everything scales by k. The finals use width 390, height 680.

**Frame**
- Outer view width: `width + 44k`. The extra 44k is room for the tabs on the right.
- **Binding** (moss for Pickle, sky felt for Blicky):
  - 54k tall, from x −4k to width + 4k, radius 16k. Use the art PNG.
  - The sticker sits on it, rotated 12°: Pickle 84k tall at x = width − 70k, y = −46k; Blicky 62k at width − 64k, y = −30k.
- **Page frame:** starts at y = 54k × 0.55.
- **Metal border (bezel):**
  - R = 22k; edge = 8k.
  - The page sits inside, inset by the edge, with radius R − edge = 14k (radii stay concentric).
  - The edge is a vertical gradient: `1.0` at 0% · `.94` at 28% · `.78` at 51% · **`.42` at 53%** (the crisp horizon line) · `.62` at 58% · `.90` at 72% · `.97` at 86% · `.60` at 100%. These are OKLCH lightness, near-neutral, hue about 225, chroma 0.005-0.016; see `POLISH` at NotesPad.tsx:464.
  - Then a 1 pt white line (0.95) on its outer edge, and a 1 pt outline at `oklch(0.42 0.012 230 / .38)` outside it.
- **Page:**
  - Pickle: white paper (`surface-page`). Blicky: paper with a dot grid (silver-300 dots, 1k radius, every 16k, scrolling with the content).
  - Inner rim: 1 pt `oklch(0.4 0.012 230 / .22)`, and a 1 pt white catch along the top inside.
- **Curl:** the bottom-right corner is cut by 26k. A curl triangle sits there: a 135° gradient silver-200 → silver-50 (45%) → silver-300, with a 1 pt inset line at .25 and a 1 pt offset shadow at .18. No blur.
- **Bottom:**
  - A pixel band 42k tall: pixels round(4k), at least 3, crisp edges.
  - Each column: a solid base 3 + round(rnd × 1.2 + sin(i × 0.23 + seed) × 1.1) rows tall.
  - Above the base, pixels fade out with probability 0.5 × e^(−(row − base) / 2), some of them 2 wide.
  - Colours: moss-400/200/300 in the band, moss-200/100/300 above. Blicky uses the same ramps in sky.
  - Under it, a 66k fade from transparent to the page colour (fully the page by 55%), so words thin out and don't show through.
  - See `PixelGrass` at NotesPad.tsx:432 (`rnd` at :56).
- **Page number:** a glass chip, 14k from the page's left edge and 34k from its bottom; at least 22k × 20k, radius 7k; Geist Pixel 12k.
- **Glass** (small parts only):
  - Face: a gradient from sky-100 to sky-200 at 70%.
  - Lines: inset top 1 pt white .95; an inset rim of 1 pt sky-300 at .7; a 2 pt sky-400 lip under it at .55 (the plastic's thickness); an outer 1 pt sky-300 at .9.
  - Text: sky-700.
  - The plan tab uses a moss tint: moss-100/200, rim moss-300, lip moss-400, text moss-800.

**Type and text**
- Fonts: Pretendard (head), Fairfax HD (the written words), Geist Pixel Square (counts and labels).
- **Title:** sticky at the top, 27k bold Pretendard, tracking −0.025em, ink. The notes fade under it over 16k.
  - While writing, the title is the working title ("O-chem worksheet…"). When writing finishes it swaps to the real title, rising 6k over 220 ms.
- **Pills:** 2k × 9k padding, fully round, Pretendard 500 at 12.5k.
  - Grey: silver-100 fill, silver-300 rim, silver-800 text.
  - Green (next step): moss-50, moss-300, moss-700.
  - Blue (Blicky's "completed"): sky-50, sky-200, sky-700.
- **Colour rule** (his words): "one made header color and then maybe one thing to be green. Other than that, everything else should be pretty neutral."
- **Pickle's page:**
  - Rows sit 20k apart with a 30k gutter. Markers sit at x 9k, y 10k:
    - north star: a diamond 11k, white with a 1.5k silver-500 ring;
    - last stop: a ring 10k;
    - next step: a filled pickle-ink dot 14k, with a 2.5k white ring and a 3.5k moss-300 ring;
    - earlier stops: rings 8k in silver-300.
  - A 1.5 pt silver-300 rail runs from the last stop to the next step.
  - Text:
    - north star and last stop: Fairfax 17k, line height 1.42, text-secondary;
    - next step: 20k, pickle-ink;
    - earlier stops: 15k, text-muted;
    - day labels: Geist Pixel 12k, muted. Pickle keeps its day labels; Blicky has none.
- **Last stop hover:**
  - The row gets a silver-100 background, radius 10k. A "preview" hint shows at the right: an icon 14k and text 11.5k.
  - A card opens to the left of the pad: 290k wide, 16k from the pad, top 40k above the row; white, 12k padding, radius 16k, rim silver-200.
  - Inside, in order:
    - the crop, 16:10, radius 9k;
    - `where`, in Geist Pixel 11k;
    - a "you said" pill, then his words in Fairfax 14.5k ink, in quotes;
    - a "Blicky" pill, then the reply in 14.5k text-secondary.
- **Blicky's page:**
  - Rows sit 18k apart with a 32k gutter.
  - Fun-shape markers (24 × 24 paths in `FUN` at NotesPad.tsx:289):
    - working on: a hollow star, 18k;
    - completed: a filled sparkle in Blicky's ink, 20k;
    - up next: a hollow sparkle, 16k;
    - sources: screen = blob, his words = flower, a note = triangle, his rule = star, all 17k.
  - Text:
    - working on: 17k, text-secondary;
    - completed: 20k, blicky-ink;
    - context: 15k, muted;
    - each source: label in Pretendard 600 at 13.5k ink, detail in Fairfax 14k muted.
  - **Routes:** dotted cubic curves from (10k, −10k) to (36k, row y), with control points (10k, y) and (10k + 36k × 0.3, y). Dots are 1.8k in radius, 7.5k apart, at .75 opacity, laid one every 40 ms.
  - **Sketches:** hand-drawn strokes 3.2 wide with round caps and a slight wobble (`feTurbulence` displacement 2.2 in the web version). Each stroke draws in over 0.5 s, the strokes 0.18 s apart, and the letters appear after. Port the paths from `SketchArt` (NotesPad.tsx:87). In the shell, the sketches are the real marks moved in from the screen.

**Tabs**
- All tab sizes here are multiplied by k. 40 × 92, 6 apart, starting (54 + 30)k from the top.
- Positions: project tabs peek 4 out and slide 30 out on hover. The green plan tab stands 26 out, always in front, its name showing.
- Labels: 600 12 rotated 90°, centred 15 from the tab's right edge. There's an extra 16 of hover area outside each tab.
- **Hover card:** 210 wide, 8 to the right of the tab, white, radius 10, rim silver-200. Name in 600 13 ink; next step in Fairfax 13, text-secondary.
- **Load button:** a glass tile, 28k, with a tray-arrow icon in sky-600. It sits under the tabs.

**Motion**

| What | How it moves |
|---|---|
| The pad opens | y +36 → 0 and alpha 0 → 1, over 360 ms, ease out |
| The flight | waits 450 ms, then flies 0.8 s (ease in-out) along a quadratic curve from the cursor (+16, +16) to the sticker spot. The control point is at mid x, 170 above the higher end. Rotation −14 × sin(πt) + 12t; scale grows to the sticker's size. The character is `listening`, then `dragged` while it flies (states from `design/src/cast/Live.tsx`; the shell has its own Pickle and Blicky) |
| The landing | the flying character hides; the sticker shows at scale 1.22 → 1 over 216 ms with an overshoot, from 50% / 80% |
| Writing | starts only after the landing. 40 ms a character. Each word sits slightly off the line: y (rnd − 0.5) × 3k, rotation (rnd − 0.5) × 2.4°, seeded by page and word |
| When writing ends | 600 ms later the title swaps and the page scrolls smoothly back to the top, so the north star leads |
| A new page | flips down from the binding: rotationX 28° → 0, y −18k → 0, alpha .2 → 1, 352 ms, ease out |
| Blicky's glint | 220 ms in and out. A clearing layer over the border: a 160° gradient white .82 → .55 (hue 225) at 45% → .78. A catch rotates once every 2.6 s: cyan (chroma 0.045, hue 200) at 20° → white at 30° → pink (chroma 0.04, hue 330) at 40°, plus a smaller one at 186-202°. A 1 pt white inner line |

**Never:** blur shadows (shadows are lines and grain), beige, light grey text, rainbow colours, more than one green.

## 5. Demo beats it serves

The demo is `bin/pickje --live` on the o-chem worksheet, with the staged projects (`app/recall/staged.ts`).

- **Blicky's scratchpad:**
  - B5 (teaching): it opens at "completed".
  - B6 (mechanism): a new page for the three-step summary.
  - B7 (barge-in): the pen and the glint stop with the voice; "go on" resumes.
- **Pickle's notepad:**
  - B8 (where to file it): the tabs slide out, and the one it went to lifts.
  - B9 (click Blicky): the notepad opens.
  - B11 (switch, bring back): a blue tab opens that project's plan.
  - B12 (close and recap): the close writes a new last stop and next step, and the page rewrites live, title last.

The beat list, with sources, is on the plan page under "Demo flow".

## 6. Working rules here

- **Ask before deciding.** Bring every open choice to him as a click question (at most 4, your recommendation first): the clutter threshold; where the reset and clear buttons go if two small buttons don't fit; anything this prompt doesn't say.
- **Keep his words.** Log his words verbatim in a spec under `docs/spec/`, kept apart from your reads.
- **No silent stubs.** A failure shows, visibly: the load button is visibly disabled, and a pad with no data says so.
- **Privacy.** Only crops are ever kept, never the full frame, never uploaded. Leave other people's speech out of anything you keep.
- **Commits.** Small, touching only your files. Another session may be working in `app/`, so check `git status` before each commit.
- **Show your proof.** Side-by-side screenshots (the shell's `Snapshot.swift` renders windows to PNG) against the Storybook finals at the same width, for every pad state: opening, flying, written, hover preview, tab hover, glint, done.
