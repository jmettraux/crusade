
//
// magnet_bullet.js
//
// via https://manifoldcad.org
//


// unit is mm

const o2 = 0.2;
const br = 1.7; // ball diameter
const hh = 5;
const hr = 32.33;

const { cylinder } = Manifold;

const magnetChamber = function() {
  let r = br + 2 * o2;
  let h = hh - 4 * o2;
  return cylinder(h, r, r, 36, true); };
const bullet = function() {
  let r = br + 4 * o2;
  let body = cylinder(hh, r, r, 36, true);
  let head = cylinder(hh, r, 0, 36, true).translate(0, 0, hh);
  return body.add(head); };

//let result = bullet();
let result = bullet().subtract(magnetChamber());

export default result;

