
// nissen_hut.js
//
// T+C scale is 1:56

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cube, cylinder, union } = Manifold;

  //103|  let base = cylinder(height, r0, r1, csegs, true);
let width = 95;
let height = 51;
let length = 210;
let radius = width / 2;
let base_height = 1.5;
let wall_thickness = 1;
let csegs = 36;

let base =
  cube([ width, length, base_height ], true);

let wall = function(opts = {}) {
  return cylinder(wall_thickness, radius, radius, csegs, true)
    .rotate([ 90, 0, 0 ])
    .subtract(
      cube([ 1.5 * width, 1.5 * wall_thickness, radius ], true)
        .translate([ 0, 0, - 0.5 * radius - 0.5 * base_height ]))
    .translate([ 0, opts.dy || 0, 0 ]);
}

let hut = base
  .add(wall({ dy:   0.5 * length }))
  .add(wall({ dy: - 0.5 * length }));

export default hut;

