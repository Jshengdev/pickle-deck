# The pitch · how it's put together

Open it: `npm run dev`, then http://127.0.0.1:5320/?deck=pitch
The template shelf: http://127.0.0.1:5320/?deck=templates

## Keys
| Key | Does |
|---|---|
| → or space | next step of this slide, then the next slide |
| ← | back one step |
| ↓ ↑ | skip a whole slide |
| G | grid of every slide |

The URL tracks where you are: `#/5/2` is slide 5, step 2. Reload and you land on the same step.

## Files
```
pitch/
  index.tsx          the running order: one line per slide, with how many steps it has
  kit/step.tsx       the build system: <Show>, useStep(), useStepTimeline()
  slides/
    story.ts         Mia's story in one place: her name, her 3 tasks, the chat, her next step
    MiaStory.tsx     the story as one animated scene, 13 beats (camera, typing, windows flying into the tray)
    Title, MeetCast, ShakeToWake, SeesFlow, Demo, NorthStar, HowItWorks, ItWorks, RealWorld, Close
                     the rest of the pitch; each file's top comment says what each press does and where its words come from
    Problem.tsx      out of the order for now (the story covers it)
    _Template.tsx    copy this to start a slide
```

## Templates (`templates/`, open `?deck=templates`)
| Template | For | Steps |
|---|---|---|
| `TitleT` | a big statement on forest felt with the cast; the date line on press 1 | 2 |
| `ProblemT` | a problem statement: one pain per press, earlier ones fade back, then the line that lands it | pains + 2 |
| `JourneyT` | a motion graphic: a dot flies a curved path stop to stop, drawing the line as it goes | stops |
| `NumberT` | one number that counts up (with its source), then what it compares to | 3 |
| `_Template` | blank: a card, a second card, a line | 3 |

Each one has its words and data at the top under `CHANGE ME`, and its own dial panel. Words marked DRAFT are ours,
not his.

## Add a slide
1. Copy a template (or `slides/_Template.tsx`) into `slides/MySlide.tsx` and rename the function.
2. In `index.tsx`, add a line where it goes: `{ title: 'My slide', chapter: 'pickje', steps: 3, render: MySlide }`.
3. Press → through it, tune the dials, and copy the values you like back into the file.

## Steps: one idea per press
`steps: 3` means states 0, 1 and 2. State 0 is what shows when the slide arrives. Arriving never animates; only the
change from one step to the next moves.

**Simple builds, with `<Show>`** (Motion springs):
```tsx
<Show from={1}>…</Show>              // appears on the 1st press
<Show from={1} dimFrom={3}>…</Show>  // appears on 1, fades back on 3 (focus moves on)
<Show until={2}>…</Show>             // leaves after step 2
const step = useStep()               // or read the step and do anything with it
```

**Motion graphics, with `useStepTimeline`** (GSAP: drawn lines, morphs, paths, counters):
```tsx
useStepTimeline(rootRef, (tl) => {
  tl.set('.dot', { opacity: 0 })                  // how it looks at step 0
  tl.to('.line', { drawSVG: '100%' }).addLabel('s1')  // the animation into step 1, then label 's1'
  tl.to('.dot', { opacity: 1 }).addLabel('s2')        // into step 2
}, [d.speed])                                     // dial values, so tuning rebuilds it
```
→ plays forward to the next label, ← plays back. Set each element's starting state in ONE `tl.set` (use a function
for different values, like `opacity: (i, el) => …`); two sets on the same element at time 0 fight when it rewinds. Plugins are ready in `@design/engine/gsap`: DrawSVG, MorphSVG,
MotionPath, SplitText, ScrambleText, Flip, Physics2D. The brand's eases are in `@design/tokens` (`ease.route`,
`ease.land`, `ease.press`, `ease.step`…).

## Dials (bottom right)
- **Deck**: margin and type scale for every slide.
- **Builds**: how every `<Show>` moves (spring feel, rise distance, dim level, reveal style).
- **One panel per slide**: add `const d = useDialKit('Name', { size: [default, min, max, step] })` in a slide.
  Dial types: numbers `[v, min, max, step]`, `true/false`, `{ type: 'select', options: [...] }`,
  `{ type: 'color' }`, `{ type: 'spring' }`, `{ type: 'text' }`.

Dials hide in the PDF. Values reset on reload until you copy them into the code.

## The brand rules worth remembering
- Title: a short sentence with a verb, using numerals. Then one hero. Nothing above the title.
- Colors from roles (`var(--surface-felt)`, `var(--catch)`), never hex. Type from `--t-head-1`, `--t-second-2`…
- Every number names its source (`docs/STATUS.md`, C4). No invented metrics.
- Full list: `design/BRAND.md` §13, and `CLAUDE.md` at the repo root.
