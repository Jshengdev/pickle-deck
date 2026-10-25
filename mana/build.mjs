// mana/build.mjs: builds "pickje · the lab notebook" from mana/data/*.json and publishes it into his Mana space.
//
//   node mana/build.mjs preview                 # builds mana/out/ (payload.json, digest.txt, preview-data.json); no network
//   node mana/build.mjs publish --digest <hex>  # the write: only with the preview's digest (what goes up is what he saw)
//   node mana/build.mjs status                  # read-only: what's at our path
//
// Modeled on pickje's app/mana/publish.ts (his clicks 10-24): one path, four routes, the key read from pickje's .env and
// never printed, every string scrubbed for key shapes and emails, home paths shortened to ~, a read-back after the write.
// The node is private until he shares it from Mana's share menu (his click, never code).
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DECK = join(HERE, '..')
const ROOT = 'file-system/pickje/notebook'
const MANA = 'https://server-prod.mana.space'
const ROUTES = new Set(['GET /api/external/me', 'POST /api/external/read', 'POST /api/external/update', 'POST /api/external/delete'])
const SAFE = /^[A-Za-z0-9_~-]{1,120}$/
const OUT = join(HERE, 'out')

// ── load ──
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const lanes = existsSync(join(HERE, 'data')) ? readdirSync(join(HERE, 'data')).filter((f) => f.endsWith('.json') && !f.startsWith('_')) : []
const data = Object.fromEntries(lanes.map((f) => [f.replace(/\.json$/, ''), readJson(join(HERE, 'data', f))]))
const imgFiles = existsSync(join(HERE, 'img')) ? new Set(readdirSync(join(HERE, 'img'))) : new Set()

// ── scrub and guard ──
const HOME = process.env.HOME || '/Users/johnnysheng'
const KEYISH = [/\b[A-Za-z]{2}-[a-z0-9]{40,}\b/g, /\bsk-[A-Za-z0-9_-]{20,}/g, /\bAKIA[0-9A-Z]{16}\b/g, /\bgh[pousr]_[A-Za-z0-9]{30,}/g, /-----BEGIN [A-Z ]*PRIVATE KEY-----/g, /\bBearer\s+[A-Za-z0-9._-]{20,}/g]
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
const problems = []
const scrubStr = (s, where) => {
  let t = String(s).split(HOME).join('~')
  for (const re of KEYISH) if (re.test(t)) { problems.push(`${where}: key-shaped text removed`); t = t.replace(re, '[removed]') }
  t = t.replace(EMAIL, (m) => (/@anthropic\.com$|^noreply@/.test(m) ? m : (problems.push(`${where}: email removed`), '[email]')))
  if (/\.screenpipe|flow\.sqlite/.test(t) && /\/(Users|~)\//.test(t)) problems.push(`${where}: mentions a screen-data path`)
  if (t.length > 4000) { problems.push(`${where}: ${t.length} chars, cut to 4000`); t = t.slice(0, 3990) + '…' }
  return t
}
const scrub = (v, where = '') => Array.isArray(v) ? v.map((x, i) => scrub(x, `${where}[${i}]`))
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, scrub(x, `${where}.${k}`)]))
  : typeof v === 'string' ? scrubStr(v, where) : v
const safeId = (s, i) => { const t = String(s || '').toLowerCase().replace(/[^a-z0-9_~-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100); return SAFE.test(t) ? t : `item-${i}` }
const imgOk = (p) => typeof p === 'string' && (p.startsWith('img/') ? imgFiles.has(p.slice(4)) : /^https:\/\//.test(p))

// ── entries from every lane ──
const allEntries = []
for (const [name, d] of Object.entries(data)) for (const e of d.entries || []) allEntries.push({ ...e, lane: e.lane || name })
const seen = new Set(), entries = {}
allEntries.forEach((e, i) => {
  let id = safeId(e.id, i); while (seen.has(id)) id = `${id}-2`; seen.add(id)
  const imgs = (e.images || []).filter((p) => { const ok = imgOk(p); if (!ok) problems.push(`entry ${id}: missing image ${p}`); return ok })
  entries[id] = scrub({ ...e, id, images: imgs }, `entries.${id}`)
})

// ── sponsors, tests ──
const tracks = {}
;(data.sponsors?.tracks || []).forEach((t, i) => { tracks[safeId(t.name, i)] = scrub(t, `tracks.${t.name}`) })
const runs = {}, checks = {}
;(data.evals?.runs || []).forEach((r, i) => { runs[safeId(r.id, i)] = scrub(r, `runs.${r.id}`) })
;(data.evals?.checks || []).forEach((c, i) => { checks[`c${String(i).padStart(3, '0')}`] = scrub(c, `checks.${i}`) })

// ── the style book, from the real tokens ──
const tok = readJson(join(DECK, 'design/src/tokens/generated/tokens.json'))
const ramps = {}
for (const [name, steps] of Object.entries(tok.color)) {
  ramps[name] = { name, steps: Object.entries(steps).map(([step, v]) => ({ step, name: `${name}-${step}`, oklch: v.$value, hex: v.$extensions?.hex || '' })) }
}
const resolve = (v) => { const m = String(v).match(/^\{color\.([a-z]+)\.(\d+)\}$/); return m ? [tok.color[m[1]]?.[m[2]]?.$value, `${m[1]}-${m[2]}`] : String(v).match(/^\{fixed\.([a-z]+)\}$/) ? [tok.fixed[RegExp.$1]?.$value, RegExp.$1] : [v, ''] }
const ROLE_NAMES = ['ink', 'text-secondary', 'text-muted', 'surface-page', 'surface-ground', 'surface-felt', 'surface-felt-sky', 'pickle-ink', 'blicky-ink', 'pickle', 'blicky', 'line-hair', 'checked', 'attention', 'catch', 'stuck', 'cheek', 'moss', 'state-listening', 'state-working']
const roles = {}
ROLE_NAMES.forEach((n) => { const v = tok.semantic[n]; if (!v) return; const [value, from] = resolve(v.$value); roles[n] = { name: n, value, from } })
const designImgs = [...imgFiles].filter((f) => /^(design|deck)-/.test(f)).sort().map((f) => `img/${f}`)
const style = scrub({
  quote: { text: 'one made header color and then maybe one thing to be green. Other than that, everything else should be pretty neutral.', when: '2026-10-24', source: 'pickle-deck docs/FOR-THE-DECK.md §4 (his call on colour)' },
  ramps, roles,
  voices: {
    a: { name: 'Pretendard, 700', use: 'headings and UI (the deck giant is 149 px, head-1 61 px)', face: 'head', size: 54, weight: 700, sample: 'pickje sees what you mean.' },
    b: { name: 'Pretendard, 500', use: 'head-2, 31 px', face: 'head', size: 31, weight: 500, sample: 'Every project you start is a tab.' },
    c: { name: 'Fairfax HD', use: 'the written, handwritten-feeling words (his: "the HD Fox one for the secondary")', face: 'hand', size: 34, sample: 'the next step, one at a time' },
    d: { name: 'Geist Pixel Square', use: 'counts, labels, the machine’s voice', face: 'pixel', size: 30, sample: '62% · 302/485 · 6 ms' },
  },
  dos: ['Roles, not hex: var(--ink), var(--surface-page)…', 'One hero per slide, lots of room', 'Materials: felt, moss, metal (on <Surface>)', 'Glass only for small parts: page numbers, tabs, small buttons', 'Shadows are lines and grain', 'Pickle is forest green; Blicky is sky blue', 'Every value comes from design/tools/tokens.mjs'],
  donts: ['Blur shadows', 'Beige', 'Light grey body text', 'Rainbow colours', 'A hardcoded hex'],
  images: designImgs,
}, 'style')

// ── open threads: the unfinished ideas (his open calls, from the session) ──
const threads = scrub({
  t1: { title: 'Mia: whose sister?', body: 'Slide 2 reads "Enlie’s sister"; in the 5:46 AM run-through he said "she’s my sister".', lane: 'deck' },
  t2: { title: 'Teach: Jev or Anthropic?', body: 'docs/VERBS.md: the forge quote says Teach runs on Jev; the sponsor column says Anthropic. The deck follows the column.', lane: 'sponsors' },
  t3: { title: 'Hand a spoken request to a project’s Claude Code', body: '`cli.ts handover` sends words verbatim to a project’s Claude Code session; no voice path calls it yet (a spoken hand-over goes to Droid, or Claude Code when Droid isn’t set up).', lane: 'product' },
  t4: { title: 'The 80% pass bar', body: 'Latest live exam: 62% over two passes, 1 reveal slip. Not passed yet. Visual (where Blicky draws) is the weak part.', lane: 'evals' },
  t5: { title: 'The logo', body: 'Six directions explored; none picked yet.', lane: 'design' },
  t6: { title: 'The SwiftUI port of the two notepads', body: 'Planned in docs/frontend-plan (HANDOFF-PROMPT.md): port to SwiftUI, a crop per last stop, Blicky’s sketches into the pad when the screen runs out of room, tokens.mjs as the one source.', lane: 'design' },
  t7: { title: 'The mic in the live exam', body: 'In the latest run the mic heard 0 of 36 steps; the words were handed in through the test hook.', lane: 'evals' },
}, 'threads')

// ── about ──
const count = (cmd) => { try { return execSync(cmd, { encoding: 'utf8' }).trim() } catch { return '' } }
const commits = count(`git -C ${HOME}/code/pickje log --oneline | wc -l`)
const specs = count(`ls ${HOME}/code/pickje/docs/spec/*.md | wc -l`)
const nImgs = new Set([...Object.values(entries).flatMap((e) => e.images || []), ...designImgs]).size
const about = scrub({
  lede: 'How pickje was made, written down as we went: what we asked, tried, measured, kept, dropped, and left unfinished.',
  paragraphs: [
    'pickje is a computer-use AI collaborator for your own screen: Pickle keeps your context, Blicky draws it out with you, one step at a time. It was built at Cal Hacks 13.0, Oct 23–25, 2026, from an empty repo after Friday 6 PM.',
    'This notebook is the process, not the pitch. Every page is one step: a question, what was tried, what was measured, what was decided, and his words verbatim (typos kept) with where they came from. Our notes are plain prose. Numbers name their source and keep their caveat.',
    'It lives in Mana on purpose: the whole notebook is data in this space (entries, sponsor tracks, test runs, the style book), so Mana’s own agent can read it as memory and answer questions about why things went the way they did.',
    'What is not here: nothing from his screen, his screen recordings or anyone else’s words. Pictures are our own renders: the brand book, the notepads, the deck, the app’s own onboarding frames and marks.',
  ],
  ask: ['Why did we route with Moss before Claude, and what did it cost?', 'What did we try for the ears before Cartesia, and why did we drop it?', 'Which live-exam failures changed the product, and how?', 'Show me every decision he made by clicking, in order.', 'What is still unfinished?'],
  counts: [
    { label: 'pages of notes', value: String(Object.keys(entries).length), source: 'this notebook' },
    { label: 'pictures', value: String(nImgs), source: 'mana/img' },
    { label: 'sponsor tracks weighed', value: String(Object.keys(tracks).length), source: 'sponsors lane' },
    { label: 'test runs', value: String(Object.keys(runs).length), source: 'evals lane' },
    ...(commits ? [{ label: 'commits in the pickje repo', value: commits, source: 'git log --oneline | wc -l' }] : []),
    ...(specs ? [{ label: 'specs, each starting with his words', value: specs, source: 'docs/spec/*.md' }] : []),
  ],
  sources: 'Sources: the pickje repo (docs/spec, docs/context, docs/research, docs/evals, app READMEs, git log), the pickle-deck repo (design system, brand book, pitch deck), the Cal Hacks workspace. Built ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC.',
}, 'about')

// ── the payload ──
const code = readFileSync(join(HERE, 'app.js'), 'utf8')
const appCode = code.slice(code.indexOf('function UserDiv('))
// every picture, with a caption: the first page that uses it, else its file name in words
const capOf = {}
Object.values(entries).forEach((e) => (e.images || []).forEach((p) => { if (!capOf[p]) capOf[p] = { caption: e.title, at: e.at || '' } }))
const images = {}
;[...imgFiles].sort().forEach((f, i) => {
  const p = `img/${f}`, c = capOf[p]
  images[`i${String(i).padStart(3, '0')}`] = { path: p, caption: c ? c.caption : f.replace(/\.(png|jpe?g|webp)$/i, '').replace(/^[a-z]+-/, '').replace(/[-_]+/g, ' '), at: c ? c.at : '' }
})
// the pages to read first (each lane's strongest, by their researchers), in story order; missing ids are skipped
const PIN_IDS = ['seed-mission', 'heyclicky-difference', 'blind-round-1', 'naming-pickje-official', 'design-cookbook-rejected', 'p-variability-harness', 'p-xray-built-then-dropped', 'p-was-it-faked', 'moss-route-measured', 'elastic-recall-measured', 'tradeoff-ledger', 'design-final-two', 'design-21-signs', 'deck-no-self-learning']
const pins = {}
PIN_IDS.filter((id) => entries[id]).forEach((id, i) => { pins[`p${String(i).padStart(2, '0')}`] = id })
const children = { about, entries, tracks, runs, checks, style, threads, images, pins }
const digest = createHash('sha256').update(JSON.stringify({ appCode, children })).digest('hex')
const updatesFor = (now, isNew) => ({
  code: appCode,
  'metadata/type': 'user_div', 'metadata/displayName': 'pickje · the lab notebook', 'metadata/createdBy': 'pickje-notebook',
  'metadata/description': 'How pickje was made: questions, tries, results, decisions, his words, pictures.',
  'metadata/updatedAt': now, ...(isNew ? { 'metadata/createdAt': now } : {}),
})

const cmd = process.argv[2] || 'preview'
if (cmd === 'preview') {
  mkdirSync(OUT, { recursive: true })
  writeFileSync(join(OUT, 'preview-data.json'), JSON.stringify(children))
  writeFileSync(join(OUT, 'payload.json'), JSON.stringify({ path: ROOT, updates: updatesFor('<now>', true), children }, null, 1))
  writeFileSync(join(OUT, 'digest.txt'), digest + '\n')
  const kb = Math.round(Buffer.byteLength(JSON.stringify(children)) / 1024)
  console.log(JSON.stringify({ path: ROOT, lanes: Object.keys(data), entries: Object.keys(entries).length, tracks: Object.keys(tracks).length, runs: Object.keys(runs).length, checks: Object.keys(checks).length, images: nImgs, kb, appKb: Math.round(appCode.length / 1024), problems: [...new Set(problems)].slice(0, 40), digest }, null, 1))
  process.exit(0)
}

// ── the network part ──
const env = readFileSync(join(HOME, 'code/pickje/.env'), 'utf8')
const KEY = (env.match(/^MANA_API_KEY=(.*)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, '')
if (!KEY) { console.error('FAILED: no MANA_API_KEY in pickje/.env'); process.exit(1) }
const hide = (s) => String(s).split(KEY).join('[key]').replace(KEYISH[0], '[key-shaped]')
const lock = (p) => { if (!(p === ROOT || p.startsWith(ROOT + '/'))) throw new Error(`refused: ${p} is outside ${ROOT}`); return p }
const call = async (route, body) => {
  if (!ROUTES.has(route)) throw new Error(`refused route ${route}`)
  if (body?.path) lock(body.path)
  if (body?.updates) for (const k of Object.keys(body.updates)) lock(`${body.path}/${k}`)
  const [method, path] = route.split(' ')
  const r = await fetch(MANA + path, { method, headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(60000) })
  const t = await r.text()
  if (!r.ok) throw new Error(hide(`${route} ${body?.path || ''}: HTTP ${r.status}: ${t.slice(0, 400)}`))
  return t ? JSON.parse(t) : null
}
const read = async (p) => (await call('POST /api/external/read', { path: p }))?.data ?? null

if (cmd === 'status') {
  const meta = await read(`${ROOT}/metadata`)
  const ents = await read(`${ROOT}/entries`)
  console.log(JSON.stringify({ path: ROOT, exists: !!meta, ours: meta?.createdBy === 'pickje-notebook', entries: ents ? Object.keys(ents).length : 0, public_read: meta?.permissions?.public_read ?? null }, null, 1))
} else if (cmd === 'publish') {
  const want = process.argv[process.argv.indexOf('--digest') + 1]
  if (want !== digest) { console.error(`FAILED: --digest doesn't match the notebook as it stands (${digest.slice(0, 12)}…): run preview first`); process.exit(1) }
  try {
    const me = await call('GET /api/external/me')
    const meta = await read(`${ROOT}/metadata`)
    if (meta && meta.createdBy !== 'pickje-notebook') throw new Error(`refused: something not made by this notebook is at ${ROOT}`)
    const now = Date.now()
    await call('POST /api/external/update', { path: ROOT, updates: updatesFor(now, !meta) })
    // the children, in batches so no one request is huge
    for (const [k, v] of Object.entries(children)) {
      if (v && typeof v === 'object' && !Array.isArray(v) && ['entries', 'tracks', 'runs', 'checks'].includes(k)) {
        const ks = Object.keys(v)
        await call('POST /api/external/delete', { path: `${ROOT}/${k}` }).catch(() => null)   // start clean: stale pages go
        for (let i = 0; i < ks.length; i += 60) {
          const part = Object.fromEntries(ks.slice(i, i + 60).map((id) => [`${k}/${id}`, v[id]]))
          await call('POST /api/external/update', { path: ROOT, updates: part })
        }
      } else await call('POST /api/external/update', { path: ROOT, updates: { [k]: v } })
    }
    const back = await read(`${ROOT}/entries`)
    const n = back ? Object.keys(back).length : 0
    const uid = me?.user_id || ''
    console.log(JSON.stringify({ path: ROOT, url: uid ? `https://www.mana.space/home/${uid}/pickje/notebook` : null, entries: Object.keys(entries).length, read_back: n, ok: n === Object.keys(entries).length, shared: false, note: 'private until he shares it from Mana’s share menu' }, null, 1))
  } catch (e) { console.error('FAILED: ' + hide(e.message)); process.exit(1) }
} else { console.error('usage: preview | publish --digest <hex> | status'); process.exit(1) }
