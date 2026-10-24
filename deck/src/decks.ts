import { brand, type Entry } from './brand'
import { pitch } from './pitch'

/** Which deck to show: the brand book (default) or the final presentation (?deck=pitch). */
export const slides: Entry[] = new URLSearchParams(location.search).get('deck') === 'pitch' ? pitch : brand
export type { Entry }
