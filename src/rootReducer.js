import { combineReducers }     from 'redux';
import MainPageReducer         from './components/MainPage/MainPaigeReducer';
import GamePageReducer         from './components/GamePage/GamePageReducer';
import ScorePageReducer        from './components/ScorePage/ScorePageReducer';
import SinglePlayerVsAiReducer from './components/SinglePlayerVsAi/SinglePlayerVsAiReducer';
import WordReducer             from './components/Word/WordReducer';
import TwoPlayerReducer        from './components/TwoPlayerPage/TwoPlayerPage.Reducer';

const rootReducer = combineReducers({
   MainPage               : MainPageReducer,
   GamePage               : GamePageReducer,
   ScorePage              : ScorePageReducer,
   SinglePlayerVsAiReducer: SinglePlayerVsAiReducer,
   TwoPlayerReducer       : TwoPlayerReducer,
   Word                   : WordReducer

});

export default rootReducer; 