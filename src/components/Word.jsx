import React, { Component } from 'react';

class Word extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentGuess: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.letterImg = this.letterImg.bind(this);
      this.enter = this.enter.bind(this);
    }
    
    handleChange(e) {
      this.setState({ currentGuess: e.target.value.toLowerCase() });
    }
    handleSubmit() {
      this.props.handleSubmit(this.state.currentGuess);
      this.setState({
        currentGuess: '',
      });
    }
   
    enter(e) {
      if (e.key == 'Enter') {
        this.handleSubmit()
      }
      console.log(e.key);
    }
  
    //Create a function that takes one argument representing the letter, and returns an image associated to that letter
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
  
      return (
        <div >
          <div className="word-section">
            <h1 className="enter-a-guess"></h1>
            <input id='guess'
              type="string"
              placeholder="Enter in a Guess"
              value={this.state.currentGuess}
              onChange={this.handleChange}
              onKeyDown={this.enter}
              maxLength={1} />
            <button
              className="btn"
              onClick={this.handleSubmit.bind(this)}
            >Enter Guess </button>
            {/* <label for="hint">Click Here For The Words Definiton At The Cost Of Two Strikes</label>
            <button
            className="hint"
            onClick={this.hint.bind(this)}>Hint</button> */}
  
            {this.props.currentWord && this.props.currentWord.map(letter => {
              if (this.props.correctGuesses.includes(letter)) {
                //instead of returning span, invoke that function that you created, and return that
                return this.letterImg(letter)
              }
              return (' _ ');
            })}
          </div>
        </div>
  
      )
    }
  }

  export default Word;