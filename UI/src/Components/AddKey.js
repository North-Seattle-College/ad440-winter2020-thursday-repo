import React from "react";
import { default as apiurlbase } from "../apiurlbase";

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
    key_id: "",
    property: "",
    key_type: ""
  };

  handlekeyidChange = e => {
    console.log(e.target.value);
    this.setState({ key_id: e.target.value });
  };
  handlepropertyTypeChange = e => {
    console.log(e.target.value);
    this.setState({ property: e.target.value });
  };
  handlekeytypeChange = e => {
    console.log(e.target.value);
    this.setState({ key_type: e.target.value });
  };

  //Processes Add Property Form data when form submit button pressed
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    var strURL = apiurlbase + "keys/";
    var strBody = JSON.stringify({
      key_id: this.state.key_id,
      key_property: this.state.property,
      key_type: this.key_type
    });
  };

  //Generate a POST request to our API to add Property
  componentDidMount() {
    fetch("https://api.2edusite.com/v1/keys", {
      method: "POST",
      body: JSON.stringify({
        title: "New title added",
        body: "New body added. Hello body.",
        userId: 2
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          user: json
        });
      });
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <form>
        <label htmlFor="key_id">Enter Key ID</label>
        <input
          id="key_id"
          name="key_id"
          type="text"
          onChange={this.handlekeyidChange}
        />
        <br />
        <br />
        <label htmlFor="property">Enter Property Type</label>
        <input
          id="property"
          name="property"
          type="property"
          onChange={this.handlepropertyTypeChange}
        />
        <br />
        <br />
        <label htmlFor="handlekeytypeChange">Enter Property Address</label>
        <input
          id="handlekeytypeChange"
          name="handlekeytypeChange"
          type="handlekeytypeChange"
          onChange={this.handlekeytypeChange}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

// export default class AddKey extends Component {
//   state = {
//     step: 1,
//     id: "",
//     property: "",
//     keytype: "",
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     type: ""
//   };

//   // Proceed to next step
//   nextStep = () => {
//     const { step } = this.state;
//     this.setState({
//       step: step + 1
//     });
//   };

//   // Go back to previous step
//   prevStep = () => {
//     const { step } = this.state;
//     this.setState({
//       step: step - 1
//     });
//   };

//   // Handle changed fields
//   handleChange = input => e => {
//     this.setState({ [input]: e.target.value });
//   };

//   render() {
//     const { step } = this.state;
//     const {
//       id,
//       property,
//       keytype,
//       name,
//       address,
//       city,
//       state,
//       zip,
//       country,
//       type
//     } = this.state;
//     const values = {
//       id,
//       property,
//       keytype,
//       name,
//       address,
//       city,
//       state,
//       zip,
//       country,
//       type
//     };
//     switch (step) {
//       case 1:
//         return (
//           <FormAddKey
//             nextStep={this.nextStep}
//             handleChange={this.handleChange}
//             values={values}
//           />
//         );
//       case 2:
//         return (
//           <FormAddProperty
//             nextStep={this.nextStep}
//             prevStep={this.prevStep}
//             handleChange={this.handleChange}
//             values={values}
//           />
//         );
//     }
//   }
// }
