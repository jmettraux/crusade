
// ammo_box.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube } = Manifold;
const { union } = Manifold;

const height = 10;
const width = 20;
const depth = 14;
const plank_width = width / 8;
const plank_height = 0.6;
const handle_length = 2.2;
const handle_height = 0.8;

let box = function() {

  let h = height;
  let w = width;
  let ph = plank_height;
  let pw = plank_width;

  let body = cube([ width, depth, height ], true);
  let plank = cube([ plank_width, depth, plank_height ], true);

  return union(
    body,
    plank.translate([  0.4 * w - pw, 0, h / 2 + ph / 2 ]),
    plank.translate([ -0.4 * w + pw, 0, h / 2 + ph / 2 ]),
    plank.translate([  0.4 * w, 0, - h / 2 - ph / 2 ]),
    plank.translate([ -0.4 * w, 0, - h / 2 - ph / 2 ]),
  );
}();

export default box;

