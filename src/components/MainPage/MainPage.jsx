import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
var axios = require('axios');

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.currentWord             = this.currentWord           .bind(this);
    this.enter                   = this.enter                 .bind(this);
    this.handleChange            = this.handleChange          .bind(this);
    this.handleClick             = this.handleClick           .bind(this);
    this.handleClickPlayerTwo    = this.handleClickPlayerTwo  .bind(this);
    this.handleAlertClick        = this.handleAlertClick      .bind(this);
    this.handleEasyDifficulty    = this.handleEasyDifficulty  .bind(this);
    this.handleMediumDifficulty  = this.handleMediumDifficulty.bind(this);
    this.handleHardDifficulty    = this.handleHardDifficulty  .bind(this);
    this.handleExpertDifficulty  = this.handleExpertDifficulty.bind(this);
    this.handleSingleVsAi        = this.handleSingleVsAi      .bind(this);


  }

  currentWord() {
    const { catagory, history } = this.props;
    var topic = catagory;
    console.log('this is topic ', topic);
    console.log('this is history: ', history)
    axios.get(`https://api.datamuse.com/words?topics=${topic}`)
      .then(response => {
        var index = Math.floor(Math.random() * response.data.length);
        console.log('this is index: ', index);
        console.log('this is data: ', response.data[index]);
        console.log('this is length: ', response.data.length);
        const { dispatch } = this.props;
        dispatch({ type: 'UPDATE_CURRENT_WORD', payload: response.data[index].word.split('') });
        dispatch({ type: 'UPDATE_DATA', payload: response.data });
      }
      )
      .catch((err) => {
        console.error(err)
      });
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


  handleChange(e) {
    const { dispatch } = this.props;
    dispatch({ type: 'UPDATE_CATAGORY', payload: e.target.value.toLowerCase()});
  }
  handleClick() {
    this.isThereCatagory();
    if (this.props.toggleAlert ===false){
    this.currentWord();
    }}

    handleClickPlayerTwo() {
      const { dispatch, toggleAlert } = this.props;
      this.isThereCatagory();
      if (toggleAlert ===false){
      this.currentWord();
      dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER', payload: true});
      }}

      handleAlertClick() {
        const { dispatch } = this.props;
      dispatch({ type: 'TOGGLE_ALERT', payload: false});
      }

    enter(e) {
      if (e.key == 'Enter') {
        this.handleclick();
      }
      console.log(e.key);
    }
    isThereCatagory() {
      const { catagory, dispatch } = this.props;
      if( catagory === '' || catagory === undefined){
      dispatch({ type: 'TOGGLE_ALERT', payload: true});
      }
    }

  render() {
      return (
        <div className='container'>
          <div className="card-body">
            <div className="card">
              <img id="hangman-title-img" src="https://occ-0-901-1001.1.nflxso.net/art/87e01/5694568c69ef4be79164f46b967e7f4c1a387e01.png" />
              <h1 className="title">Instructions</h1>
              <p className="rules">The objective is simple. You must guess your word correctly before the full charactor is drawn. On the 6th wrong answer you will lose. At the cost of one move you may click the hint button to recieve a clue about the word </p>
              <p>To begin, please enter in a catagory and select either single player or two player.</p>
            </div>
            <div className="row">
              <div className="col-xs-3">
              <div className="">
                <div className="dropdown">
              <button className="dropbtn btn">Single Player VS AI</button>
              <div className="dropdown-content">
              <Link to="/Ai">
              <button className="btn" onClick={this.handleEasyDifficulty}>Easy</button>
                </Link>
                <Link to="/Ai">
                <button className="btn" onClick={this.handleMediumDifficulty}>Medium</button>
                </Link>
                <Link to="/Ai">
                <button className="btn" onClick={this.handleHardDifficulty}>Hard</button>
                </Link>
                <Link to="/Ai">
                <button className="btn" onClick={this.handleExpertDifficulty}>Expert</button>
                </Link>
              </div>
                 
            </div>
                </div>
                <div>
                  <Link to="/GamePage">
                    <button className="btn" onClick={this.handleClick}>Single Player</button>
                  </Link>
                </div>
                <div className="">
                  <Link to="/TwoPlayer">
                    <button className="btn" onClick={this.handleClickPlayerTwo}>Two Player</button>
                  </Link>
                </div>
          
                <div className="">
                  <Link to="/Leaderboard">
                    <button className="btn">Leaderboard</button>
                  </Link>
                </div>
              </div>
              <div className=''>
              <div className="col-md-9">
                <input
                  className="catagory"
                  value={this.props.catagory}
                  onChange={this.handleChange}
                  placeholder='Choose A Catagory' />
              </div>
                  <div className="">
                  <div className="alert"
                  style={this.props.toggleAlert === true ? { display: 'block' } : { display: 'none' }}
                  >
                  <h1>Please enter in a catagory before selecting Single or Two Player.</h1>
                  <div 
                  className="closeBtn" 
                  onClick={this.handleAlertClick}>X
                  </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>

        </div>
        )
    }
}
export default MainPage;