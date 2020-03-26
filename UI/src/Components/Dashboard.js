import React from 'react';
import {Link} from 'react-router-dom';
import './Dashboard.css';
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
  
  /**
   * Get all the Keybundle Id's, this is for early development & demo
   */
  getAllKeybundleData = () => {
    const strURL = apiurlbase + 'keybundle';
    fetch(strURL)
      .then(this.checkStatus)
      .then(res => res.json())
      .then(data => this.props.setAllKeys(data))
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
  }

  // lifecycle functions
  componentDidMount() {
    if (this.props.allKeys.length === 0) {
      this.getAllKeybundleData();
    }
  }

  /**
   * Function to give to Array.map() for purpose of displaying array of keys
   */
  displayKeybundles = (keybundle, i) => {
    // console.log(keybundle);
    // console.log(i);
    return(
      <Link to={`/checkoutkey/${keybundle.keybundle_id}`}>
        <tr key={i}>
          <td key={i+'id'}>{keybundle.keybundle_id}</td>
          <td key={i+'stat'}>{keybundle.keybundle_status_id}</td>
          <td key={i+'property'}>{keybundle.property_id}</td>
          <td key={i+'keyholder'}>{keybundle.keyholder_id}</td>
          <td key={i+'checkout'}>{keybundle.keybundle_checkout_date}</td>
          <td key={i+'due'}>{keybundle.keybundle_due_date}</td>
        </tr>
      </Link>
    );
  }


  /**
   * Render method required for React
   */
  render() {
    return(  
      <div className='Dashbord'>
        <h1>Key Checkout</h1>
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
              {this.props.allKeys.map(this.displayKeybundles)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
