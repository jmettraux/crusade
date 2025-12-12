
// nissen_hut.js
//
// T+C scale is 1:56

import { Manifold, show, only } from 'manifold-3d/manifoldCAD';
const { cube, cylinder, union } = Manifold;

let o2 = 0.2;
let width = 95;
let height = 51;
//let length = 210;
let half_length = 100;
let radius = width / 2;
let base_height = 0.8;
let base_depth = 20;
let wall_thickness = 1;
let csegs = 36;
let door_width = 25.8;
let door_height = 32 + 10;
let lintel_width = 1.1 * door_width;
let lintel_depth = 4.2;
let lintel_height = base_height;
let hinge_radius = 1.0;
let w_side = 0.28 * door_width;
let roof_thickness = 3 * o2;

//
// walls

let _window = function(dx = 0, center = false) {

  let sq = cube([ w_side, 1.5 * wall_thickness, w_side ], true);
  let d = 0.5 * 1.1 * w_side;

  let w = union(
    sq.translate([  d, 0, d ]),
    sq.translate([ -d, 0, d ]),
    sq.translate([  d, 0, -d ]),
    sq.translate([ -d, 0, -d ]));

  if ( ! center) w = w.translate([ dx, 0, door_height - 1.9 * w_side ]);

  return w;
};

let door_frame = function() {

  return cube([ door_width, 1.5 * wall_thickness, door_height ], true)
    .translate([ 0, 0, 0.5 * door_height ]);
}

let _door = function(opts = {}) {

  let m = 2 * o2;
  let hr = hinge_radius - 0.1;
  let dt = 1.0 * wall_thickness;

  let d =
    cube([ door_width - m, dt, door_height - m ], true)
      .translate([ 0, hr - 0.5 * dt, 0 ]);
  let h =
    cylinder(1.05 * door_height, hr, hr, csegs, true)
      .translate([ 0.5 * door_width - hr, 0, 0 ]);

  d = d.add(h);

  if (opts.window) d = d
    .subtract(_window(0, true).translate([ 0, 0.5 * hr, 0.25 * door_height ]));

  return d.translate([ 0, 0, 0.5 * door_height ]);
}
let door = _door({ window: true });

let wall = function(opts = {}) {

  let w = cylinder(wall_thickness, radius, radius, csegs, true)
    .rotate([ 90, 0, 0 ])
    .subtract(
      cube([ 1.5 * width, 1.5 * wall_thickness, radius ], true)
        .translate([ 0, 0, - 0.5 * radius - 0.5 * base_height ]))
    .scale([ 1, 1, 1.1 ]);

  w = w.add(
    cube([ 0.97 * width, base_depth, base_height ], true)
      .translate([ 0, 0.5 * base_depth, 0 ]));
        // the beginning of a base...

  if (opts.door) {

    let lintel =
      cube([ lintel_width, lintel_depth, lintel_height ], true)
        .translate([ 0, 0.5 * lintel_depth, door_height + 0.5 * lintel_height ]);
    let hinge =
      cylinder(1.5 * door_height, hinge_radius, hinge_radius, csegs, true)
        .translate([
          0,
          wall_thickness + 0.8 * hinge_radius,
          0.7 * door_height ]);

    w = w.subtract(door_frame())
      .add(lintel)
      .subtract(hinge.translate([  0.46 * door_width, 0, 0 ]))
      .subtract(hinge.translate([ -0.46 * door_width, 0, 0 ]));

    //w = w.add(
    //  show(door()
    //    .translate([ 0, wall_thickness + 1.5 * hinge_radius, 0 ])));
  }
  if (opts.windows) w = w
    .subtract(_window( 0.24 * width))
    .subtract(_window(-0.24 * width));
  if (opts.window) w = w
    .subtract(_window(0));

  return w;
}

let front_wall = wall({ door: true, windows: true });
let back_wall = wall({ windows: true, window: true });


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
  r(radius + o2 + roof_thickness, half_length)
    .subtract(r(radius + o2, half_length));

//
// done.

//export default front_wall;
//export default back_wall;
//export default door;
export default roof;

