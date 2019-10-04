import React from 'react';
import ChessBot from '../chessBot/chessBot'
import Piecelist from './pieceslist/Piecelist'
import GameState from '../chess-engine/gamestate'


export default class ReactChessBot extends React.Component {
    state = {
        chessBot: new ChessBot(),
        boardHeight: null,
        boardWidth: null,
        squareSize: null,
        gameState: new GameState(), // can gameState be extracted and passed as a props instead? That would remove the game logic from rendering
        pieces: [],
    }

    board = React.createRef();

    componentDidMount() {
        this.updateDimensions();
        this.state.gameState.initNewGame();
        window.addEventListener('resize', this.updateDimensions);
        setTimeout(() => {
            this.updatePieceList();
        }, 50)
        setTimeout(() => {
            this.makeRandomMove();
            this.updatePieceList();
        }, 100)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        let board = this.board.current;
        let square = board.clientWidth / 8;
        this.setState({
            boardHeight: board.clientHeight,
            boardWidth: board.clientWidth,
            squareSize: square,
        })
    }

    updatePieceList = () => {
        const pieceList = this.generatePiecePosition();
        this.setState({ pieces: pieceList })
    }

    generatePiecePosition = () => {
        let pieceData = this.state.gameState.board.playArea.map(row => row.map(col => {
            if (col.getPiece() !== null) {
                let piece = col.getPiece();
                return {
                    color: piece.getColor(),
                    notation: piece.notation,
                    pieceType: `${piece.getColor()}-${piece.getName()}`,
                    id: piece.getId(),
                    pos: { x: piece.position[1], y: piece.position[0] }
                }
            } else {
                return null;
            }
        }))
        pieceData = pieceData.flat();
        pieceData = pieceData.filter(piece => piece !== null)
        return pieceData;
    }

    //update to use pieceId to find moving piece rather than position

    onChange = (x, y, pieceId, piecePos) => {
        let piecePosArr = [piecePos.y, piecePos.x]
        let snapX = Math.round((x / this.state.squareSize));
        let snapY = Math.round((y / this.state.squareSize));
        let piece;

        let move = this.state.gameState.isValidMove(piecePosArr, [snapY, snapX])

        if (move) {
            this.state.gameState.board.playArea.forEach(row => row.forEach(col => {
                if (col.position[0] === piecePos.x && col.position[1] === piecePos.y) {
                    piece = col.getPiece()
                }
            }))
            this.state.gameState.turn(piece, [snapY, snapX])
            this.updatePieceList();
            setTimeout(() => {
                this.makeRandomMove();
                this.updatePieceList();
                console.log(this.state.gameState.evaluateBoard())
            }, 100);
        }
    }

    makeRandomMove() {
        if (this.state.gameState.currentState[0].player === 'white') {
            let legalMoves = this.state.gameState.generateAllLegalMoves('white');
            legalMoves = legalMoves.filter(piece => piece.moves.length !== 0);
            const randomPiece = legalMoves[Math.floor(Math.random() * Math.floor(legalMoves.length))]
            let randomMove = randomPiece.moves[Math.floor(Math.random() * Math.floor(randomPiece.moves.length))]
            this.state.gameState.turn(randomPiece, randomMove);
        }
    }

    // makeBestMove() {
    //     if (this.state.gameState.currentState[0].player === 'white') {
    //         let legalMoves = this.state.gameState.generateAllLegalMoves('white');
    //         let best = { piece: null, move: null };
    //         let gauge = this.state.gameState.evaluateBoard();

    //         legalMoves = legalMoves.filter(piece => piece.moves.length !== 0);

    //         legalMoves.forEach(piece => {
    //             piece.moves.forEach(move => {
    //                 if (piece && move) {
    //                     let tmpGauge = this.state.gameState.simulateTurn(piece, move);
    //                     if (tmpGauge > gauge) {
    //                         best = { piece, move };
    //                         gauge = tmpGauge;
    //                     }
    //                 }
    //             })
    //         })
    //         this.state.gameState.turn(best.piece, best.move);
    //     }
    // }

    render() {
        return (
            <>
                <div className="board" ref={this.board} >
                    <Piecelist
                        squareSize={this.state.squareSize}
                        pieces={this.state.pieces}
                        updatePos={this.onChange} />
                </div>


            </>
        );
    }
}