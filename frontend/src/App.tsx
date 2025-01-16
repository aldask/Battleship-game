import React, { useEffect } from "react";
import "animate.css";
import Board from "./Components/Board";
import useGameLogic from "./Components/GameLogic";

const App: React.FC = () => {
  const { board, remainingHits, message, handleNewGame, handleHitCell } =
    useGameLogic();

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-800 min-h-screen p-4 sm:p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mt-6 animate__animated animate__fadeIn">
        Battleship Game
      </h1>
      {message && (
        <div className="mt-6 text-center text-xl sm:text-3xl font-semibold text-gray-200 animate__animated animate__fadeIn">
          <p>{message}</p>
          <p className="text-sm sm:text-lg text-teal-300 mt-2">
            Remaining Hits: {remainingHits}
          </p>
        </div>
      )}
      <Board board={board} onCellClick={handleHitCell} />
      <div className="mt-12">
        <button
          onClick={handleNewGame}
          className="px-8 py-3 sm:px-10 sm:py-4 text-white bg-gradient-to-r from-teal-500 to-teal-400 rounded-3xl text-lg sm:text-xl font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-teal-600 hover:shadow-xl hover:ring-4 hover:ring-teal-300 active:scale-95"
        >
          Start New Game
        </button>
      </div>
      <div className="mt-12 text-xs sm:text-sm text-gray-400 text-center animate__animated animate__fadeIn animate__delay-1s">
        <p>&copy; Aldas 2025</p>
      </div>
    </div>
  );
};

export default App;
