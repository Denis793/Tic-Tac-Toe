import { create } from 'zustand';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const useGameStore = create((set, get) => ({
  board: Array(9).fill(null),
  xIsNext: true,
  gameOver: false,
  message: '',
  chat: [],
  score: { X: 0, O: 0 },
  activePlayer: 'X',
  addMessage: (text, player) =>
    set((state) => ({ chat: [...state.chat, { text, player, timestamp: new Date().toLocaleTimeString() }] })),
  resetGame: () =>
    set({
      board: Array(9).fill(null),
      xIsNext: true,
      gameOver: false,
      message: '',
      chat: [],
      score: { X: 0, O: 0 },
      activePlayer: 'X',
    }),
  makeMove: (index, player) => {
    const { board, xIsNext, gameOver } = get();
    if (gameOver || board[index] || (xIsNext && player !== 'X') || (!xIsNext && player !== 'O')) return;

    const newBoard = board.slice();
    newBoard[index] = player;

    const winner = calculateWinner(newBoard);
    if (winner) {
      const newScore = { ...get().score, [winner]: get().score[winner] + 1 };
      set({
        board: newBoard,
        gameOver: true,
        message: `Winner: ${winner}`,
        score: newScore,
      });

      setTimeout(() => {
        set({ board: Array(9).fill(null), gameOver: false, message: '', xIsNext: true, activePlayer: 'X' });
      }, 5000);
    } else if (!newBoard.includes(null)) {
      set({ board: newBoard, gameOver: true, message: 'Draw' });
      setTimeout(() => {
        set({ board: Array(9).fill(null), gameOver: false, message: '', xIsNext: true, activePlayer: 'X' });
      }, 5000);
    } else {
      set({
        board: newBoard,
        xIsNext: !xIsNext,
        activePlayer: xIsNext ? 'O' : 'X',
      });
    }
  },
}));
