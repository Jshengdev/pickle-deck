// mana/app.js: "pickje · the lab notebook", a Mana app (a user_div node at file-system/pickje/notebook).
// Mana compiles this with React, FS (FS.db, FS.ref, FS.onValue) and ownerId in scope and returns UserDiv (the same scope
// pickje's idea-log viewer uses, app/mana/viewer.js in the pickje repo). Plain React.createElement, no JSX, no packages.
// The notebook's data sits in the same node as children (entries, tracks, runs, checks, images, style, threads, about), so
// Mana's own agent can read the whole build as memory. The look follows the brand book: Pretendard for heads, Fairfax HD
// for the handwritten voice, Geist Pixel for counts; forest-green ink for Pickle, sky-blue ink for Blicky; paper with a dot
// grid, a felt strip; no blur shadows, no beige. His ask (2026-10-25, about 6 AM): "Treat it as if it has been hand
// written. So use a lot of quotes. Some ideas can be unfinished".
function UserDiv(props) {
  var h = React.createElement
  var ASSET = 'https://raw.githubusercontent.com/Jshengdev/pickle-deck/main/mana/'
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
  var LANES = [['all', 'Everything'], ['ideation', 'Where it began'], ['product', 'The build'], ['design', 'The look'], ['sponsors', 'Sponsors'], ['evals', 'Testing'], ['deck', 'The pitch'], ['process', 'How we worked']]
  var STATUS = { kept: ['kept', T.pickle], dropped: ['dropped', T.ember], revised: ['revised', T.blicky], declined: ['declined', T.mute], open: ['open', T.ink2] }
  var KIND = { question: 'Q', tried: 'tried', result: 'result', decision: 'decided', note: 'note', quote: 'his words', milestone: 'milestone' }
  var TABS = [['notebook', 'Notebook'], ['sponsors', 'Sponsors'], ['tests', 'Tests'], ['style', 'Style book'], ['threads', 'Open threads'], ['pictures', 'Pictures'], ['about', 'About']]

  var st = React.useState(props && props.data ? props.data : null), data = st[0], setData = st[1]
  var tb = React.useState('notebook'), tab = tb[0], setTab = tb[1]
  var ln = React.useState('all'), lane = ln[0], setLane = ln[1]
  var sf = React.useState('any'), statusF = sf[0], setStatusF = sf[1]
  var qq = React.useState(''), q = qq[0], setQ = qq[1]
  var zz = React.useState(null), zoom = zz[0], setZoom = zz[1]
  var cc = React.useState(''), copied = cc[0], setCopied = cc[1]
  var oc = React.useState({}), opened = oc[0], setOpened = oc[1]

  React.useEffect(function () {
    if (props && props.data) return
    var base = null
    if (typeof relPathAddress === 'function') { try { base = relPathAddress() } catch (e) { base = null } }
    if (!base && typeof ownerId === 'string' && ownerId) base = ownerId + '/file-system/pickje/notebook'
    if (!base || typeof FS === 'undefined' || !FS || !FS.db) return
    var off = FS.onValue(FS.ref(FS.db, base), function (snap) { setData(snap && snap.val ? snap.val() : null) })
    return function () { if (typeof off === 'function') off() }
  }, [])

  var src = function (p) { return /^https?:/.test(p) ? p : ((props && props.assetBase) || ASSET) + p }
  var vals = function (o) { return o ? Object.keys(o).map(function (k) { return o[k] }) : [] }
  var copy = function (txt) { try { navigator.clipboard.writeText(txt); setCopied(txt); setTimeout(function () { setCopied('') }, 1200) } catch (e) {} }

  // ── small drawn things: hand-ink marks, like Blicky's ──
  var Mark = function (status) {
    var c = (STATUS[status] || [0, T.ink2])[1]
    var p = { kept: 'M3 11 L8 16 L19 4', dropped: 'M3 4 L19 18 M19 4 L3 18', revised: 'M3 13 C7 3, 14 3, 18 10 M18 10 L14 9 M18 10 L18 6', declined: 'M3 11 L19 11', open: 'M7 6 C7 1, 16 1, 15 7 C14 10, 11 10, 11 14 M11 18 L11 19' }[status]
    return p ? h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', style: { flex: 'none' } }, h('path', { d: p, fill: 'none', stroke: c, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' })) : null
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
  var Quote = function (qt, big) {
    if (!qt || !qt.text) return null
    return h('blockquote', { style: { margin: '10px 0 6px', padding: '2px 0 2px 14px', borderLeft: '3px solid ' + T.blicky } },
      h('div', { style: { font: (big ? 22 : 18) + 'px/1.35 ' + T.hand, color: T.blicky, whiteSpace: 'pre-wrap' } }, '“' + qt.text + '”'),
      (qt.when || qt.source) ? h('div', { style: { marginTop: 4 } }, Pix([qt.when, qt.source].filter(Boolean).join(' · '))) : null)
  }
  var Numbers = function (ns) {
    if (!ns || !ns.length) return null
    return h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, margin: '10px 0 4px' } }, ns.map(function (n, i) {
      return h('div', { key: i, title: n.source || '', style: { border: '1.5px solid ' + T.rule, borderRadius: 10, padding: '6px 10px', background: T.paper } },
        h('div', { style: { font: '18px ' + T.pixel, color: T.ink } }, n.value), h('div', { style: { font: '12px/1.3 ' + T.head, color: T.mute, maxWidth: 220 } }, n.label))
    }))
  }
  var Thumbs = function (imgs) {
    if (!imgs || !imgs.length) return null
    return h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10, margin: '10px 0 4px' } }, imgs.map(function (p, i) {
      return h('img', { key: i, src: src(p), loading: 'lazy', onClick: function () { setZoom(p) }, style: { width: imgs.length === 1 ? 'min(100%, 520px)' : 220, borderRadius: 8, border: '1.5px solid ' + T.rule, cursor: 'zoom-in', background: T.ground, transform: 'rotate(' + ((i % 3) - 1) * 0.6 + 'deg)' } })
    }))
  }

  // ── the notebook ──
  var entries = vals(data && data.entries).sort(function (a, b) { return String(a.at).localeCompare(String(b.at)) })
  var matches = function (e) {
    if (lane !== 'all' && e.lane !== lane) return false
    if (statusF !== 'any' && e.status !== statusF) return false
    if (q) { var s = (e.title + ' ' + (e.body || '') + ' ' + (e.quote && e.quote.text || '')).toLowerCase(); if (s.indexOf(q.toLowerCase()) < 0) return false }
    return true
  }
  var dayName = function (at) {
    var d = String(at || '').slice(0, 10)
    var names = { '2026-10-20': 'Tuesday, Oct 20', '2026-10-21': 'Wednesday, Oct 21', '2026-10-22': 'Thursday, Oct 22', '2026-10-23': 'Friday, Oct 23', '2026-10-24': 'Saturday, Oct 24', '2026-10-25': 'Sunday, Oct 25' }
    return names[d] || d || 'undated'
  }
  var Entry = function (e) {
    var s = STATUS[e.status]
    return h('div', { key: e.id, id: 'e-' + e.id, style: { display: 'grid', gridTemplateColumns: '64px 1fr', gap: 14, padding: '14px 0', borderBottom: '1px dashed ' + T.rule } },
      h('div', { style: { paddingTop: 3 } }, Pix(String(e.at || '').slice(11, 16) || '·'), h('div', { style: { marginTop: 6 } }, Mark(e.status))),
      h('div', null,
        h('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 10 } },
          h('span', { style: { font: '11px ' + T.pixel, textTransform: 'uppercase', color: T.mute, border: '1px solid ' + T.rule, borderRadius: 4, padding: '1px 5px' } }, KIND[e.kind] || e.kind || 'note'),
          h('span', { style: { font: '700 17px/1.3 ' + T.head, color: T.ink, textDecoration: e.status === 'dropped' ? 'line-through' : 'none', textDecorationColor: T.ember, textDecorationThickness: 2 } }, e.title),
          s ? h('span', { style: { font: '15px ' + T.hand, color: s[1] } }, '— ' + s[0]) : null),
        Quote(e.quote),
        e.body ? h('div', { style: { font: '15px/1.55 ' + T.head, color: T.ink2, marginTop: 6, whiteSpace: 'pre-wrap' } }, e.body) : null,
        Numbers(e.numbers), Thumbs(e.images),
        e.sources && e.sources.length ? h('div', { style: { marginTop: 6 } }, Pix('from ' + e.sources.join(' · '))) : null))
  }
  var Notebook = function () {
    var pinIds = vals(data && data.pins), byId = {}
    entries.forEach(function (e) { byId[e.id] = e })
    var pins = pinIds.map(function (id) { return byId[id] }).filter(Boolean)
    var shown = entries.filter(matches), days = []
    shown.forEach(function (e) { var d = dayName(e.at); if (!days.length || days[days.length - 1][0] !== d) days.push([d, []]); days[days.length - 1][1].push(e) })
    var counts = {}; entries.forEach(function (e) { counts[e.status || 'none'] = (counts[e.status || 'none'] || 0) + 1 })
    return h('div', null,
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 } }, LANES.map(function (l) { return h('span', { key: l[0] }, Chip(l[1], lane === l[0], function () { setLane(l[0]) })) })),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 16 } },
        [['any', 'any outcome']].concat(Object.keys(STATUS).map(function (k) { return [k, STATUS[k][0] + ' (' + (counts[k] || 0) + ')'] })).map(function (s) { return h('span', { key: s[0] }, Chip(s[1], statusF === s[0], function () { setStatusF(s[0]) }, s[0] === 'any' ? null : STATUS[s[0]][1])) }),
        h('input', { value: q, onChange: function (ev) { setQ(ev.target.value) }, placeholder: 'search the notebook…', style: { marginLeft: 'auto', font: '15px ' + T.hand, padding: '7px 12px', border: '1.5px solid ' + T.rule, borderRadius: 999, background: T.paper, color: T.ink, minWidth: 220 } })),
      h('div', { style: { font: '14px ' + T.hand, color: T.mute, marginBottom: 8 } }, shown.length + ' of ' + entries.length + ' pages of notes'),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 } }, days.map(function (d) {
        return h('button', { key: d[0], onClick: function () { var el = document.getElementById('d-' + d[0]); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, style: { font: '15px ' + T.hand, color: T.pickle, background: T.mossSoft, border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' } }, d[0] + ' · ' + d[1].length)
      })),
      (lane === 'all' && statusF === 'any' && !q && pins.length) ? h('div', { style: { background: T.skySoft, borderRadius: 14, padding: '14px 18px', marginBottom: 18, transform: 'rotate(-0.3deg)' } },
        h('div', { style: { font: '22px ' + T.hand, color: T.blicky, marginBottom: 6 } }, 'start here: the pages to read first'),
        pins.map(function (e, i) {
          return h('div', { key: e.id, style: { display: 'flex', gap: 10, alignItems: 'baseline', margin: '5px 0' } }, Pix(String(i + 1)),
            h('a', { href: '#e-' + e.id, onClick: function (ev) { ev.preventDefault(); var el = document.getElementById('e-' + e.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, style: { font: '600 15px ' + T.head, color: T.ink, textDecoration: 'underline', textDecorationColor: T.dot, cursor: 'pointer' } }, e.title),
            Pix(dayName(e.at).split(',')[0] + ' ' + String(e.at || '').slice(11, 16)))
        })) : null,
      days.map(function (d) {
        return h('section', { key: d[0], id: 'd-' + d[0], style: { marginBottom: 26 } },
          h('h3', { style: { margin: '18px 0 4px', font: '26px ' + T.hand, color: T.pickle } }, Ring(d[0], T.pickle)),
          d[1].map(Entry))
      }))
  }

  // ── sponsors: the tradeoffs ──
  var Bar = function (label, v, max, color, unit) {
    var w = max > 0 ? Math.max(2, Math.round((v / max) * 100)) : 0
    return h('div', { style: { display: 'grid', gridTemplateColumns: '70px 1fr 170px', gap: 8, alignItems: 'center', margin: '3px 0' } },
      h('span', { style: { font: '13px ' + T.head, color: T.ink2 } }, label),
      h('div', { style: { height: 10, background: T.ground, borderRadius: 999 } }, h('div', { style: { width: w + '%', height: '100%', background: color, borderRadius: 999 } })),
      h('span', { style: { font: '13px ' + T.pixel, color: T.ink } }, v + (unit ? ' ' + unit : '')))
  }
  var num = function (x) { var m = String(x == null ? '' : x).replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN }
  var Sponsors = function () {
    var tracks = vals(data && data.tracks)
    var order = { used: 0, considered: 1, dropped: 2 }
    tracks.sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0) })
    return h('div', null,
      h('p', { style: { font: '20px/1.4 ' + T.hand, color: T.blicky, margin: '0 0 16px' } }, '“are these tradeoffs worth it by using the sponsorship? Are we actually getting a better result for what we are aiming for?”'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 } }, tracks.map(function (t, i) {
        var verdictColor = /^yes/i.test(t.verdict || '') ? T.pickle : /^no/i.test(t.verdict || '') ? T.ember : T.blicky
        return h('div', { key: i, style: { background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 14, padding: 16, boxShadow: '0 2px 0 oklch(30% 0.01 230 / .12)', opacity: t.status === 'dropped' ? 0.8 : 1 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' } },
            h('div', { style: { font: '700 22px ' + T.head, color: T.ink, textDecoration: t.status === 'dropped' ? 'line-through' : 'none', textDecorationColor: T.ember } }, t.name),
            Pix(t.status || '', t.status === 'used' ? T.pickle : T.mute)),
          t.track ? h('div', { style: { font: '13px/1.4 ' + T.head, color: T.mute, marginTop: 2 } }, t.track) : null,
          t.verdict ? h('div', { style: { marginTop: 10, padding: '10px 12px', borderRadius: 10, border: '2px solid ' + verdictColor, font: '17px/1.4 ' + T.hand, color: verdictColor } }, t.verdict) : null,
          t.role ? h('div', { style: { font: '15px/1.5 ' + T.head, color: T.ink2, marginTop: 10 } }, t.role) : null,
          Quote(t.quote),
          h('button', { onClick: function () { var o = Object.assign({}, opened); o[t.name] = !o[t.name]; setOpened(o) }, style: { marginTop: 8, font: '16px ' + T.hand, color: T.blicky, background: 'none', border: 'none', padding: 0, cursor: 'pointer' } }, opened[t.name] ? '↑ fold the plan and the numbers' : '↓ the plan, the numbers, what we didn’t pick'),
          !opened[t.name] ? null : h('div', null,
          t.plan ? h('div', { style: { font: '14px/1.5 ' + T.head, color: T.ink2, marginTop: 8 } }, h('b', null, 'The plan. '), t.plan) : null,
          (t.metrics || []).length ? h('div', { style: { marginTop: 10 } }, (t.metrics || []).map(function (m, j) {
            var a = num(m['with']), b = num(m.without), max = Math.max(a || 0, b || 0)
            return h('div', { key: j, title: (m.source || '') + (m.caveat ? ' · ' + m.caveat : ''), style: { marginBottom: 8 } },
              h('div', { style: { font: '600 13px ' + T.head, color: T.ink } }, m.label),
              !isNaN(a) ? Bar('with', a, max, T.pickle, m.unit) : h('div', { style: { font: '13px ' + T.head } }, 'with: ' + m['with']),
              !isNaN(b) ? Bar('without', b, max, T.dot, m.unit) : (m.without ? h('div', { style: { font: '13px ' + T.head, color: T.mute } }, 'without: ' + m.without) : null),
              m.caveat ? Pix(m.caveat) : null)
          })) : null,
          (t.alternatives || []).length ? h('div', { style: { marginTop: 8 } }, (t.alternatives || []).map(function (a, j) {
            return h('div', { key: j, style: { font: '14px/1.45 ' + T.head, color: T.ink2 } }, h('span', { style: { textDecoration: 'line-through', textDecorationColor: T.ember } }, a.option), ' — ', a['why not'] || a.why || '')
          })) : null,
          t.cost ? h('div', { style: { marginTop: 8, font: '13px/1.45 ' + T.head, color: T.mute } }, Object.keys(t.cost).map(function (k) { return h('div', { key: k }, h('b', null, k + ': '), String(t.cost[k])) })) : null))
      })))
  }

  // ── tests ──
  var Tests = function () {
    var runs = vals(data && data.runs).sort(function (a, b) { return String(a.at).localeCompare(String(b.at)) })
    var checks = vals(data && data.checks)
    var pct = function (r) { return r && r.den ? Math.round((r.num / r.den) * 100) : null }
    var kinds = {}; runs.forEach(function (r) { Object.keys(r.by_kind || {}).forEach(function (k) { kinds[k] = 1 }) })
    return h('div', null,
      h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '0 0 8px' } }, Ring('The live exam, run by run', T.pickle)),
      h('div', { style: { font: '15px/1.5 ' + T.head, color: T.ink2, marginBottom: 12 } }, 'It drives the real app on the real screen, and a strict judge grades every step against the demo’s rubric. The bar: 80% over two runs, no reveal slips.'),
      h('div', { style: { position: 'relative', background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 14, padding: '16px 16px 8px' } },
        h('div', { style: { position: 'absolute', left: 'calc(180px + (100% - 290px) * 0.8)', top: 8, bottom: 8, borderLeft: '2px dashed ' + T.ember } }),
        runs.map(function (r, i) {
          var p = pct(r.pass_rate)
          return h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '170px 1fr 90px', gap: 10, alignItems: 'center', margin: '8px 0' } },
            h('div', null, h('div', { style: { font: '600 14px ' + T.head } }, r.what || r.id), Pix(String(r.at || '').replace('T', ' '))),
            h('div', { style: { height: 14, background: T.ground, borderRadius: 999 } }, h('div', { style: { width: (p || 0) + '%', height: '100%', borderRadius: 999, background: i === runs.length - 1 ? T.pickle : T.dot } })),
            h('div', { style: { font: '16px ' + T.pixel } }, p == null ? '–' : p + '%', h('div', null, Pix(r.pass_rate ? r.pass_rate.num + '/' + r.pass_rate.den : ''))))
        }),
        h('div', { style: { textAlign: 'right' } }, Pix('dashed line: the 80% pass bar', T.ember))),
      Object.keys(kinds).length ? h('div', { style: { marginTop: 18 } },
        h('h3', { style: { font: '22px ' + T.hand, color: T.blicky, margin: '0 0 8px' } }, 'By kind of criterion'),
        Object.keys(kinds).map(function (k) {
          return h('div', { key: k, style: { margin: '6px 0' } }, h('div', { style: { font: '600 14px ' + T.head } }, k),
            runs.map(function (r, i) { var x = (r.by_kind || {})[k]; return x ? h('div', { key: i }, Bar(r.id, pct(x), 100, i === runs.length - 1 ? T.pickle : T.dot, '%  ' + x.num + '/' + x.den)) : null }))
        })) : null,
      runs.map(function (r, i) { return (r.caveats || []).length ? h('div', { key: 'c' + i, style: { marginTop: 10, font: '14px/1.5 ' + T.head, color: T.mute } }, h('b', null, (r.what || r.id) + ': '), r.caveats.join(' · ')) : null }),
      checks.length ? h('div', { style: { marginTop: 22 } },
        h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '0 0 8px' } }, Ring('Every check we built', T.pickle)),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 } }, checks.map(function (c, i) {
          return h('div', { key: i, style: { background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 12, padding: 12 } },
            h('div', { style: { font: '700 15px ' + T.head } }, c.name), h('div', { style: { font: '14px/1.45 ' + T.head, color: T.ink2, marginTop: 4 } }, c['what it proves'] || c.what),
            c.result ? h('div', { style: { font: '16px/1.35 ' + T.hand, color: T.pickle, marginTop: 6 } }, c.result) : null, c.source ? Pix(c.source) : null)
        }))) : null)
  }

  // ── the style book ──
  var Style = function () {
    var s = (data && data.style) || {}
    return h('div', null,
      Quote(s.quote, true),
      h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '16px 0 8px' } }, Ring('Colour: the palette', T.pickle)),
      h('div', { style: { font: '14px ' + T.head, color: T.mute, marginBottom: 8 } }, 'Click a swatch to copy its value. ' + (copied ? 'Copied ' + copied : '')),
      vals(s.ramps).map(function (r, i) {
        return h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '90px repeat(11, 1fr)', gap: 4, alignItems: 'center', margin: '4px 0' } },
          h('span', { style: { font: '600 13px ' + T.head } }, r.name),
          (r.steps || []).map(function (st, j) {
            return h('button', { key: j, title: st.name + ' · ' + st.oklch + ' · ' + st.hex, onClick: function () { copy(st.hex) }, style: { height: 38, border: 'none', borderRadius: 6, background: st.oklch, cursor: 'copy', font: '10px ' + T.pixel, color: j > 5 ? T.paper : T.ink, padding: 0 } }, st.step)
          }))
      }),
      h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '22px 0 8px' } }, 'Colour: the roles'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 } }, vals(s.roles).map(function (r, i) {
        return h('button', { key: i, onClick: function () { copy('var(--' + r.name + ')') }, style: { display: 'flex', gap: 10, alignItems: 'center', textAlign: 'left', background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 10, padding: 8, cursor: 'copy' } },
          h('span', { style: { width: 34, height: 34, borderRadius: 8, background: r.value, border: '1px solid ' + T.rule, flex: 'none' } }),
          h('span', null, h('div', { style: { font: '600 13px ' + T.head } }, '--' + r.name), Pix(r.from)))
      })),
      h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '22px 0 8px' } }, 'Type: three voices'),
      vals(s.voices).map(function (v, i) {
        return h('div', { key: i, style: { borderTop: '1px dashed ' + T.rule, padding: '12px 0' } },
          h('div', { style: { font: (v.size || 32) + 'px/1.15 ' + (v.face === 'hand' ? T.hand : v.face === 'pixel' ? T.pixel : T.head), fontWeight: v.weight || 400, color: T.ink } }, v.sample),
          h('div', { style: { marginTop: 4 } }, Pix(v.name + ' · ' + v.use)))
      }),
      h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '22px 0 8px' } }, 'The rules'),
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
        h('div', null, h('div', { style: { font: '18px ' + T.hand, color: T.pickle } }, 'always'), (s.dos || []).map(function (d, i) { return h('div', { key: i, style: { display: 'flex', gap: 8, font: '15px/1.5 ' + T.head, color: T.ink2, margin: '4px 0' } }, Mark('kept'), d) })),
        h('div', null, h('div', { style: { font: '18px ' + T.hand, color: T.ember } }, 'never'), (s.donts || []).map(function (d, i) { return h('div', { key: i, style: { display: 'flex', gap: 8, font: '15px/1.5 ' + T.head, color: T.ink2, margin: '4px 0' } }, Mark('dropped'), d) }))),
      (s.images || []).length ? h('div', null, h('h3', { style: { font: '24px ' + T.hand, color: T.pickle, margin: '22px 0 8px' } }, 'Materials, cast and pages'), Thumbs(s.images)) : null)
  }

  // ── open threads: the unfinished ideas ──
  var Threads = function () {
    var open = entries.filter(function (e) { return e.status === 'open' })
    var extra = vals(data && data.threads)
    return h('div', null,
      h('p', { style: { font: '20px/1.4 ' + T.hand, color: T.blicky, margin: '0 0 12px' } }, '“Some ideas can be unfinished”'),
      extra.concat(open).map(function (t, i) {
        return h('label', { key: i, style: { display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, padding: '10px 0', borderBottom: '1px dashed ' + T.rule, cursor: 'pointer' } },
          h('input', { type: 'checkbox', style: { width: 20, height: 20, marginTop: 3, accentColor: T.pickle } }),
          h('span', null, h('span', { style: { font: '600 16px ' + T.head, color: T.ink } }, t.title), t.body ? h('div', { style: { font: '15px/1.5 ' + T.head, color: T.ink2 } }, t.body) : null, Quote(t.quote), t.lane ? Pix(t.lane) : null))
      }))
  }

  // ── pictures ──
  var Pictures = function () {
    var pics = []
    entries.forEach(function (e) { (e.images || []).forEach(function (p) { pics.push({ p: p, title: e.title, id: e.id, at: e.at }) }) })
    vals(data && data.images).forEach(function (im) { if (!pics.some(function (x) { return x.p === im.path })) pics.push({ p: im.path, title: im.caption, at: im.at }) })
    return h('div', { style: { columns: '3 260px', columnGap: 14 } }, pics.map(function (x, i) {
      return h('figure', { key: i, style: { breakInside: 'avoid', margin: '0 0 14px', background: T.paper, border: '1.5px solid ' + T.rule, borderRadius: 10, padding: 8 } },
        h('img', { src: src(x.p), loading: 'lazy', onClick: function () { setZoom(x.p) }, style: { width: '100%', borderRadius: 6, cursor: 'zoom-in', display: 'block' } }),
        h('figcaption', { style: { font: '15px/1.35 ' + T.hand, color: T.ink2, marginTop: 6 } }, x.title), x.at ? Pix(String(x.at).replace('T', ' ')) : null)
    }))
  }

  // ── about ──
  var About = function () {
    var a = (data && data.about) || {}
    return h('div', { style: { maxWidth: 760 } },
      a.lede ? h('p', { style: { font: '24px/1.4 ' + T.hand, color: T.pickle, margin: '0 0 12px' } }, a.lede) : null,
      (a.paragraphs || []).map(function (p, i) { return h('p', { key: i, style: { font: '16px/1.6 ' + T.head, color: T.ink2 } }, p) }),
      (a.ask || []).length ? h('div', { style: { marginTop: 18 } }, h('h3', { style: { font: '22px ' + T.hand, color: T.blicky, margin: '0 0 6px' } }, 'Ask Mana about it'),
        h('div', { style: { font: '14px/1.5 ' + T.head, color: T.mute, marginBottom: 6 } }, 'Everything here is data in this Mana space, so Mana’s own agent can read it. Try:'),
        a.ask.map(function (x, i) { return h('div', { key: i, style: { font: '16px/1.5 ' + T.hand, color: T.ink, margin: '4px 0' } }, '→ ' + x) })) : null,
      (a.counts || []).length ? Numbers(a.counts) : null,
      a.sources ? h('div', { style: { marginTop: 14 } }, Pix(a.sources)) : null)
  }

  var body = !data ? h('div', { style: { font: '20px ' + T.hand, color: T.mute, padding: 30 } }, 'opening the notebook…')
    : tab === 'notebook' ? Notebook() : tab === 'sponsors' ? Sponsors() : tab === 'tests' ? Tests() : tab === 'style' ? Style() : tab === 'threads' ? Threads() : tab === 'pictures' ? Pictures() : About()

  return h('div', { style: { minHeight: '100%', background: T.ground, padding: '18px 12px 40px', boxSizing: 'border-box', color: T.ink } },
    h('style', null, "@import url('https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.css');" +
      "@font-face{font-family:'Fairfax HD';src:url('" + FONT + "FairfaxHD.woff2') format('woff2');font-display:swap}" +
      "@font-face{font-family:'Geist Pixel Square';src:url('" + FONT + "GeistPixel-Square.woff2') format('woff2');font-display:swap}"),
    h('div', { style: { maxWidth: 1080, margin: '0 auto', position: 'relative' } },
      // the felt strip and the tabs, like Pickle's notepad
      h('div', { style: { height: 54, borderRadius: '16px 16px 0 0', background: T.felt, backgroundImage: 'repeating-linear-gradient(45deg, oklch(100% 0 0 / .035) 0 2px, transparent 2px 5px)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14 } },
        h('span', { style: { font: '800 22px ' + T.head, color: 'oklch(97.5% 0.002 196)', letterSpacing: '-0.02em' } }, 'pickje'),
        h('span', { style: { font: '17px ' + T.hand, color: T.moss } }, 'the lab notebook · how it was made, Oct 20–25, 2026')),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 4, padding: '0 14px', background: T.felt } }, TABS.map(function (t) {
        var on = tab === t[0]
        return h('button', { key: t[0], onClick: function () { setTab(t[0]) }, style: { font: (on ? '600 ' : '500 ') + '14px ' + T.head, padding: '9px 14px', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', background: on ? T.paper : 'oklch(94% 0.031 240.8 / .9)', color: on ? T.ink : T.blicky, marginTop: on ? 0 : 4 } }, t[1])
      })),
      h('div', { style: { background: T.paper, backgroundImage: 'radial-gradient(circle, ' + T.dot + ' 1px, transparent 1.4px)', backgroundSize: '18px 18px', borderRadius: '0 0 16px 16px', padding: '22px 26px 30px', boxShadow: 'inset 0 0 0 1.5px ' + T.rule + ', 0 3px 0 oklch(30% 0.01 230 / .14)' } }, body)),
    zoom ? h('div', { onClick: function () { setZoom(null) }, style: { position: 'fixed', inset: 0, background: 'oklch(18% 0 0 / .82)', display: 'grid', placeItems: 'center', zIndex: 50, cursor: 'zoom-out', padding: 24 } },
      h('img', { src: src(zoom), style: { maxWidth: '96%', maxHeight: '92%', borderRadius: 10, background: T.paper } })) : null)
}
