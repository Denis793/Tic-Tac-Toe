import React from 'react';
import { PlayerPanel } from './components/PlayerPanel';
import './index.css';

export default function App() {
  return (
    <>
      <div className="flex w-screen h-screen bg-gray-800 text-white">
        <PlayerPanel player="X" />
        <PlayerPanel player="O" />
      </div>
    </>
  );
}
