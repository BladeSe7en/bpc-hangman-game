import React, { Component } from 'react';
var axios = require('axios');

class ScorePage extends Component {
    constructor(props) {
        super(props);
        this.handleChange        = this.handleChange.bind(this);
        this.handleClick         = this.handleClick.bind(this);
        this.sameCatagoryNewWord = this.sameCatagoryNewWord.bind(this);
        this.currentWord         = this.currentWord.bind(this);

    }
    currentWord() {
        console.log('hello from current word function2');
        const { catagory } = this.props;
        var topic = catagory;
        console.log('this is topic ', topic);
        axios.get(`https://api.datamuse.com/words?topics=${topic}`)
          .then(response => {
            var index = Math.floor(Math.random() * response.data.length);
            console.log('this is index: ', index);
            console.log('this is data: ', response.data[index]);
            console.log('this is length: ', response.data.length);
            const { dispatch } = this.props;
            dispatch({ type: 'UPDATE_ALL_GUESSES'          , payload: [] });
            dispatch({ type: 'UPDATE_CATAGORY'             , payload: [] });
            dispatch({ type: 'UPDATE_CORRECT_GUESSES'      , payload: [] });
            dispatch({ type: 'UPDATE_CURRENT_GUESS'        , payload: [] });
            dispatch({ type: 'UPDATE_CURRENT_WORD'         , payload: response.data[index].word.split('') });
            dispatch({ type: 'UPDATE_DATA'                 , payload: response.data });
            dispatch({ type: 'UPDATE_DID_YOU_WIN'          , payload: null });
            dispatch({ type: 'UPDATE_IS_GAME_OVER'         , payload: false });
            dispatch({ type: 'UPDATE_IS_GAME_SHOWING'      , payload: true });
            dispatch({ type: 'UPDATE_IS_SCORE_PAGE_SHOWING', payload: false });
            dispatch({ type: 'UPDATE_LETTER'               , payload: [] });
            dispatch({ type: 'UPDATE_STRIKE'               , payload: 0 });
            dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'   , payload: 6 });
          } 
        )
        .catch((err) => {
      console.log(err);
      response.send(err);
    });
      }

    sameCatagoryNewWord() {
        var index = Math.floor(Math.random() * this.props.data.length);
        console.log('this is index: ', index);
        console.log('this is data: ', this.props.data[index]);
        console.log('this is length: ', this.props.data.length);
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_ALL_GUESSES'          , payload: [] });
        dispatch({ type: 'UPDATE_CORRECT_GUESSES'      , payload: [] });
        dispatch({ type: 'UPDATE_CURRENT_GUESS'        , payload: [] });
        dispatch({ type: 'UPDATE_CURRENT_WORD'         , payload: this.props.data[index].word.split('') });
        dispatch({ type: 'UPDATE_DID_YOU_WIN'          , payload: null });
        dispatch({ type: 'UPDATE_IS_GAME_OVER'         , payload: false });
        dispatch({ type: 'UPDATE_IS_GAME_SHOWING'      , payload: true });
        dispatch({ type: 'UPDATE_IS_SCORE_PAGE_SHOWING', payload: false });
        dispatch({ type: 'UPDATE_LETTER'               , payload: [] });
        dispatch({ type: 'UPDATE_STRIKE'               , payload: 0 });
        dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'   , payload: 6 });
    }
    
    handleClick() {
        console.log('click handler was clicked');
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_GAME_OVER', payload: false});
    }

    handleChange(e) {
        const { dispatch } = this.props;
        console.log("hello from component method");
        dispatch({ type: 'UPDATE_CATAGORY', payload: e.target.value.toLowerCase()});
    }

    render() {
        var img = <img id="hangman-0" src="https://cdn.discordapp.com/attachments/374257557880963072/492878824501936149/hangman-0.png" />;
        var letter = this.props.letter;
  
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