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
}
