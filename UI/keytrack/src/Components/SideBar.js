//skeleton side menu
//not get installed material-ui
//does not direct to checkout nor add properties
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import FormAddKey from "./FormAddKey";
// import AddKey from "./AddKey";
// import Layout from "./layout";
// import Logout from "./logout";
//
//
//
// const routes = [
//   {
//     path: "/Layout",
//     exact: true,
//     sidebar: () => <div>Add Key!</div>,
//     main: () => <h2>Add Key</h2>
//   },
//   {
//     path: "/home",
//     sidebar: () => <div>AddKey!</div>,
//     main: () => <h2>AddKey</h2>
//   },
//   {
//     path: "/logout",
//     sidebar: () => <div>layout!</div>,
//     main: () => <h2>layout</h2>
//   }
// ];
//
// export default function SidebarExample() {
//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         <div
//           style={{
//             padding: "10px",
//             width: "40%",
//             background: "#f0f0f0"
//           }}
//         >
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             <li>
//               <Link to="/layout">AddKey</Link>
//             </li>
//             <li>
//               <Link to="/home">AddKey</Link>
//             </li>
//             <li>
//               <Link to="/logout">Logout</Link>
//             </li>
//           </ul>
//
//           <Switch>
//             {routes.map((route, index) => (
//               // You can render a <Route> in as many places
//               // as you want in your app. It will render along
//               // with any other <Route>s that also match the URL.
//               // So, a sidebar or breadcrumbs or anything else
//               // that requires you to render multiple things
//               // in multiple places at the same URL is nothing
//               // more than multiple <Route>s.
//               <Route
//                 key={index}
//                 path={route.path}
//                 exact={route.exact}
//                 children={<route.sidebar />}
//               />
//             ))}
//           </Switch>
//         </div>
//
//         <div style={{ flex: 1, padding: "10px" }}>
//           <Switch>
//             {routes.map((route, index) => (
//               // Render more <Route>s with the same paths as
//               // above, but different components this time.
//               <Route
//                 key={index}
//                 path={route.path}
//                 exact={route.exact}
//                 children={<route.main />}
//               />
//             ))}
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }

//import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import Home from "./account";
import Layout from "./layout";
import AddKey from "./AddKey";
import Logout from "./logout";
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/home">
        Checkout Key
      </a>
      <a className="menu-item" href="/home" >
      <Link to="/layout">AddKey</Link>>
      </a>

      <a className="menu-item" href="/layout">
        Add Property
      </a>
      <a className="menu-item" href="/home">
      <BrowserRouter>
        <div className="navbar">
          <Layout />
          <Route path="/AddKey" render={() => <AddKey title="AddKey" />} />
        </div>
      </BrowserRouter>      </a>

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

import React from "react";
//import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
//import ListItemText from "@material-ui/core/ListItemText";

function SideMenu({ items }) {
  return <div className="sideMenu"></div>;
}
export default SideMenu;
