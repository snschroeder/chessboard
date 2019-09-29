import React from 'react';
import './board.css'
import Piecelist from './pieceslist/Piecelist'
import GameState from '../chess-engine/gamestate';

export default class Board extends React.Component {
  state = {
    boardHeight: null,
    boardWidth: null,
    squareSize: null,
    gameState: this.props.gameState, //new GameState(), // can gameState be extracted and passed as a props instead? That would remove the game logic from rendering
    pieces: [],
  }

  board = React.createRef();

  componentDidMount() {
    this.updateDimensions();
    this.state.gameState.initNewGame();
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(() => {
      this.updatePieceList()
    }, 50)
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
    }
  }

  render() {
    if (this.props.botMoved) {
      this.updatePieceList();
      this.props.toggleBotMoved();
    }
    return (
      <div className="board" ref={this.board} >

        <Piecelist
          squareSize={this.state.squareSize}
          pieces={this.state.pieces}
          updatePos={this.onChange} />
      </div>
    );
  }
}