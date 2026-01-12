
// cask.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder } = Manifold;
const { hull } = Manifold;

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

//const height = 16;
//const radius = 11 / 2;
//const r0 = 0.95 * radius;
const scale = 1 / 56;
const height = 950 * scale;
const maxDiameter = 600 * scale;
const minDiameter = 450 * scale;
const cylHeight = 10 * scale;
const csegs = 2 * 36;

let cask = function() {
  return cylinder(1, 1, 1, csegs, true);
};

export default cask();

