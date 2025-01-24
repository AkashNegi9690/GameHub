import React, { useState, useEffect } from 'react';

const MinesweeperBoard = () => {
  const [mineCount, setMineCount] = useState(3);
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initializeGrid = () => {
    const newGrid = Array(16).fill(null);
    const mines = [];
    
    // Place mines randomly
    while (mines.length < mineCount) {
      const randomPosition = Math.floor(Math.random() * 16);
      if (!mines.includes(randomPosition)) {
        mines.push(randomPosition);
        newGrid[randomPosition] = 'mine';
      }
    }
    
    // Place diamonds in remaining cells
    for (let i = 0; i < 16; i++) {
      if (!mines.includes(i)) {
        newGrid[i] = 'diamond';
      }
    }
    
    setGrid(newGrid);
    setRevealed(Array(16).fill(false));
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGrid();
  }, [mineCount]);

  const handleCellClick = (index) => {
    if (gameOver || gameWon || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (grid[index] === 'mine') {
      setGameOver(true);
      // Reveal all cells when game is over
      setRevealed(Array(16).fill(true));
    } else {
      // Check if all diamonds are revealed
      const revealedDiamonds = newRevealed.filter((r, i) => r && grid[i] === 'diamond').length;
      const totalDiamonds = grid.filter(cell => cell === 'diamond').length;
      if (revealedDiamonds === totalDiamonds) {
        setGameWon(true);
        setRevealed(Array(16).fill(true));
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex gap-4 items-center">
        <label className="text-lg">Number of Mines:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={mineCount}
          onChange={(e) => setMineCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={initializeGrid}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-gray-200 p-4 rounded-lg">
        {grid.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className={`
              w-16 h-16 flex items-center justify-center rounded-lg cursor-pointer
              transform transition-all duration-200
              ${revealed[index] ? 'bg-white' : 'bg-gray-300 hover:bg-gray-400 active:scale-95'}
              ${revealed[index] && cell === 'mine' ? 'bg-red-500' : ''}
              ${revealed[index] && cell === 'diamond' ? 'bg-blue-500' : ''}
            `}
          >
            {revealed[index] && (
              <span className="text-2xl">
                {cell === 'mine' ? '💣' : '💎'}
              </span>
            )}
          </div>
        ))}
      </div>

      {(gameOver || gameWon) && (
        <div className={`text-xl font-bold ${gameWon ? 'text-green-500' : 'text-red-500'}`}>
          {gameWon ? 'Congratulations! You Won!' : 'Game Over!'}
        </div>
      )}
    </div>
  );
};

export function MinesweeperGame(){
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-center">Diamond Minesweeper</h1>
            <MinesweeperBoard />
          </div>
        </div>
      )
}