import { combineReducers }     from 'redux';
import MainPageReducer         from './components/MainPage/MainPaigeReducer';
import GamePageReducer         from './components/GamePage/GamePageReducer';
import ScorePageReducer        from './components/ScorePage/ScorePageReducer';
import AiReducer               from './components/Ai/AiReducer';
import WordReducer             from './components/Word/WordReducer';
import TwoPlayerReducer        from './components/TwoPlayerPage/TwoPlayerPageReducer';
import AlertReducer            from './components/Alert/AlertReducer';


const rootReducer = combineReducers({
   MainPage              : MainPageReducer,
   GamePage              : GamePageReducer,
   ScorePage             : ScorePageReducer,
   AiReducer             : AiReducer,
   TwoPlayerReducer      : TwoPlayerReducer,
   Word                  : WordReducer,
   AlertReducer          : AlertReducer 

});

export default rootReducer;
