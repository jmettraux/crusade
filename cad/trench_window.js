
// tremch_window.js

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cube } = Manifold;

const thickness = 0.6;
const width = 10;
const height = 4.5;
const depth = 10;

let t2 = 2 * thickness;

export default cube([ width, height, depth ], true)
  .subtract(
    cube([ width - t2, height - t2, 2 * depth ], true));

