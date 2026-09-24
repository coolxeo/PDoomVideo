// cast.js: Chestnut's two friends (Little Acorn Nest). Neither is ever named on screen.
//   bunny(x, y, s, o)    the white felt bunny: soft oval body, long ears with pink inners, rosy cheeks.
//   duckling(x, y, s, o) the yellow felt duckling: round body, orange beak and feet, tiny wings.
//   researcher(...)      alias for bunny(): the bunny now plays the Researcher's part in the older chapters.
// (x, y) is the ground point between the feet, s is the unit. Faces use the felt helpers from chestnut.js.
//
// bunny local coordinates keep the Researcher's (for the o.draw / o.handL / o.handR hooks): feet at y 0, hips -2.3s,
// shoulders (±1.65s, -7.3s), head centre (0, -10.6s) radius about 2.5s, ears up to about -17s. Arm angles use the Clawd
// convention: 0 = straight out sideways, positive = raised, about -1.25 = hanging. Hand hooks are called at the paw
// centre in arm space (x = outward).
// bunny options: eyes ('dot','look','wide','star','swirl','closed','sad','x','heart','happy'), lookX/lookY,
// brows ('worried','angry','up'), mouth ('smile','o','O','flat','wobble','grin','cat'), aL/aR, dy/sq/rot/flip,
// walk (phase), run (phase), sit, back (seen from behind), hairUp (0..1, ears perk straight up), glassesTilt (now a
// small head tilt), bowtie (pink bow), blush, coat (fur tint), emote/emoteK, spin (0..1 turn), draw/handL/handR hooks.
//
// duckling local coordinates: body centre (0, -4.1s), 3.1s x 3.5s; wings pivot at (±2.75s, -3.9s), 1.9s long, hooks at
// the wing tip (o.wingL / o.wingR); eyes (±1.1s, -5.3s); beak (0, -4.4s); tuft up to about -9s.
// duckling options: eyes, lookX/lookY, mouth (null = closed beak, 'o' / 'O' / 'grin' open it, 'smile'), aL/aR
// (wing lift, 0 = resting), walk, dy/sq/rot/flip/sx, blush, noShadow, emote/emoteK, seed, draw hook.

// Kept under the old names: a few chapters paint Researcher details (pixel art, face patches) with these colours.
const SKIN = PAL.bunny, HAIR = PAL.earIn, COAT = PAL.bunny, PANTS = PAL.bunnyDk;

function bunny(x, y, s, o = {}) {
  const sw = clamp(s / 20, .4, 1.4), J = s * .05, sq = (o.sq || 0) + (o.take || 0);
  const fur = o.coat && o.coat !== COAT ? mixCol(PAL.bunny, o.coat, .35) : PAL.bunny;
  const felt = { wash: fur }, feltTex = { wash: fur, fill: PAL.bunnyDk, fillOp: 75, bleed: .12, tex: .85, border: .7 };
  if (!o.noShadow) paint(ellPts(x, y + s * .1, s * 3.0, s * .65, 18), { fill: PAL.ink, fillOp: 70, bleed: .2, tex: .3, border: .1, ink: null });

  push();
  translate(x, y + (o.dy || 0) * s);
  if (o.rot) rotate(o.rot);
  const sx = (o.flip ? -1 : 1) * (o.spin != null ? Math.cos(o.spin * TAU) : 1);
  scale(sx * (1 + sq * .5), 1 - sq);

  // legs: short felt thighs and oval feet
  const leg = (side, i) => {
    let lift = 0, a = 0;
    if (o.walk != null) { const ph = Math.sin((o.walk + (i ? .5 : 0)) * TAU); if (ph > 0) lift = ph * .7; }
    if (o.run != null) a = Math.sin((o.run + (i ? .5 : 0)) * TAU) * .5;
    push(); translate(side * .95 * s, -2.4 * s); rotate(a);
    if (o.sit) paint(ellPts(side * .5 * s, 1.2 * s, 1.05 * s, .6 * s, 14, J), { ...felt, ink: PAL.ink, sw: sw * .7 });
    else {
      paint(ellPts(0, (1.05 - lift * .5) * s, 1.0 * s, 1.3 * s, 16, J), { ...felt, ink: PAL.ink, sw: sw * .7 });
      paint(ellPts(side * .2 * s, (2.05 - lift) * s, 1.0 * s, .5 * s, 14, J), { ...felt, ink: PAL.ink, sw: sw * .7 });
    }
    pop();
  };
  leg(-1, 0); leg(1, 1);

  // body
  paint(ellPts(0, -5.1 * s, 2.7 * s, 3.25 * s, 26, J), { ...feltTex, ink: PAL.ink, sw: sw * .85 });
  if (o.back) paint(ellPts(0, -3.4 * s, .95 * s, .9 * s, 14, J), { wash: '#FFFFFF', ink: PAL.ink, sw: sw * .6 });
  else paint(ellPts(0, -4.6 * s, 1.6 * s, 2.1 * s, 18), { wash: '#FFFFFF', washOp: 150, ink: null });
  if (o.bowtie) for (const d of [-1, 1]) paint([[0, -7.9 * s], [d * 1.0 * s, -8.45 * s], [d * 1.0 * s, -7.4 * s]], { wash: PAL.rose, ink: PAL.ink, sw: sw * .5, curv: .3 });

  // head (tilts at the neck) with ears
  push(); translate(0, -8.2 * s); rotate(o.glassesTilt ? o.glassesTilt * .5 : 0); translate(0, 8.2 * s);
  const up = clamp(o.hairUp || 0);
  for (const side of [-1, 1]) {
    push(); translate(side * .95 * s, -12.3 * s); rotate(side * lerp(.26, .06, up) + (side > 0 ? lerp(.18, 0, up) : 0));
    paint(ellPts(0, -2.35 * s, .85 * s, 2.45 * s, 22, J), { ...felt, ink: PAL.ink, sw: sw * .75 });
    if (!o.back) paint(ellPts(0, -2.15 * s, .45 * s, 1.85 * s, 16), { wash: PAL.earIn, ink: null });
    pop();
  }
  paint(ellPts(0, -10.6 * s, 2.75 * s, 2.4 * s, 28, J), { ...feltTex, fillOp: 60, ink: PAL.ink, sw: sw * .85 });
  if (!o.back) bFace(s, sw, o);
  pop();

  // arms: soft white felt, paw at the end, in front of the body
  const arm = (side, a, hook) => {
    push(); translate(side * 1.65 * s, -7.3 * s); rotate(side < 0 ? a : -a);
    paint(rrPts(side < 0 ? -3.0 * s : 0, -.55 * s, 3.0 * s, 1.1 * s, .55 * s, J * .5), { ...felt, ink: PAL.ink, sw: sw * .65 });
    translate(side * 3.1 * s, 0);
    paint(ellPts(0, 0, .68 * s, .65 * s, 12), { ...felt, ink: PAL.ink, sw: sw * .6 });
    if (hook) { if (side < 0) scale(-1, 1); hook(s, sw); }
    pop();
  };
  arm(-1, o.aL ?? -1.25, o.handL); arm(1, o.aR ?? -1.25, o.handR);

  if (o.draw) o.draw(s, sw);
  pop();
  if (o.emote) emote(o.emote, x + (o.flip ? -1 : 1) * 3.4 * s, y + (o.dy || 0) * s - 13.6 * s, s * 1.1, o.emoteK ?? 1);
}

function bFace(s, sw, o) {
  const e = o.eyes || 'dot', ey = -10.75 * s;
  for (const side of [-1, 1]) feltBlush(side * 1.6 * s, -9.85 * s, .55 * s, o.blush);
  for (const side of [-1, 1]) feltEye(side * 1.0 * s, ey, .36 * s, e === 'sad' ? 'dot' : e, sw, side, { seed: 2, ...o });
  // brows: tiny soft strokes
  const b = o.brows || (e === 'sad' ? 'worried' : null);
  if (b) for (const side of [-1, 1]) {
    const bx = side * 1.0 * s, by = -11.6 * s;
    const tilt = b === 'worried' ? -side * .3 : b === 'angry' ? side * .3 : 0, lift = b === 'up' ? -.3 * s : 0;
    inkLine([[bx - .35 * s, by + lift + tilt * s * .5], [bx + .35 * s, by + lift - tilt * s * .5]], sw * .6, PAL.ink, 'inkfine', 0);
  }
  paint(ellPts(0, -10.05 * s, .3 * s, .22 * s, 10), { wash: PAL.nose, ink: PAL.ink, sw: sw * .4 });
  const m = o.mouth || 'smile';
  if (m === 'smile') inkLine([[-.5 * s, -9.7 * s], [-.25 * s, -9.45 * s], [0, -9.75 * s], [.25 * s, -9.45 * s], [.5 * s, -9.7 * s]], sw * .6, PAL.ink, 'ink', .5);
  else feltMouth(0, -9.55 * s, .5 * s, m, sw);
}

function duckling(x, y, s, o = {}) {
  const sw = clamp(s / 20, .4, 1.4), J = s * .05, sq = (o.sq || 0) + (o.take || 0);
  const felt = { wash: PAL.duck }, feltTex = { wash: PAL.duck, fill: PAL.duckDk, fillOp: 80, bleed: .12, tex: .85, border: .7 };
  if (!o.noShadow) paint(ellPts(x, y + s * .1, s * 3.3, s * .7, 18), { fill: PAL.ink, fillOp: 70, bleed: .2, tex: .3, border: .1, ink: null });

  push();
  translate(x, y + (o.dy || 0) * s);
  if (o.rot) rotate(o.rot);
  scale((o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * .5), 1 - sq);

  // orange feet with three soft toes
  [-1, 1].forEach((side, i) => {
    let lift = 0;
    if (o.walk != null) { const ph = Math.sin((o.walk + (i ? .5 : 0)) * TAU); if (ph > 0) lift = ph * .6; }
    const fx = side * 1.15 * s, fy = (-.35 - lift) * s;
    paint([[fx - .2 * s, fy - .7 * s], [fx + .2 * s, fy - .7 * s], [fx + 1.0 * s, fy + .15 * s], [fx + .35 * s, fy + .35 * s], [fx, fy + .2 * s], [fx - .35 * s, fy + .35 * s], [fx - 1.0 * s, fy + .15 * s]],
      { wash: PAL.beak, ink: PAL.ink, sw: sw * .6, curv: .4 });
  });

  // body with a fluffy tuft on top
  for (const [tx, a] of [[-.35, -.5], [0, 0], [.35, .5]]) {
    push(); translate(tx * s, -7.4 * s); rotate(a);
    paint(ellPts(0, -.75 * s, .32 * s, .85 * s, 10), { ...felt, ink: PAL.ink, sw: sw * .55 });
    pop();
  }
  paint(ellPts(0, -4.1 * s, 3.1 * s, 3.5 * s, 28, J), { ...feltTex, ink: PAL.ink, sw: sw * .85 });
  paint(ellPts(-.6 * s, -5.6 * s, 1.6 * s, 1.1 * s, 16), { wash: '#FFF3B8', washOp: 120, ink: null });

  // tiny wings (0 = resting against the body, positive = lifted)
  const wing = (side, a, hook) => {
    push(); translate(side * 2.75 * s, -3.9 * s); rotate(side < 0 ? a - .9 : .9 - a);
    paint([[0, -.55 * s], [side * 1.2 * s, -.5 * s], [side * 1.95 * s, 0], [side * 1.2 * s, .45 * s], [0, .5 * s]], { ...felt, ink: PAL.ink, sw: sw * .6, curv: .6 });
    if (hook) { translate(side * 1.9 * s, 0); if (side < 0) scale(-1, 1); hook(s, sw); }
    pop();
  };
  wing(-1, o.aL ?? 0, o.wingL); wing(1, o.aR ?? 0, o.wingR);

  // face
  for (const side of [-1, 1]) feltBlush(side * 2.0 * s, -4.4 * s, .6 * s, o.blush);
  for (const side of [-1, 1]) feltEye(side * 1.1 * s, -5.3 * s, .42 * s, o.eyes || 'normal', sw, side, { seed: 5, ...o });
  const m = o.mouth, open = m === 'O' ? 1 : m === 'grin' ? .7 : m === 'o' ? .4 : 0;
  if (open > 0) {
    paint(ellPts(0, -3.95 * s, .7 * s, (.3 + open * .45) * s, 12), { wash: '#8A3440', ink: PAL.ink, sw: sw * .45 });
    paint(ellPts(0, (-3.7 + open * .3) * s, .75 * s, .28 * s, 12), { wash: PAL.beak, ink: PAL.ink, sw: sw * .5 });
  }
  paint(ellPts(0, (-4.45 - open * .15) * s, .95 * s, .42 * s, 14), { wash: PAL.beak, ink: PAL.ink, sw: sw * .55 });
  if (m === 'smile') inkLine([[-.6 * s, -4.3 * s], [0, -4.1 * s], [.6 * s, -4.3 * s]], sw * .45, PAL.beakDk, 'inkfine', .5);

  if (o.draw) o.draw(s, sw);
  pop();
  if (o.emote) emote(o.emote, x + (o.flip ? -1 : 1) * 3.2 * s, y + (o.dy || 0) * s - 9.4 * s, s * 1.1, o.emoteK ?? 1);
}

function researcher(x, y, s, o = {}) { bunny(x, y, s, o); }
function researcherDancer(x, y, s, style, t, extra = {}) { const m = move(style, t, extra.seed || 0); researcher(x + m.dx * s, y, s, { ...m, walk: undefined, ...extra }); }
