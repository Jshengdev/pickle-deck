# The pickje lab notebook, for Mana · the shared brief

His ask (2026-10-25, about 6:05 AM, verbatim): "let's get the mana submission. Make sure the mana submission pretty much
has like all of the testing scenarios, the evaluations that we installed, everything that we built from the beginning
planning. Make sure you can go into the depths of like all of the documentation for like where ideation began, and just
use the API of mana to interact with it. So we create like a very in-depth change log showing everything from. My
animation, creating the brand guidelines, using a lot of screenshots, pictures, things from the, the slide deck, the demo
video, all the different concepts that we've already built before. Really just use this as like a corpus thing, treat it
as like a memory thing, and make the Manna workflow, like understand how Manna works best, and build it exactly how you
would imagine it, as we have replicated it here. Lots of visualizations of what was done." … "Also show documentation for
like how we looked at all the different sponsor tracks and how we would have tried to plan to build them into our thing,
because our thing uniquely relied on a couple of them, and they're the main reason why this thing was possible to run at
its latency and run the calculations on like, are these tradeoffs worth it by using the sponsorship? Are we actually
getting a better result for what we are aiming for?"

Then: "Treat this as a documentation, more than anything with lots of pictures, lots of quotes and thoughts and shared
notes about what we've discussed and then what we've tried, reviewed, decided not to, and the whole process of basically
taking notes and revising them and doing like the scientific process almost."

## What we're making
A lab notebook of how pickje was made, published into his Mana space as a Mana app (a `user_div` node with JSX) whose
data lives as child nodes, so Mana's own agent can read it as memory. Every entry is one step of the process:
a question → what we tried → what we measured → what we decided (kept, dropped, revised, declined), with his words
verbatim and pictures.

## Where things go (all in ~/code/pickle-deck/mana/, a PUBLIC repo)
- `data/<lane>.json`: each researcher writes ONE file (named in its task).
- `img/<name>.png|jpg`: pictures. They're served publicly from GitHub at
  `https://raw.githubusercontent.com/Jshengdev/pickle-deck/main/mana/img/<file>`, so only put in what may be public.
  Max ~1600 px wide, PNG or JPG under ~600 KB each.

## The entry format (every lane except sponsors uses it)
```json
{
  "id": "kebab-case-unique-id",
  "at": "2026-10-24T12:56",                // PDT, local time, minute precision; the best known time
  "lane": "ideation | product | design | sponsors | evals | deck | process",
  "kind": "question | tried | result | decision | note | quote | milestone",
  "status": "kept | dropped | revised | open | declined",   // optional; for decisions and tries
  "title": "≤ 90 characters, plain",
  "quote": { "text": "his words, VERBATIM, typos kept", "when": "...", "source": "path:line" },   // optional
  "body": "≤ 900 characters of our plain prose: what happened and why",
  "numbers": [{ "label": "route time, Moss alone", "value": "6–7 ms", "source": "docs/PRODUCT.md:198" }],  // optional
  "images": ["img/file.png"],             // optional, files you put in img/
  "sources": ["pickje docs/spec/0005-sponsors.md", "commit d808ae9"],
  "links": ["other-entry-id"]              // optional
}
```
Write `{ "lane": "...", "entries": [ ... ] }`. Aim for depth: dozens of entries per lane, each true and sourced.

## Rules (hard)
- **Truth.** Every number names its source and keeps its caveat. His words verbatim (typos kept) with where they're from.
  Our prose is plain and labeled ours by being in `body`. No invented people, numbers or quotes.
- **Privacy (this goes to Mana's cloud and may become public).** Never read `~/.screenpipe` or `flow.sqlite`. No
  screenpipe frames, no captures of his real screen, no audio or transcripts of other people, no emails, phone numbers,
  keys or tokens (if a line has one, leave the line out). Only his own words; leave other people's speech out. Reference
  images from other products (docs/refs) stay out (not ours to publish).
- **Read-only** everywhere outside `~/code/pickle-deck/mana/`. Another session works in ~/code/pickje: read only, no git
  writes there. Don't commit or push; don't call Mana. The main session does that.
- Plain words, short sentences. Return a summary: entry count, the strongest 5 entries, anything uncertain.
