import { connect } from 'react-redux';
import Word from './Word';

function mapStoreToProps(store){
    return {
        aiDifficulty         : store.MainPage.aiDifficulty,
        allGuesses           : store.Word    .allGuesses,
        correctGuesses       : store.Word    .correctGuesses,
        currentGuess         : store.Word    .currentGuess,
        currentWord          : store.MainPage.currentWord,
        didYOuBeatAi         : store.Word    .didYOuBeatAi,
        isGameOver           : store.Word    .isGameOver,
        isItRobotsTurn       : store.Word    .isItRobotsTurn,
        isItTwoPlayer        : store.MainPage.isItTwoPlayer,
        isItSVAi             : store.MainPage.isItSVAi,
        player1Turn          : store.Word    .player1Turn,
        player2Strike        : store.Word    .player2Strike,
        player2WrongGuesses  : store.Word    .player2WrongGuesses,
        robotStrike          : store.Word    .robotStrike,
        robotWrongLeft       : store.Word    .robotWrongLeft,
        strike               : store.Word    .strike,
        wrongGuessesLeft     : store.Word    .wrongGuessesLeft,
        whoIsPlayer          : store.Word    .whoIsPlayer
    };
}
export default connect(mapStoreToProps)(Word);
