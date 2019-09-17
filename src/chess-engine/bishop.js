import Piece from './piece';

export default class Bishop extends Piece {
    constructor(color, position, board) {
        super(color, position, board, 'bishop', 3);
        this.board = board;
    }
    _generate_move_sequences() {
        const moves = [], upRight = [], upLeft = [], downRight = [], downLeft = [];
        let file = this.position[0], rank = this.position[1];

        for (let i = 1; i < this.board.getDims(); i++) {
            upRight.push([file + i, rank + i]);
            upLeft.push([file + i, rank - i]);
            downRight.push([file - i, rank + i]);
            downLeft.push([file - i, rank - i]);
        }
        moves.push(upRight);
        moves.push(upLeft);
        moves.push(downRight);
        moves.push(downLeft);
        return moves;
    }
}