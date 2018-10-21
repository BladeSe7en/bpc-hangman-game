const initalstate = {
    catagory          : '',
    currentWord       : [],
    data              : [],
    isItTwoPlayer     : false,
    toggleAlert       : false
  };
  
  function MainPageReducer(state = initalstate, action) {
    const { type, payload } = action;

    switch (type) {
        case 'TOGGLE_ALERT':
        return {
            ...state,
            toggleAlert: payload
        }
        case 'UPDATE_CATAGORY':
        return {
            ...state,
            catagory: payload
        }
      case 'UPDATE_IS_IT_TWO_PLAYER':
      return {
          ...state,
          isItTwoPlayer: payload
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

        default:
        return {
            ...state
        }
    }
  }
  
  export default MainPageReducer;