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
    }
    case 'UPDATE_MUTUAL_STATE':
        return {
            ...initalstate
        }
      case 'UPDATE_CURRENT_GUESS':                   
      return {
          ...state,
          currentGuess: payload
      }
      case 'BEAT_AI':                   
      return {
          ...state,
          didYouBeatAi: payload
      }
      case 'UPDATE_GUESSES': {
          return {
              ...state,
              currentGuess: '',
              allGuesses: payload
          }
      }
      case 'UPDATE_CORRECT_GUESSES':
      return {
          ...state,
          correctGuesses: payload
      }
      case 'PLAYER1_WIN':
        return {
            ...state,
            didPlayer1Win: payload,
        }
      case 'YOU_WIN':
      return {
          ...state,
          didYouWin: payload
      }
      case 'GAME_OVER':
      return {
          ...state,
          isGameOver: payload
      }
      case 'PLAYER2_WRONG':
      return {
          ...state,
          ...payload
      }
      case 'WHOS_PLAYER':
      return {
          ...state,
          whoIsPlayer: payload
      }
      case 'ON_CHANGE': {
        return {
            ...state,
            ...payload
        }
    }
    case 'ROBOT_IS_RIGHT': {
        return {
            ...state,
            ...payload
        }
    }
    case 'SP_WRONG': {
        return {
            ...state,
            ...payload
        }
    }
    case 'P1_TURN': {
        return {
            ...state,
            player1Turn: payload,
            currentGuess: ''
        }
    }
    case 'ROBOT_IS_WRONG': {
        return {
            ...state,
            ...payload
        }
    }
      default:
      return {
          ...state
      }
  }
}
export default WordReducer;
