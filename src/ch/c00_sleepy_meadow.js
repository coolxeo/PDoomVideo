// c00_sleepy_meadow: "Who Is Sleepy First" opener (0–8), Little Acorn Nest. One unhurried shot in a felt meadow:
// Chestnut, the bunny and the duckling toss a soft striped ball around, the title settles in over the sky, and the
// duckling gives the first little yawn. It covers the opening seconds of the lab chapter (registered as the shorter
// chapter at the same start) and is marked quiet, so no karaoke plays over it. The brush wipe at 8.0 leads into c01.
(() => {
  const GY = 905;                                             // ground line under the trio's feet
  const C = { x: 470, u: 40 }, Bn = { x: 990, s: 28 }, D = { x: 1470, s: 33 };
  // where the ball rests while each friend holds it
  const HOLD = { C: [612, GY - 258], B: [1088, GY - 312], D: [1392, GY - 270] };
  // [from, to, t0, t1, arc height]: slow tosses, then the duckling lobs it home and gets sleepy
  const TOSS = [['C', 'B', .7, 2.2, 170], ['B', 'D', 3.0, 4.5, 160], ['D', 'C', 5.1, 6.9, 240]];
  const HELD = { C: [[-9, .7], [6.9, 99]], B: [[2.2, 3.0]], D: [[4.5, 5.1]] };
  const YAWN = 6.1;

  function ballAt(t) {
    for (const [a, b, t0, t1, h] of TOSS) if (t >= t0 && t < t1) {
      const p = (t - t0) / (t1 - t0), q = lerp(p, ease(p), .4), [x0, y0] = HOLD[a], [x1, y1] = HOLD[b];
      return { x: lerp(x0, x1, q), y: lerp(y0, y1, q) - h * 4 * p * (1 - p), spin: p * 1.3 };
    }
    for (const k in HELD) for (const [a, b] of HELD[k]) if (t >= a && t < b) return { x: HOLD[k][0], y: HOLD[k][1] - 4 * Math.sin(t * 2.2), spin: 0 };
    return { x: HOLD.C[0], y: HOLD.C[1], spin: 0 };
  }
  // 0..1: arms up to catch just before the ball arrives, easing back down after it leaves
  const reach = (k, t) => Math.max(...HELD[k].map(([a, b]) => ease(seg(t, a - .55, a)) * (1 - ease(seg(t, b, b + .7)))));

  // ---------- the meadow set ----------
  const FLOWERS = Array.from({ length: 90 }, (_, i) => ({ x: hash(i * 1.37) * 2200 - 140, y: lerp(655, 1075, Math.pow(hash(i * 2.91 + 4), .85)), kind: i % 5, r: hash(i * 5.3) }))
    .sort((a, b) => a.y - b.y);

  function flower(f) {
    const k = lerp(.8, 2.1, (f.y - 655) / 420), x = f.x, y = f.y;
    if (f.kind === 4) {                                                                   // grass tuft
      for (let j = -2; j <= 2; j++) inkLine([[x + j * 6 * k, y], [x + j * 13 * k + jit(2), y - (26 + 10 * f.r) * k]], .45 * k, PAL.mossDk, 'inkfine', .4);
      return;
    }
    inkLine([[x, y], [x + 3 * k, y - 22 * k]], .4 * k, PAL.mossDk, 'inkfine', .4);
    if (f.kind === 3) {                                                                   // lavender spike
      for (let j = 0; j < 4; j++) paint(ellPts(x + 3 * k, y - (26 + j * 9) * k, 5 * k, 6 * k, 8), { wash: j % 2 ? PAL.lavender : PAL.violet, washOp: 200, ink: null });
    } else if (f.kind === 2) {                                                            // buttercup
      paint(starPts(x + 3 * k, y - 24 * k, 13 * k, .62, 5, f.r), { wash: '#F4CE4A', ink: PAL.ink, br: 'inkfine', sw: .3 * k, curv: .6 });
    } else {                                                                              // daisy
      paint(starPts(x + 3 * k, y - 24 * k, 15 * k, .5, 7, f.r), { wash: '#FFFDF6', ink: PAL.ink, br: 'inkfine', sw: .3 * k, curv: .6 });
      paint(ellPts(x + 3 * k, y - 24 * k, 4.5 * k, 4.5 * k, 8), { wash: '#F2B93A', ink: null });
    }
  }

  function meadowSet(t) {
    // sky, warm near the horizon, with soft clouds
    paint(rectPts(-400, -400, W + 800, 1100), { wash: PAL.skySoft, washOp: 255, fill: PAL.sky, fillOp: 60, bleed: .2, tex: .5, border: .3, ink: null });
    for (let i = 0; i < 5; i++) paint(rectPts(-400, 330 + i * 60, W + 800, 420, 6), { wash: PAL.cream, washOp: 38, ink: null });   // warm haze toward the horizon
    for (const [cx, cy, s] of [[760, 120, 1], [1420, 90, .8], [300, 250, .6]]) {
      const dx = t * 6 * s;
      for (const [ox, oy, r] of [[-70, 10, 70], [0, -20, 90], [80, 8, 66], [20, 30, 80]]) paint(ellPts(cx + dx + ox * s, cy + oy * s, r * s * 1.3, r * s * .8, 16, 2), { wash: '#FFFFFF', washOp: 110, ink: null });
    }
    // distant mountains, far hills with cypresses, a mid hill
    paint([[-400, 560], [120, 470], [520, 530], [900, 440], [1260, 510], [1560, 420], [1900, 490], [W + 400, 450], [W + 400, 700], [-400, 700]], { wash: '#B5C6DC', washOp: 220, ink: PAL.ink, br: 'inkfine', sw: .5, curv: .5 });
    paint([[-400, 600], [300, 555], [800, 590], [1250, 540], [1700, 570], [W + 400, 540], [W + 400, 760], [-400, 760]], { wash: PAL.sage, washOp: 255, ink: PAL.ink, br: 'inkfine', sw: .6, curv: .6 });
    for (let i = 0; i < 6; i++) { const cx = 1320 + i * 95 + hash(i) * 40, h = 90 + hash(i + 3) * 60; paint(ellPts(cx, 560 - h * .5 - i * 3, 16, h * .55, 12), { wash: PAL.mossDk, ink: PAL.ink, br: 'inkfine', sw: .4 }); }
    paint([[-400, 690], [200, 650], [700, 675], [1200, 640], [1600, 665], [W + 400, 640], [W + 400, 800], [-400, 800]], { wash: '#B4C985', washOp: 255, ink: null, curv: .6 });
    // the old tree and a little fence, back left
    paint([[-260, 760], [-40, 760], [30, 420], [60, 250], [150, 120], [80, 60], [-40, 180], [-120, 380]], { wash: '#9B7351', ink: PAL.ink, sw: .9, curv: .4 });
    for (let i = 0; i < 4; i++) inkLine([[-150 + i * 40, 740], [-110 + i * 38, 520], [-40 + i * 30, 300]], .6, PAL.quillDk, 'inkfine', .6);
    for (let i = 0; i < 9; i++) { const cx = -120 + i * 110 + hash(i + 11) * 60, cy = -40 + hash(i + 17) * 170; paint(ellPts(cx, cy, 140 + hash(i) * 50, 100 + hash(i + 2) * 30, 18, 3), { wash: i % 2 ? PAL.moss : '#86A55E', washOp: 240, ink: PAL.ink, br: 'inkfine', sw: .6 }); }
    for (const [fx, top] of [[40, 560], [290, 585], [560, 600]]) paint(rrPts(fx - 22, top, 44, 780 - top, 10, 1), { wash: '#B08A62', ink: PAL.ink, sw: .7 });
    for (const ry of [630, 700]) paint([[-100, ry - 14], [620, ry + 4], [620, ry + 30], [-100, ry + 12]], { wash: '#C09A70', ink: PAL.ink, sw: .7 });
    // the meadow floor
    paint([[-400, 745], [400, 725], [1000, 740], [1500, 720], [W + 400, 735], [W + 400, H + 400], [-400, H + 400]], { wash: '#A9C27A', washOp: 255, fill: PAL.mossDk, fillOp: 90, bleed: .1, tex: .9, border: .5, ink: null, curv: .5 });
    for (const [sx, sy, r] of [[760, 1000, 70], [1830, 1020, 90]]) paint(ellPts(sx, sy, r, r * .45, 16, 2), { wash: '#B9B0A2', ink: PAL.ink, sw: .6 });
  }

  // ---------- the shot ----------
  function meadow(t, lt) {
    const ball = ballAt(lt), yawn = seg(lt, YAWN, YAWN + .5) * (1 - seg(lt, YAWN + 1.3, YAWN + 1.7));
    const sleepy = lt >= YAWN, breath = k => Math.sin(lt * 1.4 + k) * .06;
    const look = (x, headY) => ({ eyes: 'look', lookX: clamp((ball.x - x) / 320, -1, 1), lookY: clamp((ball.y - headY) / 260, -1, 1) });
    const atDuck = { eyes: 'look', lookX: 1, lookY: .2 };

    camBegin(960 + 16 * Math.sin(lt * .4), 540, 1 + .018 * ease(lt / 8));
    meadowSet(lt);
    for (const f of FLOWERS) if (f.y < GY - 10) flower(f);

    // Chestnut (left), the bunny (middle), the duckling (right)
    const rc = reach('C', lt), rb = reach('B', lt), rd = reach('D', lt);
    chestnut(C.x, GY, C.u, {
      ...(sleepy && lt > YAWN + .4 && lt < 6.9 ? atDuck : look(C.x, GY - 240)), mouth: rc > .5 ? 'grin' : 'smile', seed: 1,
      dy: breath(0) - .25 * Math.sin(Math.PI * seg(lt, 6.8, 7.3)), aL: lerp(-.6, .5, rc), aR: lerp(-.6, 1.15, rc), rot: .03 * Math.sin(lt * .9)
    });
    bunny(Bn.x, GY, Bn.s, {
      ...(sleepy && lt > YAWN + .3 ? atDuck : look(Bn.x, GY - 300)), mouth: sleepy && yawn > .2 ? 'o' : rb > .5 ? 'grin' : 'smile',
      dy: breath(1) - .35 * Math.sin(Math.PI * seg(lt, 2.1, 2.6)), aL: lerp(-1.1, .4, rb), aR: lerp(-1.1, .8, rb), hairUp: .3 + .3 * rb, glassesTilt: -.12 + .06 * Math.sin(lt * .8)
    });
    duckling(D.x, GY, D.s, sleepy
      ? { eyes: 'closed', mouth: yawn > .15 ? 'O' : 'smile', aL: .9 * yawn, aR: .9 * yawn, dy: breath(2) - .2 * yawn, rot: -.05 * yawn - .04 * seg(lt, YAWN + 1.4, 8), blush: true,
          emote: 'zzz', emoteK: seg(lt, YAWN + .9, YAWN + 1.4) }
      : { ...look(D.x, GY - 180), mouth: rd > .5 ? 'grin' : 'smile', aL: 1.2 * rd, aR: .9 * rd, dy: breath(2) - .3 * Math.sin(Math.PI * seg(lt, 4.4, 4.9)), seed: 3 });
    feltBall(ball.x, ball.y, 44, ball.spin, { rot: -.35 + ball.spin * .8 });

    for (const f of FLOWERS) if (f.y >= GY - 10) flower(f);
    camEnd();

    // title, settling in softly over the sky
    const a = ease(seg(lt, .8, 2.3)) * (1 - ease(seg(lt, 6.9, 7.7)));
    if (a > .01) letter('Who Is Sleepy First', 960, 150 - 12 * a, 104, '#FFF8EA', { screen: true, alpha: a, font: '800 104px "Shantell Sans", sans-serif', stroke: PAL.quill });
  }

  chapter('meadow', 0, 8.0, [[0, meadow]], { quiet: true });
})();
