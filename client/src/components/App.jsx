import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 

import HomePage from './Home.jsx';
import CreateRoom from './CreateRoom.jsx';
import GameRoom from './GameRoom.jsx';

class App extends React.Component{
  constructor () {
    super();
    this.state = {
      rooms: [],
    }
  }

  render = () => {
    return (
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />
        <Route path='/createroom' component={CreateRoom} />
        <Route path='/room/:roomid' component={GameRoom}/>
      </BrowserRouter>
    );
  }
};
export default App;
