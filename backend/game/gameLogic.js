const { createEmptyBoard } = require("./createBoard");
const { placeShip } = require("./placeShip");

const startNewGame = () => {
  const board = createEmptyBoard();
  const hits = 25;
  const ships = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5];

  ships.forEach((shipSize) => {
    placeShip(board, shipSize);
  });
  return { board, hits };
};

// Simple test handler for hits
const hitShip = (board, row, col) => {
  if (board[row][col] === "ship") {
    board[row][col] = "hit";
    return "hit";
  } else {
    board[row][col] = "miss";
    return "miss";
  }
};

module.exports = { startNewGame, hitShip };
