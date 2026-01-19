
// cask.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube } = Manifold;
const { union, hull } = Manifold;

// T+C scale is 1:56

// While barrels varied slightly by country and cooper, a very representative
// WW1-era supply cask was:
//
// * Height: 85–95 cm
// * Maximum diameter (bilge): 55–60 cm
// * Top/bottom diameter: 40–45 cm
//
// A very commonly cited “average” is:
// ≈ 90 cm tall × 58 cm diameter (at widest point)
//
// ## What they were used for
// * Water supply (most common)
// * Wine or beer (especially French units)
// * Salted foodstuffs
// * Occasionally fuel or oil
//   (before metal drums became dominant later in the war)
//
// ## They were transported by
// * wagons
// * narrow-gauge trench railways
// * manhandling close to the front

const scale = 1 / 56;
const height = 900 * scale;
const maxRad = 0.5 * 600 * scale;
const minRad = 0.5 * 490 * scale;
const cylHeight = 10 * scale;
const hooHeight = height / 14;
const offHeight = height / 16;
const bungRad = 1.0;
const csegs = 2 * 2 * 36;

let cask = function() {

  let rad = maxRad - minRad;

  let rs = [
    { r: 0.00, z: 0.00 },
    { r: 0.42, z: 0.20 },
    { r: 0.60, z: 0.40 },
    { r: 0.80, z: 0.50 },
    { r: 1.00, z: 0.80 },
    { r: 1.00, z: 1.00 },
  ];
  let cs = rs.reduce(
    function(a, c) {
      let r = minRad + c.r * (maxRad - minRad);
      let s = cylinder(cylHeight, r, r, csegs, true);
      let z = - 0.5 * height + c.z * 0.5 * height;
      a.push(s.translate([ 0, 0,  z ]));
      a.push(s.translate([ 0, 0, -z ]));
      return a; },
    []);

  rs = [
    { r0: 0.32, r1: 0.57, z: 0.06 },
    { r0: 1.12, r1: 1.17, z: 0.63 },
  ];
  let hs = rs.reduce(
    function(a, h) {
      let r0 = minRad + h.r0 * (maxRad - minRad);
      let r1 = minRad + h.r1 * (maxRad - minRad);
      let s0 = cylinder(hooHeight, r0, r1, csegs, true);
      let s1 = cylinder(hooHeight, r1, r0, csegs, true);
      let z = - 0.5 * height + h.z * 0.5 * height;
      a.push(s0.translate([ 0, 0,  z ]));
      a.push(s1.translate([ 0, 0, -z ]));
      return a; },
    []);


  let off = cylinder(offHeight, 0.90 * minRad, 0.95 * minRad, csegs, true);

  let bung = cylinder(height / 21, bungRad, bungRad, csegs, true)
    .translate([ 0.60 * minRad, 0, 0 ]);

  return hull(cs)
    .add(union(hs))
    .subtract(off.translate([ 0, 0, -0.5 * height ]))
    .subtract(off.translate([ 0, 0,  0.5 * height ]))
    .add(bung.translate([ 0, 0, 0.5 * height - 0.4 * offHeight ]));
};

export default cask()
  .subtract(
    cube([ 2.1 * maxRad, 2.1 * maxRad, 1.1 * height ], true)
      .translate([ 0, 1.05 * maxRad, 0 ]));

