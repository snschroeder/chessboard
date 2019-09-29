import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board/Board'
import GameState from './chess-engine/gamestate'
import ReactChessBot from './board/reactChessBot'

let gameState = new GameState();

ReactDOM.render(<ReactChessBot gameState={gameState} />, document.getElementById('root'));