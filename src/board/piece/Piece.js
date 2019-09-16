import React from 'react';
import './piece.css'

export default class Piece extends React.Component {
  state = {
    pos: this.props.pos,
    dragPos: {x: 0, y: 0},
    dragging: false,
    rel: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dragging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && prevState.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  onMouseDown = e => {
    if (e.button !== 0) {
      return;
    }
    let elem = document.elementFromPoint(e.pageX, e.pageY)

    let updatedRel = {
      x: e.pageX - elem.offsetLeft,
      y: e.pageY - elem.offsetTop
    }
    this.setState({
      dragging: true,
      rel: updatedRel
    })
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp = e => {
    this.props.updatePos(this.state.dragPos.x, this.state.dragPos.y)
    this.setState({
      dragging: false,
      dragPos: {x: 0, y: 0}
    });

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove = e => {
    if (!this.state.dragging) {
      return
    }
    let updatedPos = {
      x: (e.pageX - this.state.rel.x),
      y: (e.pageY - this.state.rel.y)
    }

    this.setState({
      dragPos: updatedPos
    })
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const dragStyle = {
      left: this.state.dragPos.x + 'px',
      top: this.state.dragPos.y + 'px',
      zIndex: 9999,
    }

    const staticStyle = {
      left: this.props.pos.x + 'px',
      top: this.props.pos.y + 'px'
    }
    return (
      <div className={this.props.pieceType} id={this.props.pieceId} style={this.state.dragging ? dragStyle : staticStyle} onMouseDown={this.onMouseDown}>
      </div>
    );
  }
}