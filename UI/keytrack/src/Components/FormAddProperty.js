import React, { Component } from "react";

export class FormAddProperty extends Component {
  state = {
    property_name: ""
  };
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
  handlePropertyNameChange = e => {
    console.log(e.target.value);
    this.setState({ property_name: e.target.value });
  };

  // this is where you will want to trigger your api call.
  // My recommendation is to trigger a function in another file
  // that function will make the call.
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <form>
        <label htmlFor="property_name">Enter Property Name</label>
        <input
          id="property_name"
          name="property_name"
          type="text"
          onChange={this.handlePropertyNameChange}
        />

        <label htmlFor="property_type_id">Enter Property Type</label>
        <input
          id="property_type_id"
          name="property_type_id"
          type="property_type_id"
        />

        <label htmlFor="property_address">Enter Property Address</label>
        <input
          id="property_address"
          name="property_address"
          type="property_address"
        />

        <button onClick={this.handleSubmit}>Send data!</button>
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
