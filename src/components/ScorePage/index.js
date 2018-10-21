import { connect } from 'react-redux';
import ScorePage from './ScorePage';

function mapStoreToProps(store){
    return {
        allGuesses        : store.ScorePage.allGuesses,
        catagory          : store.ScorePage.catagory,
        currentGuess      : store.ScorePage.currentGuess,
        correctGuesses    : store.ScorePage.correctGuesses,
        currentWord       : store.MainPage .currentWord,
        data              : store.MainPage .data,
        didPlayer1Win     : store.Word     .didPlayer1Win,
        didYouWin         : store.Word     .didYouWin,
        letter            : store.ScorePage.letter,
        isGameOver        : store.ScorePage.isGameOver,
        strike            : store.ScorePage.strike,
        whoIsPlayer       : store.Word      .whoIsPlayer,
        wrongGuessesLeft  : store.ScorePage.wrongGuessesLeft,
    };
}

export default connect(mapStoreToProps)(ScorePage);