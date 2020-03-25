import React from "react";
import {default as apiurlbase} from '../apiurlbase'
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import TextField from "material-ui/TextField";
// import RaisedButton from "material-ui/RaisedButton";

/**
 * Component to add property objects to the DB via API
 *
 * Required props: none
 *
 * Accepted props: none
 *
 * @author Abby A.
 */
export default class AddProperty extends React.Component {
  state = {
    //declare url
    url: 'https://github.com/North-Seattle-College/ad440-winter2020-thursday-repo/wiki/API-POST-Property',
    //Store all property details
    // AddProperty: [],
    // property_name: "",
    // property_type_id: 0,
    // property_address: "",
    // property_city: "",
    // property_state: "",
    // property_zip: "",
    // property_country: ""
  }
  //Define method AddProperty
  async getAddProperty() {
  //fetch data from url and convert to JSON data
    const data = await fetch(this.state.url);
  //test console to validate it is working
    const JsonData = await data.json();
    console.log(JsonData);
  }
  componentDidMount(){
    this.getAddProperty();
  }
  // this will update the state of textfields as the user adds input
  handlePropertyNameChange = (e) => {
    console.log(e.target.value)
    this.setState({property_name: e.target.value})
  }
  handlePropertyTypeChange = (e) => {
    console.log(e.target.value)
    this.setState({property_type_id: e.target.value})
  }
  handlePropertyAddressChange = (e) => {
    console.log(e.target.value)
    this.setState({property_address: e.target.value})
  }
  handlePropertyCityChange = (e) => {
    console.log(e.target.value)
    this.setState({property_city: e.target.value})
  }
  handlePropertyStateChange = (e) => {
    console.log(e.target.value)
    this.setState({property_state: e.target.value})
  }
  handlePropertyZipChange = (e) => {
    console.log(e.target.value)
    this.setState({property_zip: e.target.value})
  }
  handlePropertyCountryChange = (e) => {
    console.log(e.target.value)
    this.setState({property_country: e.target.value})
  }
  //Processes Add Property Form data when form submit button pressed
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    var strURL = apiurlbase
                   + 'property/';
    var strBody = JSON.stringify({
    "property_name": this.state.property_name,
    "property_type_id": this.state.property_type_id,
    "property_address": this.state.property_address,
    "property_city": this.state.property_city,
    "property_state": this.state.property_state,
    "property_zip": this.state.property_zip,
    "property_country": this.state.property_country
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
        <input id="property_type_id" name="property_type_id" type="property_type_id" onChange={this.handlePropertyTypeChange} />
        <br />
        <label htmlFor="property_address">Enter Property Address</label>
        <input id="property_address" name="property_address" type="property_address" onChange={this.handlePropertyAddressChange}/>
        <br />
        <label htmlFor="property_city">Enter Property City</label>
        <input id="property_city" name="property_city" type="property_city" onChange={this.handlePropertyCityChange}/>
        <br />
        <label htmlFor="property_state">Enter Property State</label>
        <input id="property_state" name="property_state" type="property_state" onChange={this.handlePropertyStatusChange} />
        <br />
        <label htmlFor="property_zip">Enter Property Zip</label>
        <input id="property_zip" name="property_zip" type="property_zip" onChange={this.handlePropertyZipChange}/>
        <br />
        <label htmlFor="property_country">Enter Property country</label>
        <input id="property_country" name="property_country" type="property_country" onChange={this.handlePropertyCountryChange} />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
