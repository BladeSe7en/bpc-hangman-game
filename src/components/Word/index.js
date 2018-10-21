import { connect } from 'react-redux';
import Word from './Word';

function mapStoreToProps(store){
    return {
    allGuesses         : store.Word    .allGuesses,
    correctGuesses     : store.Word    .correctGuesses,
    currentGuess       : store.Word    .currentGuess,
    currentWord        : store.MainPage.currentWord,
    didPlayer1Win      : store.Word    .didPlayer1Win,
    isGameOver         : store.GamePage.isGameOver,
    isItTwoPlayer      : store.MainPage.isItTwoPlayer,
    player1Turn        : store.Word    .player1Turn,
    player2Strike      : store.Word    .player2Strike,
    player2WrongGuesses: store.Word    .player2WrongGuesses,
    strike             : store.Word    .strike,
    whoIsPlayer        : store.Word    .whoIsPlayer,
    wrongGuessesLeft   : store.Word    .wrongGuessesLeft,

    };
}
export default connect(mapStoreToProps)(Word);