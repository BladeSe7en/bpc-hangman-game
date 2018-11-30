import { connect } from 'react-redux';
import GamePage from './GamePage';

function mapStoreToProps(store) {
    return {
        allGuesses         : store.Word    .allGuesses,
        strike             : store.Word    .strike,
        wrongGuessesLeft   : store.Word    .wrongGuessesLeft,
    };
}

export default connect(mapStoreToProps)(GamePage);
