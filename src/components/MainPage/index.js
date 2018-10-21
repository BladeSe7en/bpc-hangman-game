import { connect } from 'react-redux';
import MainPage from './MainPage';

function mapStoreToProps(store){
    return {
       catagory          : store.MainPage.catagory,
       currentWord       : store.MainPage.currentWord,
       data              : store.MainPage.data,
       isGameOver        : store.Word    .isGameOver,
       isItTwoPlayer     : store.MainPage.isItTwoPlayer,
       toggleAlert       : store.MainPage.toggleAlert

    };
}

export default connect(mapStoreToProps)(MainPage);