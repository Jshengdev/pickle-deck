/** Mia's story, the words: one sentence per press, the way he says it (his brief 2026-10-25, about 4:10 AM).
    His lines are from that brief; the persona details are DRAFT (his ask: "because the sponsor tracks emphasize heavily on
    selecting a specific person in their trade, make so it builds a little closer towards what that means").
    Mia is a made-up person, a scenario (say so if asked). Change a sentence here and the slide follows. */
export const HER = 'Mia'
export const THIS_IS = 'This is Mia.'
export const SHE_IS = [
  'She’s a second-year mechanical engineering student at Cal.',        // DRAFT: the person in her trade
  'Like most people, she’s ambitious.',                                 // his words: "She, like most people, is ambitious."
  'She’s smart.',                                                       // his words
  'She designs parts in CAD, edits videos for her club, and is learning to invest.',   // DRAFT: "She's this. She's that."
  'But there’s one thing that keeps stopping her.',                     // his words: "there's one thing that consistently stops her"
]
export const TOO_MANY = [
  'She has too many interests.',
  'Too many projects.',
  'Too many things she needs to do.',
  'So nothing starts.',
]                                                                       // his words: "too many interests, too many projects. Too many things that she needs to do. That nothing starts."
export const ASKS_AI = [
  'So Mia asks AI for help.',
  'She types out her question.',
  'It answers with a wall of text.',
  'She screenshots the page.',
  'Pastes it back in.',
  'Opens another agent session for her CAD part.',
  'Another for her video.',
  'And another for her stocks.',
  'Ten sessions in, she can’t remember what any of it said, where it came from, what it was for, or what her next step is.',
]                                                                       // his words, one per press, from "So Mia ask AI for help…"
export const ONE_STEP = ['Mia doesn’t need ten agent sessions.', 'She needs one next step.']   // his words: "Mia needs one step, not like ten different agent sessions"
export const NEXT_STEP = 'Question 22: count the degrees of unsaturation first.'   // her rule in the staged o-chem project: "Do degrees of unsaturation first on every unknown"

/** What she types to the AI about the real worksheet's question 22, and its answer (chemistry checked: C₁₀H₁₂O has 5
    degrees of unsaturation, (2·10 + 2 − 12) / 2; ~1715 cm⁻¹ is a ketone C=O not conjugated with the ring). */
export const ASK = 'can u explain #22?? the nmr one'
export const WALL = 'Sure! Let’s break it down. C₁₀H₁₂O has 5 degrees of unsaturation: a benzene ring (4) and a C=O (1). The strong band near 1715 cm⁻¹ means that C=O is a ketone that isn’t conjugated with the ring, so at least one CH₂ sits between them. Next, compare the two spectra: integrate each signal, read its splitting with the n + 1 rule, and match each chemical shift to the protons near the ring or the carbonyl. For spectrum (a), start with the singlet, then work outward to the multiplets, keeping track of'
export const OTHER_CHATS = [
  { title: 'CAD part', ask: 'why does my fillet keep failing on this edge' },
  { title: 'Club video', ask: 'how do i cut this down to 60 seconds' },
  { title: 'Stocks', ask: 'why did LRKS drop 18% in one day' },
]
