import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {
  onChange,
  robotIsRight, 
  robotIsWrong, 
  updateCorrectGuesses, 
  robotsTurn, 
  player2Wrong, 
  spWrong,
  p1Turn, 
  whosPlayer, 
  gameOver, 
  player1Win, 
  beatAi, 
  youWin, 
  updateGuesses
} from './WordAction';

class Word extends Component {
  constructor(props) {
    super(props);
    this.enter        = this.enter       .bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isGameOver   = this.isGameOver  .bind(this);
  }
 

  enter(e) {
    if (e.key == 'Enter') {
      this.handleSubmit();
    }
  }
  handleChange(e) {
    const { dispatch } = this.props;
    dispatch(onChange(e.target.value.toLowerCase()));
  }

  handleSubmit() {
    const { allGuesses, 
      correctGuesses, 
      currentGuess, 
      currentWord, 
      dispatch, 
      isItTwoPlayer,
      isItRobotsTurn,
      player1Turn,
       player2Strike,
       player2WrongGuesses,
       strike,
       wrongGuessesLeft,
       isItSVAi 
      } = this.props;

    let correctGuesses2 = correctGuesses;
    this.isGameOver();
    console.log('test 1')
    if (allGuesses.includes(currentGuess)) {
      alert('Letter has already been guessed.')
    } else {
      dispatch(updateGuesses(allGuesses, currentGuess));
    }
    // checks if current guess is correct.
    if (currentWord.includes(currentGuess)) {
      console.log('test 2')
      if (allGuesses.includes(currentGuess)) {
        alert('Letter has already been guessed.')
      } else {
        let setWord = [...new Set(currentWord)];
        dispatch(updateCorrectGuesses(correctGuesses, currentGuess, setWord));
        correctGuesses2 = correctGuesses.concat(currentGuess);
        // checks if current guess is correct && if game mode is against AI
        if (currentWord.includes(currentGuess) && isItSVAi) {
          console.log('test 3')
          if (allGuesses.includes(currentGuess)) {
            alert('Letter has already been guessed.')
          } else {
            
            this.robotWordLogic((allGuesses, currentGuess));
            dispatch(robotsTurn(isItRobotsTurn));
          }
        }
      }
    } else {
      // two player mode. player 2 makes wrong guess
      console.log('test 4')
      if (isItTwoPlayer === true && !player1Turn && !currentWord.includes(currentGuess)) {
        console.log('test 5')
        console.log('am I getting here')
        this.isGameOver(strike, player2Strike + 1);
        dispatch(player2Wrong(player2Strike, player2WrongGuesses));

      } else {
        console.log('test 6')
        // updates strike count for player 1
        this.isGameOver(strike + 1), player2Strike;
        dispatch(spWrong(strike, wrongGuessesLeft));

        // if game mode is against AI, wrong guess, run robot logic
        if (isItSVAi && !currentWord.includes(currentGuess)) {
          console.log('test 7')
          this.robotWordLogic(allGuesses, currentGuess);
          dispatch(robotsTurn(isItRobotsTurn));
        }
      }
    }
    // two player mode
    if (isItTwoPlayer === true) {
      console.log('testing I should be here')
      console.log('player1Turn: ',player1Turn)
      dispatch(p1Turn(player1Turn));
      // this defines whos turn it is
      if (player1Turn === true) {
        dispatch(whosPlayer(" Player One "));
      } else {
        dispatch(whosPlayer(" Player Two "));
      }
    }
  }

  isGameOver(p1Strike, p2Strike) {
    console.log('---------is game over: ')
    console.log('p1Strike: ',p1Strike)
    console.log('p2Strike: ',p2Strike)
    const {
      currentWord,
      correctGuesses,
      dispatch,
      isItTwoPlayer,
      isItRobotsTurn,
      player2Strike,
      player1Turn,
      robotStrike,
      strike,
      isItSVAi
    } = this.props;
    console.log('player2strike: ',player2Strike)

    const setWord = [...new Set(currentWord)];
    const setCorrect = [...new Set(correctGuesses)];
    console.log('setWord: ',setWord)
    console.log('setCorrect: ',setCorrect)
    console.log('correctGuesses: ',correctGuesses)

    if (p1Strike === 6) {
      console.log('1')
      dispatch(gameOver(true));
      dispatch(player1Win(false));
      // single player game over
    }
    if (p2Strike === 6) {
      console.log('2')
      dispatch(gameOver(true));
      dispatch(player1Win(true));
      dispatch(whosPlayer(" Player One "));
    }
      
      if (isItSVAi) {
        console.log('3')
        if (robotStrike === 6) {
          dispatch(player1Win(true));
          dispatch(whosPlayer(" Player One "));
        }
      }
   
  }

  robotWordLogic(allG, currentG) {
    this.forceUpdate()
    const { allGuesses, 
      robotStrike, 
      dispatch, 
      isItSVAi, 
      aiDifficulty, 
      currentGuess,
      currentWord, 
      robotWrongLeft, 
      correctGuesses, 
      isItRobotsTurn 
    } = this.props;

    let setWord = [...new Set(currentWord)];
   let guesses = allG
    console.log('robotWordLogic triggered')
    console.log('allG: ',allG)
    console.log('currentG: ',currentG)
    console.log('guesses: ',guesses)
    
    const newCorrectGuesses = [...correctGuesses];
    const newAllGuesses     = [...allGuesses];

    console.log('newCorrectGuesses: ',newCorrectGuesses)
    console.log('newAllGuesses: ',newAllGuesses)
    if (currentWord.includes(currentGuess)) {
      newCorrectGuesses.push(currentGuess)
    }
    newAllGuesses.push(currentGuess)
//console.log('this is a test')
    const alpha               = 'abcdefghijklmnopqrstuvwxyz';
    const robotCorrectSet     = [...new Set(correctGuesses)].join('|');
    const robotWordSet        = [...new Set(currentWord)].join('|');
    const number              = Math.floor(Math.random() * currentWord.length);
    const right               = new RegExp(robotWordSet, "g");
    const prevRight           = new RegExp(robotCorrectSet, "g");
    const robotRightAnswers   = robotWordSet.replace(prevRight, '').replace(/(_|\W)/g, '');
    const correctIndex        = Math.floor(Math.random() * robotRightAnswers.length);
    const threshold           = Math.ceil(currentWord.length * aiDifficulty);
    const robotRightSelection = robotRightAnswers[correctIndex];
    const robotWrongSet       = [...new Set(allGuesses)].join('|');
    const wrong               = new RegExp(robotWrongSet, "g");
    const robotWrongAnswers   = alpha.replace(wrong, '').replace(right, '');
    const wrongIndex          = Math.floor(Math.random() * robotWrongAnswers.length);
    const robotWrongSelection = robotWrongAnswers[wrongIndex];

    if (isItSVAi) {
      console.log('mumber: ',number)
      console.log('threshold: ',threshold)
      if (number <= threshold) {
        console.log('robot is right: ',robotRightSelection)
        this.isGameOver();
        console.log('set word in jsx: ',setWord)
        dispatch(robotIsRight(newAllGuesses, newCorrectGuesses, robotRightSelection, setWord))
      } else {
        this.isGameOver();
        console.log('robot is wrong: ',robotWrongSelection)
        dispatch(robotIsWrong(allGuesses, robotWrongLeft, robotStrike, isItRobotsTurn, robotWrongSelection))
      }
    }
  }

  render() {
    const { currentGuess, 
      correctGuesses, 
      currentWord, 
      isGameOver, 
      isItTwoPlayer, 
      player1Turn,
      toggleAlert 
    } = this.props

    if (isGameOver === true) {
      return <Redirect push to="/ScorePage" />;
    }
    if (toggleAlert === true) {
      console.log('i am in the toggle alert if statement')
      const { dispatch } = this.props;
      dispatch({ type: 'RETURN_INITAL_STATE' });
      return <Redirect push to="/" />;
    }
  
    if (isItTwoPlayer === true) {
      return (
        <div className="word-section row" >

          <div className="col-md-3" style={player1Turn ? { display: 'block' } : { display: 'none' }}>
            <h1 className="enter-a-guess"></h1>
            <input id='guess player-1'
              type="string"
              autoFocus
              placeholder="Player 1 Guess"
              value={currentGuess}
              onChange={this.handleChange}
              onKeyDown={this.enter}
              maxLength={1} />
          </div>

          <div className="col-md-6 container center">
            <div>
              {currentWord && currentWord.map(letter => {
                if (correctGuesses.includes(letter)) {
                  return letter.toUpperCase();
                }
                return (' _ ');
              })}
            </div>

            <div>
              <button
                className="btn btn-two-Player"
                onClick={this.handleSubmit}
              >Enter Guess </button>
            </div>
          </div>

          <div className="col-md-3" style={!player1Turn ? { display: 'block' } : { display: 'none' }}>
            <h1 className="enter-a-guess-player-2"></h1>
            <input id='guess'
              type="string"
              placeholder="Player 2 Guess"
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
