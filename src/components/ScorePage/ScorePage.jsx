import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
var axios = require('axios');

class SinglePlayerVsAiReducer extends Component {
    constructor(props) {
        super(props);
        this.currentWord                               = this.currentWord.bind(this);
        this.handleChange                              = this.handleChange.bind(this);
        this.handleSinglePlayerDiffCat                 = this.handleSinglePlayerDiffCat.bind(this);
        this.handleSinglePlayerSameCat                 = this.handleSinglePlayerSameCat.bind(this);
        this.handleTwoPlayerDiffCat                    = this.handleTwoPlayerDiffCat.bind(this);
        this.handleTwoPlayerSameCat                    = this.handleTwoPlayerSameCat.bind(this);
        this.returnToMainPage                          = this.returnToMainPage.bind(this);
        this.sameCatagoryNewWord                       = this.sameCatagoryNewWord.bind(this);
        this.updateMutualState                         = this.updateMutualState.bind(this);
    }
    
    currentWord() {
        const { catagory, dispatch } = this.props;
        var topic = catagory;
        console.log('this is topic ', topic);
        axios.get(`https://api.datamuse.com/words?topics=${topic}`)
        .then(response => {
            var index = Math.floor(Math.random() * response.data.length);
            console.log('this is index: '              , index);
            console.log('this is data: '               , response.data[index]);
            console.log('this is length: '             , response.data.length);
            dispatch({ type: 'UPDATE_DATA'             , payload: response.data });
            dispatch({ type: 'UPDATE_CURRENT_WORD'     , payload: response.data[index].word.split('') });
            this.updateMutualState();
        })
        .catch((err) => {
            console.log(err);
            response.send(err);
        });
    }
    
    handleChange(e) {
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_CATAGORY'             , payload: e.target.value.toLowerCase()});
    }

    handleSinglePlayerDiffCat() {
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: false });
        this.updateMutualState();
    }

    handleSinglePlayerSameCat() {
        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: false });
        this.updateMutualState();
    }

    handleTwoPlayerDiffCat() {
        console.log('new cat say hi');
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: true });
        this.updateMutualState();
    }

    handleTwoPlayerSameCat() {
        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: true });
        this.updateMutualState();
    }

    returnToMainPage(){
        const { dispatch, initalstate } = this.props;
        dispatch({ type: 'RETURN_INITAL_STATE', payload: initalstate });
    }

    sameCatagoryNewWord() {
        const { dispatch, data } = this.props;
        var index = Math.floor(Math.random() * data.length);
        console.log('this is index: '                  , index);
        console.log('this is data: '                   , data[index]);
        console.log('this is length: '                 , data.length);
        dispatch({ type: 'UPDATE_CURRENT_WORD'         , payload: data[index].word.split('') });
        this.updateMutualState();
    }
      updateMutualState() {
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_ALL_GUESSES'          , payload: [] });
        dispatch({ type: 'UPDATE_CORRECT_GUESSES'      , payload: [] });
        dispatch({ type: 'UPDATE_CURRENT_GUESS'        , payload: [] });
        dispatch({ type: 'UPDATE_DID_PLAYER1_WIN'      , payload: null });
        dispatch({ type: 'UPDATE_DID_YOU_WIN'          , payload: null });
        dispatch({ type: 'UPDATE_IS_GAME_OVER'         , payload: false });
        dispatch({ type: 'UPDATE_LETTER'               , payload: [] });
        dispatch({ type: 'UPDATE_STRIKE'               , payload: 0 });
        dispatch({ type: 'UPDATE_PLAYER2_STRIKE'       , payload: 0 });
        dispatch({ type: 'UPDATE_TURN'                 , payload: true});
        dispatch({ type: 'UPDATE_PLAYER1_TURN'         , payload: true});
        dispatch({ type: 'UPDATE_PLAYER2_WRONG_GUESSES', payload: 6});
        dispatch({ type: 'UPDATE_WRONG_GUESSES_LEFT'   , payload: 6 });
        dispatch({ type: 'UPDATE_WHOS_TURN_IS_IT'      , payload: null });
      }

    render() {
        const { currentWord, didPlayer1Win, didYouWin, isItTwoPlayer, player2Strike, strike, whoIsPlayer } = this.props;
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
        var imgRev = (<img id={`hangman-${player2Strike}`} src={`/pics/hangman-${player2Strike}-reversed.png`} />);
        var message;
        var answer;
        
        /*single player victory*/
        if (didYouWin && !isItTwoPlayer) {
            console.log('single player victory');
            message = 'Congratulations! You Won! Would You Like To Play Again?';
            answer  = `You guessed ${currentWord.join('')} correctly`;
        }
        /*single player defeat */
        if (!didYouWin && !isItTwoPlayer) {
            console.log('single player defeat');
            message = 'You Lost! Would You Like To Play Again?';
            answer  = `The Correct Word Was ${currentWord.join('')}`;
        }
        /*two player: player 1 wins */
        if (isItTwoPlayer && didPlayer1Win) {
            console.log('player one  victory');
            message = `Congratulations ${whoIsPlayer}! Would You Like To Play Again?`;
            answer  = `You guessed ${currentWord.join('')} correctly`;
        }
         /*two player victory for either player one or player two */
         if (isItTwoPlayer && !didPlayer1Win) {
            console.log('player two  victory');
            message = `Congratulations ${whoIsPlayer}! Would You Like To Play Again?`;
            answer  = `You guessed ${currentWord.join('')} correctly`;
        }
       
            return (
                <div className='scoreHeader'>
                    <Link to="/">
                    <button className="btn" onClick={this.returnToMainPage}>Main Page</button>
                    </Link>
                    <div>
                        <h1>{message}</h1>
                    </div>
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-4">
                                <div className="">
                                    <Link to="/TwoPlayer">
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
                                    onChange={this.handleChange} />
                            </div>
                            <div className="col-xs-4">
                                <div className="">
                                    <Link to="/TwoPlayer">
                                        <button className="btn" onClick={this.handleTwoPlayerDiffCat}>NEW CATAGORY TWO PLAYER</button>
                                    </Link>
                                </div>

                                <div className="">
                                    <Link to="/GamePage">
                                        <button className="btn" onClick={this.handleSinglePlayerDiffCat}>NEW CATAGORY SINGLE PLAYER</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <h3>{answer}</h3>
                    <div className='hangman-game-over' 
                    /* for two player, shows player one's gallows */
                        style={!isItTwoPlayer ? { display: 'block' } : { display: 'none' }}>
                        {img}
                    </div>
                    <div className='hangman-game-over' 
                    /* for two player, shows player two's gallows */
                        style={isItTwoPlayer && !didPlayer1Win ? { display: 'block' } : { display: 'none' }}>
                        {imgRev}
                    </div>
                    <div className='leaderboard'>
                    </div>
                </div>
            )
        }
}
export default ScorePage;