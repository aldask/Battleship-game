import React from "react";
import { SiFireship } from "react-icons/si";
import { FiCircle } from "react-icons/fi";

interface BoardProps {
  board: string[][];
  onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="flex flex-col items-center">
      <table className="border-collapse shadow-2xl">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`w-16 h-16 p-4 border border-gray-200 text-center flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform rounded-md
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
                    <SiFireship className="w-8 h-8 text-white animate-pulse" />
                  ) : cell === "miss" ? (
                    <FiCircle className="w-8 h-8 text-white animate-pulse" />
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
  );
};

export default Board;
