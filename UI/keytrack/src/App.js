import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Navbar from './Components/navbar';
import Home from './Components/home';
import Account from './Components/account';
import Logout from './Components/logout';
import SideMenu from "./Components/SideMenu";

const items = [
  { name: 'Ckeckout Key', label: 'Ckeckout Key' },
  { name: 'Add Property', label: 'Add Property' },
  { name: 'Add Key ', label: 'Add Key' },

]


class App extends Component {

    render() {
        return (
          <div class="container">
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" render={() => <Home title="Key Manager" />} />
                    <Route path="/Account/" render={() => <Account title="Account" />} />
                    <Route path="/Logout/" render={() => <Logout title="Logout" />} />
                </div>
            </BrowserRouter>

            <div class="fixed">
              <SideMenu items={items}/>
            </div>
            <div class="flex-item">
              <form>
                <input type="text" id="filter" placeholder="Search for..."/>
              </form>
            </div>
            </div>
        );
  }
}

export default App;




// const items = [
//   { name: 'home', label: 'Home' },
//   { name: 'Ckeckout Key', label: 'Ckeckout Key' },
//   { name: 'Add Property', label: 'Add Property' },
//   { name: 'Add Key ', label: 'Add Key' },
//
// ]

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h>Umano Key Management</h>
//       </header>
//       <div>
//         <SideMenu items={items}/>
//       </div>
//       <div className="searchForm">
//             <form>
//                 <input type="text" id="filter" placeholder="Search for..."/>
//             </form>
//       </div>
//     </div>
//   );
// }
