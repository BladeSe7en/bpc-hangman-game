const initalstate = {
    catagory          : '',
    currentWord       : [],
    data              : [],
    isGameShowing     : false,
    isMainPageShowing : true,
  };
  
  function AppReducer(state = initalstate, action) {
      console.log('hello from reducer');
    const { type, payload } = action;

    switch (type) {
        case 'UPDATE_CATAGORY':
        return {
            ...state,
            catagory: payload
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
  
  export default AppReducer;