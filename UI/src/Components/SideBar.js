//skeleton side menu
//not get installed material-ui
//does not direct to checkout nor add properties

import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

import Home from "./Home";
import FormAddKey from "./FormAddKey";
import FormAddProperty from "./FormAddProperty";
import Logout from "./Logout";


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
    </Menu>
  );
};
// import React from 'react';
// import { slide as Menu } from 'react-burger-menu';
// import { Link } from "react-router-dom";
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
