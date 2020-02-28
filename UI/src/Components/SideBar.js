//skeleton side menu
//not get installed material-ui
//does not direct to checkout nor add properties
import React from 'react';
import './SideBar.css'
import {Link} from 'react-router-dom';
//import { slide as Menu } from 'react-burger-menu';
//import Home from "./Account";
//import AddKey from "./AddKey";
//import FormAddKey from "./FormAddKey";
//import Logout from "./Logout";

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
      <nav className='SideBar'>
        <Link className='sideMenuItem' to='/'>
          Home
        </Link>
        <br />
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
  }
}


/*
export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/home">
        Ckeckout
      </a>
      <a className="menu-item" href="/FormAddKey">
        Add Key
      </a>

      <a className="menu-item" href="/home">
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
// import React from "react";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from '@material-ui/core/ListItemText'
//
// function SideMenu({items}){
//   return (
//     <div className="sideMenu">
//       <List disablePadding dense>
//         {items.map(({label, name,...rest})=>(
//           <ListItem keyname={name} button {...rest}>
//             <ListItemText>{label}</ListItemText>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   )
// }
// export default SideMenu
