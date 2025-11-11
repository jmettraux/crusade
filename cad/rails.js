
// rails.js
//
// T+C scale is 1:56

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cube, union } = Manifold;

const scale = 56;

const sleeperWidth = 250 / scale;
const sleeperLength = 2650 / scale;
const sleeperHeight = 150 / scale;

const railHeight = 160 / scale;

//const railHeadWidth = 70 / scale;
const railHeadHeight = 37 / scale;
const railHeadWidth = 1.3;

const railBottomHeight = 16 / scale;
//const railBottomWidth = 160 / scale;
const railBottomWidth = 155 / scale;

//const railWebThickness = 16 / scale;
const railWebThickness = 0.3;

//console.log({ railWebThickness, railHeight, railHeadWidth });


const rail = function(length) {

  let head = cube([ railHeadWidth, length, railHeadHeight ], true)
    .translate([ 0, 0, 0.5 * railHeight - 0.5 * railHeadHeight ]);

  let web = cube([ railWebThickness, length, railHeight ], true);

  let bottom = cube([ railBottomWidth, length, railBottomHeight ], true)
    .translate([ 0, 0, -0.5 * railHeight + 0.5 * railBottomHeight ]);

  return union(head, web, bottom);
};

const sleeper = function() {

  return cube([ sleeperLength, sleeperWidth, sleeperHeight ], true);
};


//export default sleeper();

//export default rail(50 * 1000 / scale); // 50m
export default rail(3_000 / scale); // 3m

