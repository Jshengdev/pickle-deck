/** The opening story, in one place: change her name or her night here and every story slide follows.
    Mia is a made-up person (a scenario, not a testimonial): say so if anyone asks. All wording here is DRAFT. */
export const HER = 'Mia'

/** Her 3 things, as windows on her screen and later as cards pickje holds. */
export const TASKS = [
  { id: 'chem', file: 'chem-homework-4.pdf', name: 'Chemistry homework', due: 'tonight', body: '1. What is this molecule used for?\n2. What is its pKa, and what does that mean?' },
  { id: 'site', file: 'portfolio — index.html', name: 'Portfolio site', due: 'Friday', body: '<section class="projects">\n  <!-- TODO everything -->\n</section>' },
  { id: 'mail', file: 'Inbox', name: 'Internship forms', due: 'this week', body: 'Re: please finish your onboarding forms' },
]

/** Her chat with a generic AI, line by line (one per press). The chemistry is right: check before changing it. */
export const CHAT = [
  { who: 'her', text: 'can u explain the pKa part of my aspirin homework' },
  { who: 'ai', text: 'Sure! Aspirin has a pKa of about 3.5, so it’s a weak acid: its –COOH group gives up a proton. In the stomach (pH 1–2) it stays mostly un-ionized; in the blood (pH 7.4) it’s mostly ionized. Using pH = pKa + log([A⁻]/[HA]), you can…' },
  { who: 'her', text: 'ok wait and what do i do first for my portfolio? its due friday' },
  { who: 'ai', text: 'I don’t have any information about your portfolio. Could you share more details about it?' },
] as const

/** Her chemistry homework on aspirin, as it looks on her screen (the Shake to wake slide, under a drawing of the
    molecule). Her answers are in her words; the 2nd one stops mid-sentence on purpose: that's where she got stuck. */
export const HOMEWORK = {
  file: 'chem-homework-4.pdf',
  course: 'Chem 1A · Problem set 4 · Aspirin',
  due: 'Due tonight, 11:59 pm',
  questions: [
    { q: 'What is this molecule used for?', a: 'Aspirin is commonly used to relieve pain, reduce fever, and decrease inflammation.' },
    { q: 'What is its pKa, and what does that mean?', a: 'Aspirin has a pKa of approximately 3.5, meaning it’s a weak acid. This carboxylic acid group here can release a proton' },
  ],
}

/** The one next step pickje gives her, for the chemistry card. */
export const NEXT_STEP = 'Finish question 2: say what releasing that proton does. Just that.'
