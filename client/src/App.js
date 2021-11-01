//import logo from './logo.svg';
import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Information from './components/Information';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home} />
      <Route path='/information' component={Information} />
    </React.Fragment>
  );
}

export default App;
