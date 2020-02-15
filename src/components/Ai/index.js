import { connect } from 'react-redux';
import Ai from './Ai';

function mapStoreToProps(store) {
    return {
        allGuesses           : store.Word     .allGuesses,
        strike               : store.Word     .strike,
        toggleAlert          : store.MainPage.toggleAlert,
        wrongGuessesLeft     : store.Word     .wrongGuessesLeft,
        robotStrike          :store.Word      .robotStrike,
        robotWrongLeft       : store.Word     .robotWrongLeft,

    };
}

export default connect(mapStoreToProps)(Ai);
