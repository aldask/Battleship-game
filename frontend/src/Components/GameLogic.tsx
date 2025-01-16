import React, { useState } from "react";

const useGameLogic = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [remainingHits, setRemainingHits] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [sessionId, setSessionId] = useState(""); // Store sessionId

  const handleNewGame = async () => {
    try {
      const response = await fetch("http://localhost:3001/newGame", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to start a new game");
      }
      const data = await response.json();

      setBoard(data.board);
      setRemainingHits(data.remainingShots);
      setGameOver(false);
      setSessionId(data.sessionId);
      setMessage(
        `New game started! You have ${data.remainingShots} hits remaining.`
      );
      let remainingShips = countShipCells(data.board);
      console.log(`Current "ship" cells remaining: ${remainingShips}`);

      console.table(data.board);
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
        body: JSON.stringify({ sessionId, row, col }),
      });

      if (!response.ok) {
        throw new Error("Failed to process hit attempt");
      }

      const data = await response.json();

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = data.result === "hit" ? "hit" : "miss";
        console.log("Updated Board:", newBoard);

        const remainingShips = countShipCells(newBoard);
        console.log(
          `Current "ship" cells remaining AFTER HUT: ${remainingShips}`
        );
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

      if (data.gameWon) {
        setGameOver(true);
        if (data.totalShipCells === data.sunkShipCells) {
          if (data.remainingShots === data.initialShots) {
            setMessage("You won! All ships sunk without wasting any shots.");
          } else {
            setMessage("You lost! All ships sunk, but you wasted some shots.");
          }
        }
        if (gameOver) {
          setMessage(
            "You lost! You didn't sink all ships, and you're out of shots."
          );
        }
      }
    } catch (error) {
      setMessage("Error hitting the cell. Please try again.");
    }
  };

  const countShipCells = (board: string[][]): number => {
    return board.flat().filter((cell) => cell === "ship").length;
  };

  return {
    board,
    remainingHits,
    message,
    gameOver,
    handleNewGame,
    handleHitCell,
  };
};

export default useGameLogic;
