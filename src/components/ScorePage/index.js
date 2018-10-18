import { connect } from 'react-redux';
import ScorePage from './ScorePage';

function mapStoreToProps(store){
    return {
        allGuesses        : store.ScorePage.allGuesses,
        catagory          : store.ScorePage.catagory,
        currentGuess      : store.ScorePage.currentGuess,
        correctGuesses    : store.ScorePage.correctGuesses,
        currentWord       : store.App.currentWord,
        data              : store.App.data,
        didYouWin         : store.Word.didYouWin,
        letter            : store.ScorePage.letter,
        isGameOver        : store.ScorePage.isGameOver,
        isGameShowing     : store.ScorePage.isGameShowing,
        isMainPageShowing : store.ScorePage.isMainPageShowing,
        isScorePageShowing: store.ScorePage.isScorePageShowing,
        strike            : store.ScorePage.strike,
        wrongGuessesLeft  : store.ScorePage.wrongGuessesLeft,
    };
}

export default connect(mapStoreToProps)(ScorePage);