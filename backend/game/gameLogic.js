const createEmptyBoard = require("./createBoard");
const placeShip = require("./placeShip");

const generateShipLocations = (board) => {
  const ships = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5];

  ships.forEach((shipSize) => {
    placeShip(board, shipSize);
  });
};

// Board display (for testing, need to remove later on)
const displayBoard = (board) => {
  console.log(board.map((row) => row.join(" ")).join("\n"));
};

// Game initialization
const board = createEmptyBoard();
generateShipLocations(board);
displayBoard(board);
