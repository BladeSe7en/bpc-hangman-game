const initalstate = {
    allGuesses           : [],
    correctGuesses       : [],
    currentGuess         : [],
    didPlayer1Win        : null,
    didYouWin            : false,
    isGameOver           : false,
    isItRobotsTurn       : false,
    player1Turn          : true,
    player2Strike        : 0,
    player2WrongGuesses  : 6,
    robotStrike          : 0,
    robotWrongLeft       : 6, 
    strike               : 0,
    wrongGuessesLeft     : 6, 
  };

  function WordReducer(state = initalstate, action) {
  const { type, payload } = action;
  switch (type) {
    case 'RETURN_INITAL_STATE':
    return {
       ...initalstate,
    };

    case 'UPDATE_MUTUAL_STATE':
        return {
            ...initalstate
        };

      case 'UPDATE_CURRENT_GUESS':                   
      return {
          ...state,
          currentGuess: payload
      };

      case 'BEAT_AI':                   
      return {
          ...state,
          didYouBeatAi: payload
      };

      case 'UPDATE_GUESSES': {
          return {
              ...state,
              currentGuess: '',
              allGuesses: payload
          };
      };

      case 'UPDATE_CORRECT_GUESSES':
          let over = payload.isGameOver;
          let didP1Win = payload.didPlayer1Win;
          let uWin = payload.didYouWin;
          let vsAi = payload.isItSVAi;
          let youBeatAi = payload.didYouBeatAi;
          console.log('payload.correctGuesses: ', payload.correctGuesses)
          console.log('payload.setWord in action: ', payload.setWord)
          console.log('payload.setWord.length: ', payload.setWord.length)
          console.log('payload.correctGuesses: ', payload.correctGuesses)
          console.log('payload.correctGuesses.length: ', payload.correctGuesses.length)
          console.log('state.isItSVAi: ', state.isItSVAi)
          if (payload.setWord.length === payload.correctGuesses.length) {
              over = true;
              if (!payload.isItTwoPlayer) {
                  console.log('single player')
                  didP1Win = true;
              }
              else if (payload.isItTwoPlayer) {
                  console.log('two player reducer')
                  uWin = null;
                  if (payload.player1Turn) {
                      console.log('player one wins')
                      didP1Win = true;
                  } else {
                      console.log('player two wins')
                      didP1Win = false;
                  }
              }
              else if (state.isItSVAi) {
                  console.log('vs ai')
                  if (!payload.isItRobotsTurn) {
                      console.log('you beat ai')
                      youBeatAi = true;
                  } else {
                      console.log('ai won')
                      youBeatAi = false
                  }
              }

          }

      return {
          ...state,
          ...payload,
          isGameOver: over,
          didPlayer1Win: didP1Win,
          didYouWin: uWin,
          isItSVAi: vsAi,
          didYouBeatAi: youBeatAi

      };

      case 'PLAYER1_WIN':
        return {
            ...state,
            ...payload,
        };

      case 'YOU_WIN':
      return {
          ...state,
          ...payload
      };
      
      case 'GAME_OVER':
      return {
          ...state,
          ...payload
      };

      case 'PLAYER2_WRONG':
      return {
          ...state,
          ...payload
      };

      case 'WHOS_PLAYER':
      return {
          ...state,
          ...payload
      };

      case 'ON_CHANGE': {
        return {
            ...state,
            ...payload
        };
    };

    case 'ROBOT_IS_RIGHT': {
        let gameOver = payload.isGameOver;
        let youWin = payload.didPlayer1Win;
        console.log('payload.set: ',payload.set)
        console.log('payload.set.length: ',payload.set.length)
        console.log('correctGuesses: ',payload.correctGuesses)
        console.log('payload.correctGuesses.length: ',payload.correctGuesses.length)
        if (payload.set.length === payload.correctGuesses.length) {
            gameOver = true;
        };
        return {
            ...state,
            ...payload,
            isGameOver: gameOver,
            didPlayer1Win: youWin
        };
    };

    case 'SP_WRONG': {
        return {
            ...state,
            ...payload
        };
    };

    case 'P1_TURN': {
        return {
            ...state,
            ...payload,
            currentGuess: ''
        };
    };

    case 'ROBOT_IS_WRONG': {
        return {
            ...state,
            ...payload
        };
    };

      default:
      return {
          ...state
      };
  };
};
export default WordReducer;
