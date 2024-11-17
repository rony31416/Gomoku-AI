// import React, { useEffect, useState } from "react";
// import "./board.css";
// import { findBestMove } from "../AI/Minimax";
// import { checkWinner } from "../AI/BoardLines";

// const Board = () => {
//     const row_count = 10;
//     const col_count = 10;
  
//     const [turn, setTurn] = useState("0");
//     const [cells, setCells] = useState(Array(row_count * col_count).fill(""));
//     const [winner, setWinner] = useState("");
//     const [lastClick, setLastClick] = useState(null); // Track the last clicked cell
  
//     const handleClick = (num) => {
//       if (cells[num] !== "") {
//         alert("already clicked");
//         return;
//       }
//       if (winner === "1" || winner === "0") {
//         alert("match is finished");
//         return;
//       }
  
//       const squares = [...cells];
//       squares[num] = turn;
//       setCells(squares);
//       setLastClick(num); // Update the last click index
  
//       const newWinner = checkWinner(squares);
//       setWinner(newWinner);
  
//       setTurn(turn === "0" ? "1" : "0");
//     };
  
//     const Cell = ({ num }) => {
//       const className = `c${cells[num]} ${num === lastClick ? "new-click" : ""}`;
//       return (
//         <td onClick={() => handleClick(num)}>
//           <div className={className} />
//         </td>
//       );
//     };
  
//     const handleRestart = () => {
//       setWinner("");
//       setCells(Array(row_count * col_count).fill(""));
//       setTurn("0");
//       setLastClick(null); // Reset the last click on restart
//     };
  
//     useEffect(() => {
//       if (turn === "1" && winner === "") {
//         setTimeout(() => {
//           const squares = [...cells];
//           const bestMove = findBestMove(squares);
//           handleClick(bestMove);
//         }, 500); // Delay for AI to simulate thinking time
//       }
//     }, [turn, cells, winner]);
  
//     const renderBoard = () => {
//       const rows = [];
//       let t = 0;
  
//       for (let i = 0; i < row_count; i++) {
//         const cols = [];
//         for (let j = 0; j < col_count; j++) {
//           cols.push(<Cell key={t} num={t++} />);
//         }
//         rows.push(<tr key={i}>{cols}</tr>);
//       }
  
//       return rows;
//     };
  
//     return (
//       <div className="m-8 boardBG" style={{ height: "100vh" }}>
//         {turn === "1" && winner === "" && (
//           <b>
//             <h1 style={{ marginTop: "10px", color: "#9cbed4" }}>
//               <span className="red">AI</span>'s Turn!
//             </h1>
//           </b>
//         )}
//         {turn === "0" && winner === "" && (
//           <b>
//             <h1 style={{ marginTop: "10px", color: "#9cbed4" }}>
//               Your Turn!
//             </h1>
//           </b>
//         )}
  
//         {winner === "1" && (
//           <>
//             <b className="mt-4 mb-3">
//               <h2 style={{ marginTop: "10px", color: "#9cbed4" }}>
//                 <span className="red">AI</span> is the winner!
//               </h2>
//             </b>
//             <button className="btndd" onClick={handleRestart}>
//               Play Again
//             </button>
//           </>
//         )}
  
//         {winner === "0" && (
//           <>
//             <b className="mt-4 mb-3">
//               <h2 style={{ marginTop: "10px", color: "#9cbed4" }}>
//                 You are the winner!
//               </h2>
//             </b>
//             <button className="btndd" onClick={handleRestart}>
//               Play Again
//             </button>
//           </>
//         )}
  
//         <div className="container mt-5">
//           <table className="box">
//             <tbody>{renderBoard()}</tbody>
//           </table>
  
//           {winner === "" && (
//             <div className="container m-3">
//               <button className="btndd mt-4" onClick={handleRestart}>
//                 Restart Game
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   export default Board;
  


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./board.css";
import { findBestMove } from "../AI/Minimax";
import { checkWinner } from "../AI/BoardLines";

const Board = () => {
  const row_count = 10;
  const col_count = 10;

  const [turn, setTurn] = useState("0");
  const [cells, setCells] = useState(Array(row_count * col_count).fill(""));
  const [winner, setWinner] = useState("");
  const [lastClick, setLastClick] = useState(null);
  const [gameMode, setGameMode] = useState("player");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    if (mode) {
      setGameMode(mode);
    }
  }, [location]);

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("Already clicked");
      return;
    }
    if (winner === "1" || winner === "0") {
      alert("Match is finished");
      return;
    }

    const squares = [...cells];
    squares[num] = turn;
    setCells(squares);
    setLastClick(num);

    const newWinner = checkWinner(squares);
    setWinner(newWinner);

    setTurn(turn === "0" ? "1" : "0");
  };

  const Cell = ({ num }) => {
    const className = `c${cells[num]} ${num === lastClick ? "new-click" : ""}`;
    return (
      <td onClick={() => handleClick(num)}>
        <div className={className} />
      </td>
    );
  };

  const handleRestart = () => {
    setWinner("");
    setCells(Array(row_count * col_count).fill(""));
    setTurn("0");
    setLastClick(null);
  };

  useEffect(() => {
    if (gameMode === "ai" && turn === "1" && winner === "") {
      setTimeout(() => {
        const squares = [...cells];
        const bestMove = findBestMove(squares);
        handleClick(bestMove);
      }, 500);
    }
  }, [turn, cells, winner, gameMode]);

  const renderBoard = () => {
    const rows = [];
    let t = 0;

    for (let i = 0; i < row_count; i++) {
      const cols = [];
      for (let j = 0; j < col_count; j++) {
        cols.push(<Cell key={t} num={t++} />);
      }
      rows.push(<tr key={i}>{cols}</tr>);
    }

    return rows;
  };

  return (
    <div className="m-8 boardBG" style={{ height: "100vh" }}>
      {turn === "1" && winner === "" && gameMode === "ai" && (
        <b>
          <h1 style={{ marginTop: "10px", color: "#9cbed4" }}>
            <span className="red">AI</span>'s Turn!
          </h1>
        </b>
      )}
      {turn === "0" && winner === "" && gameMode === "ai" && (
        <b>
          <h1 style={{ marginTop: "10px", color: "#9cbed4" }}>
            Your Turn!
          </h1>
        </b>
      )}

      {turn === "1" && winner === "" && gameMode === "player" && (
        <b>
          <h1 style={{ marginTop: "10px", color: "#9cbed4" }}>
            <span className="red">Player 2</span>'s Turn!
          </h1>
        </b>
      )}
      {turn === "0" && winner === "" && gameMode === "player" && (
        <b>
          <h1 style={{ marginTop: "10px", color: "#9cbed4" }}>
            <span className="red">Player 1</span>'s Turn!
          </h1>
        </b>
      )}

      {winner === "1" && gameMode === "ai" && (
        <>
          <b className="mt-4 mb-3">
            <h2 style={{ marginTop: "10px", color: "#9cbed4" }}>
              <span className="red">AI</span> is the winner!
            </h2>
          </b>
          <button className="btndd" onClick={handleRestart}>
            Play Again
          </button>
        </>
      )}

      {winner === "0" && (
        <>
          {gameMode === "player" ? (
            <b className="mt-4 mb-3">
              <h2 style={{ marginTop: "10px", color: "#9cbed4" }}>
                <span className="red">Player 1</span> is the winner!
              </h2>
            </b>
          ) : (
            <b className="mt-4 mb-3">
              <h2 style={{ marginTop: "10px", color: "#9cbed4" }}>
                You are the winner!
              </h2>
            </b>
          )}
          <button className="btndd" onClick={handleRestart}>
            Play Again
          </button>
        </>
      )}

      {winner === "1" && gameMode === "player" && (
        <>
          <b className="mt-4 mb-3">
            <h2 style={{ marginTop: "10px", color: "#9cbed4" }}>
              <span className="red">Player 2</span> is the winner!
            </h2>
          </b>
          <button className="btndd" onClick={handleRestart}>
            Play Again
          </button>
        </>
      )}

      <div className="container mt-5">
        <table className="box">
          <tbody>{renderBoard()}</tbody>
        </table>

        {winner === "" && (
          <div className="container m-3">
            <button className="btndd mt-4" onClick={handleRestart}>
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
