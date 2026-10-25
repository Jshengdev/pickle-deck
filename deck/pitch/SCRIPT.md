# pickje · the pitch script · draft 7 · 2026-10-25, about 5:50 AM

His second run-through (2026-10-25, 5:46 AM, verbatim at the end) sets the words; the first (5:20 AM) set the order and the
cuts. One idea per slide, one sentence per press; the sentence he says is the one on screen. About 3 minutes plus his live demo.

Labels: **His words** are verbatim (spelling fixed). **Fact** has its source. Everything else is **draft** for him to react to.
The slides are in `deck/src/pitch/index.tsx`; open `?deck=pitch` and press → through each slide's builds.

---

## Mia (slides 1–4)

**1 · Her picture.** *(a beat)*
**2 ·** > "This is Mia. *(press)* More specifically, she's Enlie's sister." *(he read it as "she's my sister": his call)*
**3 ·** > "Like anyone else, she's ambitious. *(press)* She's smart. *(press)* She's designing a car in 3D CAD, for her club.
> *(press)* She's learning to invest. *(press)* And she's teaching herself to edit videos. *(press)* But there's one thing
> that keeps stopping her."
**4 ·** > "She has too many interests. *(press)* Too many projects. *(press)* Too many things she needs to do. *(press)* So nothing
> starts."

## The problem (slides 5–8)

**5 · It's not just Mia.** > "Mia has ADHD, *(press)* like 15.5 million other U.S. adults. *(press)* Between 1,200 app
switches a day, nearly 4 hours a week go just to finding your place again. *(press)* And the average interruption costs
about 23 minutes. *(press)* Mia's ambition is there, but the start isn't."
- **Facts:** CDC, MMWR 73(40), Oct 2024 (15.5 M U.S. adults, 6.0%, a current diagnosis, self-reported); HBR, Aug 2022 (137
  people at 3 Fortune 500 companies); Gloria Mark, UC Irvine (one study, 36 workers). The last line is his reading.

**6 ·** > "The obvious solution: use AI for help. *(press)* She types out a question. *(press)* It answers with a wall of
text. *(press)* She screenshots the question, for more clarity. *(press)* And pastes it back in. *(press)* While she waits,
she starts another session. *(press)* Then another. *(press)* And another. *(press)* Soon there are ten, each a different
project."
**7 ·** > "But you don't need ten windows. *(press)* You just need the one next step."

**8 · There's always a tool for more.** > "A new model every week. *(press)* A new AI tool for every niche. *(press)* A new
hack to stay on top of it all. *(press)* Mia's ambition is being held back by tools that only complicate the process."

## Meet pickje (slides 9–14)

**9 ·** > "Instead of a tool that does more for you, we built one that does it with you."
**10 ·** > "Introducing pickje. *(press)* A computer-use AI collaborator that works with you."
**11 · Meet Pickle.** > "Meet Pickle. *(press)* Your context brain. *(press)* It keeps track of every project: the north star, the last stop,
> and the next step. *(press)* Every project you start is a tab." *(his final notepad, live; the desk lamp tab opens its page)*
- His words, lightly cleaned. The pad's text is the staged demo projects (pickje `app/recall/staged.ts`, synthetic).

**12 · Meet Blicky.** > "Meet Blicky. *(press)* He does the work on your screen. *(press)* He draws it out with you. *(press)* And keeps every
> diagram in his scratchpad, so your thoughts stay organized." *(the real marks draw across the page; then his scratchpad)*
- His words, lightly cleaned ("with you" is DRAFT).

**13 · Built to do it with you.** > *(the headline small on top; the five decisions as a list, then one per press)* His words: "It works where your work is.
> Nothing opens in a new chat window: no screenshots, no pasting. It's all on your screen. *(press)* Two friends, two jobs.
> One tracks everything for you; the other shows everything for you. *(press)* It asks before it acts. You stay in the
> driver's seat, especially when you switch projects. *(press)* One step at a time. *(press)* It manages your context for
> you: on-device routing puts each sentence in the right project in milliseconds; every project keeps its own memory, and
> Pickle updates it as you work."
- Grounding: `docs/PRODUCT.md`; pickje specs 0012, 0014, 0006; `app/shell/README.md`; `app/memory/README.md` (6–7 ms when
  Moss decides alone, 8 of 16 turns, 16/16 routed right; otherwise Claude routes: the caveat is on the slide). "Self-learning"
  is not claimed (the Learn verb is out for the demo); "Pickle updates it as you work" is the true version.

**14 · Where your context lives.** > "Every project keeps its context in its own folder. *(press)* Open a Claude Code session in any project, and go as deep as
> you like. *(press)* Pickle is the in-between: your words go, word for word, to where the code is." *(Mia's design feedback
> on her portfolio site goes from her, through Pickle, into that project's Claude Code terminal)*
- His point (5:46 AM): "The context is stored as basically their own dedicated repo… so that whenever you want to actually
  start a Claude code session for each individual project, you can still go in depth, and Pickle will be the in between".
- **Facts** (pickje repo): `app/service/cli.ts` (`attach` makes `<repo>/.pickje/`, hidden by `.git/info/exclude`;
  `session` starts Claude Code there; `handover` sends his words verbatim with `claude --resume`); `app/service/home.ts`;
  `app/service/projects.ts`; `app/service/memlog.ts`.
- **Caveat (his call how to say it):** `handover` is a command; a spoken hand-over in a live turn goes through
  `app/service/subject.ts` to Droid, or Claude Code when Droid isn't set up. No voice path calls `cli.ts handover` yet.

## The demo (slides 15–17, live in between)

**15 · The onboarding.** > "Here's the onboarding. *(a press per beat, on the app's real frames)* Shake your cursor to wake Pickle. *(press)* Pickle
> pops up at your cursor. *(press)* Test your mic: he asks your name. *(press)* Your words show as heard. *(press)* Little
> Blicky pops up, and tells you what he can do. *(press)* Circle anything on your screen and ask out loud: it watches what
> just happened and answers your points, one by one. *(press)* Each circle leaves a numbered pin. *(press)* Ask about
> something from earlier: it catches you up on what was on your screen."
- His words, lightly cleaned; the bubbles are the app's own lines (`assets/onboarding/beats.json`, pickje `docs/nap/story`).
  The shaking cursor is drawn over the intro frame (the shake frame is the same image as the card).

**16 ·** > "A quick live demo of the onboarding." *(live up to the circling, then straight to the o-chem worksheet)*

**17 · The scenarios.** > His words: "We ran it on 4 different things." *(press)* The o-chem worksheet: Blicky teaches it step by step and draws
> the structures, but never gives the answer away. *(press)* The Cal Student Hub: 'Pickle, I'm overwhelmed.' Pickle points
> at what's due first, and gives her one next step. *(press)* The stocks page: why did it drop 18% the day after earnings?
> *(press)* A design critique: what's wrong with this layout? *(press)* His words: "You don't need a new chat for each one.
> Pickle creates a tab for each, automatically." *(press)* Now, live." *(a new tab grows out of Pickle's pad as each line lands)*
- Sources: `docs/PRODUCT.md`; pickje `demo/chaos/spec.txt` §1–2; `demo/stocks/index.html`; the lab's E5 page. The questions
  and the per-screen lines are DRAFT.

## The technicals (slides 18–20)

**18 · Fifteen verbs, a press per sponsor.** > His words: "So now, onto the technicals." *(press 0: the whole product is built on 15 verbs, each with what it means for
> you)* "Cartesia Ink hears you, and Cartesia speaks for both characters. *(press)* Moss is the memory, and how the
> characters decide when to think, when not to, and when to stall for time. *(press)* Convex holds every step's data and
> keeps the card live, all local. *(press)* Elastic is the RAG: it indexes and finds past memories. *(press)* Droid takes the
> hand-over: each project's work, in its own session. *(press)* Mana curates our entries: ideas, decisions and reactions, in
> one log. *(press)* Anthropic runs the entirety of this product, and it works natively inside Claude Code. *(press)* And we
> measured it against real-world scenarios, to make sure it gives real value."
- His lines, lightly cleaned; where the repo differs (Convex "all the data", Droid "context management", Mana "testing,
  ideation, surprise"), the lead is the nearest true version and a comment in `Verbs.tsx` says why. Each panel keeps its
  technical detail and numbers with their caveats, cited to `docs/PRODUCT.md`.

**19 · Before and after.** > "A page, before Blicky. *(press)* The same page after Blicky: every mark drawn by the real app.
*(press)* It rings, points, works the number and names the part, right on the page."
- The images are from the app's marks gallery (pickje `app/shell/tools/gallery.mjs`): the real marks over a made-up page.

**20 · How we built it.** > "It runs in 3 layers. *(press)* On your Mac: Pickle and Blicky drawn in SwiftUI, shake and circle, the mic and its
> gate, Blicky's marks, the voice that waits for its mark, screenpipe's eyes. *(press)* The talk server, one turn: the
> door (127.0.0.1 only), the screen, the route, the turn, the voice, streamed back. *(press)* The brains and memory: Claude
> Opus is Blicky, Claude Haiku is Pickle; Cartesia, Moss, Convex, Elastic, Factory Droid, Mana."
- Real file, package and model names from the pickje repo (sources in comments in `Stack.tsx`). Wording DRAFT.

## 21 · Close
> His words: "Tonight, Mia started. Not with ten sessions, but with one next step. *(press)* It remembers everything
> you're juggling. It gives you one next step, not a wall. And it already works. *(press)* We've got you, Mia."
> *(the last image: Pickle and Blicky)*
- **Facts** under "it already works": `docs/evals/2026-10-24-2/summary.txt`; `docs/PRODUCT.md:198`.

## Appendix
**22 · The full exam** (for questions): 52% → 62% against the 80% bar (not passed), the five kinds, 1 reveal slip, the mic
caveat, and the parts measured on their own (16/16, 6 ms, 499 ms, 15/18, 8.1 s, $0.029 → $0.019).

---

## Out of the running order
Files kept, not shown: MiaStory, MeetCast, ShakeToWake, SeesFlow, NorthStar, HowItWorks, ItWorks, RealWorld, ClipOnboarding,
ClipScenarios, ClipLoop. Cut in the run-throughs: the use cases as skills; "every spec starts as a sentence" and the repo
counts; the "For years we thought…/neurotypical brains" lines (they stay in the Devpost inspiration); the tagline "pickje sees
what you mean." on the title (now "Introducing pickje.").

## His second run-through (2026-10-25, 5:46 AM, verbatim)
"Okay, this is Mia. more specifically, she's my sister. Anyways, like everyone else, she's ambitious, she's smart, she does 3D CAD, she learned how to invest, and she's teaching herself how to edit videos. But there's one thing that keeps stopping her. She has too many interests, too many projects, too many things that she needs to do, so nothing starts. and it's not just Mia. Mia has ADHD, like 15.5 million other people. But between the twelve hundred app switches per day, um, the, hmm, uh, it causes, um, and between the twelve hundred app switches per per day, it's nearly four hours spent find just to find your place again. And so with the average interruption costing about twenty three minutes, Mia's ambition is there, but the start isn't. The obvious solution: use AI for help. She might have a question. Type it out, get an answer. Screenshot the question for more clarity, and then paste it back in. And then while she waits, she might start another session, then another, and another, and soon you'll have ten, each a different project. But you don't need ten windows. You just need the next one step. There's always a tool for more. A new model every week, new model for every niche, and a new hack to stay on top of it all. So, and Mia's ambition is being held back by the tools that only complicate the process. So instead of a tool that does more, we built one that does it with you. So it works where your work is. Nothing opens in a new chat window, no screenshot, no pasting. It's all on your screen. Two friends, two jobs. We have two cute little buddies, each with its own dedicated task and way to work. One of them tracks everything for you, and the other one. shows everything for you. And then it asks before it acts. It keeps you in the driver's seat for most decisions, and it helps when you're switching projects and going. Okay. I think instead of having the what it does, instead of a tool that does more for you, we build one that does it with you. And then I think we should just introduce introducing Pickje, and then under the bottom of that say it's a computer use a collaborator that works with you, and then start with the whole, and then start with the whole Meet Pickle, Meet Blicky, and then go into the the instead of the tool that does it we built one that does it with you show like the. It works where your work is, your two friends one job, whatever, two friends two job. Acts before it acts, one step at a time. And then another key one is it manages the context for you, so it knows when to route and do self-learning and things of that sort. So like use a bit of the VC buzzwords that they love to swallow up. But anyways, just continuing on, there's meet the pickle. Okay, so ideally around this, then we go into like, okay, more of the live demo stuff. Here's the onboarding intro. Shake your cursor to wake up Pickle. Pickle pops up. Right your cursor. Test your mic. Your words are shown as heard, and then the little pickle pops up. It basically tells you what it's capable of, and then you can just start circling around your screen and use diction to basically ask what it is. So here's the thing. We're going to run it on. We ran it on four different things, and then you don't need a new chat for each one. It automatically creates tabs on in depth. Pickle screen. So now, onto the technicals. We use Cartesia ink and Cartesia for the voice. We've used Moss for the memory, beside how characters decide when to think and when to not and when to, stall for time. We use Convex to actually hold all of the data, and it's what updates because we want everything to be local. And we use Elastic as the rag to index and find. Past memories, hand over. We've used Droid to actually manage our context management. We then have manicured all our entries, testing, ideation, surprise. Anthropic basically runs the entirety of this product, and it works natively inside of Claude Code. And then we measured it against real world scenarios to ensure that there is real value provided. And so here's just a proof of concept of what a page looks like on Chemistry before and after a key session. It's capable of basically drafting and marking everything up. It runs in three different layers, specifically on on your Mac. So it's written in Swift and SwiftUI, without any third-party packages. The types the talk server is run on TypeScript, and the brain each has its own individual Java. So tonight. Mio started not with ten sessions, but with one next step. It remembers everything you're jungling. It gives you one next step, not a wall, and it already works. We've got you, Mio. Boom. And then this just appendix of different tests that we ran. But I think what I'm missing right now is something to say like where the context is stored. The context is stored as basically their own dedicated repo inside of the. Pickling, and the reason why we built it like that is so that whenever you want to actually start a Claude code session for each individual project, you can still go in depth, and Pickle will be the in between between sending a prompt from you to the actual Claude project itself. So you're able to take your design feedback and paste it exactly where the website code itself is at through the Claude code terminal. I think that was important point. But that's my read-through, and it's almost there."

## His run-through (2026-10-25, 5:20 AM, verbatim)
"Okay, so we're gonna do a runthrough of the slides so that we know what we are going to be speaking and also what we want to cut out from the overall experience. So in the meantime, making a space for that. Okay, so in the meantime, this is Mia. Suppose she's. Okay, change the end apostrophe to N L I E. Propose to vs. sister. Okay, and then like everyone else, she's ambitious, she's smart, she's doing CAD, she's Learning to invest, she's teaching herself videos, but there's a lot of stuff stopping her. She has too many interests, too many projects, too many things she needs to do, so nothing starts. Okay, instead of going straight to the obvious solution, let's pull out the slide for it's not just Mia, and then go into how she has ADHD, and then go into research about the context switching, and basically say how like. Today's AI tools were, maybe find a more clear statement for what this could mean. But basically trying to figure out how context switching is extremely or more detrimental to somebody who lacks the ability to focus and so they have ambition, they want to do things. They're unable to do so, so have that be there, but keep the stats in there. And then we can show how in the market there's always a. And then we can then go into how. So the obvious solution is to use AI for help. Type out a question, answers with a wall text. Maybe you screenshot the question, paste it back. While you wait, you might start some of your other projects, and then maybe another, another, another, another, and soon you have ten. But you don't need ten windows. You just need one. The next, the one next step. Um, but there's always going to be a tool for more. Um, a new model every week, new AI tool for every niche, a new hack to stay on top of all. Um. Instead of having a quote here, maybe just say like, our ambitions are being held back by tools that seem to only complicate them. So instead of a tool that does more, we built one that does it with you. And then let's not make it learn, plan, build, create, invest because those are targeted towards the actual skills themselves. Our thing is more about AI collaboration. So we should talk about the more UX decisions behind why this must exist and what mental model it possesses to make this more of a human AI collaboration effort instead of it being just like an AI thing. But in the meantime, then we can just end it off on saying, introducing Pickle. Pickle sees what you mean, and it's a computer used AI collaborator that works with you on your own screen and manages your context. And then we'll say meet the cast meet Pickle. Use your context brain, keep track of every project, the north star, the last stop, and the next step. Very simple. Each project that you end up creating is a tab. And then you meet Blicky. He is basically your draw executor. He basically does the actions on your screen. He draws it out. He keeps every diagram in a scratch pad, so you can easily organize your thoughts into whatever Pickle and Blicky. So then here's the demonstration of the onboarding. Make it so that when include the shake your cursor to spawn in the pickle thing. That one was really cute. And then, Pickle pops up the cursor, shows that testing your mic, and then little Blicky will pop up, and then you can, you'll have the first feature you'll have is to be able to circle as you dictate, and it'll be able to watch the past footage and answer your questions, sequentially. And then you can also because it has context and you're able to reprime, uh, your thought process. To ask about something from earlier is designed so that you can resume context and then get caught up on what you were doing, especially what the things on your screen. Um, and then the next slide just saying so we're gonna go ahead and do a quick live demo of the onboarding. Ideally, this will probably only reach the stage of. the the circling one and I think we'll then have to just go straight to doing something more specific and then I think the first one we'll try is the OKM worksheet and then yeah so then we'll have the OKM worksheet the Cal Student Hub more basic stock page that we'll do live and then a design critique and then most importantly though, we should be able to visualize how we aren't creating more projects. The pickle just knows how to route to each one, and all you have to do is just, you know, reprime, what was it? Think what you want to do. I don't know, something like that. more specifically, go into the fifteen verbs. Show how the entire product is built on these fifteen verbs. go more into detail on what that specifically means for the UX. But then, when we're introducing how we're using each sponsor, be very specific about how we're optimizing it and how the sponsor is the backbone of this specific thing. Talk metrics, talk everything super important, very technical, and how it's being applied and why it's a core part of the repo. That way we're able to show how everything has a role and an important part of this process. But for the anthropic, anthropic is just what we use to run everything. and then Microsoft is be able to like measure against real world tasks. So then, we don't, like, we could have the proof at the in the appendix with all the exams and tests. That it was able to run and all the benchmarks that we ran, including cost, the droid, everything like that. But what we should show is the before and after, specifically of the chemistry one, where we showed before that's what looked like and after it can it was able to create diagrams like this, and then then go into more specific technical breakdown of Mac. Talk server and then the brains and memory. And then show how, and then we don't need the each spec starts as a sentence. We don't need the whatever. And then ended off with tonight. Mia started not with ten sessions, but with the one next step. This is a quick summary. Beautiful, beautiful, beautiful. And then ended up with we got you, Mia. And then make it so like the image at the end is the pickle and Blicky."

## His walkthrough (2026-10-25, 4:38 AM, verbatim)
"Okay, so make sure that the the like what she does is like 3D cap for car. She's learning to invest. She's editing videos, all those. So be more specific that these are different projects and like ways to organize context for like things that she wants to learn and things she wants to be ambitious about. And then I like the obvious thing. She patience. So while she waits, basically says she's going to start working on another one of her projects because it piques her interest. And then another one for how to video edit, and another one for how to do stocks. And soon she has ten sessions, and but she doesn't need ten. She just needs the one next step. And it's not just Mia. So basically talk about how these people have ADHD and how context switching and all these things that AI tools are currently designed for are very difficult to maintain. And so basically for that there's always a tool for more Have stacked screenshots of different releases of so many different niche models of AI tools, things to use, productivity hacks, all that. And then we don't need. And so basically just summarize the quote into just our ambitions are being held back by tools that only seem to complicate. So then show that. so as a new slide, so instead of a tool that does more, we build one that does it with you. And so the idea is, be a little bit more higher level about what it can do, like the main use cases. yeah, something cooler than that, I think. And then we're just gonna continue on for for what Pickje is, but Picture sees what you mean. So first, meet Pickle and Blicky. Or instead of saying Pickle, Picture sees what you mean. Maybe on the bottom say, "Computer use AI collaborator that can." that can, that works with you, helps you on your own screen, and manages your context, so that, something, something thinking, so that you can focus on the next actionable step or whatever thing like that. So you can turn your messy projects and ambitious thoughts into the next actionable step. so then we're going to introduce the cast, which is Meet Pickle. Basically, this is your context brand. It keeps track of your to-do listing, and then also include the visualization of its UI tab. And then this is Blicky, and show its scratchpad of like how it's able to draw diagrams and do all these different things. Then we're gonna do a the intro into the entire demo. Make it so that when I click the next tab, it will go into the next part of the demo. So then OB zero, OB one, OB two, OB three, OB. Four, B five. These are all going to be live, and make it so that they look as real to the live visualization as possible. But I basically just want to like briefly run through it, and then in the process, like probably the best thing to do would be to show how the onboarding looks end to end. And then just do like the first couple parts of it where it's like you tell it your name, and then you do the circle and ask it to explain what's on the two points. I think that's probably the two coolest ones. And then when I come back, I'll just like summarize it. It's ask for a goal things of that sort, and then I'll just continue. Let's say like, so we have a couple of other scenarios. We have the OKM worksheet thing, the thing in this, the thing there, three different things, design critiques. And then we'll do the live demo of how it interacts, creates diagrams, draws, and can do all these things. And then when we come back to the slide deck, we'll talk about how the seven parts, or we originally created fifteen verbs. I think here we should flush out how we have fifteen verbs of what it's capable of doing, and how each sponsor track is associated with each. And then the next slide. Basically show a full exam of how I was able to perform, and then more data about the whole thing that we built. Show the before and after of annotations. Show more tech stack related and some of the processes used to build this thing. Yeah, and then the things in the very end we can clear out just to save on what I think is final."

## His brief (2026-10-25, about 4 AM, verbatim)
"pull new changes for the slide deck. see how it looks and the information on it, and then update it with the new data and infroamtion. with a script to kind of base the brief story on. Ideally the preseentaiotn will have max 3 slides about hte problem ideally with something like start with idk whatever is relevant, then make sure you have data and reserach and personal story applied to it, and then the last story slide is about how theres always tools for morea nd the idea of ai is to do more, but what we need is somethgin more collaboritve huamn focuesd and doesnt mess with where your context goes. then have the clips from the demo cut and simualted to show each part. one being for onboarding, how it goes through the whoole flow iwth the real visualizaitons of it but cuter ui and slight movement zooming in an little and hwat not. and then all the differnet scnerairos and a hsort looping clip that shows how we talked to it and saw how it was able to execute each step properly. this is the ideal soemethign liek this. see how that fits and ensure youre styling the thign with te brand guidleines that we made"
