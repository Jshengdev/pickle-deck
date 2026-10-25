# pickje · the pitch script · draft 3 · 2026-10-25, about 4:45 AM

Draft 3 opens on Mia's case study (his brief ~4:10 AM, deck/pitch/PLAN.md); the slide numbers below follow the new order.

About 3 minutes, one beat per slide. Built from his brief (2026-10-25, verbatim at the end): at most 3 slides on the
problem (a hook; the data, research and personal story; then "there's always a tool for more" → what we need is
collaborative, human-focused, and leaves your context where it is), then the demo as simulated clips (onboarding, the
scenarios, a short loop of talking to it and watching each step land), then how it's built, the proof, the close.

Labels: **His words** are verbatim. **Fact** has its source. Everything else is **draft** for him to react to.
The slides are in `deck/src/pitch/index.tsx`; open `?deck=pitch` and press → through each slide's builds.

---

## Mia, the case study (≈ 60 s, `slides/mia/`, one sentence per press)
His brief (2026-10-25, ~4:10 AM, in deck/pitch/PLAN.md): open on Mia; one sentence per press; her real screens.

**1 · Her picture.** *(silence, a beat)*
**2 ·** > "This is Mia."
**3 ·** > "She's a second-year mechanical engineering student at Cal. *(press)* Like most people, she's ambitious.
> *(press)* She's smart. *(press)* She designs parts in CAD, edits videos for her club, and is learning to invest.
> *(press)* But there's one thing that keeps stopping her."
- The persona details are DRAFT (his ask: make her a specific person in her trade, as the sponsor tracks want).
**4 ·** > "She has too many interests. *(press)* Too many projects. *(press)* Too many things she needs to do. *(press)* So
> nothing starts." *(her real screens pile up: the video editor, the stocks page, CAD, the chemistry worksheet, the Cal
> Student Hub)*
**5 ·** > "So Mia asks AI for help. *(press)* She types out her question. *(press)* It answers with a wall of text. *(press)*
> She screenshots the page. *(press)* Pastes it back in. *(press)* Opens another agent session for her CAD part. *(press)*
> Another for her video. *(press)* And another for her stocks. *(press)* Ten sessions in, she can't remember what any of it
> said, where it came from, what it was for, or what her next step is."

### 6 · It's not just Mia (data, research, the personal line, ≈ 25 s) · `NotJustMia`
> **His words:** "For years we thought she just needed better productivity apps."
> "366 million adults live with ADHD symptoms. *(press)* The average worker switches apps about 1,200 times a day, and
> spends nearly 4 hours a week finding their place again. *(press)* After an interruption, it takes 23 minutes to get
> back. *(press)* **His words:** the truth is, the software we use was built for neurotypical brains."

- **Facts:** Song et al. 2021, *J. Global Health* 11:04009 (6.76% of adults, ≈ 366 M in 2020). Murty, Dadlani & Das,
  *HBR*, Aug 2022 (137 people at 3 Fortune 500 companies: ≈ 1,200 toggles a day, just under 4 h a week reorienting).
  Gloria Mark, UC Irvine, Gallup interview (one study of 36 workers: 23 min 15 s to resume interrupted work).
- **Open (his):** who "she" is, said in one line, if he wants to.

### 7 · There's always a tool for more (≈ 20 s) · `ToolsForMore`
> "There's always a tool for more. More apps. More tabs. Now, AI that does more for you. *(press)* But the work that
> matters to you isn't handed off; it's done together. *(press)* So we didn't build more. We built something
> collaborative, human-focused, and it leaves your context right where it is."

- Draft, from his brief: "the idea of ai is to do more, but what we need is somethgin more collaboritve huamn focuesd
  and doesnt mess with where your context goes."

### 8 · One next step · `slides/mia/` (`OneStep`)
> "Mia doesn't need ten agent sessions. *(press)* She needs one next step." *(the sessions clear; one card stays:
> "Question 22: count the degrees of unsaturation first.", her own rule in the staged o-chem project)*

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
