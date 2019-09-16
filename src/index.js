import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Board from './board/Board'
import GameState from './chess-app/src/gamestate';

let gameState = new GameState()
gameState.initNewGame()
let board = gameState.board.playArea

ReactDOM.render(<Board board={board} />, document.getElementById('root'));