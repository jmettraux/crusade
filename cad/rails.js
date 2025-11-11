
// rails.js
//
// T+C scale is 1:56

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cube } = Manifold;

const scale = 56;

const sleeperWidth = 250 / scale;
const sleeperLength = 2650 / scale;
const sleeperHeight = 150 / scale;

const railHeight = 160 / scale;
const railHeadWidth = 70 / scale;
const railHeadHeight = 37 / scale;
const railBottomHeight = 16 / scale;
const railBottomWidth = 160 / scale;
const railWebThickness = 16 / scale;

const rail = function(length) {

  // TODO
};

const sleeper = function() {

  return cube([ sleeperLength, sleeperWidth, sleeperHeight ], true);
};

export default sleeper();

