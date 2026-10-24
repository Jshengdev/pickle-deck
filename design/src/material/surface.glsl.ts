/** The surface shader: three materials (metal, felt, moss), one interface (his words 2026-10-24: "metalic and felt like combine color and
    texture into a clean interface"; UG: chrome tools, cushion moss, flocked felt). The texture never brings its own colour:
    every material is coloured by a token role in OKLCH, and the scan or noise only moves lightness, hue and saturation per
    particle. Softness is still grain: shadows are particles thinning out, never a blur. */
export const VERT = `#version 300 es
in vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`

export const FRAG = `#version 300 es
precision highp float;
out vec4 frag;
uniform vec2 uRes; uniform float uDpr; uniform int uMat;         // 0 felt / flock, 1 moss, 2 metal
uniform vec2 uCenter; uniform vec2 uSize; uniform float uRadius; uniform int uShape; uniform float uSeed;
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;              // OKLCH: felt base | moss body, tip, crevice | metal light, dark, env
uniform float uLight; uniform float uNoise; uniform float uScale; uniform float uSheen; uniform float uFringe;
uniform float uHueJ; uniform float uSatJ; uniform float uInset; uniform float uShadow; uniform float uSpread;
uniform float uCushion; uniform float uBrushed; uniform float uSpecks; uniform float uBevel;
uniform sampler2D uTexH; uniform sampler2D uTexN; uniform sampler2D uTex2;
uniform vec3 uP; uniform vec3 uW; uniform vec3 uY; uniform vec3 uBl; uniform float uBloom; uniform float uBright; uniform float uDew;   // moss: petals, white petals, pollen
uniform vec3 uU; uniform float uSparse;                           // moss: the undertone that shows between shoots, and how sparse they get
uniform float uContrast; uniform float uDome;                     // metal: contrast, and 0 a flat plane → 1 a domed chrome object
uniform sampler2D uMask; uniform float uMaskPx; uniform float uRing;   // shapes: a mask (text, a drawing) and ring thickness

float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash2(vec2 p){ return vec2(hash(p), hash(p + 19.19)); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
vec3 oklabToLinear(vec3 c){
  float l_ = c.x + 0.3963377774*c.y + 0.2158037573*c.z, m_ = c.x - 0.1055613458*c.y - 0.0638541728*c.z, s_ = c.x - 0.0894841775*c.y - 1.2914855480*c.z;
  float l = l_*l_*l_, m = m_*m_*m_, s = s_*s_*s_;
  return vec3(4.0767416621*l - 3.3077115913*m + 0.2309699292*s, -1.2684380046*l + 2.6097574011*m - 0.3413193965*s, -0.0041960863*l - 0.7034186147*m + 1.7076147010*s);
}
vec3 toSrgb(vec3 x){ x = clamp(x, 0.0, 1.0); return mix(12.92*x, 1.055*pow(x, vec3(1.0/2.4)) - 0.055, step(0.0031308, x)); }
vec3 lab(vec3 lch){ float r = radians(lch.z); return vec3(lch.x, lch.y*cos(r), lch.y*sin(r)); }
vec3 lchOf(vec3 l){ return vec3(l.x, length(l.yz), degrees(atan(l.z, l.y))); }
vec3 rgbOf(vec3 lch){ return toSrgb(oklabToLinear(lab(lch))); }
float sdRoundRect(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }

// the shape, in CSS px around uCenter. 0 rounded rect · 1 cushion (rect pushed out by slow noise) · 2 ellipse · 3 ring ·
// 4 blob (an ellipse pushed out by noise) · 5 mask (any text or drawing, uploaded as a soft alpha and read as distance)
float sdEllipse(vec2 p, vec2 r){ float k = length(p / r); return (k - 1.0) * min(r.x, r.y); }
float shapeSd(vec2 p){
  vec2 h = uSize * 0.5; float m = min(h.x, h.y);
  if (uShape == 2) return sdEllipse(p, h);
  if (uShape == 3) return abs(sdEllipse(p, h - uRing * 0.5)) - uRing * 0.5;
  if (uShape == 4) return sdEllipse(p, h) - (fbm(p / (m * 0.55) + uSeed) - 0.5) * m * 0.45;
  if (uShape == 5) {
    vec2 uv = p / uSize + 0.5;
    if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1e3;
    float a = texture(uMask, uv).r;
    return (0.5 - a) * uMaskPx + (1.0 - smoothstep(0.0, 0.04, a)) * 80.0;   // far from the shape: far, so no shadow box
  }
  float d = sdRoundRect(p, h, uRadius);
  if (uShape == 1) d -= (fbm(p / 38.0 + uSeed) - 0.5) * m * 0.44;
  return d;
}
// per-particle colour: hue and saturation move a little (his rule: "guided by the saturation of the particle with slight
// adjustments to hue"), the hue cooler in shade and warmer in light
vec3 particle(vec3 lch, vec2 cell, float lit){
  float r1 = hash(cell + uSeed), r2 = hash(cell * 1.71 + 9.3);
  lch.y *= 1.0 + (r1 - 0.5) * uSatJ;
  lch.z += (r2 - 0.5) * 2.0 * uHueJ - (lit - 0.5) * uHueJ;
  return lch;
}

// One layer of loose fibres: in some cells of size cs, a short bent hair. Returns (coverage, shade, sd of its root).
// edge > 0: only roots near the shape's edge, combed outward so they spill over it.
vec3 fibres(vec2 px, float cs, float prob, float lenMin, float lenVar, float salt, float edge){
  float fib = 0.0, shade = 0.0, root = 1e5;
  vec2 c0 = floor(px / cs);
  vec2 toL = vec2(cos(radians(uLight)), sin(radians(uLight)));
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 id = c0 + vec2(x, y) + salt;
    if (hash(id * 1.37 + uSeed) > prob) continue;
    vec2 ctr = (id - salt + hash2(id * 2.3)) * cs;
    float sd = shapeSd(ctr - uCenter);
    float a = hash(id * 4.1) * 6.2832;
    if (edge > 0.0) {
      if (sd < -edge || sd > 0.5) continue;
      vec2 g = vec2(shapeSd(ctr - uCenter + vec2(1, 0)) - shapeSd(ctr - uCenter - vec2(1, 0)), shapeSd(ctr - uCenter + vec2(0, 1)) - shapeSd(ctr - uCenter - vec2(0, 1)));
      a = atan(g.y, g.x) + (hash(id * 3.3) - 0.5) * 1.8;
    }
    float len = lenMin + lenVar * hash(id * 6.7), bend = (hash(id * 8.9) - 0.5) * 0.6;
    vec2 dir = vec2(cos(a), sin(a)), rel = px - ctr;
    float u = dot(rel, dir), v = dot(rel, vec2(-dir.y, dir.x)) - bend * u * u / len;
    if (edge > 0.0 ? (u > -1.0 && u < len) : abs(u) < len) {
      float cov = 1.0 - smoothstep(0.15, 0.55, abs(v));
      if (cov > fib) { fib = cov; shade = dot(vec2(-dir.y, dir.x), toL) > 0.0 ? 1.0 : -1.0; root = sd; }
    }
  }
  return vec3(fib, shade, root);
}

void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;     // CSS px, y down
  vec2 p = px - uCenter;
  vec2 toLight = vec2(cos(radians(uLight)), sin(radians(uLight)));    // 225 = upper left (y down)
  vec3 L3 = normalize(vec3(toLight * 0.75, 0.66));
  float d = shapeSd(p);
  vec2 cell = floor(px * uDpr);                                        // one particle per device pixel
  vec4 col = vec4(0.0);

  float inside;
  vec3 c;
  if (uMat == 0) {                                     // ---- felt / flock: the tray lining (s03, s04) ----
    // His words: "make the noise feel liess like paper by giving its edges some texture that overfils the edge". So: two
    // samples of a 2K scan at different scales (no tiling, low contrast), a dense mat of fine fibres over it, a few loose
    // hairs, an edge that bulges past the line, and fibres combed out over the edge. The role gives the colour.
    vec2 ts = vec2(textureSize(uTexH, 0));
    vec2 uvA = px * uScale / ts;
    vec2 uvB = mat2(0.80, -0.60, 0.60, 0.80) * px * uScale * 0.43 / ts + 0.37;
    float h = mix(texture(uTexH, uvA).r, texture(uTexH, uvB).r, 0.35);
    vec3 nA = texture(uTexN, uvA).xyz * 2.0 - 1.0, nB = texture(uTexN, uvB).xyz * 2.0 - 1.0;
    vec3 n = mix(nA, nB, 0.35); n.y = -n.y; n.xy *= uNoise * 1.8; n = normalize(n);
    float diff = clamp(dot(n, L3), 0.0, 1.0);
    float lit = clamp(0.5 + dot(p / max(uSize, vec2(1.0)), toLight) * 0.6, 0.0, 1.0);
    vec3 fine = fibres(px, 4.0, 0.7 * min(uFringe, 1.0), 1.5, 3.0, 11.0, 0.0);                // the mat: dense, short, quiet
    vec3 loose = fibres(px, 10.0, 0.26 * uFringe, 3.0, 6.0, 0.0, 0.0);      // a few loose hairs on top
    vec3 out1 = fibres(px, 3.0, 0.85, 2.0, 3.5 * uFringe, 23.0, 3.0);       // combed over the edge
    vec3 lch = uA;
    lch.x += (h - 0.5) * uNoise * 0.12 + (diff - 0.78) * 0.2 + (lit - 0.5) * 0.04;
    lch.x += pow(1.0 - n.z, 1.6) * uSheen * 0.2;                         // velvet: fibres catch light at a glance
    lch.y *= 1.0 - pow(1.0 - n.z, 1.6) * uSheen * 0.3;
    lch.x += fine.x * fine.y * 0.035 + loose.x * loose.y * 0.05;
    lch.y *= 1.0 + fine.x * 0.08;
    if (hash(cell * 0.71 + 2.2) > 0.99975) lch.x -= 0.2;                 // a fleck of lint
    float dEdge = d - uFringe * (0.6 + 1.8 * vnoise(px * 0.45 + uSeed)); // the edge bulges past the line, unevenly
    float rimDark = smoothstep(-5.0, 0.0, dEdge);                          // the cut edge rolls away from the light
    lch.x -= rimDark * 0.06;
    if (uInset > 0.5) {                                                   // a sunken tray: the upper-left wall shades the felt
      float ds = shapeSd(p + toLight * uSpread * 0.5);
      float sh = smoothstep(-uSpread * 0.5, uSpread * 0.25, ds);
      lch.x -= sh * 0.1 * (0.55 + 0.45 * hash(cell * 1.3));
      float rim = smoothstep(-uSpread * 0.5, 0.0, shapeSd(p - toLight * uSpread * 0.5));
      lch.x += rim * 0.04;
    }
    float over = step(0.5, out1.x) * step(0.0, dEdge);                     // a fibre past the edge: a touch lighter, thinner colour
    if (over > 0.5) { lch.x += out1.y * 0.04 + 0.02; lch.y *= 0.85; }
    c = rgbOf(particle(lch, cell, lit));
    inside = max(step(dEdge, 0.0), max(step(0.5, out1.x), step(0.5, loose.x) * step(loose.z, 0.0) * step(d, 8.0)));
  } else if (uMat == 1) {                              // ---- moss: a cushion of tiny leaves (UG's sets, P04, P13) ----
    vec2 uv = px * uScale / 1024.0;
    float leaf = texture(uTexH, uv).r;
    float mat = texture(uTex2, uv * 0.37 + 0.21).r;
    // Moss is thousands of tiny shoots: each a small star of leaflets, lit on its upper-left side, packed tight with dark
    // gaps between them. Slow cushions decide where shoots stand tall (bright, big) or sink into a crevice (dark, small).
    // Each shoot is one particle: its hue and saturation move a little (his rule).
    float cellPx = max(uScale * 4.6, 2.0);
    vec2 g0 = floor(px / cellPx);
    float bestZ = -1.0, bestT = 0.0, bestLit = 0.0, bestCd = 1e5; vec2 bestId = vec2(0.0);
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 id = g0 + vec2(x, y);
      vec2 ctr = (id + 0.12 + 0.76 * hash2(id + uSeed)) * cellPx;
      vec2 rel = px - ctr; float r = length(rel);
      float cush = fbm(ctr / max(uCushion, 4.0) + uSeed);
      float hgtC = smoothstep(0.25, 0.75, cush);
      float leaves = 5.0 + floor(hash(id * 3.7) * 3.0);
      float rot = hash(id * 5.1) * 6.2832;
      float ang = atan(rel.y, rel.x);
      float R = cellPx * (0.7 + 0.42 * hgtC) * (0.34 + 0.66 * pow(abs(cos(leaves * 0.5 * (ang + rot))), 1.7));
      if (hash(id * 4.7 + 2.0) < (1.0 - hgtC) * uSparse) continue;        // sparse where the cushion is low: the undertone shows
      if (r < R) {
        float z = hgtC + hash(id * 9.3) * 0.35 + (1.0 - r / R) * 0.2;
        if (z > bestZ) { bestZ = z; bestT = r / R; bestId = id; bestCd = shapeSd(ctr - uCenter);
          bestLit = dot(rel / max(r, 0.001), toLight) * (r / R); }
      }
    }
    float found = step(0.0, bestZ);
    float hgt = clamp(0.24 + 0.34 * clamp(bestZ, 0.0, 1.2) + 0.3 * bestT + 0.26 * bestLit + 0.1 * (leaf - 0.5), 0.0, 1.0);
    vec3 la = hgt < 0.5 ? mix(lab(uC), lab(uA), hgt * 2.0) : mix(lab(uA), lab(uB), (hgt - 0.5) * 2.0);
    // the gaps show the undertone, not black; shade turns the hue greener instead of darker (his words: "adjust the hue to
    // be a little more greener to compensate for the shadows")
    vec3 under = uU; under.x += (vnoise(px * 0.08 + uSeed) - 0.5) * 0.08; under.z += (hash(cell * 0.3) - 0.5) * 8.0;
    vec3 lch = found > 0.5 ? lchOf(la) : under;
    if (found > 0.5) { float shade = 1.0 - clamp(hgt * 1.6, 0.0, 1.0); lch.z += shade * 14.0; lch.x = max(lch.x, 0.3 + 0.05 * shade); lch.y = max(lch.y, uA.y * 0.8); }
    if (found > 0.5) {                                                                     // tips stay saturated, lean yellow, catch light
      lch.y = max(lch.y, uA.y * (1.0 + 0.35 * bestT)); lch.z -= bestT * 7.0;
      lch.x = min(lch.x * uBright, 0.88);
      if (bestT < 0.35 && bestLit > -0.05 && hash(bestId * 7.7 + 1.3) > 1.0 - uDew * 0.012) { lch = vec3(0.97, 0.01, 110.0); }   // dew
    }
    float edge = smoothstep(0.0, 12.0, -bestCd);
    lch.z += (1.0 - edge) * 10.0; lch.x *= mix(0.9, 1.0, edge);           // the clump edge turns greener, not black
    vec2 pid = bestId;
    // small flowers sitting on the moss: five round petals, pink or white, a pollen centre, a soft grain shadow down-right
    float bCell = cellPx * 4.2;
    vec2 b0 = floor(px / bCell);
    float bloomHit = 0.0, bloomShade = 0.0; vec3 bloomCol = vec3(0.0); float bloomCd = 1e5;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 id = b0 + vec2(x, y);
      float patchy = smoothstep(0.42, 0.72, fbm(id * bCell / max(uCushion * 3.0, 8.0) + uSeed * 0.37 + 4.0));   // flowers grow in patches
      if (hash(id * 3.31 + uSeed * 1.7) > uBloom * (0.05 + 3.2 * patchy)) continue;
      vec2 ctr = (id + 0.2 + 0.6 * hash2(id * 5.5 + uSeed)) * bCell;
      float cd = shapeSd(ctr - uCenter);
      if (cd > -6.0) continue;                                                             // flowers grow inside the clump
      float sz = hash(id * 2.2); float Rb = cellPx * (0.55 + 1.15 * sz * sz);           // sizes vary: many small, a few big
      vec2 rel = px - ctr; float r = length(rel), ang = atan(rel.y, rel.x), rot = hash(id * 9.1) * 6.2832;
      float Rp = Rb * (0.55 + 0.45 * pow(abs(cos(2.5 * (ang + rot))), 0.7));
      vec2 relS = rel - toLight * -1.6;                                                    // its shadow, offset away from the light
      if (length(relS) < Rb * 0.95) bloomShade = max(bloomShade, 1.0);
      if (r < Rp) {
        float t = r / Rp;
        float kind = hash(floor(id / 3.0) * 7.3 + uSeed);                                   // one kind per little patch, mostly
        if (hash(id * 4.4) < 0.25) kind = hash(id * 4.9);
        vec3 pc = kind < 0.45 ? uP : kind < 0.72 ? uBl : uW;                                // pink, blue, white
        if (r < Rb * 0.26) pc = uY;                                                        // the pollen centre
        pc.x += dot(rel / max(r, 0.001), toLight) * 0.05 * t - (1.0 - t) * 0.06;         // cupped petals, lit upper left
        pc.y *= 0.9 + 0.2 * t;
        bloomHit = 1.0; bloomCol = pc; pid = id * 13.0; bloomCd = cd;
      }
    }
    if (bloomHit > 0.5) { lch = bloomCol; found = 1.0; }
    else if (bloomShade > 0.5) lch.x *= 0.82;
    c = rgbOf(particle(lch, pid, 0.5 + 0.5 * bestLit));
    float ins = found > 0.5 ? step(min(bestCd, bloomCd) + (hash(bestId * 2.9) - 0.5) * uFringe * 2.0, 0.0) : step(d + uFringe, 0.0);
    inside = bloomHit > 0.5 ? 1.0 : ins;
  } else if (uMat == 2) {                              // ---- metal: brushed planes and chrome objects (UG's tools) ----
    vec2 g = vec2(shapeSd(p + vec2(1, 0)) - shapeSd(p - vec2(1, 0)), shapeSd(p + vec2(0, 1)) - shapeSd(p - vec2(0, 1)));
    vec2 gn = normalize(g + 1e-5);
    float side = dot(gn, toLight);                                         // which way this edge faces the light
    // the surface normal: flat in the middle, rolling over at the edge; uDome widens the roll into a pebble or a coin
    float roll = max(2.5, uDome * min(uSize.x, uSize.y) * 0.32 + 2.5);
    float e = clamp(-d / roll, 0.0, 1.0);
    vec3 n = normalize(vec3(gn * (1.0 - e) * (1.0 - e) * 1.4, 1.0));
    // environment: bright sky above, the sage horizon, the dark ground below; the chrome reflects it by the normal's tilt
    float tilt = clamp(0.5 - dot(p / max(uSize, vec2(1.0)), toLight) * 0.9, 0.0, 1.0);
    float ry = clamp(tilt + (n.x * toLight.x + n.y * toLight.y) * -0.9 * uDome, 0.0, 1.0);
    vec3 la = mix(lab(uA), lab(uB), smoothstep(0.0, 1.0, ry));
    float band = smoothstep(0.48, 0.58, ry) * (1.0 - smoothstep(0.58, 0.9, ry));
    la = mix(la, lab(uC), band * (0.22 + 0.35 * uDome) * uSheen);
    vec3 lch = lchOf(la);
    lch.x = 0.62 + (lch.x - 0.62) * uContrast;                            // contrast around a mid silver
    lch.x += (vnoise(vec2(px.x * 0.006, px.y * 1.1) + uSeed) - 0.5) * 0.05 * uBrushed * (1.0 - uDome * 0.7);
    lch.x += (vnoise(vec2(px.x * 0.02, px.y * 2.3) + 4.0) - 0.5) * 0.03 * uBrushed * (1.0 - uDome * 0.7);
    lch.x += (hash(cell * 1.37) - 0.5) * 0.03 * uSpecks;
    float spec = pow(clamp(dot(n, normalize(vec3(toLight * 0.6, 0.8))), 0.0, 1.0), 18.0);
    lch.x += spec * 0.18 * uSheen * (0.4 + uDome);                         // the highlight where the edge meets the light
    lch.x += exp(-length(p + uSize * 0.5 * vec2(0.85, 0.7)) / (0.7 * max(uSize.x, uSize.y))) * 0.05 * uSheen;
    float rim = exp(d / 1.3);
    lch.x += rim * uBevel * (side > 0.0 ? 0.1 * side : 0.14 * side);
    lch.x = clamp(lch.x, 0.08, 0.99);
    c = rgbOf(particle(lch, cell, 0.5 + 0.5 * side * rim));
    inside = step(hash(cell * 2.13 + 1.7), clamp(0.5 - d * uDpr * 0.7, 0.0, 1.0));   // the edge dithers, it is not blurred
  }
  if (inside > 0.5) col = vec4(c, 1.0);
  // ---- the shadow under raised things: grain thinning out down-right of the shape (no blur, never a halo) ----
  else if (uInset < 0.5 && uShadow > 0.0) {
    float ds = shapeSd(p + toLight * uSpread * 0.4);                  // the shape pushed away from the light
    float dc = shapeSd(p + toLight * 1.5);
    float dens = ds <= 0.0 ? 1.0 : exp(-ds / max(uSpread * 0.35, 0.5));
    float contact = dc <= 0.0 ? 1.0 : exp(-dc / 1.2);
    float a = max(dens * 0.3, contact * 0.6) * uShadow;
    if (hash(cell * 0.913 + 3.3) < a) col = vec4(rgbOf(vec3(0.44, 0.012, 230.0)), 0.42 + 0.3 * contact);
  }
  frag = col;
}`
