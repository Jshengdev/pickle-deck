# Cal Hacks 13.0 · the clock and the rules

The calhacks session's study has the detail, with sources pulled on 10-22: `~/code/calhacks/docs/EVENT.md`.

## The clock
- Fri 10-23 to Sun 10-25 at the Palace of Fine Arts in San Francisco. Hacking opened Fri at 18:00 PDT.
- From Devpost: "You must submit your hack by October 25th @ 9 AM PST with your teammates! This is a hard deadline."
  Also: "Get to the venue by October 25th @ 8 AM PST."

## Judging
- From the FAQ: "Projects will be judged based on impact, functionality, technical complexity, and creativity."
- Judging is expo-style, at the team's table.
- The functionality criterion asks for "a clear, meaningful video demo on devpost for sponsors evaluating
  asynchronously".
- Teams are 1 to 4 people.

## Prior work
From the FAQ: "No, you cannot submit a project that has been previously worked on or submitted to another hackathon.
Ideation of a project is okay before the hackathon, but all implementation must occur during the hacking period. We
have strict measures in place to detect cheating or prior work, and any violations will result in disqualification
from receiving a prize."

## Laws for build windows
The calhacks session set these in `~/code/calhacks/CLAUDE.md` and `prompts/lane.md`:
- Live is the default, and stubs are an explicit flag.
- A failure shows FAILED and logs what happened.
- Every shortcut is labeled `// DEMO_CACHE:`, with how to run it live.
- Each working milestone gets a commit.
