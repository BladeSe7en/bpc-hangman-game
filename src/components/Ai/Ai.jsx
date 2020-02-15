import React, { Component } from 'react';
import { Redirect }         from 'react-router';
import { Link }             from 'react-router-dom';
import Word                 from '../Word';

class Ai extends Component {
    constructor(props) {
        super(props);
        this.returnToMainPage = this.returnToMainPage.bind(this);
        this.robotWordLogic   = this.returnToMainPage.bind(this);
    }

  returnToMainPage() {
    const { dispatch } = this.props;
    dispatch({ type: 'RETURN_INITAL_STATE' });
  }

  render() {
    const { strike, allGuesses, toggleAlert, wrongGuessesLeft, robotStrike, robotWrongLeft } = this.props;
    // if (toggleAlert === true) {
    //   const { dispatch } = this.props;
    //   dispatch({ type: 'RETURN_INITAL_STATE' });
    //   return <Redirect push to="/" />;
    // }
    var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
    var imgRev = (<img id={`hangman-${robotStrike}`} src={`/pics/hangman-${robotStrike}-reversed.png`} />);

    return (
      <div>
        <Link to="/">
          <button className="btn" onClick={this.returnToMainPage}>Main Page</button>
        </Link>
        <div>
          <img className="image-title-player2" src="https://cdn.discordapp.com/attachments/374257557880963072/492551101883875349/title2.png" />
          <div className="all-guesses-player2">
            {allGuesses && allGuesses.map(letter => {
              return letter.toUpperCase();
            })}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="hangman-2p">
              {img}
            </div>
            <div className='guesses-left-1p'>
              <h1>Player 1 Strikes Left: {wrongGuessesLeft}</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className="hangman-2p">
              {imgRev}
            </div>
            <div className='guesses-left-2p'>
              <h1>Robot's Strikes Left: {robotWrongLeft}</h1>
            </div>
          </div>
        </div>
        <Word
        />
      </div >
    )
  }
}
export default Ai;




