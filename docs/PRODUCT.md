# pickje

Johnny's Cal Hacks 13.0 entry (Fri 10-23 to Sun 10-25, 2026). It's the first layer of testing for Blicky: a working
example built during the hacking period, using what will matter to the end product. The repo started empty on 10-23
after 18:00 PDT, and no code in it comes from before the event.

In his words, typed 2026-10-23: "I want to start empty and fresh but moving over the important context in that moment
so we have a usable state."

## What it is

pickje is a companion that lives by your cursor on your Mac. You're stuck on something on your screen (a worksheet, a
model, a page), so you shake the pointer, point or circle, and ask out loud. Two characters answer:

- **Pickle**, the context brain backstage: it knows which of your projects this is, keeps each project's memory, and
  speaks first, in its own voice, while the answer is still being thought.
- **Blicky**, the tutor on your screen: it flies to the spot, draws on your actual document (rings, curved arrows, labels,
  a worked panel, a molecule drawn live from SMILES), and talks you through one step at a time, its voice waiting for
  each mark to land. It never gives away a result you haven't reached.

Nothing opens in a chat window: the explanation happens on top of the material you're working on. The demo is an
organic chemistry worksheet (an NMR structure question and an ester-forming mechanism), but nothing in pickje is
chemistry-specific: the drawing primitives, the project memory and the voice work on any screen.

**How it was tested.** A live exam drives the real app on the real screen: it opens the worksheet in Preview, moves the
real pointer, circles and shakes, speaks each question aloud so pickje's own microphone hears it, and a strict judge
(Claude Opus) grades what screenpipe recorded against the demo's written rubric. First full run: 52% of the rubric's
criteria, 0 answers given away early, 20/21 chemistry criteria (docs/evals/2026-10-24-1). That run had demo examples in
its prompts (since removed; the record says which), so it isn't a clean number. The pass bar is 80% over two runs.

## Live mode: one continuous demo across judging panels

`bin/pickje --live` runs pickje's demo profile: its own projects, its own Convex record and its own memory names, so a
demo never mixes with real work and nothing resets between panels. Each demo on an assignment is a **session** Pickle
opens and closes from context: the first question about an assignment opens it; "that's it for this one", moving to
other work, or ten quiet minutes close it with a one-line summary. When a later panel brings the assignment back, Pickle
recaps the last session in one breath, and "show me how you did it last time" (or "what did the last panel see") replays
that session's marks and both voices on screen from the record. Pickle's card shows a quiet LIVE banner and the session
timeline. This follows BMAD v7's file principles: the same files at the same places re-prime every session (the
project's desk and library), one writer (Pickle), the verbatim trail of his words, and one active initiative at a time.

## How pickje uses its sponsors, and how it was designed around what each one offers

pickje's job splits into verbs (docs/VERBS.md), and each sponsor carries the verb it's built for. Every number below was
measured on this Mac; the before/after table is docs/sponsor-test/metrics.md.

### Anthropic: Claude is both brains, and the teacher (Teach)
Claude Opus 5.5 writes every turn Blicky speaks and decides every mark it draws, from the screenshot and your words;
Claude Haiku 5.5 runs Pickle's quick calls (naming a project, rewriting its memory). We designed the tutor around what
Claude does well and where it can fail: a step-by-step rule against giving answers away (16/16 reveal criteria in the live
exam), a strict Opus judge of every step, prompt caching on the stable rules (Blicky's cost per turn $0.029 → $0.019), and
no silent provider swap: when Claude doesn't answer, Pickle's panel says who did and why. → app/brain/README.md

### Cartesia: a real conversation, both ways (Show)
The worst moment of asking a question is the silence while the model thinks, and the worst moment of being answered is
not being able to cut in. pickje uses Sonic's streaming over one kept WebSocket with **two contexts**: Pickle speaks the
moment it knows the project, in its own voice (a line Moss writes about what's at your pointer), while Blicky's brain is
still thinking; Blicky follows in a different voice. Cartesia's **word timestamps** hold each sentence until the mark it
belongs to has its ink, so pen and voice stay in step; each line can carry a tone and speed. **Ink** is the ear: its turn
detection lets you pause mid-sentence without losing your turn (a 1.6 s pause stays one turn, where the local model split
it), and the moment you start talking Blicky goes quiet (median 499 ms from your first sound), its cut-off answer kept
for "go on". Median silence before the first word: 14.9 s → 2.4 s; end of your speech to your words: 1.47 s → 1.17 s. The
mic streams to Cartesia only after you shake Pickle awake, closes after 60 s of quiet, and Pickle's panel says "listening
· voice goes to Cartesia" the whole time. Setup, the features used and known limits: app/voice/README.md

### Moss: the working memory on the Mac (Route, Recall)
Every sentence you say has to land in the right project, fast. Moss runs inside the talk server with two warm sessions
(every project's memory, and the last hours of screen text) and answers three queries per sentence in milliseconds: when
the words or the window clearly name one project, Moss picks it and the routing model never runs (7 ms instead of about
1.3 s, 16/16 routed right either way); when it's unsure, Claude decides among Moss's top three, never a silent default.
The same sessions hand Blicky the few older lines that match what you just said, find "that thing from before" across
4,400+ screen chunks in 3–6 ms, hold the live shared context Pickle, Blicky and Droid all read, and Moss's fast inference
writes Pickle's short "here's what I see" line while Opus thinks. → app/memory/README.md

### Convex: Pickle's record, live (Hold)
Each step Pickle takes (routing, making a project, rewriting its memory after the answer, saving a note and your
reaction) is one Convex mutation on a local deployment, so a turn's whole memory update lands as one transaction and the
card never shows half a turn. The talk service holds one reactive query and streams it to Pickle's card, which updates in
place while Blicky is still talking: 6 ms from Pickle's write to the card (before: it never updated while open). It runs
with no account, bound to this Mac. → app/convex/README.md

### Elastic: the library across days (Bring back)
Coming back to a project after a gap, you shouldn't have to re-explain it. An Elastic Cloud Serverless index embeds what
was said, decided and disliked, and an **Agent Builder** agent, Pickle's archive, answers over it with a hybrid ES|QL
search and four ES|QL tools (decisions since, disliked notes, time on, where it stopped), also on the project's MCP
endpoint. After 8+ hours away, it re-primes Blicky ("friday you decided …; next was …"); when the last hour of screen
doesn't have what you mean, the archive answers from earlier sessions. On a staged question set: 15/18 found in the top 3
(today's path can reach 9 of 18 at all), 224 ms. Only staged data goes up until he says otherwise. → app/recall/README.md

### Factory: Droid does the project's work (Hand over)
Pickle decides, Droid acts, Blicky narrates. A handed-over task, or a project's next step you approve out loud, runs on
the Droid SDK in that project's folder: Droid plans first and says the task back ("got it: …"), nothing is written until
that's approved, its only writes go through three tools pickje serves and fences to the folder, every step streams, and
each run leaves a receipt (time, turns, credits). What Droid draws joins the images Blicky can place and point at.
Hand-over round trip 8.1 s with 9 visible steps (before: 7.1 s, invisible). Where and how Droid is used, its controls and
limits: app/service/DROID.md

### Mana: the idea log a judge can open (Curate)
Each project's ideation (your words, what was decided and why, notes with your reaction) is published through Mana's
API as a Mana app, **Pickle's idea log**, with a timeline per project. Today it holds the staged demo log (36 entries);
nothing real leaves the Mac. → app/mana/README.md

### Microsoft, Built for the Real World: measurable and trustworthy (Measure)
The whole product is the entry: an agent that does the real job end to end on a real screen. It's measured the way it
would be in production (a live, native exam graded against a written rubric, committed under docs/evals/), and every turn
says what left the Mac (a trust line on Pickle's card: "screenshot + text → Claude · 1 crop → Jev · 31 words → Cartesia ·
nothing to Elastic or Mana"). Where data goes, the guards and what isn't covered yet: docs/TRUST.md

## Where things are

- How to work here: `CLAUDE.md`; the first message for the build window: `START.md`
- His words, verbatim, one file per spec item: `docs/spec/`
- The verbs and what runs each: `docs/VERBS.md`; sponsors' before/after: `docs/sponsor-test/metrics.md`
- Every request and what verified it: `docs/TRACKER.md`
- Dependencies and what each is for: `docs/CREDITS.md`
- The context moved over from clicky-module, in our own words: `docs/context/`
- The app: `app/shell` (Swift, macOS); the talk service: `app/service`; the brain: `app/brain`; memory: `app/memory`
  (Moss), `app/convex`, `app/recall` (Elastic); voice: `app/voice` (Cartesia); the chemistry demo, its judge and the live
  exam: `demo/chemistry/`
