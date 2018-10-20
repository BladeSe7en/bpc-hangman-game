import React, { Component } from 'react';
import Word from '../Word';

class TwoPlayer extends Component {
    constructor(props) {
        super(props);
        this.letterImg = this.letterImg.bind(this);
    }

    letterImg(letter) {
        return letter.toUpperCase();
    }
    
    

    render() {
        const { strike, allGuesses } = this.props;
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
        var imgRev = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}-reversed.png`} />);
         
         return (
           <div>
             <div>
               <img className="image-title-player2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
               <div className="all-guesses-player2">
                 {allGuesses && allGuesses.map(letter => {
                   return this.letterImg(letter)
                 })}
 
 
               </div>
             </div>
            
            
            
            <div className="row">
                 <div className="col-md-6">
                    <div className="hangman">
                        {img}
                    </div>
                    <div className='guesses-left'>
              <h1>Player 1 Strikes Left: {this.props.wrongGuessesLeft}</h1>
             </div>
                </div>
                <div className="col-md-6">
                    <div className="hangman">
                        {imgRev}
                    </div>
                    <div className='guesses-left'>
              <h1>Player 2 Strikes Left: {this.props.wrongGuessesLeft}</h1>
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