// Empty board
const createEmptyBoard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push("empty");
    }
    board.push(row);
  }
  return board;
};

module.exports = { createEmptyBoard };
