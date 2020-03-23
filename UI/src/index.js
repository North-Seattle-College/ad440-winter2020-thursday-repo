import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div className='wrapper'>
    <Router className='RouterWrapper'>
      <App />
    </Router>
  </div>,
  document.getElementById('root')
);