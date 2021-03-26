import Matrix from "./matrix.js";
export function getRandomMatrix(
  row = 1,
  col = 1,
  min = 0,
  max = 1,
  isInteger = false
) {
  let cells = {};
  const nbCells = row * col;
  for (let cellIndex = 0; cellIndex < nbCells; cellIndex++) {
    const randomNumber = rand(min, max, 0.01);
    let cellValue = round(randomNumber);
    if (isInteger) {
      cellValue = Math.floor(randomNumber);
    }
    if (cellValue !== 0) {
      cells[cellIndex] = cellValue;
    }
  }
  return new Matrix(row, col, cells);
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function rand(min, max, interval = 1) {
  var r = Math.floor((Math.random() * (max - min + interval)) / interval);
  return r * interval + min;
}
