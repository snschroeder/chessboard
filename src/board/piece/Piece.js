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
    let top = elem.getBoundingClientRect().top;
    let left = elem.getBoundingClientRect().left;
    let x = elem.getBoundingClientRect().x;
    let y = elem.getBoundingClientRect().y;

    let updatedRel = {
      x: e.pageX - left,
      y: e.pageY - top
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

  //TODO if this all works, move the position updating to the parent
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
      top: this.state.dragPos.y + 'px'
    }
    const staticStyle = {
      left: this.props.pos.x + 'px',
      top: this.props.pos.y + 'px'
    }
    console.log(this.props.pos)
    return (
      <div className={this.props.pieceType} id={this.props.pieceId} style={this.state.dragging ? dragStyle : staticStyle} onMouseDown={this.onMouseDown}>
      </div>
    );
  }
}