import React, { Component } from 'react';
import GamePage from '../GamePage';
import ScorePage from '../ScorePage';
var axios = require('axios');

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.currentWord       = this.currentWord.bind(this);
    this.enter             = this.enter.bind(this);
    this.handleChange      = this.handleChange.bind(this);
    this.handleClick       = this.handleClick.bind(this);
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
    console.log("hello from component method");
    const { dispatch } = this.props;
    dispatch({ type: 'UPDATE_CATAGORY', payload: e.target.value.toLowerCase()});
  }
  handleClick() {
    console.log('click handler was clicked');
    this.currentWord();
    const { dispatch } = this.props;
    dispatch({ type: 'UPDATE_IS_GAME_SHOWING', payload: true});
    dispatch({ type: 'UPDATE_IS_MAIN_PAGE_SHOWING', payload: false});
    }

    enter(e) {
      if (e.key == 'Enter') {
        this.handleclick();
      }
      console.log(e.key);
    }

  render() {
    if (this.props.isMainPageShowing === false) {
        if (this.props.isGameOver === true) {
        return (
          <ScorePage
          handleCurrentWord = {this.handleCurrentWord}
          />)
        
      } else {
        return (   
            <GamePage
              />
         )

       }
    
    } else {       
    return (
        <div className="card-body">
          <div className="card">
            <img id="hangman-title-img" src="https://occ-0-901-1001.1.nflxso.net/art/87e01/5694568c69ef4be79164f46b967e7f4c1a387e01.png" />
            <h1 className="title">Instructions</h1>
            <p className="rules">The objective is simple. You must guess your word correctly before the full charactor is drawn. On the 6th wrong answer you will lose. At the cost of one move you may click the hint button to recieve a clue about the word </p>
            <p>To begin, please enter in a catagory.</p>
          </div>
          <button className="btn" onClick={this.handleClick}>start game</button>
          <input
            className ="catagory"
            value     ={this.props.catagory}
            onChange  ={this.handleChange} />

        </div>
      )
   }
  }
}