const initalstate = {
    allGuesses         : [],
    catagory           : '',
    correctGuesses     : [],
    currentGuess       : [],
    currentWord        : [],
    data               : [],
    didPlayer1Win      : null,
    didYouWin          : false,
    letter             : '',
    isGameOver         : false,
    isItTwoPlayer      : false,
    player1Turn        : true,
    player2Strike      : 0,
    player2WrongGuesses: 6,
    strike             : 0,
    toggleAlert        : false,
    whoIsPlayer        : null,
    whosTurnIsIt       : null,
    wrongGuessesLeft   : 6,  
  };

  function GamePageReducer(state = initalstate, action) {
  const { type, payload } = action;
  switch (type) {
    case 'RETURN_INITAL_STATE':
    return {
       ...initalstate
    }
    case 'TOGGLE_ALERT':
    return {
        ...state,
        toggleAlert: payload
    }
    case 'UPDATE_ALL_GUESSES':
    return {
        ...state,
        allGuesses: payload
    }
    case 'UPDATE_CATAGORY':
    return {
        ...state,
        catagory: payload
    }
    case 'UPDATE_CURRENT_GUESS':                   
    return {
        ...state,
        currentGuess: payload
    }
    case 'UPDATE_CURRENT_WORD':
    return {
        ...state,
        currentWord: payload
    }
    case 'UPDATE_CORRECT_GUESSES':
    return {
        ...state,
        correctGuesses: payload
    }
    case 'UPDATE_DATA':
      return {
          ...state,
          data: payload
      } 
      case 'UPDATE_DID_PLAYER1_WIN':
      return {
          ...state,
          didPlayer1Win: payload,
      } 
      case 'UPDATE_DID_YOU_WIN':
      return {
          ...state,
          didYouWin: payload
      }
      case 'UPDATE_LETTER':
      return {
          ...state,
          letter: payload
      }
      case 'UPDATE_IS_GAME_OVER':
      return {
          ...state,
          isGameOver: payload
      }
      case 'UPDATE_IS_IT_TWO_PLAYER':
      return {
          ...state,
          isItTwoPlayer: payload
      }
      case 'UPDATE_PLAYER_TURN':
      return {
          ...state,
          player1Turn: payload,
          currentGuess: ''
      }
      case 'UPDATE_PLAYER2_STRIKE':
      return {
          ...state,
          player2Strike: payload
      }
      case 'UPDATE_PLAYER2_WRONG_GUESSES':
      return {
          ...state,
          player2WrongGuesses: payload
      }
      case 'UPDATE_STRIKE':
      return {
          ...state,
          strike: payload
        }
      case 'UPDATE_WHO_IS_PLAYER':
      return {
            ...state,
            whoIsPlayer: payload
        }
      case 'UPDATE_WRONG_GUESSES_LEFT':
      return {
            ...state,
            wrongGuessesLeft: payload
        }
      default:
      return {
          ...state
      }
  }
}
export default GamePageReducer;
