# The pitch: one file per slide, one agent per slide

His brief (2026-10-25, about 4:10 AM, verbatim at the end): read the whole draft; plan it so each slide is a file inside
the presentation's folder, and each background agent is given a task and the context to find its information and build
its slide, in the order, cleanliness and simplicity he wants. Mia's case study is built first, as the model the rest
follow (`deck/src/pitch/slides/mia/`).

**The script:** `deck/pitch/SCRIPT.md` · **the running order:** `deck/src/pitch/index.tsx` · **open it:** `npm run dev`,
then http://127.0.0.1:5320/?deck=pitch (→ one sentence, ← back, ↓↑ skip a slide, G the grid).

## The order (his run-through 2026-10-25, 5:20 AM; verbatim at the end of SCRIPT.md)

| # | Slide | File |
|---|---|---|
| 1 | Mia (just her picture) | `slides/mia/` · `MiaPortrait` |
| 2 | "This is Mia." → "More specifically, she's Enlie's sister." | `slides/mia/` · `ThisIsMia` |
| 3 | Ambitious, smart → her 3 projects as cards → "one thing keeps stopping her" | `slides/mia/` · `SheIs` |
| 4 | Too many interests, projects, things → "So nothing starts." | `slides/mia/` · `TooMany` |
| 5 | It's not just Mia: "Mia has ADHD.", 3 sourced numbers, what switching costs | `slides/NotJustMia.tsx` |
| 6 | You ask AI → wall of text → screenshot → paste → another project → ten | `slides/mia/` · `AsksAI` |
| 7 | "But you don't need ten windows. You just need the one next step." | `slides/mia/` · `OneStep` |
| 8 | There's always a tool for more → "Our ambitions are being held back…" | `slides/ToolsForMore.tsx` |
| 9 | Built to do it with you: 4 UX decisions → "Introducing pickje." | `slides/WithYou.tsx` |
| 10 | pickje sees what you mean. + his bottom line | `slides/Title.tsx` |
| 11 | Meet Pickle: context brain, the notepad and its tabs | `slides/MeetPickle.tsx` |
| 12 | Meet Blicky: does the work on your screen, the scratchpad | `slides/MeetBlicky.tsx` |
| 13 | The onboarding, a press per beat (shake → pin → ask about earlier) | `slides/Onboarding.tsx` |
| 14 | "A quick live demo of the onboarding." | `slides/LiveDemo.tsx` |
| 15 | The scenarios → no new chats: Pickle routes each one → "Now, live." | `slides/Scenarios.tsx` |
| 16 | The whole product is built on 15 verbs; a press per sponsor, technical | `slides/Verbs.tsx` |
| 17 | Before and after Blicky (the chemistry page) | `slides/Annotations.tsx` |
| 18 | It runs in 3 layers: the Mac, the talk server, the brains and memory | `slides/Stack.tsx` |
| 19 | Close: "Tonight, Mia started." → summary → "We've got you, Mia." | `slides/Close.tsx` |
| 20 | Appendix: the full exam and the measured numbers | `slides/Exam.tsx` |

Out of the running order (files kept): MiaStory, MeetCast, ShakeToWake, SeesFlow, NorthStar, HowItWorks, ItWorks,
RealWorld, ClipOnboarding, ClipScenarios, ClipLoop.

## The model to copy: `slides/mia/`
- `words.ts`: every sentence, one per press, in his words where he gave them (comments say which), DRAFT where not.
- `parts.tsx`: what the slides share (Mia's drawing, `Lines` = one sentence per press with the older ones fading back,
  `Win` = an app window with a real screen, `TypeOn`).
- `Slides.tsx`: the slides; each exports its step count (= its number of sentences).
- `index.ts`: the entries, in order, spread into `index.tsx`.
- `../../assets/screens/`: the real screens (`CREDITS.md`: source and license of each).

## Rules every agent follows
1. **Own your files only.** One slide (or one folder) per agent; touch `index.tsx` only to add your line. Another session
   and his teammate work here too: `git pull` before you start and before you push; commit only your paths.
2. **One idea per slide, one sentence per press**, the sentence he says on screen (his brief: "for every tab it only
   Pushes the next sentence that I basically say"). Arriving never animates; only the change between presses moves.
3. **Words in a words file**, labeled: his words verbatim (spelling fixed, say so), facts with their source, the rest DRAFT.
4. **Every number names its source** and keeps its caveat. No invented metrics, quotes or people. Mia is a scenario.
5. **The brand** (`design/BRAND.md`): roles not hex (`var(--ink)`, `var(--surface-page)`…), the type levels
   (`--t-head-1`…), the cast as drawn, felt / moss / metal, glass only for small parts. No blur shadows, no beige, no light
   grey text, no rainbow. Plain, clean, lots of room: one hero per slide.
6. **Real screens over mock-ups**: `assets/screens/` has the chemistry worksheet, the Cal Student Hub (name shown as Mia),
   the stocks page, FreeCAD (for CAD) and Kdenlive (for video). Credit CC BY-SA screens on the slide.
7. **Done when:** `npm run typecheck` passes; you've pressed through every step and screenshotted each one (keep them out
   of git); no console errors; `?print` shows a sensible still for each slide.

## The briefs (one per agent)

**A · It's not just Mia** (`slides/NotJustMia.tsx`). Make it read as Mia's world, scaled up: her picture small, then the
three numbers one per press, then his line. Keep the sources exactly as in the file's header (Song et al. 2021; HBR 2022;
Gloria Mark, one study). Don't add the "15–20% neurodivergent" figure (its source couldn't be traced).

**B · There's always a tool for more** (`slides/ToolsForMore.tsx`). The pile should be her actual tools (use the real
screens' app names: Kdenlive, FreeCAD, Cal Student Hub, Markets, AI chat ×10), then his line, then the 3 cards. Card lines
are DRAFT; his direction: "collaborative, human focused and doesn't mess with where your context goes".

**C · Meet Pickle and Blicky** (`slides/MeetCast.tsx`). Same words (his pick, S4), set on Mia's screen: Pickle at her
cursor, Blicky beside the worksheet. One sentence per press.

**D · Clip: any screen** (`slides/ClipScenarios.tsx`). Replace the drawn Fusion/Figma stand-ins with Mia's real screens:
the chemistry worksheet (question 22), the Cal Student Hub ("Pickle, I'm overwhelmed": pickje repo `demo/chaos/spec.txt`
has the beats and lines), the stocks page (the 18% drop after earnings: `demo/stocks/index.html` header), CAD. Each scene:
what she says, Pickle files it, Blicky rings the one thing, the reply. Words from those specs; DRAFT where they don't say.

**E · How it's built** (`slides/HowItWorks.tsx`). Seven parts, each one line + its proof from `docs/PRODUCT.md:47-107`.
His call which tracks to name; keep all seven until he says.

**F · Close** (`slides/Close.tsx`). Back to Mia: "Tonight, Mia started." with her one next step from slide 8, the three
reasons with real numbers (the live exam), then the line.

## His brief (2026-10-25, about 4:10 AM, verbatim)
"Okay, so basically, I'm going to read over the draft of the entire presentation, create a plan off of how you would have each each slide be a file inside of the folder which is the presentation, so that each background agent is given a task and context to find this information and to basically create the presentation that I'm looking for in the order and cleanliness with the simplicity that I want it to be. But In the very beginning, let's start with the case study of Mia. Introduce Mia saying, "This is Mia." So basically, what's going to happen is the first slide. This one we can put inside of the folder because it'll be a sequence of slides, but it'll be communicating the same idea. But the first slide I want to have is just a picture of Mia, and then on slide one or slide two it'll be like. This is Mia, and then next slide. She has, she like most people, is ambitious. She's smart. She's this. She's that. But there's one thing that consistently stops her. And then, then we'll go into how basically she has she has too many interests, too many projects. Too many things that she needs to do. That nothing starts. And basically for the visualization, let's use the real chemistry example, the real Cal page, and then any other cool like SolidWorks, video editing, other ideal use cases that we've done, stocks, things like that, and put them all over and go fetch the images for that. So make it so that for every tab it only Pushes the next sentence that I basically say. I then say, so Mia ask AI for help. What it looks like, and then basically show how it says like typing the chat history, and then it'll respond, and then make it so that it looks like as she goes and screenshots the page, and then the next one is pasting it back, and then finally show how she opens another agent session, and then how she opens another one for a different task, and another one. And by the time she's ten agent sessions in, she can't remember what any of the information was, where it came from, what was it used for, and what's her next step. And then say, yeah, but I guess before this, that's just like the transition into Mia needs one step, not like ten different agent sessions. And then we can, um, have all the things go, and then right before this we go into meet Pick J. So go ahead and build the first part of it exactly as we talked about, and that's kind of the environment and mode and mindset that we want to put them. But because the sponsor tracks emphasize heavily on selecting a specific person in their trade, make so it builds a little closer towards what that means."
