
// ammo_box.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cube, cylinder, hull, sphere } = Manifold;
const { union } = Manifold;

const o1 = 0.1;
const o2 = 0.2;
const height = 10;
const width = 20;
const depth = 14;
const plank_width = width / 8;
const plank_height = 0.6;
const handle_length = 2.8;
const handle_thickness = 0.3;
const handle_height = 1.0 + handle_thickness;
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

  let hl = handle_length;
  let hh = handle_height;
  let ht = handle_thickness;
  let hl2 = handle_length / 2;
  let hh2 = handle_height / 2;

  let hball = sphere(ht, csegs, true);
  let hcube = cube([ 2 * ht, 2 * ht, 2 * ht ], true);
    //
  let hbsw = hball.translate([ -hl2, 0, -hh2 ]);
  let hbse = hball.translate([ +hl2, 0, -hh2 ]);
  let hbnw = hball.translate([ -hl2, 0, +hh2 ]);
  let hbne = hball.translate([ +hl2, 0, +hh2 ]);
  let hcnw = hcube.translate([ -hl2 + ht, 0, +hh2 ]);
  let hcne = hcube.translate([ +hl2 - ht, 0, +hh2 ]);
    //
  let handle = union(
    hull([ hbsw, hbse ]),
    hull([ hbsw, hbnw ]),
    hull([ hbse, hbne ]),
    hull([ hcnw, hcne ]),
      ).rotate([ 0, 0, 90 ]);
  //handle = show(handle);

  return union(
    body,
    plank.translate([  0.4 * w, 0, h / 2 + ph / 2 ]),
    plank.translate([ -0.4 * w, 0, h / 2 + ph / 2 ]),
    plank.translate([  0.4 * w - pw - o2, 0, - h / 2 - ph / 2 ]),
    plank.translate([ -0.4 * w + pw + o2, 0, - h / 2 - ph / 2 ]),
    handle.translate([  0.5 * w, 0, 0 ]),
    handle.translate([ -0.5 * w, 0, 0 ]),
  );
};

export default box();

