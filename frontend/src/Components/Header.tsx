interface HeaderProps {
  remainingHits: number;
  handleNewGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ remainingHits, handleNewGame }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-gray-100 border-b border-gray-300">
      <h2 className="text-xl font-bold">Battleship Game!</h2>
      <p className="text-lg">Hits left: {remainingHits}</p>
      <button
        onClick={handleNewGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset The Game
      </button>
    </div>
  );
};

export default Header;
