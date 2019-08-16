import React from 'react';
import ReactDOM from 'react-dom';
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Confetti from 'react-confetti';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

function Square(props) {
    let squareClass = props.isWinnerSquare ? "square square-winner" : "square";
    squareClass = squareClass + ' ' + props.cssClass;
    return (
        <button className={squareClass} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i, isWinnerSquare, positionSquare) {
        let cssClass = '';
        if (i === 1 || i === 7) {
            cssClass = 'row1';
        } else if (i === 3 || i === 5) {
            cssClass = 'row2';
        } else if (i === 4) {
            cssClass = 'row3';
        }

        return <Square
            cssClass={cssClass}
            key={"Square" + i}
            value={this.props.squares[i]}
            isWinnerSquare={isWinnerSquare}
            onClick={() => { this.props.onClick(i, positionSquare) }}
        />;
    }

    generateSquares() {
        let table = [];
        let counter = 0;

        for (let i = 0; i < 3; i++) {
            let row = [];

            for (let j = 0; j < 3; j++) {
                let positionSquare = i + "," + j;
                let winnerSquare = this.props.winnerSquares && this.props.winnerSquares.toString().includes(counter) ? true : false;
                row.push(this.renderSquare(counter, winnerSquare, positionSquare));
                counter = counter + 1;
            }

            table.push(
                <div key={"row" + i} className="board-row">
                    {row}
                </div>);
        }
        return table;
    }

    render() {
        return (
            this.generateSquares()
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                movementIn: '',
            }],
            stepNumber: 0,
            xIsNext: true,
            orderAscMoves: true
        };
    }

    handleClick(i, positionSquare) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        console.log("History" + history);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                movementIn: positionSquare,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            orderAscMoves: this.state.orderAscMoves,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            let desc = move ?
                'Go to move #' + move :
                'Go to start';
            let movementIn = move ?
                '(' + this.state.history[move].movementIn + ')' :
                '';
            desc = desc + ' ' + movementIn;
            let cssClassButton = (move === this.state.stepNumber) ? "button-selected" : null;
            cssClassButton = cssClassButton + ' btn btn-warning';

            return (
                <div key={move}>
                    <button className={cssClassButton} onClick={() => { this.jumpTo(move) }}>{desc}</button>
                </div>
            )
        });

        let status;
        let pathWinner;
        let confettiWinner;
        if (!winner && this.state.stepNumber === 9) {
            status = '¡Game over! Result: Tie';
        } else if (winner) {
            status = 'Winner: ' + winner.winner;
            pathWinner = winner.pathWinner;
            confettiWinner = <Confetti
                width={1000}
                height={1000}
            />;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            pathWinner = null;
        }

        let statusOrder = "Sort descending";
        let icon = faArrowCircleDown;
        if (!this.state.orderAscMoves) {
            statusOrder = "Sort ascending";
            icon = faArrowCircleUp;
            moves.reverse();
        }

        return (
            <div>
                {confettiWinner}

                <Container className="title" fluid={true}>
                    <Row>
                        <Col sm={12}>Tic Tac Toe</Col>
                    </Row>
                </Container>

                <Container>
                    <Row className="content">
                        <Col sm={6} className="colGame">
                            <div className="game">
                                <div className="game-board">
                                    <Board
                                        squares={current.squares}
                                        winnerSquares={pathWinner}
                                        onClick={(i, positionSquare) => { this.handleClick(i, positionSquare) }} />
                                </div>
                            </div>
                            <div className="status">{status}</div>
                        </Col>
                        <Col sm={6}>
                            <div className="game-info">
                                {moves}
                                <button className={"btn btn-success"} onClick={() => {
                                    this.setState({
                                        orderAscMoves: !this.state.orderAscMoves
                                    });
                                }}>
                                    <FontAwesomeIcon icon={icon} />
                                    {" " + statusOrder}
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winner = {
                winner: squares[a],
                pathWinner: lines[i]
            }
            return winner;
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
