
//
// magnet_bullet.js
//
// via https://manifoldcad.org
//


// unit is mm

const o2 = 0.2;
//const br = 1.7; // ball diameter
const bd = 3; // 3mm or 0.1in

//console.log('h', bd + 4.5 * o2);

const { cylinder } = Manifold;

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

//let result = bullet();
let result = bullet().subtract(magnetChamber());

export default result;

