import React, { Component } from 'react';
import { Redirect }         from 'react-router';
import { Link }             from 'react-router-dom';
import Word                 from '../Word';

class SinglePlayerVsAi extends Component {
    constructor(props) {
        super(props);
        this.returnToMainPage = this.returnToMainPage.bind(this);
        this.robotWordLogic   = this.returnToMainPage.bind(this);
    }

    robotWordLogic() {
        const { dispatch, isItRobotsTurn, aiDifficulty, currentWord, allGuesses } = this.props;
        //this block selects the robots correct guess
        var number       = Math.floor(Math.random() * currentWord.length);
        var correctIndex = Math.floor(Math.random() *  robotRightAnswers.length);
        var wrongIndex   = Math.floor(Math.random() *  robotWrongAnswers.length);
        var threshold = Math.ceil(currentWord.length * aiDifficulty);
        var robotCorrectSet = [...new Set(correctGuesses)].join('|')
        var robotWordSet = [...new Set(currentWord)].join('|');
        const right = new RegExp(robotWordSet,"g");
        const prevRight = new RegExp(robotCorrectSet,"g");
        var robotRightAnswers = alpha.replace(right, '').replace(prevRight, '')

        //this block selects the robots wrong guess
        var robotWrongSet = [...new Set(allGuesses)].join('|');
        var alpha  = 'abcdefghijklmnopqrstuvwxyz';
        const wrong = new RegExp(robotWrongSet,"g");
        var robotWrongAnswers = alpha.replace(wrong, '');

        console.log('number: '           , number);
        console.log('correctIndex: '     , correctIndex);
        console.log('wrongIndex: '       , wrongIndex);
        console.log('threshold: '        , threshold);
        console.log('robotCorectSet: '   , robotCorectSet);
        console.log('robotWordSet: '     , robotWordSet);
        console.log('robotRightAnswers: ', robotRightAnswers);
        console.log('robotWrongSet: '    , robotWrongSet);
        console.log('robotWrongAnswers: ', robotWrongAnswers);
        if (spVsAi && isItRobotsTurn) {
                if (number <= threshold){
                dispatch({ type: 'DID_ROBOT_GUESS_RIGHT', payload: 'yes' });
                dispatch({ type: 'ROBOTS_SELECTION'     , payload: robotRightAnswers[correctIndex] });
                } else {
                    dispatch({ type: 'DID_ROBOT_GUESS_RIGHT', payload: 'no' });
                    dispatch({ type: 'ROBOTS_SELECTION'     , payload: robotWrongAnswers[wrongIndex] });
                }

        }
    }

    returnToMainPage(){
      const { dispatch, initalstate } = this.props;
      dispatch({ type: 'RETURN_INITAL_STATE', payload: initalstate });
  }

    render() {
      const { strike, allGuesses, player2Strike, toggleAlert } = this.props;
      if (toggleAlert === true) {
        return <Redirect push to="/" />;
      }
        var img = (<img id={`hangman-${strike}`} src={`/pics/hangman-${strike}.png`} />);
        var imgRev = (<img id={`hangman-${player2Strike}`} src={`/pics/hangman-${player2Strike}-reversed.png`} />);
         
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
              <h1>Player 1 Strikes Left: {this.props.wrongGuessesLeft}</h1>
             </div>
                </div>
                <div className="col-md-6">
                    <div className="hangman-2p">
                        {imgRev}
                    </div>
                    <div className='guesses-left-2p'>
              <h1>Robot's Strikes Left: {this.props.player2WrongGuesses}</h1>
             </div>
                </div>
             </div>
             <Word
             
 
             />
           </div >
         )
       }
}
export default SinglePlayerVsAi;

