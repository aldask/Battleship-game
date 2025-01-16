const { createEmptyBoard } = require("./createBoard");
const { placeShip } = require("./placeShip");

const startNewGame = () => {
  const board = createEmptyBoard();
  const ships = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5];
  let totalShipCells = 0;

  ships.forEach((shipSize) => {
    placeShip(board, shipSize);
    totalShipCells += shipSize;
  });

  return {
    board,
    remainingShots: initialShots,
    initialShots: 25,
    missedShots: 0,
    totalShipCells,
    sunkShipCells: 0,
    gameWon: false,
  };
};

const hitShip = (gameState, row, col) => {
  const { board } = gameState;

  if (board[row][col] === "ship") {
    board[row][col] = "hit";
    gameState.sunkShipCells++;
    checkIfGameWon(gameState);
    return "hit";
  } else {
    board[row][col] = "miss";
    gameState.remainingShots--;
    gameState.missedShots++;
    checkIfGameWon(gameState);
    return "miss";
  }
};

const checkIfGameWon = (gameState) => {
  if (gameState.sunkShipCells === gameState.totalShipCells) {
    if (gameState.remainingShots === gameState.initialShots) {
      gameState.gameWon = true;
      console.log("You won! All ships sunk without wasting any shots.");
    } else if (gameState.remainingShots < gameState.initialShots) {
      gameState.gameWon = false;
      console.log("You lost! You sunk all ships but wasted some shots.");
    }
  } else if (gameState.remainingShots === 0) {
    gameState.gameWon = false;
    console.log("Game over! You didn't sink all ships and have no shots left.");
  }
};

module.exports = { startNewGame, hitShip };
