import React, { Component } from 'react';
import Word from '../Word';
var axios = require('axios');

class GamePage extends Component {
    constructor(props) {
      super(props);
      this.letterImg    = this.letterImg.bind(this);
    }
  
   
  
    letterImg(letter) {
        if (letter.toLowerCase() === "a") {
          return "A";
        }
        if (letter.toLowerCase() === "b") {
          return 'B';
        }
        if (letter.toLowerCase() === "c") {
          return 'C';
        }
        if (letter.toLowerCase() === "d") {
          return 'D';
        }
        if (letter.toLowerCase() === "e") {
          return 'E';
        }
        if (letter.toLowerCase() === "f") {
          return 'F';
        }
        if (letter.toLowerCase() === "g") {
          return 'G';
        }
        if (letter.toLowerCase() === "h") {
          return 'H';
        }
        if (letter.toLowerCase() === "i") {
          return 'I';
        }
        if (letter.toLowerCase() === "j") {
          return 'J';
        }
        if (letter.toLowerCase() === "k") {
          return 'K';
        }
        if (letter.toLowerCase() === "l") {
          return 'L';
        }
        if (letter.toLowerCase() === "m") {
          return 'M';
        }
        if (letter.toLowerCase() === "n") {
          return 'N';
        }
        if (letter.toLowerCase() === "o") {
          return 'O';
        }
        if (letter.toLowerCase() === "p") {
          return 'P';
        }
        if (letter.toLowerCase() === "q") {
          return 'Q';
        }
        if (letter.toLowerCase() === "r") {
          return 'R';
        }
        if (letter.toLowerCase() === "s") {
          return 'S';
        }
        if (letter.toLowerCase() === 't') {
          return 'T';
        }
        if (letter.toLowerCase() === "u") {
          return 'U';
        }
        if (letter.toLowerCase() === "v") {
          return 'V';
        }
        if (letter.toLowerCase() === "w") {
          return 'W';
        }
        if (letter.toLowerCase() === "x") {
          return 'X';
        }
        if (letter.toLowerCase() === "y") {
          return 'Y';
        }
        if (letter.toLowerCase() === "z") {
          return 'Z';
        }
      }
  
      render() {
       var img = <img id="hangman-0" src="https://cdn.discordapp.com/attachments/374257557880963072/492878824501936149/hangman-0.png" />;
        if (this.props.strike === 1) {
          img = <img id="hangman-1" src="https://media.discordapp.net/attachments/374257557880963072/492878854529089547/hangman-1.png" />
        }
        if (this.props.strike === 2) {
          img = <img id="hangman-2" src="https://media.discordapp.net/attachments/374257557880963072/492878881896923150/hangman-2.png" />
        }
        if (this.props.strike === 3) {
          img = <img id="hangman-3" src="https://media.discordapp.net/attachments/374257557880963072/492878930995576832/hangman-3.png" />
        }
        if (this.props.strike === 4) {
          img = <img id="hangman-4" src="https://media.discordapp.net/attachments/374257557880963072/492878991133376523/hangman-4.png" />
        }
        if (this.props.strike === 5) {
          img = <img id="hangman-5" src="https://media.discordapp.net/attachments/374257557880963072/492879021600669716/hangman-5.png" />
        }
        if (this.props.strike === 6) {
          img = <img id="hangman-6" src="https://media.discordapp.net/attachments/374257557880963072/492879053070532618/hangman-6.png" />
        }
        const {wrongGuessesLeft} = this.props;
        return (
          <div>
            <div>
              <img id="title-2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
              <div className="all-guesses">
                {this.props.allGuesses && this.props.allGuesses.map(letter => {
                  console.log('this is letter from inside the map: ', letter)
                  return this.letterImg(letter)
                })}


              </div>
            </div>
            <div className='guesses-left'>
             <h1>strikes left: {wrongGuessesLeft}</h1>
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

   