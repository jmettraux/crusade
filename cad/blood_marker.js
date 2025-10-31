
//
// blood_marker.js
//
// via https://manifoldcad.org
//


// unit is mm

const o2 = 0.2;
const radius = 25; // almost an inch
const axe_radius = 2.5;
const one_height = 2.0;
const csegs = 36; // circular segments

const { cylinder, cube, union } = Manifold;

const bottom = function() {

  let h = one_height;
  let r = radius;
  let ar = axe_radius + o2;

  return cylinder(h, r, r, csegs, true)
    .subtract(cylinder(2 * h, ar, ar, csegs, true));
};

const drop = function() {

  return cube([ 5, 5, 5 ], true);
};

export default union(
  bottom(),
  drop().translate(50, 0, 0));

