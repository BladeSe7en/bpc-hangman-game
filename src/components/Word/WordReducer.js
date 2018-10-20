const initalstate = {
    allGuesses        : [],
    currentGuess      : [],
    correctGuesses    : [],
    currentWord       : [],
    isGameShowing     : false,
    isMainPageShowing : true,
    isScorePage       : false,
    isScoreShowing    : false,
    letter            : '',
    player1Turn       : true,
    player2WrongGuess : 6,
    player2Strike     : 0,
    strike            : 0,
    wrongGuessesLeft  : 6,
    didYouWin         : null,

  };

  function WordReducer(state = initalstate, action) {
  const { type, payload } = action;
  switch (type) {
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
      case 'UPDATE_CURRENT_GUESSES':
      return {
          ...state,
          currentGuesses: payload
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
      case 'UPDATE_IS_GAME_SHOWING':
      return {
          ...state,
          isGameShowing: payload
      }
      case 'UPDATE_IS_MAIN_PAGE_SHOWING':
      return {
          ...state,
          isMainPageShowing: payload
      }
      case 'UPDATE_IS_SCORE_PAGE':
      return {
          ...state,
          isScoreShowing: payload
      }
      case 'UPDATE_STRIKE':
      return {
          ...state,
          strike: payload
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
            player2WrongGuess: payload
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

export default WordReducer;