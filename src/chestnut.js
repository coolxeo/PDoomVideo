// chestnut.js: Chestnut, the felted hedgehog (Little Acorn Nest), painted as watercolor + ink.
// chestnut(x, y, u, o): (x, y) is the ground point between the feet, u is the body unit. Chestnut keeps Clawd's
// footprint (about 10u wide, 9u tall to the top of the quills) so everything that used to call clawd() still fits.
//
// Body-local coordinates (for the o.draw / o.armL / o.armR hooks):
//   head centre (0, -5.9u), 3.4u x 2.85u; belly centre (0, -2.5u); eyes at (±1.25u, -6u); nose (0, -5.25u).
//   Arms pivot at (±2.55u, -3.4u) and are 2.3u long; o.armL / o.armR are called at the paw in arm space
//   (x runs along the arm, outward), exactly like Clawd's arm hooks.
//
// Options (Clawd's, where they make sense): eyes ('normal','look','happy','closed','wink','narrow','angry','scared',
// 'spark','red','heart','x','swirl','dot','shades'), lookX/lookY, squint, mouth ('smile','grin','o','O','flat',
// 'wobble','cat'), lid (0..1, now just opens the mouth wide), aL/aR, walk, dy, sq/take, rot, flip, sx/sy, blush (always
// a little rosy; true = rosier), hat, noLegs, noShadow, emote/emoteK, seed, swMul, draw/armL/armR hooks.
// Colour overrides: col = quills, dk = quill shadow, lt = tints the cream face/belly.
//
// The shared felt-face helpers (feltEye, feltMouth, feltBlush) are also used by the bunny and duckling in cast.js.

// ---------- shared felt face ----------
// One round felt eye at (cx, cy), radius r. side = -1 / 1 (for winks and slanted lids).
function feltEye(cx, cy, r, mode, sw, side, o = {}) {
  const lx = (o.lookX || 0) * r * .45, ly = (o.lookY || 0) * r * .35;
  const blink = (mode === 'normal' || mode === 'dot' || mode === 'look') && ((T * .8 + (o.seed || 0) * 1.7) % 3.6) < .13;
  if ((o.squint || 0) > .5 || blink) mode = 'closed';
  if (mode === 'wink') mode = side < 0 ? 'happy' : 'normal';
  const dot = (k = 1) => {
    paint(ellPts(cx + lx, cy + ly, r * k, r * 1.12 * k, 16), { wash: PAL.eye, ink: null });
    if (r > 4) paint(ellPts(cx + lx - r * .32 * k, cy + ly - r * .42 * k, r * .3 * k, r * .3 * k, 10), { wash: '#FFFFFF', washOp: 235, ink: null });
  };
  if (mode === 'happy') inkLine([[cx - r, cy + r * .35], [cx, cy - r * .55], [cx + r, cy + r * .35]], sw * 1.1, PAL.eye, 'ink', .6);
  else if (mode === 'closed') inkLine([[cx - r * 1.05, cy - r * .05], [cx, cy + r * .5], [cx + r * 1.05, cy - r * .05]], sw * 1.05, PAL.eye, 'ink', .6);
  else if (mode === 'narrow') {
    paint(ellPts(cx + lx, cy + ly + r * .35, r * .9, r * .5, 14), { wash: PAL.eye, ink: null });
    inkLine([[cx - r * 1.1, cy - r * .05], [cx + r * 1.1, cy - r * .05]], sw * .9, PAL.eye, 'ink', 0);
  } else if (mode === 'wide' || mode === 'scared') {
    paint(ellPts(cx, cy, r * 1.3, r * 1.4, 18), { wash: '#FFFDF6', ink: PAL.ink, sw: sw * .55 });
    paint(ellPts(cx + lx, cy + ly, r * .62, r * .7, 12), { wash: PAL.eye, ink: null });
    paint(ellPts(cx + lx - r * .2, cy + ly - r * .25, r * .18, r * .18, 8), { wash: '#FFFFFF', ink: null });
  } else if (mode === 'spark' || mode === 'star') {
    paint(ellPts(cx, cy, r * 1.5, r * 1.5, 16), { fill: PAL.ochre, fillOp: 80, bleed: .3, ink: null });
    paint(starPts(cx, cy, r * 1.35 * (1 + .1 * Math.sin(T * 6 + side))), { wash: PAL.cream, fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: sw * .5 });
  } else if (mode === 'heart') paint(heartPts(cx, cy, r * 1.1), { wash: '#E2476E', fill: PAL.rose, fillOp: 70, ink: null });
  else if (mode === 'red') {
    paint(ellPts(cx, cy, r * 1.8, r * 1.8, 16), { fill: '#E0283F', fillOp: 100, bleed: .35, ink: null });
    paint(ellPts(cx, cy, r, r * 1.12, 14), { wash: '#FF2F4A', ink: PAL.ink, sw: sw * .5 });
  } else if (mode === 'x') {
    inkLine([[cx - r * .8, cy - r * .8], [cx + r * .8, cy + r * .8]], sw * .9, PAL.eye, 'ink', 0);
    inkLine([[cx + r * .8, cy - r * .8], [cx - r * .8, cy + r * .8]], sw * .9, PAL.eye, 'ink', 0);
  } else if (mode === 'swirl') {
    const sp = []; for (let k = 0; k < 14; k++) { const a = k * .8 + T * 4 * side, q = k * .08 * r; sp.push([cx + Math.cos(a) * q, cy + Math.sin(a) * q]); }
    inkLine(sp, sw * .6, PAL.eye, 'inkfine', .6);
  } else {
    dot(mode === 'dot' ? .9 : 1);
    if (mode === 'angry') inkLine([[cx - r * 1.1, cy - r * (side < 0 ? 1.5 : .9)], [cx + r * 1.1, cy - r * (side < 0 ? .9 : 1.5)]], sw * .8, PAL.eye, 'ink', 0);
  }
}
// Little felt mouth centred at (cx, cy), w = half width. open (0..1) widens 'grin' / 'O' into a yawn.
function feltMouth(cx, cy, w, m, sw, open = 0) {
  if (open > .05 && !m) m = 'O';
  if (!m) return;
  if (m === 'smile') inkLine([[cx - w, cy - w * .2], [cx, cy + w * .45], [cx + w, cy - w * .2]], sw * .75, PAL.ink, 'ink', .6);
  else if (m === 'grin') {
    const h = w * (1 + open);
    paint([[cx - w, cy - w * .2], [cx + w, cy - w * .2], [cx + w * .45, cy + h * .75], [cx - w * .45, cy + h * .75]], { wash: '#8A3440', ink: PAL.ink, sw: sw * .5, curv: .5 });
    paint(ellPts(cx, cy + h * .5, w * .45, h * .2, 10), { wash: PAL.nose, ink: null });
  } else if (m === 'o') paint(ellPts(cx, cy + w * .2, w * .38, w * .45, 10), { wash: '#8A3440', ink: PAL.ink, sw: sw * .4 });
  else if (m === 'O') {
    const k = .8 + open * .7;
    paint(ellPts(cx, cy + w * .35 * k, w * .62 * k, w * .8 * k, 14), { wash: '#8A3440', ink: PAL.ink, sw: sw * .5 });
    paint(ellPts(cx, cy + w * .75 * k, w * .38 * k, w * .25 * k, 10), { wash: PAL.nose, ink: null });
  } else if (m === 'flat') inkLine([[cx - w * .7, cy], [cx + w * .7, cy]], sw * .7, PAL.ink, 'ink', 0);
  else if (m === 'wobble') inkLine([[cx - w, cy], [cx - w * .5, cy - w * .25], [cx, cy], [cx + w * .5, cy - w * .25], [cx + w, cy]], sw * .6, PAL.ink, 'ink', .3);
  else if (m === 'cat') inkLine([[cx - w, cy - w * .1], [cx - w * .5, cy + w * .35], [cx, cy - w * .05], [cx + w * .5, cy + w * .35], [cx + w, cy - w * .1]], sw * .65, PAL.ink, 'ink', .5);
}
function feltBlush(cx, cy, rx, strong) {
  paint(ellPts(cx, cy, rx, rx * .62, 14), { wash: PAL.blush, washOp: strong ? 150 : 80, ink: null });
}

// ---------- Chestnut ----------
function chestnut(x, y, u, o = {}) {
  const dy = (o.dy || 0) * u, sq = (o.sq || 0) + (o.take || 0);
  const sw = clamp(u / 24, .4, 1.5) * (o.swMul || 1), J = u * .06;
  const quill = o.col || PAL.quill, qdk = o.dk || PAL.quillDk, face = o.lt ? mixCol(PAL.felt, o.lt, .45) : PAL.felt;
  const felt = { wash: face }, feltTex = { wash: face, fill: PAL.feltDk, fillOp: 70, bleed: .12, tex: .85, border: .7 };

  if (!o.noShadow) {
    const f = 1 - Math.min(.5, Math.abs(o.dy || 0) * .06);
    paint(ellPts(x, y + u * .15, u * 4.9 * f, u * .9 * f, 22), { fill: PAL.ink, fillOp: 70, bleed: .25, tex: .3, border: .1, ink: null });
  }

  push();
  translate(x, y + dy);
  if (o.rot) rotate(o.rot);
  scale((o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * .6), (o.sy ?? 1) * (1 - sq));

  // quills: a scalloped mound behind everything, covered in little felt loops
  const Q = [], n = 34;
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, r = i % 2 ? .93 : 1.02;
    Q.push([.2 * u + Math.cos(a) * 4.95 * u * r, Math.min(-.35 * u, -4.75 * u + Math.sin(a) * 4.55 * u * r)]);
  }
  paint(Q, { wash: quill, washOp: 255, fill: qdk, fillOp: 90, bleed: .12, tex: .8, border: .6, ink: PAL.ink, sw: sw * .8, curv: .5 });
  for (let i = 0; i < 30; i++) {
    const a = hash(i * 3.1) * TAU, fr = .62 + hash(i * 7.7) * .3, cx = .2 * u + Math.cos(a) * 4.95 * u * fr, cy = -4.75 * u + Math.sin(a) * 4.55 * u * fr;
    if (cy > -.9 * u) continue;
    paint(ellPts(cx, cy, u * .4, u * .34, 9, 0, a), { wash: mixCol(quill, '#FFFFFF', .12), ink: qdk, br: 'inkfine', sw: sw * .9 });
  }

  // feet
  if (!o.noLegs) [-1, 1].forEach((side, i) => {
    let lift = 0;
    if (o.walk != null) { const ph = Math.sin((o.walk + (i ? .5 : 0)) * TAU); if (ph > 0) lift = ph * .6; }
    paint(ellPts(side * 1.55 * u, (-.5 - lift) * u, 1.15 * u, .6 * u, 14, J * .5), { ...felt, ink: PAL.ink, sw: sw * .7 });
  });

  // belly, ears, head
  paint(ellPts(0, -2.55 * u, 3.0 * u, 2.3 * u, 24, J), { ...feltTex, ink: PAL.ink, sw: sw * .8 });
  for (const s of [-1, 1]) {
    paint(ellPts(s * 2.75 * u, -7.95 * u, .95 * u, .9 * u, 14, J * .5), { ...felt, ink: PAL.ink, sw: sw * .7 });
    paint(ellPts(s * 2.72 * u, -7.9 * u, .5 * u, .45 * u, 10), { wash: PAL.nose, washOp: 150, ink: null });
  }
  paint(ellPts(0, -5.9 * u, 3.4 * u, 2.85 * u, 28, J), { ...feltTex, fillOp: 55, ink: PAL.ink, sw });
  // quill fringe falling over the forehead
  const F = [];
  for (let i = 0; i <= 10; i++) { const a = Math.PI * 1.13 + i / 10 * Math.PI * .74; F.push([Math.cos(a) * 3.55 * u, -5.9 * u + Math.sin(a) * 3.0 * u]); }
  for (let i = 0; i <= 6; i++) F.push([lerp(2.3, -2.3, i / 6) * u, (i % 2 ? -7.35 : -7.75) * u]);
  paint(F, { wash: quill, ink: PAL.ink, sw: sw * .7, curv: .5 });
  for (const [cx, cy] of [[-1.4, -8.2], [0, -8.45], [1.4, -8.2]]) paint(ellPts(cx * u, cy * u, u * .38, u * .32, 9), { wash: mixCol(quill, '#FFFFFF', .12), ink: qdk, br: 'inkfine', sw: sw * .9 });

  // arms: soft cream paws in front of the belly
  const arm = (side, a, hook) => {
    push(); translate(side * 2.55 * u, -3.4 * u); rotate(side < 0 ? a : -a);
    paint(rrPts(side < 0 ? -2.3 * u : 0, -.55 * u, 2.3 * u, 1.1 * u, .55 * u, J * .4), { ...felt, ink: PAL.ink, sw: sw * .7 });
    if (hook) { translate(side * 2.3 * u, 0); if (side < 0) scale(-1, 1); hook(u, sw); }
    pop();
  };
  arm(-1, o.aL ?? -.6, o.armL); arm(1, o.aR ?? -.6, o.armR);

  // face
  for (const s of [-1, 1]) feltBlush(s * 2.2 * u, -4.95 * u, .75 * u, o.blush);
  if (o.eyes === 'shades') {
    paint(rrPts(-2.6 * u, -6.7 * u, 5.2 * u, 1.4 * u, .6 * u), { wash: PAL.ink, ink: null });
    inkLine([[-2.1 * u, -6.35 * u], [-1.2 * u, -6.4 * u]], sw * .5, PAL.cream, 'inkfine', 0);
  } else for (const s of [-1, 1]) feltEye(s * 1.25 * u, -6.0 * u, .5 * u, o.eyes || 'normal', sw, s, o);
  paint(ellPts(0, -5.2 * u, .42 * u, .32 * u, 12), { wash: PAL.nose, ink: PAL.ink, sw: sw * .45 });
  feltMouth(0, -4.55 * u, .6 * u, o.mouth === undefined && !o.lid ? 'smile' : o.mouth, sw, o.lid || 0);
  if (o.hat === 'mask') paint(rrPts(-3.1 * u, -6.9 * u, 6.2 * u, 1.8 * u, .8 * u), { wash: PAL.violet, washOp: 200, ink: PAL.ink, sw: sw * .6 });
  else if (o.hat) {
    // Clawd's hats sit on a flat top at -8u; lift them onto the quills and narrow the face-level ones
    const face = o.hat === 'masq' || o.hat === 'cat';
    push(); if (face) { translate(0, .3 * u); scale(.7, 1); } else if (o.hat !== 'bowtie') translate(0, -.9 * u);
    hat(u, o.hat, sw); pop();
  }
  if (o.draw) o.draw(u, sw);
  pop();
  if (o.emote) emote(o.emote, x + (o.flip ? -1 : 1) * 4.6 * u, y + dy - 9.4 * u, u * .9, o.emoteK ?? 1);
}
