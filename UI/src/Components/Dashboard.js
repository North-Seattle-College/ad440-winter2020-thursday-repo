import React from 'react';
import {Redirect} from 'react-router-dom';
import './Dashboard.css';

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
      redirectToCard: '',
    };
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
    this.props.getKeys();
  }

  /**
   * Function to give to Array.map() for purpose of displaying array of keys
   */
  displayKeybundles = (keybundle, i) => {
    return(
      <li className='key-card' key={'kb'+keybundle.keybundle_id}
      onClick={() => this.setState({redirectToCard: `/checkoutkey/${keybundle.keybundle_id}`})} >
        <table className='key-card-table'>
          <tbody>
            <tr className='kh-name'>
              <td>Current holder</td>
              <td>{keybundle.keyholder_name}</td>
            </tr>
            <tr className='prop-name'>
              <td>Property name</td>
              <td>{keybundle.property_name}</td>
            </tr>
            <tr className='prop-addy'>
              <td>Address</td>
              <td>{keybundle.property_address}</td>
              </tr>
            <tr className='key-id'>
              <td>Key number</td>
              <td>{keybundle.keybundle_id}</td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  }


  /**
   * Render method required for React
   */
  render() {
    if (this.state.redirectToCard) {
      return <Redirect to={this.state.redirectToCard} />
    }
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
          <ul className='key-card-wrapper'>
            {this.props.allKeys.map(this.displayKeybundles)}
          </ul>
        </div>
      </div>
    );
  }
}
