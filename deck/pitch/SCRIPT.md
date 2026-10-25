# pickje · the pitch script · draft 6 · 2026-10-25, about 5:20 AM

His run-through of the slides (2026-10-25, 5:20 AM, verbatim at the end) sets the order, what's said, and what's cut. One
idea per slide, one sentence per press; the sentence he says is the one on screen. About 3 minutes plus his live demo.

Labels: **His words** are verbatim (spelling fixed). **Fact** has its source. Everything else is **draft** for him to react to.
The slides are in `deck/src/pitch/index.tsx`; open `?deck=pitch` and press → through each slide's builds.

---

## Mia (slides 1–4)

**1 · Her picture.** *(a beat)*
**2 ·** > "This is Mia. *(press)* More specifically, she's Enlie's sister."
**3 ·** > "Like anyone else, she's ambitious. *(press)* She's smart. *(press)* She's designing a car in 3D CAD, for her club.
> *(press)* She's learning to invest. *(press)* And she's teaching herself to edit videos. *(press)* But there's one thing
> that keeps stopping her." *(each project lands as a card with its real screen)*
**4 ·** > "She has too many interests. *(press)* Too many projects. *(press)* Too many things she needs to do. *(press)* So nothing
> starts."

## The problem (slides 5–9)

**5 · It's not just Mia.** > "Mia has ADHD. *(press)* So do 15.5 million U.S. adults. *(press)* We switch apps about 1,200
times a day, and spend nearly 4 hours a week finding our place again. *(press)* After an interruption, it takes 23 minutes
to get back. *(press)* Every switch costs more when focus is already hard. The ambition is there. The start isn't."
- **Facts:** CDC, MMWR 73(40), Oct 2024 (15.5 M U.S. adults, 6.0%, a current diagnosis, self-reported); HBR, Aug 2022 (137
  people at 3 Fortune 500 companies); Gloria Mark, UC Irvine (one study, 36 workers). The last two sentences are DRAFT: his
  point ("context switching is extremely or more detrimental to somebody who lacks the ability to focus… they have
  ambition… They're unable to do so"), not a cited finding.

**6 · You ask AI.** > "The obvious solution: use AI for help. *(press)* You type out a question. *(press)* It answers with a
wall of text. *(press)* You screenshot the question. *(press)* Paste it back in. *(press)* While you wait, you start one of
your other projects. *(press)* Then another. *(press)* And another. *(press)* Soon you have ten."
**7 ·** > "But you don't need ten windows. *(press)* You just need the one next step."

**8 · There's always a tool for more.** > "A new model every week. *(press)* A new AI tool for every niche. *(press)* A new
hack to stay on top of it all. *(press)* Our ambitions are being held back by tools that seem to only complicate them."
*(a statement now, not a quote; the pile is made-up launches, tools and hacks, no real names or logos)*

**9 · Built to do it with you.** > His words: "Instead of a tool that does more, we built one that does it with you." *(press, one design decision each)*
> "It works where your work is: nothing opens in a chat window; no screenshots, no pasting, no explaining it all again.
> *(press)* Two friends, two jobs: Pickle keeps your context, so you don't have to; Blicky shows you, right on your screen.
> *(press)* It asks before it acts: a check or a no before it switches projects, closes out a goal or hands work to Droid.
> *(press)* One step at a time: it teaches the next step and holds back the answer until you ask; its voice waits for each
> mark. *(press)* Introducing pickje." *(his mission line under it: "It's not another agent. It's a new paradigm for
> collaborative work between humans and technology.")*
- Grounding: `docs/PRODUCT.md`; pickje specs 0012, 0014, 0006; `app/shell/README.md`; his-words.md:86-88 (his quotes,
  spelling fixed). Decision titles and lines are DRAFT.

## Meet pickje (slides 10–12)

**10 · Title.** > "pickje sees what you mean. *(press)* A computer-use AI collaborator that works with you on your own screen
and manages your context, so you can turn messy projects and ambitious thoughts into the next actionable step."

**11 · Meet Pickle.** > "Meet Pickle. *(press)* Your context brain. *(press)* It keeps track of every project: the north star, the last stop,
> and the next step. *(press)* Every project you start is a tab." *(his final notepad, live; the desk lamp tab opens its page)*
- His words, lightly cleaned. The pad's text is the staged demo projects (pickje `app/recall/staged.ts`, synthetic).

**12 · Meet Blicky.** > "Meet Blicky. *(press)* He does the work on your screen. *(press)* He draws it out with you. *(press)* And keeps every
> diagram in his scratchpad, so your thoughts stay organized." *(the real marks draw across the page; then his scratchpad)*
- His words, lightly cleaned ("with you" is DRAFT).

## The demo (slides 13–15, live in between)

**13 · The onboarding.** > "Here's the onboarding. *(a press per beat, on the app's real frames)* Shake your cursor to wake Pickle. *(press)* Pickle
> pops up at your cursor. *(press)* He tests your mic: he asks your name. *(press)* Your words show as heard. *(press)* Little
> Blicky pops up. *(press)* Circle as you talk: it watches what just happened and answers your points, one by one. *(press)*
> Each circle leaves a numbered pin. *(press)* Ask about something from earlier: it catches you up on what was on your
> screen."
- His words, lightly cleaned; the bubbles are the app's own lines (`assets/onboarding/beats.json`, pickje `docs/nap/story`).
  The shaking cursor is drawn over the intro frame (the shake frame is the same image as the card).

**14 ·** > "A quick live demo of the onboarding." *(his plan: live up to the circling, then straight to the o-chem worksheet)*

**15 · The scenarios.** > "We'll show it on 4 screens. *(press)* The o-chem worksheet: Blicky teaches it step by step and draws the structures,
> but never gives the answer away. *(press)* The Cal Student Hub: 'Pickle, I'm overwhelmed.' Pickle points at what's due
> first, and gives her one next step. *(press)* The stocks page: why did it drop 18% the day after earnings? Blicky circles
> the drop, then the headline that explains it. *(press)* A design critique: what's wrong with this layout? Blicky marks the
> worst problems right on the page. *(press)* No new chats: Pickle routes each one to its project; you just say what you
> want to do. *(press)* Now, live." *(each screen's line draws to its tab on Pickle's pad; no new project is made)*
- His point: "we should be able to visualize how we aren't creating more projects. The pickle just knows how to route to
  each one". Sources: `docs/PRODUCT.md`; pickje `demo/chaos/spec.txt` §1–2; `demo/stocks/index.html`; the lab's E5 page.
  Questions, lines and tab names otherwise DRAFT.

## How it works (slides 16–18)

**16 · Fifteen verbs.** > "The whole product is built on 15 verbs." *(each with what it means for you, e.g. Catch: it hears you, and knows what
> you were looking at when you said it)* *(a press per sponsor: the verbs it carries light up, with how we use it, the
> files, and its numbers)* Cartesia, the backbone of Catch and Show: 499 ms to go quiet when you talk, 183 ms to first
> audio. *(press)* Moss, Route and Recall: 6–7 ms to route on its own, 16/16 routed right. *(press)* Convex, Hold: 6 ms from
> write to card. *(press)* Elastic, Bring back: 15/18 past questions in the top 3, staged. *(press)* Factory, Hand over:
> 8.1 s hand-over. *(press)* Mana, Curate: the idea log, 36/36 read back, staged. *(press)* Anthropic runs every verb: Opus
> writes every line and picks every mark, Haiku runs Pickle; $0.029 → $0.019 a turn with caching. *(press)* Microsoft:
> measured against real-world tasks, 36 live steps on the real screen."
- **Facts:** each panel cites its lines in `docs/PRODUCT.md` (and `docs/SPONSORS.md`, `docs/VERBS.md`,
  `docs/evals/2026-10-24-2/summary.txt`) in a code comment, with its caveat on the slide (outputs not kept, staged data,
  echo cancellation failed in the live runs, the mic failed so the words were handed in). Wording DRAFT.

**17 · Before and after.** > "A page, before Blicky. *(press)* The same page after Blicky: every mark drawn by the real app.
*(press)* It rings, points, works the number and names the part, right on the page."
- The images are from the app's marks gallery (pickje `app/shell/tools/gallery.mjs`): the real marks over a made-up page.

**18 · How we built it.** > "It runs in 3 layers. *(press)* On your Mac: Pickle and Blicky drawn in SwiftUI, shake and circle, the mic and its
> gate, Blicky's marks, the voice that waits for its mark, screenpipe's eyes. *(press)* The talk server, one turn: the
> door (127.0.0.1 only), the screen, the route, the turn, the voice, streamed back. *(press)* The brains and memory: Claude
> Opus is Blicky, Claude Haiku is Pickle; Cartesia, Moss, Convex, Elastic, Factory Droid, Mana."
- Real file, package and model names from the pickje repo (sources in comments in `Stack.tsx`). Wording DRAFT.

## 19 · Close
> His words: "Tonight, Mia started. Not with ten sessions, but with the one next step. *(press, the quick summary)* It
> remembers everything you're juggling. It gives you one next step, not a wall. It already works: 47/50 chemistry, kept the
> answer back 33/34 (1 slip), 16/16 routed right. *(press)* We've got you, Mia." *(the last image: Pickle and Blicky)*
- **Facts:** `docs/evals/2026-10-24-2/summary.txt` (latest live exam, two passes); `docs/PRODUCT.md:198` (16/16 routed).

## Appendix
**20 · The full exam** (for questions): 52% → 62% against the 80% bar (not passed), the five kinds, 1 reveal slip, the mic
caveat, and the parts measured on their own (16/16, 6 ms, 499 ms, 15/18, 8.1 s, $0.029 → $0.019).

---

## Out of the running order
Files kept, not shown: MiaStory, MeetCast, ShakeToWake, SeesFlow, NorthStar, HowItWorks, ItWorks, RealWorld, ClipOnboarding,
ClipScenarios, ClipLoop. Cut in the run-through: the use cases as skills (Learn/Plan/Build/Create/Invest), "every spec starts
as a sentence" and the repo counts, the "For years we thought…/neurotypical brains" lines on slide 5 (they stay in the Devpost
inspiration).

## His run-through (2026-10-25, 5:20 AM, verbatim)
"Okay, so we're gonna do a runthrough of the slides so that we know what we are going to be speaking and also what we want to cut out from the overall experience. So in the meantime, making a space for that. Okay, so in the meantime, this is Mia. Suppose she's. Okay, change the end apostrophe to N L I E. Propose to vs. sister. Okay, and then like everyone else, she's ambitious, she's smart, she's doing CAD, she's Learning to invest, she's teaching herself videos, but there's a lot of stuff stopping her. She has too many interests, too many projects, too many things she needs to do, so nothing starts. Okay, instead of going straight to the obvious solution, let's pull out the slide for it's not just Mia, and then go into how she has ADHD, and then go into research about the context switching, and basically say how like. Today's AI tools were, maybe find a more clear statement for what this could mean. But basically trying to figure out how context switching is extremely or more detrimental to somebody who lacks the ability to focus and so they have ambition, they want to do things. They're unable to do so, so have that be there, but keep the stats in there. And then we can show how in the market there's always a. And then we can then go into how. So the obvious solution is to use AI for help. Type out a question, answers with a wall text. Maybe you screenshot the question, paste it back. While you wait, you might start some of your other projects, and then maybe another, another, another, another, and soon you have ten. But you don't need ten windows. You just need one. The next, the one next step. Um, but there's always going to be a tool for more. Um, a new model every week, new AI tool for every niche, a new hack to stay on top of all. Um. Instead of having a quote here, maybe just say like, our ambitions are being held back by tools that seem to only complicate them. So instead of a tool that does more, we built one that does it with you. And then let's not make it learn, plan, build, create, invest because those are targeted towards the actual skills themselves. Our thing is more about AI collaboration. So we should talk about the more UX decisions behind why this must exist and what mental model it possesses to make this more of a human AI collaboration effort instead of it being just like an AI thing. But in the meantime, then we can just end it off on saying, introducing Pickle. Pickle sees what you mean, and it's a computer used AI collaborator that works with you on your own screen and manages your context. And then we'll say meet the cast meet Pickle. Use your context brain, keep track of every project, the north star, the last stop, and the next step. Very simple. Each project that you end up creating is a tab. And then you meet Blicky. He is basically your draw executor. He basically does the actions on your screen. He draws it out. He keeps every diagram in a scratch pad, so you can easily organize your thoughts into whatever Pickle and Blicky. So then here's the demonstration of the onboarding. Make it so that when include the shake your cursor to spawn in the pickle thing. That one was really cute. And then, Pickle pops up the cursor, shows that testing your mic, and then little Blicky will pop up, and then you can, you'll have the first feature you'll have is to be able to circle as you dictate, and it'll be able to watch the past footage and answer your questions, sequentially. And then you can also because it has context and you're able to reprime, uh, your thought process. To ask about something from earlier is designed so that you can resume context and then get caught up on what you were doing, especially what the things on your screen. Um, and then the next slide just saying so we're gonna go ahead and do a quick live demo of the onboarding. Ideally, this will probably only reach the stage of. the the circling one and I think we'll then have to just go straight to doing something more specific and then I think the first one we'll try is the OKM worksheet and then yeah so then we'll have the OKM worksheet the Cal Student Hub more basic stock page that we'll do live and then a design critique and then most importantly though, we should be able to visualize how we aren't creating more projects. The pickle just knows how to route to each one, and all you have to do is just, you know, reprime, what was it? Think what you want to do. I don't know, something like that. more specifically, go into the fifteen verbs. Show how the entire product is built on these fifteen verbs. go more into detail on what that specifically means for the UX. But then, when we're introducing how we're using each sponsor, be very specific about how we're optimizing it and how the sponsor is the backbone of this specific thing. Talk metrics, talk everything super important, very technical, and how it's being applied and why it's a core part of the repo. That way we're able to show how everything has a role and an important part of this process. But for the anthropic, anthropic is just what we use to run everything. and then Microsoft is be able to like measure against real world tasks. So then, we don't, like, we could have the proof at the in the appendix with all the exams and tests. That it was able to run and all the benchmarks that we ran, including cost, the droid, everything like that. But what we should show is the before and after, specifically of the chemistry one, where we showed before that's what looked like and after it can it was able to create diagrams like this, and then then go into more specific technical breakdown of Mac. Talk server and then the brains and memory. And then show how, and then we don't need the each spec starts as a sentence. We don't need the whatever. And then ended off with tonight. Mia started not with ten sessions, but with the one next step. This is a quick summary. Beautiful, beautiful, beautiful. And then ended up with we got you, Mia. And then make it so like the image at the end is the pickle and Blicky."

## His walkthrough (2026-10-25, 4:38 AM, verbatim)
"Okay, so make sure that the the like what she does is like 3D cap for car. She's learning to invest. She's editing videos, all those. So be more specific that these are different projects and like ways to organize context for like things that she wants to learn and things she wants to be ambitious about. And then I like the obvious thing. She patience. So while she waits, basically says she's going to start working on another one of her projects because it piques her interest. And then another one for how to video edit, and another one for how to do stocks. And soon she has ten sessions, and but she doesn't need ten. She just needs the one next step. And it's not just Mia. So basically talk about how these people have ADHD and how context switching and all these things that AI tools are currently designed for are very difficult to maintain. And so basically for that there's always a tool for more Have stacked screenshots of different releases of so many different niche models of AI tools, things to use, productivity hacks, all that. And then we don't need. And so basically just summarize the quote into just our ambitions are being held back by tools that only seem to complicate. So then show that. so as a new slide, so instead of a tool that does more, we build one that does it with you. And so the idea is, be a little bit more higher level about what it can do, like the main use cases. yeah, something cooler than that, I think. And then we're just gonna continue on for for what Pickje is, but Picture sees what you mean. So first, meet Pickle and Blicky. Or instead of saying Pickle, Picture sees what you mean. Maybe on the bottom say, "Computer use AI collaborator that can." that can, that works with you, helps you on your own screen, and manages your context, so that, something, something thinking, so that you can focus on the next actionable step or whatever thing like that. So you can turn your messy projects and ambitious thoughts into the next actionable step. so then we're going to introduce the cast, which is Meet Pickle. Basically, this is your context brand. It keeps track of your to-do listing, and then also include the visualization of its UI tab. And then this is Blicky, and show its scratchpad of like how it's able to draw diagrams and do all these different things. Then we're gonna do a the intro into the entire demo. Make it so that when I click the next tab, it will go into the next part of the demo. So then OB zero, OB one, OB two, OB three, OB. Four, B five. These are all going to be live, and make it so that they look as real to the live visualization as possible. But I basically just want to like briefly run through it, and then in the process, like probably the best thing to do would be to show how the onboarding looks end to end. And then just do like the first couple parts of it where it's like you tell it your name, and then you do the circle and ask it to explain what's on the two points. I think that's probably the two coolest ones. And then when I come back, I'll just like summarize it. It's ask for a goal things of that sort, and then I'll just continue. Let's say like, so we have a couple of other scenarios. We have the OKM worksheet thing, the thing in this, the thing there, three different things, design critiques. And then we'll do the live demo of how it interacts, creates diagrams, draws, and can do all these things. And then when we come back to the slide deck, we'll talk about how the seven parts, or we originally created fifteen verbs. I think here we should flush out how we have fifteen verbs of what it's capable of doing, and how each sponsor track is associated with each. And then the next slide. Basically show a full exam of how I was able to perform, and then more data about the whole thing that we built. Show the before and after of annotations. Show more tech stack related and some of the processes used to build this thing. Yeah, and then the things in the very end we can clear out just to save on what I think is final."

## His brief (2026-10-25, about 4 AM, verbatim)
"pull new changes for the slide deck. see how it looks and the information on it, and then update it with the new data and infroamtion. with a script to kind of base the brief story on. Ideally the preseentaiotn will have max 3 slides about hte problem ideally with something like start with idk whatever is relevant, then make sure you have data and reserach and personal story applied to it, and then the last story slide is about how theres always tools for morea nd the idea of ai is to do more, but what we need is somethgin more collaboritve huamn focuesd and doesnt mess with where your context goes. then have the clips from the demo cut and simualted to show each part. one being for onboarding, how it goes through the whoole flow iwth the real visualizaitons of it but cuter ui and slight movement zooming in an little and hwat not. and then all the differnet scnerairos and a hsort looping clip that shows how we talked to it and saw how it was able to execute each step properly. this is the ideal soemethign liek this. see how that fits and ensure youre styling the thign with te brand guidleines that we made"
