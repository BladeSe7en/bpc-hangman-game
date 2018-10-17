import React, { Component } from 'react';
var axios = require('axios');

class ScorePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correctWord     : [],
            currentGuess    : [],
            letter          : '',
            catagory        : ''
            
        };

        this.sameCatNewWord     = this.sameCatNewWord.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.handleClick        = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('click handler was clicked');
        this.props.changeCurrentWord();
        this.props.handleStateGameOver({isGameOver: false});
    }

    sameCatNewWord(e) {
    this.props.handleSameCatagoryNewWord();
    this.props.handleStateGameOver({isGameOver: false});
    }

      handleChange(e) {
       this.props.handleChange(e);
      }

    render() {
        var img = <img id="hangman-0" src="https://cdn.discordapp.com/attachments/374257557880963072/492878824501936149/hangman-0.png" />;
        var letter;
  
        if (this.state.strike === 1) {
          img = <img id="hangman-1" src="https://media.discordapp.net/attachments/374257557880963072/492878854529089547/hangman-1.png" />
        }
        if (this.state.strike === 2) {
          img = <img id="hangman-2" src="https://media.discordapp.net/attachments/374257557880963072/492878881896923150/hangman-2.png" />
        }
        if (this.state.strike === 3) {
          img = <img id="hangman-3" src="https://media.discordapp.net/attachments/374257557880963072/492878930995576832/hangman-3.png" />
        }
        if (this.state.strike === 4) {
          img = <img id="hangman-4" src="https://media.discordapp.net/attachments/374257557880963072/492878991133376523/hangman-4.png" />
        }
        if (this.state.strike === 5) {
          img = <img id="hangman-5" src="https://media.discordapp.net/attachments/374257557880963072/492879021600669716/hangman-5.png" />
        }
        if (this.state.strike === 6) {
          img = <img id="hangman-6" src="https://media.discordapp.net/attachments/374257557880963072/492879053070532618/hangman-6.png" />
        }
        if (this.props.isGameOver === true) {
            if (this.props.didYouWin) {
                return (
                    <div className='victory'>
                        <div>
                        <h1>Congratulations you won! WOULD YOU LIKE TO TRY AGAIN?</h1>
                        </div>
                        <button className="btn" onClick={this.sameCatNewWord}>SAME CATAGORY</button>
                        <input
                            className="catagory"
                            placeholder="new catagory"
                            value={this.props.catagory}
                            onChange={this.handleChange} />
                        <button className="btn" onClick={this.handleClick}>NEW CATAGORY</button>
                        <h3>You guessed {this.props.currentWord} correctly.</h3>
                        <div classname='row'>
                            <div className='hangman'>
                            {img}
                            </div>
                            <div className='leaderboard'>
                            </div>
                        </div>
                    </div>
                )
            } else {
            return (
                <div className='defeat'>
                    <div>
                        <h1>GAME OVER! WOULD YOU LIKE TO TRY AGAIN?</h1>
                    </div>
                    <button className="btn" onClick={this.sameCatagoryNewWord}>SAME CATAGORY</button>
                    <input
                        className="catagory"
                        placeholder="new catagory"
                        value={this.props.catagory}
                        onChange={this.handleChange} />
                    <button className="btn" onClick={this.handleClick}>NEW CATAGORY</button>
                    <h3>The word was {this.props.currentWord}.</h3>
                </div>
                

            )}
        }
        else {
            return null
        }
    }
}
export default ScorePage;