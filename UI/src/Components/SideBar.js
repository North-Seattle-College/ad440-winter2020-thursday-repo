import React from 'react';
import './SideBar.css'
import {Link} from 'react-router-dom';
/**
 * Component to display the side bar
 *
 * Accepted props: none
 *
 * Required props:
 *
 * @author Perla Reyes-Herrera
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function SideBar () {
  return (
    <nav className='SideBar'>
      <Link className='sideMenuItem' to='/'>
        Dashboard
      </Link>
      <br />
      {/*<Route exact path='/addproperty' render={() => <AddProperty title="Add Property" />}/>*/}
      <Link className='sideMenuItem' to='/addproperty'>
        Add Property
      </Link>
      <br />
      <Link className='sideMenuItem' to='/addkey'>
        Add Key
      </Link>
      <br />
      <Link className='sideMenuItem' to='/addkeyholder'>
        Add Person
      </Link>
      <br />
      <Link className='sideMenuItem' to='/checkoutkey'>
        Checkout Key
      </Link>
      <br />
    </nav>
  );
};