import React from 'react';
import Draggable from 'react-draggable';

export default class Piece extends React.Component {

  render() {
    return (
        <Draggable>
            <div className={this.props.square} id={this.props.pieceId}>
                <p>I am a piece</p>
            </div>
        </Draggable>

    );
  }
}