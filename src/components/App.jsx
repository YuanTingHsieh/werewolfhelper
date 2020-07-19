import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 

import HomePage from './Home.jsx';
import CreateRoom from './CreateRoom.jsx';

const App = () => (
  <BrowserRouter>
    <Route exact path='/' render={HomePage} />
    <Route path='/createroom' component={CreateRoom} />
  </BrowserRouter>
  
);

export default App;
