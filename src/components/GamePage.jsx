import React, { Component } from 'react';
import Word from './Word';
var axios = require('axios');

class GamePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isMainPageShowing : true,
        isGameShowing     : false,
        isScoreShowing    : false,
        correctGuesses    : [],
        allGuesses        : [],
        letter            : '',
        strike            : 0,
        wrongGuessesLeft  : 6,
        catagory          : '',
        
      };
  
      this.handleChange    = this.handleChange.bind(this);
      this.handleClick     = this.handleClick.bind(this);
      this.handleSubmit    = this.handleSubmit.bind(this);
    }
  
    handleChange(e) {
      //this.setState({ catagory: e.target.value.toLowerCase() });
      var localCatagory = e.target.value.toLowerCase();
      this.props.handleStateCatagory(localCatagory);
      console.log('this is localCatagory: ', localCatagory);
    }
  
    handleClick() {
      console.log('click handler was clicked');
      this.currentWord();
      this.setState({
        isGameOver: false,
      });
    }

    handleSubmit(currentGuess) {
        //this function checks to see if the current word includes the letter that the user guessed.
        //if the guess is in the current word it is updating the state of correct guesses by adding the current guess to the correct guesses array
        //it is also updating all guesses by adding each current guess to the array regardless if the guess is correct or not
        //if the current guess is not apart of the current word it updates the state of strike by adding one to the count
        //and it also updates the all guesses state by adding the current guess in the array
  
        if (this.props.currentWord.includes(currentGuess)) {
            this.isGameOver();
          this.setState({
            allGuesses      : this.state.allGuesses.concat(currentGuess),
            correctGuesses  : this.state.correctGuesses.concat(currentGuess),
          });
        }
        else {
          this.isGameOver( this.state.strike + 1);
          this.setState({
            allGuesses        : this.state.allGuesses.concat(currentGuess),
            strike            : this.state.strike + 1,
            wrongGuessesLeft  : (+(this.state.wrongGuessesLeft)-1),
          })
        }
        
      }
  
    isGameOver(n) {
      console.log('testing isGameOver');
      console.log('this is currentWord: ',   this.props.currentWord);
      console.log('this is correctGuesses: ',this.state.correctGuesses);
      if (n == 6) {
        console.log('strike is at 6, should update state now');
        this.props.handleStateDidYouWin(false);
        this.props.handleStateGameOver(true);
      }
      var setWord = [...new Set(this.props.currentWord)];
      var setCorrect = [...new Set(this.state.correctGuesses)];
      console.log('this is setword: ',          setWord);
      console.log('this is setCorrect: ',       setCorrect);
      console.log('this is setword.length: ',   setWord.length);
      console.log('this is setCorrect.length: ',setCorrect.length);

     
     if (setWord.length-1 == setCorrect.length) {
        console.log('currentWord is now equal to correctGuesses');
         this.props.handleStateGameOver(true);
         this.props.handleStateDidYouWin(true);
        } 
      
    }
  
  
      letterImg(letter) {
        if (letter.toLowerCase() === "a") {
          return "A";
        }
        if (letter.toLowerCase() === "b") {
          return 'B';
        }
        if (letter.toLowerCase() === "c") {
          return 'C';
        }
        if (letter.toLowerCase() === "d") {
          return 'D';
        }
        if (letter.toLowerCase() === "e") {
          return 'E';
        }
        if (letter.toLowerCase() === "f") {
          return 'F';
        }
        if (letter.toLowerCase() === "g") {
          return 'G';
        }
        if (letter.toLowerCase() === "h") {
          return 'H';
        }
        if (letter.toLowerCase() === "i") {
          return 'I';
        }
        if (letter.toLowerCase() === "j") {
          return 'J';
        }
        if (letter.toLowerCase() === "k") {
          return 'K';
        }
        if (letter.toLowerCase() === "l") {
          return 'L';
        }
        if (letter.toLowerCase() === "m") {
          return 'M';
        }
        if (letter.toLowerCase() === "n") {
          return 'N';
        }
        if (letter.toLowerCase() === "o") {
          return 'O';
        }
        if (letter.toLowerCase() === "p") {
          return 'P';
        }
        if (letter.toLowerCase() === "q") {
          return 'Q';
        }
        if (letter.toLowerCase() === "r") {
          return 'R';
        }
        if (letter.toLowerCase() === "s") {
          return 'S';
        }
        if (letter.toLowerCase() === 't') {
          return 'T';
        }
        if (letter.toLowerCase() === "u") {
          return 'U';
        }
        if (letter.toLowerCase() === "v") {
          return 'V';
        }
        if (letter.toLowerCase() === "w") {
          return 'W';
        }
        if (letter.toLowerCase() === "x") {
          return 'X';
        }
        if (letter.toLowerCase() === "y") {
          return 'Y';
        }
        if (letter.toLowerCase() === "z") {
          return 'Z';
        }
      }
  
      render() {
        
        var img = <img id="hangman-0" src="https://cdn.discordapp.com/attachments/374257557880963072/492878824501936149/hangman-0.png" />;
        var letter;
  
        if (this.state.strike === 1) {
          img = <img id="hangman-1" src="https://media.discordapp.net/attachments/374257557880963072/492878854529089547/hangman-1.png" />
        }
        if (this.state.strike === 2) {
          img = <img id="hangman-2" src="https://media.discordapp.net/attachments/374257557880963072/492878881896923150/hangman-2.png" />
        }
        if (this.state.strike === 3) {
          img = <img id="hangman-3" src="https://media.discordapp.net/attachments/374257557880963072/492878930995576832/hangman-3.png" />
        }
        if (this.state.strike === 4) {
          img = <img id="hangman-4" src="https://media.discordapp.net/attachments/374257557880963072/492878991133376523/hangman-4.png" />
        }
        if (this.state.strike === 5) {
          img = <img id="hangman-5" src="https://media.discordapp.net/attachments/374257557880963072/492879021600669716/hangman-5.png" />
        }
        if (this.state.strike === 6) {
          img = <img id="hangman-6" src="https://media.discordapp.net/attachments/374257557880963072/492879053070532618/hangman-6.png" />
        }
  
        return (
          <div>
            <div>
              <img id="title-2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
              <div className="all-guesses">
                {this.state.allGuesses && this.state.allGuesses.map(letter => {
                  //instead of returning span, invoke that function that you created, and return that
                  return this.letterImg(letter)
                })}
              </div>
            </div>
            <div className='guesses-left'>
             <h1>strikes left: {this.state.wrongGuessesLeft}</h1>
            </div>
  
            <div className="hangman">
              {img}
            </div>
            <Word
              correctGuesses    = {this.state.correctGuesses}
              currentWord       = {this.props.currentWord}
              handleSubmit      = {this.handleSubmit}
            />
          </div >
  
  
        )
      }
    }

    export default GamePage;

   