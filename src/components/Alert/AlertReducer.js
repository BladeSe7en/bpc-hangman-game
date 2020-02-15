const initalstate = {
   text: '',
   style: ''
  };

  import uuid from 'uuid';

  function AlertReducer(state = initalstate, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_ALERT':
      return [
        ...state,
        {
          text: text,
          style: style,
          id: uuid()
        }
      ];

    case 'REMOVE_ALERT':
      return state.filter((alert) => {
        if (alert.id === id ) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
};

export default AlertReducer;