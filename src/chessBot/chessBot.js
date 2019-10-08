//import GameState from "../chess-engine/gamestate";

export default class ChessBot {
    constructor() {
        this.pointBoard = new Array(8);
    }

    createPointBoard() {
        for (let i = 0; i < 8; i++) {
            this.pointBoard[i] = new Array(8);
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.pointBoard[i][j] = 0;
            }
        }
    }

    popPointBoard(gameState) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (gameState.board.playArea[i][j].getPiece() !== null) {
                    if (gameState.board.playArea[i][j].getPiece().getColor() === 'black') {
                        this.pointBoard[i][j] = - gameState.board.playArea[i][j].getPiece().value;
                    } else {
                        this.pointBoard[i][j] = gameState.board.playArea[i][j].getPiece().value;
                    }
                } else {
                    this.pointBoard[i][j] = 0;
                }
            }
        }
        return this.pointBoard;
    }

    evaluateBoard() {
        let score = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                score += this.pointBoard[i][j];
            }
        }
        return score;
    }


    findBestMove(gameState) {
        //let color = gameState.currentState[0].player;
        let allMoves = gameState.generateAllLegalMoves('white');
        allMoves = allMoves.filter(piece => piece.moves.length !== 0);
        let best = { piece: null, move: [] };
        let gauge = 0;

        allMoves.forEach(piece => {
            piece.moves.forEach(move => {
                const [rank, file] = move;
                if (this.pointBoard[rank][file] <= gauge) {
                    gauge = this.pointBoard[rank][file];
                    best.piece = piece;
                    best.move = move;
                }
            })
        })
        if (gauge === 0) {
            return this.pickRandomMove(gameState)
        }
        return best;
    }

    pickRandomMove(gameState) {
        if (gameState.currentState[0].player === 'white') {
            let legalMoves = gameState.generateAllLegalMoves('white');
            legalMoves = legalMoves.filter(piece => piece.moves.length !== 0);
            const randomPiece = legalMoves[Math.floor(Math.random() * Math.floor(legalMoves.length))]
            let randomMove = randomPiece.moves[Math.floor(Math.random() * Math.floor(randomPiece.moves.length))]
            return { piece: randomPiece, move: randomMove }
        }
    }

    miniMaxRoot(depth, game, isMaxPlayer) {
        let color;
        if (isMaxPlayer) {
            color = 'white';
        } else {
            color = 'black';
        }
        let moves = game.generateAllLegalMoves('white');
        let bestEval = -9999;
        let best = { piece: null, move: null }; 

        moves.forEach(piece => {
            piece.moves.forEach(move => {
                game.turn(piece, move)
                let val = this.miniMax(depth - 1, game, !isMaxPlayer);
                game.undo();

                console.log(val)
                if (val >= bestEval) {
                    bestEval = val;
                    best = { piece, move };
                }
            })
        })
        console.log('final: ' + bestEval)
        if (bestEval === 0) {
            best = this.pickRandomMove(game)
        }
        console.log(best.piece)
        console.log(best.move)
        return best;
    }

    miniMax(depth, game, isMaxPlayer) {
        if (depth === 0 || game.currentState[0].checkmate || game.currentState[1].checkmate || game.currentState[0].stalemate || game.currentState[1].stalemate) {
            return game.evaluateBoard();
            
        }
        //let moves = game.generateAllLegalMoves(isMaxPlayer ? 'white' : 'black');
        let bestEval;

        if (isMaxPlayer) {

            let moves = game.generateAllLegalMoves('white')
            bestEval = -9999;

            moves.forEach(piece => {
                piece.moves.forEach(move => {
                    game.turn(piece, move)
                    bestEval = Math.max(bestEval, this.miniMax(depth - 1, game, !isMaxPlayer));
                    game.undo();
                })
            })
            //console.log('white player best: ' + bestEval)
            return bestEval;
        } else {
            let moves = game.generateAllLegalMoves('black')
            bestEval = 9999;
            moves.forEach(piece => {
                piece.moves.forEach(move => {
                    game.turn(piece, move)
                    bestEval = Math.min(bestEval, this.miniMax(depth - 1, game, !isMaxPlayer));
                    game.undo();
                })
            })
            //console.log('black player best: ' + bestEval)
            return bestEval;
        }
    }

}



// var minimax = function (depth, game, isMaximisingPlayer) {
//     positionCount++;
//     if (depth === 0) {
//         return -evaluateBoard(game.board());
//     }

//     var newGameMoves = game.ugly_moves();              -- create array of game moves

//     if (isMaximisingPlayer) {                         -- if white
//         var bestMove = -9999;                         -- set baseline that will get overwritten
//         for (var i = 0; i < newGameMoves.length; i++) {
//             game.ugly_move(newGameMoves[i]);                                                     -- pick a move
//             bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));        -- set value of best move to the max of current best move and minimax call
//             game.undo();                                                                         -- undo the move 
//         }
//         return bestMove;
//     } else {
//         var bestMove = 9999;
//         for (var i = 0; i < newGameMoves.length; i++) {
//             game.ugly_move(newGameMoves[i]);
//             bestMove = Math.min(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
//             game.undo();
//         }
//         return bestMove;
//     }
// };



// white is current player and they are trying to max
//     iterate through pieces in legal moves and iterate through moves of each piece
//         update the pointBoard
//         pass the pointboard, depth -1, and flip isMaxPlayer

//         black they are tyring to min 


// this 

// var minimaxRoot =function(depth, game, isMaximisingPlayer) {

//     var newGameMoves = game.ugly_moves();                                       --list of all moves available 
//     var bestMove = -9999;                                                       -- they made the bot the black player -- but the eval starts on white, hence the neg val
//     var bestMoveFound; holder for best move 

//     for(var i = 0; i < newGameMoves.length; i++) {
//         var newGameMove = newGameMoves[i];                                      -- pick a game move 
//         game.ugly_move(newGameMove);                                            -- make the game move 
//         var value = minimax(depth - 1, game, !isMaximisingPlayer);              -- set the value equal to the recursive call of minimax
//         game.undo(); -- undo the move we made 
//         if(value >= bestMove) {                                                 -- if the value is greater than our best move, it's the new best move and we set the best move equal to the move. We also udpate the value for best move
//             bestMove = value;
//             bestMoveFound = newGameMove;
//         }
//     }
//     return bestMoveFound;
// };

