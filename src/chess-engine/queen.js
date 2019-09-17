import Piece from './piece';

export default class Queen extends Piece {
    constructor(color, position, board) {
        super(color, position, board, 'queen', 9);
        this.board = board;
    }
    _generate_move_sequences() {
        const moves = [], upRight = [], upLeft = [], downRight = [], downLeft = [], rankUp = [], rankDown = [], fileRight = [], fileLeft = [];
        let file = this.position[0], rank = this.position[1];

        for (let i = 1; i < this.board.getDims(); i++) {
            upRight.push([file + i, rank + i]);
            upLeft.push([file + i, rank - i]);
            downRight.push([file - i, rank + i]);
            downLeft.push([file - i, rank - i]);
            rankUp.push([file + i, rank]);
            rankDown.push([file - i, rank]);
            fileRight.push([file, rank + i]);
            fileLeft.push([file, rank - i]);
        }
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
}