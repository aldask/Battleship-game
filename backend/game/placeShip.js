const isCellOccupied = (board, row, col) => {
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      const checkRow = row + rowOffset;
      const checkCol = col + colOffset;

      if (
        checkRow >= 0 &&
        checkRow < 10 &&
        checkCol >= 0 &&
        checkCol < 10 &&
        board[checkRow][checkCol] === "ship"
      ) {
        return true;
      }
    }
  }
  return false;
};

const placeShip = (board, shipSize) => {
  while (true) {
    const isHorizontal = Math.random() < 0.5;
    const startRow = Math.floor(Math.random() * 10);
    const startCol = Math.floor(Math.random() * 10);

    const fitsOnBoard = isHorizontal
      ? startCol + shipSize <= 10
      : startRow + shipSize <= 10;

    if (!fitsOnBoard) {
      continue;
    }

    let canPlace = true;

    for (let i = 0; i < shipSize; i++) {
      const row = isHorizontal ? startRow : startRow + i;
      const col = isHorizontal ? startCol + i : startCol;

      if (isCellOccupied(board, row, col)) {
        canPlace = false;
        break;
      }
    }

    if (canPlace) {
      for (let i = 0; i < shipSize; i++) {
        const row = isHorizontal ? startRow : startRow + i;
        const col = isHorizontal ? startCol + i : startCol;

        board[row][col] = "ship";
      }
      break;
    }
  }
};

module.exports = { placeShip };
