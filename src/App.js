import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      maxSteps: 0,
      totalX: 0,
      totalO: 0
    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  }

  isWinner = () => {
    let s = (this.state.count % 2 === 0) ? 'X' : 'O';
    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if (this.state.squares[line[0]] === s
        && this.state.squares[line[1]] === s
        && this.state.squares[line[2]] === s) {
        alert(s + ' win');
        if (s === 'X') {
          this.setState({ totalX: this.state.totalX + 1 })
        } else if (s === 'O') {
          this.setState({ totalO: this.state.totalO + 1 })
        }
        setTimeout(() => {
          this.setState({ squares: Array(9).fill(null) });
          this.setState({ count: 0 });
          this.setState({ maxSteps: 0 })
        }, 1000);
      }
    }
  }

  clickHandler = event => {
    // data - номер квадрата по которому кликнули
    let data = event.target.getAttribute('data');
    let currentSquares = this.state.squares;
    if (currentSquares[data] == null) {
      currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
      this.setState({ count: this.state.count + 1 })
      this.setState({ squares: currentSquares })
      this.setState({ maxSteps: this.state.maxSteps + 1 })
    } else {
      if (this.state.maxSteps !== 9) {
        alert('Так нельзя');
      }
    }
    this.isWinner();

    if (this.state.maxSteps === 9) {
      alert('Ничья')
      setTimeout(() => {
        this.setState({ squares: Array(9).fill(null) });
        this.setState({ count: 0 });
        this.setState({ maxSteps: 0 });
      }, 1000);
    }
  }

  reset = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ count: 0 });
    this.setState({ maxSteps: 0 });
  }

  choise = (e) => {
    if (e.target.getAttribute('data') === 'o') {
      this.setState({ count: this.state.count + 1 })
    }
    document.querySelector('.choise').style.display = 'none';
    document.querySelector('.tic-tac-toe').style.display = 'block';
    document.querySelector('.reset').style.display = 'block';
    document.querySelector('.total').style.display = 'block';
  }

  render() {
    return (
      <div className='App'>
        <div className='choise'>
          <p>Первый ходит X или O?</p>
          <div>
            <button onClick={this.choise} data='x'>X</button>
            <button onClick={this.choise} data='o'>O</button>
          </div>
        </div>
        <div className="tic-tac-toe">
          <div className='ttt-grid' onClick={this.clickHandler} data='0'>{this.state.squares[0]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='1'>{this.state.squares[1]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='2'>{this.state.squares[2]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='3'>{this.state.squares[3]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='4'>{this.state.squares[4]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='5'>{this.state.squares[5]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='6'>{this.state.squares[6]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='7'>{this.state.squares[7]}</div>
          <div className='ttt-grid' onClick={this.clickHandler} data='8'>{this.state.squares[8]}</div>
        </div>
        <button className='reset' onClick={this.reset}>New Game</button>
        <hr />
        <div className='total'><hr />X wins: {this.state.totalX}   |||   O wins: {this.state.totalO}<hr /></div>
        <hr />
      </div>
    )
  }
}

export default App;
