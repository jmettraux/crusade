
//
// magnet_bullet.js
//
// via https://manifoldcad.org
//

import { Manifold } from 'manifold-3d/manifoldCAD';


// unit is mm

const o2 = 0.2;
//const br = 1.7; // ball diameter
const bd = 3; // 3mm or 0.1in

//console.log('h', bd + 4.5 * o2);

const { cylinder, cube, union } = Manifold;

const magnetChamber = function() {
  let r = bd * 0.5 + 2 * o2;
  let h = bd + 2 * o2;
  return cylinder(h, r, r, 36, true); };
const bullet = function() {
  let r = bd * 0.5 + 4.5 * o2;
  let h = bd + 4.5 * o2;
  let body = cylinder(h, r, r, 36, true);
  let head = cylinder(h, r, 0, 36, true).translate(0, 0, h);
  return body.add(head); };

const unit = function(x, y) {
  return bullet().subtract(magnetChamber()).translate(x, y, 0);
};

const xx = 4;
const yy = 3;

const dx = bd + 10 * o2;

const items = [];

//
// draw bullets

for (let x = 0; x < xx; x++) {
  for (let y = 0; y < yy; y++) {
    items.push(unit(x * dx, y * dx));
  }
}

//
// draw support grid

const dz = - 0.5 * (bd + 4.5 * o2) + 1 * o2;

for (let x = 0; x < xx - 1; x++) {
  for (let y = 0; y < yy; y++) {
    items.push(
      cube([ dx, 4 * o2, 2 * o2 ], true)
        .translate((x + 0.5) * dx, y * dx, dz));
  }
}
for (let x = 0; x < xx; x++) {
  for (let y = 0; y < yy - 1; y++) {
    items.push(
      cube([ 4 * o2, dx, 2 * o2 ], true)
        .translate(x * dx, (y + 0.5) * dx, dz));
  }
}


export default union(items);

