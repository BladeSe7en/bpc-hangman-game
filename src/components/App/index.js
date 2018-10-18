import { connect } from 'react-redux';
import App from './App';

function mapStoreToProps(store){
    return {
       catagory          : store.App.catagory,
       currentWord       : store.App.currentWord,
       data              : store.App.data,
       isGameShowing     : store.Word.isGameShowing,
       isGameOver        : store.Word.isGameOver,
       isMainPageShowing : store.App.isMainPageShowing,

    };
}

export default connect(mapStoreToProps)(App);