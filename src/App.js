import React from 'react';
import Piece from './board/piece/Piece'
import Board from './board/Board'

export default class App extends React.Component {

  render() {
    return (
      <main className='App'>
        <Board />
        <Piece />
      </main>
    );
  }
}