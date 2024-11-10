import React, { useState } from 'react';
import './Board.css';

const rows = 10;
const cols = 10;

const Board = () => {
    // Initialize the board with '-' to indicate empty cells
    const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(cols).fill('-')));
    const [currentPlayer, setCurrentPlayer] = useState(1); // Start with player 1 (Black)
    const [winner, setWinner] = useState(null);

    const handleClick = (row, col) => {
        if (board[row][col] !== '-' || winner) return; // Ignore clicks on non-empty cells or if there’s a winner

        // Copy the board and update the clicked cell
        const updatedBoard = board.map(row => [...row]);
        updatedBoard[row][col] = currentPlayer;

        setBoard(updatedBoard);

        // Check for a winner
        if (checkForMatches(updatedBoard, currentPlayer)) {
            setWinner(currentPlayer === 1 ? 'Black' : 'White');
        } else {
            setCurrentPlayer(currentPlayer === 1 ? 0 : 1); // Toggle player
        }
    };

    const restartGame = () => {
        setBoard(Array(rows).fill(null).map(() => Array(cols).fill('-')));
        setCurrentPlayer(1);
        setWinner(null);
    };

    return (
        <div className="board-container">
            <h2>{winner ? `${winner} wins the game!` : `Current Player: ${currentPlayer === 1 ? 'Black' : 'White'}`}</h2>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`board-cell ${cell === 1 ? 'black' : cell === 0 ? 'white' : ''}`}
                                onClick={() => handleClick(rowIndex, colIndex)}
                            >
                                {cell === 1 ? 'X' : cell === 0 ? 'O' : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className="restart-btn" onClick={restartGame}>Restart Game</button>
        </div>
    );
};

// Utility functions for checking win conditions
function checkMatch(board, row, col, rowDelta, colDelta, matchValue) {
    for (let i = 0; i < 5; i++) {
        const newRow = row + i * rowDelta;
        const newCol = col + i * colDelta;

        if (
            newRow < 0 || newRow >= rows ||
            newCol < 0 || newCol >= cols ||
            board[newRow][newCol] !== matchValue
        ) {
            return false;
        }
    }
    return true;
}

function checkForMatches(board, matchValue) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (
                checkMatch(board, i, j, 0, 1, matchValue) || // Horizontal
                checkMatch(board, i, j, 1, 0, matchValue) || // Vertical
                checkMatch(board, i, j, 1, 1, matchValue) || // Diagonal down-right
                checkMatch(board, i, j, -1, 1, matchValue)   // Diagonal up-right
            ) {
                return true;
            }
        }
    }
    return false;
}

export default Board;
