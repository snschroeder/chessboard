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
        let pieceData = this.props.board.map((row, rInd) => row.map((col, cInd) => {
            if (col.piece) {
                let pieceClass = `${col.getPiece().getColor()}-${col.getPiece().getName()}`;
                let pieceId = `${col.getPiece().getColor()}-${col.letter}-${col.getPiece().getName()}`;
                let position = { x: (7 - cInd) * this.props.squareSize, y: (7 - rInd) * this.props.squareSize }
                return { notation: col.notation, pieceType: pieceClass, id: pieceId, pos: position }
            } else {
                return null;
            }
        }))
        pieceData = pieceData.map(row => row.filter(item => item)).flat();
        this.setState({
            pieces: pieceData
        })
    }

    displayPiecesPos = () => {
        let piecesJSX = this.state.pieces.map(piece => {
            return <Piece square={piece.notation} pieceType={piece.pieceType} id={piece.id} pos={piece.pos} key={piece.id}/>
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