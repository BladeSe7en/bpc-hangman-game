import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
var axios = require('axios');

class ScorePage extends Component {
    constructor(props) {
        super(props);
        this.handleChange                              = this.handleChange.bind(this);
        this.handleClick                               = this.handleClick.bind(this);
        this.handleSinglePlayerSameCat                 = this.handleSinglePlayerSameCat.bind(this);
        this.handleSinglePlayerDiffCat                 = this.handleSinglePlayerDiffCat.bind(this);
        this.handleTwoPlayerSameCat                    = this.handleTwoPlayerSameCat.bind(this);
        this.handleTwoPlayerDiffCat                    = this.handleTwoPlayerDiffCat.bind(this);
        this.sameCatagoryNewWord                       = this.sameCatagoryNewWord.bind(this);
        this.currentWord                               = this.currentWord.bind(this);
        this.updateMutualState                         = this.updateMutualState.bind(this);
    }

    currentWord() {
        console.log('hello from current word function2');
        const { catagory } = this.props;
        var topic = catagory;
        console.log('this is topic ', topic);
        axios.get(`https://api.datamuse.com/words?topics=${topic}`)
          .then(response => {
            var index = Math.floor(Math.random() * response.data.length);
            console.log('this is index: '              , index);
            console.log('this is data: '               , response.data[index]);
            console.log('this is length: '             , response.data.length);
            const { dispatch } = this.props;
            dispatch({ type: 'UPDATE_DATA'             , payload: response.data });
            dispatch({ type: 'UPDATE_CURRENT_WORD'     , payload: this.props.data[index].word.split('') });

            this.updateMutualState();
          } 
        )
        .catch((err) => {
        console.log(err);
        response.send(err);
        });
    }

    handleChange(e) {
        const { dispatch } = this.props;
        console.log("hello from component method");
        dispatch({ type: 'UPDATE_CATAGORY'             , payload: e.target.value.toLowerCase()});
    }
    
    handleClick() {
        console.log('click handler was clicked');
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_GAME_OVER'         , payload: false});
    }

    handleSinglePlayerSameCat() {
        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: false });
    }
    handleSinglePlayerDiffCat() {
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: false });
    }

    handleTwoPlayerSameCat() {
        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: true });
    }

    handleTwoPlayerDiffCat() {
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: true });
    }

    sameCatagoryNewWord() {
        var index = Math.floor(Math.random() * this.props.data.length);
        console.log('this is index: '                  , index);
        console.log('this is data: '                   , this.props.data[index]);
        console.log('this is length: '                 , this.props.data.length);
        dispatch({ type: 'UPDATE_CURRENT_WORD'         , payload: this.props.data[index].word.split('') });

        this.updateMutualState();
    }
      updateMutualState() {
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_ALL_GUESSES'          , payload: [] });
        dispatch({ type: 'UPDATE_CORRECT_GUESSES'      , payload: [] });
        dispatch({ type: 'UPDATE_CURRENT_GUESS'        , payload: [] });
        dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'      , payload: null });
        dispatch({ type: 'UPDATE_DID_YOU_WIN'          , payload: null });
        dispatch({ type: 'UPDATE_LETTER'               , payload: [] });
        dispatch({ type: 'UPDATE_STRIKE'               , payload: 0 });
        dispatch({ type: 'UPDATE_PLAYER2_STRIKE'       , payload: 0 });
        dispatch({ type: 'UPDATE_TURN'                 , payload: true});
        dispatch({ type: 'UPDATE_PLAYER1_TURN'         , payload: true});
        dispatch({ type: 'UPDATE_PLAYER2_WRONG_GUESSES', payload: true});
        dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'   , payload: 6 });
      }

    render() {
        const { strike } = this.props;
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
        var player;
        this.props.didPlayer1Win = true ? player = " Player One, " : player = " Player Two, "
        if (this.props.isGameOver === true) {
            if (this.props.didYouWin) {
                return ( 
                    <div className='victory'>
                        <div>
                            <h1>Congratulations {player} you won! WOULD YOU LIKE TO PLAY AGAIN?</h1>
                        </div>
                        <div className="container">
                            <div className="row">

                                <div className="col-xs-4">
                                    <div className="">
                                        <Link to="/GamePage">
                                            <button className="btn" onClick={this.handleTwoPlayerSameCat}>SAME CATAGORY TWO PLAYER</button>
                                        </Link>
                                    </div>

                                    <div className="">
                                        <Link to="/GamePage">
                                            <button className="btn" onClick={this.handleSinglePlayerSameCat}>SAME CATAGORY SINGLE PLAYER</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                <input
                                    className="catagory"
                                    placeholder="new catagory"
                                    value={this.props.catagory}
                                    onChange={this.handleChange} />
                                </div>
                                <div className="col-xs-4">
                                    <div className="">
                                        <Link to="/GamePage">
                                            <button className="btn" onClick={this.handleTwoPlayerPlayerDiffCat}>NEW CATAGORY TWO PLAYER</button>
                                        </Link>
                                    </div>

                                    <div className="">
                                        <Link to="/GamePage">
                                            <button className="btn" onClick={this.handleSinglePlayerPlayerDiffCat}>NEW CATAGORY SINGLE PLAYER</button>
                                        </Link>
                                    </div>
                            </div>
                        </div>

                                </div>
                                    <h3>You guessed {this.props.currentWord} correctly.</h3>
                                    <div className='hangman'>
                                        {img}
                                    </div>
                                    <div className='leaderboard'>
                                    </div>
                    </div>
                )
            } else {
            return (
                <div className='defeat'>
                    <div>
                        <h1>GAME OVER! WOULD YOU LIKE TO TRY AGAIN?</h1>
                    </div>
                    <Link to="/GamePage">
                    <button className="btn" onClick={this.sameCatagoryNewWord}>SAME CATAGORY</button>
                    </Link>
                    <input
                        className="catagory"
                        placeholder="new catagory"
                        
                        onChange={this.handleChange} />
                    <Link to="/GamePage">
                    <button className="btn" onClick={this.handleClick}>NEW CATAGORY</button>
                    </Link>
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