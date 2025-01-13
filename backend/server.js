const express = require("express");
const cors = require("cors");
const { startNewGame, hitShip } = require("./game/gameLogic");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let gameState = null;

app.post("/newGame", (req, res) => {
  console.log("New game request received");
  try {
    gameState = startNewGame();
    console.log("Game state:", gameState);

    const responseData = {
      board: gameState.board,
      hits: gameState.remainingHits,
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
    if (!gameState) {
      return res.status(400).send("No game in progress");
    }

    const { row, col } = req.body;
    console.log(`Attempt to hit at row ${row} and col ${col}`);

    const result = hitShip(gameState, row, col);
    console.log(`Result: ${result}`);
    console.log("Updated game state after hit:", gameState);

    const responseData = {
      board: gameState.board,
      result,
      remainingHits: gameState.remainingHits,
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
