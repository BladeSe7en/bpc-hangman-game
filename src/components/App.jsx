import React, { Component } from 'react';
var axios = require('axios');

//import wordbank from './wordbank.json';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPageShowing: true,
      isGameShowing: false,
      isScoreShowing: false,
      allGuesses: [],
      currentGuess: [],
      currentWord: [],
      letter: '',
      catagory:''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.currentWord = this.currentWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ catagory: e.target.value.toLowerCase() });
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
                  currentWord: response.data[index].word.split('')
                });

            })
            .catch((err) => {
                console.log(err);
                response.send(err);
            });
    }

  render() {
    const currentWord = this.state.currentWord;
    if (!this.state.isMainPageShowing) {
      return <GamePage
        currentWord={currentWord} />;
    }

    return (
      <div className="card-body">
        <div className="card">
          <img id="hangman-title-img" src="https://occ-0-901-1001.1.nflxso.net/art/87e01/5694568c69ef4be79164f46b967e7f4c1a387e01.png" />
          <h1 className="title">Instructions</h1>
          <p className="rules">The objective is simple. You must guess your word correctly before the full charactor is drawn. On the 6th wrong answer you will lose. At the cost of one move you may click the hint button to recieve a clue about the word</p>
        </div>
        <button className="btn" onClick={this.clickHandler}>start game</button>
        <input 
        className   ="catagory" 
        value       ={this.state.catagory} 
        onChange    ={this.handleChange} />

        {currentWord && currentWord.map(word => {
          console.log(word);
          return (<img id="letter letter-blank" src="https://cdn.discordapp.com/attachments/351127558143868928/493087385916145666/blank.png" />);
        })}
      </div>

    )

  }
}

export class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPageShowing: true,
      isGameShowing: false,
      isScoreShowing: false,
      correctGuesses: [],
      allGuesses:[],
      letter: '',
      strike: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(currentGuess) {
    //this function checks to see if the current word includes the letter that the user guessed.
    //if the guess is in the current word it is updating the state of correct guesses by adding the current guess to the correct guesses array
    //it is also updating all guesses by adding each current guess to the array regardless if the guess is correct or not
    //if the current guess is not apart of the current word it updates the state of strike by adding one to the count
    //and it also updates the all guesses state by adding the current guess in the array

    if (this.props.currentWord.includes(currentGuess)) {
      this.setState({ 
        correctGuesses: this.state.correctGuesses.concat(currentGuess),
        allGuesses: this.state.allGuesses.concat(currentGuess)
       })
    }
    else {
      this.setState({
        strike: this.state.strike + 1,
        allGuesses: this.state.allGuesses.concat(currentGuess)
      })
    }
  }
  letterImg(letter) {
    if (letter.toLowerCase()=== "a") {
      return <img className="letter letter-a" key='a' src="https://cdn.discordapp.com/attachments/351127558143868928/493086923368300544/a.png" />
    }
    if (letter.toLowerCase()=== "b") {
      return <img className="letter letter-b" key='b'src="https://cdn.discordapp.com/attachments/351127558143868928/493086937297715221/b.png" />
    }
    if (letter.toLowerCase()=== "c") {
      return <img className="letter letter-c"key='c' src="https://cdn.discordapp.com/attachments/351127558143868928/493086954548756493/c.png" />
    }
    if (letter.toLowerCase()=== "d") {
      return <img className="letter letter-d" key='d'src="https://cdn.discordapp.com/attachments/351127558143868928/493086969698582529/d.png" />
    }
    if (letter.toLowerCase()=== "e") {
      return <img className="letter letter-e" key='e'src="https://cdn.discordapp.com/attachments/351127558143868928/493086986106568706/e.png" />
    }
    if (letter.toLowerCase()=== "f") {
      return <img className="letter letter-f" key='f'src="https://cdn.discordapp.com/attachments/351127558143868928/493086998186164235/f.png" />
    }
    if (letter.toLowerCase()=== "g") {
      return <img className="letter letter-g" key='g'src="https://cdn.discordapp.com/attachments/351127558143868928/493087013269012501/g.png" />
    }
    if (letter.toLowerCase()=== "h") {
      return <img className="letter letter-h" key='h'src="https://cdn.discordapp.com/attachments/351127558143868928/493087029383659534/h.png" />
    }
    if (letter.toLowerCase()=== "i") {
      return <img className="letter letter-i" key='i'src="https://cdn.discordapp.com/attachments/351127558143868928/493087043174400001/i.png" />
    }
    if (letter.toLowerCase()=== "j") {
      return <img className="letter letter-j" key='j'src="https://cdn.discordapp.com/attachments/351127558143868928/493087058034950159/j.png" />
    }
    if (letter.toLowerCase()=== "k") {
      return <img className="letter letter-k" key='k'src="https://cdn.discordapp.com/attachments/351127558143868928/493087071855181844/k.png" />
    }
    if (letter.toLowerCase()=== "l") {
      return <img className="letter letter-l" key='l'src="https://cdn.discordapp.com/attachments/351127558143868928/493087097482379274/l.png" />
    }
    if (letter.toLowerCase()=== "m") {
      return <img className="letter letter-m" key='m'src="https://cdn.discordapp.com/attachments/351127558143868928/493087109901713439/m.png" />
    }
    if (letter.toLowerCase()=== "n") {
      return <img className="letter letter-n" key='n' src="https://cdn.discordapp.com/attachments/351127558143868928/493087131468562433/n.png" />
    }
    if (letter.toLowerCase()=== "o") {
      return <img className="letter letter-o" key='o'src="https://cdn.discordapp.com/attachments/351127558143868928/493087142994509843/o.png" />
    }
    if (letter.toLowerCase()=== "p") {
      return <img className="letter letter-p" key='p'src="https://cdn.discordapp.com/attachments/351127558143868928/493087155720290314/p.png" />
    }
    if (letter.toLowerCase()=== "q") {
      return <img className="letter letter-q" key='q' src="https://cdn.discordapp.com/attachments/351127558143868928/493087167447433266/q.png" />
    }
    if (letter.toLowerCase()=== "r") {
      return <img className="letter letter-r" key='r' src="https://cdn.discordapp.com/attachments/351127558143868928/493087179942395964/r.png" />
    }
    if (letter.toLowerCase()=== "s") {
      return <img className="letter letter-s" key='s' src="https://cdn.discordapp.com/attachments/351127558143868928/493087229300703232/s.png" />
    }
    if (letter.toLowerCase()=== 't') {
      return <img className="letter letter-t"key='t'  src="https://cdn.discordapp.com/attachments/351127558143868928/493087192152014858/t.png" />
    }
    if (letter.toLowerCase()=== "u") {
      return <img className="letter letter-u" key='u' src="https://cdn.discordapp.com/attachments/351127558143868928/493087289304416270/u.png" />
    }
    if (letter.toLowerCase()=== "v") {
      return <img className="letter letter-v"key='v'  src="https://cdn.discordapp.com/attachments/351127558143868928/493087307541381121/v.png" />
    }
    if (letter.toLowerCase()=== "w") {
      return <img className="letter letter-w" key='w' src="https://cdn.discordapp.com/attachments/351127558143868928/493087323945304074/w.png" />
    }
    if (letter.toLowerCase()=== "x") {
      return <img className="letter letter-x" key='x' src="https://cdn.discordapp.com/attachments/351127558143868928/493087338306732042/x.png" />
    }
    if (letter.toLowerCase()=== "y") {
      return <img className="letter letter-y" key='y' src="https://cdn.discordapp.com/attachments/351127558143868928/493087358871273475/y.png" />
    }
    if (letter.toLowerCase()=== "z") {
      return <img className="letter letter-z" key='z' src="https://cdn.discordapp.com/attachments/351127558143868928/493087371873746944/z.png" />
    }
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

        <div className="hangman">
          {img}
        </div>
        <Word
          correctGuesses={this.state.correctGuesses}
          currentWord={this.props.currentWord}
          handleSubmit={this.handleSubmit}
        />
      </div>


    )
  }
}
export class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGuess: '',
    };
    this.handleChange     = this.handleChange.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
    this.letterImg        = this.letterImg.bind(this);
    this.enter            = this.enter.bind(this);
    // this.hint             = this.hint.bind(this);
  }
  handleChange(e) {
    this.setState({ currentGuess: e.target.value.toLowerCase() });
  }
  handleSubmit() {
    this.props.handleSubmit(this.state.currentGuess);
    this.setState( {
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
      return <img className="letter letter-a" src="https://cdn.discordapp.com/attachments/351127558143868928/493086923368300544/a.png" />
    }
    if (letter.toLowerCase() === "b") {
      return <img className="letter letter-b" src="https://cdn.discordapp.com/attachments/351127558143868928/493086937297715221/b.png" />
    }
    if (letter.toLowerCase() === "c") {
      return <img className="letter letter-c" src="https://cdn.discordapp.com/attachments/351127558143868928/493086954548756493/c.png" />
    }
    if (letter.toLowerCase() === "d") {
      return <img className="letter letter-d" src="https://cdn.discordapp.com/attachments/351127558143868928/493086969698582529/d.png" />
    }
    if (letter.toLowerCase() === "e") {
      return <img className="letter letter-e" src="https://cdn.discordapp.com/attachments/351127558143868928/493086986106568706/e.png" />
    }
    if (letter.toLowerCase() === "f") {
      return <img className="letter letter-f" src="https://cdn.discordapp.com/attachments/351127558143868928/493086998186164235/f.png" />
    }
    if (letter.toLowerCase() === "g") {
      return <img className="letter letter-g" src="https://cdn.discordapp.com/attachments/351127558143868928/493087013269012501/g.png" />
    }
    if (letter.toLowerCase() === "h") {
      return <img className="letter letter-h" src="https://cdn.discordapp.com/attachments/351127558143868928/493087029383659534/h.png" />
    }
    if (letter.toLowerCase() === "i") {
      return <img className="letter letter-i" src="https://cdn.discordapp.com/attachments/351127558143868928/493087043174400001/i.png" />
    }
    if (letter.toLowerCase() === "j") {
      return <img className="letter letter-j" src="https://cdn.discordapp.com/attachments/351127558143868928/493087058034950159/j.png" />
    }
    if (letter.toLowerCase() === "k") {
      return <img className="letter letter-k" src="https://cdn.discordapp.com/attachments/351127558143868928/493087071855181844/k.png" />
    }
    if (letter.toLowerCase() === "l") {
      return <img className="letter letter-l" src="https://cdn.discordapp.com/attachments/351127558143868928/493087097482379274/l.png" />
    }
    if (letter.toLowerCase() === "m") {
      return <img className="letter letter-m" src="https://cdn.discordapp.com/attachments/351127558143868928/493087109901713439/m.png" />
    }
    if (letter.toLowerCase() === "n") {
      return <img className="letter letter-n" src="https://cdn.discordapp.com/attachments/351127558143868928/493087131468562433/n.png" />
    }
    if (letter.toLowerCase() === "o") {
      return <img className="letter letter-o" src="https://cdn.discordapp.com/attachments/351127558143868928/493087142994509843/o.png" />
    }
    if (letter.toLowerCase() === "p") {
      return <img className="letter letter-p" src="https://cdn.discordapp.com/attachments/351127558143868928/493087155720290314/p.png" />
    }
    if (letter.toLowerCase() === "q") {
      return <img className="letter letter-q" src="https://cdn.discordapp.com/attachments/351127558143868928/493087167447433266/q.png" />
    }
    if (letter.toLowerCase() === "r") {
      return <img className="letter letter-r" src="https://cdn.discordapp.com/attachments/351127558143868928/493087179942395964/r.png" />
    }
    if (letter.toLowerCase() === "s") {
      return <img className="letter letter-s" src="https://cdn.discordapp.com/attachments/351127558143868928/493087229300703232/s.png" />
    }
    if (letter.toLowerCase() === 't') {
      return <img className="letter letter-t" src="https://cdn.discordapp.com/attachments/351127558143868928/493087192152014858/t.png" />
    }
    if (letter.toLowerCase() === "u") {
      return <img className="letter letter-u" src="https://cdn.discordapp.com/attachments/351127558143868928/493087289304416270/u.png" />
    }
    if (letter.toLowerCase() === "v") {
      return <img className="letter letter-v" src="https://cdn.discordapp.com/attachments/351127558143868928/493087307541381121/v.png" />
    }
    if (letter.toLowerCase() === "w") {
      return <img className="letter letter-w" src="https://cdn.discordapp.com/attachments/351127558143868928/493087323945304074/w.png" />
    }
    if (letter.toLowerCase() === "x") {
      return <img className="letter letter-x" src="https://cdn.discordapp.com/attachments/351127558143868928/493087338306732042/x.png" />
    }
    if (letter.toLowerCase() === "y") {
      return <img className="letter letter-y" src="https://cdn.discordapp.com/attachments/351127558143868928/493087358871273475/y.png" />
    }
    if (letter.toLowerCase() === "z") {
      return <img className="letter letter-z" src="https://cdn.discordapp.com/attachments/351127558143868928/493087371873746944/z.png" />
    }
  }



  render() {
   
    return (
      <div >
        <div className="word-section">
          <h1 className="enter-a-guess"></h1>
          <input id='guess' 
          type="string" 
          placeholder   ="Enter in a Guess" 
          value         ={this.state.currentGuess} 
          onChange      ={this.handleChange} 
          onKeyDown     ={this.enter} 
          maxLength     ={1}/>
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
          return (<img className="letter letter-blank" src="https://cdn.discordapp.com/attachments/351127558143868928/493087385916145666/blank.png" />);
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
