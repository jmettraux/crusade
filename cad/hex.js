
// cad/hex.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder } = Manifold;

const o2 = 0.2;


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


let slice = Manowar.slicedCylinder(3, 160, 160, 60, 6, true);
slice = slice.add(slice.rotate([ 0, 0, 60 ]));

let r1 = 160 / 5;

let plus = cylinder(3, r1 - o2, r1 - o2, 6, true)
  .translate([ 160 / 2, 0, 0 ]);

let minus = cylinder(4, r1 + o2, r1 + o2, 6, true)
  .translate([ 160 / 2, 0, 0 ])
  .rotate([ 0, 0, 120 ]);


//export default cylinder(3, 160, 160, 6, true);
export default slice.add(plus).subtract(minus);

