//skeleton side menu
//not get installed material-ui
//does not direct to checkout nor add properties

import React from 'react';
import './SideBar.css'
import {BrowserRouter, Route, Link} from 'react-router-dom';
//import { slide as Menu } from 'react-burger-menu';
//import Home from "./Account";
//import AddKey from "./AddKey";
//import FormAddKey from "./FormAddKey";
//import Logout from "./Logout";
import AddProperty from "./AddProperty"
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
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
      <nav className='SideBar'>
        <Link className='sideMenuItem' to='/'>
          Home
        </Link>
        <br />
        <Route exact path='/addproperty' render={() => <AddProperty title="Add Property" />}/>

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
      </BrowserRouter>
    );
  }
}


/*
export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/CheckoutKey">
        Checkout Key
      </a>
      <a className="menu-item" href="/FormAddKey" >
        Add Key
      </a>
      <a className="menu-item" href="/FormAddProperty">
        Add Property
      </a>
      <a className='menu-item' href='/testcomp'>
        Show Test Component
      </a>
    </Menu>
  );
};
*/

//
// import './SideBar.css';
// import Home from "./Home";
// import AddKey from "./AddKey";
// import FormAddKey from "./FormAddKey";
// import Logout from "./Logout";
//
// export default props => {
//   return (
//     <Menu>
//       <button class ="menu-item" href="/Home">
//         Home <Link to="/Home"></Link>
//
//       </button>
//       <button class ="menu-item" href="/CheckoutKey">
//         Checkout A Key
//       </button>
//       <button class ="menu-item" href="/FormAddProperty">
//         AddKey
//       </button>
//       <button class ="menu-item" href="/FormAddKey">
//         AddProperty
//       </button>
//     </Menu>
//   );
// };
