import React from 'react';
import './board.css'
import Piece from './piece/Piece'
import Square from './square/Square'


export default class Board extends React.Component {
  state = {
    name: 'pawn',
    square: '0101',
    pos: { x: 0, y: 0 }
  }

  onChange = (x, y) => {
    if (x > 300 && y > 300) {
      console.log('x: ' + x, 'y: ' + y)
      let snapX = Math.round((x / 125)) * 125;
      let snapY = Math.round((y / 125)) * 125;
      console.log(snapX)

      this.setState({
        pos: { x: snapX, y: snapY }
      })
    } else {
      console.log('condition not met')
      this.setState({
        pos: this.state.pos
      })
    }


  }


  render() {
    return (
      <div className="board" id="board">
        <Square square='0101' />
        <Square square='0102' />
        <Piece square='0101' pieceType='pawn' id='a-pawn' updatePos={this.onChange} pos={this.state.pos} />
      </div>
    );
  }
}