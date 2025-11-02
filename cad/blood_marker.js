
//
// blood_marker.js
//
// via https://manifoldcad.org
//

import { Manifold } from 'manifold-3d/manifoldCAD';

// manowar.js
// 2b7a2fb321a4557b3613c9581958c5a5910bc46a
// Sun Nov  2 18:53:23 JST 2025
var Manowar = (function() {
  "use strict";
  let self = this;
  let slicedCylinder = function(
    height, radiusLo, radiusHi, angle, circularSegments, center
  ) {
    let h1 = 1.5 * height;
    let rr = Math.max(radiusLo, radiusHi) + 0.2;
    let cyl = Manifold.cylinder(
      height, radiusLo, radiusHi, circularSegments, center);
    let cub = Manifold.cube([ rr, rr, h1 ], true)
      .translate([ rr / 2, rr / 2, 0 ]);
    let qua = Manifold.intersection(cyl, cub);
    let sli = angle % 90;
    let ang = angle - sli;
    let pieces = [];
    let a = 0;
    for (; a < ang; a += 90) {
      pieces.push(qua.rotate([ 0, 0, a ]));
    }
    if (sli > 0) {
      let slc = qua.subtract(cub.rotate([ 0, 0, sli ]));
      pieces.push(slc.rotate([ 0, 0, a ]));
    }
    return Manifold.union(pieces);
  };
  this.slicedCylinder = slicedCylinder;
  return this;
}).apply({}); // end Manowar


// unit is mm

const o2 = 0.2;
const radius = 25; // almost an inch
const axis_radius = 2.5;
const cover_radius = 5;
const one_height = 2.0;
const csegs = 36; // circular segments

const { cylinder, cube, union, hull } = Manifold;

const bottom = function() {

  let h = one_height;
  let r = radius;
  let ar = axis_radius + o2;

  return cylinder(h, r, r, csegs, true)
    .subtract(cylinder(2 * h, ar, ar, csegs, true));
};

const drop = function() {

  let h = one_height;
  let r = radius;
  let cr = cover_radius;
  let ar = axis_radius;

  return Manowar.slicedCylinder(h, r, r, 300, csegs, true) // pacman
    .add(
      cylinder(h, cr, cr, csegs, true)) // cover
    .add(
      cylinder(2 * h, ar, ar, csegs, true)
        .translate([ 0, 0, 0.5 * h ])); // axis
};

export default union(
  bottom(),
  drop().translate(3.5 * radius, 0, 0));
//export default drop();

