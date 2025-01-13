const express = require("express");
const { startNewGame, hitShip } = require("./game/gameLogic");

const app = express();
const port = 3001;

app.use(express.json());

let gameState = null;

app.post("/newGame", (req, res) => {
  console.log("New game request received");
  try {
    gameState = startNewGame();
    console.log("Game state:", gameState);
    res.status(200).json({ board: gameState });
  } catch (error) {
    console.error("Error starting new game:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/hit", (req, res) => {
  console.log("Hit received");
  try {
    if (!gameState) {
      return res.status(400);
    }

    const { row, col } = req.body;
    console.log(`attempt to at ${row} row and col ${col}`);
    const result = hitShip(gameState, row, col);

    console.log(`Result: ${result}`);
    console.log("Updated game state after hit:", gameState);

    res.status(200).json({ board: gameState, result });
  } catch (error) {
    console.error("Error hitting ship:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
