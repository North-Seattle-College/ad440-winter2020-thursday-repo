import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

export class AddKey extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle changed fields
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  //get request for properties
  componentDidMount() {
    fetch("https://api.2edusite.com/feature-sprint2/property")
      .then(res => res.json())
      .then(data => {
        this.setState({ contacts: data });
      })
      .catch(console.log);
  }

  //post request for add key
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch(
      "https://ez9pmaodek.execute-api.us-west-2.amazonaws.com/feature/key",
      {
        method: "POST",
        body: data
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="id">Enter ID</label>
        <input id="id" name="id" type="text" />
        <br />
        <br />
        <label htmlFor="property">Select the Property Type</label>
        <select id="list" value={this.props.myproperty}>
          <option value="apartemt">apartemt</option>
          <option value="townhouse">townhouse</option>
          <option value="commerical">commerical</option>
        </select>
        <br />
        <br />
        <label htmlFor="keytype">Enter keytype</label>
        <input id="keytype" name="keytype" type="text" />
        <br />
        <br />
        <button>Submit !</button>
        <br />
        <NavLink to="/FormAddProperty"> AddProperty </NavLink>
      </form>
    );
  }
}

export default AddKey;
