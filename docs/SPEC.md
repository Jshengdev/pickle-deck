# pickje spec · draft 1 · 2026-10-23, 11 PM PDT

How to read it. **His words** are verbatim, typos kept, and they're the strongest mark. **Fact** comes from the record
or research and carries its source. **Report** comes from `~/Downloads/BlickyPickle_Report.html`, an earlier draft that
isn't his words unless he said them. **Draft** is the lead session's proposal, and nothing marked Draft is his until he
reacts. **Open** is a call that's his. His words for this item are in `docs/spec/0001-directions-for-the-spec.md`.

## What he has signed so far

### S1 · How we work
- **His words:** "DO not decide and plan without me telling you what i want and how to do so" (10-23)
- **His words:** clicked "Draft to react to (Recommended)" and "Markdown + one HTML board (Recommended)" (10-23, 10:35 PM)
- **His words:** "We need to test all these things kind of independently. to ensure that they work and piece them together at the end. That's kind of like the main goal."
- **His words:** "Check the feedback in terms of what at the highest level it's supposed to do for us, and then combine them together when they are verified to work exactly how we imagined it."

### S2 · The magic moment
- **His words:** clicked "It sees what you mean" (10-23, 10:35 PM). He chose it over the report's wall.
- **His words:** "Start saying something that seems to like reference context from what you were looking at before, or from that point on, then use it. If it doesn't seem like it, then don't use it. Use just a screenshot as context."

### S3 · Wake and close
- **His words:** "shake it to awake for the hands free mode. It should shake and then the pickje appears adn thats how you talk to it. ANd then to end it a combination key bind to close it. That way you can keep working as normal and type as you orignially had and it still works" (typed into the trigger question, 10-23)

### S4 · Two characters
- **His words:** "the curosr will just have the little pickje guy there where he follows on the cursor. if you shake the cursor itll open the menu and he gets dazed. then you can interact with a small ui screen." (10-23, 5:59 PM)
- **His words:** clicked "Pickle (my read)". The option he picked read: "Pickle rides on your cursor and opens the shake menu, but its real work is backstage as the context brain, helping Blicky. Blicky is the one you see sketch and talk."
- **His words:** "It should be able to sketch on your screen kind of like how figma collaborative cursors are and can send texts to you through the screen like that." (10-23)

### S5 · Onboarding and the north star
- **His words:** "for the first one, you're gonna have to be doing two things very clearly. One is onboarding, and the second one is the magic moment."
- **His words:** "we do a quick onboarding experience where it's going to have Eleven Lab voice speak to you and it's going to kind of ask you like, what is your big goal? And that will become your north star."
- **His words:** "ambition starts in your own words, not a template, and then the draft is something to react to, and the reaction is the signature. So then we'll turn the goal into a abstract one-liner"

### S6 · The screen and the voice
- **His words:** "Always be reading the live screen." and clicked "Always, from day one" (10-23)
- **His words:** "it should use voice ai to communciate in a clean and fun way to sound chill." (10-23)

### S7 · Design
- **His words:** "It should keep its design extremly primitive and ready to accept the offical design tokens when the itme comes. It should jsut ensure each feature works as intended." (10-23)
- **Fact:** the official tokens will come from clicky-module's `_bmad-output/initiative-blicky/ux-blicky/DESIGN.md` (Google Labs design.md format), which was paused on 10-23 (`docs/context/decisions.md`).
- **Draft:** every visual value lives in one tokens file per surface, and every HTML surface gets DialKit.

### S8 · The foundation matches open-source Clicky
- **His words:** "Look at how heyclicky open source does it. match them for the ideal thing. Reference and read its source code and we are basically creating our foudnation to be exaclty like how they have it os really go deep into referencing it for waht we need. if that means the reccommned swift shell web overlay and node then so be it." (10-23, 10:55 PM)
- **Fact:** open-source Clicky (farzaa/clicky, MIT) is cloned at `~/code/rea-sandbox/clicky`. It's a native Swift macOS app (`leanring-buddy/`, about 7,750 lines, an Xcode project) plus a TypeScript Cloudflare Worker (`worker/`) that holds the keys. There's no web view and no Node daemon. A deep map is being written (`docs/research/clicky-foundation.md`, pending).
- **Fact:** event law: all code is written during the hacking period, so Clicky is read for structure and technique and our code is written fresh (`CLAUDE.md`, `docs/context/event.md`).
- **Draft:** a SwiftPM Swift app mirrors Clicky's app, since there's no Xcode.app here. A local TypeScript service on Node mirrors its Worker: it holds the keys from `.env` and fronts screenpipe, speech, models and cmux.

### S9 · Context lives in cmux sessions; a fast model for quick answers
- **His words:** "I want there to be two things, for the context organization, i wanted it to just sync with cmux and be able to do what we origniallyl inteneded. that way the context gets saved in its own repo and can be used for later tasks still. It should be able to group itself to a workspace version of it. So we are running the pickje which creates a session, and then sees the task at hadn and goes into that repo which should have all the context needed for that proejct. Really break it down. IDeally its cmux and runnign somethign in hre but we can also ahve a anthroipic api key just in case, and for faster responses use a really fast model from openrouter to run quick answers or sketches cheaply" (10-23, 10:55 PM)
- **Fact:** `claude -p` with Haiku took 6.8 s to return one word, measured 10-23 at about 10:45 PM. The cmux building blocks are being researched (`docs/research/cmux-sessions.md`, pending), and so are OpenRouter's fast models (`docs/research/models-survey.md`, pending).

### S10 · Keys he's getting
- **His words:** clicked "Anthropic API", "Cartesia" and "ElevenLabs", and typed "also test MOSS, find al the voice ai models we could possibly use and whihc one woudl probably stand out to be the best" (10-23)
- **Draft:** keys go in `.env` at the repo root, which is gitignored, by his hand and never through chat. Names are in `.env.example`.

### S11 · The lanes he started
- **His words:** clicked "Eyes + locate, local", "Pickle and the shake", "Ears, local first" and "Blicky's hand", with: "blickeys hand should just be the animate blicky but with a pencil in hand something like that. the curosr is the blicky is the idea. Ensure you really reveiw all the previosu spec docs and tappages to confirm the decison in a yappage that i had about wheri  visually wanat tohsi project to be" (10-23)

### S12 · The design lane runs in its own window
- **Fact:** his brand-lab window (cwd `~/code/hackathon`) is building the official tokens and a motion cookbook in `design/`, with his picks in `docs/spec/design-01-branding-and-motion.md`: "2.5D only", "Baked vinyl body + live eyes", mismatched "dingy" eyes, text that prints like a dot-matrix printer, and GSAP as the engine. This window doesn't edit `design/`. The build stays primitive and swaps in its tokens when they're ready.
- **His words:** "for the weall set, it doesnt need to use words to show what happened. it jsut needs to visually communciate that its been reviewed so pickje stamps it for you and you can undo the stamp possibley" (design-01, about 11:00 PM). My read: the wall still exists in his picture, as a stamp. See V1.

### S13 · The final product feels like open-source Clicky
- **His words:** "ensure that hte final product we have, feels and almost matches what the open source heyclicky kind of has. really try to borrow their ux and design motions stnadards and how they stylize thier movment and how their organizaiton of their architecture." (10-24, about 1:30 AM)
- **Fact:** an audit is comparing pickje against Clicky's motion constants, UX states, movement styling and file organization, with closed HeyClicky as a second reference (`docs/research/clicky-parity.md`, pending).
- **Draft:** the build window aligns motion, behavior and architecture with Clicky's standards. The final look stays with the design lane, and any conflicts go to him.

## Onboarding, built step by step (his reset, 10-24)

### OB · The spine
- **His words:** "can we start from the very beignning? how do we create an ddesing the onboaridng one at a time to do what it needs to do and run that flow. it should start as a little small borderless box in the cetner of the screen installed as some sort of app like how heyclicky the og is done. ... The starting box should be a small intro card with pickje and blicky and the mascots and then click achieve my greatest dreams! and then you go in and from our rbreadkdown of the official heyclicky onboarding. replicate it, and introduce each capability one at a time and ensure it actually works as we have intented." (`docs/spec/0002-onboarding-from-the-beginning.md`)
- **His words:** clicked "Yes, build down it step by step (Recommended)", "Run from cmux for now", "Meet Pickle and Blicky. (Recommended)" and "Your design window's baked cast (Recommended)".
- **Fact:** HeyClicky's onboarding, from his 10-23 run: welcome card → sign-in, attribution, style, color → "Hi, Johnny. I'm HeyClicky." [Give me a home] → 3 permissions in the notch → a 2-minute video → a 7-card tour (mic test, hold keys and say hi, the 4-question interview, drawing on screen, circling, type mode, one more thing) → Home with helpers made from his answers (`docs/research/heyclicky-onboarding.md` §3).

### OB0 · The intro card
- **Fact:** built (`app/shell/Sources/pickje/Onboarding/Steps/IntroStep.swift`, card in `Onboarding/OnboardingCard.swift`): a small borderless card in the center, with Pickle and Blicky redrawn as vectors from his pasted drawings (`Characters.swift`), "Meet Pickle and Blicky.", "Two tiny buddies for your biggest goal.", and [Achieve my greatest dreams!]. Run: `cd app/shell && swift run pickje --onboard`.
- **His words:** "Looks right, go to step 1" (10-24, about 2:00 AM). **Verified by him.**

### OB1 · Meet Pickle
- **His words:** "Make it so it ask them to shake their cursor and then pickje will appear and wave. and introduce just what pickje is doing"; "make it so the text is the pickle itself typing it out like the figma style of chatting that i saw somewhere already"; "for the next button make it just say shake me to go ot the next one. that should be the interaction that allows iit to move on. ... just ensure each part of the flow belongs as its own component" (10-24, about 2:00–2:15 AM)
- **Fact:** built (`Onboarding/Steps/MeetPickleStep.swift`, with `PickleHello.swift` and `PickleChat.swift`). The card says "Shake your cursor." A shake brings Pickle in, drawn as he drew him; he pops up big, waves three times and settles. He types "Hi, I'm Pickle." and two more bubbles in a Figma-style chat beside him (30–60 ms a character, a 5 s hold). Then the card says "Shake me to go to the next one.", and a shake moves on. Shakes while he talks are ignored, and no shake during the onboarding opens the mic. Checked through test hooks 10-24 about 2:20 AM.
- **Fact:** each step is its own component (`Onboarding/OnboardingStep.swift`: a protocol; `OnboardingFlow.swift` walks the steps in order).
- **Status:** waiting on his check.

### OB2 · What should I call you (the listening test)
- **His words:** "Make it say, yo! you look great today, what should i call u? and hten this tests the listing feature so if waht they saw shows up, then give them a witty response basically saying like with the context of hte message hmmm yea you look liek a xxxx and im a pickje." (10-24, about 2:25 AM)
- **Fact:** built (`Onboarding/Steps/NameStep.swift`, plus `app/brain` `quip`). Pickle types his line verbatim, then the mic opens and the person's words show in Pickle's panel as they speak. On the final, `node app/brain/cli.ts quip "<words>"` writes the line (claude-cli, about 2.0 s), the mic closes, Pickle types it, then "Shake me to go to the next one." The words go to the record verbatim. Checked 10-24 about 2:35 AM through test hooks with a silent file standing in for the mic: "you can call me johnny" → "hmmm yea, you look like a little johnny appleseed of snacks. and i'm a pickje."
- **Status:** waiting on his check, with his real voice.

### OB3 · Meet Blicky
- **His words:** see `docs/spec/0002` (10-24, 2:40–3:20 AM): the butt peek, the big eyes (now black dingy dots), "instead of walking out, just make him hide again and then pop out. from thin air and then say his thing", the bubble "in the same position as the pickle", draggable with feet that "flow freely".
- **Fact:** built (`Onboarding/Steps/MeetBlickyStep.swift`, `BlickyIntro.swift`, `BlickyStand.swift`, `BlickyGrab.swift`, `BlickyWalker.swift`). **Verified by him:** "ok its fire! go next" (10-24, about 3:22 AM).

### OB4 · It sees what you mean (now)
- **His words:** "maybe we should make the big goal at the end ... focus on showing its tech capabilites and what to expect to work and see during each demo scenario" (10-24, about 3:27 AM)
- **Fact:** built (`Onboarding/Steps/SeeNowStep.swift`). Blicky says he can see your screen and asks for a question, then the mic opens. Your words and the current screen go through Talk, and Blicky flies out, marks the thing and answers in his bubble. Checked 10-24 about 3:31 AM with a test question: the brain got a frame 1.3 s old, first caption at 2.8 s, first mark at 3.3 s. A frame showed Blicky's caption "That grey page" by the thing he meant. The first try showed nothing because closing the mic cancelled Talk; that's fixed.
- **His words:** "make it so when it means circle what it means. i want my cursor to bascially draw circles aroudn the spot and when it does, the pickle leaves behind a mini pickje that sits there and a small number 1 on the bottom right of it attached ... that way it can parralize thinking and still walk you through it. so make it guide you to draw small circles aroudn the poitns you want explained and just say, point 1 xxx and point 2 xxx" (10-24, about 3:35 AM)
- **Fact:** built. `CircleDetector` (PickjeCore) caught 10/10 synthetic circles, found 0 false circles in 25.3 simulated minutes of normal use, and read 0 of 50 shakes as circles (`swift run shakecheck`). While OB4 listens, each circle drops a pin (`Pins.swift`): the circle, a mini Pickle on its lower right, and a number badge. On the final, the words and pins go to Talk. The talk server starts one brain call per point at once (`prompts/talk.pin.md`), then walks through them in order: a ring, then "point N: …", paced so marks don't cancel each other.
- **Fact:** live, 10-24 about 3:39 AM: he circled 10 spots on a Storybook page himself while the lead's test circles and test question went in on top (the lead's mistake: don't inject while he's using it). A frame showed the rings, mini Pickles and badges 1–9 drawn. The 12-point turn walked through point by point, about 7 s each. 12 points at once is slow on claude-cli; 2–3 is the intended use.
- **Status:** waiting on his check.

### OB5 · It sees what you mean (earlier)
- **His words:** "it shoudl pull the past frames and just hsow whats impmorant frmo before thats what matters" (10-24, 12:54 AM)
- **Fact:** built (`Onboarding/Steps/SeeEarlierStep.swift`, `app/service/earlier.ts`, `prompts/talk.earlier.md`). Blicky says he remembers your screen, then the mic opens. Your words go to the talk server as an "earlier" turn: it picks your content words, searches the last hour of screenpipe text, finds where the words sat on the best frame, and crops just that part (at least 300×280, at most 40% of the frame either way). The card shows the crop beside Pickle with a highlight on the words and a time label, and Blicky answers from the crop.
- **Fact:** checked 10-24 about 3:55 AM, while he was away. "what was that natural palettes page i was looking at earlier?" found the frame from 15 minutes before (search plus crop took about 370 ms). The card showed the "Natural palettes" heading highlighted, labeled "3:40 AM · 15 min ago", and the answer from claude-cli started at 2.8 s. Two bugs fixed on the way: the brain's image loader needs 256 px a side (the first crop was 332×200), and the crop was deleted before the shell loaded it.
- **Status:** waiting on his check. Run it with `bin/pickje --onboard-from OB5` and ask about something you looked at in the last hour.

### OB6 · Hand over
- **His words:** "its just inside pickje and it create a new folder for that subject. and that is where it acts as its own context but pickje is just looking in and adjusting whatever"; clicked "It starts working"; "click the stamp and then a small popup shows undo on it" (10-24, about 4:25 AM)
- **Fact:** built (`Onboarding/Steps/HandOverStep.swift`, `StampPanel.swift`, `app/service/subject.ts`). A spoken task gets `subjects/<name>/` inside pickje (gitignored) with its own `.pickje` desk and words, plus a Claude Code background session there (file edits only). The session says the task back ("got it: …"). The check is for meaning (a new paraphrase mode in the say-back check), and a cmux workspace shows the session. If it matches, Pickle's red seal stamp appears; click it and "undo" pops up, which stops the session.
- **Fact:** checked 10-24 about 4:40 AM with "write a short haiku about pickles in a file called haiku.md". Standalone, the session wrote `haiku.md` ("Green in salty dark, / a cucumber learns patience. / One crunch: worth the wait."). In OB6 the hand over took 14.8 s, the say-back "you want a short pickle haiku saved as haiku.md in this folder." matched, the stamp showed, and undo stopped and removed the session. A real mismatch ("draft" → "ship") is still caught.
- **Fact:** 10-24 about 5:21 AM (his nap), a re-run showed the session never did the work: Claude Code blocks a background session's first edit inside a git checkout until it moves to a worktree, and `subjects/` sits inside pickje's checkout. Each subject folder now gets `.claude/settings.json` with `"worktree": {"bgIsolation": "none"}` (that folder only) and its own CLAUDE.md that scopes the session to his pick "It starts working". Re-checked 5:24 AM: matched in 9.3 s and the session wrote `haiku.md`. A missed say-back (found twice) now stops the session. Needs his yes (docs/NAP-REPORT.md).
- **His words:** "the stamp is a very AI generated looking thing. Considering the branding guidllines waht material or ui can we have instaed so it makes more sense?"; clicked "A moss ring that grows" (over my pick, a die-cut sticker), "Peel it off", "On the ground around Pickle" (10-24 morning).
- **Fact:** the red "GOT IT" seal is gone. When something is kept, moss grows in a ring on the ground at Pickle's feet, tuft by tuft, then pink, blue and white flowers; click it for "undo", which peels it off. Seen in `pickje --life-sheet`; not yet seen live.
- **Status:** waiting on his check. Run it with `bin/pickje --onboard-from OB6`.

### OB7 · The big goal (last, into the demo)
- **His words:** "maybe we should make the big goal at the end because it takes the most time and will be able to transition cleaner to the end goal that we are buidlign for demo scenarios" (10-24 3:27 AM); clicked "Blicky asks right away", "The same seal, undo on click", "Panel stays, shake to see it work", "Blicky types while Pickle thinks" (10-24 morning). Earlier clicks: "One big question, then narrow", "Your spoken reaction", "Pickle's small panel".
- **Fact:** built (`Onboarding/Steps/BigGoalStep.swift`, `DeskSession.swift`, the desk's beat lines in `app/desk`). The desk (C11) runs the conversation; the mic opens whenever it waits for him; Pickle's eyes go in while it thinks; "let me put that into one line…" fills the draft wait; his yes grows the moss; Pickle's panel keeps the north star and the step; "Shake me to see it work." With a test mic file it writes to /tmp, never his desk.
- **Fact:** checked off-screen: the desk protocol end to end (ask, follow-ups, drafting, draft, stamp with the panel lines, signed); desk check 4/4.
- **Status:** his first on-screen run, `bin/pickje --onboard-from OB7`.

### OB2b · The mic, one permission
- **Draft:** one line with the reason. Under cmux the mic is already allowed. Uses C2.

### OB3 · Mic test
- **Draft:** "Say anything. If the bars dance, I can hear you." Level bars. Uses C2.

### OB4 · Wake and sleep
- **Draft:** "Shake your cursor to wake me", then dazed, then listening. "⌃⌥⌘P puts me to sleep." Uses C1.

### OB5 · Say hi
- **Draft:** Blicky answers in a bubble, with voice once the Cartesia key is in. Uses J1.

### OB6 · The big goal
- **Draft:** "what is your big goal?", then 2–3 follow-ups, then the north star and one step in Pickle's panel. His yes gets the stamp. Uses C11 (`app/desk`, works alone).

### OB7 · It sees what you mean, now
- **Draft:** "Ask me about something on your screen." Blicky flies there and marks it. Uses C4, C7, C17.

### OB8 · It sees what you mean, earlier
- **Draft:** "Ask about something you saw a minute ago." The past-frame card. Uses C5, C18, C17.

### OB9 · Hand over
- **Draft:** "I made a session for your goal." Handover, then the say-back, then the stamp. Uses C15.

## Onboarding, beat by beat

### O1 · Shake to wake
- **His words:** "you shake your cursor together, the pickle appears from thin air"
- **His words:** "if you shake the cursor itll open the menu and he gets dazed. then you can interact with a small ui screen." (10-23)
- **Fact:** macOS has its own "Shake mouse pointer to locate", which enlarges the pointer. This Mac has no override set, and whether it's on isn't confirmed (`docs/context/techniques.md`). Turning it off is a settings change, so it needs his yes.
- **Draft:** Pickle pops in at the cursor dazed for a beat. The mic goes live, and a small panel beside him shows that he's listening, with a live caption of what you say.
- **Open:** does the shake open the menu and small panel (10-23), go straight to talking (tonight), or both?
- **Verbs:** Catch: from here on, everything said is kept raw.
- **Needs:** C1, C2

### O2 · Permissions, each at the moment it's needed
- **Report:** "Each permission, at the moment it's needed … One line each, with the reason." and "Privacy is said once, plainly: everything stays local."
- **Fact:** screenpipe already reads the screen all the time and serves frames at `localhost:3030` (`docs/context/this-mac.md`). Whether pickje could skip its own Screen Recording permission by reading screenpipe is not verified yet (`docs/research/screen-reading.md`, pending).
- **Draft:** the first shake asks for the microphone in one line, with the reason. Following the pointer and spotting a shake probably need no permission at all (not verified).
- **Open:** each permission change goes to him first, as the exact change, and happens only on his yes (CLAUDE.md).

### O3 · It asks your big goal, out loud
- **His words:** "it's going to have Eleven Lab voice speak to you and it's going to kind of ask you like, what is your big goal?"
- **Report:** "Its first and only line asks for your goal, not your settings." The report's line was "Hold Fn and tell me what you're working toward." His shake replaces the Fn.
- **Fact:** HeyClicky 1.0.53's onboarding, from his 10-23 footage, asked "four quick questions": "What are you working on these days? What's your story?", "What's the first piece you want to build and try?", "What's the actual thing you want to come out of it, like a demo or prototype?", "Who is it for, just you or someone you want to show?". Each turn says his last answer back in one line, then asks one narrower question. It never asked about deadlines or success criteria, and never read back a summary to confirm. It ended with three agents named from his answers, each with three starter tasks behind Yes / Adjust / No. First question to trust summary took 1:30, to the made-for-him agents 3:49, and the whole onboarding 9:11 (`docs/research/heyclicky-onboarding.md` §3–§4, §9).
- **His words:** right after that onboarding, "ITs really simple and it captures exactly what i wanted my next actionable step to be and how to achieve it." and "felt_off: nothing its hoenstly beaitufiul." (10-23, 3:49 AM, clicky-module `party-five-tensions/his-words/2026-10-22-part-3-heyclicky-study.txt:90-100`)
- **Fact:** voice quality, from Artificial Analysis (third-party): ElevenLabs v4 Turbo ranks 1, Cartesia Sonic 3.6 ranks 4, and ElevenLabs Flash v2.5 ranks 50. Perceived first audio, from a 9-8 board reported by a competitor: Sonic 3.6 440 ms, Flash v2.5 185 ms. For "chill", Cartesia has emotion settings such as calm, content and peaceful, and ElevenLabs has tags such as `[sighs]` and `[whispers]`. ElevenLabs' socket for streaming text in doesn't take v3 or v4 (`docs/research/voice-and-boxes.md` Part A). Nothing was listened to or timed on this Mac.
- **His words:** clicked "Blicky, in your words: 'what is your big goal?' (Recommended)" (10-24, about 1:25 AM).
- **Fact:** the voice is Cartesia (S10, "Cartesia, decided").
- **Verbs:** Show
- **Needs:** C3, C13

### O4 · You yap the goal, and every word is kept
- **Report:** Catch "saves your words raw, with when and where · never tidies them"
- **His words:** clicked "One big question, then narrow (Recommended)" (10-23, 11:19 PM). Pickle asks the big goal, then Blicky asks at most 2–3 follow-ups, each saying the last answer back in one line, before the draft.
- **Draft:** the transcript streams into the panel as you talk and lands verbatim in the local record, with the time and the app you were in.
- **Verbs:** Catch
- **Needs:** C2, C10

### O5 · A draft north star to react to
- **His words:** "the draft is something to react to, and the reaction is the signature. So then we'll turn the goal into a abstract one-liner"
- **Report:** the desk holds "why · done · must stay true · where it stopped · next", and "Its guesses stay visibly softer than your words. You talk through the draft; what you say is what's kept."
- **Draft:** Blicky says back a one-line north star and shows the desk, with your words strongest and its guesses softer. You talk it through, and what you say back is what gets kept.
- **His words:** clicked "Your spoken reaction (Recommended)" (10-23, 11:51 PM). What he says back edits the draft and is kept verbatim. A clear yes gets Pickle's stamp, with undo, the same stamp as Hand over.
- **Verbs:** Keep, Push
- **Needs:** C9, C10, C11

### O6 · The next step
- **His words:** "it's like trying to show like what's the next action step. Like if you're doing this, then the first thing you should probably be doing. Like it has long horizons thinking. Like it thinks ahead, but then it only shows you the most four decision based on the current context, and then depending on what's revealed. It'll update itself and show what's next based on the current context"
- **Report:** "The next step is always one line you could start now. Push asks at most one question, with its recommended answer, and never runs anything."
- **Draft:** a long-horizon outline sits hidden behind the north star, and only its front shows. When the screen or your words reveal something new, it re-ranks and the step on show changes.
- **His words:** clicked "Pickle's small panel (Recommended)" for where the north star and next step show, and "When you speak or the screen shows progress (Recommended)" for when the step updates: after each thing he says, and on a big screen change (a new app, a file saved, a test passing), checked at most once a minute (10-24, about 1:25 AM).
- **His words:** clicked "One step (Recommended)" (10-23, 11:19 PM). It shows one line you could start now, with the long plan hidden behind it.
- **Verbs:** Push, Keep
- **Needs:** C11

### O7 · A quick demonstration, then it waits
- **His words:** "I basically want to create a situation where you can read the onboarding, and then it just wait and it basically will show a quick demonstration of how everything works."
- **Draft:** after the north star, Blicky does one short show-me. It points at something on your screen that's tied to the next step (the magic moment, M1 to M6, staged once), then goes quiet and waits.
- **Open:** is the demonstration the magic moment itself, or a separate scripted tour?
- **Needs:** M1–M6

### O8 · A key combo closes it
- **His words:** "ANd then to end it a combination key bind to close it. That way you can keep working as normal and type as you orignially had and it still works"
- **Fact:** ADR 0006: "It never moves Johnny's real pointer or presses his keys." (`docs/context/decisions.md`)
- **Draft:** while Pickle is awake, typing passes through untouched because pickje never takes focus. The mic stays live until the combo.
- **Open:** which keys? After closing, does Pickle stay quietly at the cursor or vanish until the next shake?
- **Needs:** C1

## The magic moment: it sees what you mean

### M1 · You say what you mean
- **His words:** "Start saying something that seems to like reference context from what you were looking at before, or from that point on, then use it."
- **Draft:** lines to test with: "what's this error", "make this shorter", "go back to the chart I had open earlier", "the thing I was reading ten minutes ago".
- **Verbs:** Catch
- **Needs:** C2

### M2 · Now, earlier, or neither
- **His words:** "If it doesn't seem like it, then don't use it. Use just a screenshot as context."
- **Draft:** a fast check reads the sentence and returns one of three answers: now, earlier (with a time or app hint), or no screen reference. Now goes to the current screen and earlier goes to screenpipe. With no reference, it still sends the current screenshot, as he said.
- **Test variants:** pointing at now ("this", "here", "right there"), plainly earlier ("earlier", "before lunch", "the tab I closed"), earlier but implied ("the error from before"), and no reference ("what's a good name for this startup").
- **Verbs:** Recall, Ground
- **Needs:** C6

### M3 · Pull the right moment
- **His words:** "because ScreenPipe is running 24/7, it'll take a recording of like a running repository of your all like your entire screen, and then it'll try to select just the areas that you're referencing."
- **Fact:** screenpipe's `/search` returns text only, with no positions, newest first by default. That corrects `docs/context/this-mac.md`, which says oldest first. Most rows are accessibility text even when you ask for OCR. A new full-text search takes about 15–190 ms (checked live 10-23, `docs/research/screen-reading.md` §2c, §2g).
- **Fact:** the `input` content type logs each click's x/y and the role and name of the element clicked, with a frame id (§2d).
- **Fact:** HeyClicky sends a cloud model a JPEG screenshot, with what looks like a per-turn decision about whether to include one. For "earlier", it keeps each past turn's screenshot in the session, with no continuous recording. Model names in its binary include Claude opus, sonnet and haiku 5-5, OpenAI realtime voice and Deepgram. Which model sees the screen isn't verified. The installed app is 1.1.1, while he tested 1.0.53 (§1).
- **Draft:** for "earlier", search the text using the hint and pick the frames that match best. For "now", take the newest frame or a fresh capture. Our read: the continuous history is the part that differs from HeyClicky.
- **Needs:** C4, C5

### M4 · Find where it is
- **His words:** "Ensure that we're using Jet for this, as it can do bounding box and figure out where the location of things are."
- **Fact:** no model, API or product named "Jet" does bounding boxes. Close names that exist: Jedi (open UI-grounding models), Gemini (documented `box_2d` output, and an MLH Gemini prize at Cal Hacks), and NVIDIA Jetson (hardware) (`docs/research/voice-and-boxes.md`, "Jet" search).
- **Fact:** screenpipe already stores boxes for every saved frame, both OCR words and accessibility elements, normalized 0–1 to the monitor. `/frames/{id}/elements`, `/ocr` and `/context` return them in about 3–25 ms, and OCR on demand takes 0.37–0.49 s (`docs/research/screen-reading.md` §2e). This is local, so nothing leaves the Mac.
- **Fact:** the cloud options return different coordinates. Gemini gives `[ymin, xmin, ymax, xmax]` on 0–1000, Claude gives pixels of the image it processed, and GPT gives screenshot pixels. Third-party ScreenSpot-Pro scores: GPT-6 Astra 92.7%, Claude Opus 4.8 87.9%, Gemini 3.1 Pro 84.4%. None were found for Opus 5.5, Sonnet 5.5 or Haiku 5.5 (`docs/research/voice-and-boxes.md` Part B).
- **Report:** "It only starts pointing once it's right 8 times in 10. Below that it names two windows and waits." This comes from ADR 0005, which his "Always, from day one" reopened.
- **Open:** what are "Jet" and "jev"?
- **Verbs:** Ground. Report: "names what you point at · never names what isn't on screen"
- **Needs:** C7

### M5 · Blicky flies there and explains
- **His words:** "i really like how it does annoate and move its own cursor and adds a boudnign box and explains of it. i like how it uses voice to talk back but hoesntly might need some caption writing of it like ghost writing and to show more visualizations at each key moment." (on HeyClicky, 10-23)
- **His words:** "def reference figma collaborator cursors for what this experinece looks like" (10-23)
- **Fact:** Clicky's flight follows a quadratic curve with smoothstep easing. Its duration is the distance divided by 800 pt a second, held between 0.6 and 1.4 s, and the arc rises at most 80 pt. Figma's cursor chat holds 52 characters and stays 5 s after typing stops (`docs/context/techniques.md`).
- **His words:** "HAve a set of different UI elements it can choose in the situation" (10-23, 11:51 PM, asked box or ring).
- **His words:** clicked "Box + ring", "Arrow" and "Underline + highlight" but not Spotlight, and typed "we should create more easy to use library to create visualizaitons" (10-24, 12:04 AM).
- **Draft:** the mark set is box (a UI element), ring (a loose region or a moment), arrow (direction), underline (a line of text) and highlight (a span), built as a small native mark library that makes it easy to add new marks.
- **Fact:** the generative-UI research recommends "beat lines": the brain streams one JSON object per line, `{"say":"…"}` or `{"do":"<call>",…}`, and each line runs as soon as its newline arrives, with ink timed to a spoken word via Cartesia's word timestamps. Its calls: box, ring, arrow, underline, highlight · fly, hover, follow, home, clear · say, caption · card, close · stamp, undo. It estimates Blicky lands 1.3–2.6 s after the request, against about 18 s for HeyClicky's box (not measured) (`docs/research/generative-ui.md`).
- **His words:** "basically create a set of differnet api calls it can make for differnet drawings or ifi ts moving and have a library to call form when it comes to makign them, see and understand whats hte most efficinet way that generative ui should." (10-24, 12:54 AM)
- **Fact:** research on the most efficient generative-UI call format is running (`docs/research/generative-ui.md`, pending). The native marks (box, ring, arrow, underline, highlight), the movement calls and the card are being built in `app/shell/`. The brain picks one per reply with a one-line why. The native drawing for the new marks comes after the mic lane frees `app/shell/`.
- **Draft:** Blicky's own cursor, with its name tag, leaves Pickle's side, flies to the mark and draws it. A caption types beside it while the voice says the same words. Your pointer never moves.
- **Verbs:** Teach, Show
- **Needs:** C8, C3

### M6 · One follow-up, then back to the goal
- **His words:** "i like how it asks simple follow up questions and answers" (on HeyClicky)
- **His words:** "Im now seeing the bottleneck being the speed of hte response and need a fast but smart model for a simple task." (on HeyClicky)
- **Fact:** HeyClicky's speeds, from the recording: about 3 s to reply to his circle, 5 to 10 s for interview replies, about 18 s to draw, and about 22 s to ask a clarifying question (`docs/context/what-exists.md`).
- **Draft:** Blicky asks at most one follow-up, with its recommended answer. If what it saw changes the next step, the desk updates.
- **Open:** a speed target from a finished sentence to the first spoken word. The draft says under 3 s, to beat HeyClicky's fastest.
- **Verbs:** Push, Keep
- **Needs:** C9, C11

## The pieces, each built and tested alone

### C1 · Pickle at the cursor, the shake, and the close combo
- **Fact:** Clicky's overlay is one borderless, transparent, click-through window per display, above everything and on every Space. It never takes focus, and it draws its buddy at +35, +25 pt from the pointer about 60 times a second (`docs/context/techniques.md`).
- **Fact:** it works alone: `cd app/shell && swift run pickje`. The shake detector caught 10 of 10 wiggles with 0 false wakes in 25.3 simulated minutes (`swift run shakecheck`, re-run by the lead 10-23 11:31 PM). The placeholder close combo is ⌃⌥⌘P, registered only while awake, with no Accessibility needed. The dials page `app/shell/dials/index.html` tunes `tokens.json` live on 127.0.0.1:47821. Pickle showed up in a screenpipe frame at the pointer. A real shake by his hand, full-screen apps, Spaces and a second display aren't verified.
- **Done-check:** a shake shows Pickle within 200 ms and logs `WAKE` with a timestamp, and the combo logs `SLEEP`. In the sandbox, a scripted wiggle wakes it 10 times in 10, and 2 minutes of normal mouse use cause no false wakes.
- **Lane:** L1

### C2 · Ears: hands-free voice in
- **His words:** "thats how you talk to it"
- **Fact:** whisper.cpp runs locally with base.en and makes up filler during silences. ffmpeg started inside cmux can record the mic. screenpipe's audio is off (`docs/context/this-mac.md`).
- **Fact:** native capture works (`app/shell/`, PickjeEars). The mic opens on shake and closes on ⌃⌥⌘P. The room test captured 99.53% of wall time with 0 gaps, against ffmpeg's 78–88%. The test sentence transcribed exactly, with 45,398 samples sent and 45,398 received (`swift run earscheck`, re-run by the lead 10-24 12:56 AM). There was no permission prompt; Microphone is authorized under cmux. Words in the first ~0.5 s after a shake are lost. **Privacy note:** the agent's first live run transcribed a nearby person talking to him. Nothing was saved and the logs were deleted.
- **Fact:** a local version works: `node app/ears/cli.ts listen`. The fixture sentence transcribed exactly, 370 ms with server start (re-run by the lead 10-23 11:29 PM). Partials take about 75 ms, finals 1.5 s after speech. ffmpeg's mic input on this Mac **drops 12–22% of the audio**, which turned "pricing" into "price in" on a test. The fix is native capture in the Swift app, as Clicky does with AVAudioEngine; that needs a Microphone permission for pickje (`app/ears/README.md`, agent report).
- **Fact:** cloud speech-to-text: ElevenLabs Scribe v2 realtime ("partial transcriptions in ~150 milliseconds") and Cartesia Ink 2 (realtime, with built-in turn detection and no separate VAD). Neither has a Swift SDK for this, but both document a plain WebSocket. No Cartesia or ElevenLabs key is in his environment (`docs/research/voice-and-boxes.md` Part A).
- **Draft:** the mic is live while Pickle is awake, with streaming transcription from one of three sources: whisper.cpp locally, Cartesia, or ElevenLabs.
- **Done-check:** saying a fixed sentence gives a transcript within 2 words of it, and the time from the end of speech to final text is logged.
- **Open:** local or cloud speech-to-text.
- **Lane:** L2

### C3 · Mouth: voice out
- **Done-check:** text in, and the time to first audio is logged. Whether it sounds "chill" is for his ear to judge.
- **Open:** ElevenLabs or Cartesia.
- **Lane:** L2

### C4 · Eyes, now
- **Fact:** screenpipe has no "latest" route. Search with limit 1 (about 1 ms), then `/frames/{id}`: a 1728 x 1117 JPEG in 1–2 ms. In four samples, the newest searchable row was 11–28 s old, and whether that's processing lag or a still screen isn't verified (`docs/research/screen-reading.md` §2f).
- **Draft:** the newest screenpipe frame, or our own capture. Our own capture needs Screen Recording for our app.
- **Done-check:** returns an image less than 2 s old, with its timestamp and display. The 11–28 s lag above may fail this, which is what decides Q6.
- **Lane:** L3

### C5 · Eyes, earlier
- **Done-check:** given a phrase that was on screen in the last hour, it returns the right frame id and time.
- **Lane:** L3

### C6 · The now-or-earlier check
- **Done-check:** the sandbox runs 30 varied sentences per family and prints the accuracy for each family.
- **Lane:** L3

### C7 · Locate: boxes on screen
- **Done-check:** on test screenshots with known targets, the box overlaps the target (IoU 0.5 or more) at least 8 times in 10. That bar is the report's.
- **Open:** which model ("Jet"?)
- **Lane:** L4

### C8 · Blicky's hand: cursor, sketch, caption
- **Fact:** an HTML prototype works alone: `app/blicky/index.html`. `pointAt` flights matched the formulas (rise 80 pt, time within 9 ms, swell 1.3), the pencil draws the full box, and captions type out. Frames are in `/tmp/pickje-blicky/` (agent check, 10-23 about 11:25 PM). It's now the motion reference for the native port.
- **Fact:** the visual review is `docs/research/visual-direction.md` (49 quotes). Open from it: does the pencil replace the gun in his drawing? Which Blicky is the cursor, his drawing or the 3D cast? Box or ring?
- **Fact:** the native port works alone. Blicky is drawn in SwiftUI in the shell's overlay. `node app/shell/tools/blicky.mjs point x y w h "caption"` flies, draws, types, holds 5 s, fades and returns, then prints `POINT_DONE`. In screenpipe frames the box landed within 1 pt of the requested spot. 67 values are in `tokens.json` with dials. 12 Blicky unit cases pass in `swift run shakecheck` (re-run by the lead 10-23 11:50 PM).
- **Draft:** Blicky is hidden beside Pickle and appears only to point, from his 10-20 note "blikey shows up when he wants" (agent's read). The `homeOpacity` dial sets it to 1 to keep Blicky always visible.
- **Done-check:** given a box in screen coordinates, Blicky flies to it, draws it and types a caption. Saved as a short screen clip for him to judge.
- **Lane:** L5

### C9 · The brain
- **Fact:** it works alone (`app/brain/`): a provider chain jev → openrouter → anthropic → claude-cli. Only claude-cli has run, because there's no `.env`. On claude-cli (Haiku 5.5): now-or-earlier went 9/9 at about 2 s; the sandbox's own run went 9/9 on freshly generated sentences (re-run by the lead 10-24 1:12 AM); `reply` gave first token at 0.8 s with a point that landed exactly on its target; `sayback` settled by rules in 1 ms (`draft → ship`). Each point carries a mark and a why, from `app/brain/marks.json`. The fast OpenRouter model is the agent's pick, `openai/gpt-6-luna`, not his.
- **Draft:** Claude, called by a local daemon: a fast model for quick calls (the now-or-earlier check and the first reply) and a stronger one for the north star.
- **Done-check:** given a transcript plus context, it returns reply text and an optional point or box within the speed target.
- **Lane:** L6

### C10 · The record
- **Fact:** an entry in the calhacks record has these fields: `ts`, `origin`, `where`, `by`, `words`, `kind`, `outcome`, `reaction`, `moment`, `loss`, `refs` (`docs/context/record.md`).
- **Draft:** a local, append-only JSONL file in `record/`.
- **Done-check:** every utterance is appended verbatim with its time and where it was said, and the file only grows.
- **Open:** do pickje's sessions join `~/code/calhacks/record`?
- **Lane:** L6

### C11 · North star, the desk, the next step
- **Done-check:** each of 5 recorded goal yaps gives a one-liner, a desk and one next step. His reaction is the check.
- **Lane:** L6

### C12 · The sandbox debugger
- **His words:** "create some sort of sandbox debugger where it can test itself with its own custom prompts and every test is different and slightly varied from each other, just to know that it works in real world scenarios"
- **Draft:** a runner. It takes a seed scenario per piece, has a model write N varied versions (different phrasing, timing, apps and noise), runs the piece on each, and records pass or fail along with the input. A page shows the results. Voice pieces are tested by playing C3's synthesized speech into C2, so it tests its own ears with its own mouth.
- **Fact:** it works alone (`app/sandbox/`). `node app/sandbox/run.ts ears --n 12` generated 12 fresh sentences each run (0 repeats between runs) through `claude -p`, spoke them with varied macOS voices and rates, and transcribed them. Pass rates were 11, 10, 6 and 6 of 12. Most failures were number formats ("11 AM" against "11am"), and whisper base.en sometimes drops the leading "Pickle,". The report is `app/sandbox/report.html`, with dials. `nowearlier` waits on C6 and prints FAILED; it never fakes a pass.
- **Done-check:** one command runs C6 on 20 generated variants and prints a pass rate. A second run produces different variants.
- **Lane:** L7

### C13 · The onboarding flow
- **Draft:** a small state machine that strings O1 to O8 together, using C1 to C11.
- **Done-check:** the full onboarding runs end to end on his Mac.

### C15 · The session layer: cmux workspaces per project
- **His words:** "So we are running the pickje which creates a session, and then sees the task at hadn and goes into that repo which should have all the context needed for that proejct." (S9)
- **Fact:** cmux 0.64.17 can make a workspace per project: `cmux new-workspace --cwd <dir> --name <n> --command "claude" --group <g>`. `cmux --json list-workspaces` maps workspaces to folders, `cmux sessions --agent claude --json` maps Claude sessions to workspaces with idle or running state, and `cmux events --category agent` streams hook events. It has no safe "message an agent" command; only `cmux send` keystrokes, which can land in a half-typed prompt (`docs/research/cmux-sessions.md` §1).
- **Fact:** cmux's socket is in `cmuxOnly` mode. Only programs started inside a cmux terminal can drive it; anything else is refused unless a cmux setting changes (§1.8).
- **Fact:** Claude Code can hand a session a message without keystrokes: cross-session `SendMessage` between Claude sessions, `claude --resume <id> "..."`, or background sessions (`claude --bg`, read with `claude agents --json`) (§2.5).
- **Fact:** ADR 0002, his click on 10-19, keeps everything in one home per Mac, "outside every repo", so private words never reach GitHub. His 10:55 PM words say "the context gets saved in its own repo" (§3.2, §3.5).
- **His words:** clicked "In each repo, never committed (Recommended)", "Background sessions, shown in cmux (Recommended)" and "Inside a cmux workspace (Recommended)" (10-23, 11:28 PM).
- **Fact:** it works alone (`app/service/`): `attach`, `session`, `handover`, `show`, `state`, `forget`. On a stand-in project, handover delivered his line verbatim in 0.94 s and the session's say-back came back exactly at 7.1 s total. `show` made a `pickje · <project>` workspace without stealing focus. Everything was cleaned up after. **Catch:** Claude Code refuses a brand-new git repo as untrusted, so each new project needs him to run `claude` in it once. The stamp waits on the brain's say-back check.
- **Draft:** each project repo gets a `.pickje/` folder (north star, desk, his words) hidden by `.git/info/exclude`. Each project gets a `claude --bg` session; Hand over is `claude --resume <id> "<his words>"`; state comes from `claude agents --json`. A cmux workspace per project shows it with `claude attach`. The service runs in a `pickje` cmux workspace.
- **Verbs:** Route, Hand over, Keep

### C16 · Voice bake-off
- **His words:** "also test MOSS, find al the voice ai models we could possibly use and whihc one woudl probably stand out to be the best"
- **Draft:** once the keys are in `.env`, one page plays the same three lines from each provider side by side, with time to first audio measured. A provider without a key shows "no key"; nothing is faked. His ear picks.
- **Needs:** keys (S10), `docs/research/models-survey.md`

### C14 · The board
- **Fact:** a background agent is building it in `docs/board/` (status in `docs/STATUS.md`).

## How the pieces slot together

### F1 · The run path
- **Draft:** shake (C1) → mic on (C2) → words → the record (C10) → the brain (C9). If the words refer to the screen: the now-or-earlier check (C6) → screen now (C4) or earlier (C5) → locate (C7). Then voice (C3) and Blicky's cursor (C8) → the desk and next step (C11).

### F2 · The shape of the processes
- **Report:** "Mac shell Swift / AppKit · The card React in a web view · The daemon Node / TypeScript + Claude · The sessions Claude Code in tmux · The record local, append-only"
- **Fact:** Clicky is one native Swift menu-bar app plus a 141-line Worker holding 3 keys. Its overlay is drawn natively in SwiftUI (`OverlayWindow.swift:14-53,795-806`), with zero WebKit. Its run path waits on each step in turn: transcript final up to 1.4 s after release, every screen captured, the whole Claude reply, the whole ElevenLabs MP3, then playback (`CompanionManager.swift:586-726`). SwiftPM built a SwiftUI menu-bar probe here in 37 s, and it signed ad hoc. A self-signed `blickey` certificate in the keychain could keep permissions from resetting on each rebuild (`docs/research/clicky-foundation.md` §0, §2, §5, §8).
- **Draft:** a Swift app mirrors Clicky's app, and a local Node service mirrors its Worker and adds the caller check the Worker lacks. Each piece is a module that the service or the sandbox can call on its own.
- **His words:** clicked "All native, like Clicky" (10-23, 11:28 PM), over the web-view option.
- **Draft:** SwiftUI draws Pickle, Blicky, the pencil, captions and the stamp. DialKit tunes them over the shell's local socket. The design lane's GSAP recipes become the motion reference, re-done natively.

## Lanes: what runs in parallel

### L1 · Mac shell
- **Draft:** C1, and the overlay window that hosts C8. Swift.

### L2 · Ears and mouth
- **Draft:** C2 and C3, each first as a standalone script with its own done-check.

### L3 · Eyes
- **Draft:** C4, C5 and C6 on screenpipe.

### L4 · Locate
- **Draft:** C7 against a folder of test screenshots with known targets.

### L5 · Blicky's hand
- **Draft:** C8 as an HTML page first, with DialKit, then moved into the overlay.

### L6 · Brain and desk
- **Draft:** C9, C10 and C11, first as a command-line tool.

### L7 · Sandbox
- **Draft:** C12, which starts with C6 because that one is pure text.

## Joins: the order pieces come together

### J1 · Talk
- **His words:** clicked "Talk: shake, say, hear a reply" as the first join (10-24, 1:11 AM).
- **Draft:** L1 + L2 + L6. Shake, say a sentence, hear a chill reply, close with the combo. Part 1 (the talk server in `app/service/`: brain → beat lines → Cartesia, with a caller token) is building. Part 2 wires the shell to it once the marks lane frees `app/shell/`.

### J2 · See and point
- **Draft:** L3 + L4 + L5. Say "this" or "earlier", and Blicky flies to the right box.

### J3 · Onboarding
- **Draft:** J1 + C11 + C13. From shake to the north star to the next step.

### J4 · The full demo run
- **Draft:** J2 inside J3: the onboarding's demonstration is the magic moment.

### J6 · Clips
- **His words:** clicked "Record every join as it lands" (10-24, 1:11 AM). Each join gets a clip when it first works, and the video is cut from those clips.

### J5 · The sandbox over every join
- **Draft:** each join gets its own varied tests before it counts as done.

## The verbs for this spine

### V1 · Picked for the demo
- **His words:** "We need to handpick the ones that matter for our demo scenario and make it repeatable for multiple different use cases"
- **Report:** 15 verbs in five groups. Senses: Catch, Ground, Attune. Remembering: Keep, Recall, Bring back. Voice: Show, Route, Hand over. Reflection: Gauge, Push, Teach. Sleep: Curate, Learn, Measure.
- **Draft:** in: Catch, Ground, Keep, Recall, Show, Push, Teach, and now Route and Hand over (S9). Out for now: Attune, Bring back, Gauge, and the whole Sleep group.
- **His words:** "for the context organization, i wanted it to just sync with cmux and be able to do what we origniallyl inteneded" (S9). My read: this brings back Route (pick the session) and Hand over (give it your words). Whether the report's say-back wall comes with them is still open.
- **His words:** clicked "Stamp it, undo allowed (Recommended)" (10-23, 11:19 PM). The session gets his exact words. When what it says back matches, Pickle stamps it, with no words, and he can undo.

## Verify it yourself, piece by piece

### V0 · How this works
- **His words:** "make sure when we are buildng it, we are doing it piece by piece with something to verify at each step" (10-24, about 1:17 AM)
- **His words:** clicked "Yes, my check gates each join (Recommended)" (10-24, about 1:25 AM). A piece is marked verified by him only after he runs its try-it line and says it's right, and only verified pieces get joined.
- **Fact:** verified by him so far: none.

### V1 · The board
- **Try:** the "pickje spec" tab in the cmux browser pane.
- **Expect:** this spec, with your words in the heaviest mark. It reloads by itself when the spec changes.

### V2 · Eyes: the newest frame and a box
- **Try:** `cd ~/code/pickje && node app/eyes/cli.ts now`, then `node app/eyes/cli.ts locate --q "<a word on your screen>" --frame now`
- **Expect:** `age_s` under about 2 while you're moving things, then a match with a box in screen points. The lead ran both tonight.

### V3 · Ears, from a file and live (the ffmpeg path, which loses some audio)
- **Try:** `node app/ears/cli.ts transcribe /tmp/pickje-ears/fixture.wav`, then `node app/ears/cli.ts listen --stop-file /tmp/pickje-ears/stop` and talk, then Ctrl-C.
- **Expect:** the fixture comes back as "Pickle, show me where I left the pricing chart this morning." Live, you get JSON lines with your words. The lead ran the file check; live is yours to judge.

### V4 · The brain
- **Try:** `node app/brain/cli.ts nowearlier "what radius did they use in that video I watched"`, then `node app/brain/cli.ts sayback --said "draft Friday" --heard "ship Friday"`
- **Expect:** `label: earlier` in about 2 s, then `match: false` naming draft → ship. The lead ran both.

### V5 · The sandbox
- **Try:** `node app/sandbox/run.ts nowearlier --n 9`, then open `app/sandbox/report.html`
- **Expect:** 9 brand-new sentences each run, with a pass rate. The page lists every case with dials. The lead ran it: 9/9.

### V6 · Blicky's motion reference
- **Try:** the Blicky tab in the cmux browser pane. Click "Point: chart".
- **Expect:** Blicky flies on an arc, the pencil draws the box, and the caption types.

### V7 · Pickle, shake, native mic, native Blicky (after the marks lane finishes; it's using the app right now)
- **Try:** `cd ~/code/pickje/app/shell && swift run pickje`. Shake, talk, watch the panel, press ⌃⌥⌘P. In a second terminal, `node tools/blicky.mjs center "hi"`.
- **Expect:** Pickle gets dazed, the panel says "listening", grey then white text of your words, and ⌃⌥⌘P closes. Blicky draws a box at the center.

### V8 · Voice and Moss (waiting on keys)
- **Try:** after `CARTESIA_API_KEY` is in `.env`: `node app/voice/cli.ts say "hey, I'm blicky" --out /tmp/pickje-voice/hi.wav && afplay /tmp/pickje-voice/hi.wav`
- **Expect:** a calm voice, with `ttfa_ms` printed. Moss: `node app/memory/cli.ts index --since 1h`, then `earlier "<something you saw, described differently>"`.

## The demo scenarios

### D1 · From the HeyClicky lab scenes
- **His words:** clicked "Start from the HeyClicky lab scenes" (10-23, 11:51 PM).
- **Fact:** the review is in (`docs/research/scenarios.md`). Its top 3, as its read: (1) S05 into E3, "what radius did that video use?", where the answer ("9:14, 3 mm") exists only on a screen seen earlier, then Blicky boxes the Fillet tool on the current screen; (2) S02, "why is this test failing?", one exact line among planted decoys; (3) E5, critiquing a page, which he loved and which shows off the marks. Only U4 was built around an earlier moment, so every other "earlier" beat has to be put on screen beforehand.
- **His words:** clicked "S05 → E3: 'what radius did that video use?' (Recommended)" and "E5: critique a page" (10-24, 12:54 AM).
- **His words:** on the earlier half: "it shoudl pull the past frames and just hsow whats impmorant frmo before thats what matters" (10-24, 12:54 AM).
- **Draft:** a card beside Pickle shows only the important crop of the best past frame, and Blicky marks inside it. Being built in `app/shell/` (`card`).
- **His words:** clicked "The lab's prop pages" for what's on screen at the table (10-24, 1:11 AM). The lab's HTML scenes from 10-22 stay outside the repo as props.

### D2 · The team
- **His words:** clicked "Team, people already lined up" (10-23, 11:51 PM).
- **His words:** "teammates will attempt there own ux and ui" (10-24, 12:04 AM). The build in this window doesn't wait on teammates.

## Sponsor tracks

### T1 · The tracks he named, as facts
- **His words:** "And then definitely build for the real world one." and "So we should definitely fade Capital One, Sierra Coinbase, Visa, Solano."
- **Fact:** Anthropic judges on four points: "A named community… A real problem… It works… Thoughtful use of Claude". The prize reads "Coming soon!", and the track is on Hive but not on Devpost's list (`docs/research/sponsor-tracks.md`).
- **Fact:** Microsoft's Grand Prize and "Built for the Real World" are one track, and Customer Impact is its 2nd place. Its gate: "Build a production-minded AI agent that solves a meaningful problem in finance, productivity, healthcare, or another high-impact domain".
- **Fact:** Cartesia's gate: "Voice should be core to the product–not just a feature added for the demo." The prize is Meta glasses (TBD). ElevenLabs has an MLH track (wireless earbuds) that's on Hive only, with no criteria published.
- **Fact:** Factory's gate: "Droid should do real work in the running product". The prize is $2,000. "Joy" matches no track; the research's closest read is "Droid".
- **Fact:** Meta judges "how meaningfully they strengthen human connection, how essential and well-integrated AI is, originality, and the strength of the working demo."
- **Fact:** Apify pays $5,000 across 5 places, and its gate is "Project must be using Apify in a meaningful way." Through Apify's MCP server, an agent can search and run about 97,000 Actors, mostly web scrapers, in Apify's cloud. The Sat 11:00 workshop gives $200 in credits.
- **Fact:** MLH Gen AI and .Tech are on Hive but not on Devpost or MLH's page, so whether they can be selected isn't verified. No cap on tracks per team is stated.
- **Open:** which tracks to enter. The voice track follows the voice pick. For Apify, what would pickje do with it?

## Calls that are his

### Q1 · "Jet" and "jev"
- **Fact:** nothing named "Jet" does boxes. The close names are Jedi, Gemini and Jetson (M4).
- **Fact:** Jev 1.14 (2026-10-14) accepts images, and its Box question returns top, bottom, left and right as fractions of the image. TypeSafe calls images experimental (header `TypeSafe-Danger-Zone-Images: true`). It always returns a box, so it needs a yes/no check alongside. Access is through an OpenRouter key (`docs/research/models-survey.md` §C).
- **Fact:** "Jev" is in his record. myclicky's research (`~/code/myclicky/docs/research/2026-09-22-landscape.md` §4) describes it as TypeSafe AI's "System One": fast Choice, Score and Noul answers with probabilities, 70–500 ms, and "No image/audio/video" as of 9-22. A myclicky worktree is named `21-the-window-jev-picks-which-slice-of-the-`. Whether Jev takes images now is being checked (`docs/research/models-survey.md` §C, pending).
- **His words:** clicked "Jev, TypeSafe's System One (my read)" (10-23, 11:19 PM).
- **Draft:** if Jev still doesn't see images, it powers the fast now-or-earlier check (M2), and the boxes come from screenpipe's local data or a vision model.
- **Open:** is screenpipe's local box data enough, with a model only for what it misses?

### Q2 · One step or four
- **Open:** "it only shows you the most four decision". Does that mean one step or four?

### Q3 · "fade"
- **Open:** does it mean skip?

### Q4 · Voice and ears
- **Fact:** the research is in (`docs/research/voice-and-boxes.md`). Neither key is on this Mac yet, so a listening test needs a key from him first.
- **Fact:** the survey's pick (its read, not his) is Cartesia Sonic 3.6: #4 on the arena, a calm/peaceful mood setting, and word timestamps that could time Blicky to the speech, but 440 ms to first audio on one independent board. Runner-up: ElevenLabs v4 Turbo, #1 on the arena. Moss, the sponsor, is a semantic-search runtime, not a voice; MOSS-TTS is a separate open voice model. Hume's voice APIs shut down 11-13 (`docs/research/models-survey.md`).
- **His words:** clicked "Cartesia, decided" and "Native capture in the Swift app (Recommended)" (10-23, 11:47 PM). On Moss, typed: "https://www.moss.dev/ see where it fits in best and make it imporatnt to slot in and clearly documetn what itll be saying"
- **Fact:** Moss (`@moss-js/moss` 1.21.0) is a semantic search engine that runs inside our Node service on this Mac. The Swift package is iPhone-only. Local use still needs an account and key, the internet to load its model, and it always sends usage stats (counts, timings, index names, never text). The free plan has 60 session minutes a month. The research's pick (its read) is the "earlier" screen memory: copy screenpipe's text into a local Moss index so "the error from before" matches by meaning, not keyword. He would need to sign up at portal.usemoss.dev and give a yes on the metadata and the license (`docs/research/moss-fit.md`).
- **His words:** clicked "Yes: sign up, allow its usage stats (Recommended)" (10-24, 12:54 AM). The earlier-memory index is being built in `app/memory/`, and it waits on his `MOSS_PROJECT_ID` and `MOSS_PROJECT_KEY`.
- **Fact:** the Cartesia client is built (`app/voice/`). It streams over one socket with word timestamps, and its plumbing passed 21/21 against a local stand-in server. It has **never reached Cartesia**, because there's no `.env`. The voice is Jameson, calm, chosen by the agent, not him, with Kyle and Maya as alternatives that respond better to emotion.

### Q5 · The shake and the close
- **Open:** does the shake open the menu and panel, go straight to talking, or both? Which keys close it? Does Pickle stay or vanish after closing?

### Q6 · Where pixels come from
- **His words:** for checks, clicked "Yes, for verification only" (10-23, 11:47 PM). Agents may read real frames to verify a feature, with crops kept small, in /tmp, deleted afterwards and never quoted.
- **Open:** screenpipe frames only, or our own capture (which needs a Screen Recording permission)? Cloud box models send screen pixels off the Mac. Does he allow that?

### Q7 · Shape and signature
- **Open:** the process shape (F2), what counts as the signature on the north star (O5), and the speed target (M6).

### Q8 · Carried over from before tonight
- **Open:** the placeholder token format; whether pickje's sessions join the calhacks record; the team; the six event calls in `~/code/calhacks/docs/blicky/REPORT.md` §8; whether Devpost names any project as inspiration (`docs/context/decisions.md`).
