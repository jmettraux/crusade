
//
// magnet_bullet.js
//
// via https://manifoldcad.org
//

import { Manifold } from 'manifold-3d/manifoldCAD';


// unit is mm

const o2 = 0.2;
//const br = 1.7; // ball diameter
const br = 1.7;
const bd = 2 * br;

const csegs = 36;

const chamberRadius = 4.2 / 2;
const chamberHeight = 2 * chamberRadius;
const bulletRadius = 5.6 / 2;
const bulletHeight = 1.9 * bulletRadius;
const headHeight = 4.2;

const { cylinder, union } = Manifold;

let bullet =
  cylinder(bulletHeight, bulletRadius, bulletRadius, csegs, true)
    .add(
      cylinder(headHeight, bulletRadius, 0.1, csegs, true)
        .translate([ 0, 0, 0.5 * bulletHeight + 0.5 * headHeight ]));
let chamber =
  cylinder(chamberHeight, chamberRadius, chamberRadius, csegs, true);

export default bullet.subtract(chamber);

