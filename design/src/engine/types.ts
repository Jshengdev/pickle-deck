import type { gsap } from 'gsap'

/** An action is one modular piece of motion: give it the elements it moves and its params, get back a paused timeline
    with named labels (one label per beat). Recipes play, scrub and chain actions; the build reuses them as they are. */
export type Timeline = gsap.core.Timeline
export type Action<E, P> = (els: E, params: P) => Timeline
