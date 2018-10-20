import { connect } from 'react-redux';
import GamePage from './GamePage';

function mapStoreToProps(store){
    return {
        allGuesses        : store.Word.allGuesses,
        didYouWin         : store.GamePage.didYouWin,
        isGameOver        : store.GamePage.isGameOver,
        isGameShowing     : store.GamePage.isGameShowing,
        isScoreShowing    : store.GamePage.isScoreShowing,
        strike            : store.GamePage.strike,
        wrongGuessesLeft  : store.GamePage.wrongGuessesLeft
    };
}

export default connect(mapStoreToProps)(GamePage);