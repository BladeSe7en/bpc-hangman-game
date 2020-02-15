import { connect } from 'react-redux';
import MainPage from './MainPage';

function mapStoreToProps(store) {
    return {
        catagory          : store.MainPage.catagory,
        toggleAlert       : store.MainPage.toggleAlert,
        aiDifficulty      : store.MainPage.aiDifficulty,
        isItSVAi          : store.MainPage.isItSVAi,

    };
}

export default connect(mapStoreToProps)(MainPage);
