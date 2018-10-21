import { connect } from 'react-redux';
import TwoPlayerPage from './TwoPlayerPage';

function mapStoreToProps(store){
    return {
        allGuesses          : store.Word    .allGuesses,        
        player2Strike       : store.Word    .player2Strike,
        player2WrongGuesses : store.Word    .player2WrongGuesses,
        strike              : store.GamePage.strike,
        toggleAlert         : store.MainPage.toggleAlert,
        wrongGuessesLeft    : store.GamePage.wrongGuessesLeft,


    };
}

export default connect(mapStoreToProps)(TwoPlayerPage);