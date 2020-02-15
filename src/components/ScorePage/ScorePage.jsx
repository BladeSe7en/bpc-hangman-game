import React, { Component }  from 'react';
import { Link }              from 'react-router-dom';
import { Redirect }          from 'react-router';
import { updateMutualState } from './ScorePageAction';
var axios = require('axios');

class ScorePage extends Component {
    constructor(props) {
        super(props);
        this.currentWord               = this.currentWord              .bind(this);
        this.handleAiDiffCat           = this.handleAiDiffCat          .bind(this);
        this.handleAiSameCat           = this.handleAiDiffCat          .bind(this);
        this.handleChange              = this.handleChange             .bind(this);
        this.handleEasyDifficulty      = this.handleEasyDifficulty     .bind(this);
        this.handleExpertDifficulty    = this.handleExpertDifficulty   .bind(this);
        this.handleHardDifficulty      = this.handleHardDifficulty     .bind(this);
        this.handleSinglePlayerDiffCat = this.handleSinglePlayerDiffCat.bind(this);
        this.handleSinglePlayerSameCat = this.handleSinglePlayerSameCat.bind(this);
        this.handleSingleVsAi          = this.handleSingleVsAi         .bind(this);
        this.handleTwoPlayerDiffCat    = this.handleTwoPlayerDiffCat   .bind(this);
        this.handleTwoPlayerSameCat    = this.handleTwoPlayerSameCat   .bind(this);
        this.handleMediumDifficulty    = this.handleMediumDifficulty   .bind(this);
        this.returnToMainPage          = this.returnToMainPage         .bind(this);
        this.sameCatagoryNewWord       = this.sameCatagoryNewWord      .bind(this);
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
            dispatch(updateMutualState());
        })
        .catch((err) => {
            console.log(err);
            response.send(err);
        });
    }
    handleAiDiffCat(){
        console.log('testing handleAi diff cat');
        this.currentWord();
        const { dispatch } = this.props;
        if (this.props.toggleAlert ===false){
          console.log('testing handleSingleVsAi111111111');
          dispatch({ type: 'IS_IT_SP_VS_AI'   , payload: true });
          dispatch({ type: 'IS_IT_ROBOTS_TURN', payload: false });
          dispatch(updateMutualState());
          }
      }

    handleAiSameCat() {
        console.log('testing handleAi same cat');

        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'IS_IT_SP_VS_AI'     , payload: true });
        dispatch(updateMutualState());
    }

    handleEasyDifficulty(){
        this.handleSingleVsAi();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_AI_DIFFICULTY', payload: 0.25 });
      }

      handleMediumDifficulty(){
        this.handleSingleVsAi();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_AI_DIFFICULTY', payload: 0.50 });
      }

      handleHardDifficulty(){
        this.handleSingleVsAi();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_AI_DIFFICULTY', payload: 0.75 });
      }

      handleExpertDifficulty(){
        this.handleSingleVsAi();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_AI_DIFFICULTY', payload: 1.00 });
      }

      handleAiSameCat(){
        console.log('testing Ai same cat');
        const { dispatch } = this.props;
        if (this.props.toggleAlert ===false){
          dispatch({ type: 'IS_IT_SP_VS_AI'   , payload: true });
          dispatch({ type: 'IS_IT_ROBOTS_TURN', payload: false });
          this.sameCatagoryNewWord();
          }
      }
    

    handleChange(e) {
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_CATAGORY'             , payload: e.target.value.toLowerCase()});
    }

    handleSinglePlayerDiffCat() {
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: false });
        dispatch(updateMutualState());
    }

    handleSinglePlayerSameCat() {
        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: false });
        dispatch(updateMutualState());
    }
    handleSingleVsAi(){
        console.log('testing handleSingleVsAi');
        const { dispatch } = this.props;
        if (this.props.toggleAlert ===false){
          console.log('testing handleSingleVsAi111111111');
          dispatch({ type: 'IS_IT_SP_VS_AI'   , payload: true });
          dispatch({ type: 'IS_IT_ROBOTS_TURN', payload: false });
          this.currentWord();
          }
      }

    handleTwoPlayerDiffCat() {
        console.log('new cat say hi');
        this.currentWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: true });
        dispatch(updateMutualState());
    }

    handleTwoPlayerSameCat() {
        this.sameCatagoryNewWord();
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'     , payload: true });
        dispatch(updateMutualState());
    }

    returnToMainPage(){
        const { dispatch } = this.props;
        dispatch({ type: 'RETURN_INITAL_STATE' });
    }

    sameCatagoryNewWord() {
        const { dispatch, data } = this.props;
        var index = Math.floor(Math.random() * data.length);
        console.log('this is index: '                  , index);
        console.log('this is data: '                   , data[index]);
        console.log('this is length: '                 , data.length);
        dispatch({ type: 'UPDATE_CURRENT_WORD'         , payload: data[index].word.split('') });
        dispatch(updateMutualState());
    }

    render() {
        const { currentWord, didPlayer1Win, didYouWin, isItTwoPlayer, player2Strike, strike, whoIsPlayer } = this.props;
        var scoreImg = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} style={{height: '48vh'}} />);
        var scoreImgRev = (<img id={`hangman-${player2Strike}`} src={`/pics/hangman-${player2Strike}-reversed.png`} style={{height: '48vh'}}/>);
        var message;
        var answer;
        var player;
        /*single player victory*/
        if (didPlayer1Win && !isItTwoPlayer) {
            console.log('--single player victory--');
            console.log('--whoIsPlayer--: ',whoIsPlayer)
         
            message = 'Congratulations! You Won! Would You Like To Play Again?';
            answer  = `You guessed ${currentWord.join('')} correctly`;
        }
        /*single player defeat */
        if (!didPlayer1Win && !isItTwoPlayer) {
            console.log('--single player defeat--');
            console.log('--whoIsPlayer--: ',whoIsPlayer)
        
            message = 'You Lost! Would You Like To Play Again?';
            answer  = `The Correct Word Was ${currentWord.join('')}`;
        }
        /*two player: player 1 wins */
        if (isItTwoPlayer && didPlayer1Win) {
            console.log('--player one victory--');
            console.log('--whoIsPlayer--: ',whoIsPlayer)
            console.log('--strike--: ',strike)
            console.log('--player2Strike--: ',player2Strike)
            if (whoIsPlayer === ' Player One ') {
                console.log('-------')
                player = ' Player Two '
            }
            if (whoIsPlayer === ' Player Two ') {
                console.log('1-------')
                player = ' Player One '
            }
            message = `Congratulations ${player}! Would You Like To Play Again?`;
            answer  = `You guessed ${currentWord.join('')} correctly`;
            if (player2Strike === 6) {
                answer = 'Player TWO ran out of chances.'
            }
            
        }
         /*two player victory for either player one or player two */
         if (isItTwoPlayer && !didPlayer1Win) {
            console.log('player two  victory');
            console.log('whoIsPlayer: ',whoIsPlayer)
            console.log('-2-strike--: ',strike)
            console.log('-2-player2Strike--: ',player2Strike)
            if (whoIsPlayer === ' Player One ') {
                player = ' PlayerTwo '
            }
            if (whoIsPlayer === ' Player Two ') {
                player = ' Player One '
            }
            message = `Congratulations ${player}! Would You Like To Play Again?`;
            answer  = `You guessed ${currentWord.join('')} correctly`;
            if (strike === 6) {
                answer = 'Player ONE ran out of chances.'
            }
           
        }

     

        return (
            <div className='scoreHeader'>
                <Link to="/">
                    <button className="btn" onClick={this.returnToMainPage}>Main Page</button>
                </Link>
                <div>
                    <h1>{message}</h1>
                </div>
                <div className="score-container">
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
                            <div className="">
                                <div className="dropdown">
                                    <button className="dropbtn btn">SAME CATAGORY VS AI</button>
                                    <div className="dropdown-content">
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleEasyDifficulty(); this.sameCatagoryNewWord() }}>Easy</button>
                                        </Link>
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleMediumDifficulty(); this.sameCatagoryNewWord() }}>Medium</button>
                                        </Link>
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleHardDifficulty(); this.sameCatagoryNewWord() }}>Hard</button>
                                        </Link>
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleExpertDifficulty(); this.sameCatagoryNewWord() }}>Expert</button>
                                        </Link>
                                    </div>

                                </div>
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

                            <div className="">
                                <div className="dropdown">
                                    <button className="dropbtn btn">NEW CATAGORY VS AI</button>
                                    <div className="dropdown-content">
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleEasyDifficulty; this.currentWord }}>Easy</button>
                                        </Link>
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleMediumDifficulty; this.currentWord }}>Medium</button>
                                        </Link>
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleHardDifficulty; this.currentWord }}>Hard</button>
                                        </Link>
                                        <Link to="/Ai">
                                            <button className="btn" onClick={() => { this.handleExpertDifficulty; this.currentWord }}>Expert</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <h3>{answer}</h3>
                <div className='score-footer'>
                    <div className='hangman-game-over'
                        /* for two player, shows player one's gallows */
                        style={!isItTwoPlayer ? { display: 'block', height: '50vh' } : { display: 'none' }}>
                        {scoreImg}
                    </div>
                    <div className='hangman-game-over'
                        /* for two player, shows player two's gallows */
                        style={isItTwoPlayer && !didPlayer1Win ? { display: 'block', height: '50vh' } : { display: 'none' }}>
                        {scoreImgRev}
                    </div>
                    <div className='leaderboard'>
                    </div>
                </div>
            </div>
        )
    }
}
export default ScorePage;