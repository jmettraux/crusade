
//
// magnet_box.js
//
// via https://manifoldcad.org
//

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cylinder, union } = Manifold;


// unit is mm

const o2 = 0.2;
const bd = 5 + o2;
const br = bd / 2;

const chamberRadius = br + 3 * o2;
const chamberHeight = chamberRadius + 2;

const bulletRadius = chamberRadius + 1.6;
const bulletHeight = chamberHeight + 1.6;

const csegs = 36;

let bullet =
  cylinder(bulletHeight, bulletRadius, bulletRadius, csegs, true);
let chamber =
  cylinder(chamberHeight, chamberRadius, chamberRadius, csegs, true);

export default bullet.subtract(chamber);

