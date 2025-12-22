
// barrel.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube } = Manifold;
const { union } = Manifold;

const height = 16;
const radius = 11 / 2;
const r0 = 0.95 * radius;
const csegs = 2 * 36;

let barrel = function() {

  let rh = height / 20;
  let dz = (height - rh) / 3;
  let dz1 = rh * 0.21;

  let core =
    cylinder(height, r0, r0, csegs, false);
  let rib =
    cylinder(rh, radius, radius, csegs, false)
      .subtract(cylinder(1.1 * rh, r0, r0, csegs, false));
  let bung =
    cylinder(rh, r0 / 10, r0 / 10, csegs, false);

  return core
    .add(rib.translate([ 0, 0, -dz1 ]))
    .add(rib.translate([ 0, 0, 1 * dz ]))
    .add(rib.translate([ 0, 0, 2 * dz ]))
    .add(rib.translate([ 0, 0, 3 * dz + dz1 ]))
    .add(bung.translate([ 0.7 * radius, 0, 0.97 * height ]));
}();

let half =
  cube([ 2.0 * radius, 2.0 * radius, 1.1 * height ])
    .translate([ -radius, 0, -0.05 * height ]);
let west = barrel.subtract(half.translate([ 0, 0, 0 ]));
let east = barrel.subtract(half.translate([ 0, -2 * radius, 0 ]));

export default union(
  west.rotate([ 0, 0, -90 ]),
  east.rotate([ 0, 0, 90 ]).translate([ 0, 2.05 * radius, 0 ]));

