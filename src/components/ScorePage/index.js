import { connect } from 'react-redux';
import ScorePage from './ScorePage';

function mapStoreToProps(store) {
    return {
        currentWord   : store.MainPage .currentWord,
        data          : store.MainPage .data,
        didPlayer1Win : store.Word     .didPlayer1Win,
        didYouWin     : store.Word     .didYouWin,
        isItTwoPlayer : store.MainPage.isItTwoPlayer,
        player2Strike : store.Word    .player2Strike,
        strike        : store.Word    .strike,
        whoIsPlayer   : store.Word    .whoIsPlayer,
    };
}

export default connect(mapStoreToProps)(ScorePage);
