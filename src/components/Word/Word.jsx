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
    this.enter = this.enter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
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
      player1Turn,
       player2Strike,
       player2WrongGuesses,
       strike,
       wrongGuessesLeft,
       isItSVAi 
      } = this.props;
    let correctGuesses2 = correctGuesses;
    this.isGameOver();
    dispatch(updateGuesses(allGuesses, currentGuess));
    if (currentWord.includes(currentGuess)) {
      dispatch(updateCorrectGuesses(correctGuesses, currentGuess));
      correctGuesses2 = correctGuesses.concat(currentGuess);
      if (currentWord.includes(currentGuess) && isItSVAi) {
        this.robotWordLogic();
        dispatch(robotsTurn(isItRobotsTurn));
      }
    } else {
      if (isItTwoPlayer === true && !player1Turn && !currentWord.includes(currentGuess)) {
        this.isGameOver(player2Strike + 1, correctGuesses2);
        dispatch(player2Wrong(player2Strike, player2WrongGuesses));

      } else {
        this.isGameOver(strike + 1);
        dispatch(spWrong(strike, wrongGuessesLeft));

        if (isItSVAi && !currentWord.includes(currentGuess)) {
          this.robotWordLogic();
          dispatch(robotsTurn(isItRobotsTurn));
        }
      }
    }
    if (isItTwoPlayer === true) {
      dispatch(p1Turn(player1Turn));
      if (player1Turn === true) {
        dispatch(whosPlayer(" Player One "));
      } else {
        dispatch(whosPlayer(" Player Two "));
      }
    }
  }

  isGameOver(n) {
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

    const setWord = [...new Set(currentWord)];
    const setCorrect = [...new Set(correctGuesses)];

    if (n === 6) {
      dispatch(gameOver(true));
      if (isItTwoPlayer === false) {
        dispatch(gameOver(false));

      } else {
        if (strike === 6) {
          dispatch(player1Win(false));
        }
        else if (player2Strike === 6) {
          dispatch(player1Win(true));
        }
      }
      if (isItSVAi) {
        if (robotStrike === 6) {
          dispatch(player1Win(true));
        }
      }
    }
    if (setWord.length - 1 === setCorrect.length && !isItTwoPlayer) {
      dispatch(gameOver(true));
      if (!isItTwoPlayer) {
        dispatch(player1Win(true));
      }
      if (isItSVAi) {
        if (!isItRobotsTurn) {
          dispatch(beatAi(true));
        } else {
          dispatch(beatAi(false));
        }
      }
      if (isItTwoPlayer) {
        dispatch(youWin(null));
        if (player1Turn) {
          dispatch(player1Win(true));
        } else {
          dispatch(player1Win(false));
        }
      }
    }
  }

  robotWordLogic() {
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
    const newCorrectGuesses = [...correctGuesses];
    const newAllGuesses     = [...allGuesses];
    if (currentWord.includes(currentGuess)) {
      newCorrectGuesses.push(currentGuess)
    }
    newAllGuesses.push(currentGuess)

    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    const robotCorrectSet = [...new Set(correctGuesses)].join('|');
    const robotWordSet = [...new Set(currentWord)].join('|');
    const number = Math.floor(Math.random() * currentWord.length);
    const right = new RegExp(robotWordSet, "g");
    const prevRight = new RegExp(robotCorrectSet, "g");
    const robotRightAnswers = robotWordSet.replace(prevRight, '').replace(/(_|\W)/g, '');
    const correctIndex = Math.floor(Math.random() * robotRightAnswers.length);
    const threshold = Math.ceil(currentWord.length * aiDifficulty);
    const robotRightSelection = robotRightAnswers[correctIndex];
    const robotWrongSet = [...new Set(allGuesses)].join('|');
    const wrong = new RegExp(robotWrongSet, "g");
    const robotWrongAnswers = alpha.replace(wrong, '').replace(right, '');
    const wrongIndex = Math.floor(Math.random() * robotWrongAnswers.length);
    const robotWrongSelection = robotWrongAnswers[wrongIndex];

    if (isItSVAi) {
      if (number <= threshold) {
        this.isGameOver();
        dispatch(robotIsRight(allGuesses, correctGuesses, robotRightSelection))
      } else {
        this.isGameOver();
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
      player1Turn 
    } = this.props
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
