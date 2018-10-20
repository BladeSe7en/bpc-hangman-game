import { combineReducers }  from 'redux';
import MainPageReducer      from './components/MainPage/MainPaigeReducer';
import GamePageReducer      from './components/GamePage/GamePageReducer';
import ScorePageReducer     from './components/ScorePage/ScorePageReducer';
import WordReducer          from './components/Word/WordReducer';

const rootReducer = combineReducers({
   MainPage    : MainPageReducer,
   GamePage    : GamePageReducer,
   ScorePage   : ScorePageReducer,
   Word        : WordReducer

});

export default rootReducer; 