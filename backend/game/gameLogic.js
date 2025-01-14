const { createEmptyBoard } = require("./createBoard");
const { placeShip } = require("./placeShip");

const startNewGame = () => {
  const board = createEmptyBoard();
  const remainingShots = 25;
  const ships = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5];

  ships.forEach((shipSize) => {
    placeShip(board, shipSize);
  });

  gameState = { board, remainingShots };
  return gameState;
};

// Simple test handler for hits
const hitShip = (board, row, col) => {
  if (board[row][col] === "ship") {
    board[row][col] = "hit";
    return "hit";
  } else {
    board[row][col] = "miss";
    gameState.remainingShots--;
    return "miss";
  }
};

module.exports = { startNewGame, hitShip };
