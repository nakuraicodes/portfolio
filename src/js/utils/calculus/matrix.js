export default class Matrix {
  constructor(row, col, cells = {}) {
    this._row = row || 1;
    this._col = col || 1;
    this._nbCells = this._row * this._col;
    this._cells = cells;
  }

  get nbCells() {
    return this._nbCells;
  }
  get row() {
    return this._row;
  }
  get col() {
    return this._col;
  }
  get dimension() {
    return { row: this._row, col: this._col };
  }
  get cells() {
    return this._cells;
  }

  // for vectors, get the 1,1 cell
  get x() {
    return this._cells["0"] || 0;
  }
  // for vectors, get the 1,2 cell
  get y() {
    return this._cells["1"] || 0;
  }
  // for vectors, get the 1,2 cell
  get z() {
    return this._cells["2"] || 0;
  }
  // for vectors, set the 1,1 cell
  set x(value) {
    this._cells["0"] = value;
  }
  // for vectors, set the 1,2 cell
  set y(value) {
    this._cells["1"] = value;
  }
  // for vectors, set the 1,2 cell
  set z(value) {
    this._cells["2"] = value;
  }

  get magnitude() {
    if (this._row === 1) {
      const squaredSum = this.get(1, null).reduce(
        (acc, currentValue) => acc + currentValue * currentValue,
        0
      );
      return Math.sqrt(squaredSum);
    } else {
      throw new Error(
        "impossible to calculate the magnitude for number of row = ",
        this._row
      );
    }
  }

  showDimensions() {
    return `(${this._row},${this._col})`;
  }

  showMatrix() {
    let res = "[\n";
    for (let cellIndex = 0; cellIndex < this._nbCells; cellIndex++) {
      res += " ";
      res += this._cells[cellIndex] || "0";
      if ((cellIndex + 1) % this._col === 0) {
        res += "\n";
      }
    }
    res += "]";
    console.log(res);
  }

  set(row, col, value) {
    try {
      const indexCell = (row - 1) * this._col + (col - 1);
      this._cells[indexCell] = value;
    } catch (error) {
      console.log("ERROR ", error.message);
    }
  }

  get(row, col) {
    try {
      let res = null;
      if (row) {
        row = row - 1;
        const rowValues = this._getRow(row);
        if (col) {
          res = rowValues[col - 1];
        } else {
          res = rowValues;
        }
      } else if (col) {
        col = col - 1;
        res = this._getCol(col);
      } else {
        console.log("nothing to do");
      }

      return res;
    } catch (error) {
      console.log("ERROR ", error.message);
    }
  }

  _getRow(row) {
    const rowValues = [];
    const firstCellOfRow = row * this._col;
    for (let cellIndex = 0; cellIndex < this._col; cellIndex++) {
      rowValues.push(this._cells[firstCellOfRow + cellIndex] || 0);
    }
    return rowValues;
  }

  _getCol(col) {
    const colValues = [];
    for (
      let cellIndex = col;
      cellIndex < this._nbCells;
      cellIndex += this._col
    ) {
      colValues.push(this._cells[cellIndex] || 0);
    }
    return colValues;
  }

  div(number) {
    var cellIndexes = Object.keys(this._cells);
    for (var i = 0; i < cellIndexes.length; i++) {
      const cellIndex = cellIndexes[i];
      this._cells[cellIndex] = this._cells[cellIndex] / number;
    }
  }

  // TODO: test for mul
  mul(number) {
    var cellIndexes = Object.keys(this._cells);
    for (var i = 0; i < cellIndexes.length; i++) {
      const cellIndex = cellIndexes[i];
      this._cells[cellIndex] = this._cells[cellIndex] * number;
    }
  }
}
