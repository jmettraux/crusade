
//
// magnet_box.js
//
// via https://manifoldcad.org
//

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, union } = Manifold;


// unit is mm

const o2 = 0.2;
const bd = 5 + o2; // ball diameter
const br = bd / 2;
//const chamberRadius = br + 3 * o2;
//const chamberHeight = chamberRadius + 2;

const step_length = 42;
const step_height = 18;
const box_height = 15;
const box_depth = 18;
const thickness = 0.8;
const box_width = bd + 4 * o2 + 2 * thickness;
const step_depth = 25 - 0.5 * 6;
//const wall_height = 18;
const wall_height = box_height;
//const member_radius = 4;

let makeMagnetBox = function() {

  let d = box_depth;
  let w = box_width;
  let h = box_height;
  let t2 = 2 * thickness;

  let box = cube([ d, w, h ], true);
  let chamber = cube([ d - t2, w - t2, h - t2 ], true);

  return box.subtract(chamber);
};

let makeStep = function() {

  let box = makeMagnetBox();
  let box_dy = 0.5 * step_length - 0.5 * box_width;
  let box_dx = 0.5 * (step_depth - box_depth);
  let wall_dx = 0.5 * step_depth - 0.5 * thickness;
  let wall_dz = 0.5 * (wall_height - box_height);

  let wall = cube([ thickness, step_length, wall_height ], true)
    .translate([ wall_dx, 0, - wall_dz ]);
  let plank = cube([ step_depth, step_length, thickness ], true)
    .translate([ 0, 0, 0.5 * box_height - 0.5 * thickness ]);

  return union([
    wall,
    plank,
    box.translate([ box_dx, -box_dy, 0 ]),
    box.translate([ box_dx,  box_dy, 0 ]),
      ]);
};

export default makeStep();

