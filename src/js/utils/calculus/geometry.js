import Matrix from "./matrix.js";
export function get2DVector() {
  return new Matrix(1, 2);
}
export function get3DVector() {
  return new Matrix(1, 2);
}

export function createVector(x, y, z) {
  let vector = null;
  if (z) {
    vector = new Matrix(1, 3);
  } else {
    vector = new Matrix(1, 2);
  }
  vector.set(1, 1, x);
  vector.set(1, 2, y);
  if (z) {
    vector.set(1, 3, z);
  }
  return vector;
}
