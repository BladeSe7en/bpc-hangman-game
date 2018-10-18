import { connect } from 'react-redux';
import Word from './Word';

function mapStoreToProps(store){
    return {
    allGuesses        : store.Word.allGuesses,
    currentGuess      : store.Word.currentGuess,
    correctGuesses    : store.Word.correctGuesses,
    currentWord       : store.App.currentWord,
    strike            : store.Word.strike,
    wrongGuessesLeft  : store.Word.wrongGuessesLeft
    };
}
export default connect(mapStoreToProps)(Word);