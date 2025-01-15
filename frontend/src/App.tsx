import React from "react";
import "animate.css";
import Board from "./Components/Board";
import useGameLogic from "./Components/GameLogic";

const App: React.FC = () => {
  const { board, remainingHits, message, startNewGame, handleHitCell } =
    useGameLogic();

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-800 min-h-screen p-12">
      {message && (
        <div className="mt-6 text-center text-3xl font-semibold text-gray-200 animate__animated animate__fadeIn">
          {message}
        </div>
      )}
      <div className="mt-10 p-8 bg-white rounded-3xl shadow-lg border-4 border-gray-400 animate__animated animate__fadeIn animate__delay-1s">
        <Board board={board} onCellClick={handleHitCell} />
      </div>
      <div className="mt-12">
        <button
          onClick={startNewGame}
          className="px-10 py-4 text-white bg-gradient-to-r from-teal-500 to-teal-400 rounded-3xl text-xl font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-teal-600 hover:shadow-xl hover:ring-4 hover:ring-teal-300 active:scale-95"
        >
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default App;
