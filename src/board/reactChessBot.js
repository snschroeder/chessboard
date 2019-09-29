import React from 'react';
import ChessBot from '../chessBot/chessBot'
import Board from './Board'


export default class ReactChessBot extends React.Component {
    state = {
        chessBot: new ChessBot(),
        gameState: this.props.gameState,
        botMoved: false,
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //     const {piece, move} = this.state.chessBot.initNewBotGame();
    //     this.props.gameState.turn(piece, move)
    //     }, 200)
    // }

    handleToggle = () => {
        this.setState({botMoved: false});
    }

    makeRandomMove() {
        if (this.props.gameState.currentState[0].player === 'white') {
            let legalMoves = this.props.gameState.generateAllLegalMoves('white');
            legalMoves = legalMoves.filter(piece => piece.moves.length !== 0);
            const randomPiece = legalMoves[Math.floor(Math.random() * Math.floor(legalMoves.length))]
            let randomMove = randomPiece.moves[Math.floor(Math.random() * Math.floor(randomPiece.moves.length))]
            this.state.gameState.turn(randomPiece, randomMove);
            this.setState({botMoved: true})
            console.log(randomPiece)
            console.log(this.props.gameState);
        }
    }

    render() {
        setTimeout(() => {
            this.makeRandomMove();
        }, 70)
        return (
            <Board gameState={this.state.gameState} botMoved={this.state.botMoved} toggleBotMoved={this.handleToggle} />
        )
    }
}