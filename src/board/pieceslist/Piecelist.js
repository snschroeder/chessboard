/* TODO
    9/17 goals:

    ---- done ----- remove pieces from the pieces array when an opposite color piece lands on the same square

    Integrate game engine
        identify whose turn it is
        create list of legal moves
        if move is within legal moves list
            move piece
            capture if necessary
            change turns
        else 
            wait for new move
    
    this week goals:
        get resize working correctly
        display piece graveyard
        display point differential

        spin board and allow 2P 1 comp play

        integrate smoke and snapshot tests

        fix display glitch where piece appears in top left immediate on pick up - can we set drag pos to pos?

    Long term goals:

        add option to hightlight valid moves

        integrate stockfish? or other chess engine

        integrate customizable turn timer

        create websocket to allow online play

        create chat

        create username/avatar info and display

        Chess opening explorer?

        chess puzzles?
*/





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