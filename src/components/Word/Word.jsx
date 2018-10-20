import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import TwoPlayer from '../TwoPlayerPage/TwoPlayerPage';

class Word extends Component {
  constructor(props) {
    super(props);
    this.enter        = this.enter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.isGameOver   = this.isGameOver.bind(this);
    this.letterImg    = this.letterImg.bind(this);
  }
  
  enter(e) {
    if (e.key == 'Enter') {
      this.handleSubmit();
    }
    console.log(e.key);
  }
  handleChange(e) {
    const { dispatch } = this.props;
    dispatch({ type: 'UPDATE_CURRENT_GUESS', payload: e.target.value.toLowerCase()});
  }

  handleSubmit() {
      //this function checks to see if the current word includes the letter that the user guessed.
      //if the guess is in the current word it is updating the state of correct guesses by adding the current guess to the correct guesses array
      //it is also updating all guesses by adding each current guess to the array regardless if the guess is correct or not
      //if the current guess is not apart of the current word it updates the state of strike by adding one to the count
      //and it also updates the all guesses state by adding the current guess in the array
      let currentGuess = this.props.currentGuess;
      const { dispatch } = this.props;
      this.isGameOver();
      dispatch({ type: 'UPDATE_ALL_GUESSES'             , payload: this.props.allGuesses.concat(currentGuess)});
      dispatch({ type: 'UPDATE_CURRENT_GUESS'           , payload: '' });
      
      if (this.props.currentWord.includes(currentGuess)) {
        dispatch({ type: 'UPDATE_CORRECT_GUESSES'         , payload: this.props.correctGuesses.concat(currentGuess)});          
      }
      else {
        if (this.props.isItTwoPlayer === true && !this.props.player1Turn && !this.props.currentWord.includes(currentGuess)) { 
          console.log('hello from player 2 wrong guess')
            dispatch({ type: 'UPDATE_PLAYER2_STRIKE'        , payload: this.props.strike + 1 });
            dispatch({ type: 'UPDATE_PLAYER2_WRONG_GUESSES' , payload: (+(this.props.player2WrongGuess) - 1) });
        }
        else {
          this.isGameOver( this.props.strike + 1);
          dispatch({ type: 'UPDATE_STRIKE'                , payload: this.props.strike + 1});
          dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'    , payload: (+(this.props.wrongGuessesLeft)-1) });
        }
      }
      if (this.props.isItTwoPlayer === true ) {
        dispatch({ type: 'UPDATE_PLAYER_TURN'               , payload: !this.props.player1Turn });
      }
    }
  

    isGameOver(n) {
      console.log('testing isGameOver');
      console.log('this is currentWord: '               , this.props.currentWord);
      console.log('this is correctGuesses: '            ,this.props.correctGuesses);
      
      if (n == 6) {
        console.log('strike is at 6, should update state now');
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_GAME_OVER'          , payload: true});
        dispatch({ type: 'UPDATE_DID_YOU_WIN'           , payload: false});
        <Link to={'/ScorePage'}></Link>
      }
      var setWord    = [...new Set(this.props.currentWord)];
      var setCorrect = [...new Set(this.props.correctGuesses)];
      console.log('this is setword: '                   , setWord);
      console.log('this is setCorrect: '                , setCorrect);
      console.log('this is setword.length: '            , setWord.length);
      console.log('this is setCorrect.length: '         , setCorrect.length);

      if (setWord.length-1 == setCorrect.length) {
        console.log('currentWord is now equal to correctGuesses');
        const { dispatch } = this.props;
         dispatch({ type: 'UPDATE_IS_GAME_OVER'         , payload: true});
         dispatch({ type: 'UPDATE_DID_YOU_WIN'          , payload: true});
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
      if (this.props.isGameOver === true) {
        return <Redirect push to="/ScorePage" />;
      }
     var img = <img id="hangman-0" src="https://cdn.discordapp.com/attachments/374257557880963072/492878824501936149/hangman-0.png" />;
      if (this.props.strike === 1) {
        img = <img id="hangman-1" src="https://media.discordapp.net/attachments/374257557880963072/492878854529089547/hangman-1.png" />
      }
      if (this.props.strike === 2) {
        img = <img id="hangman-2" src="https://media.discordapp.net/attachments/374257557880963072/492878881896923150/hangman-2.png" />
      }
      if (this.props.strike === 3) {
        img = <img id="hangman-3" src="https://media.discordapp.net/attachments/374257557880963072/492878930995576832/hangman-3.png" />
      }
      if (this.props.strike === 4) {
        img = <img id="hangman-4" src="https://media.discordapp.net/attachments/374257557880963072/492878991133376523/hangman-4.png" />
      }
      if (this.props.strike === 5) {
        img = <img id="hangman-5" src="https://media.discordapp.net/attachments/374257557880963072/492879021600669716/hangman-5.png" />
      }
      if (this.props.strike === 6) {
        img = <img id="hangman-6" src="https://media.discordapp.net/attachments/374257557880963072/492879053070532618/hangman-6.png" />
      }
      if (this.props.isItTwoPlayer === true) {
        return (
          <div className="word-section row">

            <div className="col-md-3 player1" style={this.props.player1Turn ? { display: 'block' } : { display: 'none' }}>
              <h1 className="enter-a-guess"></h1>
              <input id='guess player-1'
                type="string"
                autoFocus
                placeholder="Enter in a Guess"
                value={this.props.currentGuess}
                onChange={this.handleChange}
                onKeyDown={this.enter}
                maxLength={1} />
            </div>
            
           

            <div className="col-md-6 container center">
              <div className='row'>
                <div className="col-12">
                  {this.props.currentWord && this.props.currentWord.map(letter => {
                    if (this.props.correctGuesses.includes(letter)) {
                      return this.letterImg(letter)
                    }
                    return (' _ ');
                  })}
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <button
                      className="btn btn-two-Player"
                      onClick={this.handleSubmit}
                    >Enter Guess </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 player2" style={!this.props.player1Turn ? { display: 'block' } : { display: 'none' }}>
              <h1 className="enter-a-guess-player-2"></h1>
              <input id='guess player-2'
                type="string"
                placeholder="Enter in a Guess"
                value={this.props.currentGuess}
                onChange={this.handleChange}
                onKeyDown={this.enter}
                maxLength={1} />
            </div>
          </div>
        )
      } else {
        return (
          <div >
            <div className="word-section">
              <h1 className="enter-a-guess"></h1>
              <input id='guess'
                type="string"
                placeholder="Enter in a Guess"
                value={this.props.currentGuess}
                onChange={this.handleChange}
                onKeyDown={this.enter}
                maxLength={1} />
              <button
                className="btn"
                onClick={this.handleSubmit}
              >Enter Guess </button>
              {this.props.currentWord && this.props.currentWord.map(letter => {
                if (this.props.correctGuesses.includes(letter)) {
                  return this.letterImg(letter)
                }
                return (' _ ');
              })}
            </div>
          </div>

        )
      }
    }
  }

  export default Word;