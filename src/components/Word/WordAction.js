export const onChange = value => {
	return {
		type: 'ON_CHANGE',
		payload: {
			currentGuess: value
		}
	};
};
export const updateGuesses = (allGuesses, currentGuess) => {
	return {
		type: 'UPDATE_GUESSES',
		payload: allGuesses.concat(currentGuess)
	};
};
export const robotIsRight = (allGuesses, correctGuesses, robotRightSelection, setWord) => {
	console.log('action-robotIsRight-allGuesses: ',allGuesses)
	console.log('action-robotIsRight-correctGuesses: ',correctGuesses)
	console.log('action-robotIsRight-robotRightSelection: ',robotRightSelection)
	console.log('setWord: ',setWord)
	return {
		type: 'ROBOT_IS_RIGHT',
        payload: {
            allGuesses: allGuesses.concat(robotRightSelection),
            correctGuesses: correctGuesses.concat(robotRightSelection),
            isItRobotsTurn: false,
			set: setWord
        }
        
	};
};
export const robotIsWrong = (allGuesses, robotWrongLeft, robotStrike, isItRobotsTurn, robotWrongSelection) => {
	console.log('action-robotIsWrong-allGuesses: ',allGuesses)
	console.log('action-robotIsWrong-robotWrongLeft: ',robotWrongLeft)
	console.log('action-robotIsWrong-robotStrike: ',robotStrike)
	console.log('action-robotIsWrong-isItRobotsTurn: ',isItRobotsTurn)
	console.log('action-robotIsWrong-robotWrongSelection: ',robotWrongSelection)
	return {
		type: 'ROBOT_IS_WRONG',
		payload: {
            allGuesses: allGuesses.concat(robotWrongSelection),
            robotWrongLeft: (+(robotWrongLeft)-1),
            robotStrike: robotStrike + 1,
			isItRobotsTurn: !isItRobotsTurn
        }
	};
};

export const updateCorrectGuesses = (correctGuesses, currentGuess, setWord) => {

	// if (setWord === setCorrect && !isItTwoPlayer) {
	// 	console.log('4')
	// 	dispatch(gameOver(true));
	// 	if (!isItTwoPlayer) {
	// 	  console.log('5')
	// 	  dispatch(player1Win(true));
	// 	}
	// 	 else if (isItSVAi) {
	// 	  console.log('6')
	// 	  if (!isItRobotsTurn) {
	// 		console.log('7')
	// 		dispatch(beatAi(true));
	// 	  } else {
	// 		console.log('8')
	// 		dispatch(beatAi(false));
	// 	  }
	// 	}
	// 	else if (isItTwoPlayer) {
	// 	  console.log('9')
	// 	  dispatch(youWin(null));
	// 	  if (player1Turn) {
	// 		console.log('10')
	// 		dispatch(player1Win(true));
	// 	  } else {
	// 		console.log('11')
	// 		dispatch(player1Win(false));
	// 	  }
	// 	}
	//   }
	return {
		type: 'UPDATE_CORRECT_GUESSES',
		payload: {
			correctGuesses: correctGuesses.concat(currentGuess),
			setWord: setWord
        }
	};
};

export const robotsTurn = (isItRobotsTurn) => {
	return {
		type: 'ROBOTS_TURN',
		payload: {
            isItRobotsTurn: !isItRobotsTurn
        }
	};
};

export const player2Wrong = (player2Strike, player2WrongGuesses) => {
	return {
		type: 'PLAYER2_WRONG',
		payload: {
            player2Strike: player2Strike + 1,
            player2WrongGuesses: (+(player2WrongGuesses) - 1)
        }
    };
};

export const spWrong = (strike, wrongGuessesLeft) => {
	return {
		type: 'SP_WRONG',
		payload: {
            strike: strike + 1,
            wrongGuessesLeft: (+(wrongGuessesLeft)-1)
        }
    };
};

export const p1Turn = (player1Turn) => {
	return {
		type: 'P1_TURN',
		payload: {
            player1Turn: !player1Turn
        }
    };
};

export const whosPlayer = (payload) => {
	return {
		type: 'WHOS_PLAYER',
		payload: {
            whoIsPlayer: payload
        }
    };
};

export const gameOver = (payload) => {
	return {
		type: 'GAME_OVER',
		payload: {
            isGameOver: payload
        }
    };
};

export const player1Win = (payload) => {
	return {
		type: 'PLAYER1_WIN',
		payload: {
            didPlayer1Win: payload
        }
    };
};

export const beatAi = (payload) => {
	return {
		type: 'BEAT_AI',
		payload: {
            didYouBeatAi: payload
        }
    };
};

export const youWin = (payload) => {
	return {
		type: 'YOU_WIN',
		payload: {
            didYouWin: payload
        }
    };
};
