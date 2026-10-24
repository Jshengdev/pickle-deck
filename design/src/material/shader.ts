/** The grain shader. One rule for the whole brand: softness is particles thinning out (dispersion), never a blur filter.
    Colour is OKLCH: every particle's saturation varies, and its hue shifts with the light (warmer lit, cooler in shade). */
export const VERT = `#version 300 es
in vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`

export const FRAG = `#version 300 es
precision highp float;
out vec4 frag;
uniform vec2 uRes; uniform float uTime; uniform int uMode; uniform int uShape;
uniform vec2 uCenter; uniform vec2 uSize; uniform float uRadius; uniform float uSpread; uniform float uDensity;
uniform float uGrain; uniform vec3 uLCH; uniform float uHueShift; uniform float uSatJitter; uniform float uLight;
uniform float uSeed; uniform float uFill; uniform float uClump; uniform float uDew; uniform float uAlpha;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
vec3 oklabToLinear(vec3 c){
  float l_ = c.x + 0.3963377774*c.y + 0.2158037573*c.z, m_ = c.x - 0.1055613458*c.y - 0.0638541728*c.z, s_ = c.x - 0.0894841775*c.y - 1.2914855480*c.z;
  float l = l_*l_*l_, m = m_*m_*m_, s = s_*s_*s_;
  return vec3(4.0767416621*l - 3.3077115913*m + 0.2309699292*s, -1.2684380046*l + 2.6097574011*m - 0.3413193965*s, -0.0041960863*l - 0.7034186147*m + 1.7076147010*s);
}
vec3 toSrgb(vec3 x){ x = clamp(x, 0.0, 1.0); return mix(12.92*x, 1.055*pow(x, vec3(1.0/2.4)) - 0.055, step(0.0031308, x)); }
vec3 oklch(float L, float C, float h){ float r = radians(h); return toSrgb(oklabToLinear(vec3(L, C*cos(r), C*sin(r)))); }
float sdRoundRect(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
vec2 cellular(vec2 p){ vec2 i = floor(p), f = fract(p); float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) { vec2 g = vec2(x, y); vec2 o = vec2(hash(i + g), hash(i + g + 7.1));
    float d = length(g + o - f); if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d; }
  return vec2(d1, d2); }

void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = px - uCenter;
  float d;
  if (uShape == 0) d = sdRoundRect(p, uSize * 0.5, uRadius);
  else if (uShape == 1) d = abs(length(p) - uSize.x * 0.5) - uRadius;
  else { float a = atan(p.y, p.x); d = length(p) - uSize.x * 0.5 * (1.0 + 0.06*sin(a*3.0 + uSeed) + 0.04*sin(a*5.0 - uSeed*2.0)); }
  float spread = max(uSpread, 0.5);
  // coverage: full inside (uFill) and thinning with distance outside; the thinning IS the blur
  float cov = d <= 0.0 ? mix(exp(d / spread), 1.0, uFill) : exp(-d / spread);
  vec2 toLight = -vec2(cos(radians(uLight)), sin(radians(uLight)));  // uLight 225 = light from the upper left
  vec2 n = p / max(max(uSize.x, uSize.y) * 0.5, 1.0);
  float lit = clamp(0.5 + 0.5 * dot(normalize(n + 1e-4), toLight) * min(length(n) * 1.4, 1.0), 0.0, 1.0);
  float t = floor(uTime * 12.0);
  vec2 cell; float L, C, h, height = 1.0;
  if (uMode == 2) {                       // moss: clumped cushions, strands, saturation by height, dew
    cell = floor(px / vec2(uGrain, uGrain * 2.2));
    vec2 v = cellular(px / max(uClump, 4.0) + uSeed);
    height = clamp(1.0 - v.x * 1.15, 0.0, 1.0);
    cov *= smoothstep(0.02, 0.45, height) * 1.15;
  } else cell = floor(px / uGrain);
  float r1 = hash(cell + uSeed + t * 0.37), r2 = hash(cell * 1.73 + uSeed * 3.1 + 11.0);
  if (r1 > cov * uDensity) { frag = vec4(0.0); return; }
  float sh = uHueShift * (lit - 0.5) * 2.0;
  if (uMode == 2) {
    L = mix(0.30, 0.80, height) + 0.10 * (lit - 0.5) + (r2 - 0.5) * 0.07;
    C = mix(0.06, uLCH.y, height) * (1.0 - uSatJitter * 0.5 + uSatJitter * r2);
    h = mix(uLCH.z + 14.0, uLCH.z - 10.0, height) - sh;
    if (r2 > 1.0 - uDew * 0.004 && height > 0.62) { L = 0.97; C = 0.01; }
  } else {
    L = uLCH.x + 0.12 * (lit - 0.5) + (r2 - 0.5) * 0.05;
    C = uLCH.y * (1.0 - uSatJitter * 0.5 + uSatJitter * r2) * (0.85 + 0.3 * lit);
    h = uLCH.z - sh;
  }
  frag = vec4(oklch(L, C, h) * uAlpha, uAlpha);
}`
