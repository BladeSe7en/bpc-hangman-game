import { connect } from 'react-redux';
import TwoPlayerPage from './TwoPlayerPage';

function mapStoreToProps(store){
    return {
        strike            : store.GamePage.strike,
        wrongGuessesLeft  : store.GamePage.wrongGuessesLeft,
        allGuesses        : store.Word.allGuesses
    };
}

export default connect(mapStoreToProps)(TwoPlayerPage);