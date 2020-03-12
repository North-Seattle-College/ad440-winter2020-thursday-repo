// import React, { Component } from "react";
// import { BrowserRouter,Router, Route } from "react-router-dom";

//import "./App.css";
// import keyholderList from "./Components/keyholder.json";
// import Navbar from "./Components/Navbar";
//import Home from "./Components/Home";
// import { Account } from "./Components/Account.js";
// import Logout from "./Components/Logout";
// import SideBar from "./Components/SideBar";
//import SearchBar from "./Components/searchBar";
// import apiurlbase from "./apiurlbase.js";
//for search demo
// import { Button, Input, Card, CardBody, CardTitle } from "mdbreact";
// import AddKey from "./Components/AddKey";

import React from "react";
import { Router, Route } from "react-router-dom";
import "./App.css";

import Callback from "./Routes/Callback";
import Home from "./Routes/Home";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Route exact path="/" component={Home} />
    <Route exact path="/callback" component={Callback} />
  </Router>
);

export default App;

//for side menu
// const items = [
//   { name: "Ckeckout Key", label: "Ckeckout Key" },
//   { name: "Add Property", label: "Add Property" },
//   { name: "Add Key ", label: "Add Key" }
// ];

// export default class App extends Component {
//   //for search state
//   state = {
//     search: ""
//   };

//   //searchbar render
//   renderKeyholder = keyholder => {
//     const { search } = this.state;
//     var name = keyholder.first_name.toLowerCase();

//     return (
//       <div className="searchKeyholder">
//         <Card>
//           <CardBody>
//             <CardTitle title={keyholder.first_name}>
//               {keyholder.first_name.substring(0, 15)}
//               {keyholder.first_name.length > 15 && "..."}
//             </CardTitle>
//           </CardBody>
//         </Card>
//       </div>
//     );
//   };
//   //to operate state
//   onchange = e => {
//     this.setState({ search: e.target.value });
//   };

//   render() {
//     const { search } = this.state;
//     const filteredKeyholder = keyholderList.filter(keyholder => {
//       return (
//         keyholder.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
//       );
//     });
//     return (
//       <div class="container">
//         <BrowserRouter>
//           <div className="navbar">
//             <Navbar />
//             <Route exact path="/" render={() => <Home title="Key Manager" />} />
//             <Route
//               path="/Account/"
//               render={() => <Account title="Account" />}
//             />
//             <Route path="/Logout/" render={() => <Logout title="Logout" />} />
//           </div>
//         </BrowserRouter>

//         <div class="fixed">
//           <SideBar />
//         </div>

//         <div className="flex-item">
//           <h1>{apiurlbase}</h1>
//           <div className="container">
//             <Input label="Search" onChange={this.onchange} />
//           </div>
//           <div className="flex-item">
//             {filteredKeyholder.map(keyholder => {
//               return this.renderKeyholder(keyholder);
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// //export default App;
