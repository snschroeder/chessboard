import Piece from './piece';

export default class Knight extends Piece {
    constructor(color, position, board) {
        super(color, position, board, 'knight', 3);
        this.board = board;
    }
    _generate_move_sequences() {
        const moves = [];
        let file = this.position[0], rank = this.position[1];
        moves.push([file + 2, rank + 1])
        moves.push([file + 2, rank - 1])
        moves.push([file + 1, rank + 2])
        moves.push([file + 1, rank - 2])
        moves.push([file - 2, rank + 1])
        moves.push([file - 2, rank -1])
        moves.push([file - 1, rank + 2])
        moves.push([file - 1, rank - 2])
        return moves;
    }

    valid_moves() {
        let generatedMoves = this._generate_move_sequences();

        generatedMoves = generatedMoves.filter(pos => !(pos[0] < 0 || pos[0] > this.board.getDims() -1 || pos[1] < 0 || pos[1] > this.board.getDims() -1));
        generatedMoves = generatedMoves.filter(move => this.board.getSquare(move[0], move[1]).getPiece() === null || this.board.getSquare(move[0], move[1]).getPiece().getColor() !== this.color);
        this.moves = generatedMoves;
        return generatedMoves;
    }
}