# pickje's sponsors: what each one does

His rule (10-24): "just ensure that each sponsor is a meaningful aspect of the project". The track quotes are from
docs/research/sponsor-tracks.md, sponsor-droid-cartesia.md and sponsor-data-memory.md (Hive and Devpost, fetched 10-23 and
10-24). Status is as of 10-24, about 1 PM; the Anthropic and Microsoft rows as of about 6 PM.

Every sponsor gets the same three tests:

- **Does it carry a job nothing else does?**
- **What does pickje lose without it?** If the answer is "nothing", it's bolted on.
- **Can a judge see it working in the demo?**

## The map

| Sponsor | Its job in pickje (one sentence) | Without it | Seen in the demo | Status |
|---|---|---|---|---|
| **Anthropic** | Claude is both brains. Blicky's every line and mark on Opus 5.5 (his pick), Pickle's routing (when Moss can't decide), new projects and memory rewrites on Haiku 5.5, and the chemistry judges on Opus 5.5. | No answers, no marks, no memory upkeep, no judge. | Every turn. | Built 10-24 on the Anthropic API (app/brain/README.md "Claude in pickje"): prompt caching on each stable system prompt, cost and cache counts in every turn's timings (Blicky median $0.029 → $0.019 a turn with a cache read; `node app/brain/test/claude-check.ts`), and no silent fallback: a call Claude didn't answer is a `brain` event and a note in Pickle's panel. Live exam: reveal 16/16, chemistry 20/21 (docs/evals/2026-10-24-1). Not built: drawing through strict Claude tools, a check before Blicky speaks. |
| **Microsoft, Built for the Real World** | The whole product is a production-minded agent for students' problem sets: measured on his real screen, and clear about what it sends. | The evidence that it helps and can be trusted: the committed eval and the trust line. | The full flow end to end; the card's trust line ("left this Mac: screenshot + text → Claude · ..."). | Built 10-24: the first full live exam on his screen is committed (docs/evals/2026-10-24-1: 52% of criteria, 0 reveal slips, pass bar not passed; `node docs/evals/save.ts` keeps later runs), every turn emits a `trust` event that Pickle's card shows from Convex, and docs/TRUST.md maps the data flow, guards and threat model. Not built: no Microsoft service is used (Foundry Local, Prompt Shields), and no student has timed it yet. |
| **Moss** | Pickle's live working memory on the Mac. Every sentence is routed to its project, and the few snippets for Blicky's brief are picked in milliseconds. | Routing goes back to a 2–5 s brain call per turn, and "this/that/earlier" across apps goes back to keyword search. | You switch tabs and speak, and the right project is picked at once. | Built (10-24): the talk server holds one Moss client; every turn routes on Moss first (6–7 ms median when Moss decides, 8 of 16 projects-check turns; Claude, shown Moss's top 3, takes the rest; 16/16 right), the brief gets Moss's snippets, "earlier" queries the warm screen session (app/memory/README.md). |
| **Convex** (local) | Pickle's record. Every Pickle step is one Convex mutation (a turn's memory commits as one transaction), and the talk service holds the live query that streams each change to Pickle's card. | The card would poll the project files; there'd be no live sync. | Click Blicky: the card shows the project, and it changes as you work. | Built 10-24 (local, no account): writes through Convex, live card via GET /watch, 6 ms median to the card callback (`node app/convex/live-check.ts`; app/convex/README.md). The card hasn't been watched live on his screen yet. |
| **Elastic** (Agent Builder, Serverless) | The recall library. Situations, moments, screenshots and his information are embedded and searchable, so a session re-primes from history ("what did I decide Friday?"). | The long horizon is limited to one project's hot files; there's no search across everything you've done. | You ask something from days ago and it answers from the library. | Built 10-24 on staged data (app/recall/README.md): index `pickje-recall` (semantic_text on jina-embeddings-v5-text-small), Agent Builder agent `pickle-archive` with an ES\|QL hybrid tool and four ES\|QL tools; Bring back re-primes the brief after an 8 h gap (543–679 ms); the earlier turn asks the agent past the last hour. 18 staged questions: hybrid hit@3 15/18 vs 9/18 reachable today; agent 5/5 right, median 10.1 s (`node app/recall/test/recall-check.ts`). Only staged data and projects all by "test" go up; his words, notes and captions go up only after his yes (`PICKJE_RECALL_REAL=yes`); screenshots never. |
| **Factory, Droid SDK** | Blicky's hands. A project's actual work (files, notes, research) runs on Droid, triggered by Pickle, with its plan and steps shown in the card. | The work stays in Claude Code sessions, which are invisible to the judges. | Hand over a task, then watch Droid's steps arrive in the card. | Built: hand-overs run on Droid (plan said back first, writes fenced to the folder, receipts); Pickle's next step on a spoken yes (PICKJE_DROID_NEXT=1, on in .env). In the demo arc (his click 10-24, "Build it"): after Blicky explains a step, "can you make me a practice problem like this?" → Pickle offers → his yes → Droid draws 1 to 3 molecules from SMILES through a fourth fenced tool (draw_structure) and saves the practice set as a note, which Blicky can place and teach from; its "got it:" line, steps and receipt (time, turns, credits) are live on the card through Convex (droid_steps). Measured: 33.7 s, 2,942 credits, 3 molecules + 1 note (app/service/test/droid-practice-check.ts). Claude Code stays the fallback. |
| **Cartesia** | The voice of the conversation. Blicky and Pickle speak in two voices from Cartesia's library and trade lines. Your mic stays on the Mac. | Captions only. The back-and-forth he asked for isn't there. | Every line Blicky and Pickle say. | The voice is built (C3) but has never been called (no key). The two voices are not built. |
| **Mana** | The idea log. Each project's ideation is kept as a time log (his words verbatim, decisions, notes with his reactions) and published as a Mana app judges can open and browse (his click, 10-24). | The documentation and ideation story has no home a judge can open, and the +10 is lost. | Judges open the Mana app and browse a project's idea log. | Not built. pickje writes the log; it's synced into Mana by its chat import (no public API), as we go. |
| ~~Spacetime~~ | Out, his call ("the one im considering the farthest"). | | | |

## What each track asks for, and the risk if we skip it

- **Factory:** "Droid should do real work in the running product, not just help you write code. The repo README should
  explain where and how Droid is used." What scores poorly: "A chatbot wrapper with Droid added on." **Risk:** if Droid
  only mirrors what Claude Code already does, it reads as added on. So Droid gets the project work, and its steps must
  be visible in the card.
- **Cartesia:** "Voice should be core to the product–not just a feature added for the demo." The README needs to cover
  setup, the Cartesia features used and known limitations. **Risk:** captions as the main way to read a reply would
  make the voice look optional.
- **Moss:** the example is "Personal Agent: Agent that remembers you, works across your apps". **Risk:** none if routing
  runs through it on every turn.
- **Convex:** reactive state. **Risk:** if the card doesn't subscribe live, Convex is just a database copy.
- **Elastic:** "Best use of the Elastic Agent Builder on a Serverless instance". **Risk:** the cloud gate, and his data
  leaving the Mac.
- **Mana:** "+10 if your project lives inside Mana as an app or agent a judge can open and use". **Risk:** no API, so it
  has the least to stand on.
