import Square from './square';

export default class Board {
    constructor() {
        this.dims = 8;
        this.playArea = new Array(this.dims);
        this.alpha = 'ABCDEFGH';
    }

    createBoard() {
        for (let i = 0; i < this.dims; i++) {
            this.playArea[i] = new Array(this.dims);
        }
    }

    assignNotation() {
        for (let i = 0; i < this.dims; i++) {
            for (let j = 0; j < this.dims; j++) {
                this.playArea[i][j] = new Square(i, j);
            }
        }
    }

    assignColor() {
        for (let i = 0; i < this.dims; i ++) {
            if (i % 2 === 0) {
                for (let j = 0; j < this.dims; j+=2) {
                    this.playArea[i][j].setColor('dark');
                    this.playArea[i][j + 1].setColor('light');
                }
            } else {
                for (let k = 0; k < this.dims; k +=2) {
                    this.playArea[i][k].setColor('light');
                    this.playArea[i][k + 1].setColor('dark');
                }
            }
        }
    }

    findKing(color) {
        let piece;
        this.playArea.forEach(row => row.forEach(col => {
            if (col.getPiece() !== null) {
                if (col.getPiece().getName() === 'king' && col.getPiece().getColor() === color) {
                    piece = col.getPiece();
                }
            }
        }))  
        return piece;
    }

    findPieceByName(name, color) {
        let piece;
        this.playArea.forEach(row => row.forEach(col => {
            if (col.getPiece() !== null) {
                if (col.getPiece().getName() === name && col.getPiece().getColor() === color) {
                    piece = col.getPiece();
                }
            }
        }))  
        return piece;
    }
    
    getPieceBySquare(coords) {
        return this.getSquare(coords[0], coords[1]).getPiece();
    
    }

    getDims() {return this.dims;}
    getAlpha() {return this.alpha;}
    getSquare(rank, file) {return this.playArea[rank][file];}
    getPlayArea() {return this.playArea;}
}