import GameState from "../chess-engine/gamestate";

export default class ChessBot {
    constructor() {
        this.botGameState = new GameState();
    }

    initNewBotGame() {
        this.botGameState.initNewGame();
        setTimeout(()=> {
            let e4pawn = this.botGameState.board.playArea[1][3].getPiece()
            console.log(e4pawn)
            this.makeMove(e4pawn, [3, 3])
            return {piece: e4pawn, move: [3, 3]}
        }, 100)
    }

    makeMove(piece, move) {
        this.botGameState.turn(piece, move)
        return {piece, move}
    }
}