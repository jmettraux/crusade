
// nissen_hut.js
//
// T+C scale is 1:56

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cube, cylinder, union } = Manifold;

let o2 = 0.2;
let width = 95;
let height = 51;
//let length = 210;
let length = 190;
let radius = width / 2;
let base_height = 0.8;
let base_depth = 20;
let wall_thickness = 1;
let csegs = 36;
let door_width = 25.8;
let door_height = 32 + 10;
let w_side = 0.28 * door_width;
let roof_thickness = 3 * o2;

//
// walls

let door = function() {

  return cube([ door_width, 1.5 * wall_thickness, door_height, 0 ], true)
    .translate([ 0, 0, 0.5 * door_height ]);
}

let wall = function(opts = {}) {

  let w = cylinder(wall_thickness, radius, radius, csegs, true)
    .rotate([ 90, 0, 0 ])
    .subtract(
      cube([ 1.5 * width, 1.5 * wall_thickness, radius ], true)
        .translate([ 0, 0, - 0.5 * radius - 0.5 * base_height ]))
    .scale([ 1, 1, 1.1 ]);

  if (opts.door) w = w.subtract(door());
    //cube([ door_width, 1.5 * wall_thickness, door_height, 0 ], true)
    //  .translate([ 0, 0, 0.5 * door_height ]));

  let win = function(dx) {
    let sq = cube([ w_side, 1.5 * wall_thickness, w_side ], true);
    let d = 0.5 * 1.1 * w_side;
    return union(
      sq.translate([  d, 0, d ]),
      sq.translate([ -d, 0, d ]),
      sq.translate([  d, 0, -d ]),
      sq.translate([ -d, 0, -d ]),
    ).translate([ dx, 0, door_height - 1.9 * w_side ]);
  };
  if (opts.windows) w = w
    .subtract(win( 0.24 * width))
    .subtract(win(-0.24 * width));
  if (opts.window) w = w
    .subtract(win(0));

  let base =
    cube([ width, base_depth, base_height ], true)
      .translate([ 0, 0.5 * base_depth, 0 ]);

  return w.add(base);
}

let front_wall = wall({ door: true, windows: true });
let back_wall = wall({ windows: true, window: true });
//let door = ... TODO


//
// roof

let r = function(radius, length) {
  return cylinder(length + 0.4, radius, radius, csegs, true)
    .rotate([ 90, 0, 0 ])
    .subtract(
      cube([ 1.5 * width, 1.5 * length, radius ], true)
        .translate([ 0, 0, - 0.5 * radius - 0.5 * base_height ]))
    .scale([ 1, 1, 1.1 ]);
}
let roof =
  r(radius + o2 + roof_thickness, length / 2)
    .subtract(r(radius + o2, length / 2));

//
// done.

//export default front_wall;
export default back_wall;
//export default door;
//export default roof;

