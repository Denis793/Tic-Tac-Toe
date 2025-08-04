import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ChatBox } from '../ChatBox';
import { Board } from '../Board';

export const PlayerPanel = ({ player }) => {
  const { activePlayer, message, score, resetGame } = useGameStore();
  const isMyTurn = activePlayer === player;
  return (
    <>
      <div className="flex flex-col w-1/2 h-full p-4 bg-gray-900 text-white">
        <h2 className="text-center text-lg font-bold">Player {player}</h2>
        <div className="text-center text-sm mb-2">{isMyTurn ? 'Your turn' : 'Wait your turn'}</div>
        <Board player={player} />
        <div className="text-center mt-2">
          Score: {score.X} - {score.O}
        </div>
        {message && <div className="text-center text-yellow-400 mt-2">{message}</div>}
        <ChatBox player={player} />
        <button className="bg-red-500 rounded mt-2 p-1" onClick={resetGame}>
          Reset
        </button>
      </div>
    </>
  );
};
