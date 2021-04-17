import calc from "../calculus/index.js";

export default class Planet {
  constructor({
    r = 10,
    mass = 1,
    color = "black",
    position = new calc.Matrix(1, 2),
    velocity = new calc.Matrix(1, 2),
    acceleration = new calc.Matrix(1, 2),
  }) {
    this._r = r;
    this._mass = mass;
    this._color = color;
    this._position = position;
    this._velocity = velocity;
    this._acceleration = acceleration;
    this.constantForce = new calc.Matrix(1, 2);
  }

  get position() {
    return { x: this._position.get(1, 1), y: this._position.get(1, 2) };
  }
  get positionVector() {
    return this._position;
  }
  get r() {
    return this._r;
  }
  get mass() {
    return this._mass;
  }
  get velocity() {
    return this._velocity;
  }
  get acceleration() {
    return this._acceleration;
  }
  get color() {
    return this._color;
  }

  set acceleration(acceleration) {
    this._acceleration = acceleration;
  }
  set velocity(velocity) {
    this._velocity = velocity;
  }
  // force has to be a 1x2 vector
  applyForce(force) {
    this._acceleration = calc.add(this._acceleration, force);
  }

  addConstantForce(vector) {
    this.constantForce = calc.add(this.constantForce, vector);
  }
  move() {
    // console.log(
    //   "adding ",
    //   JSON.stringify(this._velocity.cells),
    //   " and ",
    //   JSON.stringify(this._position.cells)
    // );
    this._velocity = calc.add(this._velocity, this._acceleration);
    this._position = calc.add(this._position, this._velocity);
  }
}
