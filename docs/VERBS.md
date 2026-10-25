# The fifteen verbs, in pickje, with the sponsor each one runs on

His words (docs/spec/0007, 10-24): "Just like revisiting the original documents to match to the fifteen verbs." The
verbs come from the hardened forge (`~/code/clicky-module/_bmad-output/initiative-blicky/forge-blicky/forge-blicky.md`,
10-17: "Fifteen verbs, one action each"); docs/SPEC.md V1 calls "Hold" "Keep" and picks which are in for the demo. The
sponsor column is his plan (docs/spec/0005-sponsors.md, his clicks 10-24) and docs/SPONSORS.md. Status is what the code
does today; "built" means a check runs it.

| Group | Verb | The forge's meaning | In pickje | Sponsor (his plan) | Status, 10-24 ~7:45 PM |
|---|---|---|---|---|---|
| Senses | **Catch** | his words with the moment they were said in | the ear (`app/ears`) and each project's `words.jsonl` | **Cartesia Ink** since his click 10-24 ("Cartesia's listening"); the local whisper.cpp ear before that, and still the fallback | built: Ink is the default ear (`app/ears/config.json`); being added: only speech after a shake or its name counts (his click 10-24 7:33 PM) |
| | **Ground** | find the thing on the screen | screenpipe's frame, the brain's box, then `find` → Jev crop-first (`app/service/locate.ts`) | Jev is TypeSafe (not a sponsor); the forge: "Ground and Teach run on Jev" | built (Jev on by default, `PICKJE_LOCATE=off` to compare) |
| | Attune | (out for the demo: SPEC V1) | | | out |
| Remembering | **Hold** (Keep) | his intent per project: why, done, must stay true, where it stopped, next | Pickle's RESUME.md / pickle.md / blicky.md per project, written by `close()` | **Convex**: every Pickle step one transaction; the card renders live from it | built: 6 ms from Pickle's write to the card; live-mode sessions kept in Convex for later panels |
| | **Recall** | what he said before, with its moment | Pickle's brief and "earlier" | **Moss** every turn (his click "Convex local + Moss every turn") | in the turn (10-24): Blicky's brief gets the cold lines Moss picks for his sentence (`projects.ts` briefFor, `app/memory/route.ts` snippets); "earlier" asks the talk server's warm Moss screen session first (`service/earlier.ts`) |
| | **Bring back** | after a gap: continue, re-prime, or start fresh | re-prime from session history | **Elastic** (his words: "embedding the situations adn your personal ifnroamtion adn the screenshotes and mometn ... repirme from a session history") | built on staged data 10-24: `bringBack()` re-primes the brief after an 8 h gap or when he asks about an earlier session; the earlier turn asks the `pickle-archive` agent (app/recall/README.md). Being added: the live profile's sessions go to Elastic (his words 10-24: "eleadtic shoudl go into the real live mode"); production still waits for his yes |
| Voice | **Show** | show what's happening, where | Blicky's marks (the primitives) and voice | **Cartesia**: two voices, Pickle and Blicky (his click "Two voices, your mic stays local") | built: Pickle (Tessa) and Blicky (Jameson) on two contexts of one WebSocket; each line waits for its mark's ink |
| | **Route** | his words to the right project, never a silent default | Pickle's `route()` | **Moss** (the routing query every turn) | built (10-24): Moss first every turn (`app/memory/route.ts`); Moss alone decided 8 of 16 projects-check turns at a 6–7 ms median (two runs), Claude the rest (among Moss's top 3 when something was close); 16/16 right |
| | **Hand over** | the best prompt to the receiver, which says it back before it builds | OB6 hand-over, and Pickle handing a project's next step on | **Factory Droid** ("the agent will become Blicky"; his click "Droid does each project's work") | built: hand-overs and spoken next steps run on the Droid SDK (8.1 s round trip, 9 visible steps, `droid-check.ts`); being added: the practice set in the demo arc (his click 10-24 7:33 PM) |
| Reflection | Gauge | (out for the demo) | | | out |
| | Push | push past the ask | Blicky's teaching moves | Anthropic | partly (the tutor's step-by-step rule) |
| | **Teach** | show him how, on his screen | the chemistry demo: primitives, SMILES structures, step by step | **Anthropic** (Claude writes every turn) | built; live exam run 1 graded 52% with demo examples in the prompts (since removed, docs/evals/2026-10-24-1); being added: a generated-scenario eval of fresh problems (his question 10-24) |
| Sleep | **Curate** | keep the record tidy and shareable | Pickle's idea log (his words, decisions, notes with reactions) | **Mana**: the idea log as a Mana app judges can open (his click) | built: 36 staged entries published to his Mana space (10-24). Stays documentation and ideation, not live sessions (his words 10-24: "mana is designed for documetnaiton and ideation") |
| | Learn | (out for the demo) | | | out |
| | **Measure** | count each verb's use against the baseline | the judges (chemistry, pointing, projects), docs/sponsor-test/metrics.md | **Microsoft** (Built for the Real World: measurable usefulness, path to production) | built: live exam results committed under docs/evals/; the trust line on each turn says what left the Mac |

The whole product runs on **Anthropic** (Claude routes, answers, draws, rewrites memory and grades) and is the
**Microsoft** entry (an agent that works end to end on a real task).
