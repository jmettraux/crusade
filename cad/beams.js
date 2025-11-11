
// beams.js
//
// T+C scale is 1:56

import { Manifold } from 'manifold-3d/manifoldCAD';
const { cube } = Manifold;

const scale = 56;

const height = 200 / scale;
const width = 200 / scale;
const thickness = 16 / scale;

const beam = function(length) {

  // TODO
};

export default beam(2000 / scale); // 2m long beam

