import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const Board = ({ player }) => {
  const { board, makeMove, activePlayer, gameOver } = useGameStore();
  return (
    <>
      <div className="flex justify-center items-center p-5">
        <div className="grid grid-cols-3 gap-2 w-38 h-38">
          {board.map((cell, idx) => (
            <button
              key={idx}
              className="w-12 h-12 text-2xl bg-gray-700 text-white rounded"
              disabled={cell || activePlayer !== player || gameOver}
              onClick={() => makeMove(idx, player)}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
