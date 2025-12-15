
// maru.js
//
// print in green, ready for activation

import { Manifold } from 'manifold-3d/manifoldCAD';

const { cylinder } = Manifold;

let r1 = 25 / 2;
let r0 = 0.7 * r1;
let h = 2.0;
let cs = 36; // csegments

export default
  cylinder(h, r1, r1, cs, true).subtract(cylinder(2 * h, r0, r0, cs, true));

// print in army green?

