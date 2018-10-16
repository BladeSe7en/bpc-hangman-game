import React, { Component } from 'react';
import GamePage from './GamePage';
import ScorePage from './ScorePage';
var axios = require('axios');

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allGuesses        : [],
      catagory          : '',
      currentGuess      : [],
      currentWord       : [],
      data              : [],
      isGameShowing     : false,
      isMainPageShowing : true,
      isScoreShowing    : false,
      isScorePage        : false,
      letter            : '',
      isGameOver        : false
    };

    this.handleClick         = this.handleClick.bind(this);
    this.currentWord         = this.currentWord.bind(this);
    this.handleChange        = this.handleChange.bind(this);
    this.handleStateGameOver = this.handleStateGameOver.bind(this);
    this.handleStateWord     = this.handleStateWord.bind(this);

  }
  
  handleClick() {
    console.log('click handler was clicked');
    this.currentWord();
    this.setState({
      isMainPageShowing : false,
      isGameShowing   : true,
    });
  }

  currentWord() {
    var topic = this.state.catagory;
    console.log('this is topic ', topic);
    axios.get(`https://api.datamuse.com/words?topics=${topic}`)
    .then(response => {
      var index = Math.floor(Math.random() * response.data.length);
      console.log('this is index: ', index);
      console.log('this is data: ', response.data[index]);
      console.log('this is length: ', response.data.length);
      this.setState({
        currentWord : response.data[index].word.split(''),
        data        : response.data
      });
      
    })
    .catch((err) => {
      console.log(err);
      response.send(err);
    });
  }
  
  handleChange(e) {
    this.setState({ catagory: e.target.value.toLowerCase() });
  }

  handleStateWord(word)  {
    console.log('this is word: ',word);
    this.setState({currentWord: word});
    console.log('this is currentword after setState: ',this.state.currentWord);
  }

  handleStateGameOver(boolean)  {
    console.log('this is GameOver: ',boolean);
    this.setState({isGameOver: boolean});
    console.log('this is isGameOver after setState: ',this.state.isGameOver);
  }

  render() {
    const currentWord = this.state.currentWord;
    if (!this.state.isMainPageShowing) {

      if (this.state.isGameOver === true ) {
        return (
          <ScorePage
            handleStateWord      = {this.handleStateWord}
            handleStateGameOver  = {this.handleStateGameOver}
            isGameOver           = {this.state.isGameOver}
            data                 = {this.state.data}
            currentWord          = {currentWord}
          />)
        
      } else {
        return (   
            <GamePage
          currentWord         = {currentWord}
          data                = {this.state.data}
          handleCurrentWord   = {this.handleCurrentWord}
          handleStateGameOver = {this.handleStateGameOver}
              />
         )

       }
    }
            
    return (
      <div className="card-body">
        <div className="card">
          <img id="hangman-title-img" src="https://occ-0-901-1001.1.nflxso.net/art/87e01/5694568c69ef4be79164f46b967e7f4c1a387e01.png" />
          <h1 className="title">Instructions</h1>
          <p className="rules">The objective is simple. You must guess your word correctly before the full charactor is drawn. On the 6th wrong answer you will lose. At the cost of one move you may click the hint button to recieve a clue about the word </p>
          <p>To begin, please enter in a catagory.</p>
        </div>
        <button className="btn" onClick={this.handleClick}>start game</button>
        <input
          className ="catagory"
          value     ={this.state.catagory}
          onChange  ={this.handleChange} />

      </div>
    )
  }
}