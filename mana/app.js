// mana/app.js: "pickje · the lab notebook", a Mana app (a user_div node at file-system/pickje/notebook).
// Mana compiles this with React, FS (FS.db, FS.ref, FS.onValue) and ownerId in scope and returns UserDiv (the same scope
// pickje's idea-log viewer uses; that app renders in Mana, checked signed-out 2026-10-25). Plain React.createElement, no
// JSX, no packages. The notebook's data sits in the same node (entries, specs, evalsets, tracks, runs, checks, style,
// threads, images, pins, about), so Mana's own agent can read the whole build as memory.
// His asks (2026-10-25): "Treat it as if it has been hand written… Some ideas can be unfinished"; then "Make all the notes
// not have quotations, just make it sound like I'm just writing into a blank wall. Show more diagrams, more specs, more
// interactivity between each page. Show how somebody should really create these notes, especially like the test data."
// The look follows the brand book: Pretendard for heads, Fairfax HD for the handwritten voice, Geist Pixel for counts;
// forest-green ink for Pickle, sky-blue ink for Blicky; a dot-grid page under a felt strip; no blur shadows, no beige.
function UserDiv(props) {
  var h = React.createElement
  var ASSET = 'https://raw.githubusercontent.com/Jshengdev/pickle-deck/main/mana/'
  var REPO = 'https://github.com/Jshengdev/pickle-deck/blob/main/mana/'
  var FONT = 'https://cdn.jsdelivr.net/gh/Jshengdev/pickle-deck@main/design/src/tokens/fonts/'
  var T = {
    paper: 'oklch(99% 0.003 200)', ground: 'oklch(94% 0.005 200)', dot: 'oklch(83% 0.011 208)', rule: 'oklch(89% 0.008 204)',
    ink: 'oklch(18.2% 0 89.9)', ink2: 'oklch(37% 0.010 228)', mute: 'oklch(46% 0.012 224)',
    pickle: 'oklch(46% 0.094 142.2)', blicky: 'oklch(46% 0.118 257.6)', felt: 'oklch(32.7% 0.064 144.6)',
    moss: 'oklch(83% 0.118 124.6)', mossSoft: 'oklch(94% 0.055 120.2)', skySoft: 'oklch(94% 0.031 240.8)',
    ember: 'oklch(56% 0.16 35)', pollen: 'oklch(85.3% 0.161 90.4)',
    head: '"Pretendard", ui-sans-serif, -apple-system, "Segoe UI", sans-serif',
    hand: '"Fairfax HD", "Marker Felt", "Bradley Hand", ui-rounded, cursive',
    pixel: '"Geist Pixel Square", ui-monospace, "SF Mono", Menlo, monospace',
  }
  var LANES = [['all', 'Everything'], ['ideation', 'Where it began'], ['product', 'The build'], ['design', 'The look'], ['sponsors', 'Sponsors'], ['evals', 'Testing'], ['deck', 'The pitch']]
  var LANE_NAME = { ideation: 'where it began', product: 'the build', design: 'the look', sponsors: 'sponsors', evals: 'testing', deck: 'the pitch', process: 'how we worked' }
  var STATUS = { kept: ['kept', T.pickle], revised: ['revised', T.blicky], dropped: ['dropped', T.ember], declined: ['declined', T.mute], open: ['open', T.ink2] }
  var KIND = { question: 'question', tried: 'tried', result: 'result', decision: 'decided', note: 'note', quote: 'said', milestone: 'milestone' }
  var TABS = [['notebook', 'Notebook'], ['map', 'Map'], ['specs', 'Specs'], ['evalsets', 'Eval sets'], ['sponsors', 'Sponsors'], ['tests', 'Test runs'], ['howto', 'How to'], ['style', 'Style book'], ['threads', 'Open threads'], ['pictures', 'Pictures'], ['about', 'About']]

  var S = function (v) { return React.useState(v) }
  var _d = S(props && props.data ? props.data : null), data = _d[0], setData = _d[1]
  var _t = S('notebook'), tab = _t[0], setTab = _t[1]
  var _l = S('all'), lane = _l[0], setLane = _l[1]
  var _s = S('any'), statusF = _s[0], setStatusF = _s[1]
  var _k = S('any'), kindF = _k[0], setKindF = _k[1]
  var _q = S(''), q = _q[0], setQ = _q[1]
  var _z = S(null), zoom = _z[0], setZoom = _z[1]
  var _c = S(''), copied = _c[0], setCopied = _c[1]
  var _o = S({}), opened = _o[0], setOpened = _o[1]
  var _p = S(null), page = _p[0], setPage = _p[1]
  var _h = S([]), hist = _h[0], setHist = _h[1]
  var _j = S(null), jump = _j[0], setJump = _j[1]

  React.useEffect(function () {
    if (props && props.data) return
    var base = null
    if (typeof relPathAddress === 'function') { try { base = relPathAddress() } catch (e) { base = null } }
    if (!base && typeof ownerId === 'string' && ownerId) base = ownerId + '/file-system/pickje/notebook'
    if (!base || typeof FS === 'undefined' || !FS || !FS.db) return
    var off = FS.onValue(FS.ref(FS.db, base), function (snap) { setData(snap && snap.val ? snap.val() : null) })
    return function () { if (typeof off === 'function') off() }
  }, [])
  React.useEffect(function () { // scroll to a target after a tab or filter change
    if (!jump) return
    var t = setTimeout(function () { var el = document.getElementById(jump); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setJump(null) }, 80)
    return function () { clearTimeout(t) }
  }, [jump, tab, lane])

  var arr = function (x) { return Array.isArray(x) ? x.filter(function (v) { return v != null }) : x && typeof x === 'object' ? Object.keys(x).map(function (k) { return x[k] }) : [] }
  var src = function (p) { return /^https?:/.test(p) ? p : ((props && props.assetBase) || ASSET) + p }
  var copy = function (txt, label) { try { navigator.clipboard.writeText(txt); setCopied(label || txt); setTimeout(function () { setCopied('') }, 1400) } catch (e) {} }
  var noq = function (s) { return String(s || '').replace(/[“”"]/g, '').replace(/\s+'|'\s+/g, ' ').trim() }

  // ── the data, indexed ──
  var entries = arr(data && data.entries).sort(function (a, b) { return String(a.at).localeCompare(String(b.at)) })
  var byId = {}, back = {}
  entries.forEach(function (e) { byId[e.id] = e })
  entries.forEach(function (e) { arr(e.links).forEach(function (l) { if (!back[l]) back[l] = []; back[l].push(e.id) }) })
  var specs = arr(data && data.specs).sort(function (a, b) { return String(a.id).localeCompare(String(b.id)) })
  var es = (data && data.evalsets) || {}, sets = arr(es.sets), method = es.method || {}
  var tracks = arr(data && data.tracks)
  var runs = arr(data && data.runs).sort(function (a, b) { return String(a.at).localeCompare(String(b.at)) })
  var checks = arr(data && data.checks)
  var specsFor = {}, setsFor = {}, tracksFor = {}
  specs.forEach(function (s) { arr(s.entries).forEach(function (id) { (specsFor[id] = specsFor[id] || []).push(s) }) })
  sets.forEach(function (s) { arr(s.entries).forEach(function (id) { (setsFor[id] = setsFor[id] || []).push(s) }) })
  tracks.forEach(function (t) { arr(t.entries).forEach(function (id) { (tracksFor[id] = tracksFor[id] || []).push(t) }) })
  var headOf = function (e) { return noq(e.head || e.title) }
  var noteOf = function (e) { return noq(e.note || e.body) }
  var dayKey = function (at) { return String(at || '').slice(0, 10) }
  var DAY = { '2026-10-20': 'Tuesday, Oct 20', '2026-10-21': 'Wednesday, Oct 21', '2026-10-22': 'Thursday, Oct 22', '2026-10-23': 'Friday, Oct 23', '2026-10-24': 'Saturday, Oct 24', '2026-10-25': 'Sunday, Oct 25' }
  var dayName = function (at) { return DAY[dayKey(at)] || dayKey(at) || 'undated' }

  var openPage = function (id) {
    if (String(id).indexOf('set:') === 0) { var sid = String(id).slice(4); var o = {}; o['set:' + sid] = true; setOpened(Object.assign({}, opened, o)); setPage(null); setTab('evalsets'); setJump('set-' + sid); return }
    if (!byId[id]) return
    if (page) setHist(hist.concat([page]))
    setPage(id)
  }
  var goTab = function (t, target) { setPage(null); setTab(t); if (target) setJump(target) }

  // ── small drawn things, in hand ink ──
  var Mark = function (status, size) {
    var c = (STATUS[status] || [0, T.ink2])[1], z = size || 22
    var p = { kept: 'M3 11 L8 16 L19 4', dropped: 'M3 4 L19 18 M19 4 L3 18', revised: 'M3 13 C7 3, 14 3, 18 10 M18 10 L14 9 M18 10 L18 6', declined: 'M3 11 L19 11', open: 'M7 6 C7 1, 16 1, 15 7 C14 10, 11 10, 11 14 M11 18 L11 19' }[status]
    return p ? h('svg', { width: z, height: z, viewBox: '0 0 22 22', style: { flex: 'none' } }, h('path', { d: p, fill: 'none', stroke: c, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' })) : null
  }
  var Ring = function (children, color) {
    return h('span', { style: { position: 'relative', display: 'inline-block', padding: '4px 22px' } },
      h('svg', { viewBox: '0 0 100 40', preserveAspectRatio: 'none', style: { position: 'absolute', left: 0, top: -2, width: '100%', height: 'calc(100% + 4px)', overflow: 'visible' } },
        h('path', { d: 'M56 3 C82 3 98 10 98 20 C98 31 76 38 49 37 C22 36 2 30 2 20 C2 9 24 3 50 4 C58 4 64 5 70 7', fill: 'none', stroke: color || T.blicky, strokeWidth: 2, vectorEffect: 'non-scaling-stroke', strokeLinecap: 'round' })),
      children)
  }
  var Chip = function (label, on, onClick, color) {
    return h('button', { onClick: onClick, style: { font: '500 13px ' + T.head, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', border: '1.5px solid ' + (on ? (color || T.ink) : T.rule), background: on ? (color || T.ink) : 'transparent', color: on ? T.paper : T.ink2 } }, label)
  }
  var Pix = function (txt, color) { return h('span', { style: { font: '12px ' + T.pixel, color: color || T.mute, letterSpacing: '0.02em' } }, txt) }
  var Hand = function (txt, size, color, extra) { return h('div', { style: Object.assign({ font: (size || 18) + 'px/1.45 ' + T.hand, color: color || T.ink2, whiteSpace: 'pre-wrap' }, extra || {}) }, txt) }
  var H3 = function (txt, color) { return h('h3', { style: { font: '24px ' + T.hand, color: color || T.pickle, margin: '22px 0 10px' } }, Ring(txt, color || T.pickle)) }
  var Card = function (kids, extra) { return h('div', { style: Object.assign({ background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 14, padding: 16, boxShadow: '0 2px 0 oklch(30% 0.01 230 / .12)' }, extra || {}) }, kids) }
  var Numbers = function (ns) {
    ns = arr(ns); if (!ns.length) return null
    return h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, margin: '10px 0 4px' } }, ns.map(function (n, i) {
      return h('div', { key: i, title: n.source || '', style: { border: '1.5px solid ' + T.rule, borderRadius: 10, padding: '6px 10px', background: T.paper } },
        h('div', { style: { font: '18px ' + T.pixel, color: T.ink } }, n.value), h('div', { style: { font: '12px/1.3 ' + T.head, color: T.mute, maxWidth: 240 } }, noq(n.label)))
    }))
  }
  var Thumbs = function (imgs, big) {
    imgs = arr(imgs); if (!imgs.length) return null
    return h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10, margin: '10px 0 4px' } }, imgs.map(function (p, i) {
      return h('img', { key: i, src: src(p), loading: 'lazy', onClick: function () { setZoom(p) }, style: { width: big ? 'min(100%, 640px)' : imgs.length === 1 ? 'min(100%, 460px)' : 200, borderRadius: 8, border: '1.5px solid ' + T.rule, cursor: 'zoom-in', background: T.ground, transform: 'rotate(' + ((i % 3) - 1) * 0.6 + 'deg)' } })
    }))
  }
  var LinkChip = function (id, dir) {
    var isSet = String(id).indexOf('set:') === 0
    var label = isSet ? 'eval set · ' + (arr(sets).filter(function (s) { return 'set:' + s.id === id })[0] || {}).name : byId[id] ? headOf(byId[id]) : null
    if (!label) return null
    return h('button', { key: dir + id, onClick: function () { openPage(id) }, style: { font: '15px ' + T.hand, color: dir === '←' ? T.mute : T.blicky, background: dir === '←' ? T.ground : T.skySoft, border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', textAlign: 'left', maxWidth: 420 } }, dir + ' ' + label)
  }
  var Links = function (e) {
    var out = arr(e.links).map(function (l) { return LinkChip(l, '→') }).filter(Boolean)
    var inn = arr(back[e.id]).slice(0, 4).map(function (l) { return LinkChip(l, '←') }).filter(Boolean)
    if (!out.length && !inn.length) return null
    return h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 } }, out.concat(inn))
  }

  // ── the notebook ──
  var matches = function (e) {
    if (lane !== 'all' && e.lane !== lane) return false
    if (statusF !== 'any' && e.status !== statusF) return false
    if (kindF !== 'any' && e.kind !== kindF) return false
    if (q) { var s = (headOf(e) + ' ' + noteOf(e)).toLowerCase(); if (s.indexOf(q.toLowerCase()) < 0) return false }
    return true
  }
  var Entry = function (e) {
    var s = STATUS[e.status]
    return h('div', { key: e.id, id: 'e-' + e.id, style: { display: 'grid', gridTemplateColumns: '64px 1fr', gap: 14, padding: '14px 0', borderBottom: '1px dashed ' + T.rule } },
      h('div', { style: { paddingTop: 3 } }, Pix(String(e.at || '').slice(11, 16) || '·'), h('div', { style: { marginTop: 6 } }, Mark(e.status))),
      h('div', null,
        h('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 10 } },
          h('span', { style: { font: '11px ' + T.pixel, textTransform: 'uppercase', color: T.mute, border: '1px solid ' + T.rule, borderRadius: 4, padding: '1px 5px' } }, KIND[e.kind] || e.kind || 'note'),
          h('button', { onClick: function () { openPage(e.id) }, style: { font: '700 17px/1.3 ' + T.head, color: T.ink, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', textDecoration: e.status === 'dropped' ? 'line-through' : 'none', textDecorationColor: T.ember, textDecorationThickness: 2 } }, headOf(e)),
          s ? h('span', { style: { font: '15px ' + T.hand, color: s[1] } }, '— ' + s[0]) : null),
        Hand(noteOf(e), 17, T.ink2, { marginTop: 6 }),
        Numbers(e.numbers), Thumbs(e.images), Links(e)))
  }
  var Notebook = function () {
    var shown = entries.filter(matches), days = []
    shown.forEach(function (e) { var d = dayName(e.at); if (!days.length || days[days.length - 1][0] !== d) days.push([d, []]); days[days.length - 1][1].push(e) })
    var counts = {}, kinds = {}; entries.forEach(function (e) { counts[e.status || 'none'] = (counts[e.status || 'none'] || 0) + 1; kinds[e.kind] = (kinds[e.kind] || 0) + 1 })
    var pins = arr(data && data.pins).map(function (id) { return byId[id] }).filter(Boolean)
    return h('div', null,
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 } }, LANES.map(function (l) { return h('span', { key: l[0] }, Chip(l[1], lane === l[0], function () { setLane(l[0]) })) })),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 8 } },
        [['any', 'any outcome']].concat(Object.keys(STATUS).map(function (k) { return [k, STATUS[k][0] + ' ' + (counts[k] || 0)] })).map(function (s) { return h('span', { key: s[0] }, Chip(s[1], statusF === s[0], function () { setStatusF(s[0]) }, s[0] === 'any' ? null : STATUS[s[0]][1])) }),
        h('input', { value: q, onChange: function (ev) { setQ(ev.target.value) }, placeholder: 'search the notebook…', style: { marginLeft: 'auto', font: '15px ' + T.hand, padding: '7px 12px', border: '1.5px solid ' + T.rule, borderRadius: 999, background: T.paper, color: T.ink, minWidth: 220 } })),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 } }, [['any', 'every kind']].concat(Object.keys(KIND).filter(function (k) { return kinds[k] }).map(function (k) { return [k, KIND[k] + ' ' + kinds[k]] })).map(function (k) { return h('span', { key: k[0] }, Chip(k[1], kindF === k[0], function () { setKindF(k[0]) }, T.blicky)) })),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 } }, days.map(function (d) {
        return h('button', { key: d[0], onClick: function () { setJump('d-' + d[0]) }, style: { font: '15px ' + T.hand, color: T.pickle, background: T.mossSoft, border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' } }, d[0] + ' · ' + d[1].length)
      })),
      (lane === 'all' && statusF === 'any' && kindF === 'any' && !q && pins.length) ? h('div', { style: { background: T.skySoft, borderRadius: 14, padding: '14px 18px', marginBottom: 18, transform: 'rotate(-0.3deg)' } },
        Hand('start here: the pages to read first', 22, T.blicky, { marginBottom: 6 }),
        pins.map(function (e, i) {
          return h('div', { key: e.id, style: { display: 'flex', gap: 10, alignItems: 'baseline', margin: '5px 0' } }, Pix(String(i + 1)),
            h('button', { onClick: function () { openPage(e.id) }, style: { font: '600 15px ' + T.head, color: T.ink, background: 'none', border: 'none', padding: 0, textDecoration: 'underline', textDecorationColor: T.dot, cursor: 'pointer', textAlign: 'left' } }, headOf(e)),
            Pix(dayName(e.at).split(',')[0] + ' ' + String(e.at || '').slice(11, 16)))
        })) : null,
      Hand(shown.length + ' of ' + entries.length + ' pages', 14, T.mute, { marginBottom: 6 }),
      days.map(function (d) {
        return h('section', { key: d[0], id: 'd-' + d[0], style: { marginBottom: 26 } },
          h('h3', { style: { margin: '18px 0 4px', font: '26px ' + T.hand, color: T.pickle } }, Ring(d[0], T.pickle)),
          d[1].map(Entry))
      }))
  }

  // ── one page, opened: everything it touches ──
  var Page = function () {
    var e = byId[page]; if (!e) return null
    var i = entries.indexOf(e), prev = entries[i - 1], next = entries[i + 1]
    var sameLane = entries.filter(function (x) { return x.lane === e.lane }), li = sameLane.indexOf(e)
    var Rel = function (title, kids) { return kids && kids.length ? h('div', { style: { marginTop: 16 } }, Hand(title, 18, T.pickle, { marginBottom: 6 }), h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } }, kids)) : null }
    var btn = function (label, on, color) { return h('button', { onClick: on, style: { font: '15px ' + T.hand, color: color || T.blicky, background: T.skySoft, border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' } }, label) }
    return h('div', { onClick: function () { setPage(null); setHist([]) }, style: { position: 'fixed', inset: 0, background: 'oklch(18% 0 0 / .55)', zIndex: 40, overflowY: 'auto', padding: '40px 16px' } },
      h('div', { onClick: function (ev) { ev.stopPropagation() }, style: { maxWidth: 820, margin: '0 auto', background: T.paper, backgroundImage: 'radial-gradient(circle, ' + T.dot + ' 1px, transparent 1.4px)', backgroundSize: '18px 18px', borderRadius: 16, padding: '24px 30px 30px', boxShadow: 'inset 0 0 0 1.5px ' + T.rule + ', 0 3px 0 oklch(30% 0.01 230 / .2)' } },
        h('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
          hist.length ? btn('← back', function () { setPage(hist[hist.length - 1]); setHist(hist.slice(0, -1)) }) : null,
          prev ? btn('‹ earlier', function () { openPage(prev.id) }, T.mute) : null,
          next ? btn('later ›', function () { openPage(next.id) }, T.mute) : null,
          h('span', { style: { marginLeft: 'auto' } }, Pix(dayName(e.at) + ' · ' + String(e.at || '').slice(11, 16) + ' · ' + (LANE_NAME[e.lane] || e.lane) + ' ' + (li + 1) + '/' + sameLane.length)),
          h('button', { onClick: function () { setPage(null); setHist([]) }, style: { font: '18px ' + T.head, background: 'none', border: 'none', cursor: 'pointer', color: T.mute } }, '×')),
        h('div', { style: { display: 'flex', gap: 12, alignItems: 'center', marginTop: 14 } }, Mark(e.status, 30),
          h('h2', { style: { margin: 0, font: '700 28px/1.2 ' + T.head, color: T.ink } }, headOf(e))),
        e.status ? Hand((KIND[e.kind] || 'note') + ' · ' + (STATUS[e.status] || [e.status])[0], 16, (STATUS[e.status] || [0, T.mute])[1], { marginTop: 4 }) : null,
        Hand(noteOf(e), 21, T.ink, { marginTop: 14 }),
        Numbers(e.numbers), Thumbs(e.images, true),
        Rel('this led to', arr(e.links).map(function (l) { return LinkChip(l, '→') }).filter(Boolean)),
        Rel('came from / points here', arr(back[e.id]).map(function (l) { return LinkChip(l, '←') }).filter(Boolean)),
        Rel('the spec it belongs to', arr(specsFor[e.id]).map(function (s) { return h('span', { key: s.id }, btn(s.id + ' · ' + noq(s.title), function () { goTab('specs', 'spec-' + s.id) })) })),
        Rel('the sponsor it touches', arr(tracksFor[e.id]).map(function (t) { return h('span', { key: t.name }, btn(t.name, function () { var o = {}; o[t.name] = true; setOpened(Object.assign({}, opened, o)); goTab('sponsors', 'tr-' + t.name) })) })),
        Rel('the eval set it uses', arr(setsFor[e.id]).map(function (s) { return h('span', { key: s.id }, btn(s.name, function () { openPage('set:' + s.id) })) })),
        arr(e.sources).length ? h('div', { style: { marginTop: 16 } }, Pix('written from ' + arr(e.sources).join(' · '))) : null))
  }

  // ── the map: diagrams you can click ──
  var Map = function () {
    var count = function (f) { return entries.filter(f).length }
    var nQ = specs.reduce(function (n, s) { return n + arr(s.questions).length }, 0)
    var loop = [
      ['I say it', count(function (e) { return e.lane === 'ideation' }) + ' pages', function () { setLane('ideation'); goTab('notebook') }],
      ['a spec', specs.length + ' specs', function () { goTab('specs') }],
      ['click questions', nQ + ' picks', function () { goTab('specs') }],
      ['we build', count(function (e) { return e.kind === 'tried' || e.kind === 'milestone' }) + ' tries', function () { setKindF('tried'); goTab('notebook') }],
      ['a test set', sets.length + ' sets', function () { goTab('evalsets') }],
      ['live exam', runs.length + ' runs', function () { goTab('tests') }],
      ['a judge', checks.length + ' checks', function () { goTab('tests', 'checks') }],
      ['fix it', count(function (e) { return e.status === 'revised' }) + ' revised', function () { setStatusF('revised'); goTab('notebook') }],
    ]
    var W = 940, H = 380, cx = W / 2, cy = H / 2, rx = 360, ry = 140
    var pos = loop.map(function (_, i) { var a = -Math.PI / 2 + (i / loop.length) * Math.PI * 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] })
    // the timeline: lanes × days
    var dayKeys = Object.keys(DAY), laneKeys = ['ideation', 'product', 'design', 'deck', 'sponsors', 'evals']
    var grid = {}; entries.forEach(function (e) { var k = e.lane + '|' + dayKey(e.at); grid[k] = (grid[k] || 0) + 1 })
    var maxCell = Math.max.apply(null, [1].concat(Object.keys(grid).map(function (k) { return grid[k] })))
    // outcomes
    var outs = Object.keys(STATUS).map(function (k) { return [k, count(function (e) { return e.status === k })] }), outTotal = outs.reduce(function (n, o) { return n + o[1] }, 0) || 1
    var LAYERS = [
      ['On your Mac', 'Swift + SwiftUI, no packages', ['Pickle & Blicky drawn', 'shake to wake', 'the mic and its gate', 'Blicky’s marks', 'screenpipe eyes']],
      ['The talk server', 'TypeScript on Node, 127.0.0.1 only', ['route the sentence', 'the turn', 'the voice', 'stream back']],
      ['Brains and memory', 'each part one job', ['Anthropic', 'Cartesia', 'Moss', 'Convex', 'Elastic', 'Factory', 'Mana']],
    ]
    var trackByShort = {}; tracks.forEach(function (t) { trackByShort[String(t.name).split(/[ ,]/)[0].toLowerCase()] = t })
    return h('div', null,
      Hand('how I built it, as a loop: every turn of it is a page in this notebook. Click a step.', 19, T.ink2),
      h('svg', { viewBox: '0 0 ' + W + ' ' + H, style: { width: '100%', maxWidth: W, display: 'block', margin: '6px auto 0' } },
        h('ellipse', { cx: cx, cy: cy, rx: rx, ry: ry, fill: 'none', stroke: T.dot, strokeWidth: 2, strokeDasharray: '2 7', strokeLinecap: 'round' }),
        pos.map(function (p, i) {
          var n = pos[(i + 1) % pos.length], mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2
          var ang = Math.atan2(n[1] - p[1], n[0] - p[0]) * 180 / Math.PI
          return h('g', { key: 'a' + i, transform: 'translate(' + mx + ' ' + my + ') rotate(' + ang + ')' }, h('path', { d: 'M-8 -6 L2 0 L-8 6', fill: 'none', stroke: T.blicky, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }))
        }),
        loop.map(function (s, i) {
          var p = pos[i]
          return h('g', { key: s[0], onClick: s[2], style: { cursor: 'pointer' } },
            h('rect', { x: p[0] - 78, y: p[1] - 30, width: 156, height: 60, rx: 14, fill: i % 2 ? T.skySoft : T.mossSoft, stroke: i % 2 ? T.blicky : T.pickle, strokeWidth: 1.8 }),
            h('text', { x: p[0], y: p[1] - 4, textAnchor: 'middle', style: { font: '700 15px ' + T.head, fill: T.ink } }, s[0]),
            h('text', { x: p[0], y: p[1] + 17, textAnchor: 'middle', style: { font: '13px ' + T.pixel, fill: T.mute } }, s[1]))
        }),
        h('text', { x: cx, y: cy + 6, textAnchor: 'middle', style: { font: '22px ' + T.hand, fill: T.pickle } }, 'then again, smaller')),
      H3('when it happened: pages per day, per lane'),
      h('div', { style: { display: 'grid', gridTemplateColumns: '130px repeat(' + dayKeys.length + ', 1fr)', gap: 4, alignItems: 'center' } },
        h('span', { key: 'corner' }), dayKeys.map(function (d) { return h('span', { key: 'h' + d, style: { textAlign: 'center' } }, Pix(DAY[d].split(',')[0].slice(0, 3) + ' ' + d.slice(8))) }),
        [].concat.apply([], laneKeys.map(function (l) {
          return [h('button', { key: l, onClick: function () { setLane(l); goTab('notebook') }, style: { font: '15px ' + T.hand, color: T.pickle, background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' } }, LANE_NAME[l])].concat(dayKeys.map(function (d) {
            var n = grid[l + '|' + d] || 0, r = n ? 6 + Math.sqrt(n / maxCell) * 22 : 0
            return h('button', { key: l + d, disabled: !n, onClick: function () { setLane(l); goTab('notebook', 'd-' + DAY[d]) }, title: n + ' pages', style: { height: 56, background: 'none', border: 'none', cursor: n ? 'pointer' : 'default', display: 'grid', placeItems: 'center' } },
              n ? h('span', { style: { width: r * 2, height: r * 2, borderRadius: 999, background: l === 'evals' || l === 'sponsors' ? T.skySoft : T.mossSoft, border: '1.5px solid ' + (l === 'evals' || l === 'sponsors' ? T.blicky : T.pickle), display: 'grid', placeItems: 'center', font: '12px ' + T.pixel, color: T.ink } }, n) : h('span', { style: { width: 4, height: 4, borderRadius: 9, background: T.dot } }))
          }))
        }))),
      H3('how things turned out'),
      h('div', { style: { display: 'flex', height: 40, borderRadius: 10, overflow: 'hidden', border: '1.5px solid ' + T.rule } }, outs.map(function (o) {
        return o[1] ? h('button', { key: o[0], onClick: function () { setStatusF(o[0]); goTab('notebook') }, title: o[1] + ' ' + o[0], style: { width: (o[1] / outTotal * 100) + '%', background: STATUS[o[0]][1], border: 'none', borderRight: '2px solid ' + T.paper, color: T.paper, font: '13px ' + T.pixel, cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden' } }, o[1] / outTotal > 0.06 ? o[0] + ' ' + o[1] : o[1]) : null
      })),
      Hand('most things got kept or revised on the way; the dropped ones are crossed out in the notebook, and still there.', 16, T.mute, { marginTop: 6 }),
      H3('what runs where: three layers'),
      LAYERS.map(function (L, i) {
        return h('div', { key: L[0], style: { display: 'grid', gridTemplateColumns: '200px 1fr', gap: 14, alignItems: 'center', margin: '0 0 6px' } },
          h('div', null, h('div', { style: { font: '700 16px ' + T.head } }, L[0]), Pix(L[1])),
          h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, padding: 10, borderRadius: 12, background: i === 2 ? T.felt : T.ground } }, L[2].map(function (p) {
            var t = trackByShort[p.toLowerCase()]
            return h('button', { key: p, onClick: t ? function () { var o = {}; o[t.name] = true; setOpened(Object.assign({}, opened, o)); goTab('sponsors', 'tr-' + t.name) } : undefined, style: { font: '600 13px ' + T.head, padding: '8px 12px', borderRadius: 10, border: 'none', cursor: t ? 'pointer' : 'default', background: T.paper, color: T.ink, boxShadow: '0 2px 0 oklch(30% 0.01 230 / .2)' } }, p + (t ? ' →' : ''))
          })),
          i < 2 ? h('div', { style: { gridColumn: '2', textAlign: 'center', color: T.blicky, font: '18px ' + T.hand } }, '↓') : null)
      }))
  }

  // ── specs: every spec, its questions, my picks ──
  var Specs = function () {
    return h('div', null,
      Hand('every spec starts with what I asked for, then the questions I clicked through, then what got built. The chain:', 19, T.ink2),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, margin: '12px 0 18px' } }, specs.map(function (s, i) {
        var c = (STATUS[{ shipped: 'kept', partly: 'revised', dropped: 'dropped', open: 'open' }[s.status]] || [0, T.mute])[1]
        return h('span', { key: s.id, style: { display: 'flex', alignItems: 'center' } },
          h('button', { onClick: function () { setJump('spec-' + s.id) }, title: noq(s.title), style: { minWidth: 46, height: 46, padding: '0 6px', borderRadius: 999, border: '2px solid ' + c, background: T.paper, font: '12px ' + T.pixel, color: T.ink, cursor: 'pointer' } }, String(s.id).replace(/^spec-0*/, '').replace(/^design-/, 'd')),
          i < specs.length - 1 ? h('span', { style: { width: 14, height: 2, background: T.dot } }) : null)
      })),
      specs.map(function (s) {
        return h('div', { key: s.id, id: 'spec-' + s.id, style: { marginBottom: 16 } }, Card([
          h('div', { key: 'h', style: { display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' } }, Pix(s.id), h('span', { style: { font: '700 20px ' + T.head } }, noq(s.title)), Pix(String(s.when || '').replace('T', ' ')), h('span', { style: { marginLeft: 'auto', font: '16px ' + T.hand, color: T.pickle } }, s.status || '')),
          s.ask ? Hand(noq(s.ask), 18, T.blicky, { key: 'a', marginTop: 8 }) : null,
          arr(s.questions).length ? h('div', { key: 'q', style: { marginTop: 10 } }, arr(s.questions).map(function (qq, i) {
            return h('div', { key: i, style: { padding: '8px 0', borderTop: '1px dashed ' + T.rule } },
              h('div', { style: { font: '600 14px/1.4 ' + T.head, color: T.ink } }, noq(qq.q)),
              h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 } }, arr(qq.options).map(function (o, j) {
                var picked = qq.picked && noq(o).toLowerCase().indexOf(noq(qq.picked).toLowerCase().slice(0, 24)) === 0
                return h('span', { key: j, style: { font: '13px/1.35 ' + T.head, padding: '4px 10px', borderRadius: 8, background: picked ? T.mossSoft : T.ground, color: picked ? T.pickle : T.mute, border: '1.5px solid ' + (picked ? T.pickle : 'transparent'), fontWeight: picked ? 600 : 400 } }, (picked ? '✓ ' : '') + noq(o))
              })),
              qq.picked ? Hand('picked: ' + noq(qq.picked) + (qq.note ? ' — ' + noq(qq.note) : ''), 15, T.pickle, { marginTop: 4 }) : null)
          })) : null,
          arr(s.built).length ? h('div', { key: 'b', style: { marginTop: 10 } }, Hand('built', 16, T.pickle), arr(s.built).map(function (b, i) { return h('div', { key: i, style: { display: 'flex', gap: 8, font: '14px/1.5 ' + T.head, color: T.ink2 } }, Mark('kept', 18), noq(b)) })) : null,
          arr(s.measured).length ? h('div', { key: 'm', style: { marginTop: 8 } }, Hand('measured', 16, T.blicky), arr(s.measured).map(function (m, i) { return h('div', { key: i, style: { font: '13px/1.5 ' + T.pixel, color: T.ink2 } }, '· ' + noq(m)) })) : null,
          arr(s.entries).length ? h('div', { key: 'e', style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 } }, arr(s.entries).map(function (id) { return LinkChip(id, '→') }).filter(Boolean)) : null,
          s.next ? h('button', { key: 'n', onClick: function () { setJump('spec-' + s.next) }, style: { marginTop: 8, font: '15px ' + T.hand, color: T.blicky, background: 'none', border: 'none', cursor: 'pointer', padding: 0 } }, 'led to ' + s.next + ' ↓') : null,
          s.file ? h('div', { key: 'f', style: { marginTop: 6 } }, Pix(s.file)) : null,
        ]))
      }))
  }

  // ── eval sets: the test data, and how to make it ──
  var EvalSets = function () {
    var steps = arr(method.steps)
    return h('div', null,
      Hand('this is how we made test data, then used it: the test numbers in this notebook came out of runs on sets like these.', 19, T.ink2),
      steps.length ? h('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 6, margin: '12px 0 6px' } }, steps.map(function (st, i) {
        var on = opened['step' + i]
        return h('span', { key: i, style: { display: 'flex', alignItems: 'center', gap: 6 } },
          h('button', { onClick: function () { var o = {}; o['step' + i] = !on; setOpened(Object.assign({}, opened, o)) }, style: { textAlign: 'left', maxWidth: on ? 380 : 170, padding: '10px 12px', borderRadius: 12, border: '1.8px solid ' + (i % 2 ? T.blicky : T.pickle), background: i % 2 ? T.skySoft : T.mossSoft, cursor: 'pointer' } },
            Pix(String(i + 1)), h('div', { style: { font: '700 14px/1.3 ' + T.head, color: T.ink, marginTop: 2 } }, noq(st.step)),
            on ? h('div', { style: { font: '13px/1.45 ' + T.head, color: T.ink2, marginTop: 6 } }, noq(st.what), st.why ? h('div', { style: { marginTop: 4, font: '15px/1.4 ' + T.hand, color: T.blicky } }, 'why: ' + noq(st.why)) : null, st.example ? h('div', { style: { marginTop: 4 } }, Pix('e.g. ' + noq(st.example))) : null) : null),
          i < steps.length - 1 ? h('span', { style: { color: T.blicky, font: '20px ' + T.hand } }, '→') : null)
      })) : null,
      steps.length ? Pix('click a step to open it') : null,
      arr(method.rules).length ? h('div', { style: { marginTop: 12 } }, Hand('rules I learned the hard way', 18, T.pickle), arr(method.rules).map(function (r, i) { return h('div', { key: i, style: { display: 'flex', gap: 8, font: '15px/1.5 ' + T.head, color: T.ink2, margin: '3px 0' } }, Mark('kept', 18), noq(r)) })) : null,
      H3('the sets'),
      h('div', { style: { display: 'grid', gap: 14 } }, sets.map(function (s) {
        var on = opened['set:' + s.id], cases = arr(s.cases)
        var jsonl = cases.map(function (c) { return JSON.stringify(c) }).join('\n')
        return h('div', { key: s.id, id: 'set-' + s.id }, Card([
          h('div', { key: 'h', style: { display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', cursor: 'pointer' }, onClick: function () { var o = {}; o['set:' + s.id] = !on; setOpened(Object.assign({}, opened, o)) } },
            h('span', { style: { font: '700 19px ' + T.head } }, noq(s.name)), Pix(cases.length + ' cases · ' + ((s.grader || {}).kind || '') + (s.metric ? ' · ' + noq(s.metric) : '')),
            h('span', { style: { marginLeft: 'auto', font: '16px ' + T.hand, color: T.blicky } }, on ? '↑ fold' : '↓ open the cases')),
          s.purpose ? Hand(noq(s.purpose), 17, T.ink2, { key: 'p', marginTop: 6 }) : null,
          !on ? null : h('div', { key: 'b' },
            s.built_how ? h('div', { style: { marginTop: 8, font: '14px/1.5 ' + T.head, color: T.ink2 } }, h('b', null, 'How I made it. '), noq(s.built_how)) : null,
            s.grader ? h('div', { style: { marginTop: 6, font: '14px/1.5 ' + T.head, color: T.ink2 } }, h('b', null, 'How it’s graded. '), noq(s.grader.how)) : null,
            h('div', { style: { overflowX: 'auto', marginTop: 10, border: '1.5px solid ' + T.rule, borderRadius: 10 } },
              h('table', { style: { width: '100%', borderCollapse: 'collapse', font: '13px/1.45 ' + T.head } },
                h('thead', null, h('tr', { style: { background: T.ground } }, ['case', 'input', 'expected', 'criteria', 'last result'].map(function (c) { return h('th', { key: c, style: { textAlign: 'left', padding: '6px 8px', font: '11px ' + T.pixel, color: T.mute, textTransform: 'uppercase' } }, c) }))),
                h('tbody', null, cases.map(function (c, i) {
                  return h('tr', { key: i, style: { borderTop: '1px dashed ' + T.rule, verticalAlign: 'top' } },
                    h('td', { style: { padding: '6px 8px' } }, Pix(String(c.id || i + 1)), c.built_from_description ? h('div', null, Pix('from description', T.ember)) : null),
                    h('td', { style: { padding: '6px 8px', maxWidth: 260, color: T.ink } }, typeof c.input === 'string' ? c.input : JSON.stringify(c.input)),
                    h('td', { style: { padding: '6px 8px', maxWidth: 220, color: T.ink2 } }, typeof c.expected === 'string' ? c.expected : JSON.stringify(c.expected)),
                    h('td', { style: { padding: '6px 8px', maxWidth: 260, color: T.ink2 } }, arr(c.criteria).map(function (k, j) { return h('div', { key: j }, '· ' + noq(k)) })),
                    h('td', { style: { padding: '6px 8px', whiteSpace: 'nowrap' } }, c.last_result ? h('span', { title: (c.last_result.run || '') + ' ' + (c.last_result.source || '') }, Pix(String(c.last_result.value), T.pickle)) : Pix('–')))
                })))),
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10, alignItems: 'center' } },
              Chip(copied === 'jsonl:' + s.id ? 'copied ✓' : 'copy as JSONL', false, function () { copy(jsonl, 'jsonl:' + s.id) }),
              h('a', { href: REPO + 'evalsets/' + s.id + '.jsonl', target: '_blank', rel: 'noreferrer', style: { font: '15px ' + T.hand, color: T.blicky } }, 'the file, one case per line ↗'),
              arr(s.runs).map(function (r) { return h('button', { key: r, onClick: function () { goTab('tests', 'run-' + r) }, style: { font: '14px ' + T.hand, color: T.pickle, background: T.mossSoft, border: 'none', borderRadius: 8, padding: '3px 9px', cursor: 'pointer' } }, 'run ' + r + ' →') })),
            arr(s.lessons).length ? h('div', { style: { marginTop: 10 } }, Hand('what it taught me', 16, T.pickle), arr(s.lessons).map(function (l, i) { return Hand('· ' + noq(l), 16, T.ink2, { key: i }) })) : null,
            arr(s.entries).length ? h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 } }, arr(s.entries).map(function (id) { return LinkChip(id, '→') }).filter(Boolean)) : null,
            s.source ? h('div', { style: { marginTop: 8 } }, Pix('from ' + (Array.isArray(s.source) ? s.source.join(' · ') : s.source))) : null),
        ]))
      })))
  }

  // ── sponsors: the tradeoffs, verdict first ──
  var Bar = function (label, v, max, color, unit) {
    var w = max > 0 ? Math.max(2, Math.round((v / max) * 100)) : 0
    return h('div', { style: { display: 'grid', gridTemplateColumns: '70px 1fr 170px', gap: 8, alignItems: 'center', margin: '3px 0' } },
      h('span', { style: { font: '13px ' + T.head, color: T.ink2 } }, label),
      h('div', { style: { height: 10, background: T.ground, borderRadius: 999 } }, h('div', { style: { width: w + '%', height: '100%', background: color, borderRadius: 999 } })),
      h('span', { style: { font: '13px ' + T.pixel, color: T.ink } }, v + (unit ? ' ' + unit : '')))
  }
  var num = function (x) { var m = String(x == null ? '' : x).replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN }
  var Sponsors = function () {
    var order = { used: 0, considered: 1, dropped: 2 }
    var ts = tracks.slice().sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0) })
    return h('div', null,
      Hand('the question I kept asking: are these tradeoffs worth it, are we actually getting a better result for what we’re aiming for. Here’s the math, one sponsor at a time.', 19, T.blicky, { marginBottom: 14 }),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 } }, ts.map(function (t, i) {
        var verdictColor = /^yes/i.test(t.verdict || '') ? T.pickle : /^no/i.test(t.verdict || '') ? T.ember : T.blicky
        var on = opened[t.name]
        return h('div', { key: i, id: 'tr-' + t.name }, Card([
          h('div', { key: 'h', style: { display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' } },
            h('div', { style: { font: '700 22px ' + T.head, color: T.ink, textDecoration: t.status === 'dropped' ? 'line-through' : 'none', textDecorationColor: T.ember } }, t.name), Pix(t.status || '', t.status === 'used' ? T.pickle : T.mute)),
          arr(t.verbs).length ? h('div', { key: 'v', style: { display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 } }, arr(t.verbs).map(function (v, j) { return h('span', { key: j, style: { font: '12px ' + T.pixel, padding: '2px 6px', borderRadius: 4, background: T.mossSoft, color: T.pickle } }, v) })) : null,
          t.verdict ? h('div', { key: 'vd', style: { marginTop: 10, padding: '10px 12px', borderRadius: 10, border: '2px solid ' + verdictColor, font: '17px/1.4 ' + T.hand, color: verdictColor } }, noq(t.verdict)) : null,
          t.note ? Hand(noq(t.note), 17, T.ink2, { key: 'n', marginTop: 10 }) : t.role ? h('div', { key: 'r', style: { font: '15px/1.5 ' + T.head, color: T.ink2, marginTop: 10 } }, noq(t.role)) : null,
          h('button', { key: 'b', onClick: function () { var o = {}; o[t.name] = !on; setOpened(Object.assign({}, opened, o)) }, style: { marginTop: 8, font: '16px ' + T.hand, color: T.blicky, background: 'none', border: 'none', padding: 0, cursor: 'pointer' } }, on ? '↑ fold it' : '↓ the plan, the numbers, what I didn’t pick'),
          !on ? null : h('div', { key: 'd' },
            t.track ? h('div', { style: { font: '13px/1.4 ' + T.head, color: T.mute, marginTop: 8 } }, noq(t.track)) : null,
            t.plan ? h('div', { style: { font: '14px/1.5 ' + T.head, color: T.ink2, marginTop: 8 } }, h('b', null, 'The plan. '), noq(t.plan)) : null,
            arr(t.metrics).length ? h('div', { style: { marginTop: 10 } }, arr(t.metrics).map(function (m, j) {
              var a = num(m['with']), b = num(m.without), max = Math.max(a || 0, b || 0)
              return h('div', { key: j, title: (m.source || '') + (m.caveat ? ' · ' + m.caveat : ''), style: { marginBottom: 8 } },
                h('div', { style: { font: '600 13px ' + T.head, color: T.ink } }, noq(m.label)),
                !isNaN(a) ? Bar('with', a, max, T.pickle, m.unit) : h('div', { style: { font: '13px ' + T.head } }, 'with: ' + noq(m['with'])),
                !isNaN(b) ? Bar('without', b, max, T.dot, m.unit) : (m.without ? h('div', { style: { font: '13px ' + T.head, color: T.mute } }, 'without: ' + noq(m.without)) : null),
                m.caveat ? Pix(noq(m.caveat)) : null)
            })) : null,
            arr(t.alternatives).map(function (a, j) { return h('div', { key: 'alt' + j, style: { font: '14px/1.45 ' + T.head, color: T.ink2, marginTop: 4 } }, h('span', { style: { textDecoration: 'line-through', textDecorationColor: T.ember } }, noq(a.option)), ' — ', noq(a['why not'] || a.why || '')) }),
            t.cost ? h('div', { style: { marginTop: 8, font: '13px/1.45 ' + T.head, color: T.mute } }, Object.keys(t.cost).map(function (k) { return h('div', { key: k }, h('b', null, k + ': '), noq(t.cost[k])) })) : null),
          arr(t.entries).length ? h('div', { key: 'e', style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 } }, arr(t.entries).slice(0, 6).map(function (id) { return LinkChip(id, '→') }).filter(Boolean)) : null,
        ]))
      })))
  }

  // ── test runs ──
  var Tests = function () {
    var pct = function (r) { return r && r.den ? Math.round((r.num / r.den) * 100) : null }
    var kinds = {}; runs.forEach(function (r) { Object.keys(r.by_kind || {}).forEach(function (k) { kinds[k] = 1 }) })
    return h('div', null,
      Hand('every run we scored, in order. The live exam drives the real app on the real screen and a strict judge grades each step. My bar: 80% over two runs, no reveal slips. Not passed yet.', 18, T.ink2),
      h('div', { style: { position: 'relative', marginTop: 10 } }, Card(runs.map(function (r, i) {
        var p = pct(r.pass_rate)
        return h('div', { key: i, id: 'run-' + r.id, style: { display: 'grid', gridTemplateColumns: '220px 1fr 90px', gap: 10, alignItems: 'center', margin: '8px 0' } },
          h('div', null, h('div', { style: { font: '600 13px/1.3 ' + T.head } }, noq(r.what || r.id)), Pix(String(r.at || '').replace('T', ' '))),
          h('div', { style: { position: 'relative', height: 14, background: T.ground, borderRadius: 999 } },
            h('div', { style: { width: (p || 0) + '%', height: '100%', borderRadius: 999, background: p != null && p >= 60 ? T.pickle : T.dot } }),
            h('div', { style: { position: 'absolute', left: '80%', top: -4, bottom: -4, borderLeft: '2px dashed ' + T.ember } })),
          h('div', { style: { font: '15px ' + T.pixel } }, p == null ? '–' : p + '%', h('div', null, Pix(r.pass_rate ? r.pass_rate.num + '/' + r.pass_rate.den : ''))))
      }).concat([h('div', { key: 'leg', style: { textAlign: 'right' } }, Pix('dashed line: the 80% bar', T.ember))]))),
      Object.keys(kinds).length ? H3('by kind of criterion') : null,
      Object.keys(kinds).map(function (k) {
        return h('div', { key: k, style: { margin: '6px 0' } }, h('div', { style: { font: '600 14px ' + T.head } }, k),
          runs.map(function (r, i) { var x = (r.by_kind || {})[k]; return x ? h('div', { key: i }, Bar(String(i + 1), pct(x), 100, i === runs.length - 1 ? T.pickle : T.dot, '%  ' + x.num + '/' + x.den)) : null }))
      }),
      checks.length ? h('div', { id: 'checks' }, H3('every check we built'),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 } }, checks.map(function (c, i) {
          return h('div', { key: i }, Card([h('div', { key: 'n', style: { font: '700 15px ' + T.head } }, noq(c.name)), h('div', { key: 'w', style: { font: '14px/1.45 ' + T.head, color: T.ink2, marginTop: 4 } }, noq(c['what it proves'] || c.what)),
            c.result ? Hand(noq(c.result), 16, T.pickle, { key: 'r', marginTop: 6 }) : null, c.source ? h('div', { key: 's' }, Pix(c.source)) : null], { padding: 12 }))
        }))) : null)
  }

  // ── how to keep a notebook like this ──
  var HowTo = function () {
    var sample = entries.filter(function (e) { return e.numbers && arr(e.numbers).length && arr(e.links).length })[0] || entries[0]
    var noteTpl = JSON.stringify({ id: 'kebab-id', at: '2026-10-24T13:34', lane: 'product', kind: 'tried | result | decision | question', status: 'kept | revised | dropped | declined | open', head: 'what this page is, short', note: 'first person, plain, what I tried and what happened, numbers with their source', numbers: [{ label: 'what it measures', value: '24/24', source: 'file:line' }], images: ['img/…'], links: ['the page it leads to'], sources: ['where it is written down'] }, null, 2)
    var setTpl = JSON.stringify({ id: 'set-id', name: 'what it tests', purpose: 'the one question it answers', grader: { kind: 'rule | model-judge | exact | human', how: 'what counts as a pass' }, metric: 'passed criteria / all', cases: [{ id: 'c1', input: 'what the user says or sees', expected: 'what good looks like', criteria: ['one checkable thing'], tags: ['seed:2'] }] }, null, 2)
    var steps = [
      ['Write the question first', 'Before building anything, I write down what I want to know, in my own words. That line is the top of the spec and the first page here.'],
      ['Log what you tried, with the time', 'Every try gets a page with the minute it happened. Times make the story; the commit or the file is the proof.'],
      ['Measure it, and name where the number lives', 'A number without a source doesn’t go in. A number without its caveat doesn’t either.'],
      ['Decide out loud', 'Kept, revised, dropped, declined, or open. Dropped pages stay, crossed out: they’re the reason the kept ones are kept.'],
      ['Link the page both ways', 'What did this lead to, what did it come from. The links are how the next person, or Mana, walks the reasoning.'],
      ['Make the test data before the feature', 'Write the cases (input, what good looks like, the criteria) from the spec. Keep the answer key away from the prompts. Seed for variety.'],
      ['Run it, grade it, fix it, run it again', 'The judge’s misses become the next page. When the score moves, write down why.'],
    ]
    return h('div', null,
      Hand('how I’d tell someone to keep notes like this, so the build explains itself afterwards.', 20, T.ink2),
      H3('the anatomy of a page'),
      sample ? h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16, alignItems: 'start' } },
        h('div', { style: { border: '2px dashed ' + T.blicky, borderRadius: 14, padding: '6px 14px', background: T.paper } }, Entry(sample)),
        h('div', null, [['the time', 'when it happened, to the minute'], ['the mark', 'kept ✓ revised ↷ dropped ✗ declined — open ?'], ['the kind', 'question, tried, result, decided'], ['the head', 'one line, what the page is'], ['the note', 'first person, plain, unfinished is fine'], ['the numbers', 'each one with its source'], ['the links', '→ what it led to, ← what points here']].map(function (a, i) {
          return h('div', { key: i, style: { display: 'flex', gap: 8, margin: '8px 0' } }, h('span', { style: { color: T.blicky, font: '18px ' + T.hand } }, '←'), h('div', null, h('div', { style: { font: '17px ' + T.hand, color: T.blicky } }, a[0]), h('div', { style: { font: '13px/1.4 ' + T.head, color: T.mute } }, a[1])))
        }))) : null,
      H3('the steps'),
      steps.map(function (s, i) {
        return h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10, padding: '10px 0', borderTop: '1px dashed ' + T.rule } },
          h('div', { style: { font: '28px ' + T.hand, color: T.pickle } }, String(i + 1)),
          h('div', null, h('div', { style: { font: '700 16px ' + T.head } }, s[0]), Hand(s[1], 17, T.ink2)))
      }),
      h('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 } }, Chip('see how the test sets were made →', false, function () { goTab('evalsets') }, T.blicky), Chip('see the specs →', false, function () { goTab('specs') }, T.blicky)),
      H3('templates, to copy'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 } }, [['a page', noteTpl], ['a test set', setTpl]].map(function (t) {
        return h('div', { key: t[0] }, Card([h('div', { key: 'h', style: { display: 'flex', justifyContent: 'space-between' } }, Hand(t[0], 18, T.pickle), Chip(copied === 'tpl:' + t[0] ? 'copied ✓' : 'copy', false, function () { copy(t[1], 'tpl:' + t[0]) })),
          h('pre', { key: 'p', style: { margin: '8px 0 0', font: '12px/1.45 ' + T.pixel, color: T.ink2, whiteSpace: 'pre-wrap' } }, t[1])]))
      })))
  }

  // ── the style book ──
  var Style = function () {
    var s = (data && data.style) || {}
    return h('div', null,
      s.quote ? Hand(noq(s.quote.text), 20, T.blicky) : null,
      H3('colour: the palette'),
      h('div', { style: { font: '14px ' + T.head, color: T.mute, marginBottom: 8 } }, 'Click a swatch to copy its hex. ' + (copied && copied[0] === '#' ? 'Copied ' + copied : '')),
      arr(s.ramps).map(function (r, i) {
        return h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '90px repeat(11, 1fr)', gap: 4, alignItems: 'center', margin: '4px 0' } },
          h('span', { style: { font: '600 13px ' + T.head } }, r.name),
          arr(r.steps).map(function (st, j) { return h('button', { key: j, title: st.name + ' · ' + st.oklch + ' · ' + st.hex, onClick: function () { copy(st.hex) }, style: { height: 38, border: 'none', borderRadius: 6, background: st.oklch, cursor: 'copy', font: '10px ' + T.pixel, color: j > 5 ? T.paper : T.ink, padding: 0 } }, st.step) }))
      }),
      H3('colour: the roles'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 } }, arr(s.roles).map(function (r, i) {
        return h('button', { key: i, onClick: function () { copy('var(--' + r.name + ')') }, style: { display: 'flex', gap: 10, alignItems: 'center', textAlign: 'left', background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 10, padding: 8, cursor: 'copy' } },
          h('span', { style: { width: 34, height: 34, borderRadius: 8, background: r.value, border: '1px solid ' + T.rule, flex: 'none' } }), h('span', null, h('div', { style: { font: '600 13px ' + T.head } }, '--' + r.name), Pix(r.from)))
      })),
      H3('type: three voices'),
      arr(s.voices).map(function (v, i) {
        return h('div', { key: i, style: { borderTop: '1px dashed ' + T.rule, padding: '12px 0' } },
          h('div', { style: { font: (v.size || 32) + 'px/1.15 ' + (v.face === 'hand' ? T.hand : v.face === 'pixel' ? T.pixel : T.head), fontWeight: v.weight || 400, color: T.ink } }, v.sample), h('div', { style: { marginTop: 4 } }, Pix(v.name + ' · ' + noq(v.use))))
      }),
      H3('the rules'),
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
        h('div', null, Hand('always', 18, T.pickle), arr(s.dos).map(function (d, i) { return h('div', { key: i, style: { display: 'flex', gap: 8, font: '15px/1.5 ' + T.head, color: T.ink2, margin: '4px 0' } }, Mark('kept'), d) })),
        h('div', null, Hand('never', 18, T.ember), arr(s.donts).map(function (d, i) { return h('div', { key: i, style: { display: 'flex', gap: 8, font: '15px/1.5 ' + T.head, color: T.ink2, margin: '4px 0' } }, Mark('dropped'), d) }))),
      arr(s.images).length ? h('div', null, H3('materials, cast and pages'), Thumbs(s.images)) : null)
  }

  var Threads = function () {
    var open = entries.filter(function (e) { return e.status === 'open' })
    return h('div', null,
      Hand('some ideas are unfinished. Here they are, so I don’t lose them.', 20, T.blicky, { marginBottom: 10 }),
      arr(data && data.threads).concat(open).map(function (t, i) {
        return h('label', { key: i, style: { display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, padding: '10px 0', borderBottom: '1px dashed ' + T.rule, cursor: 'pointer' } },
          h('input', { type: 'checkbox', style: { width: 20, height: 20, marginTop: 3, accentColor: T.pickle } }),
          h('span', null, h('span', { style: { font: '600 16px ' + T.head, color: T.ink } }, t.head ? noq(t.head) : noq(t.title)), Hand(t.note ? noq(t.note) : noq(t.body), 16, T.ink2), t.id && byId[t.id] ? h('button', { onClick: function () { openPage(t.id) }, style: { font: '14px ' + T.hand, color: T.blicky, background: 'none', border: 'none', padding: 0, cursor: 'pointer' } }, 'open the page →') : (t.lane ? Pix(t.lane) : null)))
      }))
  }

  var Pictures = function () {
    var pics = []
    entries.forEach(function (e) { arr(e.images).forEach(function (p) { pics.push({ p: p, title: headOf(e), id: e.id, at: e.at }) }) })
    arr(data && data.images).forEach(function (im) { if (!pics.some(function (x) { return x.p === im.path })) pics.push({ p: im.path, title: noq(im.caption), at: im.at }) })
    return h('div', { style: { columns: '3 260px', columnGap: 14 } }, pics.map(function (x, i) {
      return h('figure', { key: i, style: { breakInside: 'avoid', margin: '0 0 14px', background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 10, padding: 8 } },
        h('img', { src: src(x.p), loading: 'lazy', onClick: function () { setZoom(x.p) }, style: { width: '100%', borderRadius: 6, cursor: 'zoom-in', display: 'block' } }),
        h('figcaption', { onClick: x.id ? function () { openPage(x.id) } : undefined, style: { font: '15px/1.35 ' + T.hand, color: x.id ? T.blicky : T.ink2, marginTop: 6, cursor: x.id ? 'pointer' : 'default' } }, x.title), x.at ? Pix(String(x.at).replace('T', ' ')) : null)
    }))
  }

  var About = function () {
    var a = (data && data.about) || {}
    return h('div', { style: { maxWidth: 780 } },
      a.lede ? Hand(noq(a.lede), 24, T.pickle, { marginBottom: 12 }) : null,
      arr(a.paragraphs).map(function (p, i) { return Hand(noq(p), 18, T.ink2, { key: i, marginBottom: 10 }) }),
      arr(a.ask).length ? h('div', { style: { marginTop: 18 } }, Hand('ask Mana about it', 22, T.blicky),
        h('div', { style: { font: '14px/1.5 ' + T.head, color: T.mute, margin: '4px 0 6px' } }, 'All of this is data in this Mana space, so Mana’s own agent can read it. Try:'),
        arr(a.ask).map(function (x, i) { return Hand('→ ' + noq(x), 17, T.ink, { key: i, margin: '4px 0' }) })) : null,
      arr(a.links).length ? h('div', { style: { marginTop: 18 } }, Hand('everything we made, linked', 22, T.pickle),
        h('div', { style: { display: 'grid', gap: 6, marginTop: 6 } }, arr(a.links).map(function (l, i) {
          return h('a', { key: i, href: l.url, target: '_blank', rel: 'noreferrer', style: { font: '600 15px ' + T.head, color: T.blicky, textDecoration: 'underline', textDecorationColor: T.dot } }, l.label + ' ↗', l.note ? h('span', { style: { font: '400 13px ' + T.head, color: T.mute, marginLeft: 8, textDecoration: 'none' } }, l.note) : null)
        }))) : null,
      arr(a.counts).length ? Numbers(a.counts) : null,
      a.sources ? h('div', { style: { marginTop: 14 } }, Pix(a.sources)) : null)
  }

  var body = !data ? Hand('opening the notebook…', 20, T.mute, { padding: 30 })
    : tab === 'notebook' ? Notebook() : tab === 'map' ? Map() : tab === 'specs' ? Specs() : tab === 'evalsets' ? EvalSets() : tab === 'sponsors' ? Sponsors()
    : tab === 'tests' ? Tests() : tab === 'howto' ? HowTo() : tab === 'style' ? Style() : tab === 'threads' ? Threads() : tab === 'pictures' ? Pictures() : About()

  return h('div', { style: { minHeight: '100%', background: T.ground, padding: '18px 12px 40px', boxSizing: 'border-box', color: T.ink } },
    h('style', null, "@import url('https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.css');" +
      "@font-face{font-family:'Fairfax HD';src:url('" + FONT + "FairfaxHD.woff2') format('woff2');font-display:swap}" +
      "@font-face{font-family:'Geist Pixel Square';src:url('" + FONT + "GeistPixel-Square.woff2') format('woff2');font-display:swap}"),
    h('div', { style: { maxWidth: 1100, margin: '0 auto', position: 'relative' } },
      h('div', { style: { height: 54, borderRadius: '16px 16px 0 0', background: T.felt, backgroundImage: 'repeating-linear-gradient(45deg, oklch(100% 0 0 / .035) 0 2px, transparent 2px 5px)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14 } },
        h('span', { style: { font: '800 22px ' + T.head, color: 'oklch(97.5% 0.002 196)', letterSpacing: '-0.02em' } }, 'pickje'),
        h('span', { style: { font: '17px ' + T.hand, color: T.moss } }, 'the lab notebook · how it was made, Oct 20–25, 2026')),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 4, padding: '0 14px', background: T.felt } }, TABS.map(function (t) {
        var on = tab === t[0]
        return h('button', { key: t[0], onClick: function () { setPage(null); setTab(t[0]) }, style: { font: (on ? '600 ' : '500 ') + '14px ' + T.head, padding: '9px 13px', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', background: on ? T.paper : 'oklch(94% 0.031 240.8 / .9)', color: on ? T.ink : T.blicky, marginTop: on ? 0 : 4 } }, t[1])
      })),
      h('div', { style: { background: T.paper, backgroundImage: 'radial-gradient(circle, ' + T.dot + ' 1px, transparent 1.4px)', backgroundSize: '18px 18px', borderRadius: '0 0 16px 16px', padding: '22px 26px 30px', boxShadow: 'inset 0 0 0 1.5px ' + T.rule + ', 0 3px 0 oklch(30% 0.01 230 / .14)' } }, body)),
    page ? Page() : null,
    zoom ? h('div', { onClick: function () { setZoom(null) }, style: { position: 'fixed', inset: 0, background: 'oklch(18% 0 0 / .82)', display: 'grid', placeItems: 'center', zIndex: 60, cursor: 'zoom-out', padding: 24 } },
      h('img', { src: src(zoom), style: { maxWidth: '96%', maxHeight: '92%', borderRadius: 10, background: T.paper } })) : null)
}
