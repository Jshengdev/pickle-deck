# Status

One row per piece. IDs match `docs/SPEC.md`. A piece reads "works alone" only after its done-check ran and the proof
is linked, and "merged" only after its join's check ran.

| ID | Piece | Lane | Status | Proof | Updated |
|---|---|---|---|---|---|
| R1 | Screen reading: HeyClicky and screenpipe, live | research | merged | `docs/research/screen-reading.md` | 10-23 23:05 |
| R2 | HeyClicky onboarding footage | research | merged | `docs/research/heyclicky-onboarding.md` | 10-23 23:15 |
| R3 | Sponsor tracks, re-fetched | research | merged | `docs/research/sponsor-tracks.md` | 10-23 22:50 |
| R4 | Voice and boxes | research | merged | `docs/research/voice-and-boxes.md` | 10-23 23:05 |
| R5 | Deep map of open-source Clicky | research | merged | `docs/research/clicky-foundation.md` | 10-23 23:20 |
| R6 | cmux as the session layer | research | merged | `docs/research/cmux-sessions.md` | 10-23 23:20 |
| R10 | Generative UI: the drawing call format | research | merged | `docs/research/generative-ui.md` ("beat lines") | 10-24 01:13 |
| C17 | Marks library + past-frame card | L5 | works alone | 5 marks drawn at their spots in screenpipe frames; card cropped 1.9% of a frame; shakecheck mark cases pass (re-run by lead) | 10-24 01:21 |
| C18 | Moss earlier-memory index | L3 | building | `app/memory/`: 19/19 unit tests, dry-run 1,503 frames to 823 docs; never reached Moss (no keys) | 10-24 01:10 |
| R9 | Demo scenarios from the HeyClicky lab scenes | research | merged | `docs/research/scenarios.md` | 10-24 00:02 |
| R8 | Moss: where it fits | research | merged | `docs/research/moss-fit.md` | 10-24 00:00 |
| R7 | Every voice model, fast OpenRouter models, Jev | research | merged | `docs/research/models-survey.md` | 10-23 23:27 |
| C14 | The board | tooling | works alone | `node docs/board/build.mjs`, `docs/board/index.html` | 10-23 23:30 |
| C1 | Pickle at the cursor, shake, close combo | L1 | works alone | `swift run shakecheck` 10/10, 0 false wakes (re-run by lead 23:31); `swift run pickje`; ⌃⌥⌘P closes | 10-23 23:31 |
| C2 | Ears: hands-free voice in | L2 | works alone | native capture 99.5% (no loss), `swift run earscheck file ...` exact (re-run 00:56) | 10-24 00:56 |
| C3 | Mouth: Cartesia voice out | L2 | building | `app/voice/`: dry-run and stand-in 21/21; never reached Cartesia (no CARTESIA_API_KEY) | 10-24 00:00 |
| C4 | Eyes, now | L3 | works alone | `node app/eyes/cli.ts now`: newest frame in 42 ms; re-run by lead 23:21, frame age 9.9 s on a still screen | 10-23 23:21 |
| C5 | Eyes, earlier | L3 | works alone | `earlier --q`: right moment in top 10 for 5/5 test phrases (first for 3/5), 0.2–1.6 s | 10-23 23:20 |
| C6 | Now-or-earlier check | L3 | works alone | `app/brain` on claude-cli: 9/9; sandbox `run.ts nowearlier --n 9` 9/9 on fresh cases (re-run 01:12) | 10-24 01:12 |
| C7 | Locate: boxes on screen, local first | L4 | works alone | `node app/eyes/selftest.ts`: 9/10 at IoU ≥ 0.9 (earlier runs 4–7/10); misses are repeated text, fixed by `--near x,y` 6/6 | 10-23 23:20 |
| C8 | Blicky's hand: the cursor with a pencil | L5 | works alone | native SwiftUI in `app/shell/`; `tools/blicky.mjs point`; box within 1 pt in screenpipe frames; 12 unit cases pass (re-run 23:50) | 10-23 23:50 |
| C9 | The brain (+ say-back for the stamp) | L6 | works alone | `app/brain/test/check.ts`; only claude-cli has run (no keys) | 10-24 01:12 |
| C10 | The record (`.pickje/words.jsonl` per repo) | L6 | works alone | `app/service/` handover appends verbatim with ts, origin and where | 10-23 23:45 |
| C11 | North star, desk, next step | L6 | works alone | `node app/desk/test/check.ts`: 4/5 pass (sign-check 9/10); `node app/desk/cli.ts onboard` is interactive | 10-24 01:39 |
| C12 | Sandbox debugger | L7 | works alone | `app/sandbox/run.ts ears --n 12`: fresh cases each run, 6–11/12 pass; report.html | 10-23 23:44 |
| J1 | Join: Talk (shake, say, hear a reply) | join | building | part 1: talk server in `app/service/`; part 2: shell wiring after the marks lane | 10-24 01:14 |
| C13 | Onboarding flow | join | building | OB0–OB4 checked by him; OB5, OB6, OB7 wait on his check (OB7 built 10-24 morning); `docs/nap/storyboard.html` (20 beats, `tools/storyboard.mjs`) | 10-24 05:41 |
| C19 | The cast, alive (blink, breath, listening eyes, cheer; Blicky's gaze and giggle) | onboarding | works alone | `docs/nap/cast-life-sheet.png` (`pickje --life-sheet`); PICKLE_CHEER and BLICKY_GIGGLE fired in the app | 10-24 05:09 |
| C20 | Sound: three opening stings and four cues | onboarding | works alone | not heard yet (nothing played out loud); `node app/sound/check.mjs` all pass; a muted run logged all five cues at their moments | 10-24 05:17 |
| C15 | Session layer: .pickje/ in each repo, bg sessions, cmux | L6 | works alone | `app/service/`: handover 7.1 s round trip on a stand-in; new repos need one manual `claude` run (trust) | 10-23 23:45 |
| C16 | Voice bake-off | L2 | cut | his pick 23:47: "Cartesia, decided" | 10-23 23:47 |
