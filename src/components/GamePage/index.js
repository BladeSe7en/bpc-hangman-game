import { connect } from 'react-redux';
import GamePage from './GamePage';

function mapStoreToProps(store){
    return {
        allGuesses         : store.Word.allGuesses,
        didYouWin          : store.GamePage.didYouWin,
        isGameOver         : store.GamePage.isGameOver,
        player2Strike      : store.Word.player2Strike,
        player2WrongGuesses: store.Word.player2WrongGuesses,
        strike             : store.GamePage.strike,
        toggleAlert        : store.MainPage.toggleAlert,
        wrongGuessesLeft   : store.GamePage.wrongGuessesLeft,
    };
}

export default connect(mapStoreToProps)(GamePage);