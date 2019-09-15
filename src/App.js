import React from 'react';
import Board from './board/Board';

export default class App extends React.Component {

  render() {
    return (
      <main className='App'>
        <Board />
      </main>
    );
  }
}