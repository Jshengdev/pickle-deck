# pickje · the pitch script · draft 3 · 2026-10-25, about 4:45 AM

Draft 4 (~5 AM): his walkthrough of the first half, his order and wording; the slide numbers below follow it.

About 3 minutes, one beat per slide. Built from his brief (2026-10-25, verbatim at the end): at most 3 slides on the
problem (a hook; the data, research and personal story; then "there's always a tool for more" → what we need is
collaborative, human-focused, and leaves your context where it is), then the demo as simulated clips (onboarding, the
scenarios, a short loop of talking to it and watching each step land), then how it's built, the proof, the close.

Labels: **His words** are verbatim. **Fact** has its source. Everything else is **draft** for him to react to.
The slides are in `deck/src/pitch/index.tsx`; open `?deck=pitch` and press → through each slide's builds.

---

## The first half (his order and words, 2026-10-25 ~5 AM; one sentence per press)

**1 · Her picture.** *(a beat)*
**2 ·** > "This is Mia. *(press)* More specifically, she's En's sister." *(the name's spelling: confirm)*
**3 ·** > "Like anyone else, she's ambitious. *(press)* She's smart. *(press)* She does 3D CAD for her club, and she's learning
> to invest. *(press)* But there's one thing that keeps stopping her."
**4 ·** > "She has too many interests. *(press)* Too many projects. *(press)* Too many things she needs to do. *(press)* So nothing
> starts." *(her real screens pile up)*
**5 ·** > "The obvious solution: use AI for help. *(press)* She types out a question. *(press)* It answers with a wall of text.
> *(press)* She screenshots the page. *(press)* Pastes it back in. *(press)* While she waits, she remembers something for her
> cat, so she opens another chat. *(press)* Another for the video. *(press)* And another for the stocks. *(press)* Sooner or
> later, she's ten sessions in."
**6 ·** > "Mia doesn't need ten agent sessions. *(press)* She needs one next step."
**7 · It's not just Mia.** > His words: "For years we thought she just needed better productivity apps." *(press)* "15.5 million
> U.S. adults have ADHD. *(press)* We switch apps about 1,200 times a day, and spend nearly 4 hours a week finding our place
> again. *(press)* After an interruption, it takes 23 minutes to get back. *(press)* His words: the truth is, the software
> we use was built for neurotypical brains."
- **Facts:** CDC, MMWR 73(40), Oct 2024 (15.5 M U.S. adults, 6.0%, a current diagnosis, self-reported); HBR, Aug 2022 (137
  people at 3 Fortune 500 companies); Gloria Mark, UC Irvine (one study, 36 workers).
**8 · There's always a tool for more.** > "There's always a tool for more. More apps, more tabs, now AI that does more for you.
> *(press)* His words: and for the rest of us, our great ambitions are held back by tools that only complicate it more.
> *(press)* Instead of a tool that does more for you, we built one that does it with you: it asks before it acts, it teaches
> one step at a time, and it shows you, on your own screen, like a friend."
- The 3 points and the mission line come from the pickje session's answer, each grounded in his words
  (his-words.md:86-90, spec 0014, spec 0006). The pivot sentence is DRAFT.

## Meet pickje (≈ 15 s)

### 9 · Title · "pickje sees what you mean."

### 10 · Meet Pickle and Blicky · `MeetCast`
> "Pickle rides on your cursor; its real work is backstage, as the context brain. Blicky is the one you see: he draws
> on your screen and talks you through it."

- **His words** (the option he picked, S4).

## The demo, as clips (≈ 60 s)

### 6 · Onboarding, the first minute (≈ 20 s, loops) · `ClipOnboarding`
> "This is the first minute. Shake your cursor and Pickle pops in. He learns your name. Blicky peeks out. Circle what
> you mean, and each circle leaves a numbered mini Pickle. Ask about something you saw earlier. Hand it a task, and
> Pickle stamps it."

- Simulated from a real onboarding run: the beats and the lines are the ones in `docs/nap/story` (pickje repo),
  drawn in the brand's cast with a slow camera. Lines that were cut off in the frames start with "…".

### 7 · The scenarios (≈ 20 s, loops) · `ClipScenarios`
> "Same two friends, any screen. An o-chem worksheet: is molecule B the ester or the acid? A desk lamp in Fusion: how
> do I make the shade light? A design critique: the mascot is on every screen. Each time, Pickle files it in the right
> project, and Blicky marks the one thing that answers it."

- Staged data: the words and replies are word for word from `app/recall/staged.ts` (synthetic, every word by "test").

### 8 · Talk, mark, speak, save (≈ 15 s, loops) · `ClipLoop`
> "Watch closely. You talk. Blicky marks the spot first, and his voice waits for each mark to land. One step at a time.
> When the screen gets crowded, he saves the diagram into his scratchpad."

- **His words** on the scratchpad: "The scratch pad is just meant to summarize ideas and save the diagrams that were
  drawn so if it gets too cluttered it can pull the diagrma form on the screen and save it in the scratch pad."

## How it's built and the proof (≈ 30 s)

### 9 · How it's built · `HowItWorks`
> "Claude is both brains and the teacher. Cartesia is the voice and the ears. Moss routes every turn to the right
> project and holds the live context. Convex keeps the card live. Elastic brings back what you did days ago. And it all
> runs on your Mac, beside your work."

### 10 · It already works · `ItWorks`
> "On the first full live exam, it gave away 0 answers early. It routed 16 of 16 turns to the right project. And it got
> 20 of 21 chemistry criteria."

- **Facts:** pickje README (`docs/PRODUCT.md:27-29, 50, 70`). Caveat to keep: the whole rubric was 52% on that first
  run, which had demo examples in its prompts, so it isn't a clean number; the pass bar is 80% over two runs.
- **Open (his):** which three numbers.

## 11 · Close (≈ 10 s) · `Close`
> "Tonight, Mia started. Not with five answers, with one next step. pickje sees what you mean."

---

## Appendix (after the close, for questions)
Shake to wake · It sees what you mean (the 4 stages) · Your north star · Built for the real world.

## His brief (2026-10-25, about 4 AM, verbatim)
"pull new changes for the slide deck. see how it looks and the information on it, and then update it with the new data and infroamtion. with a script to kind of base the brief story on. Ideally the preseentaiotn will have max 3 slides about hte problem ideally with something like start with idk whatever is relevant, then make sure you have data and reserach and personal story applied to it, and then the last story slide is about how theres always tools for morea nd the idea of ai is to do more, but what we need is somethgin more collaboritve huamn focuesd and doesnt mess with where your context goes. then have the clips from the demo cut and simualted to show each part. one being for onboarding, how it goes through the whoole flow iwth the real visualizaitons of it but cuter ui and slight movement zooming in an little and hwat not. and then all the differnet scnerairos and a hsort looping clip that shows how we talked to it and saw how it was able to execute each step properly. this is the ideal soemethign liek this. see how that fits and ensure youre styling the thign with te brand guidleines that we made"
