
// tree_slot.js
//
// T+C scale is 1:56

import { Manifold, show, only } from 'manifold-3d/manifoldCAD';
const { cube, cylinder, union } = Manifold;

// unit is mm

const o2 = 0.2;
const height = 14;
const thickness = 1.4;
const radius = 14 / 2 + thickness
const span_length = 49;
const span_side = 2.1;
const csegs = 36;

function slot() {

  let r0 = radius - thickness;

  let c = cylinder(height, radius, radius, csegs, true)
    .subtract(cylinder(1.1 * height, r0, r0, csegs, true));
  let s0 = cube([ span_length, span_side, span_side ], true)
  let s = s0.translate([ 0, 0, -0.5 * height + 0.5 * span_side ]);

  return c
    .add(s).add(s.rotate([ 0, 0, 90 ]))
    .subtract(s0.translate([ 0, 0, 0.25 * height ]));
}

export default slot();

