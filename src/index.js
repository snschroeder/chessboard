import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Board from './board/Board'
import GameState from './chess-engine/gamestate'

let gameState = new GameState()
gameState.initNewGame()
let currentTurn = gameState.getCurrentTurn()


ReactDOM.render(<Board gameState={gameState} currentTurn={currentTurn} />, document.getElementById('root'));