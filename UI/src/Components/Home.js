import React from 'react';
import './Home.css';
import {default as apiurlbase} from '../apiurlbase'

/**
 * Landing page for app where user searches for DB objects
 * And, on clicking them, gets to maniuplate them
 * 
 * Required props: none
 * 
 * Accepted props: none
 * 
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      propertyData: undefined,
      keybundleData: undefined,
    };
  }

  /**
   * Get all the Property Id's, this is for early development & demo
   */
  getAllPropertyData = () => {
    //necessary for the sub-context
    const self=this;
    //callback for results
    function handleReadyStateChange(e) {
      if (req.readyState === 0) {
        console.log('getAllPropertyData state 0' + String(e));
      } else if (req.readyState === 1) {
        console.log('getAllPropertyData state 1' + String(e))
      } else if (req.readyState === 2) {
        console.log('getAllPropertyData state 2' + String(e))
      } else if (req.readyState === 3) {
        console.log('getAllPropertyData state 3' + String(e))
      } else if (req.readyState === 4 && req.status === 200) {
        console.log('getAllPropertyData state 4' + String(e))
        //let res=req.responseText;
        let res = JSON.parse(req.responseText);
        self.setState({propertyData: res});
      }
    }

    var strURL = apiurlbase + 'property';
    var req = new XMLHttpRequest();
    req.open('GET', strURL, true);
    req.addEventListener('readystatechange',
                          handleReadyStateChange,
                          false);
    req.setRequestHeader('Content-Type',
        'application/json;charset=UTF-8',
        'Access-Control-Request-Method: GET');
    req.send();
  }

  /**
   * Get all the Keybundle Id's, this is for early development & demo
   */
  getAllKeybundleData = () => {
    //necessary for sub-context
    const self=this;
    //callback for results
    function handleReadyStateChange(e) {
      if (req.readyState === 0) {
        console.log('getAllKeybundleData state 0' + String(e));
      } else if (req.readyState === 1) {
        console.log('getAllKeybundleData state 1' + String(e))
      } else if (req.readyState === 2) {
        console.log('getAllKeybundleData state 2' + String(e))
      } else if (req.readyState === 3) {
        console.log('getAllKeybundleData state 3' + String(e))
      } else if (req.readyState === 4 && req.status === 200) {
        console.log('getAllKeybundleData state 4' + String(e))
        //let res=req.responseText;
        let res = JSON.parse(req.responseText);
        self.setState({keybundleData: res});
      }
    }

    var strURL = apiurlbase + 'keybundle';
    var req = new XMLHttpRequest();
    req.open('GET', strURL, true);
    req.addEventListener('readystatechange',
                          handleReadyStateChange,
                          false);
    req.setRequestHeader('Content-Type',
        'application/json;charset=UTF-8',
        'Access-Control-Request-Method: GET');
    req.send();
  }

  /**
   * Handles update to the search text field
   */
  handleSearchTextChange = (event) => {
    this.setState({searchText: event.target.value});
  }

  /**
   * Apply filter to data
   */
  handleSearch = (event) => {
    event.preventDefault();
  }

  /**
   * Handle the data fetch / refresh
   */
  handleDataFetch = (event) => {
    this.setState({keybundleData: null});
    this.setState({propertyData: null});
    this.getAllKeybundleData();
    this.getAllPropertyData();
  }

  //lifecycle methods
  

  /**
   * Render method required for React
   */
  render() {
    return(
      <div className='Home'>
        <div className='SearchForm'>
          <form onSubmit={this.handleSearch} >
            <input type='submit' value='Search:' />
            <label>
              <input type='text' value={this.state.searchText}
                     onChange={this.handleSearchTextChange} />
            </label>
            <input type='button' value='Fetch/Refresh Data'
                   onClick={this.handleDataFetch} />
          </form>
          <h3>Keybundle Data</h3>
          <p>{String(this.state.keybundleData)}</p>
          <h3>Property Data</h3>
          <p>{String(this.state.propertyData)}</p>
        </div>
      </div>
    );
  }
}
