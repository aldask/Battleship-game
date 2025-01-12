// Ship placement
const placeShip = (board, shipSize) => {
  let placed = false;

  while (!placed) {
    const horizontal = Math.random() < 0.5;

    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if (!horizontal) {
      if (col + shipSize <= 10) {
        let canPlace = true;

        for (let i = 0; i < shipSize; i++) {
          if (board[row][col + 1] === "ship") {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < shipSize; i++) {
            board[row][col + i] = "ship";
          }
          placed = true;
        }
      }
    } else {
      if (row + shipSize <= 10) {
        let canPlace = true;

        for (let i = 0; i < shipSize; i++) {
          if (board[row + i][col] === "ship") {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < shipSize; i++) {
            board[row + i][col] = "ship";
          }
          placed = true;
        }
      }
    }
  }
};

module.exports = placeShip;
