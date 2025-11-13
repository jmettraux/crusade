
// bases.js
//
// 40mm big guys
// 32mm lieutenant, staff
// 25mm yeomen, meat

import { Manifold, show, only } from 'manifold-3d/manifoldCAD';

const { cylinder, cube } = Manifold;

const o2 = 0.2; // mm

const SIZES = {
  M:  { d: 25, a: 360 /  6, f0: 0.7, f1: 0,   r: 'xxv',   rf: 0.5, ra:  0 },
  L:  { d: 32, a: 360 /  6, f0: 0.7, f1: 0,   r: 'xxxii', rf: 0.2, ra: 30 },
  XL: { d: 40, a: 360 /  6, f0: 0.7, f1: 0.4, r: 'xl',    rf: 0.5, ra:  0 },
  V:  { d: 50, a: 360 /  9, f0: 0.7, f1: 0.4, r: 'l',     rf: 0.5, ra:  0 },
  VI: { d: 60, a: 360 / 12, f0: 0.7, f1: 0.4, r: 'lx',    rf: 0.5, ra:  0 },
    };

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

const rom = { thk: 0.4, len: 5 };
rom.len1 = Math.sqrt(0.5 * rom.len * rom.len);
  //
//const romW = function(r) {
//  let b = r.boundingBox(); return b.max[0] - b.min[0]; };
const romMaxX = function(r) {
  return r.boundingBox().max[0]; };
  //
rom.x = function() {
  let bar = cube([ rom.thk, rom.len, height ], true)
  return bar.rotate([ 0, 0, 45 ]).add(bar.rotate([ 0, 0, -45 ]));
};
rom.v = function() {
};
rom.i = function() {
  let bar = cube([ rom.thk, rom.len1, height ], true)
  return bar;
};
rom.l = function() {
};
const roman = function(s) {
  return(
    Array.from(s.toLowerCase())
      .map(c => (rom[c] || rom.i)())
      .reduce(
        function(r, c) {
          return r.add(c.translate([ 2 * romMaxX(r) + 0.2, 0, 0 ]));
        })
          );
};

const base = function(size) {

  let s = SIZES[size];
  if ( ! s) throw new Error(`found no size named "${size}"`);

  let r0 = 0.5 * s.d;
  let r1 = r0 - slope;

  let base = cylinder(height, r0, r1, csegs, true);
  let anti = cylinder(height, r0 - 1, r1 - 1, csegs, true);
  base = base.subtract(anti.translate([ 0, 0, -1 ]));

  base = base.add(magnetHole());
    //
  for (let a = 0; a < 360; a += s.a) {
    base = base.add(
      magnetHole().translate([ s.f0 * r0, 0, 0 ]).rotate([ 0, 0, a ]));
  }
    //
  if (s.f1) for (let a = s.a / 2; a < 360; a += s.a) {
    base = base.add(
      magnetHole().translate([ s.f1 * r0, 0, 0 ]).rotate([ 0, 0, a ]));
  }

  base = base.add(
    roman(s.r)
      .translate([ s.rf * r0, 0, 0 ])
      .rotate([ 0, 0, s.ra ]));

  return base;
};

//export default magnetHole();
export default base('L');

