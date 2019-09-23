import React from 'react';
import Piece from '../piece/Piece'

export default class Piecelist extends React.Component {
    state = {
        pieces: []
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.generatePieceData()
        }, 50)
    }

    generatePieceData = () => {
        let pieceData = this.props.gameState.board.playArea.map((row, rInd) => row.map((col, cInd) => {
            if (col.piece) {
                let pieceClass = `${col.getPiece().getColor()}-${col.getPiece().getName()}`;
                let pieceId = `${col.getPiece().getColor()}-${col.letter}-${col.getPiece().getName()}`;
                let position = { x: cInd, y: rInd }
                return { color: col.getPiece().getColor(), notation: col.notation, pieceType: pieceClass, id: pieceId, pos: position}
            } else {
                return null;
            }
        }))
        pieceData = pieceData.map(row => row.filter(item => item)).flat();

        this.props.updatePieces(pieceData)
    }

    displayPiecesPos = () => {
        let piecesJSX = this.props.pieces.map(piece => {
            return <Piece
                color={piece.color}
                square={piece.notation}
                pieceType={piece.pieceType}
                id={piece.id}
                pos={piece.pos}
                key={piece.id}
                squareSize={this.props.squareSize}
                updatePos={this.props.updatePos} />
        })
        return piecesJSX;
    }

    render() {
        return (
            <>
                {this.displayPiecesPos()}
            </>
        )
    }
}