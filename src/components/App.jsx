import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import MainPage         from './MainPage';
import GamePage         from './GamePage';
import ScorePage        from './ScorePage';
import SinglePlayerVsAi from './SinglePlayerVsAi';
import TwoPlayer        from './TwoPlayerPage';
import Word             from './Word';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/'           component={MainPage} />
        <Route path='/GamePage'         component={GamePage} />
        <Route path='/Word'             component={Word} />
        <Route path='/ScorePage'        component={ScorePage} />
        <Route path='/SinglePlayerVsAi' component={SinglePlayerVsAi} />
        <Route path='/TwoPlayer'        component={TwoPlayer} />
        </div>
    </Router>
    );
  }
}
export default App;