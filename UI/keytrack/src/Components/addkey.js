import React, { Component } from "react";

export class AddKey extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("virtserver.swaggerhub.com/UnTamedLaw/keymanagement/4.0", {
      method: "POST",
      body: data
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="id">Enter ID</label>
        <input id="id" name="id" type="text" />
        <br />
        <br />
        <label htmlFor="property">Select the Property Type</label>
        <select id="list" value={this.props.mycar}>
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
      </form>
    );
  }
}

export default AddKey;
