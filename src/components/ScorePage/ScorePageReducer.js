const initalstate = {
    allGuesses        : [],
    catagory          : '',
    currentGuess      : [],
    correctGuesses    : [],
    currentWord       : [],
    data              : [],
    didYouWin         : false,
    letter            : '',
    isGameOver        : false,
    isGameShowing     : false,
    isMainPageShowing : true,
    isScorePageShowing: false,
    isScoreShowing    : false,
    strike            : 0,
    wrongGuessesLeft  : 6,   
  };

  function GamePageReducer(state = initalstate, action) {
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
      case 'UPDATE_DATA':
      return {
          ...state,
          data: payload

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
      case 'UPDATE_IS_SCORE_PAGE_SHOWING':
      return {
          ...state,
          isScoreShowing: payload

      }
      case 'UPDATE_STRIKE':
      return {
          ...state,
          strike: payload

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