import calc from "../calculus/index.js";
export default class Walker {
  constructor(x, y) {
    this._pos = calc.createVector(x, y);
  }

  get pos() {
    return this._pos;
  }

  update() {
    this._pos.x = this._pos.x + calc.rand(-1, 1);
    this._pos.y = this._pos.y + calc.rand(-1, 1);
  }
}
