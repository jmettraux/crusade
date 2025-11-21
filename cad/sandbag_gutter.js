
// cad/sandbag_gutter.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cube, union } = Manifold;

// unit is mm

const o2 = 0.2;

const gap = 1;
const bagLength = 10;
const bagWidth = 5;
const bagHeight = 4;
const bagCount = 14;
const thickness = 1;
const gutterLength = bagLength * bagCount + gap * (bagCount - 1);
const gutterWidth = thickness + bagWidth + thickness;

const t2 = 0.5 * thickness;

let gutter = function() {

  let g = cube([ gutterLength, gutterWidth, thickness ], true)
    .translate([ 0, 0, - (0.5 * bagHeight + 0.5 * thickness) ]);

  let teeth = cube([ bagLength, thickness, bagHeight ], true);

  let x0 = -0.5 * gutterLength + 0.5 * bagLength;
  let w = 0.5 * bagWidth + t2;

  for (let i = 0; i < bagCount; i++) g = g
    .add(teeth.translate([ x0 + i * (bagLength + gap), -w, 0 ]))
    .add(teeth.translate([ x0 + i * (bagLength + gap), +w, 0 ]));

  return g;
};

export default gutter();

