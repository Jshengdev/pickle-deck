/** Mia's story, the words: one sentence per press, the way he says it (his brief 2026-10-25, about 4:10 AM).
    His lines are from that brief; the persona details are DRAFT (his ask: "because the sponsor tracks emphasize heavily on
    selecting a specific person in their trade, make so it builds a little closer towards what that means").
    Mia is a made-up person, a scenario (say so if asked). Change a sentence here and the slide follows. */
export const HER = 'Mia'
export const THIS_IS = 'This is Mia.'
/** His words 2026-10-25 ~4:25 AM: "this is Mia. Um, more specifically, she's. And Lee's sister." Read as his teammate's
    sister (GitHub enliew). The name's spelling is DRAFT: confirm it with him. */
/** His run-through 2026-10-25 5:20 AM: "change the end apostrophe to N L I E": Enlie (his teammate, GitHub enliew). */
export const SISTER = 'More specifically, she’s Enlie’s sister.'
/** His words 2026-10-25 ~4:40 AM: "what she does is like 3D cap for car. She's learning to invest. She's editing videos, all
    those. So be more specific that these are different projects and like ways to organize context for like things that
    she wants to learn and things she wants to be ambitious about." (cap = CAD; the club is from his ~4:25 AM take). */
export const SHE_IS = [
  'Like anyone else, she’s ambitious.',                                 // "like her herself and any other person, she's ambitious"
  'She’s smart.',                                                       // "She's smart."
  'She’s designing a car in 3D CAD, for her club.',                     // "3D cap for car" + "She does 3D CAD. It's her club"
  'She’s learning to invest.',                                          // "She's learning to invest."
  'And she’s teaching herself to edit videos.',                         // "She's editing videos" (DRAFT: "teaching herself")
  'But there’s one thing that keeps stopping her.',                     // "But there's one thing that keeps stopping her"
]
/** Her projects, one card per press, each a thing she wants to learn (the line above it). Card text is DRAFT. */
export const PROJECTS = [
  { at: 2, name: 'Club car', what: 'the body, in 3D CAD', screen: 'cad' },
  { at: 3, name: 'Investing', what: 'why did LRKS drop?', screen: 'stocks' },
  { at: 4, name: 'Video editing', what: 'the club’s 60-second reel', screen: 'video' },
] as const
export const TOO_MANY = [
  'She has too many interests.',
  'Too many projects.',
  'Too many things she needs to do.',
  'So nothing starts.',
]                                                                       // his words: "too many interests, too many projects. Too many things that she needs to do. That nothing starts."
/** His second run-through 2026-10-25 5:46 AM, verbatim: "The obvious solution: use AI for help. She might have a question.
    Type it out, get an answer. Screenshot the question for more clarity, and then paste it back in. And then while she
    waits, she might start another session, then another, and another, and soon you'll have ten, each a different project.
    But you don't need ten windows. You just need the next one step." One per press, lightly cleaned. */
export const ASKS_AI = [
  'The obvious solution: use AI for help.',
  'She types out a question.',
  'It answers with a wall of text.',
  'She screenshots the question, for more clarity.',
  'And pastes it back in.',
  'While she waits, she starts another session.',
  'Then another.',
  'And another.',
  'Soon there are ten, each a different project.',
]
export const ONE_STEP = ['But you don’t need ten windows.', 'You just need the one next step.']
export const NEXT_STEP = 'Question 22: count the degrees of unsaturation first.'   // her rule in the staged o-chem project: "Do degrees of unsaturation first on every unknown"

/** What she types to the AI about the real worksheet's question 22, and its answer (chemistry checked: C₁₀H₁₂O has 5
    degrees of unsaturation, (2·10 + 2 − 12) / 2; ~1715 cm⁻¹ is a ketone C=O not conjugated with the ring). */
export const ASK = 'can u explain #22?? the nmr one'
export const WALL = 'Sure! Let’s break it down. C₁₀H₁₂O has 5 degrees of unsaturation: a benzene ring (4) and a C=O (1). The strong band near 1715 cm⁻¹ means that C=O is a ketone that isn’t conjugated with the ring, so at least one CH₂ sits between them. Next, compare the two spectra: integrate each signal, read its splitting with the n + 1 rule, and match each chemical shift to the protons near the ring or the carbonyl. For spectrum (a), start with the singlet, then work outward to the multiplets, keeping track of'
export const OTHER_CHATS = [                                            // what she asks in each (DRAFT)
  { title: 'Club car', ask: 'how do i fillet the edges on this body' },
  { title: 'Video editing', ask: 'how do i cut this down to 60 seconds' },
  { title: 'Stocks', ask: 'why did LRKS drop 18% in one day' },
]
