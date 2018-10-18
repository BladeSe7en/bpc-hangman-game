import { combineReducers } from 'redux';
import AppReducer from './components/App/AppReducer';
import GamePageReducer from './components/GamePage/GamePageReducer';
import ScorePageReducer from './components/ScorePage/ScorePageReducer';
import WordReducer from './components/Word/WordReducer';

const rootReducer = combineReducers({
   App          : AppReducer,
   GamePage    : GamePageReducer,
   ScorePage    : ScorePageReducer,
   Word         : WordReducer

});

export default rootReducer;