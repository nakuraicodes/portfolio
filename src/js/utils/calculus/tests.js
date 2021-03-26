import calc from "./index.js";

let testResult = { failed: 0, taken: 0 };
let testError = "";

function fail(msg) {
  testError += "- " + msg + "\n";
  testResult.failed++;
}

try {
  // basic matrix init
  let m = new calc.Matrix(4, 3);
  testResult.taken++;
  if (m.dimension.row !== 4) {
    fail("wrong row assignment got " + m.dimension.row + " instead of 4");
  }

  testResult.taken++;
  if (m.dimension.col !== 3) {
    fail("wrong col assignment got " + m.dimension.col + " instead of 3");
  }
  m = new calc.Matrix(4, 3, { 0: 1, 2: 3 });
  testResult.taken++;
  if (m.cells[0] !== 1 || m.cells[2] !== 3) {
    fail("wrong cells assignment. cells: " + JSON.stringify(m.cells));
  }
  // get specific index
  m = new calc.Matrix(4, 3, {
    0: 1,
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 3,
    7: 3,
    8: 3,
    9: 4,
    10: 4,
    11: 4,
  });
  testResult.taken++;
  const zeroZero = m.get(1, 1);
  if (zeroZero !== 1) {
    fail("wrong value, should be 1 got " + zeroZero);
  }
  testResult.taken++;
  const fourThree = m.get(4, 3);
  if (fourThree !== 4) {
    fail("wrong value, should be 4 got " + fourThree);
  }
  testResult.taken++;
  const rowTwo = m.get(2, null);
  if (
    rowTwo.length !== 3 ||
    rowTwo[0] !== 2 ||
    rowTwo[1] !== 2 ||
    rowTwo[2] !== 2
  ) {
    fail("wrong value, should be [2,2,2] got " + JSON.stringify(rowTwo));
  }
  testResult.taken++;
  const columnTwo = m.get(null, 2);
  if (
    columnTwo.length !== 4 ||
    columnTwo[0] !== 1 ||
    columnTwo[1] !== 2 ||
    columnTwo[2] !== 3 ||
    columnTwo[3] !== 4
  ) {
    fail("wrong value, should be [1,2,3,4] got " + JSON.stringify(columnTwo));
  }
  // random integer matrices
  testResult.taken++;
  m = new calc.getRandomMatrix(4, 3, 0, 1, true);
  for (let cellIndex in m.cells) {
    let cellValue = m.cells[cellIndex];
    if (cellValue !== 0 && cellValue !== 1) {
      fail("all cells should be either 0 or 1, got " + cellValue);
    }
  }
  // random float matrices
  testResult.taken++;
  m = new calc.getRandomMatrix(4, 3, 0.2, 0.2, false);
  for (let cellIndex in m.cells) {
    let cellValue = m.cells[cellIndex];
    if (cellValue !== 0.2) {
      fail("all cells should be equal to 0.2, got " + cellValue);
      break;
    }
  }
  // matrices operations

  // additions
  testResult.taken++;
  let m1 = new calc.getRandomMatrix(2, 2, 1, 1, true);
  let m2 = new calc.getRandomMatrix(3, 2, 1, 1, true);
  try {
    let res = calc.add(m1, m2);
    fail(
      "m1 and m2 don't have the right dimension, add() should throw an error here."
    );
  } catch (error) {}

  testResult.taken++;
  m2 = new calc.getRandomMatrix(2, 2, 1, 1, true);
  let res = calc.add(m1, m2);
  for (let cellIndex in res.cells) {
    let cellValue = res.cells[cellIndex];
    if (cellValue !== 2) {
      fail("all cells should be equal to 2, got " + cellValue);
      break;
    }
  }

  // substractions
  testResult.taken++;
  m1 = new calc.getRandomMatrix(2, 2, 2, 2, true);
  m2 = new calc.getRandomMatrix(3, 2, 0, 0, true);
  try {
    let res = calc.sub(m1, m2);
    fail(
      "m1 and m2 don't have the right dimension, sub() should throw an error here."
    );
  } catch (error) {}

  testResult.taken++;
  m2 = new calc.getRandomMatrix(2, 2, 1, 1, true);
  res = calc.sub(m1, m2);
  for (let cellIndex in res.cells) {
    let cellValue = res.cells[cellIndex];
    if (cellValue !== 1) {
      fail("all cells should be equal to 1, got " + cellValue);
      break;
    }
  }

  testResult.taken++;
  m2 = new calc.getRandomMatrix(2, 2, 2, 2, true);
  res = calc.sub(m1, m2);
  if (Object.keys(res.cells).length !== 0) {
    fail(
      "0 values should not be saved in the matrix memory, got " +
        JSON.stringify(res.cells)
    );
  }

  // multiplications
  testResult.taken++;
  m1 = new calc.getRandomMatrix(4, 3, 2, 2, true);
  m2 = new calc.getRandomMatrix(4, 3, 0, 0, true);
  try {
    let res = calc.mul(m1, m2);
    fail(
      "m1 and m2 don't have the right dimensions, mul() should throw an error here."
    );
  } catch (error) {}

  testResult.taken++;
  m2 = new calc.getRandomMatrix(3, 5, 1, 1, true);
  res = calc.mul(m1, m2);

  testResult.taken++;
  if (res.row != m1.row) {
    fail("wrong number of cols, should be " + m1.row + ", got " + res.col);
  }

  testResult.taken++;
  if (res.col != m2.col) {
    fail("wrong number of rows, should be " + m2.col + ", got " + res.row);
  }

  testResult.taken++;
  m1 = new calc.Matrix(2, 3, {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
  });
  m2 = new calc.Matrix(3, 2, {
    0: 7,
    1: 8,
    2: 9,
    3: 10,
    4: 11,
    5: 12,
  });
  let expected = {
    0: 58,
    1: 64,
    2: 139,
    3: 154,
  };
  res = calc.mul(m1, m2);
  for (let cellIndex in res.cells) {
    const cellValue = res.cells[cellIndex];
    const expectedValue = expected[cellIndex];
    if (cellValue !== expectedValue) {
      fail("failed, expected " + expectedValue + ", got " + cellValue);
      break;
    }
  }

  testResult.taken++;
  m1 = new calc.Matrix(1, 3, {
    0: 3,
    1: 4,
    2: 2,
  });
  m2 = new calc.Matrix(3, 4, {
    0: 13,
    1: 9,
    2: 7,
    3: 15,
    4: 8,
    5: 7,
    6: 4,
    7: 6,
    8: 6,
    9: 4,
    10: 0,
    11: 3,
  });
  expected = {
    0: 83,
    1: 63,
    2: 37,
    3: 75,
  };
  res = calc.mul(m1, m2);
  for (let cellIndex in res.cells) {
    const cellValue = res.cells[cellIndex];
    const expectedValue = expected[cellIndex];
    if (cellValue !== expectedValue) {
      fail("failed, expected " + expectedValue + ", got " + cellValue);
      break;
    }
  }

  // DISPLAYING TEST RESULTS

  console.log(
    ` ${testResult.taken} tests: ${
      testResult.taken - testResult.failed
    } passed,  ${testResult.failed} failed `
  );
  if (testResult.failed > 0) {
    console.log("errors:\n" + testError);
  }
} catch (error) {
  console.log("ERROR ", error.message);
}
