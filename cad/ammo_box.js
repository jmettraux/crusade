
// ammo_box.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube } = Manifold;
const { union } = Manifold;

const o1 = 0.1;
const o2 = 0.2;
const height = 10;
const width = 20;
const depth = 14;
const plank_width = width / 8;
const plank_height = 0.6;
const handle_length = 2.2;
const handle_height = 0.8;
const handle_thickness = 0.3;
const csegs = 36;

let box = function(h = height, w = width, d = depth) {

  let ph = plank_height;
  let pw = plank_width;

  let body = cube([ w, d, h ], true);
  let plank = cube([ pw, d, ph ], true);

  let wgap =
    cylinder(1.1 * width, o2, o2, csegs, true)
      .rotate([ 0, 90, 0 ])
  let dgap =
    wgap.rotate([ 0, 0, 90 ]);

  body = body
    .subtract(wgap.translate([ 0, - d / 2 + o2 / 2, h / 2 - ph ]))
    .subtract(wgap.translate([ 0, + d / 2 - o2 / 2, h / 2 - ph ]))
    .subtract(dgap.translate([ - w / 2, 0, h / 2 - ph ]))
    .subtract(dgap.translate([ + w / 2, 0, h / 2 - ph ]));

  return union(
    body,
    plank.translate([  0.4 * w, 0, h / 2 + ph / 2 ]),
    plank.translate([ -0.4 * w, 0, h / 2 + ph / 2 ]),
    plank.translate([  0.4 * w - pw - o2, 0, - h / 2 - ph / 2 ]),
    plank.translate([ -0.4 * w + pw + o2, 0, - h / 2 - ph / 2 ]),
  );
};

export default box();

