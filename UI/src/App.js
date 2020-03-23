import React from "react";
import "./App.css";

// Import our custom components
import WorkingArea from './Components/WorkingArea';
import SideBar from "./Components/SideBar";
import TopBar from './Components/TopBar';
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
