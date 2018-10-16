import React, { Component } from 'react';
var axios = require('axios');

//import wordbank from './wordbank.json';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allGuesses        : [],
      catagory          : '',
      currentGuess      : [],
      currentWord       : [],
      data              : [],
      isGameShowing     : false,
      isMainPageShowing : true,
      isScoreShowing    : false,
      letter            : '',
    };

    this.clickHandler   = this.clickHandler.bind(this);
    this.currentWord    = this.currentWord.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    this.handleState    = this.handleState.bind(this);

  }
  
  clickHandler() {
    console.log('click handler was clicked');
    this.currentWord();
    this.setState({
      isMainPageShowing: false,
      isGameShowing: true,
    });
  }

  currentWord() {
    var topic = this.state.catagory;
    console.log('this is topic ', topic);
    axios.get(`https://api.datamuse.com/words?topics=${topic}`)
    .then(response => {
      var index = Math.floor(Math.random() * response.data.length);
      console.log('this is index: ', index);
      console.log('this is data: ', response.data[index]);
      console.log('this is length: ', response.data.length);
      this.setState({
        currentWord: response.data[index].word.split(''),
        data: response.data
      });
      
    })
    .catch((err) => {
      console.log(err);
      response.send(err);
    });
  }
  
  handleChange(e) {
    this.setState({ catagory: e.target.value.toLowerCase() });
  }

  handleState(word)  {
    console.log('this is word: ',word);
    this.setState({currentWord: word});
    console.log('this is currentword after setState: ',this.state.currentWord);
  }

  render() {
    const currentWord = this.state.currentWord;
    if (!this.state.isMainPageShowing) {
      return <GamePage
        currentWord       ={currentWord}
        data              ={this.state.data}
        handleCurrentWord ={this.handleCurrentWord}
        handleState       ={this.handleState}/>
    }

    return (
      <div className="card-body">
        <div className="card">
          <img id="hangman-title-img" src="https://occ-0-901-1001.1.nflxso.net/art/87e01/5694568c69ef4be79164f46b967e7f4c1a387e01.png" />
          <h1 className="title">Instructions</h1>
          <p className="rules">The objective is simple. You must guess your word correctly before the full charactor is drawn. On the 6th wrong answer you will lose. At the cost of one move you may click the hint button to recieve a clue about the word </p>
          <p>To begin, please enter in a catagory.</p>
        </div>
        <button className="btn" onClick={this.clickHandler}>start game</button>
        <input
          className ="catagory"
          value     ={this.state.catagory}
          onChange  ={this.handleChange} />

      </div>

    )

  }
}

export class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPageShowing : true,
      isGameShowing     : false,
      isScoreShowing    : false,
      correctGuesses    : [],
      allGuesses        : [],
      letter            : '',
      strike            : 0,
      isGameOver        : false,
      wrongGuessesLeft  : 6,
      catagory          : ''
    }

    this.handleSubmit         = this.handleSubmit.bind(this);
    this.sameCatagoryNewWord  = this.sameCatagoryNewWord.bind(this);
    this.handleChange         = this.handleChange.bind(this);
    this.clickHandler         = this.clickHandler.bind(this);


  }

  handleChange(e) {
    
    this.setState({ catagory: e.target.value.toLowerCase() });
  }

  currentWord() {
    var topic = this.state.catagory;
    console.log('this is topic ', topic);
    axios.get(`https://api.datamuse.com/words?topics=${topic}`)
      .then(response => {
        var index = Math.floor(Math.random() * response.data.length);
        console.log('this is index: ', index);
        console.log('this is data: ', response.data[index]);
        console.log('this is length: ', response.data.length);
        this.setState({
          allGuesses        : [],
          correctGuesses    : [],
          currentWord       : response.data[index].word.split(''),
          data              : response.data,
          isGameOver        : false,
          letter            : '',
          strike            : 0,
          wrongGuessesLeft  : 6,
        });

      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  }

  clickHandler() {
    console.log('click handler was clicked');
    this.currentWord();
    this.setState({
      isGameOver: false,
    });
  }

  sameCatagoryNewWord() {
    var index = Math.floor(Math.random() * this.props.data.length);
    console.log('this is index: ', index);
    console.log('this is data: ', this.props.data[index]);
    console.log('this is length: ', this.props.data.length);
    this.setState({
      allGuesses        : [],
      correctGuesses    : [],
      isGameOver        : false,
      letter            : '',
      strike            : 0,
      wrongGuessesLeft  : 6,
    });

    this.props.handleState(this.props.data[index].word.split(''))
    console.log('this is currentWord in gamepage: ', this.props.handleState(this.props.data[index].word.split('')));
  }

  isGameOver(n) {
    console.log('testing isGameOver')
    if (n == 6) {
      console.log('strike is at 6, should update state now')
      this.setState({
        isGameOver: true
      })
    }
  }

    handleSubmit(currentGuess) {
      //this function checks to see if the current word includes the letter that the user guessed.
      //if the guess is in the current word it is updating the state of correct guesses by adding the current guess to the correct guesses array
      //it is also updating all guesses by adding each current guess to the array regardless if the guess is correct or not
      //if the current guess is not apart of the current word it updates the state of strike by adding one to the count
      //and it also updates the all guesses state by adding the current guess in the array

      if (this.props.currentWord.includes(currentGuess)) {
        this.setState({
          allGuesses      : this.state.allGuesses.concat(currentGuess),
          correctGuesses  : this.state.correctGuesses.concat(currentGuess),
        })
      }
      else {
        this.isGameOver( this.state.strike + 1);
        this.setState({
          allGuesses        : this.state.allGuesses.concat(currentGuess),
          strike            : this.state.strike + 1,
          wrongGuessesLeft  : (+(this.state.wrongGuessesLeft)-1),
        })
      }
      
    }
    letterImg(letter) {
      if (letter.toLowerCase() === "a") {
        return "A"
      }
      if (letter.toLowerCase() === "b") {
        return 'B'
      }
      if (letter.toLowerCase() === "c") {
        return 'C'
      }
      if (letter.toLowerCase() === "d") {
        return 'D'
      }
      if (letter.toLowerCase() === "e") {
        return 'E'
      }
      if (letter.toLowerCase() === "f") {
        return 'F'
      }
      if (letter.toLowerCase() === "g") {
        return 'G'
      }
      if (letter.toLowerCase() === "h") {
        return 'H'
      }
      if (letter.toLowerCase() === "i") {
        return 'I'
      }
      if (letter.toLowerCase() === "j") {
        return 'J'
      }
      if (letter.toLowerCase() === "k") {
        return 'K'
      }
      if (letter.toLowerCase() === "l") {
        return 'L'
      }
      if (letter.toLowerCase() === "m") {
        return 'M'
      }
      if (letter.toLowerCase() === "n") {
        return 'N'
      }
      if (letter.toLowerCase() === "o") {
        return 'O'
      }
      if (letter.toLowerCase() === "p") {
        return 'P'
      }
      if (letter.toLowerCase() === "q") {
        return 'Q'
      }
      if (letter.toLowerCase() === "r") {
        return 'R'
      }
      if (letter.toLowerCase() === "s") {
        return 'S'
      }
      if (letter.toLowerCase() === 't') {
        return 'T'
      }
      if (letter.toLowerCase() === "u") {
        return 'U'
      }
      if (letter.toLowerCase() === "v") {
        return 'V'
      }
      if (letter.toLowerCase() === "w") {
        return 'W'
      }
      if (letter.toLowerCase() === "x") {
        return 'X'
      }
      if (letter.toLowerCase() === "y") {
        return 'Y'
      }
      if (letter.toLowerCase() === "z") {
        return 'Z'
      }
    }

    render() {
      if (this.state.isGameOver){
        return ( 
        <div className='defeat'>
        <div>
          <h1>GAME OVER! WOULD YOU LIKE TO TRY AGAIN?</h1>
        </div>
        <button className="btn" onClick={this.sameCatagoryNewWord}>SAME CATAGORY</button>
        <input
          className="catagory"
          placeholder="new catagory"
          value={this.state.catagory}
          onChange={this.handleChange} />
        <button className="btn" onClick={this.clickHandler}>NEW CATAGORY</button>
      </div>
      
        )}
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


      return (
        <div>
          <div>
            <img id="title-2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
            <div className="all-guesses">
              {this.state.allGuesses && this.state.allGuesses.map(letter => {
                //instead of returning span, invoke that function that you created, and return that
                return this.letterImg(letter)
              })}
            </div>
          </div>
          <div className='guesses-left'>
           <h1>strikes left: {this.state.wrongGuessesLeft}</h1>
          </div>


          {/* <div>
            {return this.isGameOver()}
        </div> */}
          <div className="hangman">
            {img}
          </div>
          <Word
            correctGuesses={this.state.correctGuesses}
            currentWord={this.props.currentWord}
            handleSubmit={this.handleSubmit}
          />
        </div >


      )
    }
  }
export class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGuess: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.letterImg = this.letterImg.bind(this);
    this.enter = this.enter.bind(this);
    // this.hint             = this.hint.bind(this);
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
  // handleHint() {
  //   this.setState({
  //     strike: strike + 2,
  //   })
  // }
  enter(e) {
    if (e.key == 'Enter') {
      this.handleSubmit()
    }
    console.log(e.key);
  }


  //Create a function that takes one argument representing the letter, and returns an image associated to that letter
  letterImg(letter) {
    if (letter.toLowerCase() === "a") {
      return "A"
    }
    if (letter.toLowerCase() === "b") {
      return 'B'
    }
    if (letter.toLowerCase() === "c") {
      return 'C'
    }
    if (letter.toLowerCase() === "d") {
      return 'D'
    }
    if (letter.toLowerCase() === "e") {
      return 'E'
    }
    if (letter.toLowerCase() === "f") {
      return 'F'
    }
    if (letter.toLowerCase() === "g") {
      return 'G'
    }
    if (letter.toLowerCase() === "h") {
      return 'H'
    }
    if (letter.toLowerCase() === "i") {
      return 'I'
    }
    if (letter.toLowerCase() === "j") {
      return 'J'
    }
    if (letter.toLowerCase() === "k") {
      return 'K'
    }
    if (letter.toLowerCase() === "l") {
      return 'L'
    }
    if (letter.toLowerCase() === "m") {
      return 'M'
    }
    if (letter.toLowerCase() === "n") {
      return 'N'
    }
    if (letter.toLowerCase() === "o") {
      return 'O'
    }
    if (letter.toLowerCase() === "p") {
      return 'P'
    }
    if (letter.toLowerCase() === "q") {
      return 'Q'
    }
    if (letter.toLowerCase() === "r") {
      return 'R'
    }
    if (letter.toLowerCase() === "s") {
      return 'S'
    }
    if (letter.toLowerCase() === 't') {
      return 'T'
    }
    if (letter.toLowerCase() === "u") {
      return 'U'
    }
    if (letter.toLowerCase() === "v") {
      return 'V'
    }
    if (letter.toLowerCase() === "w") {
      return 'W'
    }
    if (letter.toLowerCase() === "x") {
      return 'X'
    }
    if (letter.toLowerCase() === "y") {
      return 'Y'
    }
    if (letter.toLowerCase() === "z") {
      return 'Z'
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



export class ScorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctWord: [],
      currentGuess: [],
      letter: '',
    };

  }
  render() {

    return (
      <div>

      </div>
    )
  }


}
