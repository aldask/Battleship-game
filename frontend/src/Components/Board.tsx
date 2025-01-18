import React from "react";
import { SiFireship } from "react-icons/si";
import { FiCircle } from "react-icons/fi";

interface BoardProps {
  board: string[][];
  onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="mt-6 p-4 sm:p-6 bg-white rounded-3xl shadow-lg border-4 border-gray-400 mx-auto animate__animated animate__fadeIn animate__delay-1s">
      <div className="flex flex-col items-center w-full">
        <table className="border-collapse w-full max-w-[1200px]">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex} className="flex justify-center w-full">
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`flex items-center justify-center 
                    w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 
                    p-1 sm:p-1.5 md:p-2 border border-gray-200 text-center cursor-pointer 
                    transition-all duration-300 ease-in-out transform rounded-md
                    hover:z-10 hover:relative
                    ${
                      cell === "hit"
                        ? "bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 shadow-md hover:scale-110 hover:ring-2 hover:ring-red-300"
                        : cell === "miss"
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-md hover:scale-110 hover:ring-2 hover:ring-blue-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm hover:scale-105 hover:ring-1 hover:ring-gray-300"
                    }`}
                    onClick={() => {
                      if (cell !== "" && cell !== "hit") {
                        onCellClick(rowIndex, colIndex);
                      }
                    }}
                  >
                    {cell === "hit" ? (
                      <SiFireship className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-burn" />
                    ) : cell === "miss" ? (
                      <FiCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;
