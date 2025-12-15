
// t_tough.js

import { Manifold } from 'manifold-3d/manifoldCAD';

// ** manowar 0.9.0 **
// 57c2493d64fd93ae929761a7dc1b6a8d648e1888
// 2025-12-15 17:54:44 +0900
var Manowar = (function() {"use strict";this.VERSION = '0.9.0';let self = this;
  let slicedCylinder = function(height, radiusLo, radiusHi, angle, circularSegments, center) {let h1 = 1.5 * height;let rr = Math.max(radiusLo, radiusHi) + 0.2;let cyl = Manifold.cylinder(height, radiusLo, radiusHi, circularSegments, center);let cub = Manifold.cube([ rr, rr, h1 ], true).translate([ rr / 2, rr / 2, 0 ]);let qua = Manifold.intersection(cyl, cub);let sli = angle % 90;let ang = angle - sli;let pieces = [];let a = 0;for (; a < ang; a += 90) {pieces.push(qua.rotate([ 0, 0, a ]));}if (sli > 0) {let slc = qua.subtract(cub.rotate([ 0, 0, sli ]));pieces.push(slc.rotate([ 0, 0, a ]));}return Manifold.union(pieces);};
  let padd = function(pa, pb) { return pa.map((n, i) => n + pb[i]); };
  let pmul = function(factor, p) { return p.map(n => factor * n); };
  let bezierChoose = function(n, k) {return k === 0 ? 1 : (n * bezierChoose(n - 1, k -1)) / k;};
  let bezierPoint = function(points, t, i, c) {let pl = points.length;if (pl === i) return c;return bezierPoint(points,t,i + 1,padd(c,pmul(bezierChoose(pl - 1, i) *Math.pow(t, i) *Math.pow(1 - t, pl - i - 1),points[i])));};
  let bezierPoints = function(controlPoints, sampleCount) {let a = [];for (let t = 0, d = 1.0 / sampleCount; t <= 1.0; t += d) {a.push(bezierPoint(controlPoints, t, 0, [ 0, 0, 0 ]));}return a;};
  let chainedHulls = function(elts) {let r = [];for (let i = 0, l = elts.length - 1; i < l; i++) {r.push(Manifold.hull([ elts[i], elts[i + 1] ]));}return r;};
  let chainedHull = function(elts) {return Manifold.union(chainedHulls(elts));};
  this.slicedCylinder = slicedCylinder;
  this.bezierPoints = bezierPoints;
  this.chainedHulls = chainedHulls;
  this.chainedHull = chainedHull;return this;
}).apply({}); // end Manowar 0.9.0


const { cube, cylinder, hull, union } = Manifold;

const t_width = 25;
const t_height = 25;
const t_waist = t_width / 3;
const bar_thickness = t_height / 6;
const pt_radius = 0.1;
const csegs = 36;

const h = 2.0;
const w2 = t_width / 2;
const h3 = t_height / 3;

const pnt = cylinder(h, pt_radius, pt_radius, csegs, true);
const cub = cube([ 2 * pt_radius, 2 * pt_radius, h ], true);

const north = cub;
const northWest = pnt.translate([ -w2, 0, 0 ]);
const nw_f = [ -w2, -h3, 0 ];
const cp = [ -0.75 * w2, - 0.5 * h3, 0 ];
const pit = [ - t_waist / 2, -bar_thickness, 0 ];

const under = Manowar.bezierPoints([ nw_f, cp, pit ], 6);
const underPnts = under.map(p => pnt.translate(p));
const underHull = Manowar.chainedHull(underPnts);

export default underHull;

