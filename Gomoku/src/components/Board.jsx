import React from 'react';
import Square from './Square';
import '../Style/Board.css';

const Board = () => {
  const boardSize = 10;

  return (
    <div className="board">
      {Array.from({ length: boardSize * boardSize }).map((_, index) => (
        <Square key={index} />
      ))}
    </div>
  );
};

export default Board;
