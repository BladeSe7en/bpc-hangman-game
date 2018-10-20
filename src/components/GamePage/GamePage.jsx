import React, { Component } from 'react';
import Word from '../Word';

class GamePage extends Component {
    constructor(props) {
      super(props);
    }

      render() {
        const { strike } = this.props;
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
        return (
          <div>
            <div>
              <img id="title-2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
              <div className="all-guesses">
                {this.props.allGuesses && this.props.allGuesses.map(letter => {
                  return letter.toUpperCase();
                })}
              </div>
            </div>
            <div className='guesses-left'>
             <h1>strikes left: {this.props.wrongGuessesLeft}</h1>
            </div>
            <div className="hangman">
              {img}
            </div>
            <Word
            />
          </div >
        )
      }
    }
    export default GamePage;

   