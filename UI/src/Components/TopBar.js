import React from 'react';
import {Link} from 'react-router-dom';
import './TopBar.css';
import {companyLogo} from '../staticResources';

/**
 * Component to render the top bar
 *
 * Required props: A click handler function named. See comment.
 *
 * Accepted props: none
 *
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function TopBar (props) {
  return (
    <header className='TopBar'>
      <div className='logo-flexbox'>
        <img  src={companyLogo} alt='Logo' className='Logo' />
      </div>
      <div className='interactive-flexbox'>
        <Link className='top-bar-link' to='/'>
          Home
        </Link>
        <Link className='top-bar-link' to='/account'>
          Account
        </Link>
        <Link className='top-bar-link' to='/signout'>
          Sign-Out
        </Link>
      </div>
    </header>
  );
}

/* Rough definition of required click handler function
(menuId) => { // menuId is expected to be a string
  logic run in parent element
}
<Image source={{uri: 'data:image/png;base64,${logo}'}} />
*/
