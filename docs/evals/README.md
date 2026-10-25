# docs/evals: pickje's eval results, kept in the repo

The live exam writes its results to `/tmp/pickje-exam/<time>/`, and the Mac clears `/tmp`. The blind Microsoft judge
(docs/sponsor-test/round-1/microsoft.md, 10-24): "Commit the eval report, because `/tmp` gets wiped." Each folder here
is one finished run, copied by `save.ts`:

| File | What |
|---|---|
| `summary.txt` | the driver's summary: pass rate by kind of criterion, reveal slips, what the ear heard, each step's failed criteria, the pass bar |
| `results.json` | every step: his words, the pointer's target, the ear's attempts, Blicky's marks and lines, the TURN line with its timings, every criterion with the judge's verdict and reason, the errors the judge caught |
| `source.json` | which `/tmp` run it came from, when it was saved, and how many key-like strings were redacted (0 so far) |

**Left out on purpose:** screenpipe's frames, the setup sheets, the anchor images and the judge's inputs. They are
pictures of his screen, so they stay on the Mac (CLAUDE.md: "Screen and voice data stay on this Mac"). `results.json`
names the frames by screenpipe id and `/tmp` path only.

Save a new run: `node docs/evals/save.ts` (the newest run that judged a step), or `node docs/evals/save.ts <run>`.

## How the live exam runs

`node demo/chemistry/exam/exam.ts live --go` on his Mac, after he says go. The rule it follows is his (10-24): "make
sure your drawing agent is NOT cheating. it should only use the native interactions ... it must rely on screenpip
recording and it should pull up the documetn and take over to run. dont try to solve it headless".

- **The page:** his worksheet PDF opens in Preview and fills the screen. No diagrams are preloaded; structures Blicky
  draws come from SMILES at the time of the turn.
- **The student:** the real pointer glides to each step's spot, circles what the step circles, shakes to wake Pickle,
  and says the step's words out loud with macOS `say`, so pickje's own microphone and local speech-to-text hear them.
  If the ear misses twice, the step hands the words to the app directly (its testHeard hook) and the record says so.
- **The turn:** the real app and talk server. Blicky is Claude Opus 5.5, Pickle is Claude Haiku 5.5, the voices are
  Cartesia's.
- **The grade:** for each step, screenpipe's frame that the brain got and screenpipe's first frame after the marks
  settled go to a strict judge (Claude Opus 5.5, `demo/chemistry/judge/judge.ts`) with the step's criteria from
  docs/spec/0006. Nothing is redrawn for the judge.
- **The pass bar (his click):** at least 80% of criteria over 2 runs of both demos, and no reveal slips.

## 2026-10-24-1: the first full run (10-24, 4:45 to 4:56 PM PDT)

Both demos (Demo 1: the NMR and IR structure question, steps 3–13; Demo 2: the reaction mechanism, steps 15–21), one
run. 18 steps ran and 15 were judged.

| Kind | Passed |
|---|---|
| all criteria | 117 / 224 (52%) |
| visual (what Blicky draws, and where) | 32 / 99 (32%) |
| voice (what Blicky says) | 18 / 42 (43%) |
| reveal (no answer before he asks) | 16 / 16 (100%); 0 reveal slips |
| chemistry | 20 / 21 (95%) |
| general | 31 / 46 (67%) |

**Pass bar: not passed** (52% over 1 run; it needs 80% over 2).

From the TURN lines in `results.json` (18 turns): the brain's first token came a median 6.3 s after the turn started
(3.2 to 27.7 s), and the first audio a median 8.0 s after his words were heard (3.8 to 29.3 s).

**What failed:**

- **Placement, mostly.** The judge logged 30 placement errors, 21 voice errors and 1 chemistry error. The typical
  miss: the right thing marked in the wrong place, for example the highlight on the formula printed in spectrum (a)'s
  title instead of the one in the question he circled (step 3), or the speech bubble covering data on the page.
- **The spec's visuals weren't drawn.** The criteria failed most often were G1 (explanations in small bubbles next to
  the selected content: failed on 14 of the 15 judged steps), V3 to V6 (on step 3, for example: a calculation panel
  beside the formula, revealed step by step, the 5 highlighted, a benzene ring drawn beside it) and the voice criteria
  S2 and S3 (the spec's lines for each step).
- **The one chemistry miss:** on step 3 Blicky presumed a benzene ring from the degrees of unsaturation alone, without
  the IR or NMR evidence (criterion C1).
- **Not judged:** steps 19 to 21, because screenpipe saved no frame after their marks settled.
- **The ear:** heard 16 of 18 steps from the speakers; steps 4 and 10 used the testHeard fallback.

**Prompt hints (found 10-24 7:30 PM, his question: "are you tellign me the entire process was faked?"):** the answer
key and rubric went only to the judge; Blicky's turn never got them. But three examples written into the prompts during
the build came from the demo and were in place for this run: Blicky's SMILES example was ethyl benzoate (demo 2's
product, talk.point.md, from 4:17 PM), the find example said "the carbonyl carbon" (talk.find.md, 3:31 PM), and Pickle's
naming example said "ethyl-benzoate-synthesis" (projects.make.md, 3:02 PM). Commit 2228139 replaced them with neutral
examples. So this run's numbers, demo 2's above all, are not a clean measure of a worksheet pickje has never seen.

**Caveats:** one run, not the two the bar asks for. The driver's own check flagged the talk server and the app as
started a few minutes before uncommitted edits to app/service and app/shell, and the run went ahead on them. Two later
attempts that evening (5:29 and 5:30 PM) stopped at once when his pointer moved (the driver stops on any input of
his) and judged nothing, so they aren't saved.

## 2026-10-24-2: runs 3 and 4, two passes over both demos (10-24, 8:28 to about 9:00 PM PDT)

`PICKJE_PROFILE=live node demo/chemistry/exam/exam.ts live --go --demo both`, on the stack restarted at 8:26 PM with the
demo hints gone (2228139), Elastic in live mode, Droid's practice set and the token system. 36 steps ran and 33 were
judged. What happened around it: docs/live-tests/2026-10-24-night.md §1.

| Kind | Passed |
|---|---|
| all criteria | 302 / 485 (62%) |
| visual | 86 / 208 (41%) |
| voice | 58 / 92 (63%) |
| reveal | 33 / 34 (97%); **1 reveal slip** (run 2, step 15: a recap of the last session named the product) |
| chemistry | 47 / 50 (94%) |
| general | 78 / 101 (77%) |

**Pass bar: not passed** (62% over 2 runs, 1 slip). **The ear heard 0 of 36 steps:** the mic failed to start with
voice processing on every wake (AVFoundation -10875), so every step used the testHeard fallback; the mic now retries
without voice processing (776c67d). The slip's cause, a new session's brief carrying the last session's results, is
addressed in bf8d75f and not yet re-measured.

Recomputed from `results.json` (36 TURN lines, `heard_to_*` from when the words were in): Pickle's first audio a median
2.64 s (1.0 to 9.6 s), Blicky's 8.55 s (4.8 to 17.1 s); Claude's cost per turn from the talk log, a median $0.030
($0.020 to $0.038, $1.07 for the run).

## generated-sweep-2026-10-24: fresh problems on 13 kinds of screen (headless)

26 scenarios written in the moment (code, spreadsheet, slide, CAD, sheet music, map, foreign language, UI critique, lab
chart, contract, biology, economics, history), 78 graded turns, Blicky blind to each answer key: 49–51% of criteria. The
report ranks what repeats across situations (marks covering what he needs to read, 52 of 78 turns; speaking past the
word budget, 58 of 78; reveal fails, 32 of 78). Full report: `generated-sweep-2026-10-24/report.md`.

## Check receipts (`receipts/`)

The README's sponsor numbers come from dev checks that print to the terminal or write to `/tmp`, which the Mac clears.
These are their outputs, copied as they were on 10-24 (no images; each file was scanned for key-like strings and had
none). Times in the names are PDT.

| Receipt | What it backs | The command that made it |
|---|---|---|
| `anthropic-claude-check-1748/1749/1755.json` | Blicky's cost per turn with prompt caching: median $0.029 over 8 uncached turns → $0.019 over 6 cache-read turns, $0.031 over 2 cache-write turns (recomputed from the per-turn rows) | `node app/brain/test/claude-check.ts` |
| `anthropic-claude-check-1801-fallback.json` | the forced fallback: with an invalid model, every call says who answered and why | `PICKJE_BLICKY_MODEL=invalid-model PICKJE_ANTHROPIC_MODEL=invalid-model node app/brain/test/claude-check.ts` |
| `anthropic-tools-check-2006/2012.json` | strict tools against beat lines: 12/12 turns through tools, 0 refused, first say about 1.8 s later | `node app/service/test/tools-check.ts --prompts <a copy with {{#tools}} blocks> --runs 2` |
| `cartesia-ink-check-1907.json`, `.log` | Ink against whisper: end of speech to final 1469 → 1165 ms; a 1.6 s pause one turn 3/3 | `node app/ears/test/ink-check.ts` |
| `moss-context-check-*.json` | the live context: 7 runs aimed at C3 of the earlier molecule (6 rang it; 181319 put a label on it); the `-before-moss-off` run didn't (1/5) | `node app/memory/test/context-check.ts [--droid]`, `PICKJE_MOSS=off …` |
| `moss-stall-check-run1/2/3.log` | Pickle's stall line from Moss's inference: 4 of 6 Opus turns spoke it, first audio 1.0–1.16 s into the turn; Moss 607–660 ms when in time | `node app/service/test/stall-check.ts` |
| `convex-live-check.log` | a Pickle write to the card's Swift callback: median 6 ms (5–9); back on the card 864 ms after Convex restarted | `node app/convex/live-check.ts` |
| `convex-session-check.txt` | live-mode sessions: open, close with a summary, recap, replay from the record | `node app/service/test/session-check.ts` |
| `elastic-recall-check-1703.log`, `-1952.json` | 18 staged questions: hybrid hit@3 15/18 and 16/18, round trip median 224 and 185 ms, the agent 5/5 | `node app/recall/test/recall-check.ts` |
| `elastic-status-production-2147.json`, `-live-2147.json` | `build_flavor: "serverless"`, the inference endpoint, each agent's tools (six; seven with `session_recap`) | `node app/recall/elastic.ts status` (`PICKJE_PROFILE=live` for the second) |
| `factory-droid-check.txt` | a hand-over on Droid: 37/37 checks, round trip 9.2 s, 10 steps, a write through a symlink out of the folder refused | `node app/service/test/droid-check.ts` |
| `factory-practice-check-run1/2/3.txt` | the practice set: done in 33.7, 52.9, 33.3 s, 2,942 / 2,431 / 2,346 credits, every step a Convex row | `node app/service/test/droid-practice-check.ts` |
| `factory-judge-droid-step.txt` | the judge's Droid step after step 16: 8/8 criteria | `node demo/chemistry/judge/run.ts --steps 16 --droid` |
| `mana-status-2147.json` | the Mana node: made by pickje, `user_div`, 36 entries, 3 projects, not public | `node app/mana/publish.ts status` |

Not kept, so their numbers rest on docs/sponsor-test/metrics.md alone: the projects check (it also needs lab pages
outside this repo), the route check, the two-voices check and the barge-in check.

## Other evals in the repo

These are dev checks that run headless; their before and after numbers are in docs/sponsor-test/metrics.md.

- `node demo/chemistry/judge/run.ts`: the chemistry steps on composed screens, graded by the same judge.
- `node demo/eval/generate-run.ts [--n 6] [--subject any] [--seed S] [--save]`: the generated-scenario blind eval. Fresh
  scenarios are written in the moment, each with its own answer key and rubric. Blicky runs on them blind, and every
  request its turns make is checked to show it never got the key. The grader recommends what Blicky should have done.
  `--save` writes `docs/evals/generated-<date>-<n>/`.
- `node app/service/test/projects-check.ts --runs 2`: Pickle's routing and memory, 16 turns.
- `node app/recall/test/recall-check.ts`: 18 staged questions about earlier sessions (Elastic).
- `node app/brain/test/claude-check.ts`: prompt caching before and after, and a forced fallback (Claude).
