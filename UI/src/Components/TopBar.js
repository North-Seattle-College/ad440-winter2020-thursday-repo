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
        <button class = "button">Home</button>
        <button  class = "button">Account</button>
        <button  class = "button">Sign-Out</button>
      </header>
    )
  };
}

/* Rough definition of required click handler function
(menuId) => { // menuId is expected to be a string
  logic run in parent element
}
*/
