import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
};


const Board = (props) => {
    return (
        <div>
            <div className="board-row">
                <Square value={props.squares[0]} onClick={() => props.handleClick(0)}/>
                <Square value={props.squares[1]} onClick={() => props.handleClick(1)} />
                <Square value={props.squares[2]} onClick={() => props.handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={props.squares[3]} onClick={() => props.handleClick(3)}/>
                <Square value={props.squares[4]} onClick={() => props.handleClick(4)}/>
                <Square value={props.squares[5]} onClick={() => props.handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={props.squares[6]} onClick={() => props.handleClick(6)}/>
                <Square value={props.squares[7]} onClick={() => props.handleClick(7)}/>
                <Square value={props.squares[8]} onClick={() => props.handleClick(8)}/>
            </div>
        </div>
    );
}

const Game = () => {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const nextPlayer = "Next player: " + (xIsNext ? "X" : "O");
    const current = history[stepNumber].squares;
    const winner = calculateWinner(current);

    function handleClick(i) {
        const historyCopy = history.slice(0, stepNumber + 1)
        const current = historyCopy[historyCopy.length-1].squares;
        if (!winner && !current[i]) {
            const squares= current.slice();
            if (xIsNext) squares[i] = 'X';
            else squares[i] = 'O';
            setHistory(history.concat([{
                squares: squares
            }]));
            setXIsNext(!xIsNext)
            setStepNumber(history.length)
        }
    }

    function jumpTo(step) {
        setStepNumber(step)
        setXIsNext(step % 2 === 0)
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li className="movement-list" key={move}>
                <button className="movement-button" onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    function restartGame(){
        setHistory([{squares: Array(9).fill(null)}])
        setXIsNext(true)
        setStepNumber(0)
    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{winner ? "The winner is " + winner : nextPlayer}</div>
                <Board squares={current} handleClick={handleClick}/>
                <button className="restart-button" onClick={()=> restartGame()}> restart game</button>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
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
            return squares[a];
        }
    }
    return null;
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
