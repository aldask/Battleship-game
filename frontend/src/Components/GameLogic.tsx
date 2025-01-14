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
      setMessage("New game started!");
    } catch (error) {
      setMessage("Error starting a new game. Please try again.");
    }
  };

  const handleHitCell = async (row: number, col: number) => {
    try {
      const response = await fetch("http://localhost:3001/hit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row, col }),
      });

      if (!response.ok) {
        throw new Error("Failed to process hit attempt");
      }

      const data = await response.json();

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = data.result === "hit" ? "hit" : "miss";
        return newBoard;
      });

      setRemainingHits(data.hits);
      setMessage(data.result === "hit" ? "Hit!" : "Miss!");

      if (data.hits === 0) {
        setMessage("Game over! Press the button to start a new game.");
      }
    } catch (error) {
      setMessage("Error hitting the cell. Please try again.");
    }
  };

  return { board, remainingHits, message, startNewGame, handleHitCell };
};

export default useGameLogic;
