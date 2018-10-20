import { connect } from 'react-redux';
import Word from './Word';

function mapStoreToProps(store){
    return {
    allGuesses         : store.Word.allGuesses,
    currentGuess       : store.Word.currentGuess,
    correctGuesses     : store.Word.correctGuesses,
    currentWord        : store.MainPage.currentWord,
    strike             : store.Word.strike,
    wrongGuessesLeft   : store.Word.wrongGuessesLeft,
    isGameOver         : store.GamePage.isGameOver,
    isItTwoPlayer      : store.MainPage.isItTwoPlayer,
    player1Turn        : store.Word.player1Turn,
    player2Strike      : store.Word.player2Strike,
    player2WrongGuesses: store.Word.player2WrongGuesses

    };
}
export default connect(mapStoreToProps)(Word);