# pickje

Johnny's Cal Hacks 13.0 entry (Fri 10-23 to Sun 10-25, 2026). It's the first layer of testing for Blicky: a working
example built during the hacking period, using what will matter to the end product. The repo started empty on 10-23
after 18:00 PDT, and no code in it comes from before the event.

In his words, typed 2026-10-23: "I want to start empty and fresh but moving over the important context in that moment
so we have a usable state."

## What it is

pickje is a companion that lives by your cursor on your Mac. You're stuck on something on your screen (a worksheet, a
model, a page), so you shake the pointer, point or circle, ask out loud, and shake again to send it (a pause never
cuts you off). Two characters answer:

- **Pickje**, the context brain backstage: it knows which of your projects this is and keeps each project's memory.
  It stays quiet, and cuts in only to check where your words go (a switch to another project, or a new one) or before
  it closes something out toward your north star: one short question in its own voice, and a check-or-no popup you
  tap or answer out loud.
- **Blicky**, the tutor on your screen: it flies to the spot, draws on your actual document (rings, curved arrows, labels,
  a worked panel, a molecule drawn live from SMILES), and talks you through one step at a time, its voice waiting for
  each mark to land. Its rule is to hold back a result you haven't reached until you ask for it.

Nothing opens in a chat window: the explanation happens on top of the material you're working on. The demo is an
organic chemistry worksheet (an NMR structure question and an ester-forming mechanism), but nothing in pickje is
chemistry-specific: the drawing primitives, the project memory and the voice work on any screen.

**How it was tested.** A live exam drives the real app on the real screen: it opens the worksheet in Preview, moves the
real pointer, circles and shakes, says each question out loud with macOS `say` (or hands the words in as heard when the
mic can't), and a strict judge (Claude Opus) grades what screenpipe recorded against the demo's written rubric. The
latest committed run, two passes over both demos with 33 steps judged (docs/evals/2026-10-24-2): **62%** of the rubric's
criteria, reveal 33/34 with **1 slip**, chemistry 47/50, visual placement 41%. The pass bar is 80% over two runs with no
slips, so it **has not passed**. In that run the mic failed to start on every wake, so every step's words were handed
in (the mic now retries without voice processing, 776c67d; seen working once in a live onboarding test, not yet
re-measured in an exam). The first run (docs/evals/2026-10-24-1, 52%) still had demo examples in its prompts. A
second eval writes fresh problems on 13 kinds of screen and runs Blicky on them blind: 49–51% of criteria. Its leak
check over all 668 requests flagged 9, all in one batch; the report traces them to Blicky's own earlier lines, but the
capture files weren't kept, so that reading can't be re-checked (docs/evals/generated-sweep-2026-10-24/report.md).

## Live mode: one continuous demo across judging panels

`bin/pickje --live` runs pickje's demo profile: its own projects, its own Convex record and its own memory names, so a
demo never mixes with real work and nothing resets between panels. Each demo on an assignment is a **session** Pickje
opens and closes from context: the first question about an assignment opens it; "that's it for this one", moving to
other work, or ten quiet minutes close it with a one-line summary. When a later panel brings the assignment back, Pickje
recaps the last session in one breath, and "show me how you did it last time" (or "what did the last panel see") replays
that session's marks and both voices on screen from the record. Pickje's card shows a quiet LIVE banner and the session
timeline. This follows BMAD v7's file principles: the same files at the same places re-prime every session (the
project's desk and library), one writer (Pickje), the verbatim trail of his words, and one active initiative at a time.

## How pickje uses its sponsors

pickje's job splits into verbs (docs/VERBS.md), and each sponsor carries the verb it's built for. Every number below was
measured on this Mac and points at the run behind it: a committed eval under `docs/evals/`, or a check's own output kept
in `docs/evals/receipts/` (what each receipt backs: docs/evals/README.md). Before/after for every sponsor:
docs/sponsor-test/metrics.md. File pointers are `file:line` as of 10-24, 11:30 PM.

| Sponsor | Verb | What it does for the student | One number, and where it's from |
|---|---|---|---|
| **Anthropic** | Teach | Claude writes every line Blicky says and picks every mark it draws | Blicky's cost per turn $0.029 → $0.019 with prompt caching (receipts) |
| **Cartesia** | Show, Catch | Two voices; each line waits for its pen mark; Ink hears you and lets you cut in | Pickje speaks a median 2.6 s after the words are in, Blicky 8.5 s (live exam run 2) |
| **Moss** | Route, Recall | Your words land in the right project in milliseconds; follow-ups know what's drawn | 6 ms to route when Moss decides, against 1.3 s for a model call (metrics) |
| **Convex** | Hold | Pickje's card moves while Blicky talks, one transaction per step | 6 ms from Pickje's write to the card's callback (receipt) |
| **Elastic** | Bring back | Come back after a gap, or at a new panel, and it picks up where you stopped | 15–16 of 18 past questions found in the top 3; the brief alone holds 9 (receipts) |
| **Factory** | Hand over | Say yes and Droid makes a practice set with new molecules Blicky can teach from (switch `PICKJE_DROID_NEXT=1`, off by default) | Done in 33–53 s, 2–3 molecules and a note, 3 runs (receipts) |
| **Mana** | Curate | The idea log, published as a Mana app | 36 entries in his Mana space, not public yet (status read) |
| **Microsoft** | Measure | The whole product, graded live on a real screen, and clear about what it sends | 62% of the rubric over two live runs; pass bar not passed (docs/evals) |

### Anthropic · Claude is both brains, and the teacher

Claude Opus 5.5 writes every turn Blicky speaks and decides every mark it draws, from the screenshot and your words;
Claude Haiku 5.5 runs Pickje's quick calls (routing when Moss can't decide, naming a new project, rewriting its memory).

**Who it's for.** Students working problem sets alone at a Mac who get stuck between steps; the demo is an organic
chemistry worksheet. No student has used it yet, and no course or group is named yet.

**For the student.** A tutor that explains on top of your own worksheet, one step at a time, and holds back the result
until you ask for it.

**How it's built.** The Messages API over plain `fetch`, streamed, no SDK (`app/brain/providers/anthropic.ts`).
- **Prompt caching:** the stable rules go first as a `cache_control: {type: "ephemeral"}` block (`systemOf`,
  anthropic.ts:61-70). Blicky's turn caches talk.md up to the project's brief (`talkPrompt`, app/service/turn.ts:866);
  Pickje's route, make and close prompts are cached whole (`cacheSystem: true`, app/service/projects.ts:355, 470, 628).
- **Per model:** the least thinking each model allows (`thinkingFor`, :33), `output_config.effort: "low"` (:98), `usage`
  read from the stream and priced per call (`PRICES` :44, `costOf` :52), and `stop_reason: "refusal"` raised as an error
  so the chain records it and another provider answers (:169); text streamed before the refusal has already reached the
  parser.
- **No silent provider swap:** a call Claude didn't answer becomes a `brain` event with `fallback: true`, and Pickje's
  panel says who answered and why (`app/brain/chain.ts:113-121`, `fallbackNote` :90; the panel note,
  `app/shell/Sources/pickje/Talk.swift:498`). The fallback's answer is still spoken.
- **A spoken budget in code:** Blicky says at most about 30 words a turn; a line past it isn't said and its marks still
  draw (`say_dropped`, turn.ts:354). The first line is always said, whatever its length.
- **The judges:** Opus 5.5 with `effort: "high"` and the server-side refusal fallback (`anthropic-beta:
  server-side-fallback-2026-07-01`, `fallbacks: "default"`; `demo/chemistry/judge/judge.ts:76-80`). They grade the evals
  after the fact; nothing checks a line before Blicky says it.
- **Built, switched off:** 13 strict tools, one per kind of mark (`strict: true`, `eager_input_streaming`;
  `app/service/tools.ts:67`). They turn on once the talk prompts carry `{{#tools}}` blocks, which they don't yet.

**Measured.**
- Prompt caching: Blicky's cost per turn, median $0.029 over 8 uncached turns → $0.019 over 6 turns that read the cache
  ($0.031 on the 2 that wrote it), on the prompts as they were at 5:45 PM. `docs/evals/receipts/anthropic-claude-check-17*.json`.
- Live exam run 2: reveal 33/34 with 1 slip, chemistry 47/50. Claude's cost per turn there was a median $0.030 over 36
  turns with the cache read: the prompts have grown since the caching check, so read $0.019 as the saving, not the price.
- Fresh problems on 13 kinds of screen, blind: a reveal criterion failed in 32 of 78 turns: 14 of the 17 where the
  student said "just tell me" (the prompt's rule is "until he asks"), and 18 of the 61 where he didn't.
  docs/evals/generated-sweep-2026-10-24/report.md.

**Try it.** `node app/brain/test/claude-check.ts` (the same turns with caching off, then on, then a forced fallback).

**Where it can go wrong.** Placement is the weak spot (visual criteria 41% in run 2). The step-by-step rule is a prompt
rule; the one live slip came from a recap of an earlier session. bf8d75f adds a line to a new session's brief telling
Blicky to say where the last one stopped and never name what it found; the recap still carries that session's summary,
and the fix isn't re-measured. Others near the mic can be heard and sent to Claude (Microsoft, below). → app/brain/README.md

### Cartesia · a real conversation, both ways

Sonic speaks for both characters over one kept WebSocket, and Ink is the ear.

**For the student.** Blicky's sentences each wait for its pen mark to land; Pickje's voice cuts in only for a quick
check-or-no (a switch of project, a close-out); you can pause mid-sentence without losing your turn, and start talking to cut Blicky off.

**Setup.** macOS, Node 25, Swift; `CARTESIA_API_KEY` (and `ANTHROPIC_API_KEY` for a turn) in `.env`; `bin/pickje`.
With no key: `node app/voice/cli.ts say "hi" --dry-run` prints the exact socket messages, and
`node app/voice/test/two-voices-check.ts --offline` runs the two-voice path against a fake socket.

**How it's built.** A hand-written client, no SDK; the key rides only in the `X-API-Key` header and is refused for any
host but `api.cartesia.ai` (`app/voice/cartesia.ts:59`). `wss://api.cartesia.ai/tts/websocket`, `cartesia_version`
2026-08-14, raw `pcm_s16le` at 24 kHz.
- **Sonic 3.6 over one socket**, kept open between turns (`app/service/voicelink.ts:12-41`).
- **Two contexts per turn, two library voices:** Pickje and Blicky in his own two cloned voices (Cartesia voice cloning, set 10-24), Pickje as one final request, Blicky streamed sentence
  by sentence with `continue: true` and `max_buffer_delay_ms: 0` (`app/service/voiceturn.ts`, `pickle()` :194, `say()`
  :228). Blicky's audio waits until Pickje's context is done, so the two never overlap.
- **Word timestamps** (`add_timestamps`) drive the pen-and-voice gate in the Mac app
  (`app/shell/Sources/PickjeCore/BeatGate.swift`).
- **Tone per line:** `generation_config` emotion and speed per context, then inline `<emotion>` and `<speed>` tags on
  later sentences (`TONES` in app/service/beats.ts).
- **Cancel:** cutting in cancels the turn's contexts (`cancel()`, cartesia.ts:202).
- **Ink 2** (`wss://api.cartesia.ai/stt/turns/websocket`, model `ink-2`, 16 kHz PCM in 100 ms messages, thresholds
  0.8 / 0.4 / 0.15 and a 7 s end timeout so a pause mid-thought doesn't end your turn, keyterms Blicky and Pickje;
  `app/ears/providers/cartesia-ink.ts:40-53`): `turn.update` is the live caption, `turn.end` ends your turn,
  `turn.start` pauses Blicky.
- **`POST /say`** speaks the onboarding's lines in either voice outside a turn (`app/service/talk-server.ts:197`).

**Measured.**
- Live exam run 2, 36 turns with Blicky on Opus: Pickje's first audio a median 2.6 s after the words were handed in
  (no speech-to-text in that clock), Blicky's 8.5 s, almost all of it Claude's time. Cartesia's own time from a line's
  text to its first audio there: Pickje 182 ms, Blicky 183 ms (medians, recomputed from results.json).
- Two-voices check (5 turns, Haiku): the first word came a median 2.4 s into the turn, where Blicky's own first word
  came at 14.9 s in the same turns (metrics.md; that check's output wasn't kept).
- Ink against the local whisper ear, on synthetic speech: end of speech to final words 1.47 s → 1.17 s; a 1.6 s pause
  mid-sentence stayed one turn 3/3, where whisper split it 3/3 (`docs/evals/receipts/cartesia-ink-check-1907.json`).
- Barge-in through the app's own code, with a file as the mic and a stand-in voice: your first sound to Blicky silent
  in a median 499 ms (metrics.md; output not kept).

**Try it.** `node app/service/talk.ts "what does the triplet tell me?" --image demo/chemistry/judge/nmr/question.png
--two-voices` writes both voices to a WAV (needs the Cartesia and Anthropic keys).

**Limits.** Talking over Blicky needs Apple's echo cancellation, which failed to start on this Mac in the live runs; the
mic now retries without it, and then a shake cuts Blicky off instead. A speed tag on a later sentence barely changes
it (a context's first line takes speed reliably). The voices are the build agent's picks; no listening test yet. Your
voice goes to Cartesia while the mic is open, and Pickje's panel says so. → app/voice/README.md

### Moss · the working memory, inside the talk server

Moss answers per sentence in milliseconds, in the talk server's own process (`@moss-js/moss` 1.21.0, local
`SessionIndex`es, model `moss-minilm`).

**For the student.** Switch to another assignment and just talk: pickje files it to the right project at once, and
Blicky's follow-up knows what it drew on your screen a turn ago. Moss is the fast memory both characters decide with:
which project your sentence belongs to (often with no model call), which older lines of it Blicky needs, and what's
still drawn on your screen, each in milliseconds. Its quick route is also what keeps Pickje quiet: a sentence that stays
in your project files with no question; only a switch to another one gets Pickje's check-or-no.

**How it's built.**
- **Two warm sessions:** every project's memory (`pickje-projects`) and the last 8 hours of screen text, re-indexed every
  10 s (`pickje-screen`) (`app/memory/live.ts:113-121`, `:229`).
- **Route:** three hybrid queries per sentence (alpha 0.6, metadata filters): your words against every project, the
  window against the screens each project was seen on, your words against intent examples (`routeOnMoss`,
  `app/memory/route.ts:168-178`). Moss decides alone when your words clearly name a project, or the line is about the
  work on screen, and the window title matches a screen Moss has seen for exactly one project (`decide`, :130).
  Otherwise Claude routes, shown Moss's top 3 when something is close. A window on the same file as a project's last screen is settled before Moss (`route()` in
  app/service/projects.ts).
- **Recall:** up to 4 older lines of the routed project that match your sentence go into Blicky's brief (`snippets`,
  route.ts:197).
- **Live shared context:** one session per project, `pickje-ctx-<slug>`, holds the turn's words, Blicky's lines, each mark
  and each structure with its atom anchors (`addDocs` with upsert, `getDocs`, `query`). After every turn it's published
  with `saveToDisk`, and Droid's worker, another process, opens it by name with `loadFromDisk` (`app/memory/context.ts`
  :483, `handoff` :663). What's still up on screen is the talk server's own registry; Moss carries it to other processes
  and adds the recent marks and the matching older lines.
- **Stall line (off by default since 10-25; the one call that would leave the Mac):** Moss's inference API
  (`inference.moss.dev`, model `moss`, retrieval off) writes Pickje's first line from your words and the text near your
  pointer while Opus thinks (`app/service/stall.ts:45`, `makeStall` :160). His rule since 10-25 is that Pickje speaks
  only to confirm a route or a close-out (docs/spec/0014), so it runs only with `PICKJE_PICKLE_TALK=on`; by default
  every Moss call stays on this Mac.

**Measured.**
- Projects check, 16 turns: Moss alone decided 8 at a median 6 ms with no model call; with Moss off, every route was a
  Claude call at a median 1,332 ms; 16/16 routed right either way. The 6 turns Claude routed from Moss's top 3 took a
  median 2,544 ms, slower than Moss off. (metrics.md; this check needs lab pages from outside the repo and its output
  wasn't kept.) The card's "routed by moss · 7 ms" is Moss's query time, without the folder sync.
- Route check, repo files only: Moss decided the 9 lines it should, all right, and handed 4 to Claude; median 5.6 ms
  (`node app/memory/test/route-check.ts`).
- Live context: "now circle the carbonyl carbon on it" aimed at atom C3 of the molecule drawn a turn before in 7 of 7
  runs (6 rang it; the first put a label on it, and the check has required a ring since); with the context off it placed
  a second copy and rang a guessed spot (`docs/evals/receipts/moss-context-check-*.json`). That before/after switches
  off the talk server's registry too, so it doesn't isolate Moss.
- Stall line (measured 10-24, with it on): in 4 of 6 Opus turns Pickje's first audio came 1.0–1.16 s in, saying what's at the pointer ("The 1.99 is
  right under that quartet.", Moss 617 ms), where the fixed line only names the project; once Moss took 2.3 s and
  Blicky spoke first, once it didn't answer in 3 s and the fixed line went (`moss-stall-check-run*.log`).

**Try it.** `node app/memory/test/route-check.ts`, then `node app/memory/test/context-check.ts`.

**Limits.** "That thing from before" also runs on Moss, but only onboarding step OB5 asks for it today. → app/memory/README.md

### Convex · Pickje's record, live

A local Convex deployment (`convex` 1.48.0, the self-hosted binary on 127.0.0.1, no account) is the live, transactional
view of every project that Pickje's card renders from.

**For the student.** Pickje's card changes while Blicky is still talking (who routed, "pickle is writing…", what left
the Mac, Droid's steps, the session timeline) and never shows half a turn.

**How it's built.**
- **Schema:** 7 tables, 12 indexes: projects, notes, memlog, references, steps, sessions, droid_steps
  (`app/convex/convex/schema.ts:84-90`).
- **One mutation per Pickje step:** `turns:route`, `turns:begin`, `turns:make`, `turns:close`, `turns:recall`, `notes:save`,
  `notes:react`, `projects:backfill`, `sessions:put`, `droid:step`. `turns:close` writes the card, the three hot files, the
  memlog line, the turn's notes and the step row in one transaction (`app/convex/convex/turns.ts:50-66`).
- **One reactive query,** `card:now` (`card.ts:36`), held by the talk server through `ConvexClient.onUpdate`
  (`app/convex/live.ts:55-59`) and streamed to the Mac app on `GET /watch` (`app/service/talk-server.ts:133`).
- **File storage:** a new project's screen crop goes up through `ctx.storage.generateUploadUrl` (`references.ts:18`).
- **Never fails a turn:** writes go through `ConvexHttpClient` with a 2 s timeout (`app/convex/record.ts:20`, `commit`
  :60); a missed write is queued and backfilled from the folder on reconnect (`sync.ts`).
- The project folders are the source Pickje's prompts read, and they're written first, because Claude Code sessions
  opened in a folder read the markdown; Convex is the transactional live view the card subscribes to. Only Convex holds
  who routed and how fast, a step's started/done state, the trust line, Elastic's hits and Droid's steps.

**Measured.** A Pickje write reaches the card's Swift stream callback (the app's own TalkStream and LiveCard code, run
headless) in a median 6 ms, 5–9 ms (three runs on 10-24; one run's output kept); before, the card read once when opened
and never changed. With Convex stopped, a close still wrote its files and was back on the card 864 ms after Convex
returned (`docs/evals/receipts/convex-live-check.log`).

**Try it.** `node app/convex/live-check.ts`.

**Not built.** The panel pin and the notes window still read turn events; no Convex actions, scheduled functions or
search yet. → app/convex/README.md

### Elastic · the library across days, on Agent Builder

An Elastic Cloud Serverless project (`build_flavor: "serverless"` in `node app/recall/elastic.ts status`) holds what
was said, decided and disliked, and an Agent Builder agent answers over it.

**For the student.** Come back to an assignment after a gap, or to a later judging panel, and Blicky opens with where
you stopped and what you decided, without you re-explaining.

**How it's built.**
- **Index** `pickje-recall`, strict mapping: `text` (BM25, english analyzer) copied into a `semantic_text` field embedded
  at ingest by `.jina-embeddings-v5-text-small` (`app/recall/elastic.ts:100-107`); writes through `_bulk` (:594) at each
  close, reaction and session line.
- **Agent Builder:** the agent `pickle-archive` and six tools, made through `/api/agent_builder/tools` and `/agents`
  (:190-327): a hybrid ES|QL tool (`FORK (… MATCH(text, ?q) …) (… MATCH(semantic, ?q) …) | FUSE`, :197-199), four ES|QL
  tools (`decisions_since`, `disliked_notes`, `time_on`, `where_it_stopped`) and an `index_search` tool. Asked through
  `/api/agent_builder/converse` (`askArchive`, :952). The same tools are on the project's MCP endpoint.
- **Live profile:** its own index `pickje-recall-live` and agent `pickle-archive-live`, with a seventh tool,
  `session_recap` (each panel's session summary and turns).
- **Bring back** (`bringBack`, :843) runs on every routed turn and answers for live-profile, staged and test projects
  (his real projects need his yes): after an 8-hour gap, when a demo session opens, or when you ask about the past, an
  RRF retriever search (BM25 + semantic, filtered to the project; `search()`, :763) primes Blicky's brief. The card's
  chip, "elastic · bring back · 412 ms · 5 hits", comes through Convex (rendered in a headless check, not yet seen on
  screen).
- **Which piece does what:** Bring back is plain `_search`; the Agent Builder agent answers the earlier turn's archive
  question (only onboarding OB5 asks for that turn) and the live panels' "what did the last panel see"; the MCP endpoint
  lists the tools, and nothing in the product calls it.
- **Guard:** production sends only the staged history and projects whose every word is by "test", unless he sets
  `PICKJE_RECALL_REAL=yes`; the live profile sends its own projects' sessions to its own index; never screenshots, screen
  text or audio (`guard` :540, `withoutScreen` :566).

**Measured** (18 staged questions about three earlier days; `docs/evals/receipts/elastic-recall-check-*`).
- Hybrid search found the answer in the top 3 for 15/18 and 16/18 in the two saved runs (recall@5 17/18). Without
  Elastic, what Blicky's brief already holds (the project's RESUME and notes, the last hour of screen) contains the
  answer for 9 of the 18 at all. Plain keyword matching over the same 61 documents also gets 15/18 when run on the Mac;
  semantic carries the paraphrases.
- Hybrid round trip a median 185–224 ms (Elasticsearch `took` 104–105 ms). The agent answered 5/5 right in a median
  10.1–11.1 s.
- Live profile (`app/recall/test/live-check.ts`, three runs; output not kept, numbers in metrics.md): a second panel's
  session was primed with the first panel's summary and turns in 0.4–1.1 s cold, 192 ms warm; `pickle-archive-live`
  answered "what did panel 1 work out on the bridge truss?" right in 14.1 s.

**Try it.** `node app/recall/elastic.ts status`; `node app/recall/elastic.ts ask "what did I decide friday about drawing
resonance structures?"`; `node app/recall/test/recall-check.ts`.

**Limits.** In the committed live-exam run every turn's text went to the live index (the trust line says so), but its
records don't show Bring back firing. The agent takes about 10 s, so Blicky fills the wait with a line. → app/recall/README.md

### Factory · Droid does the project's work

Pickje decides, Droid acts in the project's folder through the Droid TypeScript SDK (`@factory/droid-sdk` 0.10.0,
`app/service/droid.ts`), and its steps land on Pickje's card.

**For the student.** After Blicky explains a step, ask "can you make me a practice problem like this?", answer Pickje's
"want me to make you a practice set?" with "yeah", and Droid draws new molecules and writes the problems into your
notes, where Blicky can teach from them.

**How it's built.**
- **One session per project:** `createSession({cwd, autonomyLevel: Off, interactionMode: Spec, disabledToolIds,
  mcpServers, permissionHandler, askUserHandler, systemPrompt})`, or `resumeSession` + `updateSettings` +
  `enterSpecMode` (droid.ts:774-791), each run in its own background worker, `session.stream()` read step by step (:814).
- **Triggers:** your spoken hand-over (onboarding OB6, `app/service/subject.ts`), and Pickje's close offering the
  project's next step, the practice set among them, which waits for your spoken yes (`offerNextStep`;
  `app/service/droidyes.ts`). The second is behind `PICKJE_DROID_NEXT=1`, off by default.
- **Plan first:** every run starts in spec mode, its plan opens with "got it: …", and the permission handler holds
  `ExitSpecMode` until a yes (the say-back check for a hand-over, your spoken yes for a next step) (:740-767). That
  nothing is written before the yes is spec mode's guarantee, and it held live: in the exam, Droid offered "Want me to
  make notes on this?", the offer went unanswered, and the run ended "rejected: nothing written, 41.2 s, 1,261 credits"
  (docs/evals/2026-10-24-2/results.json).
- **What it can touch:** autonomy Off; Droid's own shell, web, edit and create tools disabled (`TOOLS_OFF`, :90-99);
  `vetTools` refuses to run if Droid offers any tool not on the list (`listTools`, :658). Its only writes are four tools
  pickje serves as an SDK MCP server (`createSdkMcpServer`, :568-575): `write_file` and `draw_structure` re-check the
  path against the folder with symlinks resolved (`insideProject`, :239); `save_note` and `save_reference` take no path
  (their names are generated, or cut to lowercase letters, digits and dashes). Reads aren't fenced; each read outside the
  folder is logged (detected from the read tools' path fields, :820).
- **Visible:** every step goes to `steps.jsonl`, streams on `GET /droid/watch`, and is written to Convex `droid_steps` as
  it lands (:696), so the card shows the "got it:" line, each molecule and note, then the receipt (wall time, turns,
  `factoryCredits`; `.pickje/receipts.jsonl` also keeps the SDK's `durationMs`).

**Measured** (`docs/evals/receipts/factory-*`).
- Practice set, 3 runs: done in 33.7, 52.9 and 33.3 s for 2,942, 2,431 and 2,346 credits; 2–3 molecules from SMILES and
  one note of problems each; every step a Convex row; 25/25, 28/28 and 28/28 checks.
- Inside the chemistry judge, after step 16: done in 28.2 s, 8/8 Droid criteria.
- Hand-over: done 5/5, round trip a median 8.1 s (metrics.md; those runs' output wasn't kept); the saved run took 9.2 s
  with 10 visible steps, and a write through a symlink out of the folder was refused (37/37 checks).

**Try it.** `node app/service/test/droid-practice-check.ts` (real Droid runs, about 3,000 credits).

**Limits.** No diff of a `write_file` yet; the card shows the latest run only; an offer he doesn't answer still costs
its plan (about 1,300 credits). → app/service/DROID.md

### Mana · the idea log, as a Mana app

A staged idea log (three made-up projects: the words, what was decided and why, notes with a reaction) was published
once, by hand, through Mana's external API as a Mana app, **Pickje's idea log** (`app/mana/publish.ts`,
`app/mana/viewer.js`). No code sends his real projects or a talk turn to Mana.

**For the student, once it's live.** How an assignment's thinking went, in one place you can share. Today it holds
only the staged demo.

**How it's built.**
- Four routes of Mana's external API and nothing else (`me`, `read`, `update`, `delete`; `ROUTES`, publish.ts:59), under
  one path, `file-system/pickje/idea-log` (`lockPath`, :371).
- One multi-path `update` writes the app node (`metadata/type: "user_div"`, its React code from viewer.js) and its
  entries; a read-back must match (`publish`, :409-436). viewer.js shows a timeline per project with filters and
  listens live (`FS.onValue`).
- `publish` refuses unless `--digest` matches the preview he read; the guard refuses anything not staged and by
  "test", any extra field, anything key-like.

**Measured.** Published 10-24 at about 6 PM after his yes: 36 staged entries over 3 projects, read back 36/36. A status
read at 9:47 PM: the node exists, made by pickje, type `user_div`, 36 entries, 3 projects, not public
(`docs/evals/receipts/mana-status-2147.json`).

**Where Mana helped.** Mana is where the log is published, not a tool pickje was built with; nothing in the repo shows a
Mana chat shaping the code.

**Try it.** `node app/mana/test/mana-check.ts` (offline: the guard, the write path against a stand-in, viewer.js
rendered; ends "ALL PASS"). `node app/mana/publish.ts preview` reprints the digest he approved before the write,
`697a6878…` (docs/spec/0005-sponsors.md), so a judge can check offline exactly what went up.

**Open.** Making the app public from Mana's share menu, which gives judges the link, is his click; rendering inside Mana
hasn't been seen yet. → app/mana/README.md

### Microsoft, Built for the Real World · measured, and clear about what it sends

The whole product is the entry: an agent that does a student's real job end to end on a real screen, graded against a
written rubric, and saying on every turn what left the Mac.

**Who it's for.** Students working problem sets alone at a Mac who get stuck between steps and need to be walked to the
next one without being handed the answer. No student has used it yet; every number here is from our own runs.

**End to end.** Shake, circle, ask out loud → Pickje routes and speaks → Blicky draws on the page and talks one step →
Pickje writes the project's memory → the card updates live; on a spoken yes, Droid makes a practice set (with
`PICKJE_DROID_NEXT=1`, off by default).

**Measured** (live exam run 2 on his screen, docs/evals/2026-10-24-2; medians recomputed from its results.json).

| What | Result |
|---|---|
| Rubric criteria | 302/485 (62%); the bar is 80% over two runs with no slips: not passed |
| Reveal | 33/34, 1 slip (a recap of the last session named the product) |
| Chemistry | 47/50 |
| Visual (whether the spec's drawings appear, and where) | 86/208 (41%), the weakest part |
| First audio after the words were handed in | Pickje 2.6 s, Blicky 8.5 s (36 turns; add Ink's about 1.2 s with the mic) |
| Claude cost per turn | $0.030 (36 turns, $1.07 in all) |
| Fresh problems, 13 kinds of screen, blind | 49–51% of criteria; the leak check flagged 9 of 668 requests, read as echoes of Blicky's own lines |

Every row recomputes from the run's own `results.json` and `summary.txt`. The rubric is the demo's written spec
(demo/chemistry/judge/), so it measures how close Blicky comes to the intended teaching, not a student's learning.

**Responsible design** (docs/TRUST.md).
- A trust line on every turn says what left the Mac and where (`trustOf`, app/service/turn.ts:939); it's committed to
  Convex and shown on the card. Its voice part comes from the ear's config, not the mic's live state.
- The talk server listens on 127.0.0.1 only (talk-server.ts:321), checks the Host header (:102-103), and wants a
  per-start bearer token compared in constant time (:107). Any program running as him can read the token file.
- The mic opens only after a shake, and only speech within 8 s of it, or naming Blicky or Pickje, starts a turn
  (app/shell/Sources/PickjeCore/Addressed.swift); Pickje's panel says "voice goes to Cartesia" while it's open. The
  onboarding paces the mic itself and doesn't use that gate.
- Keys are never printed (`redact`, app/brain/env.ts:43; `redactKeys`, app/shared/secrets.ts:17); saved evals are
  redacted too. No silent model swap (app/brain/chain.ts:113-121).
- Elastic gets test or demo data only (`guard`, app/recall/elastic.ts:540), Droid can't write outside its folder
  (`insideProject`, app/service/droid.ts:239), Mana gets staged data only.

**From this Mac to production.** Claude alone is about $30 per 1,000 turns at run 2's median; Cartesia, Moss's
inference, Jev through OpenRouter, Elastic's inference and Factory's credits (about 2,300–2,900 a practice set) come on
top and weren't totaled. It needs macOS, screenpipe and about seven API keys. What's single-Mac today:
one bearer token per Mac (per-user auth needed), a local Convex pinned to 127.0.0.1 (the functions are plain Convex
TypeScript, but they haven't been deployed to Convex's cloud),
the worksheet path on his Mac, and the Elastic consent switch set by hand.

**Known gaps.** In the live exam the mic failed to start (patched: it retries without voice processing; not yet
re-measured in an exam). In one
live test the mic heard people nearby and their words went to Cartesia and Claude (docs/live-tests/2026-10-24-night.md
§2). Text planted on the screen isn't tested. The judge is Claude grading Claude, with no human check yet.

**Try it.** `node demo/eval/generate-run.ts --situation any --n 3 --turns 3` (fresh problems, graded blind; uses Claude
credits).

## Where things are

- How to work here: `CLAUDE.md`; the first message for the build window: `START.md`
- His words, verbatim, one file per spec item: `docs/spec/`
- The verbs and what runs each: `docs/VERBS.md`; sponsors' before/after: `docs/sponsor-test/metrics.md`
- Evals and the check outputs behind every sponsor number: `docs/evals/` (`receipts/` and its table in the README);
  the blind sponsor judges, rounds 1 to 3: `docs/sponsor-test/`
- Every request and what verified it: `docs/TRACKER.md`
- Dependencies and what each is for: `docs/CREDITS.md`
- The context moved over from clicky-module, in our own words: `docs/context/`
- The app: `app/shell` (Swift, macOS); the talk service: `app/service`; the brain: `app/brain`; memory: `app/memory`
  (Moss), `app/convex`, `app/recall` (Elastic); voice: `app/voice` (Cartesia); the chemistry demo, its judge and the live
  exam: `demo/chemistry/`
