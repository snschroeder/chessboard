export default class Square {
    constructor(rank, file) {
        this.letter = 'HGFEDCBA'[file];
        this.number = rank + 1;
        this.notation = this.letter + this.number;
        this.position = [file, rank];
        this.color = null;
        this.piece = null;
    }
    setColor(color) {this.color = color;}
    setPiece(piece) {this.piece = piece;}
    getPiece() {return this.piece;}
    removePiece() {this.piece = null;}
}