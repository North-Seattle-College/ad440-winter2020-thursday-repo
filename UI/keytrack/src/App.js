import React, { Component } from "react";
import { BrowserRouter, Route, HashRouter, NavLink } from "react-router-dom";

import "./App.css";
import keyholderList from "./Components/keyholder.json";
import Navbar from "./Components/navbar";
import Home from "./Components/home";
import Account from "./Components/account";
import Logout from "./Components/logout";
//import SideBar from "./Components/SideBar";
//import SearchBar from "./Components/searchBar";
import FormAddKey from "./Components/FormAddKey";
import FormAddProperty from "./Components/FormAddProperty";
import MyForm from "./Components/MyForm";

//for search demo
import { Button, Input, Card, CardBody, CardTitle } from "mdbreact";
import AddKey from "./Components/AddKey";
//for side menu
const items = [
  { name: "Ckeckout Key", label: "Ckeckout Key" },
  { name: "Add Property", label: "Add Property" },
  { name: "Add Key ", label: "Add Key" }
];

class App extends Component {
  //for search state
  state = {
    search: ""
  };

  //searchbar render
  renderKeyholder = keyholder => {
    const { search } = this.state;
    var name = keyholder.first_name.toLowerCase();

    return (
      <div className="searchKeyholder">
        <Card>
          <CardBody>
            <CardTitle title={keyholder.first_name}>
              {keyholder.first_name.substring(0, 15)}
              {keyholder.first_name.length > 15 && "..."}
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  };
  //to operate state
  onchange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;
    const filteredKeyholder = keyholderList.filter(keyholder => {
      return (
        keyholder.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    return (
      <div class="container">
        <BrowserRouter>
          <div className="navbar">
            <Navbar />
            <Route exact path="/" render={() => <Home title="Key Manager" />} />
            <Route
              path="/Account/"
              render={() => <Account title="Account" />}
            />
            <Route path="/Logout/" render={() => <Logout title="Logout" />} />
          </div>
        </BrowserRouter>

        <div id="form" class="container">
          <HashRouter>
            <ul className="header">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/AddKey">AddKey</NavLink>
              </li>
              <li>
                <NavLink to="/MyForm">MyForm</NavLink>
              </li>
            </ul>

            <div className="content">
              <Route path="/" component={Home} />
              <Route path="/Addkey" component={AddKey} />
              <Route path="/MyForm" component={MyForm} />
            </div>
          </HashRouter>
        </div>

        <div className="flex-item">
          <div className="container">
            <Input label="Search" onChange={this.onchange} />
          </div>
          <div className="flex-item">
            {filteredKeyholder.map(keyholder => {
              return this.renderKeyholder(keyholder);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
