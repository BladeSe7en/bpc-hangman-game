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
      didYouWin         : false,
      letter            : '',
      isGameOver        : false,
      isGameShowing     : false,
      isMainPageShowing : true,
      isScorePage        : false,
      isScoreShowing    : false,
      strike            : 0
    };

    this.currentWord               = this.currentWord.bind(this);
    this.handleChange              = this.handleChange.bind(this);
    this.handleClick               = this.handleClick.bind(this);
    this.handleStateCatagory       = this.handleStateCatagory .bind(this);
    this.handleSameCatagoryNewWord = this.handleSameCatagoryNewWord .bind(this);
    this.handleStateDidYouWin      = this.handleStateDidYouWin.bind(this);
    this.handleStateGameOver       = this.handleStateGameOver.bind(this);
    this.handleStateWord           = this.handleStateWord.bind(this);
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

  sameCatagoryNewWord() {
    var index = Math.floor(Math.random() * this.state.data.length);
    console.log('this is index: ', index);
    console.log('this is data: ', this.state.data[index]);
    console.log('this is length: ', this.state.data.length);
    this.setState({
      allGuesses        : [],
      correctGuesses    : [],
      isGameOver        : false,
      letter            : '',
      strike            : 0,
      wrongGuessesLeft  : 6,
    });
    this.setState({isGameOver: false});
    this.setState({currentWord: ( this.state.data[index].word.split('') )});
  }
  
  handleChange(e) {
    this.setState({ catagory: e.target.value.toLowerCase() });
  }

  handleStateWord(word)  {
    console.log('this is word: ',word);
    this.setState({currentWord: word});
  }

  handleStateGameOver(boolean)  {
    console.log('this is GameOver: ',boolean);
    this.setState({isGameOver: boolean});
  }

  handleStateDidYouWin(boolean)  {
    console.log('Did You Win: ',boolean);
    this.setState({didYouWin: boolean});
  }

  handleStateCatagory(word)  {
    console.log('this is catagory: ',word);
    this.currentWord(word);
  }

  handleSameCatagoryNewWord(word)  {
    console.log('this is sameCatagoryNewWord: ',word);
    this.sameCatagoryNewWord(word);
  }

  render() {
    if (this.state.isMainPageShowing === false) {
        if (this.state.isGameOver === true) {
        return (
          <ScorePage
            changeCurrentWord         = {this.currentWord}
            currentWord               = {this.state.currentWord}
            didYouWin                 = {this.state.didYouWin}
            handleChange              = {this.handleChange}
            handleStateCatagory       = {this.handleStateCatagory}
            handleSameCatagoryNewWord = {this.handleSameCatagoryNewWord}
            handleStateGameOver       = {this.handleStateGameOver}
            handleStateWord           = {this.handleStateWord}
            isGameOver                = {this.state.isGameOver}
            // strike                    = {this.state.strke}
          />)
        
      } else {
        return (   
            <GamePage
            currentWord          = {this.state.currentWord}
            data                 = {this.state.data}
            handleCurrentWord    = {this.handleCurrentWord}
            handleStateCatagory  = {this.handleStateCatagory}
            handleStateDidYouWin = {this.handleStateDidYouWin}
            handleStateGameOver  = {this.handleStateGameOver}
              />
         )

       }
    
    } else {       
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
}