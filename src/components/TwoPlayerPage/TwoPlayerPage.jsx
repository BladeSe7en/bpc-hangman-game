import React, { Component } from 'react';
import { Redirect }         from 'react-router';
import { Link }             from 'react-router-dom';
import Word                 from '../Word';

class TwoPlayer extends Component {
    constructor(props) {
        super(props);
        this.returnToMainPage = this.returnToMainPage.bind(this);
    }

    returnToMainPage(){
      const { dispatch } = this.props;
      dispatch({ type: 'RETURN_INITAL_STATE' });
  }

    render() {
      const { strike, allGuesses, player2Strike, toggleAlert, wrongGuessesLeft, player2WrongGuesses } = this.props;
      if (toggleAlert === true) {
        return <Redirect push to="/" />;
      }
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} style={{width: '48vw'}}/>);
        var imgRev = (<img id={`hangman-${player2Strike}`} src={`/pics/hangman-${player2Strike}-reversed.png`} style={{width: '48vw'}} />);
         
         return (
           <div className='p2-container'> 
            <Link to="/">
            <button className="btn" onClick={this.returnToMainPage}>Main Page</button>
            </Link>
             <div>
               <img className="image-title-player2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
               <div className="all-guesses-player2">
                 {allGuesses && allGuesses.map(letter => {
                 return letter.toUpperCase();
                 })}
               </div>
             </div>
            
            <div className="row">
                 <div className="col-md-6">
                    <div className="hangman-2p">
                        {img}
                    </div>
                    <div className='guesses-left-1p'>
              <h1>Player 1 Strikes Left: {wrongGuessesLeft}</h1>
             </div>
                </div>
                <div className="col-md-6">
                    <div className="hangman-2p">
                        {imgRev}
                    </div>
                    <div className='guesses-left-2p'>
              <h1>Player 2 Strikes Left: {player2WrongGuesses}</h1>
             </div>
                </div>
             </div>
             <Word
             
 
             />
           </div >
         )
       }
}
export default TwoPlayer;