import {boardEval as evaluate} from "./BoardEvalution";

export function adjacentCell(board){
    let indices = new Set()

    for(let i = 0 ; i < 100 ; i++){
        if(board[i]!==''){
            if((i-9) >= 0 && (i-9) < 100) indices.add(i-9)
            if((i-11) >= 0 && (i-11) < 100) indices.add(i-11)
            if((i-10) >= 0 && (i-10) < 100) indices.add(i-10)
            if((i+10) >= 0 && (i+10) < 100) indices.add(i+10)
            if((i+9) >= 0 && (i+9) < 100) indices.add(i+9)
            if((i+11) >= 0 && (i+11) < 100) indices.add(i+11)
            if((i-1) >= 0 && (i-1) < 100) indices.add(i-1)
            if((i+1) >= 0 && (i+1) < 100) indices.add(i+1)
        }
    }
    return indices;
}


export function minimax(board, maxPlayer, depth, alpha, beta){
    let boardvalue = evaluate(board,maxPlayer)
    if(depth===3 || boardvalue===10000000 || boardvalue===-10000000) {
        return boardvalue;
    }

    let score = 0;
    if(maxPlayer) score = -Infinity;
    else score = Infinity;

    let indices = adjacentCell(board)
    indices = Array.from(indices)

    for(let i = 0 ; i < indices.length ; i++){
        if(board[indices[i]]===''){
            board[indices[i]] = '1'
            if(maxPlayer) {
                board[indices[i]] = '1';
                let minimax_score = minimax(board,false,depth+1,alpha,beta)
                score = Math.max(score, minimax_score);
                alpha = Math.max(score,alpha)
                board[indices[i]] = ''
                if(alpha>=beta) {break;}
            }
            else {
                board[indices[i]] = '0';
                let minimax_score =  minimax(board,true,depth+1,alpha,beta)
                score = Math.min(score, minimax_score);
                beta = Math.min(minimax_score,beta)
                board[indices[i]] = ''
                if(alpha>=beta) { break;}
            }
        }
    }

    return score;
}


export const findBestMove = (squares) => {
    let board = [...squares]
    let bestMove = -1;
    let score = -Infinity;
    let indices = adjacentCell(squares)
    indices = Array.from(indices)

    for(let i = 0 ; i < indices.length ; i++){
        if(board[indices[i]]===''){
            board[indices[i]] = '1'
            let minimax_score = minimax(board,false,1,-Infinity,Infinity);
            if(minimax_score > score){
                bestMove = indices[i];
                score = minimax_score;
            }
            board[indices[i]] = ''
        }
    }
    
    console.log("best: ", bestMove, "score: ",score);
    return bestMove;
}




