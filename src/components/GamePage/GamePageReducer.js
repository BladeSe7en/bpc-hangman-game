const initalstate = {
    allGuesses        : [],
    currentGuess      : [],
    correctGuesses    : [],
    letter            : '',
    isGameOver        : false,
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
      case 'UPDATE_CURRENT_GUESS':                   
      return {
          ...state,
          currentGuess: payload
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