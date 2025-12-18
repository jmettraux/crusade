
// t_tough.js

import { Manifold } from 'manifold-3d/manifoldCAD';

// ** manowar 0.9.0 **
// 9c075bbb4b583986ad6a4fd64364b06fea8e7854
// 2025-12-16 20:35:32 +0900
var Manowar = (function() {"use strict";this.VERSION = '0.9.0';let self = this;
  let slicedCylinder = function(height, radiusLo, radiusHi, angle, circularSegments, center) {let h1 = 1.5 * height;let rr = Math.max(radiusLo, radiusHi) + 0.2;let cyl = Manifold.cylinder(height, radiusLo, radiusHi, circularSegments, center);let cub = Manifold.cube([ rr, rr, h1 ], true).translate([ rr / 2, rr / 2, 0 ]);let qua = Manifold.intersection(cyl, cub);let sli = angle % 90;let ang = angle - sli;let pieces = [];let a = 0;for (; a < ang; a += 90) {pieces.push(qua.rotate([ 0, 0, a ]));}if (sli > 0) {let slc = qua.subtract(cub.rotate([ 0, 0, sli ]));pieces.push(slc.rotate([ 0, 0, a ]));}return Manifold.union(pieces);};
  let padd = function(pa, pb) { return pa.map((n, i) => n + pb[i]); };
  let pmul = function(factor, p) { return p.map(n => factor * n); };
  let bezierChoose = function(n, k) {return k === 0 ? 1 : (n * bezierChoose(n - 1, k -1)) / k;};
  let bezierPoint = function(points, t, i, c) {let pl = points.length;if (pl === i) return c;return bezierPoint(points,t,i + 1,padd(c,pmul(bezierChoose(pl - 1, i) *Math.pow(t, i) *Math.pow(1 - t, pl - i - 1),points[i])));};
  let bezierPoints = function(controlPoints, sampleCount) {let a = [];for (let t = 0, d = 1.0 / sampleCount; t <= 1.0; t += d) {a.push(bezierPoint(controlPoints, t, 0, [ 0, 0, 0 ]));}return a;};
  let chainedHulls = function(elts) {let r = [];for (let i = 0, l = elts.length - 1; i < l; i++) {r.push(Manifold.hull([ elts[i], elts[i + 1] ]));}return r;};
  let chainedHull = function(elts) {return Manifold.union(chainedHulls(elts));};
  let radiatedHull = function(hubElt, elts) {let hulls = [];for (let i = 0, l = elts.length - 1; i < l; i++) {hulls.push(Manifold.hull(hubElt, elts[i], elts[i + 1]));}return Manifold.union(hulls);};
  this.slicedCylinder = slicedCylinder;
  this.bezierPoints = bezierPoints;
  this.chainedHulls = chainedHulls;
  this.chainedHull = chainedHull;
  this.radiatedHull = radiatedHull;return this;
}).apply({}); // end Manowar 0.9.0


const { cube, cylinder, hull, union } = Manifold;

const t_width = 25;
const t_height = 25;
const t_waist = t_width / 4;
const bar_thickness = 0.1 * t_height;
const pt_radius = 0.5;
const csegs = 36;

const h = 2.0;
const w2 = t_width / 2;
const h3 = t_height / 3;

const cyl = cylinder(h, pt_radius, pt_radius, csegs, true);
const cub = cube([ 2 * pt_radius, 2 * pt_radius, h ], true);

let pts = {
  north: [ 0, 0, 0 ],
  northWest: [ -w2, 0, 0 ],
  northWestSouth: [ -w2, -h3, 0 ],
  northWestControl: [ -0.75 * w2, -0.5 * h3, 0 ],
  northPit: [ -0.5 * t_waist, -bar_thickness, 0 ],
  south: [ 0, -t_height, 0 ],
  southWest: [ -0.7 * w2, -t_height, 0 ],
  southHeel: [ -0.5 * t_waist, -0.85 * t_height, 0 ],
  southWestControl: [ -0.53 * t_waist, -0.95 * t_height, 0 ],
    };

let elts = Object.entries(pts)
  .reduce(function(h, [ k, v ]) { h[k] = cyl.translate(v); return h; }, {});
elts.north = cub; // ;-)
elts.south = cub.translate(pts.south);

pts.under = Manowar.bezierPoints(
  [ pts.northWestSouth, pts.northWestControl, pts.northPit ], 6);
elts.under = pts.under.map(p => cyl.translate(p));

pts.foot = Manowar.bezierPoints(
  [ pts.southWest, pts.southWestControl, pts.southHeel ], 6);
elts.foot = pts.foot.map(p => cyl.translate(p));

let northWestHull = Manowar.radiatedHull(elts.northWest, elts.under);
let northHull = hull(elts.northWest, elts.northPit, elts.north);

let trunkHull = hull(elts.north, elts.south, elts.northPit, elts.southHeel);

let southWestHull = Manowar.radiatedHull(elts.south, elts.foot);

let left = union(northWestHull, northHull, trunkHull, southWestHull);

export default left.add(left.mirror([ 1, 0, 0 ]));

