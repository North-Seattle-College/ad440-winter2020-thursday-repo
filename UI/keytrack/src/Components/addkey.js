import React, { Component } from "react";
import FormAddKey from "./FormAddKey";
import FormAddProperty from "./FormAddProperty"

export class AddKey extends Component {
  state = {
    step: 1,
    id: "",
    property: "",
    keytype: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    type: ""
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle changed fields
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      id,
      property,
      keytype,
      name,
      address,
      city,
      state,
      zip,
      country,
      type
    } = this.state;
    const values = {
      id,
      property,
      keytype,
      name,
      address,
      city,
      state,
      zip,
      country,
      type
    };
    switch (step) {
      case 1:
        return (
          <FormAddKey
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormAddProperty
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
    }
  }
}

export default AddKey;
