import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (

  <div className="nav">
    <img className="img" src={Logo} alt='logo' />
    <ul className="nav-menu">
        <li><NavLink className="nav-menu__link" exact to="/">Home</NavLink></li>
        <li><NavLink className="nav-menu__link" to="/account">Account</NavLink></li>
        <li><NavLink className="nav-menu__link" to="/logout">Log out</NavLink></li>
    </ul>
  </div>
);

export default Navbar;
