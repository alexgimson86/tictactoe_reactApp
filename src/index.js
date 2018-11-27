import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

      return (
        <button className="square" onClick={()=> props.onClick()}>
          {props.value}
        </button>
      );
    }
  
  class Board extends React.Component {
    renderSquare(i) {
      return(<Square value={this.props.squares[i]}
      onClick= {()=>this.props.onClick(i)}/>);
    }
   
  
    render() {
      
      
  
      return (
        <div>
          <div className="status"></div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
 class Clock extends React.Component { 
   constructor(props){
      super(props)
      this.state = {
        date: new Date(),

      }
   };

    getTime(){ 
        this.setState({
          date: new Date(),
        })

    }
    componentDidMount(){
      this.timerID = setInterval(()=>this.getTime(),1000);
    }
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    render(){

      return (<div className="Clock"><h2>{this.state.date.toLocaleTimeString()}</h2></div>);
    };

  }
  class Game extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          history:  [{squares:Array(9).fill(null)}],
          XisNext: true,
          stepNumber: 0,
        }
      };
    
    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1]
      const squares = current.squares.slice()
      
      const winner = calcWinner(current.squares)
      if(winner || squares[i]){
        return;
      } 
      squares[i] = this.state.XisNext ? 'X' : 'O'
      this.setState({history: history.concat([{squares : squares}]), XisNext: !this.state.XisNext, stepNumber: history.length});
    }
    jumpTo(move){
        var x = move % 2 ? false : true;
        this.setState({
          stepNumber: move,
          XisNext: x
        });
    }

    
    render() {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1]
      const winner = calcWinner(current.squares)
      const moves = history.map((step,move)=>{
      const desc = move ? "go to move # " + move : "go to start"
      return(
        <li key={move}>
             <button onClick={()=>this.jumpTo(move)}>{desc}</button>
            </li>
        );
      }); 
      
      
      let status = ""
      if(winner){
         status = winner + " wins game!"
      }
      else{
        if(this.state.XisNext === true){
           status = "X is next";
        }
        else{
           status = "O is next"
        }

      }

      return (
        <div className="game">
          <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  function calcWinner(squares){
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ]
    
    for (let i =0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
  }
    return null
  }
  // ========================================
  
  ReactDOM.render(
   <Game />,
    document.getElementById('root')
  );
  ReactDOM.render(
    <Clock />,
     document.getElementById('clock')
   );