import { connect } from 'react-redux';
import TwoPlayerPage from './TwoPlayerPage';

function mapStoreToProps(store){
    return {
        allGuesses         : store.Word    .allGuesses,
        player2Strike      : store.Word    .player2Strike,
        player2WrongGuesses: store.Word    .player2WrongGuesses,
        strike             : store.Word    .strike,
        toggleAlert        : store.MainPage.toggleAlert,
        wrongGuessesLeft   : store.Word    .wrongGuessesLeft,
    };
}

export default connect(mapStoreToProps)(TwoPlayerPage);

// function smallest(n) {
//     console.log(n);
//     let x = -Infinity;
//     let ans = [];
//     for ( let i = 0; i < n.length; i++ ){
//       if ( n[0] === 0 ) {
//       ans = n.slice(i);
//       console.log('this is ans', ans);
//       }
//     }
// };