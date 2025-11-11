
// bases.js
//
// 40mm big guys
// 32mm lieutenant, staff
// 25mm yeomen, meat

import { Manifold } from 'manifold-3d/manifoldCAD';

const { cylinder } = Manifold;

const o2 = 0.2; // mm

const diameter = 25; // mm
//const diameter = 32; // mm
//const diameter = 40; // mm

const slope = 0.42; // rtop = rbottom - slope;
const thick = 2.1; // mm
const csegs = 2 * 36;

const magnet_height = 1.0 + 0.3; // +0.2 resin / +0.3 pla
const magnet_radius = 1.5 + 0.29; // +0.1 resin / +0.29 pla
  //
  // from wargame.scad

const height = 3; // mm

const magnetHole = function() {

  let mr = magnet_radius;
  let tr = mr + 3.5 * o2;

  let tube = cylinder(height, tr, tr, csegs, true);
  let hole = cylinder(magnet_height + 1, mr, mr, csegs, true);

  return tube.subtract(hole.translate([ 0, 0, -1 ]));
};

const base = function(d) {

  let r0 = 0.5 * d;
  let r1 = r0 - slope;

  let base = cylinder(height, r0, r1, csegs, true);
  let anti = cylinder(height, r0 - 1, r1 - 1, csegs, true);
  base = base.subtract(anti.translate([ 0, 0, -1 ]));

  base = base.add(magnetHole());
  for (let a = 0; a < 360; a += 360 / 6) {
    base = base.add(
      magnetHole().translate([ 0.63 * r0, 0, 0 ]).rotate([ 0, 0, a ]));
  }

  return base;
};

//export default magnetHole();
export default base(diameter);

