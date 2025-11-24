
//
// magnet_box.js
//
// via https://manifoldcad.org
//

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, union } = Manifold;


// unit is mm

const o2 = 0.2;
const bd = 5 + o2;
const br = bd / 2;

const chamberRadius = br + 3 * o2;
const chamberHeight = chamberRadius + 2;

const bulletRadius = chamberRadius + 1.6;
const bulletHeight = chamberHeight + 1.6;

const wingWidth = br;
const wingThickness = 0.6;
const wingHeight = 0.5 * bulletHeight;

const csegs = 36;

let bullet =
  cylinder(bulletHeight, bulletRadius, bulletRadius, csegs, true);

let dy = 0.4;

bullet = bullet.add(
  cube([ wingWidth, wingThickness, wingHeight ], true)
    .rotate([
      -30, 0, 0 ])
    .translate([
      0, bulletRadius + dy, 0.5 * wingHeight - 0.5 * bulletHeight ]));
bullet = bullet.add(
  cube([ wingWidth, wingThickness, wingHeight ], true)
    .rotate([
      30, 0, 0 ])
    .translate([
      0, - bulletRadius - dy, 0.5 * wingHeight - 0.5 * bulletHeight ]));

let chamber =
  cylinder(chamberHeight, chamberRadius, chamberRadius, csegs, true);

let box = bullet.subtract(chamber);

export default box;

