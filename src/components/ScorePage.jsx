import React, { Component } from 'react';
var axios = require('axios');

class ScorePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correctWord     : [],
            currentGuess    : [],
            letter          : '',
            catagory        : ''
            
        };
        this.sameCatagoryNewWord  = this.sameCatagoryNewWord.bind(this);
        this.handleChange         = this.handleChange.bind(this);
        this.handleClick         = this.handleClick.bind(this);

    }

    handleClick() {
        console.log('click handler was clicked');
        this.currentWord();
        this.props.handleStateGameOver({isGameOver: false});
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
        
        this.props.handleStateGameOver({isGameOver: false});
        this.props.handleStateWord(this.props.data[index].word.split(''));
        console.log('this is currentWord in gamepage: ', this.props.handleStateWord(this.props.data[index].word.split('')));
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
            this.props.HandleState
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

      handleChange(e) {
        this.setState({ catagory: e.target.value.toLowerCase() });
      }

      

    render() {
        if (this.props.isGameOver === true) {
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
                    <button className="btn" onClick={this.handleClick}>NEW CATAGORY</button>
                </div>
                <h3>The word was {this.props.currentWord}.</h3>
                

            )
        }
        else {
            return null
        }
    }
}
export default ScorePage;