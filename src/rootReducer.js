import { combineReducers }     from 'redux';
import MainPageReducer         from './components/MainPage/MainPaigeReducer';
import GamePageReducer         from './components/GamePage/GamePageReducer';
import ScorePageReducer        from './components/ScorePage/ScorePageReducer';
import BobReducer from './components/Bob/BobReducer';
import WordReducer             from './components/Word/WordReducer';
import TwoPlayerReducer        from './components/TwoPlayerPage/TwoPlayerPageReducer';


const rootReducer = combineReducers({
   MainPage               : MainPageReducer,
   GamePage               : GamePageReducer,
   ScorePage              : ScorePageReducer,
   BobReducer: BobReducer,
   TwoPlayerReducer       : TwoPlayerReducer,
   Word                   : WordReducer

});

export default rootReducer; 