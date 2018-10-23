import React, { Component } from 'react';
import { Redirect }         from 'react-router';
import { Link }             from 'react-router-dom';
import Word                 from '../Word';


class GamePage extends Component {
    constructor(props) {
      super(props);
      this.returnToMainPage = this.returnToMainPage.bind(this);
    }

    returnToMainPage(){
      const { dispatch } = this.props;
      dispatch({ type: 'RETURN_INITAL_STATE'});
  }
      render() {
        const { allGuesses, isThereCatagory, strike, wrongGuessesLeft } = this.props;
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
        if (isThereCatagory === false) {
          return <Redirect push to="/" />;
        }
        return (
          <div>
             <Link to="/">
              <button className="btn"onClick={this.returnToMainPage}>Main Page</button>
            </Link>
            <div>
              <img id="title-2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
              <div className="all-guesses">
                {allGuesses && allGuesses.map(letter => {
                  return letter.toUpperCase();
                })}
              </div>
            </div>
            <div className='guesses-left-sp'>
             <h1>strikes left: {wrongGuessesLeft}</h1>
            </div>
            <div className="hangman">
              {img}
            </div>
            <div>
            <Word
            />
          </div >
          </div>
        )
      }
    }
    export default GamePage;

   