//skeleton side menu
//not get installed material-ui
//does not direct to checkout nor add properties
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import Home from "./Account";
import AddKey from "./AddKey";
import FormAddKey from "./FormAddKey";
import Logout from "./Logout";

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
    </Menu>
  );
};

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
