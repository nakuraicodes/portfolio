import Matrix from "./matrix.js";

// additions
export function add(m1, m2) {
  if (m1.row !== m2.row || m1.col !== m2.col) {
    throw new Error(
      `matrices should have the same dimensions to be added, got m1 ${m1.showDimensions()} vs m2 ${m2.showDimensions()} `
    );
  }
  const cells = {};
  for (let cellIndex = 0; cellIndex < m1.nbCells; cellIndex++) {
    const cellValue = (m1.cells[cellIndex] || 0) + (m2.cells[cellIndex] || 0);
    if (cellValue) {
      cells[cellIndex] = cellValue;
    }
  }

  return new Matrix(m1.row, m1.col, cells);
}

// substractions
export function sub(m1, m2) {
  if (m1.row !== m2.row || m1.col !== m2.col) {
    throw new Error(
      `matrices should have the same dimensions to be substracted, got m1 ${m1.showDimensions()} vs m2 ${m2.showDimensions()} `
    );
  }
  const cells = {};
  for (let cellIndex = 0; cellIndex < m1.nbCells; cellIndex++) {
    const cellValue = (m1.cells[cellIndex] || 0) - (m2.cells[cellIndex] || 0);
    if (cellValue) {
      cells[cellIndex] = cellValue;
    }
  }

  return new Matrix(m1.row, m1.col, cells);
}

// multiplications
export function mul(m1, m2) {
  if (m1.col !== m2.row) {
    throw new Error(
      `matrices dimensions should be m1.col = m2.row, got m1 ${m1.showDimensions()} vs m2 ${m2.showDimensions()} `
    );
  }
  const cells = {};
  const finalRow = m1.row;
  const finalCol = m2.col;
  const cols = {};
  for (let rowIndex = 0; rowIndex < finalRow; rowIndex++) {
    const row = m1.get(rowIndex + 1, null);
    for (let colIndex = 0; colIndex < finalCol; colIndex++) {
      const cellIndex = rowIndex * finalCol + colIndex;
      if (!cols[colIndex]) {
        cols[colIndex] = m2.get(null, colIndex + 1);
      }
      const cellValue = row.reduce((currentCellValue, rowValue, index) => {
        const product = rowValue * cols[colIndex][index];
        return currentCellValue + product;
      }, 0);
      if (cellValue !== 0) {
        cells[cellIndex] = cellValue;
      }

      // deleting the column values if we are on the last iteration to free up some memory
      if (rowIndex > finalRow) {
        delete cols[colIndex];
      }
    }
  }

  return new Matrix(m1.row, m2.col, cells);
}

export function normalize(vector) {
  const magnitude = vector.magnitude;
  const normalizedVector = new Matrix(vector.row, vector.col, vector.cells);
  normalizedVector.div(magnitude);
  return normalizedVector;
}
