import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div className='wrapper'>
    <Router className='RouterWrapper'>
      <App />
    </Router>
  </div>,
  document.getElementById('root')
);
=======
import * as serviceWorker from './serviceWorker';
import App2 from './App2';

ReactDOM.render(<App2 />, document.getElementById('root'));
>>>>>>> feature-sprint3-abby

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
