import React, { Component } from "react";

export class FormAddProperty extends Component {
  state = {
    property_name: "",
    property_type_id: 0,
    property_address: "",
    property_city: "",
    property_state: "",
    property_zip: "",
    property_country: ""
  }
  // What we need to post
  /*
  "property_name": "string",
  "property_type_id": 0,
  "property_address": "string",
  "property_city": "string",
  "property_state": "string",
  "property_zip": "string",
  "property_country": "string"
  */

  // this will update the state of property name as the user adds input
  handlePropertyNameChange = (e) => {
    console.log(e.target.value)
    this.setState({ property_name: e.target.value})
  }

  // this is where you will want to trigger your api call.
  // My recommendation is to trigger a function in another file
  // that function will make the call.
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }
  componentDidMount() {
  		fetch('https://github.com/North-Seattle-College/ad440-winter2020-thursday-repo/wiki/API-POST-Property', {
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
        <label htmlFor="property_name">Enter Property Name</label>
        <input id="property_name" name="property_name" type="text" onChange={this.handlePropertyNameChange} />
        <br />
        <label htmlFor="property_type_id">Enter Property Type</label>
        <input id="property_type_id" name="property_type_id" type="property_type_id" />
        <br />
        <label htmlFor="property_address">Enter Property Address</label>
        <input id="property_address" name="property_address" type="property_address" />
        <br />
        <label htmlFor="property_city">Enter Property City</label>
        <input id="property_city" name="property_city" type="property_city" />
        <br />
        <label htmlFor="property_state">Enter Property State</label>
        <input id="property_state" name="property_state" type="property_state" />
        <br />
        <label htmlFor="property_zip">Enter Property Zip</label>
        <input id="property_zip" name="property_zip" type="property_zip" />
        <br />
        <label htmlFor="property_country">Enter Property country</label>
        <input id="property_country" name="property_country" type="property_country" />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default FormAddProperty;

const styles = {
  button: {
    margin: 50
  }
};
