import React from 'react';
import './board.css'

//import Square from './square/Square'

import Piecelist from './pieceslist/Piecelist'



export default class Board extends React.Component {
  state = {
    boardHeight: null,
    boardWidth: null,
    squareSize: null,
    gameState: this.props.gameState,
    board: this.props.gameState.board.playArea,
    pieces: [],
    currentTurn: this.props.currentTurn
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(() => {
      this.setState({ renderPieces: true })
    }, 1500)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    let board = document.getElementById('board');
    let square = board.scrollWidth / 8;
    this.setState({
      boardHeight: board.scrollHeight,
      boardWidth: board.scrollWidth,
      squareSize: square,
    })
  }

  updatePieceList = (pieceList) => {
    this.setState({ pieces: pieceList })
  }




  onChange = (x, y, pieceId, piecePos) => {
    let piecePosArr = [piecePos.y, piecePos.x]
    let piece;
    let snapX = Math.round((x / this.state.squareSize));
    let snapY = Math.round((y / this.state.squareSize));

    let arrayX = 7 - snapX;
    let arrayY = 7- snapY;

    this.state.board.forEach(row => row.forEach(col => {
      if (col.position[0] === piecePos.x && col.position[1] === piecePos.y) {
        piece = col.getPiece()
      }
    }))


    let move = this.state.gameState.move(piecePosArr, [arrayY, arrayX])
    console.log(move)

    if (move) {
      console.log('inside movement')
      let updatedPieces = [];

      updatedPieces = this.state.pieces.filter(piece => {

        return !(piece.pos.x === snapX && piece.pos.y === snapY)
      })

      updatedPieces = updatedPieces.map(piece => {
        if (piece.id === pieceId) {
          piece.pos = { x: snapX, y: snapY };
          return piece;
        } else {
          return piece
        }
      })



      this.setState({
        pieces: updatedPieces
      })
    }
  }


  render() {
    return (
      <div className="board" id="board">

        <Piecelist
          board={this.state.board}
          squareSize={this.state.squareSize}
          pieces={this.state.pieces}
          updatePos={this.onChange}
          updatePieces={this.updatePieceList} />
      </div>
    );
  }
}


// <Piece square='0101' pieceType='pawn' id='a-pawn' updatePos={this.onChange} pos={this.state.pos} />
// <Piece square='0101' pieceType='pawn' id='b-pawn' updatePos={this.onChange} pos={{x: this.statesquareSize, y: this.state.squareSize}} /> {/* <Square square='0101' />
//<Square square='0102' /> 