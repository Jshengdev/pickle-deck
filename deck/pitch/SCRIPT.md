# pickje · the pitch script · draft 5 · 2026-10-25, about 4:50 AM

His walkthrough of the whole deck (2026-10-25, 4:38 AM, verbatim at the end) sets the order and the words. One idea per
slide, one sentence per press; the sentence he says is the one on screen. About 3 minutes plus his live demo.

Labels: **His words** are verbatim (spelling fixed). **Fact** has its source. Everything else is **draft** for him to react to.
The slides are in `deck/src/pitch/index.tsx`; open `?deck=pitch` and press → through each slide's builds.

---

## Mia (slides 1–6)

**1 · Her picture.** *(a beat)*
**2 ·** > "This is Mia. *(press)* More specifically, she's En's sister." *(the name's spelling: his call)*
**3 ·** > "Like anyone else, she's ambitious. *(press)* She's smart. *(press)* She's designing a car in 3D CAD, for her club.
> *(press)* She's learning to invest. *(press)* And she's teaching herself to edit videos. *(press)* But there's one thing
> that keeps stopping her." *(each project lands as a card with its real screen: club car, investing, video editing)*
**4 ·** > "She has too many interests. *(press)* Too many projects. *(press)* Too many things she needs to do. *(press)* So nothing
> starts." *(her real screens pile up)*
**5 ·** > "The obvious solution: use AI for help. *(press)* She types out a question. *(press)* It answers with a wall of text.
> *(press)* She screenshots the page. *(press)* Pastes it back in. *(press)* While she waits, another project piques her
> interest, so she opens another chat. *(press)* Another to learn video editing. *(press)* And another for stocks.
> *(press)* Soon she has ten sessions."
**6 ·** > "But she doesn't need ten. *(press)* She just needs the one next step." *(the sessions fall away; one card stays)*

## The problem (slides 7–9)

**7 · It's not just Mia.** > His words: "For years we thought she just needed better productivity apps." *(press)* "15.5 million
U.S. adults have ADHD. *(press)* We switch apps about 1,200 times a day, and spend nearly 4 hours a week finding our place
again. *(press)* After an interruption, it takes 23 minutes to get back. *(press)* And today's AI tools are built for
switching: a new chat for every task, and the context is yours to keep track of. *(press)* His words: but the truth is, the
software we use was built for neurotypical brains."
- **Facts:** CDC, MMWR 73(40), Oct 2024 (15.5 M U.S. adults, 6.0%, a current diagnosis, self-reported); HBR, Aug 2022 (137
  people at 3 Fortune 500 companies); Gloria Mark, UC Irvine (one study, 36 workers). The AI-tools sentence is DRAFT, from
  his point "context switching and all these things that AI tools are currently designed for are very difficult to maintain".

**8 · There's always a tool for more.** > "A new model every week. *(press)* A new AI tool for every niche. *(press)* A new
hack to stay on top of it all. *(press)* His words: our ambitions are being held back by tools that only seem to complicate
them." *(a pile of made-up launch posts, app cards and listicles; no real names or logos)*

**9 · Built to do it with you.** > His words: "Instead of a tool that does more, we built one that does it with you." *(press, one use case each, on a real
> screen with the cast on it)* "Learn: it teaches you the next step, not the answer. *(press)* Plan: 'I'm overwhelmed'
> becomes one next step. *(press)* Build: it marks the part that matters, right on your model. *(press)* Create: it shows
> you where to click, right in your editor. *(press)* Invest: it ties the drop to the news that caused it. *(press)* It
> asks before it acts. One step at a time. A friend on your screen."
- Verbs and lines are DRAFT. "Pickle, I'm overwhelmed" is from `demo/chaos/spec.txt` (pickje). The three principles come
  from the pickje session (his-words.md:86-90, spec 0014, spec 0006). FreeCAD and Kdenlive screens are CC BY-SA, credited.

## Meet pickje (slides 10–12)

**10 · Title.** > "pickje sees what you mean. *(press)* His words: a computer-use AI collaborator that works with you on your
own screen and manages your context, so you can turn messy projects and ambitious thoughts into the next actionable step."

**11 · Meet Pickle.** > "Meet Pickle. *(press)* His words: your context brain. *(press)* It keeps track of every project: the north star,
> the last stop, the next step. *(press)* Each project is a tab; one press and you're back in it." *(his final notepad,
> live: the moss binding, the sticker, the plan tab, then the desk lamp tab opens its page)*
- The pad's text is the staged demo projects (pickje `app/recall/staged.ts`, synthetic). Sentences 3–4 are DRAFT.

**12 · Meet Blicky.** > "Meet Blicky. *(press)* He draws it out with you, right on your screen. *(press)* And keeps every diagram in his
> scratchpad." *(the real marks wipe onto the page; then his final scratchpad, writing, with the IR trace and butanoic acid)*
- His words on the scratchpad: "The scratch pad is just meant to summarize ideas and save the diagrams that were drawn so if
  it gets too cluttered it can pull the diagrma form on the screen and save it in the scratch pad." Sentences are DRAFT.

## The demo (slides 13–14, then live)

**13 · Onboarding, end to end.** > "Here's the onboarding, end to end." *(a press per beat, on the app's real frames)* OB0 the intro card · OB1 Pickle
> pops in at the cursor · OB2 he asks your name, the mic opens · *(press)* your words show as heard ("you can call me
> johnny") · OB3 Blicky pops out of thin air · OB4 circle what you mean · *(press)* each circle leaves a numbered mini
> Pickle · OB5 ask about something from earlier.
- Captions are the beat titles from `assets/onboarding/beats.json` (pickje `docs/nap/story`); the bubbles are the app's own
  lines. His plan: run through it briefly, then summarize the rest live ("ask for a goal, things of that sort").

**14 · The scenarios.** > "We'll show it on 4 screens. *(press)* The o-chem worksheet: Blicky teaches it step by step and draws the structures,
> but never gives the answer away. *(press)* The Cal Student Hub: 'Pickle, I'm overwhelmed.' Pickle points at what's due
> first, and gives her one next step. *(press)* The stocks page: why did it drop 18% the day after earnings? Blicky circles
> the drop, then the headline that explains it. *(press)* A design critique: what's wrong with this layout? Blicky marks the
> worst problems right on the page, and says how to fix each. *(press)* Now, live."
- Sources: `docs/PRODUCT.md` "What it is"; pickje `demo/chaos/spec.txt` §1–2; `demo/stocks/index.html` header; the
  HeyClicky lab's E5 critique page (its short line word for word). Questions and lines otherwise DRAFT.
*(His live demo here: it interacts, creates diagrams, draws.)*

## How it works and the proof (slides 15–18)

**15 · Fifteen verbs.** One sponsor per press, its verbs light up: Cartesia → Catch (Ink) and Show · Moss → Recall and Route ·
Convex → Hold · Elastic → Bring back · Factory → Hand over (Droid) · Anthropic → Teach and Push (Claude runs the whole brain) ·
Mana → Curate · Microsoft → Measure. Last press: "The whole product runs on Anthropic, and is the Microsoft entry."
- **Source:** `docs/VERBS.md` (the sponsor column). Ground runs on Jev, not a sponsor; Attune, Gauge and Learn are out for the
  demo. **Open (his):** VERBS.md's forge quote says Teach runs on Jev, its sponsor column says Anthropic; the slide follows the
  sponsor column.

**16 · The full exam.** > "We gave pickje the full exam: it drives the real app on the real screen, and a strict judge grades every step.
> *(press)* 52% on the first run, 62% on the latest. The bar is 80%, so it hasn't passed yet. *(press)* It holds back the
> answer and gets the chemistry right; where it draws is the weak part. *(press)* And underneath, the parts we built, each
> measured on its own: 16/16 routed right, 6 ms to the live card, 499 ms for Blicky to go quiet, 15/18 past questions found,
> 8.1 s to hand a job to Droid, $0.029 → $0.019 a turn."
- **Facts:** `docs/evals/2026-10-24-1|2/summary.txt` (run 1 117/224; latest 302/485 over 2 passes; reveal 33/34 with 1 slip,
  chemistry 47/50, visual 86/208); `docs/PRODUCT.md` (each number's line is in a comment in `Exam.tsx`).
- **Caveats on the slide:** the mic heard 0 of 36 steps (the words were handed in); 3 steps not judged (no frame); 16/16,
  499 ms and 8.1 s come from checks whose output wasn't kept; Elastic's questions are staged.

**17 · Before and after.** > "A page, before Blicky. *(press)* The same page after Blicky: every mark drawn by the real app. *(press)* It rings,
> points, works the number and names the part, right on the page."
- The images are from the app's marks gallery (pickje `app/shell/tools/gallery.mjs`): the real marks over a made-up page.

**18 · How we built it.** > "It runs in 3 layers. On your Mac: Pickle and Blicky drawn in SwiftUI, the mic, screenpipe's eyes. *(press)* The
> talk server, one turn at a time. *(press)* The brains and memory: Claude writes every line and picks every mark;
> Cartesia, Moss, Convex, Elastic, Factory Droid, Mana. *(press)* Every spec starts as a sentence: his words, a spec, click
> questions, build, a live exam. One real thread: 19 minutes from the question to the commit. *(press)* 271 commits, 21
> specs, 28 hours."
- **Facts:** counted 2026-10-25 4:43 AM with the commands in `Stack.tsx` (re-run them before presenting).

## 19 · Close
> "Tonight, Mia started. Not with ten sessions. With one next step. *(press)* It remembers everything you're juggling. It
> gives you one next step, not a wall. It already works: 47/50 chemistry, kept the answer back 33/34 (1 slip), 16/16 routed
> right. *(press)* pickje sees what you mean."
- **Facts:** `docs/evals/2026-10-24-2/summary.txt` (latest live exam, two passes); `docs/PRODUCT.md:198` (16/16 routed).

---

## Out of the running order
Files kept, not shown (his call: "the things in the very end we can clear out"): MiaStory, MeetCast, ShakeToWake,
SeesFlow, NorthStar, HowItWorks, ItWorks, RealWorld, ClipOnboarding, ClipScenarios, ClipLoop.

## His walkthrough (2026-10-25, 4:38 AM, verbatim)
"Okay, so make sure that the the like what she does is like 3D cap for car. She's learning to invest. She's editing videos, all those. So be more specific that these are different projects and like ways to organize context for like things that she wants to learn and things she wants to be ambitious about. And then I like the obvious thing. She patience. So while she waits, basically says she's going to start working on another one of her projects because it piques her interest. And then another one for how to video edit, and another one for how to do stocks. And soon she has ten sessions, and but she doesn't need ten. She just needs the one next step. And it's not just Mia. So basically talk about how these people have ADHD and how context switching and all these things that AI tools are currently designed for are very difficult to maintain. And so basically for that there's always a tool for more Have stacked screenshots of different releases of so many different niche models of AI tools, things to use, productivity hacks, all that. And then we don't need. And so basically just summarize the quote into just our ambitions are being held back by tools that only seem to complicate. So then show that. so as a new slide, so instead of a tool that does more, we build one that does it with you. And so the idea is, be a little bit more higher level about what it can do, like the main use cases. yeah, something cooler than that, I think. And then we're just gonna continue on for for what Pickje is, but Picture sees what you mean. So first, meet Pickle and Blicky. Or instead of saying Pickle, Picture sees what you mean. Maybe on the bottom say, "Computer use AI collaborator that can." that can, that works with you, helps you on your own screen, and manages your context, so that, something, something thinking, so that you can focus on the next actionable step or whatever thing like that. So you can turn your messy projects and ambitious thoughts into the next actionable step. so then we're going to introduce the cast, which is Meet Pickle. Basically, this is your context brand. It keeps track of your to-do listing, and then also include the visualization of its UI tab. And then this is Blicky, and show its scratchpad of like how it's able to draw diagrams and do all these different things. Then we're gonna do a the intro into the entire demo. Make it so that when I click the next tab, it will go into the next part of the demo. So then OB zero, OB one, OB two, OB three, OB. Four, B five. These are all going to be live, and make it so that they look as real to the live visualization as possible. But I basically just want to like briefly run through it, and then in the process, like probably the best thing to do would be to show how the onboarding looks end to end. And then just do like the first couple parts of it where it's like you tell it your name, and then you do the circle and ask it to explain what's on the two points. I think that's probably the two coolest ones. And then when I come back, I'll just like summarize it. It's ask for a goal things of that sort, and then I'll just continue. Let's say like, so we have a couple of other scenarios. We have the OKM worksheet thing, the thing in this, the thing there, three different things, design critiques. And then we'll do the live demo of how it interacts, creates diagrams, draws, and can do all these things. And then when we come back to the slide deck, we'll talk about how the seven parts, or we originally created fifteen verbs. I think here we should flush out how we have fifteen verbs of what it's capable of doing, and how each sponsor track is associated with each. And then the next slide. Basically show a full exam of how I was able to perform, and then more data about the whole thing that we built. Show the before and after of annotations. Show more tech stack related and some of the processes used to build this thing. Yeah, and then the things in the very end we can clear out just to save on what I think is final."

## His brief (2026-10-25, about 4 AM, verbatim)
"pull new changes for the slide deck. see how it looks and the information on it, and then update it with the new data and infroamtion. with a script to kind of base the brief story on. Ideally the preseentaiotn will have max 3 slides about hte problem ideally with something like start with idk whatever is relevant, then make sure you have data and reserach and personal story applied to it, and then the last story slide is about how theres always tools for morea nd the idea of ai is to do more, but what we need is somethgin more collaboritve huamn focuesd and doesnt mess with where your context goes. then have the clips from the demo cut and simualted to show each part. one being for onboarding, how it goes through the whoole flow iwth the real visualizaitons of it but cuter ui and slight movement zooming in an little and hwat not. and then all the differnet scnerairos and a hsort looping clip that shows how we talked to it and saw how it was able to execute each step properly. this is the ideal soemethign liek this. see how that fits and ensure youre styling the thign with te brand guidleines that we made"
