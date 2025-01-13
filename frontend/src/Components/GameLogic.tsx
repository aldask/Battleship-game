import React, { useState } from "react";

const useGameLogic = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [remainingHits, setRemainingHits] = useState(0);
  const [message, setMessage] = useState<string>("");

  const startNewGame = async () => {
    try {
      const response = await fetch("http://localhost:3001/newGame", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to start a new game");
      }
      const data = await response.json();

      setBoard(data.board);
      setRemainingHits(data.hits); // need to implement counter logic later
      setMessage("New game started!");
    } catch (error) {
      setMessage("Error starting a new game. Please try again.");
    }
  };

  return {
    board,
    remainingHits,
    message,
    startNewGame,
  };
};

export default useGameLogic;


// need to add hit/miss api and update board state
