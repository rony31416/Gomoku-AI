// import {boardEval as evaluateBoard} from "./boardEvaluation.js";
// import {findBestMove as findBestMove2} from "./Minimax.js";

const SIZE = 10;
const AI = "1";
const OPPONENT = "O";
const EMPTY = "";


function evaluateLine(line, player) {
  const countAICell = line.filter((cell) => cell === player).length;
  const countOpponentCell = line.filter((cell) => cell === OPPONENT).length;

  // if (countAICell === 6)
  //     return 2000;
  if (countAICell === 5) return 1000;
  if (countOpponentCell === 5) return -1000;
  if (countAICell === 4 && line.includes(EMPTY)) return 100;
  if (countOpponentCell === 4 && line.includes(EMPTY)) return -100;
  if (countAICell === 3 && line.includes(EMPTY)) return 10;
  if (countOpponentCell === 3 && line.includes(EMPTY)) return -10;
  if (countAICell === 2 && line.includes(EMPTY)) return 1;
  if (countOpponentCell === 2 && line.includes(EMPTY)) return -1;

  return 0;
}




// Evaluate the entire board        @update don't check the row and column if there emty skip it
function evaluateBoard(board, player) {

  let totalScore = 0;

  for (const row of board) {
    for (let i = 0; i <= SIZE - 5; i++) {
      totalScore += evaluateLine(row.slice(i, i + 5), player);
    }
  }

  for (let col = 0; col < SIZE; col++) {
    for (let i = 0; i <= SIZE - 5; i++) {
      if (board[i][col] != EMPTY) {
        const column = Array.from({ length: 5 }, (_, j) => board[i + j][col]);
        totalScore += evaluateLine(column, player);
      }
    }
  }

  for (let i = 0; i <= SIZE - 5; i++) {
    for (let j = 0; j <= SIZE - 5; j++) {
      if (board[i][j] != EMPTY) {
        const diagonal = Array.from(
          { length: 5 },
          (_, k) => board[i + k][j + k]
        );
        totalScore += evaluateLine(diagonal, player);
      }
    }
  }

  for (let i = 0; i <= SIZE - 5; i++) {
    for (let j = 0; j <= SIZE - 5; j++) {
      if (board[i][j] != EMPTY) {
        const diagonal = Array.from(
          { length: 5 },
          (_, k) => board[i + k][j + 4 - k]
        );
        totalScore += evaluateLine(diagonal, player);
      }
    }
  }

  return totalScore;
}




function validCheck(i, j) {
  return i >= 0 && i < SIZE && j >= 0 && j < SIZE;
}

function findAdjacentCell(board, i, j) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  for (const [px, py] of directions) {
    const x = i + px;
    const y = j + py;
    if (validCheck(x, y) && board[x][y] != EMPTY) return true;
  }

  return false;
}

function findBestMove(board, depth, maxTurn, alpha, bita) {
  if (depth === 0) {
    return [null, evaluateBoard(board, AI)];
  }

  if (maxTurn) {
    let bestMove = null;
    let bestScore = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < SIZE; i++) {
      // update change huristic. make tree only sorounded by the actual coin locate
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === EMPTY && findAdjacentCell(board, i, j)) {
          board[i][j] = AI;
          const [_, score] = findBestMove(board, depth - 1, false, alpha,bita);
          board[i][j] = EMPTY;
          console.log(`i and j: ${i},${j} score: ${score} ,bestScore: ${bestScore}`);
          if (score > bestScore) {
            //@update add alpha beta pruning
            bestScore = score;
            bestMove = [i, j];

            

          }
          alpha = Math.max(alpha, bestScore);
          if (bita <= alpha) {
            break; //pruning
          }
        }
      }
    }
    

    console.log(`bestMove: ${bestMove}`);
    return [bestMove, bestScore];

  } else {
    let bestMove = null;
    let bestScore = Number.POSITIVE_INFINITY;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === EMPTY && findAdjacentCell(board, i, j)) {
          board[i][j] = OPPONENT;
          const [_, score] = findBestMove(board, depth - 1, true, alpha, bita);
          board[i][j] = EMPTY;
          if (score < bestScore) {
            bestScore = score;
            bestMove = [i, j];
          }
          bita = Math.min(bita, bestScore);
          if (bita <= alpha) {
            break; // Alpha cutoff
          }
        }
      }
    }

    return [bestMove, bestScore];
  }
}

const converter1D = (board) => {
  const cells = [].concat(...board);
  //const [cellValues, setCellValues] = useState(cells);

  return cells;
};

const converter2D = (board) => {
  console.log(board, " confirm it pass to backend");
  const cells2D = Array.from({ length: SIZE }, (_, rowIndex) =>
    Array.from(
      { length: SIZE },
      (_, colIndex) => board[rowIndex * SIZE + colIndex]
    )
  );
  console.log(cells2D, " confirm it converted");
  // cells2D[4][5] = '1';
  // const abc = converter1D(cells2D);
  // console.log(abc," /////////// converted it again 1D ")
  return cells2D;
};

export const AI_movement = (board) => {
  board = converter2D(board);

  if (evaluateBoard(board, OPPONENT) <= -1000000) {
    console.log("Opponent wins!");
  }

  const [aiMove,_] = findBestMove(
    board,3,true,-Infinity,+Infinity
  );
  if (aiMove) {
    const [row, col] = aiMove;
    board[row][col] = AI;
    console.log(`AI's move: ${row} ${col}`);
  } else {
    console.log("AI cannot move.");
    return "AI can't move", aiMove;
  }

  // Print the board
  for (const row of board) {
    console.log(row.join(" "));
  }
  console.log();
  if (evaluateBoard(board, AI) >= 1000000) {
    console.log("AI wins the game");
  }

  board = board.flat();
  //return "AI can't move", board;

  return board;
};





const main = () => {
  const board = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => EMPTY)
  );
  console.log(board, " first time");

  while (true) {
    board[4][4] = OPPONENT; //replace it with proper implementation 

    board=board.flat();
    const [aiMove, _] = findBestMove(
      board,
      3,
      true,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    );
    if (aiMove) {
      const [row, col] = aiMove;
      board[row][col] = AI;
      console.log(`AI's move: ${row} ${col}`);
    } else {
      console.log("AI cannot move.");
      break;
    }

    // Print the board
    for (const row of board) {
      console.log(row.join(" "));
    }
    console.log();

    if (evaluateBoard(board, AI) >= 1000) {
      console.log("AI wins the game");
      break;
    }

    while (1) {
      const opponentRow = Math.floor(Math.random() * SIZE);
      const opponentCol = Math.floor(Math.random() * SIZE);
      if (board[opponentRow][opponentCol] === EMPTY) {
        board[opponentRow][opponentCol] = OPPONENT;
        break;
      }
    }

    // Print the board
    for (const row of board) {
      console.log(row.join(" "));
    }
    console.log();

    if (evaluateBoard(board, OPPONENT) <= -1000) {
      console.log("Opponent wins!");
      break;
    }
  }
};

//main()