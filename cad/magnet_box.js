
//
// magnet_box.js
//
// via https://manifoldcad.org
//

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cylinder, union } = Manifold;


// unit is mm

const o2 = 0.2;
//const br = 1.7; // ball diameter
const br = 1.7;
const bd = 2 * br;

const chamberRadius = 4.2 / 2;
const chamberHeight = 2 * chamberRadius;
const bulletRadius = chamberRadius + 2.8 * 0.4;
const bulletHeight = 1.9 * bulletRadius;

const csegs = 36;

let bullet =
  cylinder(bulletHeight, bulletRadius, bulletRadius, csegs, true);
let chamber =
  cylinder(chamberHeight, chamberRadius, chamberRadius, csegs, true);

export default bullet.subtract(chamber);

