
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
let door_width = 25.8;
let door_height = 32 + 1;
let w_side = 0.28 * door_width;

let base =
  cube([ width, length, base_height ], true);

let wall = function(opts = {}) {

  let w = cylinder(wall_thickness, radius, radius, csegs, true)
    .rotate([ 90, 0, 0 ])
    .subtract(
      cube([ 1.5 * width, 1.5 * wall_thickness, radius ], true)
        .translate([ 0, 0, - 0.5 * radius - 0.5 * base_height ]));

  if (opts.door) w = w.subtract(
    cube([ door_width, 1.5 * wall_thickness, door_height, 0 ], true)
      .translate([ 0, 0, 0.5 * door_height ]));

  let win = function(dx) {
    let sq = cube([ w_side, 1.5 * wall_thickness, w_side ], true);
    let d = 0.5 * 1.1 * w_side;
    return union(
      sq.translate([  d, 0, d ]),
      sq.translate([ -d, 0, d ]),
      sq.translate([  d, 0, -d ]),
      sq.translate([ -d, 0, -d ]),
    ).translate([ dx, 0, door_height - 1.3 * w_side ]);
  };
  if (opts.windows) w = w
    .subtract(win( 0.24 * width))
    .subtract(win(-0.24 * width));
  if (opts.window) w = w
    .subtract(win(0));

  return w.translate([ 0, opts.dy || 0, 0 ]);
}

let hut = base
  .add(wall({ dy:   0.5 * length, windows: true, window: true }))
  .add(wall({ dy: - 0.5 * length, door: true, windows: true }));

export default hut;

