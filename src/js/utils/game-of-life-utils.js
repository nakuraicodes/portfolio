export function getIndexFirstPopulation(percentage, maxIndex) {
  const nbIndividualToCreate = Math.ceil((percentage * (maxIndex + 1)) / 100);
  let activeIndexes = {};
  let nbIndexFound = 0;
  while (nbIndexFound < nbIndividualToCreate) {
    const newIndexToActivate = getRandomInt(0, maxIndex);
    if (!activeIndexes[newIndexToActivate]) {
      activeIndexes[newIndexToActivate] = 1;
      nbIndexFound++;
    }
  }
  return activeIndexes;
}

/**
 * As seen here: https://rosettacode.org/wiki/Conway%27s_Game_of_Life
 */
export function conwayGameOfLifeNextGeneration(
  currentGeneration,
  boardDimension
) {
  let newGeneration = {};
  const maxIndex = boardDimension * boardDimension;
  for (let index = 0; index < maxIndex; index++) {
    const topLeftCellisAlive =
      currentGeneration[index - boardDimension - 1] || 0;
    const topCellisAlive = currentGeneration[index - boardDimension] || 0;
    const topRightCellisAlive =
      currentGeneration[index - boardDimension + 1] || 0;
    const rightCellisAlive = currentGeneration[index + 1] || 0;
    const leftCellisAlive = currentGeneration[index - 1] || 0;
    const bottomLeftCellisAlive =
      currentGeneration[index + boardDimension - 1] || 0;
    const bottomCellisAlive = currentGeneration[index + boardDimension] || 0;
    const bottomRightCellisAlive =
      currentGeneration[index + boardDimension + 1] || 0;

    const nbAliveNeighbors =
      topLeftCellisAlive +
      topCellisAlive +
      topRightCellisAlive +
      rightCellisAlive +
      leftCellisAlive +
      bottomLeftCellisAlive +
      bottomCellisAlive +
      bottomRightCellisAlive;

    // if the cell at the current index is alive, it remains so only with two or three neighbors
    if (
      currentGeneration[index] &&
      (nbAliveNeighbors === 2 || nbAliveNeighbors === 3)
    ) {
      newGeneration[index] = 1;
    }
    // if the cell at the current index is NOT alive, it becomes so only with three neighbors
    if (!currentGeneration[index] && nbAliveNeighbors === 3) {
      newGeneration[index] = 1;
    }
  }

  return newGeneration;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
