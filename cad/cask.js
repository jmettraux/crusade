
// cask.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder } = Manifold;
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
const height = 840 * scale;
const maxRad = 0.5 * 600 * scale;
const minRad = 0.5 * 450 * scale;
const cylHeight = 10 * scale;
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

  //return union(cs);
  return hull(cs);
};

export default cask();

