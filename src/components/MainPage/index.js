import { connect } from 'react-redux';
import MainPage from './MainPage';

function mapStoreToProps(store){
    return {
        allGuesses         : store.Word    .allGuesses,
        catagory          : store.ScorePage.catagory,
        correctGuesses     : store.Word    .correctGuesses,
        currentGuess       : store.Word    .currentGuess,
        currentWord        : store.MainPage.currentWord,
        data              : store.MainPage .data,
        didPlayer1Win      : store.Word    .didPlayer1Win,
        didYouWin         : store.Word     .didYouWin,
        letter            : store.ScorePage.letter,
        isGameOver         : store.GamePage.isGameOver,
        isItTwoPlayer      : store.MainPage.isItTwoPlayer,
        player1Turn        : store.Word    .player1Turn,
        player2Strike      : store.Word    .player2Strike,
        player2WrongGuesses: store.Word    .player2WrongGuesses,
        strike             : store.Word    .strike,
        toggleAlert         : store.MainPage.toggleAlert,
        whoIsPlayer        : store.Word    .whoIsPlayer,
        wrongGuessesLeft   : store.Word    .wrongGuessesLeft,
    };
}

export default connect(mapStoreToProps)(MainPage);