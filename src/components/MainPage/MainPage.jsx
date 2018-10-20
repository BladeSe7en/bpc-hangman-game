import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
var axios = require('axios');

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.currentWord          = this.currentWord.bind(this);
    this.enter                = this.enter.bind(this);
    this.handleChange         = this.handleChange.bind(this);
    this.handleClick          = this.handleClick.bind(this);
    this.handleClickPlayerTwo = this.handleClickPlayerTwo.bind(this);
  }

 currentWord() {
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
        dispatch({ type: 'UPDATE_CURRENT_WORD', payload: response.data[index].word.split('') });
        dispatch({ type: 'UPDATE_DATA', payload: response.data });
      } 
    )
    .catch((err) => {
  console.log(err);
  response.send(err);
});
  }
  
  handleChange(e) {
    const { dispatch } = this.props;
    dispatch({ type: 'UPDATE_CATAGORY', payload: e.target.value.toLowerCase()});
  }
  handleClick() {
    this.currentWord();
    }

    handleClickPlayerTwo() {
      this.currentWord();
      const { dispatch } = this.props;
      dispatch({ type: 'UPDATE_IS_IT_TWO_PLAYER'  , payload: true});
      }

    enter(e) {
      if (e.key == 'Enter') {
        this.handleclick();
      }
      console.log(e.key);
    }

  render() {
      return (
      <div className='container'>
          <div className="card-body">
          <div className="card">
          <img id="hangman-title-img" src="https://occ-0-901-1001.1.nflxso.net/art/87e01/5694568c69ef4be79164f46b967e7f4c1a387e01.png" />
          <h1 className="title">Instructions</h1>
          <p className="rules">The objective is simple. You must guess your word correctly before the full charactor is drawn. On the 6th wrong answer you will lose. At the cost of one move you may click the hint button to recieve a clue about the word </p>
          <p>To begin, please enter in a catagory.</p>
          </div>
          <Link to="/GamePage">
          <button className="btn" onClick={this.handleClick}>Single Player</button>
          </Link>
          <input
          className ="catagory"
          value     ={this.props.catagory}
          onChange  ={this.handleChange}
          placeholder ='Choose A Catagory' />
          </div>
          <Link to="/TwoPlayer">
          <button className="btn" onClick={this.handleClickPlayerTwo}>Two Player</button>
          </Link>
      </div>
        )
    }
}
export default MainPage;