
// activated.js
//
// indicates "as already been activated"

import { Manifold } from 'manifold-3d/manifoldCAD';

const { cube } = Manifold;

let l = 25 + 2;
let w = 4.0;
let h = 2.0;

let bar = cube([ l, w, h ], true);

export default bar.add(bar.rotate([ 0, 0, 90 ]));

