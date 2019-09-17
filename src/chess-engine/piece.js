export default class Piece {
    constructor(color, position, board, name, value) {
        this.color = color;
        this.position = position;
        this.name = name;
        this.value = value;
        this.board = board;
        this.moves = [];
    }

    valid_moves() {

        let generatedMoves = this._generate_move_sequences();

        generatedMoves = generatedMoves.map(direction => direction.filter(pos => !(pos[0] < 0 || pos[0] > this.board.getDims() - 1 || pos[1] < 0 || pos[1] > this.board.getDims() - 1)));

        generatedMoves.forEach((direction) => direction.forEach((pos, index) => {
            if (this.board.getSquare(pos[0], pos[1]).getPiece() !== null && this.board.getSquare(pos[0], pos[1]).getPiece().getColor() === this.color) {
                direction.splice(index);
            } else if (this.board.getSquare(pos[0], pos[1]).getPiece() !== null && this.board.getSquare(pos[0], pos[1]).getPiece().getColor() !== this.color) {
                direction.splice(index + 1);
            }
        }))
        this.moves = generatedMoves.flat();
        return generatedMoves.flat();
    }

    _generate_move_sequences() {return [];}
    getColor() {return this.color;}
    getPosition() {return this.position;}
    getName() {return this.name;}
    getValue() {return this.value;}
}