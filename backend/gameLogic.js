// Empty board
const createEmptyBoard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push("empty");
    }
    board.push(row);
  }
  return board;
};

const board = createEmptyBoard();

// Ships placement
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

const generateShipLocations = (board) => {
  const ships = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5];

  ships.forEach((shipSize) => {
    placeShip(board, shipSize);
  });
};

generateShipLocations(board);


// Board display (for testing, need to remove later on)

const displayBoard = (board) => {
    console.log(board.map(row => row.join(" ")).join("\n"));
}

displayBoard(board);