const express = require("express");
const cors = require("cors");
const { startNewGame, hitShip } = require("./game/gameLogic");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let gameStates = {};

app.post("/newGame", (req, res) => {
  console.log("New game request received");

  try {
    const sessionId = Math.random().toString(36).substr(1, 9);
    const gameState = startNewGame();
    gameStates[sessionId] = gameState;

    const responseData = {
      board: gameState.board,
      initialShots: gameState.initialShots,
      remainingShots: gameState.remainingShots,
      missedShots: gameState.missedShots,
      totalShipCells: gameState.totalShipCells,
      sunkShipCells: gameState.sunkShipCells,
      gameWon: gameState.gameWon,
      sessionId: sessionId,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error starting new game:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/hit", (req, res) => {
  console.log("Hit received");

  try {
    const { sessionId, row, col } = req.body;

    if (!sessionId || !gameStates[sessionId]) {
      return res
        .status(400)
        .send("Invalid sessionId. No game in progress for this session.");
    }

    const gameState = gameStates[sessionId];

    if (
      typeof row !== "number" ||
      typeof col !== "number" ||
      row < 0 ||
      col < 0 ||
      row >= gameState.board.length ||
      col >= gameState.board[0].length
    ) {
      return res.status(400).send("Invalid row or column");
    }

    const result = hitShip(gameState, row, col);

    console.log(`Result: ${result}`);
    console.log("Updated game state after hit:", gameState);

    const responseData = {
      board: gameState.board,
      result,
      initialShots: gameState.initialShots,
      remainingShots: gameState.remainingShots,
      missedShots: gameState.missedShots,
      totalShipCells: gameState.totalShipCells,
      sunkShipCells: gameState.sunkShipCells,
      gameWon: gameState.gameWon,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error hitting ship:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
