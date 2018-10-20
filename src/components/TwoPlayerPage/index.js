import { connect } from 'react-redux';
import TwoPlayerPage from './TwoPlayerPage';

function mapStoreToProps(store){
    return {
        strike            : store.GamePage.strike,
        player2Strike            : store.Word.player2Strike,
        wrongGuessesLeft  : store.GamePage.wrongGuessesLeft,
        player2WrongGuesses: store.Word.player2WrongGuesses,
        allGuesses        : store.Word.allGuesses
    };
}

export default connect(mapStoreToProps)(TwoPlayerPage);