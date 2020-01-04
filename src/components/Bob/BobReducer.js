const initalstate = {
    allGuesses           : [],
    robotStrike          : 0,
    spWrongGuessesLeft   : 6,
    strike               : 0,
    toggleAlert          : false,
    wrongGuessesLeft     : 6,
  };

  function BobReducer(state = initalstate, action) {
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
      default:
      return {
          ...state
      }
    }
}
    export default BobReducer;
