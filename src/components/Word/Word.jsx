import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Word extends Component {
  constructor(props) {
    super(props);
    this.enter        = this.enter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.isGameOver   = this.isGameOver.bind(this);
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
      //the first else statement handles the state of player 2's wrong guesses and strikes if youre playing a 2 player match
      //the last if statement will toggle between player 1 and player 2 only if youre playing a two player match.
      let currentGuess = this.props.currentGuess;
      const { dispatch, player1Turn, player2Strike,currentWord } = this.props;
      this.isGameOver();
      dispatch({ type: 'UPDATE_ALL_GUESSES'                , payload: this.props.allGuesses.concat(currentGuess)});
      dispatch({ type: 'UPDATE_CURRENT_GUESS'              , payload: '' });
      
      if (currentWord.includes(currentGuess)) {
        dispatch({ type: 'UPDATE_CORRECT_GUESSES'          , payload: this.props.correctGuesses.concat(currentGuess)});          
      }
      else {
        if (this.props.isItTwoPlayer === true && !this.props.player1Turn && !this.props.currentWord.includes(currentGuess)) { 
          this.isGameOver( player2Strike + 1);
            dispatch({ type: 'UPDATE_PLAYER2_STRIKE'       , payload: this.props.player2Strike + 1 });
            dispatch({ type: 'UPDATE_PLAYER2_WRONG_GUESSES', payload: (+(this.props.player2WrongGuesses) - 1) });
        }
        else {
          this.isGameOver( this.props.strike + 1);
          dispatch({ type: 'UPDATE_STRIKE'                 , payload: this.props.strike + 1});
          dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'     , payload: (+(this.props.wrongGuessesLeft)-1) });
        }
      }
      if (this.props.isItTwoPlayer === true ) {
        dispatch({ type: 'UPDATE_PLAYER_TURN'              , payload: !this.props.player1Turn });
        if (player1Turn === true) {
        dispatch({ type: 'UPDATE_WHO_IS_PLAYER', payload: " Player One "});
        } else {
          dispatch({ type: 'UPDATE_WHO_IS_PLAYER', payload: " Player Two "});
    
        }
      }
    }

    isGameOver(n) {
      console.log('testing isGameOver');
      console.log('this is currentWord: '                  , this.props.currentWord);
      console.log('this is correctGuesses: '               ,this.props.correctGuesses);
      if (n === 6) {
        dispatch({ type: 'UPDATE_IS_GAME_OVER'             , payload: true});
        console.log('strike is at 6, should update state now');
       if (this.props.isItTwoPlayer === false) {
        dispatch({ type: 'UPDATE_DID_YOU_WIN'              , payload: false});
        <Link to={'/ScorePage'}></Link>
       } else {
         if (this.props.strike === 6) {
          dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'           , payload: false});
         } else {
          if (this.props.player2Strike === 6) {
          dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'           , payload: true});
          }
         }
       }
      }
      var setWord    = [...new Set(this.props.currentWord)];
      var setCorrect = [...new Set(this.props.correctGuesses)];
      console.log('this is setword: '                      , setWord);
      console.log('this is setCorrect: '                   , setCorrect);
      console.log('this is setword.length: '               , setWord.length);
      console.log('this is setCorrect.length: '            , setCorrect.length);
      if (setWord.length-1 == setCorrect.length) {
        console.log('currentWord is now equal to correctGuesses');
        const { dispatch } = this.props;
         dispatch({ type: 'UPDATE_IS_GAME_OVER'            , payload: true});
         dispatch({ type: 'UPDATE_DID_YOU_WIN'             , payload: true});
        }
  }
    render() {
      if (this.props.isGameOver === true) {
        return <Redirect push to="/ScorePage" />;
      }
      if (this.props.isItTwoPlayer === true) {
        return (
          <div className="word-section row" >

            <div className="col-md-3" style={this.props.player1Turn ? { display: 'block' } : { display: 'none' }}>
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
                      return letter.toUpperCase();
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

            <div className="col-md-3" style={!this.props.player1Turn ? { display: 'block' } : { display: 'none' }}>
              <h1 className="enter-a-guess-player-2"></h1>
              <input id='guess'
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
                  return letter.toUpperCase();
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