
// rails_cfc60.js
//
// T+C scale is 1:56

// Portable Decauville system (prefabricated panels)
//
// Steel sleepers were pressed into shallow U-shapes, riveted to the rails at
// the factory.
//
// A “track panel” (rail élémentaire) consisted of two 5 m rails bolted to 5 or
// 6 steel sleepers, forming a rigid section.
//
// Parameter	Typical value
// Sleeper spacing	~0.8–1.0 m (5–6 per 5 m section)
// Sleeper width (across track)	700 mm
// Sleeper web height	40–45 mm
// Thickness of steel	3–4 mm
// Total panel weight	~100–120 kg (two men could lift it)
//
// These portable panels could be joined by fishplates and pins, allowing rapid
// assembly by hand — no ballast required.

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cube, union } = Manifold;

const scale = 56;

const sleeperWidth = 250 / scale;
const sleeperLength = 2650 / scale;
const sleeperHeight = 150 / scale;

const railHeight = 70 / scale;

const railHeadWidth = 35 / scale;
const railHeadHeight = 14 / scale;

const railBottomHeight = 14 / scale;
const railBottomWidth = 70 / scale;

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

export default rail(5_000 / scale); // 5m

