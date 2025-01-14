import React from "react";

interface BoardProps {
  board: string[][];
  onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="flex flex-col items-center">
      <table className="border-collapse border border-gray-400">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`w-10 h-10 border border-gray-400 text-center ${
                    cell === "hit"
                      ? "bg-red-500"
                      : cell === "miss"
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    if (cell !== "" && cell !== "hit") {
                      onCellClick(rowIndex, colIndex);
                    }
                  }}
                >
                  {cell === "hit" ? "X" : cell === "miss" ? "O" : ""}
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
