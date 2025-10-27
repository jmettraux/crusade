
//
// magnet_bullet.scad
//
// via https://manifoldcad.org
//


// unit is mm

//module bullet() {
//
//  module balcyl() {
//    cylinder(r=br + 2 * o2, h=hh - 4 * o2, center=true, $fn=36);
//  }
//
//  balcyl();
//  //difference() {
//  //  cylinder(r=hr, h=hh, center=true, $fn=6);
//  //  union() {
//  //    balcyl();
//  //    for (a = [ 30 : 60 : 330 ]) {
//  //      rotate([ 0, 0, a ])
//  //        translate([ hr1 - br - 4 * o2, 0, 0 ])
//  //          balcyl();
//  //    }
//  //  }
//  //}
//}

const o2 = 0.2;
const br = 1.7; // ball diameter
const hh = 5;
const hr = 32.33;

const { cylinder } = Manifold;

const balcyl = function() {
  let r = br + 2 * o2;
  let h = hh - 4 * o2;
  return cylinder(h, r, r, 36, true); };

let result = balcyl();

