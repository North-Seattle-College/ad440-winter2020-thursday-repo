import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//logo for umano
import Logo from './Components/logo.png';


import "./App.css";
//to be removed and added to its own component
import keyholderList from "./Components/keyholder.json";

//for nav and side menu
import  {NavBar} from "./Components/NavBar";
import SideBar from  "./Components/SideBar";


//other compoments
import Home from "./Components/home";
import Account from "./Components/account";
import Logout from "./Components/logout";

import FormAddKey from "./Components/FormAddKey";
import ForsmAddProperty from "./Components/FormAddProperty";
import MyForm from "./Components/MyForm";


function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />

        <SideBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="./Components/FormAddKey" component={FormAddKey} />
          <Route path="./Components/FormAddProperty" component={FormAddKey} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
