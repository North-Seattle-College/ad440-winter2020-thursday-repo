import React from 'react';
import './Dashbord.css';
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
export default class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      propertyData: [],
      keybundleData: [],
    };
  }

  // Function to verify HTTP response is in 2xx
  checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(new Error(res.statusText));
    }
  }
  // Function to explore the data structure provided by the API
  examineJson = (data) => {
    let localCopy = Object.assign({}, data);
    //let index = 0;
    //localCopy.map((dataentry, i) => {console.log(dataentry)});
    //console.log(localCopy);
    //console.log(localCopy[String(index)].property_address);
    //console.log(typeof(localCopy));
    //console.log(Array.isArray(localCopy));
    //console.log(Object.keys(data));
    //console.log(data[0].tostring());
    return(localCopy);
  }
  // Function to convert to an Array
  convertToArray = (data) => {
    let dataAsArray = [];
    let i = 0;

  }

  /**
   * Get all the Property Id's, this is for early development & demo
   */
  getAllPropertyData = () => {
    const strURL = apiurlbase + 'property';
    fetch(strURL)
      .then(this.checkStatus)
      .then(res => res.json())
      .then(data => this.setState({propertyData: data}))
      .catch(error => console.error);
  }
  
  /**
   * Get all the Keybundle Id's, this is for early development & demo
   */
  getAllKeybundleData = () => {
    const strURL = apiurlbase + 'keybundle';
    fetch(strURL)
      .then(this.checkStatus)
      .then(res => res.json())
      .then(data => this.setState({keybundleData: data}))
      .catch(error => console.error);
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
    this.getAllKeybundleData();
    this.getAllPropertyData();
  }

  /**
   * Function to give to Array.map() for purpose of displaying array of keys
   */
  displayKeybundles = (keybundle, i) => {
    // console.log(keybundle);
    // console.log(i);
    return(
      <tr key={i}>
        <td key={i+'id'}>{keybundle.keybundle_id}</td>
        <td key={i+'stat'}>{keybundle.keybundle_status_id}</td>
        <td key={i+'property'}>{keybundle.property_id}</td>
        <td key={i+'keyholder'}>{keybundle.keyholder_id}</td>
        <td key={i+'checkout'}>{keybundle.keybundle_checkout_date}</td>
        <td key={i+'due'}>{keybundle.keybundle_due_date}</td>
      </tr>
    );
  }


  /**
   * Render method required for React
   */
  render() {
    return(
      <div className='Dashbord'>
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
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Property</th>
                <th>Keyholder</th>
                <th>Checkout Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.keybundleData.map(this.displayKeybundles)}
            </tbody>
          </table>
          <h3>Property Data</h3>
          <p>{String(this.state.propertyData)}</p>
        </div>
      </div>
    );
  }
}
