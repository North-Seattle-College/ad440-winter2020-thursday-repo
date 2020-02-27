
import React from "react";
//import ReactDOM from 'react-dom'

import "./App.css";
import keyholderList from "./Components/keyholder.json"; //Used for mock

// Import our custom components
import WorkingArea from './Components/WorkingArea';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Account from "./Components/Account";
import Logout from "./Components/Logout";
import AddKey from "./Components/AddKey";
import SideBar from "./Components/SideBar";
import TopBar from './Components/TopBar';
import TestComp from './Components/TestComp';
import Footer from './Components/Footer';
//import SearchBar from "./Components/searchBar";

/**
 * Base component for the KeyTrack application.
 *
 * Required props: none
 *
 * Accepted props: none
 *
 * @author Perla Reyes-Herrera
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Wrapper'>
        <TopBar />
        <div className='FlexWrapper'>
          <SideBar />
          <WorkingArea />
        </div>
        <Footer />
      </div>
    );
  }
}
// export default class App extends React.Component {
//   /**
//    * Constructor with state setup
//    * @param props Currently expected to be empty or Undef
//    */
//   constructor (props) {
//     super(props);
//     this.state = {search: '',
//                 };
//   }

  /**
   * Render the searchbar?
   * @param keyholder ?
   */
  // renderKeyholder = (keyholder) => {
  //   const { search } = this.state;
  //   var name = keyholder.first_name.toLowerCase();

  //   return (
  //     <div className="searchKeyholder">
  //       <Card>
  //         <CardBody>
  //           <CardTitle title={keyholder.first_name}>
  //             {keyholder.first_name.substring(0, 15)}
  //             {keyholder.first_name.length > 15 && "..."}
  //           </CardTitle>
  //         </CardBody>
  //       </Card>
  //     </div>
  //   );
  // };

  /**
   * Handle updates to the search term
   */
  // handleSearchTermChange = (e) => {
  //   this.setState({ search: e.target.value });
  // };

  /**
   * Required render method for React
   */
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
