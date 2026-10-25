import { brand, type Entry } from './brand'
import { pitch } from './pitch'
import { templates } from './pitch/templates'

/** Which deck to show: the brand book (default), the final presentation (?deck=pitch) or the template shelf
    (?deck=templates). */
export const which = new URLSearchParams(location.search).get('deck')
export const slides: Entry[] = which === 'pitch' ? pitch : which === 'templates' ? templates : brand
export type { Entry }
