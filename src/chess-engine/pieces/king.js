import Piece from './piece';

export default class King extends Piece {
    constructor(color, position, board) {
        super(color, position, board, 'king', 9999);
        this.hasNotMoved = true;
        this.board = board;
    }
    _generate_move_sequences() {
        const moves = [], upRight = [], upLeft = [], downRight = [], downLeft = [], rankUp = [], rankDown = [], fileRight = [], fileLeft = [];
        let file = this.position[0], rank = this.position[1];

        upRight.push([file + 1, rank + 1]);
        upLeft.push([file + 1, rank - 1]);
        downRight.push([file - 1, rank + 1]);
        downLeft.push([file - 1, rank - 1]);
        rankUp.push([file + 1, rank]);
        rankDown.push([file - 1, rank]);
        fileRight.push([file, rank + 1]);
        fileLeft.push([file, rank - 1]);

        moves.push(upRight);
        moves.push(upLeft);
        moves.push(downRight);
        moves.push(downLeft);
        moves.push(rankUp);
        moves.push(rankDown);
        moves.push(fileRight);
        moves.push(fileLeft);
        
        return moves;
    }

    getHasNotMoved() { return this.hasNotMoved; }
    setHasNotMoved(bool) {this.hasNotMoved = bool;}
    hasMoved() { this.hasNotMoved = false; }
}