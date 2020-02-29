//per FormAddProperty following same schema for FormAddKey

import React, { Component } from "react";
import {default as apiurlbase} from '../apiurlbase';


export class FormAddKey extends Component {
  state = {
    keybundleId: "",
    propertyId: 0,

  }

  // this will update the state of textfields as the user adds input
  handleKeybundleIdChange = (e) => {
    console.log(e.target.value)
    this.setState({keybundleId: e.target.value})
  }
  handlePropertyIdChange = (e) => {
    console.log(e.target.value)
    this.setState({propertyId: e.target.value})
  }

  //Add Key Form when submit
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    var strURL = apiurlbase
                   + 'keybundle/';
    var strBody = JSON.stringify({
    "keybundle_id": this.state.keybundleId,
    "property_id": this.state.propertyId,

  });
  //Generate GET request for Key

     var req = new XMLHttpRequest();
            req.open('GET', strURL, true);
            req.setRequestHeader('Content-Type',
              'application/json;charset=UTF-8',
              "Access-Control-Request-Method: GET",
              'Access-Control-Allow-Origin: https://api.2edusite.com');//Due to CORS
            req.addEventListener('readystatechange',
                                  this.handleReadyStateChange,
                                  false);
            req.send(strBody);
          }
    //Handles updates to form Add Key
    handleReadyStateChange = (e) => {
      console.log(e.target.response);
  }
  //Generate a POST request to  API to add key
  componentDidMount() {
    //Not Sure if this will work as its spefic to Add property component
  		fetch('https://github.com/North-Seattle-College/ad440-winter2020-thursday-repo/wiki/API-POST-KEY', {
  			method: 'POST',
  			body: JSON.stringify({
  				title: 'New title added',
  				body: 'New body added. Hello body.',
  				userId: 2
  			}),
  			headers: {
  				"Content-type": "application/json; charset=UTF-8"
  			}
  		}).then(response => {
  				return response.json()
  			}).then(json => {
  				this.setState({
  					user:json
  				});
  			});
  	}
  render() {
    const { values, handleChange } = this.props;
    return (
      <form>
        <label htmlFor="keybundleId">Enter keybundleId</label>
        <input id="keybundleId" name="keybundleId" type="text" onChange={this.handleKeybundleIdChange} />
        <br />
        <label htmlFor="propertyId">Enter Property Id </label>
        <input id="propertyId" name="propertyId" type="propertyId" onChange={this.handlePropertyIdChange} />
        <br />

        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
export default FormAddKey;
