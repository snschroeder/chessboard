import GameState from "../chess-engine/gamestate";

export default  class ChessBot {
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
                if (gameState.board.playArea[i][j].getPiece() !== null && gameState.board.playArea[i][j].getPiece().getColor() === 'black') {
                    this.pointBoard[i][j] = gameState.board.playArea[i][j].getPiece().value;
                }
            }
        }
        return this.pointBoard;
    }


    findBestMove(gameState) {
        let color = gameState.currentState[0].player;
        let allMoves = gameState.generateAllLegalMoves(color);
        let best = {piece: null, move: []};
        let gauge = 0;

        allMoves.forEach(piece => {
            piece.moves.forEach(move => {
                const [rank, file ] = move;
                if (this.pointBoard[rank][file] >= gauge)
                best.piece = piece;
                best.move = move;
            })
        })
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
}


    // simulateTurn(piece, move) {
    //     let piecePos = piece.position;
    //     console.log(piecePos)
    //     let gauge;
    //     let pieceHolder;

    //     pieceHolder = piece;
    //     console.log(pieceHolder)

    //     this.board.getSquare(move[0], move[1]).setPiece(piece);
    //     this.board.getPieceBySquare(...move).setPosition(move)
    //     this.board.getSquare(piecePos[0], piecePos[1]).removePiece();

    //     gauge = this.evaluateBoard();

    //     this.board.getSquare(piecePos[0], piecePos[1]).setPiece(piece);
    //     this.board.getSquare(move[0], move[1]).setPiece(pieceHolder);

    //     return gauge;
    // }


let game = new GameState();
game.initNewGame()
let bot = new ChessBot();
bot.createPointBoard();
console.log(bot.popPointBoard(game))
console.log(bot.pointBoard[7][7])
console.log(bot.findBestMove(game))
