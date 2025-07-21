"use client";
import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function calculateWinner(board) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner("Draw");
    }
    setXIsNext(!xIsNext);
  }

  function resetGame(){
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  const renderCell = (index) => (
    <button
      className="border border-black w-16 h-16 text-3xl flex justify-center items-center hover:bg-gray-200"
      onClick={() => handleClick(index)}
      aria-label={`cell ${index}`}
    >
      {board[index]}
    </button>
  );

  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Tic Tac Toe</h1>

      {winner ? (
        <div className="mb-4">
          {winner === "Draw" ? "Game ended in a draw." : `Winner is: ${winner}`}
        </div>
      ) : (
        <div className="mb-4">Next player: {xIsNext ? "X" : "O"}</div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderCell(index))}
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </main>
  );
}
