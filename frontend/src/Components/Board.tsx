import React from "react";
import { SiFireship } from "react-icons/si";
import { FiCircle } from "react-icons/fi";

interface BoardProps {
  board: string[][];
  onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="mt-8 p-6 sm:p-8 bg-white rounded-3xl shadow-lg border-4 border-gray-400 animate__animated animate__fadeIn animate__delay-1s max-w-3xl sm:max-w-4xl">
      <div className="flex flex-col items-center w-full">
        <table className="border-collapse w-full">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex} className="flex w-full justify-center">
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`flex items-center justify-center 
                    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 
                    p-1 sm:p-2 md:p-2 lg:p-3 border border-gray-200 text-center cursor-pointer 
                    transition-all duration-300 ease-in-out transform rounded-md
                    hover:z-10 hover:relative
                    ${
                      cell === "hit"
                        ? "bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 shadow-xl hover:scale-110 hover:shadow-3xl hover:ring-4 hover:ring-red-300"
                        : cell === "miss"
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-xl hover:scale-110 hover:shadow-3xl hover:ring-4 hover:ring-blue-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md hover:scale-105 hover:ring-2 hover:ring-gray-300"
                    }`}
                    onClick={() => {
                      if (cell !== "" && cell !== "hit") {
                        onCellClick(rowIndex, colIndex);
                      }
                    }}
                  >
                    {cell === "hit" ? (
                      <SiFireship className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-burn" />


                    ) : cell === "miss" ? (
                      <FiCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
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
