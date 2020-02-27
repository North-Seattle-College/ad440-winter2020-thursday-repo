import React from 'react';
import './TopBar.css';

/**
 * Component to render the top bar
 * 
 * Required props: A click handler function named. See comment.
 * 
 * Accepted props: none
 * 
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default class TopBar extends React.Component {
  constructor(props) {
      super(props);
  }

  /**
   * Required method for React to render component
   */
  render() {
    return (
      <header className='TopBar'>
        <button>Home</button>
        <button>Account</button>
        <button>Sign-Out</button>
      </header>
    )
  };
}

/* Rough definition of required click handler function
(menuId) => { // menuId is expected to be a string
  logic run in parent element
}
*/