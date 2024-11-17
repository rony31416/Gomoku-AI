import {findLines} from "./BoardLines"

export function boardEval(board,maxPlayer){

    board=board.flat();

    let redfavor = {
        fiveinrow: ["11111"],
        livefour: [
            "-1111-",
        ],
        deadfour: [
            "01111-",
            "111-1",
            "11-11"
        ],
        livethree: [
            "-111-",
            "11-1"
        ],
        deadthree: [
            "0111-",
            "011-1",
            "01-11",
            "11--1",
            "1-1-1",
            "0-111-0"
        ],
        livetwo: [
            "1---1"
        ],
        deadtwo: [
            "1-1",
            "1--1",
            "011",
            "01-1",
            "01--1",
            "11"
        ]
    }
    let blackfavor = {
        fiveinrow: ["00000"],
        livefour: [
            "-0000-",
        ],
        deadfour: [
            "10000-",
            "000-0",
            "00-00"
        ],
        livethree: [
            "-000-",
            "00-0"
        ],
        deadthree: [
            "1000-",
            "100-0",
            "10-00",
            "00--0",
            "0-0-0",
            "1-000-1"
        ],
        livetwo: [
            "0---0"
        ],
        deadtwo: [
            "0-0",
            "0--0",
            "100",
            "10-0",
            "10--0",
            "00"
        ]
    }
    let redscore = 0, blackscore = 0;

    for(let i = 0 ; i < redfavor.fiveinrow.length ; i++){
        if(findLines(board,redfavor.fiveinrow[i]) > 0) return 10000000;
        if(findLines(board,blackfavor.fiveinrow[i]) > 0) return -10000000;
    }
    for(let i = 0 ; i < redfavor.livefour.length ; i++){
        if(findLines(board,redfavor.livefour[i])) return 100000;
        if(findLines(board,blackfavor.livefour[i]) > 0) return -10000000;
    }
    for(let i = 0 ; i < redfavor.deadfour.length ; i++){
        if(findLines(board,redfavor.deadfour[i]) > 0){
            if(maxPlayer) return 10000;
            else redscore += findLines(board,redfavor.deadfour[i])*10000;
        }
        if(findLines(board,blackfavor.deadfour[i]) > 0){
            if(!maxPlayer) return -10000;
            else blackscore += findLines(board,blackfavor.deadfour[i])*10000;
        }
    }
    for(let i = 0 ; i < redfavor.livethree.length ; i++){
        if(findLines(board,redfavor.livethree[i]) > 0){
            if(maxPlayer) return 5000;
            else redscore += findLines(board,redfavor.livethree[i])*4000;
        }
        if(findLines(board,blackfavor.livethree[i]) > 0){
            if(!maxPlayer) return -4500;
            else blackscore += findLines(board,blackfavor.livethree[i])*4000;
        }
    }
    for(let i = 0 ; i < redfavor.deadthree.length ; i++){
        if(findLines(board,redfavor.deadthree[i]) > 0){
            if(maxPlayer) return 2000;
            else redscore += findLines(board,redfavor.deadthree[i])*4000;
        }
        if(findLines(board,blackfavor.deadthree[i]) > 0){
            if(!maxPlayer) return -2000;
            else blackscore += findLines(board,blackfavor.deadthree[i])*4000;
        }
    }
    for(let i = 0 ; i < redfavor.livetwo.length ; i++){
        if(findLines(board,redfavor.livetwo[i]) > 0) redscore += findLines(board,redfavor.livetwo[i])*200;
        if(findLines(board,blackfavor.livetwo[i]) > 0) blackscore += findLines(board,blackfavor.livetwo[i])*200;
    }
    for(let i = 0 ; i < redfavor.deadtwo.length ; i++){
        if(findLines(board,redfavor.deadtwo[i]) > 0) redscore += findLines(board,redfavor.deadtwo[i])*100;
        if(findLines(board,blackfavor.deadtwo[i]) > 0) blackscore += findLines(board,blackfavor.deadtwo[i])*100;
    }
    
    if(redscore > blackscore) return redscore;
    else return -1*blackscore;
}