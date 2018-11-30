import { connect } from 'react-redux';
import SinglePlayerVsAi from './SinglePlayerVsAi';

function mapStoreToProps(store){
    return {
        allGuesses           : store.Word     .allGuesses,
        strike               : store.Word     .strike,
        toggleAlert          : store.MainPage.toggleAlert,
        wrongGuessesLeft     : store.Word     .wrongGuessesLeft,
        robotStrike          :store.Word      .robotStrike,
        robotWrongLeft       : store.Word     .robotWrongLeft,

    };
}

export default connect(mapStoreToProps)(SinglePlayerVsAi);