import React, {useState} from "react";
import {default as apiurlbase} from '../apiurlbase'

// import FormAddKey from "./FormAddKey";
// import AddProperty from "./AddProperty";


/**
 * Component to create keys
 *
 * Required props: none
 *
 * Accepted props: none
 *
 * @author Han Kuo
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default class AddKey extends React.Component {
  state = {
    keybundleId : "",
    keybundleStatus: null,
    keybundlePropertyId: 0,
    keybundleKeyholderId: 0,

  }
  handlekebundleId = (event) => {
    this.setState({keybundleId: event.target.value})
  }
  handlekeybundleStatus = (event) => {
    this.setState({keybundleStatus: event.target.value})
  }
  handlekeybundlePropertyId = (event) => {
    this.setState({keybundlePropertyId: event.target.value})
  }
  handlekebundleKeyholderId = (event) => {
    this.setState({keybundleKeyholderId: event.target.value})
  }
  // event handlers
  handleSubmit = (event) => {
    event.preventDefault();
    var strURL = apiurlbase
                   + 'keybundle/';
    var strBody = JSON.stringify({
    "keybundleId": this.state.keybundleId,
    "keybundleStatus": this.state.keybundleStatus,
    "keybundlePropertyId": this.state.keybundlePropertyId,
    "keybundleKeyholderId": this.state.keybundleKeyholderId,
  });


    var req = new XMLHttpRequest();
           req.open('GET', strURL, true);
           req.setRequestHeader('Content-Type',
             'application/json;charset=UTF-8',
             "Access-Control-Request-Method: GET",
             'Access-Control-Allow-Origin: https://api.2edusite.com');
           req.addEventListener('readystatechange',
                                 this.handleReadyStateChange,
                                 false);
           req.send(strBody);
         }
   //Handles updates to form Add Property
   handleReadyStateChange = (e) => {
     console.log(e.target.response);


  }
  handleCancel = event => {
    event.preventDefault();

    //ToDo: implement cancellation
  }
  //Generate a POST request to our API to add Property
  componentDidMount() {
      fetch('https://cors-anywhere.herokuapp.com/https://api.2edusite.com/keybundle/', {
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

  render (){
    const { values, handleChange } = this.props;
    return(
      <div>
        <form>
          <legend>Add a key</legend>
          <label>
            Key ID (tag):
            <input type="number"
              onChange={this.handlekebundleId} />
          </label>
          <br />
          <label>
            Status:
            <input type="number"
              onChange={this.handlekeybundleStatus} />
          </label>
          <br />
          <label>
            Property:
            <input type="number"
            onChange={this.handlekeybundlePropertyId} />
          </label>
          <br />
          <label>
            Keyholder:
            <input type="number"
              onChange={this.handlekebundleKeyholderId} />
          </label>
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleCancel}>cancel</button>
        </form>
      </div>
    );
  }
}
