const express = require("express");
const game = require("./game/gameLogic");

const app = express();
const port = 3001;

app.use(express.json());

app.post("newGame", game.StartNewGame);

app.post("hit", game.hitShip);

app.post(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
