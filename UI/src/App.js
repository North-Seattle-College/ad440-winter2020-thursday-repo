import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//logo for umano
import Logo from './Components/logo.png';


import "./App.css";
//to be removed and added to its own component
import keyholderList from "./Components/keyholder.json";

//for nav and side menu
import  {NavBar} from "./Components/navbar";
import SideBar from  "./Components/SideBar";


//other compoments
import {Home} from "./Components/Home";
import {Account} from "./Components/Account";
import {Logout} from "./Components/Logout";

import {FormAddKey} from "./Components/FormAddKey";
import {FormAddProperty} from "./Components/FormAddProperty";
import Tables from './Components/tableLayout';
import {NoMatch} from './NoMatch';


function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Tables />
        <SideBar />
        <Switch>
          <Route exact path="./Components/Home" component={Home} />
          <Route path="./Components/FormAddKey" component={FormAddKey} />
          //<Route component ={FormAddProperty} />
          //<Route component={NoMatch} />

        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
