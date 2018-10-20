import { connect } from 'react-redux';
import MainPage from './MainPage';

function mapStoreToProps(store){
    return {
       catagory          : store.MainPage.catagory,
       currentWord       : store.MainPage.currentWord,
       data              : store.MainPage.data,
       isGameShowing     : store.Word.isGameShowing,
       isGameOver        : store.Word.isGameOver,
       isMainPageShowing : store.MainPage.isMainPageShowing,
       isItTwoPlayer     : store.MainPage.isItTwoPlayer

    };
}

export default connect(mapStoreToProps)(MainPage);