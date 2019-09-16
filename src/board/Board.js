import React from 'react';
import './board.css'
import Piece from './piece/Piece'
//import Square from './square/Square'
import Gamestate from '../chess-app/src/gamestate'
import Piecelist from './pieceslist/Piecelist'



export default class Board extends React.Component {
  state = {
    boardHeight: null,
    boardWidth: null,
    squareSize: null,
    board: this.props.board,
    pieces: [], 
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(() => {
      this.setState({renderPieces: true})
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


  // displayStartPos = () => {
  //   let piecesJSX = this.state.board.map((row, rInd) => row.map((col, cInd) => {
  //     if (col.piece) {

  //       let pieceClass = `${col.getPiece().getColor()}-${col.getPiece().getName()}`;
  //       let id = `${col.letter}-${col.getPiece().getName()}`;
  //       let pos = { x: (7 - cInd) * this.state.squareSize, y: (7 - rInd) * this.state.squareSize }

  //       return <Piece square={col.notation} pieceType={pieceClass} id={id} pos={pos} />
  //     } else {
  //       return null;
  //     }
  //   }))
  //   return piecesJSX;
  // }

  onChange = (x, y) => {
    if (x > 300 && y > 300) {
      let snapX = Math.round((x / this.state.squareSize)) * this.state.squareSize;
      let snapY = Math.round((y / this.state.squareSize)) * this.state.squareSize;

      this.setState({
        pos: { x: snapX, y: snapY }
      })
    } else {
      this.setState({
        pos: this.state.pos
      })
    }
  }


  render() {
    return (
      <div className="board" id="board">

        <Piecelist board={this.state.board} squareSize={this.state.squareSize} />
      </div>
    );
  }
}


// <Piece square='0101' pieceType='pawn' id='a-pawn' updatePos={this.onChange} pos={this.state.pos} />
// <Piece square='0101' pieceType='pawn' id='b-pawn' updatePos={this.onChange} pos={{x: this.statesquareSize, y: this.state.squareSize}} /> {/* <Square square='0101' />
//<Square square='0102' /> 