import React from "react";
import Board from "./Components/Board";
import useGameLogic from "./Components/GameLogic";

const App: React.FC = () => {
  const { board, remainingHits, message, startNewGame, handleHitCell } = useGameLogic();

  // handler for debugging if button presses are working
  const handleCellClick = (row: number, col: number) => {
    console.log(`Cell clicked: Row ${row}, Col ${col}`);
  };

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen p-4">
      {message && <div className="mt-4 text-red-500">{message}</div>}
      <div className="mt-4">
        <Board board={board} onCellClick={handleHitCell} />
      </div>
      <button onClick={startNewGame}>Start New Game</button>
    </div>
  );
};

export default App;
