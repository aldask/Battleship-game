interface HeaderProps {
  remainingHits: number;
  handleNewGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ remainingHits, handleNewGame }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full p-2 md:p-4 bg-gray-100 border-b border-gray-300">
      <h2 className="text-lg sm:text-xl font-bold text-center md:text-left mb-2 md:mb-0">
        Battleship Game!
      </h2>
      <p className="text-sm sm:text-lg text-center md:text-right mb-2 md:mb-0">
        Hits left: {remainingHits}
      </p>
      <button
        onClick={handleNewGame}
        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded hover:bg-blue-600"
      >
        Reset The Game
      </button>
    </div>
  );
};

export default Header;
