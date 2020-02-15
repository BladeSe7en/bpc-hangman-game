const initalstate = {
    currentWord        : [],
    data               : {},
    catagory           : '',
    toggleAlert        : false,
    isItTwoPlayer      : false,
    aiDifficulty       : null
  };
  import { Redirect } from 'react-router';
  
  function MainPageReducer(state = initalstate, action) {
    const { type, payload } = action;
    switch (type) {
        case 'TOGGLE_ALERT':
        return {
            ...state,
            toggleAlert: payload
        };

        case 'GET_DATA':
        return {
            ...state,
            data: payload
        };

        case 'UPDATE_AI_DIFFICULTY':
        return {
            ...state,
            aiDifficulty: payload
        };

        case 'UPDATE_CURRENT_WORD':
        return {
            ...state,
            currentWord: payload
        };

        case 'UPDATE_DATA':
            let index = Math.floor(Math.random() * payload.length);
            console.log('this is index: ', index);
            console.log('this is data: ', payload[index]);
            console.log('this is length: ', payload.length);
            if (payload.length === 0) {
                console.log('data is not defined')
                return {
                    ...state,
                    toggleAlert: true
                }
            }
        return {
            ...state,
            data: payload,
            currentWord: payload[index].word.split('')
        };

        case 'UPDATE_IS_IT_TWO_PLAYER':
        return {
            ...state,
            isItTwoPlayer: payload
        };

        case 'UPDATE_IS_IT_ROBOTS_TURN':
        return {
            ...state,
            isItRobotsTurn: payload
        };

        case 'IS_IT_SP_VS_AI':
        return {
            ...state,
            isItSVAi: payload
        };

        case 'UPDATE_CATAGORY':
        return {
            ...state,
            catagory: payload
        };

        default:
        return {
            ...state
        };
    }
  }
  export default MainPageReducer;
