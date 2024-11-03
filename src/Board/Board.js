import React, { useState } from 'react';
import './Board.css';

const Board = () => {
  const size = 10;
  const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return; // Ignore if occupied or there's a winner
    const newBoard = board.slice();
    newBoard[row][col] = isPlayerX ? 'X' : 'O';
    setBoard(newBoard);
    setIsPlayerX(!isPlayerX); // Switch turns

    // Check for a winner after each move
    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
    }
  };

  const calculateWinner = (squares) => {
    // Check rows and columns for exactly five stones in a row
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 4; j++) {
        // Check horizontal
        if (squares[i][j] && 
            squares[i][j] === squares[i][j + 1] && 
            squares[i][j] === squares[i][j + 2] && 
            squares[i][j] === squares[i][j + 3] && 
            squares[i][j] === squares[i][j + 4] && 
            (j + 5 >= size || squares[i][j + 5] !== squares[i][j])) {
          return squares[i][j];
        }
        // Check vertical
        if (squares[j][i] && 
            squares[j][i] === squares[j + 1][i] && 
            squares[j][i] === squares[j + 2][i] && 
            squares[j][i] === squares[j + 3][i] && 
            squares[j][i] === squares[j + 4][i] && 
            (j + 5 >= size || squares[j + 5][i] !== squares[j][i])) {
          return squares[j][i];
        }
      }
    }

    // Check diagonals
    for (let i = 0; i < size - 4; i++) {
      for (let j = 0; j < size - 4; j++) {
        // Check diagonal down-right
        if (squares[i][j] && 
            squares[i][j] === squares[i + 1][j + 1] && 
            squares[i][j] === squares[i + 2][j + 2] && 
            squares[i][j] === squares[i + 3][j + 3] && 
            squares[i][j] === squares[i + 4][j + 4] && 
            (i + 5 >= size || j + 5 >= size || squares[i + 5][j + 5] !== squares[i][j])) {
          return squares[i][j];
        }
        // Check diagonal down-left
        if (squares[i][j + 4] && 
            squares[i][j + 4] === squares[i + 1][j + 3] && 
            squares[i][j + 4] === squares[i + 2][j + 2] && 
            squares[i][j + 4] === squares[i + 3][j + 1] && 
            squares[i][j + 4] === squares[i + 4][j] && 
            (i + 5 >= size || j - 1 < 0 || squares[i + 5][j - 1] !== squares[i][j + 4])) {
          return squares[i][j + 4];
        }
      }
    }
    
    return null; // No winner
  };

  const checkDraw = (squares) => {
    return squares.every(row => row.every(cell => cell)); // Check if all cells are filled
  };

  return (
    <div className="board">
      {winner && <h2>Winner: {winner === 'X' ? 'Black' : 'White'}</h2>}
      {isDraw && <h2>Game is a Draw!</h2>}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <button 
              key={colIndex} 
              className={`board-cell ${cell === 'X' ? 'black' : cell === 'O' ? 'white' : ''}`} 
              onClick={() => handleClick(rowIndex, colIndex)}>
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
