import React, { useState } from "react";

const useGameLogic = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [remainingHits, setRemainingHits] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

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
      setRemainingHits(25);
      setGameOver(false);
      setMessage("New game started! You have 25 hits remaining.");
    } catch (error) {
      setMessage("Error starting a new game. Please try again.");
    }
  };

  const handleHitCell = async (row: number, col: number) => {
    if (remainingHits === 0) {
      setMessage("Game over! Press the button to start a new game.");
      return;
    }
    if (board[row][col] === "hit" || board[row][col] === "miss") {
      return;
    }

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

      setMessage(data.result === "hit" ? "Hit!" : "Miss!");

      if (data.result === "miss") {
        setRemainingHits((prevHits) => {
          const updatedHits = prevHits - 1;
          if (updatedHits === 0) {
            setGameOver(true);
            setMessage("Game over! Press the button to start a new game.");
          }
          return updatedHits;
        });
      }
    } catch (error) {
      setMessage("Error hitting the cell. Please try again.");
    }
  };

  return { board, remainingHits, message, startNewGame, handleHitCell };
};

export default useGameLogic;
