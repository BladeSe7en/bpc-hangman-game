import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import { Redirect }         from 'react-router';

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
      const { allGuesses, correctGuesses, currentGuess, currentWord,  dispatch, isItTwoPlayer, 
        player1Turn, player2Strike, player2WrongGuesses, strike, wrongGuessesLeft } = this.props;

        let correctGuesses2 = correctGuesses;
      this.isGameOver();
      dispatch({ type: 'UPDATE_ALL_GUESSES'                , payload: allGuesses.concat(currentGuess)});
      dispatch({ type: 'UPDATE_CURRENT_GUESS'              , payload: '' });
      
      if (currentWord.includes(currentGuess)) {
        dispatch({ type: 'UPDATE_CORRECT_GUESSES'          , payload: correctGuesses.concat(currentGuess)});
        //need if statement to check if game mode is sp vs ai. if true robotrightanswers.replace(currentGuess, '') 
        correctGuesses2 = correctGuesses.concat(currentGuess)       
      }
      else {
        //need if for spVsAi && player 1 makes wrong guess and if for spVsAi and robot wrong guess
        if (isItTwoPlayer === true && !player1Turn && !currentWord.includes(currentGuess)) { 
          this.isGameOver( player2Strike + 1, correctGuesses2);
          console.log('player two strike should incease')
            dispatch({ type: 'UPDATE_PLAYER2_STRIKE'       , payload: player2Strike + 1 });
            dispatch({ type: 'UPDATE_PLAYER2_WRONG_GUESSES', payload: (+(player2WrongGuesses) - 1) });
        } else {
          this.isGameOver( strike + 1);
          dispatch({ type: 'UPDATE_STRIKE'                 , payload: strike + 1});
          dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'     , payload: (+(wrongGuessesLeft)-1) });
        }
      }
      //need if for spVsAi and player right guess and for spVsAi and robot right guess
      if (isItTwoPlayer === true ) {
        dispatch({ type: 'UPDATE_PLAYER_TURN'              , payload: !player1Turn });
        if (player1Turn === true) {
        dispatch({ type: 'UPDATE_WHO_IS_PLAYER', payload: " Player One "});
        } else {
          dispatch({ type: 'UPDATE_WHO_IS_PLAYER'          , payload: " Player Two "});
    
        }
      }
    }

    isGameOver(n, correctGuesses2) {
      const { currentWord, correctGuesses, dispatch, isItTwoPlayer, player2Strike, player1Turn, strike } = this.props;
      var setWord    = [...new Set(currentWord)];
      var setCorrect = [...new Set(correctGuesses)];
      console.log('testing isGameOver');
      console.log('this is correctGuesses: '               , correctGuesses);
      console.log('this is currentWord: '                  , currentWord);
      console.log('this is setCorrect: '                   , setCorrect);
      console.log('this is setCorrect.length: '            , setCorrect.length);
      console.log('this is setword: '                      , setWord);
      console.log('this is setword.length: '               , setWord.length);
      //need if statement for player getting 6 strikes making robot win
      //need if statement for robot getting 6b strikes making player win
      if (n === 6) {
        dispatch({ type: 'UPDATE_IS_GAME_OVER'             , payload: true});
        console.log('strike is at 6, should update state now');
       if (isItTwoPlayer === false) {
        dispatch({ type: 'UPDATE_DID_YOU_WIN'              , payload: false});
       } else {
         if (strike === 6) {
          dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'        , payload: false});
         } else {
          if (player2Strike === 6) {
          dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'        , payload: true});
          }
         }
       }
      }
      //need if statement for player guessing final correct answer to win game
      if (setWord.length-1 === setCorrect.length && !isItTwoPlayer) {
        console.log('sp currentWord is now equal to correctGuesses');
         dispatch({ type: 'UPDATE_DID_YOU_WIN'             , payload: true});
         dispatch({ type: 'UPDATE_IS_GAME_OVER'             , payload: true});

        }
        //need if statement for robot guessing final correct answer to win game
        if (setWord.length-1 === setCorrect.length && isItTwoPlayer) {
          console.log('mp currentWord is now equal to correctGuesses');
          dispatch({ type: 'UPDATE_DID_YOU_WIN'              , payload: null});
          dispatch({ type: 'UPDATE_IS_GAME_OVER'             , payload: true});
          if (player1Turn){
            console.log('mp player1turn is true');

            dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'      , payload: true});
          } else {
            console.log('mp player1turn is false');
            dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'      , payload: false});

          }
        }
  }
    render() {
      const {currentGuess, correctGuesses, currentWord, isGameOver, isItTwoPlayer, player1Turn} = this.props
      if (isGameOver === true) {
        return <Redirect push to="/ScorePage" />;
      }
      if (isItTwoPlayer === true) {
        return (
          <div className="word-section row" >

            <div className="col-md-3" style={player1Turn ? { display: 'block' } : { display: 'none' }}>
              <h1 className="enter-a-guess"></h1>
              <input id='guess player-1'
                type="string"
                autoFocus
                placeholder="Enter in a Guess"
                value={currentGuess}
                onChange={this.handleChange}
                onKeyDown={this.enter}
                maxLength={1} />
            </div>

            <div className="col-md-6 container center">
              <div className='row'>
                <div className="col-12">
                  {currentWord && currentWord.map(letter => {
                    if (correctGuesses.includes(letter)) {
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

            <div className="col-md-3" style={!player1Turn ? { display: 'block' } : { display: 'none' }}>
              <h1 className="enter-a-guess-player-2"></h1>
              <input id='guess'
                type="string"
                placeholder="Enter in a Guess"
                value={currentGuess}
                onChange={this.handleChange}
                onKeyDown={this.enter}
                maxLength={1} />
            </div>
          </div>
        )
      } else {
        return (
          <div >
            <div className="word-section-sp">
              <h1 className="enter-a-guess"></h1>
              <input id='guess'
                type="string"
                placeholder="Enter in a Guess"
                value={currentGuess}
                onChange={this.handleChange}
                onKeyDown={this.enter}
                maxLength={1} />
              <button
                className="btn"
                onClick={this.handleSubmit}
              >Enter Guess </button>
              {currentWord && currentWord.map(letter => {
                if (correctGuesses.includes(letter)) {
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