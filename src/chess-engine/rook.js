import Piece from './piece';

export default class Rook extends Piece {
    constructor(color, position, board) {
        super(color, position, board, 'rook', 5);
        this.hasNotMoved = true;
        this.board = board;
    }
    _generate_move_sequences() {
        let moves = [], rankUp = [], rankDown = [], fileRight = [], fileLeft = [];
        let file = this.position[0], rank = this.position[1];

        for (let i = 1; i < 8; i++) {
            fileRight.push([file + i, rank]);
            fileLeft.push([file - i, rank]);
            rankUp.push([file, rank + i]);
            rankDown.push([file, rank - i]);
        }
        moves.push(fileRight);
        moves.push(fileLeft);
        moves.push(rankUp);
        moves.push(rankDown);
        return moves;
    }
    getHasNotMoved() { return this.hasNotMoved; }
    hasMoved() { this.hasNotMoved = false; }
}